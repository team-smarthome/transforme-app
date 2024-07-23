import React, { useEffect, useRef, useState } from 'react';
import {
  apiLantaiOtmilRead,
  apiReadAllRuanganSummary,
  apiReadAlllokasiOtmil,
  apiReadZona,
} from '../../../services/api';
import Select from 'react-select';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alerts } from './AlertRoom';
import { Error403Message } from '../../../utils/constants';

// interface
interface AddRoomModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

interface LokasiRuangan {
  lokasi_otmil_id: string;
  nama_lokasi_otmil: string;
}

interface Zona {
  zona_id: string;
  nama_zona: string;
}

interface LantaiOtmil {
  lantai_otmil_id: string;
  nama_lantai: string;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const [formState, setFormState] = useState(
    defaultValue || {
      nama_ruangan_otmil: '',
      jenis_ruangan_otmil: '',
      lokasi_otmil_id: '',
      zona_id: '',
      lantai_otmil_id: '',
      nama_lantai: '',
    },
  );

  console.log(defaultValue, 'Default');

  const [errors, setErrors] = useState({
    nama: '',
    jenis: '',
    zona: '',
    lokasi: '',
    panjang: '',
    lebar: '',
    posisi_X: '',
    posisi_Y: '',
    lantai: '',
  });
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [lokasi, setLokasi] = useState<LokasiRuangan[]>([]);
  const [zona, setZona] = useState<Zona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalWbp, setTotalWbp] = useState({
    total_gateway: '',
    total_kamera: '',
    total_wbp: '',
  });

  const [isLantai, setIsLantai] = useState<LantaiOtmil[]>([]);
  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem('dataUser');
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  const fetchData = () => {
    let parameter = {
      filter: {
        ruangan_otmil_id: formState.ruangan_otmil_id,
      },
    };
    let params = {};

    apiReadAlllokasiOtmil(params, token)
      .then((res: any) => {
        setLokasi(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });

    apiReadZona(token)
      .then((res: any) => {
        setZona(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });

    // // apiReadAllRuanganSummary(parameter, token)
    // //   .then((res: any) => {
    // //     setTotalWbp(res.data.records);
    // //   })
    //   .catch((e: any) => {
    //     if (e.response.status === 403) {
    //       navigate('/auth/signin', {
    //         state: { forceLogout: true, lastPage: location.pathname },
    //       });
    //     }
    //     Alerts.fire({
    //       icon: e.response.status === 403 ? 'warning' : 'error',
    //       title: e.response.status === 403 ? Error403Message : e.message,
    //     });
    //   });

    apiLantaiOtmilRead(params, token)
      .then((res: any) => {
        setIsLantai(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  useEffect(() => {
    // console.log(isLantai, 'lantai');
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchData();
  }, []);

  const validateForm = () => {
    console.log('FromState', formState);
    const newErrors = {
      nama: '',
      jenis: '',
      zona: '',
      lokasi: '',
      panjang: '',
      lebar: '',
      posisi_X: '',
      posisi_Y: '',
      lantai: '',
    };

    if (
      formState.nama_ruangan_otmil &&
      formState.jenis_ruangan_otmil &&
      formState.zona_id &&
      formState.lokasi_otmil_id &&
      formState.lantai_otmil_id
    ) {
      // Menghapus semua kesalahan jika kondisi ini terpenuhi
      setErrors({
        ...errors,
        nama: '',
        jenis: '',
        zona: '',
        lokasi: '',
        panjang: '',
        lebar: '',
        posisi_X: '',
        posisi_Y: '',
        lantai: '',
      });

      return true;
    } else {
      if (!formState.nama_ruangan_otmil) {
        newErrors.nama = 'Nama Ruangan harus diisi';
      }
      if (!formState.jenis_ruangan_otmil) {
        newErrors.jenis = 'Jenis Ruangan harus diisi';
      }
      if (!formState.zona_id) {
        newErrors.zona = 'Zona Ruangan harus diisi';
      }
      if (!formState.lokasi_otmil_id) {
        newErrors.lokasi = 'Lokasi harus diisi';
      }
      if (!formState.panjang) {
        newErrors.panjang = 'Panjang harus diisi';
      }
      if (!formState.lebar) {
        newErrors.lebar = 'Lebar harus diisi';
      }
      if (!formState.posisi_X) {
        newErrors.posisi_X = 'Posisi X harus diisi';
      }
      if (!formState.posisi_Y) {
        newErrors.posisi_Y = 'Posisi Y harus diisi';
      }
      if (!formState.lantai_otmil_id) {
        console.log(formState.lantai_otmil_id, 'kondisi_Lantai');
        newErrors.lantai = 'Lantai harus diisi';
      }
      // Mengatur kesalahan sesuai dengan validasi
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return false;
      }
      return true;
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formState, 'formState_submit');
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formState);
    }

    console.log(formState, 'formState submit');
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

  const handleClickTutorial = () => {
    const steps = [
      {
        element: '.f-nama',
        popover: {
          title: 'Nama ruangan',
          description: 'Isi nama ruangan',
        },
      },
      {
        element: '.f-panjang',
        popover: {
          title: 'Panjang',
          description: 'Isi ukuran panjang yang diinginkan',
        },
      },
      {
        element: '.f-lebar',
        popover: {
          title: 'Lebar',
          description: 'Isi ukuran lebar yang diinginkan',
        },
      },
      {
        element: '.f-x',
        popover: {
          title: 'Posisi X',
          description: 'Menentukan posisi X yang diinginkan',
        },
      },
      {
        element: '.f-y',
        popover: {
          title: 'Posisi Y',
          description: 'Menentukan posisi Y yang diinginkan',
        },
      },
      {
        element: '.f-jenis-ruangan-modal',
        popover: {
          title: 'Jenis ruangan ',
          description: 'Pilih jenis ruangan',
        },
      },
      {
        element: '.f-zona',
        popover: {
          title: 'Zona ruangan',
          description: 'Pilih zona ruangan',
        },
      },
      {
        element: '.f-lokasi',
        popover: {
          title: 'Lokasi',
          description: 'Pilih lokasi',
        },
      },
      {
        element: '.f-lantai',
        popover: {
          title: 'Lantai',
          description: 'Pilih lantai',
        },
      },
      {
        element: `.b-submit`,
        popover: {
          title: `${isEdit ? 'Ubah' : 'Tambah'}`,
          description: `Klik untuk ${
            isEdit ? 'mengubah' : 'menambahkan'
          } data ruangan`,
        },
      },
    ];

    const driverObj: any = driver({
      showProgress: true,
      steps: steps,
    });

    driverObj.drive();
  };

  const handleSelectLantaiOtmil = (e: any) => {
    setFormState({ ...formState, lantai_otmil_id: e?.value });
  };

  const handleSelectLokasiOtmil = (e: any) => {
    setFormState({ ...formState, lokasi_otmil_id: e?.value });
  };

  const handleSelectZona = (e: any) => {
    setFormState({ ...formState, zona_id: e?.value });
  };

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        <div
          className={`modal rounded-sm border border-slate-600 bg-slate-600 shadow-default w-full ${
            isDetail ? 'h-full' : 'h-full'
          }`}
        >
          {isLoading ? (
            <div
              className={`justify-center flex items-center ${
                isDetail ? 'py-50' : 'py-40'
              }`}
            >
              <svg
                className="animate-spin h-20 w-20 text-white"
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
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between mb-2  items-center  ">
                <div className="flex items-center gap-4  w-full">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Ruangan'
                      : isEdit
                      ? 'Edit Data Ruangan'
                      : 'Tambah Data Ruangan'}
                  </h3>

                  {isDetail ? null : isEdit ? (
                    <button className="">
                      <HiQuestionMarkCircle
                        // values={filter}
                        aria-placeholder="Show tutorial"
                        onClick={handleClickTutorial}
                      />
                    </button>
                  ) : (
                    <button className="">
                      <HiQuestionMarkCircle
                        // values={filter}
                        aria-placeholder="Show tutorial"
                        onClick={handleClickTutorial}
                      />
                    </button>
                  )}
                </div>

                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="f-nama form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Nama Ruangan
                      </label>
                      <input
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                        name="nama_ruangan_otmil"
                        placeholder="Nama Ruangan"
                        onChange={handleChange}
                        value={formState.nama_ruangan_otmil}
                        disabled={isDetail}
                      />
                      {errors.nama ? (
                        <h1 className="pl-2 text-xs text-red-400">
                          {errors.nama}
                        </h1>
                      ) : (
                        <h1 className="h-4"></h1>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="f-nama form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Panjang
                      </label>
                      <input
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary f-panjang"
                        name="panjang"
                        placeholder="Panjang"
                        onChange={handleChange}
                        value={formState.panjang}
                        disabled={isDetail}
                      />
                      {errors.panjang ? (
                        <h1 className="pl-2 text-xs text-red-400">
                          {errors.panjang}
                        </h1>
                      ) : (
                        <h1 className="h-4"></h1>
                      )}
                    </div>
                    <div className="f-nama form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Lebar
                      </label>
                      <input
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary f-lebar"
                        name="lebar"
                        placeholder="Lebar"
                        onChange={handleChange}
                        value={formState.lebar}
                        disabled={isDetail}
                      />
                      {errors.lebar ? (
                        <h1 className="pl-2 text-xs text-red-400">
                          {errors.lebar}
                        </h1>
                      ) : (
                        <h1 className="h-4"></h1>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="f-nama form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Posisi X
                      </label>
                      <input
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary f-x"
                        name="posisi_X"
                        placeholder="Posisi X"
                        onChange={handleChange}
                        value={formState.posisi_X}
                        disabled={isDetail}
                      />
                      {errors.posisi_X ? (
                        <h1 className="pl-2 text-xs text-red-400">
                          {errors.posisi_X}
                        </h1>
                      ) : (
                        <h1 className="h-4"></h1>
                      )}
                    </div>
                    <div className="f-nama form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Posisi Y
                      </label>
                      <input
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary f-y"
                        name="posisi_Y"
                        placeholder="Posisi Y"
                        onChange={handleChange}
                        value={formState.posisi_Y}
                        disabled={isDetail}
                      />
                      {errors.posisi_Y ? (
                        <h1 className="pl-2 text-xs text-red-400">
                          {errors.posisi_Y}
                        </h1>
                      ) : (
                        <h1 className="h-4"></h1>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Jenis Ruangan
                      </label>
                      {!isDetail ? (
                        <>
                          <select
                            className="f-jenis-ruangan-modal capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                            name="jenis_ruangan_otmil"
                            onChange={handleChange}
                            value={formState.jenis_ruangan_otmil}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Jenis Ruangan
                            </option>
                            <option value="Fasilitas Kegiatan">
                              Fasilitas Kegiatan
                            </option>
                            <option value="Ruang Ibadah">Ruang Ibadah</option>
                            <option value="Kantor">Kantor</option>
                            <option value="Kamar">Kamar</option>
                          </select>
                          {errors.jenis ? (
                            <h1 className="pl-2 text-xs text-red-400">
                              {errors.jenis}
                            </h1>
                          ) : (
                            <h1 className="h-4"></h1>
                          )}
                        </>
                      ) : (
                        <input
                          className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="jenis_ruangan_otmil"
                          placeholder="Jenis Ruangan"
                          onChange={handleChange}
                          value={formState.jenis_ruangan_otmil}
                          disabled={isDetail}
                        />
                      )}
                    </div>

                    <div className="form-group w-full ">
                      <div className="f-pangkat form-group w-full flex flex-col">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Zona
                        </label>
                        <Select
                          className="basic-single f-zona"
                          classNamePrefix="select"
                          styles={customStyles}
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.zona_id,
                                  label: formState.nama_zona,
                                }
                              : formState.zona_id
                          }
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih Zona"
                          name="zona_id"
                          options={zona.map((item: any) => ({
                            value: item.zona_id,
                            label: item.nama_zona,
                          }))}
                          onChange={handleSelectZona}
                        />
                        <p className="error-text">
                          {errors.zona ? (
                            <h1 className="pl-2 text-xs text-red-400">
                              {errors.zona}
                            </h1>
                          ) : (
                            <h1 className="h-4"></h1>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="form-group w-full ">
                      <div className="f-pangkat form-group w-full flex flex-col">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Lokasi
                        </label>
                        <Select
                          className="basic-single f-lokasi"
                          classNamePrefix="select"
                          styles={customStyles}
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.lokasi_otmil_id,
                                  label: formState.nama_lokasi_otmil,
                                }
                              : formState.lokasi_otmil_id
                          }
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih Lokasi"
                          name="lokasi_otmil_id"
                          options={lokasi.map((item: any) => ({
                            value: item.lokasi_otmil_id,
                            label: item.nama_lokasi_otmil,
                          }))}
                          onChange={handleSelectLokasiOtmil}
                        />
                        <p className="error-text">
                          {errors.lokasi ? (
                            <h1 className="pl-2 text-xs text-red-400">
                              {errors.lokasi}
                            </h1>
                          ) : (
                            <h1 className="h-4"></h1>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="form-group w-full ">
                      <div className="f-pangkat form-group w-full flex flex-col">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Lantai
                        </label>
                        <Select
                          className="basic-single f-lantai"
                          classNamePrefix="select"
                          styles={customStyles}
                          defaultValue={
                            (console.log(formState, 'lantaiTesting'),
                            isEdit || isDetail
                              ? {
                                  value: formState.lantai_otmill_id,
                                  label: formState.nama_lantai,
                                }
                              : formState.lantai_otmil_id)
                          }
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih lantai"
                          name="lantai_otmil_id"
                          options={isLantai.map(
                            (item: any) => (
                              console.log(item.lantai_otmil_id, 'lantai2'),
                              {
                                value: item.lantai_otmil_id,
                                label: item.nama_lantai,
                              }
                            ),
                          )}
                          onChange={handleSelectLantaiOtmil}
                        />
                        <p className="error-text">
                          {errors.lantai ? (
                            <h1 className="pl-2 text-xs text-red-400">
                              {errors.lantai}
                            </h1>
                          ) : (
                            <h1 className="h-4"></h1>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* {!isDetail ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group w-full ">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Lokasi
                        </label>
                        <select
                          className="f-lokasi w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="lokasi_otmil_id"
                          onChange={handleChange}
                          value={formState.lokasi_otmil_id}
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih Lokasi
                          </option>
                          {lokasi.map((item) => (
                            <option value={item.lokasi_otmil_id}>
                              {item.nama_lokasi_otmil}
                            </option>
                          ))}
                        </select>
                        {errors.lokasi ? (
                          <h1 className="pl-2 text-xs text-red-400">
                            {errors.lokasi}
                          </h1>
                        ) : (
                          <h1 className="h-4"></h1>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group w-full ">
                          <label
                            className="block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Kode Lokasi
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                            name="nama_lokasi_otmil"
                            placeholder="Nama Lokasi"
                            onChange={handleChange}
                            value={formState.nama_lokasi_otmil}
                            disabled={isDetail}
                          />
                        </div>
                        <div className="form-group w-full ">
                          <label
                            className="block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Jumlah Tahanan
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                            name="nama_ruangan_otmil"
                            placeholder="Nama Ruangan"
                            onChange={handleChange}
                            value={totalWbp.total_gateway}
                            disabled={isDetail}
                          />
                        </div>
                      </div>
                    </>
                  )} */}
                  {/* {!isDetail ? (
                    <></>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group w-full ">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Jumlah Gateway
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="nama_ruangan_otmil"
                          placeholder="Nama Ruangan"
                          onChange={handleChange}
                          value={totalWbp.total_gateway}
                          disabled={isDetail}
                        />
                      </div>
                      <div className="form-group w-full ">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Jumlah Kamera
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary"
                          name="nama_ruangan_otmil"
                          placeholder="Nama Ruangan"
                          onChange={handleChange}
                          value={totalWbp.total_kamera}
                          disabled={isDetail}
                        />
                      </div>
                    </div>
                  )} */}
                </div>
                <br></br>
                {isDetail ? null : (
                  <button
                    className="b-submit btn w-full flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Submit
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
