import React, { useEffect, useRef, useState } from 'react';

import { Alerts } from './AlertLantai';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import Select from 'react-select';
import {
  apiGedungOtmilRead,
  apiReadAlllokasiOtmil,
} from '../../../services/api';
import { set } from 'react-hook-form';

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
console.log(dataAdmin, 'dataAdmin');
export const ModalAddGedung = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nama_lantai: '',
      lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
      gedung_otmil_id: '',
      nama_gedung_otmil: '',
      panjang: '',
      lebar: '',
      posisi_X: '',
      posisi_Y: '',
    },
  );

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('');

  const [isLokasiOtmil, setIsLokasiOtmil] = useState([]);
  const [isGedungData, setIsGedungnData] = useState([]);

  console.log(defaultValue, "defaultValue")

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (key !== 'nama_lokasi_otmil') {
        if (!value) {
          errorFields.push(key); // untuk menampilkan pesan error pada form
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

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.i-nama',
          popover: {
            title: 'Nama Lantai',
            description: 'Isi nama lantai',
          },
        },
        {
          element: '.i-gedung',
          popover: {
            title: 'Gedung otmil',
            description: 'Pilih gedung otmil yang diinginkan',
          },
        },
        {
          element: '.i-panjang',
          popover: {
            title: 'Panjang',
            description: 'Isi panjang',
          },
        },
        {
          element: '.i-lebar',
          popover: {
            title: 'Lebar',
            description: 'Isi lebar',
          },
        },
        {
          element: '.i-posisi-X',
          popover: {
            title: 'Posisi X',
            description: 'Isi posisi x',
          },
        },
        {
          element: '.i-posisi-Y',
          popover: {
            title: 'Posisi Y',
            description: 'Isi posisi y',
          },
        },
        {
          element: `${isEdit ? '#b-ubah' : '#b-tambah'}`,
          popover: {
            title: `${isEdit ? 'Ubah' : 'Tambah'}`,
            description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} data ahli`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSelectGedungOtmil = (e: any) => {
    setFormState({ ...formState, gedung_otmil_id: e?.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, 'From State');
    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState).then(() => setButtonLoad(false));
    console.log('berhasil');
  };

  const modalStyles: any = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      zIndex: 40,
    },
    modalContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const lokasiOtmilData = async () => {
    const data = await apiReadAlllokasiOtmil({}, token);
    setIsLokasiOtmil(data.data.records);
  };

  const gedungData = async () => {
    let param = {
      filter: '',
      page: 1,
      pageSize: 10000,
    };

    const data = await apiGedungOtmilRead(param, token);
    setIsGedungnData(data.data.records);
  };

  useEffect(() => {
    Promise.all([lokasiOtmilData(), gedungData()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
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
              <div className="w-full flex justify-between mb-2  items-center  ">
                <div className="flex items-center gap-4  w-full">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Data Lantai'
                      : isEdit
                        ? 'Edit Data Lantai'
                        : 'Tambah Data Lantai'}
                  </h3>

                  {isDetail ? null : isEdit ? (
                    <button className="">
                      <HiQuestionMarkCircle
                        values={filter}
                        aria-placeholder="Show tutorial"
                        onClick={handleClickTutorial}
                      />
                    </button>
                  ) : (
                    <button className="">
                      <HiQuestionMarkCircle
                        values={filter}
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
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="form-group w-full relative">
                    <label
                      className=" block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Lantai
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
                      name="nama_lantai"
                      placeholder="Nama lantai"
                      onChange={handleChange}
                      value={formState.nama_lantai}
                      disabled={isDetail}
                    />
                    <p className="error-text bottom-0">
                      {errors.map((item) =>
                        item === 'nama_lantai' ? 'Masukan nama' : '',
                      )}
                    </p>
                  </div>
                  <div className="f-pangkat form-group w-full flex flex-col">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Gedung Otmil
                    </label>
                    <Select
                      className="basic-single i-gedung"
                      classNamePrefix="select"
                      styles={customStyles}
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.gedung_otmil_id,
                              label: formState.nama_gedung_otmil,
                            }
                          : formState.gedung_otmil_id
                      }
                      isDisabled={isDetail}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="Pilih Gedung Otmil"
                      name="gedung_otmil_id"
                      options={isGedungData.map((item: any) => ({
                        value: item.gedung_otmil_id,
                        label: item.nama_gedung_otmil,
                      }))}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          gedung_otmil_id: e?.value,
                          nama_gedung_otmil: e?.label,
                        });
                      }}

                      
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'gedung_otmil_id' ? 'Pilih lokasi gedung' : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="form-group w-full relative">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Panjang
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-panjang"
                      name="panjang"
                      placeholder="Panjang"
                      onChange={handleChange}
                      value={formState.panjang}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'panjang' ? 'Masukan panjang' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full relative">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Lebar
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-lebar"
                      name="lebar"
                      placeholder="Lebar"
                      onChange={handleChange}
                      value={formState.lebar}
                      disabled={isDetail}
                    />
                    <p className="error-text bottom-0">
                      {errors.map((item) =>
                        item === 'lebar' ? 'Masukan lebar' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Posisi X
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-posisi-X"
                      name="posisi_X"
                      placeholder="Posisi X"
                      onChange={handleChange}
                      value={formState.posisi_X}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'posisi_X' ? 'Masukan posisi X' : '',
                      )}
                    </p>
                  </div>

                  <div className="form-group w-full h-22">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Posisi Y
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-posisi-Y"
                      name="posisi_Y"
                      placeholder="Posisi Y"
                      onChange={handleChange}
                      value={formState.posisi_Y}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'posisi_Y' ? 'Masukan posisi Y' : '',
                      )}
                    </p>
                  </div>
                </div>

                <div className={` ${isDetail ? 'h-full' : 'h-15'} mt-4`}>
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
                      Ubah Data Lantai
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
                      Tambah Data Lantai
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
