import React, { useEffect, useRef, useState } from 'react';
import {
  apiReadAllRuanganOtmil,
  apiReadAllStaff,
  apiReadAllWBP,
  apiReadAlllokasiOtmil,
  apiReadVisitor,
  apiReadZona,
} from '../../services/api';
import Select from 'react-select';
import dayjs from 'dayjs';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alerts } from './AlertAktifitasPengunjung';
import { Error403Message } from '../../utils/constants';

// interface
interface AddAktifitasPengunjungModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

interface ruangan {
  ruangan_otmil_id: string;
  lokasi_otmil_id: string;
  nama_ruangan_otmil: string;
  jenis_ruangan_otmil: string;
  nama_lokasi_otmil: string;
  zona_id: string;
  nama_zona: string;
}

interface pengunjung {
  pengunjung_id: string;
  nama_pengunjung: string;
  wbp_profile_id: string;
  nama_wbp: string;
}

interface lokasi {
  nama_lokasi_otmil: string;
}

interface namazona {
  zona_id: string;
  nama_zona: string;
}

export const AddAktifitasPengunjung: React.FC<
  AddAktifitasPengunjungModalProps
> = ({ closeModal, onSubmit, defaultValue, isDetail, isEdit }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      lokasi_otmil_id: '',
      nama_lokasi_otmil: '',
      ruangan_otmil_id: '',
      jenis_ruangan_otmil: '',
      nama_ruangan_otmil: '',
      zona_id: '',
      nama_zona: defaultValue?.status_zona_ruangan_otmil ?? '',
      nama_aktivitas_pengunjung: '',
      waktu_mulai_kunjungan: '',
      waktu_selesai_kunjungan: '',
      tujuan_kunjungan: '',
      petugas_id: '',
      // nama_petugas: '',
      pengunjung_id: '',
      // nama_pengunjung: '',
      // wbp_profile_id: '',
      // nama_wbp: '',

      // nama_ruangan_lemasmil: '',
      // jenis_ruangan_lemasmil: '',
      // lokasi_lemasmil_id: '',
      // ruangan_lemasmil_id: '',
    },
  );

  const navigate = useNavigate();
  const location = useLocation();

  //state
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [NamaZona, setNamaZona] = useState<namazona[]>([]);
  const [ruanganotmil, setruanganotmil] = useState<ruangan[]>([]);
  const [lokasiotmil, setlokasiotmil] = useState<lokasi[]>([]);
  const [dataPetugas, setDataPetugas] = useState([]);
  const [dataWBP, setDataWBP] = useState([]);
  const [Datapengunjung, setDatapengunjung] = useState<pengunjung[]>([]);
  const [filter, setFilter] = useState('');

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  //useEffect untuk menambahkan event listener  ke elemen dokumen
  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent) => {
  //     if (
  //       modalContainerRef.current &&
  //       !modalContainerRef.current.contains(e.target as Node)
  //     ) {
  //       closeModal();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [closeModal]);

  // function
  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'ruangan_lemasmil_id' &&
        key !== 'nama_lokasi_lemasmil' &&
        key !== 'nama_ruangan_lemasmil' &&
        key !== 'jenis_ruangan_lemasmil' &&
        key !== 'zona_id_lemasmil' &&
        key !== 'lokasi_lemasmil_id' &&
        key !== 'status_zona_ruangan_lemasmil' &&
        key !== 'nama_pengunjung'
      ) {
        if (!value) {
          errorFields.push(key);
        }
      }
    }
    if (errorFields.length > 0) {
      console.log(errorFields);
      setErrors(errorFields);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.i-nama',
          popover: {
            title: 'Nama Aktivitas',
            description: 'Isi nama aktivitas',
          },
        },
        {
          element: '.i-waktu',
          popover: {
            title: 'Waktu Mulai Berkunjung',
            description: 'Menentukan tanggal waktu mulai berkunjung',
          },
        },
        {
          element: '.i-selesai',
          popover: {
            title: 'Waktu Selesai Berkunjung',
            description: 'Menentukan tanggal waktu selesai berkunjung',
          },
        },
        {
          element: '.i-tujuan',
          popover: {
            title: 'Tujuan Berkunjung',
            description: 'Isi tujuan berkunjung',
          },
        },
        {
          element: '.p-ruang',
          popover: {
            title: 'Pilih Ruangan Otmil',
            description: 'Pilih ruangan otmil yang diinginkan',
          },
        },
        {
          element: '.i-jenis',
          popover: {
            title: 'Jenis Ruangan',
            description: 'Isi jenis ruangan',
          },
        },
        {
          element: '.i-lokasi',
          popover: {
            title: 'Nama Lokasi Otmil',
            description: 'Isi nama lokasi otmil',
          },
        },
        {
          element: '.i-zona',
          popover: {
            title: 'Zona',
            description: 'Isi zona',
          },
        },
        {
          element: '.p-petugas',
          popover: {
            title: 'Petugas',
            description: 'Pilih petugas yang diinginkan',
          },
        },
        {
          element: '.p-pengunjung',
          popover: {
            title: 'Pengunjung',
            description: 'Pilih pengunjung yang diinginkan',
          },
        },
        {
          element: '.i-wbp',
          popover: {
            title: 'Nama WBP',
            description: 'Isi nama WBP',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'}`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} data aktivitas`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSelectStaff = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, petugas_id: e?.value }); // untuk
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    // closeModal();
  };

  const handleRuangan = (e: any) => {
    setFormState({ ...formState, ruangan_otmil_id: e?.value });
  };

  const handleRuanganChange = (selectedOption: any) => {
    if (selectedOption) {
      const selectedData = ruanganotmil.find(
        (item) => item.ruangan_otmil_id === selectedOption.value,
      );

      if (selectedData) {
        setFormState({
          ...formState,
          ruangan_otmil_id: selectedData.ruangan_otmil_id,
          nama_ruangan_otmil: selectedData.nama_ruangan_otmil,
          jenis_ruangan_otmil: selectedData.jenis_ruangan_otmil,
          lokasi_otmil_id: selectedData.lokasi_otmil_id,
          nama_lokasi_otmil: selectedData.nama_lokasi_otmil,
          zona_id: selectedData.zona_id,
          nama_zona: selectedData.nama_zona,
        });
      } else {
        setFormState({
          ...formState,
          ruangan_otmil_id: '',
          nama_ruangan_otmil: '',
          jenis_ruangan_otmil: '',
          lokasi_otmil_id: '',
          nama_lokasi_otmil: '',
          zona_id: '',
          nama_zona: '',
        });
      }
    } else {
      setFormState({
        ...formState,
        ruangan_otmil_id: '',
        nama_ruangan_otmil: '',
        jenis_ruangan_otmil: '',
        lokasi_otmil_id: '',
        nama_lokasi_otmil: '',
        zona_id: '',
        nama_zona: '',
      });
    }
  };

  const handlePengunjungChange = (e: any) => {
    const selectedPengunjung: any = Datapengunjung.find(
      (item: any) => item.pengunjung_id === e?.value,
    );
    setFormState({
      ...formState,
      pengunjung_id: e?.value,
      wbp_profile_id: selectedPengunjung
        ? selectedPengunjung.wbp_profile_id
        : '',
      nama_wbp: selectedPengunjung ? selectedPengunjung.nama_wbp : '',
    });
  };

  const handleMulaiBerkunjung = (e: any) => {
    console.log('1213', e);

    const timeZone = dayjs().format('Z');
    let zonaWaktu;
    switch (timeZone) {
      case '+07:00':
        zonaWaktu = 'WIB';
        break;
      case '+08:00':
        zonaWaktu = 'WITA';
        break;
      case '+09:00':
        zonaWaktu = 'WIT';
        break;
      default:
        zonaWaktu = 'Zona Waktu Tidak Dikenal';
    }
    setFormState({
      ...formState,
      waktu_mulai_kunjungan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };

  const handleSelesaiBerkunjung = (e: any) => {
    console.log('1213', e);

    const timeZone = dayjs().format('Z');
    let zonaWaktu;
    switch (timeZone) {
      case '+07:00':
        zonaWaktu = 'WIB';
        break;
      case '+08:00':
        zonaWaktu = 'WITA';
        break;
      case '+09:00':
        zonaWaktu = 'WIT';
        break;
      default:
        zonaWaktu = 'Zona Waktu Tidak Dikenal';
    }
    setFormState({
      ...formState,
      waktu_selesai_kunjungan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };

  const getTimeZone = () => {
    const timeZone = dayjs().format('Z');
    let zonaWaktu;
    switch (timeZone) {
      case '+07:00':
        zonaWaktu = 'WIB';
        break;
      case '+08:00':
        zonaWaktu = 'WITA';
        break;
      case '+09:00':
        zonaWaktu = 'WIT';
        break;
      default:
        zonaWaktu = 'Zona Waktu Tidak Dikenal';
    }
    if (!formState?.zona_waktu) {
      setFormState({
        ...formState,
        zona_waktu: zonaWaktu,
      });
    }
  };
  // fetch data
  useEffect(() => {
    getTimeZone();
    const fetchData = async () => {
      let params = {
        filter: {
          // search: filter,
          page: 1,
          pageSize: 1000,
        },
      };
  
      try {
        const [
          ruanganResponse,
          lokasiResponse,
          zoneResponse,
          petugasResponse,
          wbpResponse,
          pengunjungResponse
        ] = await Promise.all([
          apiReadAllRuanganOtmil(params.filter, token),
          apiReadAlllokasiOtmil(params.filter, token),
          apiReadZona(token),
          apiReadAllStaff(params, token),
          apiReadAllWBP(params, token),
          apiReadVisitor(params, token)
        ]);
  
        setruanganotmil(ruanganResponse.data.records);
        setlokasiotmil(lokasiResponse.data.records);
        setNamaZona(zoneResponse.data.records);
        setDataPetugas(petugasResponse.data.records);
        setDataWBP(wbpResponse.data.records);
        setDatapengunjung(pengunjungResponse.data.records);
  
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (e: any) {
        if (e.response && e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
          Alerts.fire({
            icon: 'warning',
            title: Error403Message,
          });
        } else {
          Alerts.fire({
            icon: 'error',
            title: e.message,
          });
        }
      }
    };
    fetchData();
  }, []);

  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: 'solid 1px pink' }}
    />
  );

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'rgb(30 41 59)',
      borderColor: 'rgb(30 41 59)',
      color: 'white',
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 3,
      paddingRight: 4.5,
      borderRadius: 5,

      '&:hover': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:active': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:focus': {
        borderColor: 'rgb(30 41 59)',
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      color: 'white',
      paddingLeft: '5px',
      paddingRight: '5px',
      backgroundColor: 'rgb(30 41 59)',
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        borderRadius: '6px',

        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? ''
            : isFocused
              ? 'rgb(51, 133, 255)'
              : undefined,

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled,
        },
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: 'white',
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'rgb(51, 133, 255)',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'white',
    }),
  };

  const modalStyles: any = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)', // Background color with transparency for the blur effect
      backdropFilter: 'blur(5px)', // Adjust the blur intensity as needed
      zIndex: 40, // Ensure the backdrop is behind the modal
    },
    modalContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // Add your other modal styles here
    },
  };

  //return
  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full w-[80vh]"> */}
        <div className="modal rounded-sm w-full">
          {isLoading ? (
            <div>
              <div className="flex flex-row-reverse pr-5 pt-3">
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <div className="h-[500px] justify-center flex items-center">
                <svg
                  className="animate-spin h-20 w-20 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Aktivitas Pengunjung'
                      : isEdit
                        ? 'Edit Data Aktivitas '
                        : 'Tambah Data Aktivitas '}
                  </h3>
                </div>

                {/* <div className="w-10"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-95">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                ) : (
                  <button className="pr-90">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                )}
                {/* </div> */}

                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-5 grid grid-cols-2 gap-5 justify-normal">
                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Aktivitas
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
                      name="nama_aktivitas_pengunjung"
                      placeholder="Nama Aktivitas"
                      onChange={handleChange}
                      value={formState.nama_aktivitas_pengunjung}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'nama_aktivitas_pengunjung'
                          ? 'Masukan Aktivitas'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Mulai Berkunjung
                    </label>
                    <div className="flex flex-row">
                      <DatePicker
                        selected={
                          formState.waktu_mulai_kunjungan
                            ? dayjs(formState.waktu_mulai_kunjungan).toDate()
                            : dayjs().toDate()
                        }
                        onChange={handleMulaiBerkunjung}
                        showTimeInput
                        timeFormat="HH:mm"
                        // timeIntervals={15}
                        timeCaption="time"
                        dateFormat="dd/MM/yyyy HH:mm"
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-waktu"
                        name="waktu_mulai_kunjungan"
                        disabled={false}
                        locale="id"
                      />
                      <input
                        type="text"
                        className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                        name="zona_waktu"
                        value={formState.zona_waktu}
                        disabled
                      />
                    </div>
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'waktu_mulai_kunjungan'
                          ? 'Pilih waktu mulai kunjungan'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Selesai Berkunjung
                    </label>
                    <div className="flex flex-row">
                      <DatePicker
                        selected={
                          formState.waktu_selesai_kunjungan
                            ? dayjs(formState.waktu_selesai_kunjungan).toDate()
                            : dayjs().toDate()
                        }
                        onChange={handleSelesaiBerkunjung}
                        showTimeInput
                        timeFormat="HH:mm"
                        // timeIntervals={1}
                        timeCaption="Pilih Waktu"
                        dateFormat="dd/MM/yyyy HH:mm"
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-selesai"
                        name="waktu_selesai_kunjungan"
                        disabled={false}
                        locale="id"
                      />
                      <input
                        type="text"
                        className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                        name="zona_waktu"
                        value={formState.zona_waktu}
                        disabled
                      />
                    </div>
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'waktu_selesai_kunjungan'
                          ? 'Pilih waktu selesai kunjungan'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tujuan Berkunjung
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-tujuan"
                      name="tujuan_kunjungan"
                      placeholder="Tujuan kunjungan"
                      onChange={handleChange}
                      value={formState.tujuan_kunjungan}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'tujuan_kunjungan'
                          ? 'Masukan tujuan kunjungan'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      htmlFor="ruangan_otmil_id"
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Pilih Ruangan otmil
                    </label>
                    <Select
                      className="basic-single p-ruang"
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.ruangan_otmil_id,
                              label: formState.nama_ruangan_otmil,
                            }
                          : formState.ruangan_otmil_id
                      }
                      placeholder={'Pilih Ruangan'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="ruangan_otmil_id"
                      styles={customStyles}
                      options={ruanganotmil.map((item: any) => ({
                        value: item.ruangan_otmil_id,
                        label: item.nama_ruangan_otmil,
                      }))}
                      onChange={handleRuanganChange}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'ruangan_otmil_id'
                          ? 'Pilih Ruangan Otmil'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="jenis_ruangan_otmil"
                    >
                      Jenis Ruangan
                    </label>
                    <input
                      type="text"
                      id="jenis_ruangan_otmil"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-jenis"
                      name="jenis_ruangan_otmil"
                      value={formState.jenis_ruangan_otmil}
                      disabled={isDetail || isEdit}
                      placeholder="Jenis ruangan"
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'jenis_ruangan_otmil'
                          ? 'Masukan Jenis Ruangan'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      htmlFor="nama_lokasi_otmil"
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Nama Lokasi otmil
                    </label>
                    <input
                      type="text"
                      id="nama_lokasi_otmil"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-lokasi"
                      name="nama_lokasi_otmil"
                      value={formState.nama_lokasi_otmil}
                      disabled={isDetail || isEdit}
                      placeholder="Nama lokasi"
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_lokasi_otmil'
                          ? 'Masukan Nama Lokasi'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full">
                    <label
                      htmlFor="nama_zona"
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Zona
                    </label>
                    <input
                      type="text"
                      id="nama_zona"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-zona"
                      name="nama_zona"
                      onChange={handleChange}
                      defaultValue={formState.status_zona_ruangan_otmil}
                      value={formState.nama_zona}
                      disabled={isDetail || isEdit}
                      placeholder="Zona"
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_zona' ? 'Masukan Zona' : '',
                      )}
                    </p>
                  </div>

                  {/* Petugas */}
                  <div className="form-group w-full ">
                    <label
                      className=" mb-1.5 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Petugas
                    </label>
                    <Select
                      className="basic-single p-petugas"
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                        ? {
                            value: formState.petugas_id,
                            label: `${formState.nama_petugas} (${formState.nrp_petugas})`,
                          }
                        : formState.petugas_id
                    }
                      placeholder={'Pilih Petugas'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="petugas_id"
                      styles={customStyles}
                      options={dataPetugas.map((item: any) => ({
                        value: item.petugas_id,
                        label: `${item.nama} (${item.nrp})`, // Menggabungkan nama dan nrp
                    }))}
                      onChange={handleSelectStaff}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'petugas_id' ? 'Pilih Petugas' : '',
                      )}
                    </p>
                  </div>

                  {/* pengunjung */}
                  <div className="form-group w-full ">
                    <label
                      className=" mb-1.5 block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Pengunjung
                    </label>
                    <Select
                      className="basic-single p-pengunjung"
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.pengunjung_id,
                              label: formState.nama_pengunjung,
                            }
                          : formState.pengunjung_id
                      }
                      placeholder={'Pilih pengunjung'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="pengunjung_id"
                      styles={customStyles}
                      options={Datapengunjung.map((item: any) => ({
                        value: item.pengunjung_id,
                        label: item.nama,
                      }))}
                      onChange={handlePengunjungChange}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'pengunjung_id' ? 'Pilih pengunjung' : '',
                      )}
                    </p>
                  </div>

                  {/* Nama WBP */}
                  <div className="form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama WBP
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-wbp"
                      name="nama_wbp"
                      placeholder="Nama tersangka"
                      onChange={handleChange}
                      value={formState.nama_wbp}
                      disabled
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_wbp' ? 'Pilih Tersangka' : '',
                      )}
                    </p>
                  </div>
                </div>
                {errors.filter((item: string) => item.startsWith('INVALID_ID'))
                  .length > 0 && (
                  <>
                    <br />
                    <div className="error">
                      {errors
                        .filter((item: string) =>
                          item.startsWith('INVALID_ID'),
                        )[0]
                        .replace('INVALID_ID_', '')}{' '}
                      is not a valid bond
                    </div>
                  </>
                )}

                <br></br>
                {isDetail ? null : isEdit ? (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? 'bg-slate-400' : ''
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                    id="b-ubah"
                  >
                    {buttonLoad ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      ''
                    )}
                    Ubah Data Aktivitas
                  </button>
                ) : (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? 'bg-slate-400' : ''
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                    id="b-tambah"
                  >
                    {buttonLoad ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      ''
                    )}
                    Tambah Data Aktivitas
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
