import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Alerts } from './AlertPengadilanMiliter';
import { apiReadKota, apiReadProvinsi } from '../../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../../utils/constants';

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
console.log(dataAdmin, 'DATA ADMIN');

export const AddPengadilanMiliterModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState(
    defaultValue || {
      nama_pengadilan_militer: '',
      provinsi_id: '',
      kota_id: '',
      latitude: '',
      longitude: '',
    },
  );

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [filter, setFilter] = useState('');

  console.log(dataKota, 'kota');
  console.log(dataProvinsi, 'Provinsi');

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (!value) {
        errorFields.push(key);
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
            title: 'Nama Pengadilan Militer',
            description: 'Isi nama pengadilan militer',
          },
        },
        {
          element: '.s-prov',
          popover: {
            title: 'Provinsi',
            description: 'Isi provinsi',
          },
        },
        {
          element: '.p-kota',
          popover: {
            title: 'Kota',
            description: 'Pilih kota yang diinginkan',
          },
        },
        {
          element: '.i-latitute',
          popover: {
            title: 'Latitute',
            description: 'Isi latitute',
          },
        },
        {
          element: '.i-long',
          popover: {
            title: 'Longitude',
            description: 'Isi longitude',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'}`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} data pengadilan militer`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'From State');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(() => setButtonLoad(false));
    console.log('berhasil');
  };

  const handleSelectProvinsi = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, provinsi_id: e?.value });
  };

  const handleSelectKota = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, kota_id: e?.value });
  };

  useEffect(() => {
    Promise.all([Provinsi(), Kota()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const Provinsi = async () => {
    let params = {
      pageSize: 10000,
    };
    await apiReadProvinsi(params, token)
      .then((res) => {
        setDataProvinsi(res.records);
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

  const Kota = async () => {
    let params = {
      pageSize: 10000,
    };
    await apiReadKota(params, token)
      .then((res) => {
        setDataKota(res.records);
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

  return (
    // <div
    //   ref={modalContainerRef}
    //   className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-y-scroll "
    // >
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
                      ? 'Detail Data Pengadilan Militer'
                      : isEdit
                        ? 'Edit Data Pengadilan Militer'
                        : 'Tambah Data Pengadilan Militer'}
                  </h3>
                </div>

                {isDetail ? null : isEdit ? (
                  <button className="pr-65">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                ) : (
                  <button className="pr-55">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                )}

                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  <div className="form-group w-full mt-4 relative h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Pengadilan Militer
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
                      name="nama_pengadilan_militer"
                      placeholder="Nama Pengadilan Militer"
                      onChange={handleChange}
                      value={formState.nama_pengadilan_militer}
                      disabled={isDetail}
                    />
                    <p className="error-text bottom-0">
                      {errors.map((item) =>
                        item === 'nama_pengadilan_militer'
                          ? 'Masukan Nama Pengadilan Militer'
                          : '',
                      )}
                    </p>
                  </div>

                  {/* Provinsi */}
                  <div className="form-group w-full relative h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Provinsi
                    </label>
                    <Select
                      className="basic-single s-prov"
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.provinsi_id,
                              label: formState.nama_provinsi,
                            }
                          : formState.provinsi_id
                      }
                      placeholder={'Pilih provinsi'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="provinsi_id"
                      styles={customStyles}
                      options={dataProvinsi.map((item: any) => ({
                        value: item.provinsi_id,
                        label: item.nama_provinsi,
                      }))}
                      onChange={handleSelectProvinsi}
                    />
                    <p className="error-text bottom-0">
                      {errors.map((item) =>
                        item === 'provinsi_id' ? 'Pilih provinsi' : '',
                      )}
                    </p>
                  </div>
                  {/* Kota */}
                  <div className="form-group w-full relative h-21">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Kota
                    </label>
                    <Select
                      className="basic-single p-kota"
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.kota_id,
                              label: formState.nama_kota,
                            }
                          : formState.kota_id
                      }
                      placeholder={'Pilih kota'}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="kota_id"
                      styles={customStyles}
                      options={dataKota
                        .filter((item: any) => {
                          return item.provinsi_id === formState.provinsi_id;
                        })
                        .map((item: any) => ({
                          value: item.kota_id,
                          label: item.nama_kota,
                        }))}
                      onChange={handleSelectKota}
                    />
                    <p className="error-text bottom-0">
                      {errors.map((item) =>
                        item === 'kota_id' ? 'Pilih kota' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full relative h-22 ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Latitute
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-latitute"
                      name="latitude"
                      placeholder="Latitute"
                      onChange={handleChange}
                      value={formState.latitude}
                      disabled={isDetail}
                    />
                    <p className="error-text bottom-0">
                      {errors.map((item) =>
                        item === 'latitude' ? 'Masukan Latitute' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full relative h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Longitude
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-long"
                      name="longitude"
                      placeholder="Longitude"
                      onChange={handleChange}
                      value={formState.longitude}
                      disabled={isDetail}
                    />
                    <p className="error-text bottom-0">
                      {errors.map((item) =>
                        item === 'longitude' ? 'Masukan Longitude' : '',
                      )}
                    </p>
                  </div>
                </div>

                {/* {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
                  .length > 0 && (
                  <div className="error mt-4">
                    <span>Please input :</span>
                    <p className="text-red-400">
                      {errors
                        .filter(
                          (item: string) => !item.startsWith('INVALID_ID')
                        )
                        .join(', ')}
                    </p>
                  </div>
                )} */}

                {/* <br></br> */}
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
                      Ubah Pengadilan Militer
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
                      Tambah Pengadilan Militer
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
