import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import Select from 'react-select';
import { apiReadKasus, apiReadPenyidikan } from '../../../services/api';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import utc from 'dayjs/plugin/utc';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Alerts } from './AlertPenyidikan';
import { Error403Message } from '../../../utils/constants';
import { set } from 'react-hook-form';

dayjs.locale('id');
dayjs.extend(utc);
dayjs.extend(timezone);

export const AddPenyidikanModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState({
    penyidikan_id: defaultValue?.penyidikan_id,
    kasus_id: defaultValue?.kasus_id,
    nomor_penyidikan: defaultValue?.nomor_penyidikan,
    nama_kasus: defaultValue?.nama_kasus,
    agenda_penyidikan: defaultValue?.agenda_penyidikan,
    // waktu_dimulai_penyidikan: dayjs().format('YYYY-MM-DDTHH:mm'), 
    // waktu_selesai_penyidikan: dayjs().format('YYYY-MM-DDTHH:mm'),
    waktu_dimulai_penyidikan: defaultValue?.waktu_dimulai_penyidikan,
    waktu_selesai_penyidikan: defaultValue?.waktu_selesai_penyidikan,
    wbp_profile_id: defaultValue?.wbp_profile_id,
    nomor_kasus: defaultValue?.no_kasus,
    saksi_id: defaultValue?.saksi_id,
    oditur_penyidik_id: defaultValue?.oditur_penyidik_id,
    nama_jenis_perkara: defaultValue?.nama_jenis_perkara,
    nama_kategori_perkara: defaultValue?.nama_kategori_perkara,
    nrp: defaultValue?.nrp,
    zona_waktu: defaultValue?.zona_waktu,
  });

  console.log(formState, 'formstate cuyy');

  const navigate = useNavigate();
  const location = useLocation();

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [dataKasus, setDataKasus] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  const getAllPenyidikan = async () => {
    try {
      const params = { filter: ' ', page: 1, pageSize: 10000 };
      const response = await apiReadPenyidikan(params, token);
      // if (response.data.status !== 'OK') throw new Error(response.data.message);
      // const result = response.data.records;
      // const filter = dataKasus.filter(data => !result.some(dataresult => dataresult.nomor_kasus === data.nomor_kasus));
      // setDataKasus(filter);
    } catch (error) {
      handleErrorResponse(error);
    }
  };
  
  const fetchData = async () => {
    try {
      const params = { pageSize: Number.MAX_SAFE_INTEGER };
      const paramsPenyidikan = { filter: ' ', page: 1, pageSize: 10000 };
      const kasus = await apiReadKasus(params, token);
      const penyidikan = await apiReadPenyidikan(paramsPenyidikan, token);
      console.log(kasus, penyidikan, "dapet cok")
      if (penyidikan.data.status !== 'OK') throw new Error(penyidikan.data.message);
      if (kasus.data.status !== 'OK') throw new Error(kasus.data.message);
      const resultPenyidikan = penyidikan.data.records;
      const resultKasus = kasus.data.records;
      const filter = resultKasus.filter(data => !resultPenyidikan.some((dataresult: any) => dataresult.nomor_kasus === data.nomor_kasus));
      console.log(filter, "dapet coy")
      setDataKasus(resultKasus);
      // setData
      handleTimeZone();
    } catch (error) {
      handleErrorResponse(error);
    }
  };
  
  const handleErrorResponse = error => {
    setIsLoading(false);
    const errorMessage = error.response.status === 403 ? Error403Message : error.message;
    navigate('/auth/signin', {
      state: { forceLogout: error.response.status === 403, lastPage: location.pathname },
    });
    Alerts.fire({ icon: error.response.status === 403 ? 'warning' : 'error', title: errorMessage });
  };
  
  const handleTimeZone = () => {
    setIsLoading(false);
    const timeZone = dayjs().format('Z');
    let zonaWaktu;
    switch (timeZone) {
      case '+07:00':
        zonaWaktu = 'WIB'; break;
      case '+08:00':
        zonaWaktu = 'WITA'; break;
      case '+09:00':
        zonaWaktu = 'WIT'; break;
      default:
        zonaWaktu = 'Zona Waktu Tidak Dikenal';
    }
    if (!formState?.zona_waktu) {
      setFormState({ ...formState, zona_waktu: zonaWaktu });
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const timezone = dayjs();
  console.log('timezone', timezone.format('Z'));

  const validateForm = () => {
    let errorFields = [];

    // Validasi elemen Select
    if (!formState.wbp_profile_id && !formState.saksi_id) {
        errorFields.push('pihak_terlibat');
    }

    for (const [key, value] of Object.entries(formState)) {
        if (
            key !== 'wbp_profile_id' &&
            key !== 'penyidikan_id' &&
            key !== 'nrp' &&
            key !== 'no_kasus' &&
            key !== 'nomor_kasus' &&
            key !== 'saksi_id' &&
            key !== 'oditur_penyidik_id'
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

  //select Penyidik
  const selectedKasus = dataKasus?.find(
    (item: any) => item.kasus_id === formState.kasus_id,
  );

  const penyidikOptions: any = selectedKasus
    ? selectedKasus?.oditur_penyidik?.map((item: any) => ({
        value: item.oditur_penyidik_id,
        label: item.nama_oditur,
      }))
    : [];

  const [dataKasusSelect, setDataKasusSelect] = useState<any>();

  const penyidikOptionsValue = {
    value: defaultValue?.oditur_penyidik_id,
    label: defaultValue?.nama_oditur,
  };

  const onChangePenyidik = (e: any) => {
    setFormState({ ...formState, oditur_penyidik_id: e.value });
  };

  // yg terlibat
  const terlibatOptions = dataKasusSelect
    ? [
        ...dataKasusSelect?.saksi?.map((item: any) => ({
          value: item.saksi_id,
          label: `${item.nama_saksi} (saksi)`,
        })),
        ...dataKasusSelect?.wbp_profile?.map((item: any) => ({
          value: item.wbp_profile_id,
          label: `${item.nama} (tersangka)`,
        })),
      ]
    : [];

  const [terlibatOptionsState, setTerlibatOptionState] = useState([])
    console.log(terlibatOptionsState, "terlibatOptionsState")
  console.log(defaultValue, "terlibat defaul")
  
  const dataSaksi = {
    value: defaultValue.saksi_id,
    label: `${defaultValue.nama_saksi } (saksi)`
  }

  const dataWbp = {
    value: defaultValue.wbp_profile_id,
    label: `${defaultValue.nama_wbp} (tersangka)`
  }

  const splitData: any = [dataSaksi, dataWbp]
  const terlibatOptionsValue = splitData;

  interface Option {
    value: string;
    label: string;
  }
  
  const handleSelectPihakTerlibat = (selectedOptions:any) => {
    if (selectedOptions && selectedOptions.length > 0) {
      let saksiCount = 0;
      let tersangkaCount = 0;
  
      // Iterasi melalui opsi yang dipilih untuk menghitung jumlah saksi dan tersangka yang dipilih
      selectedOptions.forEach(option => {
        if (option.label.includes('(saksi)')) {
          saksiCount++;
        }
        if (option.label.includes('(tersangka)')) {
          tersangkaCount++;
        }
      });
  
      // Jika jumlah saksi atau tersangka yang dipilih melebihi 1, batalkan pemilihan terakhir
      if (saksiCount > 1 || tersangkaCount > 1) {
        // Menghapus opsi terakhir dari yang dipilih
        selectedOptions.pop();
      }
  
      // Setel form state dengan nilai yang ditemukan
      setFormState({
        ...formState,
        saksi_id: selectedOptions.find(option => option.label.includes('(saksi)'))?.value || null,
        wbp_profile_id: selectedOptions.find(option => option.label.includes('(tersangka)'))?.value || null,
        // Sesuaikan dengan cara Anda mendapatkan nilai nrp
        nrp: '', 
      });
    } else {
      // Reset form state jika tidak ada opsi yang dipilih
      setFormState({
        ...formState,
        saksi_id: null,
        wbp_profile_id: null,
        // Reset nilai nrp jika tidak ada opsi yang dipilih
        nrp: '', 
      });
    }
  };
  
  // const handleSelectPihakTerlibat = (e: any) => {
  //   const selectedOption = terlibatOptions.find(
  //     (option) => option.value === e.value,
  //   );

  //   if (selectedOption?.label.includes('(saksi)')) {
  //     setFormState({
  //       ...formState,
  //       saksi_id: e.value,
  //       wbp_profile_id: null,
  //       nrp: '',
  //     });
  //   } else {
  //     setFormState({
  //       ...formState,
  //       wbp_profile_id: e.value,
  //       saksi_id: null,
  //       nrp: selectedOption?.nrp,
  //     });
  //   }

  //   console.log('selectedOption', selectedOption);

  //   console.log('formState', formState);

  //   console.log('e', e);

  //   console.log('terlibatOptions', terlibatOptions);

  //   console.log('terlibatOptionsValue', terlibatOptionsValue);
  // };

  //select kasus
  const kasusOptions = dataKasus?.map((item: any) => ({
    value: item.kasus_id,
    label: item.nomor_kasus,
  }));

  const kasusOptionsValue = {
    value: defaultValue?.kasus_id,
    label: defaultValue?.nomor_kasus,
  };

  const onChangeKasus = (e: any) => {
    const kasusFilter: any = dataKasus.find(
      (item: any) => item.kasus_id === e?.value,
    );
    console.log(kasusFilter, "filter")
    const dataSaksi = {
      value: kasusFilter?.saksi[0]?.saksi_id,
      label: `${kasusFilter?.saksi[0]?.nama_saksi } (saksi)`
    }

    const dataWbp = {
      value: kasusFilter?.wbp_profile[0]?.wbp_profile_id,
      label: `${kasusFilter?.wbp_profile[0]?.nama} (tersangka)`
    }

    const splitData: any = [dataSaksi, dataWbp]
    // const splitData: any = [ ...kasusFilter?.saksi?.map((item: any) => ({
    //   value: item.saksi_id,
    //   label: `${item.nama_saksi} (saksi)`,
    // })),
    // ...kasusFilter?.wbp_profile?.map((item: any) => ({
    //   value: item.wbp_profile_id,
    //   label: `${item.nama} (tersangka)`,
    // }))]
    setTerlibatOptionState(splitData)
    setDataKasusSelect(kasusFilter);
    setFormState({
      ...formState,
      kasus_id: e?.value,
      nomor_kasus: kasusFilter ? kasusFilter.nomor_kasus : '',
      nama_kasus: kasusFilter ? kasusFilter.nama_kasus : '',
      nama_jenis_perkara: kasusFilter ? kasusFilter.nama_jenis_perkara : '',
      nama_kategori_perkara: kasusFilter
        ? kasusFilter.nama_kategori_perkara
        : '',
      saksi_id: dataSaksi.value,
      wbp_profile_id: dataWbp.value
    });
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log('3333', e.target.value);
  };

  const handleChangeWaktu = (e: any) => {
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
      waktu_dimulai_penyidikan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
      zona_waktu: zonaWaktu,
    });
  };
  const handleChangeWaktuSelesai = (e: any) => {
    try {
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
        waktu_selesai_penyidikan: dayjs(e).format('YYYY-MM-DDTHH:mm'),
        zona_waktu: zonaWaktu,
      });
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.input-nomor',
          popover: {
            title: 'Nomor Penyidikan',
            description: 'Isi nomor penyidikan',
          },
        },
        {
          element: '#p-kasus',
          popover: {
            title: 'Nomor Kasus',
            description: 'Pilih nomor kasus yang diinginkan',
          },
        },
        {
          element: '.input-nama',
          popover: { title: 'Nama Kasus', description: 'Isi nama kasus' },
        },
        {
          element: '.input-perkara',
          popover: {
            title: 'Jenis Perkara',
            description: 'Isi jenis perkara',
          },
        },
        {
          element: '.input-kategori',
          popover: {
            title: 'Kategori Perkara',
            description: 'Isi kategori perkara',
          },
        },
        {
          element: '#p-terlibat',
          popover: {
            title: 'Pihak Terlibat',
            description: 'Pilih pihak terlibat yang diinginkan',
          },
        },
        {
          element: '#p-penyidikan',
          popover: {
            title: 'Penyidikan',
            description: 'Pilih penyidikan yang diinginkan',
          },
        },
        {
          element: '.i-waktu',
          popover: {
            title: 'Waktu Mulai Penyidikan',
            description: 'Menentukan tanggal waktu mulai penyidikan',
          },
        },
        {
          element: '.i-selesai',
          popover: {
            title: 'Waktu Selesai Penyidikan',
            description: 'Menentukan tanggal waktu selesai penyidikan',
          },
        },
        {
          element: '.t-agenda',
          popover: {
            title: 'Agenda Penyidikan',
            description: 'Isi agenda penyidikan dengan lengkap',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'} Penyidikan`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} penyidikan`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setButtonLoad(true);
    onSubmit(formState).then(() => 
      setButtonLoad(false),
      setFormSubmitted(true)
    );

    console.log(formState, 'HAHA BYE');
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

  //react Select
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: any) => ({
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
      height: '35px',
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
      fontSize: '16px',
      color: 'grey',
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
      fontSize: '16px',
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
  
  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: 'solid 1px pink' }}
    />
  );

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
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
                <AiOutlineLoading className="animate-spin h-20 w-20 text-white " />
              </div>
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Penyidikan'
                      : isEdit
                        ? 'Edit Data Penyidikan'
                        : 'Tambah Data Penyidikan'}
                  </h3>
                </div>

                {/* <div className="w-10"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-90">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                ) : (
                  <button className="pr-80">
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
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="form-group w-full h-22 mt-4">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Penyidikan
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nomor"
                      name="nomor_penyidikan"
                      onChange={handleChange}
                      value={formState.nomor_penyidikan}
                      disabled
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nomor_penyidikan'
                          ? 'Masukan Nomor Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group h-22 mt-4 w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Kasus
                    </label>
                    <Select
                      placeholder="Nomor Kasus"
                      isDisabled={isDetail}
                      onChange={onChangeKasus}
                      defaultValue={kasusOptionsValue}
                      options={kasusOptions}
                      styles={customStyles}
                      id="p-kasus"
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'kasus_id' ? 'Masukan Nomor Kasus' : '',
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Kasus
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nama"
                      name="nama_kasus"
                      placeholder="Nama Kasus"
                      onChange={handleChange}
                      value={formState.nama_kasus}
                      // disabled={isDetail}
                      disabled
                    />
                    {/* <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nama_kasus' ? 'Masukan Nama Kasus' : '',
                      )}
                    </p> */}
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jenis Perkara
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-perkara"
                      name="nama_jenis_perkara"
                      placeholder="Jenis Perkara"
                      onChange={handleChange}
                      value={formState.nama_jenis_perkara}
                      // disabled={isDetail}
                      disabled
                    />
                    {/* <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nama_jenis_perkara'
                          ? 'Masukan Jenis Perkara'
                          : '',
                      )}
                    </p> */}
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Kategori Perkara
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-kategori"
                      name="nama_kategori_perkara"
                      placeholder="Kategori Perkara"
                      onChange={handleChange}
                      value={formState.nama_kategori_perkara}
                      // disabled={isDetail}
                      disabled
                    />
                    {/* <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nama_kategori_perkara'
                          ? 'Masukan Kategori Perkara'
                          : '',
                      )}
                    </p> */}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Pihak Terlibat
                    </label>
                      <Select
                        isMulti
                        className="capitalize"
                        options={terlibatOptions}
                        isDisabled={true}
                        // defaultValue={isDetail || isEdit ? terlibatOptionsValue.map((data) => (
                        //   {
                        //     label: data.label,
                        //     value: data.value
                        //   }
                        // )) : ''}
                        value={isDetail || isEdit ? terlibatOptionsValue.map((data) => (
                          {
                            label: data.label,
                            value: data.value
                          }
                        )) : terlibatOptionsState.map((data) => (
                          {
                            label: data.label,
                            value: data.value
                          }
                        ))}
                        onChange={handleSelectPihakTerlibat}
                        placeholder="Pihak Terlibat"
                        styles={customStyles}
                        id="p-terlibat"
                      />
                        {/* {errors.includes('pihak_terlibat') && (
                            <p className="error-text">Pilih salah satu pihak terlibat.</p>
                        )} */}
                  </div>
                  {/* <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      NRP
                    </label>
                    <input
                      className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nrp"
                      name="nrp"
                      placeholder="NRP"
                      onChange={handleChange}
                      value={formState.nrp}
                      // disabled={isDetail}
                      disabled
                    />
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'nrp' ? 'Masukan NRP' : '',
                      )}
                    </p>
                  </div> */}
                </div>
                <div className="form-group w-full h-22">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Penyidik
                  </label>
                  <Select
                    onChange={onChangePenyidik}
                    isDisabled={isDetail}
                    defaultValue={penyidikOptionsValue}
                    options={penyidikOptions}
                    placeholder="Penyidik"
                    styles={customStyles}
                    id="p-penyidikan"
                  />
                  <p className="error-text">
                    {errors?.map((item) =>
                      item === 'oditur_penyidik_id' ? 'Pilih Penyidik' : ''
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="form-group w-full h-22">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Mulai Penyidikan
                    </label>

                    <div className="flex items-center justify-center i-waktu">
                      <DatePicker
                        selected = {
                          formState.waktu_dimulai_penyidikan
                          ? dayjs(formState.waktu_dimulai_penyidikan).toDate()
                          : dayjs().toDate()
                        }
                        onChange={handleChangeWaktu}
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeCaption="Pilih Waktu"
                        showTimeInput
                        name='waktu_dimulai_penyidikan'
                        timeInputLabel="Waktu"
                        timeFormat="HH:mm"
                        disabled={false}
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                        locale="id"
                      />

                      <input
                        type="text"
                        value={formState.zona_waktu}
                        disabled
                        className="w-1/4 flex justify-center capitalize rounded border border-stroke p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {/* <p className="error-text">
                      {formSubmitted &&
                        errors.includes('waktu_dimulai_penyidikan') &&
                        'Masukan Waktu Mulai Penyidikan'}
                    </p> */}
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'waktu_dimulai_penyidikan' ? 'Pilih mulai penyidikan' : ''
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Waktu Selesai Penyidikan
                    </label>

                    <div className="flex items-center justify-center i-selesai">
                      <DatePicker
                        selected={
                          formState.waktu_selesai_penyidikan
                            ? dayjs(formState.waktu_selesai_penyidikan).toDate()
                            : dayjs().toDate()
                        }
                        onChange={(date) => handleChangeWaktuSelesai(date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeCaption="Pilih Waktu" // Ganti dengan caption waktu yang diinginkan
                        showTimeInput
                        timeInputLabel="Waktu" // Ganti dengan label waktu yang diinginkan
                        timeFormat="HH:mm" // Ganti dengan format waktu yang diinginkan
                        disabled={false} // Ganti dengan kondisi yang sesuai
                        customTimeInput={<ExampleCustomTimeInput />}
                        className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                        locale="id"
                        name='waktu_selesai_penyidikan'
                      />
                      <input
                        type="text"
                        value={formState.zona_waktu}
                        disabled
                        className="w-1/4 flex justify-center capitalize rounded border border-stroke p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <p className="error-text">
                      {errors?.map((item) =>
                        item === 'waktu_selesai_penyidikan' ? 'Pilih mulai penyidikan' : ''
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="form-group w-full h-29 relative">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Agenda Penyidikan
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-agenda"
                      name="agenda_penyidikan"
                      id="textArea"
                      placeholder="Agenda Penyidikan"
                      onChange={handleChange}
                      value={formState.agenda_penyidikan}
                      disabled={isDetail}
                    />
                    <p className="error-text absolute bottom-1">
                      {errors?.map((item) =>
                        item === 'agenda_penyidikan'
                          ? 'Masukan Agenda Penyidikan'
                          : '',
                      )}
                    </p>
                  </div>
                </div>

                <div className={` ${isDetail ? 'h-auto' : 'h-15'}  mt-3`}>
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
                      Ubah Penyidikan
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
                      Tambah Penyidikan
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
