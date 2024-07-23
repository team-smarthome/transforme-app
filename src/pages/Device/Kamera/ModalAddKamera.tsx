import React, { useEffect, useRef, useState } from 'react';
import {
  apiBuilding,
  apiReadAllRuanganOtmil,
  apiReadAlllokasiOtmil,
  apiReadZona,
} from '../../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alerts } from './AlertKamera';
import { Error403Message } from '../../../utils/constants';

// interface
interface AddKameraModalProps {
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
interface lokasi {
  nama_lokasi_otmil: string;
}

interface namazona {
  zona_id: string;
  nama_zona: string;
}

export const AddKamera: React.FC<AddKameraModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(defaultValue, 'deff');
  const [building, setBuilding] = useState([]);
  const [formState, setFormState] = useState<any>({
    kamera_id: defaultValue?.kamera_id ?? '',
    nama_kamera: defaultValue?.nama_kamera ?? '',
    url_rtsp: defaultValue?.url_rtsp ?? '',
    ip_address: defaultValue?.ip_address ?? '',
    status_kamera: defaultValue?.status_kamera ?? '',
    merk: defaultValue?.merk ?? '',
    model: defaultValue?.model ?? '',
    jumlah_kamera: 1,
    // lokasi_otmil_id: defaultValue?.lokasi_otmil_id ?? '',
    // nama_lokasi_otmil: defaultValue?.nama_lokasi_otmil ?? '',
    ruangan_otmil_id: defaultValue?.ruangan_otmil_id ?? '',
    // jenis_ruangan_otmil: defaultValue?.jenis_ruangan_otmil ?? '',
    nama_ruangan_otmil: defaultValue?.nama_ruangan_otmil ?? '',
    // zona_id: defaultValue?.zona_id_otmil ?? '',
    // nama_zona: defaultValue?.status_zona_ruangan_otmil ?? '',

    // nama_ruangan_lemasmil: '',
    // jenis_ruangan_lemasmil: '',
    // lokasi_lemasmil_id: '',
    // ruangan_lemasmil_id: '',
  });

  //state
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [NamaZona, setNamaZona] = useState<namazona[]>([]);
  const [ruanganotmil, setruanganotmil] = useState<ruangan[]>([]);
  const [lokasiotmil, setlokasiotmil] = useState<lokasi[]>([]);
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
        // key !== 'lokasi_lemasmil_id' &&
        // key !== 'nama_lokasi_lemasmil' &&
        key !== 'nama_ruangan_lemasmil' &&
        key !== 'jenis_ruangan_lemasmil' &&
        // key !== 'zona_id_lemasmil' &&
        key !== 'status_zona_ruangan_lemasmil' &&
        key !== 'kamera_id' &&
        key !== 'ruangan_lemasmi_id'
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
            title: 'Nama Kamera',
            description: 'Isi nama kamera',
          },
        },
        {
          element: '.i-url',
          popover: {
            title: 'URL RSTP',
            description: 'Isi URL RSTP',
          },
        },
        {
          element: '.i-alamat',
          popover: {
            title: 'Alamat IP',
            description: 'Isi alamat IP',
          },
        },
        {
          element: '#p-status',
          popover: {
            title: 'Status Kamera',
            description: 'Pilih status kamera yang diinginkan',
          },
        },
        {
          element: '.i-merk',
          popover: {
            title: 'Merk',
            description: 'Isi merk kamera',
          },
        },
        {
          element: '.i-model',
          popover: {
            title: 'Model',
            description: 'Isi model kamera',
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
          element: '.i-zona',
          popover: {
            title: 'Zona',
            description: 'Isi zona kamera',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'}`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} data kamera`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  useEffect(() => {
    fetchData();
  }, []);
  let fetchData = async () => {
    try {
      let dataLocal = localStorage.getItem('dataUser');
      let dataUser = JSON.parse(dataLocal!);
      dataUser = {
        // lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
        lokasi_otmil_id: dataUser.lokasi_otmil_id,
        // nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
        // nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
      };
      console.log('data user', dataUser);

      const response = await apiReadAllRuanganOtmil(dataUser, token);

      if (response.data.status === 'OK') {
        setBuilding(response);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      console.log('error', e);
      // if (e.response.status === 403) {
      //   navigate('/auth/signin', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.response.status === 403 ? 'warning' : 'error',
      //   title: e.response.status === 403 ? Error403Message : e.message,
      // });
    }
    // setIsLoading(false);
  };
  // let fetchData = async () => {
  //   try {
  //     let dataLocal = localStorage.getItem('dataUser');
  //     let dataUser = JSON.parse(dataLocal!);
  //     dataUser = {
  //       lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
  //       lokasi_otmil_id: dataUser.lokasi_otmil_id,
  //       nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
  //       nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
  //     };
  //     console.log('data user', dataUser);

  //     const response = await apiBuilding(dataUser, token);

  //     if (response.data.status === 'OK') {
  //       setBuilding(response);
  //     } else {
  //       throw new Error(response.data.message);
  //     }
  //   } catch (e: any) {
  //     console.log('error', e);
  //     // if (e.response.status === 403) {
  //     //   navigate('/auth/signin', {
  //     //     state: { forceLogout: true, lastPage: location.pathname },
  //     //   });
  //     // }
  //     // Alerts.fire({
  //     //   icon: e.response.status === 403 ? 'warning' : 'error',
  //     //   title: e.response.status === 403 ? Error403Message : e.message,
  //     // });
  //   }
  //   // setIsLoading(false);
  // };

  console.log(building, 'building ini');
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'formState');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    // closeModal();
  };

  const handleRuanganChange = (e: any) => {
    const selectedRuangan = e.value;

    // Temukan data ruangan berdasarkan ID yang dipilih
    const selectedData = ruanganotmil.find(
      (item) => item.ruangan_otmil_id === selectedRuangan,
    );
    if (selectedData) {
      setFormState({
        ...formState,
        ruangan_otmil_id: selectedData.ruangan_otmil_id,
        nama_ruangan_otmil: selectedData.nama_ruangan_otmil,
        // jenis_ruangan_otmil: selectedData.jenis_ruangan_otmil,
        // lokasi_otmil_id: selectedData.lokasi_otmil_id,
        // nama_lokasi_otmil: selectedData.nama_lokasi_otmil,
        zona_id: selectedData.zona_id,
        nama_zona: selectedData.nama_zona,
      });
    } else {
      setFormState({
        ...formState,
        ruangan_otmil_id: '',
        nama_ruangan_otmil: '',
        // jenis_ruangan_otmil: '',
        // lokasi_otmil_id: '',
        nama_lokasi_otmil: '',
        zona_id: '',
        nama_zona: '',
      });
    }
  };

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      let params = {
        pageSize: 1000,
        page: 1,
        filter: {
          nama_lokasi_otmil: 'Cimahi',
        },
      };
      try {
        const ruangan = await apiReadAllRuanganOtmil(params, token);
        const ruanganlem = ruangan.data.records;
        setruanganotmil(ruanganlem);

        const lokasi = await apiReadAlllokasiOtmil(params, token);
        const lokasilem = lokasi.data.records;
        setlokasiotmil(lokasilem);

        const zone = await apiReadZona(token);
        const zona = zone.data.records;
        setNamaZona(zona);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (e: any) {
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      }
    };
    fetchData();
  }, []);

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
                      ? 'Detail Data Kamera'
                      : isEdit
                        ? 'Edit Data Kamera'
                        : 'Tambah Data Kamera'}
                  </h3>
                </div>

                {/* <div className="w-10"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-100">
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
                <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-1 justify-normal">
                  <div className="form-group h-22 w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama kamera
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
                      name="nama_kamera"
                      placeholder="Nama Kamera"
                      onChange={handleChange}
                      value={formState.nama_kamera}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'nama_kamera' ? 'Pilih Kamera' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group h-22 w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      URL RSTP
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-url"
                      name="url_rtsp"
                      placeholder="URL RSTP"
                      onChange={handleChange}
                      value={formState.url_rtsp}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'url_rtsp' ? 'Pilih URL RSTP' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group h-22 w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Alamat IP
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-alamat"
                      name="ip_address"
                      placeholder="Alamat IP"
                      onChange={handleChange}
                      value={formState.ip_address}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'ip_address' ? 'Pilih Alamat IP' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group h-22 w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Status Kamera
                    </label>
                    <select
                      className="w-full rounded border border-stroke py-[13.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="status_kamera"
                      onChange={handleChange}
                      value={formState.status_kamera}
                      disabled={isDetail}
                      id="p-status"
                    >
                      <option disabled value="">
                        Pilih status
                      </option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'status_kamera' ? 'Pilih Status Kamera' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group h-22 w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Merk
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-merk"
                      name="merk"
                      placeholder="Merk"
                      onChange={handleChange}
                      value={formState.merk}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'merk' ? 'Pilih Merk' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group h-22 w-full capitalize">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      model
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-model"
                      name="model"
                      placeholder="model"
                      onChange={handleChange}
                      value={formState.model}
                      disabled={isDetail}
                    />
                    <p className="error-text p-0 m-0">
                      {errors.map((item) =>
                        item === 'model' ? 'Pilih model' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group h-22 w-full">
                    <label htmlFor="ruangan_otmil_id">
                      Pilih Ruangan Otmil:
                    </label>
                    <Select
                      className="basic-single p-ruang"
                      classNamePrefix="select"
                      isSearchable={true}
                      isClearable={true}
                      isDisabled={isDetail}
                      styles={customStyles}
                      name="ruangan_otmil_id"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.ruangan_otmil_id,
                              label: formState.nama_ruangan_otmil,
                            }
                          : formState.ruangan_otmil_id
                      }
                      // onChange={handleRuanganChange}
                      // options={building?.data?.records?.gedung?.flatMap(
                      //   (gedung) =>
                      //     gedung.lantai.flatMap((lantai) =>
                      //       lantai.ruangan.map((ruangan) => ({
                      //         value: ruangan.ruangan_otmil_id,
                      //         label: ruangan.nama_ruangan_otmil,
                      //       })),
                      //     ),
                      // )}

                      options={building?.data?.records.map((item: any) => ({
                        value: item.ruangan_otmil_id,
                        label: item.nama_ruangan_otmil,
                      }))}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          ruangan_otmil_id: e?.value,
                          nama_ruangan_otmil: e?.label,
                        });
                      }}
                    />
                    {/* <select
                      id="ruangan_otmil_id"
                      name="ruangan_otmil_id"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary p-ruang"
                      value={formState.ruangan_otmil_id}
                      onChange={handleRuanganChange}
                      disabled={isDetail}
                    >
                      <option value="">Pilih Ruangan</option>
                      {ruanganotmil.map((item) => (
                        <option
                          key={item.ruangan_otmil_id}
                          value={item.ruangan_otmil_id}
                        >
                          {item.nama_ruangan_otmil}
                        </option>
                      ))}
                    </select> */}
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'ruangan_otmil_id'
                          ? 'Pilih Ruangan Otmil'
                          : '',
                      )}
                    </p>
                  </div>

                  {/* <div className="form-group h-22 w-full">
                    <label htmlFor="jenis_ruangan_otmil">Jenis Ruangan:</label>
                    <input
                      type="text"
                      id="jenis_ruangan_otmil"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-jenis"
                      name="jenis_ruangan_otmil"
                      value={formState.jenis_ruangan_otmil}
                      disabled={isDetail || isEdit}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'jenis_ruangan_otmil'
                          ? 'Masukan Jenis Ruangan'
                          : '',
                      )}
                    </p>
                  </div> */}

                  {/* <div className="form-group h-22 w-full">
                    <label htmlFor="nama_lokasi_otmil">
                      Nama Lokasi otmil:
                    </label>
                    <input
                      type="text"
                      id="nama_lokasi_otmil"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-lokasi"
                      name="nama_lokasi_otmil"
                      value={formState.nama_lokasi_otmil}
                      disabled={isDetail || isEdit}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_lokasi_otmil'
                          ? 'Masukan Nama Lokasi'
                          : '',
                      )}
                    </p>
                  </div> */}
                  {/* <div className="form-group h-22 w-full">
                    <label htmlFor="nama_zona">Zona :</label>
                    <input
                      type="text"
                      id="nama_zona"
                      className="w-full rounded border border-stroke py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-zona"
                      name="nama_zona"
                      onChange={handleChange}
                      defaultValue={formState.status_zona_ruangan_otmil}
                      value={formState.nama_zona}
                      disabled={isDetail || isEdit}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_zona' ? 'Masukan Zona' : '',
                      )}
                    </p>
                  </div> */}
                </div>

                <div className={` ${isDetail ? 'h-auto' : 'h-15'}  mt-3`}>
                  {/* <br></br> */}
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
                      Ubah Data Kamera
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
                      Tambah Data Kamera
                    </button>
                  )}
                  {errors.filter((item: string) =>
                    item.startsWith('INVALID_ID'),
                  ).length > 0 && (
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
                  {errors.length > 0 && (
                    <div className="error text-center">
                      <p className="text-red-400">
                        Ada data yang masih belum terisi !
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
