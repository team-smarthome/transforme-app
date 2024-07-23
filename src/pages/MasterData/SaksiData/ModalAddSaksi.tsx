import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';

import { Alerts } from './AlertSaksi';
import { apiReadKasus } from '../../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../../utils/constants';

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
console.log(dataAdmin, 'DATA ADMIN');

export const AddSaksiModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nama_saksi: '',
      no_kontak: '',
      alamat: '',
      jenis_kelamin: '',
      keterangan: '',
    },
  );
  // const lokasi_lemasmil_id = localStorage.getItem('lokasi_lemasmil_id')

  const navigate = useNavigate();
  const location = useLocation();

  //state
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [dataKasus, setDataKasus] = useState([]);
  const [filter, setFilter] = useState('');

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== 'kasus_id' &&
        key !== 'nama_kasus' &&
        key !== 'keterangan'
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
            title: 'Nama Saksi',
            description: 'Isi nama saksi',
          },
        },
        {
          element: '.i-no',
          popover: {
            title: 'No Kontak',
            description: 'Isi no kontak',
          },
        },
        {
          element: '.p-jenis',
          popover: {
            title: 'Jenis Kelamin',
            description: 'Pilih jenis kelamin',
          },
        },
        {
          element: '.t-alamat',
          popover: {
            title: 'Alamat',
            description: 'Isi alamat dengan lengkap',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'}`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} data tipe`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChangeKasus = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, kasus_id: e?.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'From State');

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(() => setButtonLoad(false));
    console.log('berhasil');
  };

  useEffect(() => {
    Promise.all([
      // Kasusdata()
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  // const Kasusdata = async () => {
  //   let params = {};
  //   await apiReadKasus(params, token)
  //     .then((res) => {
  //       setDataKasus(res.data.records);
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/auth/signin', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });
  // };

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
                      ? 'Detail Data Saksi'
                      : isEdit
                        ? 'Edit Data Saksi'
                        : 'Tambah Data Saksi'}
                  </h3>
                </div>

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

                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-5 items-center">
                  <div className="form-group w-full h-22 mt-5">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Saksi
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
                      name="nama_saksi"
                      placeholder="Nama Saksi"
                      onChange={handleChange}
                      value={formState.nama_saksi}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_saksi' ? 'Masukan Nama Saksi' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22 mt-5">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      No Kontak
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-no"
                      name="no_kontak"
                      placeholder="No Kontak"
                      onChange={handleChange}
                      value={formState.no_kontak}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'no_kontak' ? 'Masukan No Kontak' : '',
                      )}
                    </p>
                  </div>

                  {/* jenis kelamin */}
                  <div className="form-group h-22 w-full flex flex-col">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jenis Kelamin
                    </label>
                    <select
                      className="w-full rounded border border-stroke   py-[13.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary p-jenis"
                      name="jenis_kelamin"
                      onChange={handleChange}
                      value={formState.jenis_kelamin}
                      disabled={isDetail}
                    >
                      <option disabled value="">
                        Pilih Jenis Kelamin
                      </option>
                      <option value="0">Laki-laki</option>
                      <option value="1">Perempuan</option>
                    </select>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'jenis_kelamin' ? 'Pilih Jenis Kelamin' : '',
                      )}
                    </p>
                  </div>
                </div>

                <div className="form-group w-full h-35 relative">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Alamat
                  </label>
                  <textarea
                    className="w-full h-25 m-0 rounded border border-stroke box-border py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-alamat"
                    name="alamat"
                    onChange={handleChange}
                    value={formState.alamat}
                    disabled={isDetail}
                  />
                  <p className="error-text absolute bottom-1">
                    {errors.map((item) =>
                      item === 'alamat' ? 'Masukan Alamat' : '',
                    )}
                  </p>
                </div>

                <div className={`mt-3 ${isDetail ? 'h-full' : 'h-15'}`}>
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
                      Ubah Data Saksi
                    </button>
                  ) : (
                    <button
                      className={` items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
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
                      Tambah Data Saksi
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
                    <div className="error">
                      <p className="text-red-400 text-center">
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
