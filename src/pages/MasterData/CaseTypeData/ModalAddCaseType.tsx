import React, { useEffect, useRef, useState } from 'react';
// import Select from 'react-select/dist/declarations/src/Select';
import Select from 'react-select';
import { apiReadKategoriPerkara } from '../../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alerts } from './AlertCaseType';
import { Error403Message } from '../../../utils/constants';
import { set } from 'react-hook-form';

// interface
interface AddCaseTypeModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
  buttonLoad?: boolean;
  setButtonLoad?: any;
}

export const AddCaseTypeModal: React.FC<AddCaseTypeModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  buttonLoad,
  setButtonLoad,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState(
    defaultValue || {
      nama_jenis_perkara: '',
      pasal: '',
      kategori_perkara_id: '',
      nama_kategori_perkara: '',
      // vonis_bulan_perkara: '',
      // vonis_hari_perkara : '',
      // vonis_tahun_perkara: '',
    },
  );

  //state
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [kategoriPerkara, setkategoriperkara] = useState([]);
  // const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

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

    // for (const [key, value] of Object.entries(formState)) {
    //   if (
    //     key !== 'jenis_perkara_id' &&
    //     key !== 'vonis_bulan_perkara' &&
    //     key !== 'vonis_hari_perkara' &&
    //     key !== 'vonis_tahun_perkara'
    //   ) {
    //     if (!value) {
    //       errorFields.push(key);
    //     }
    //   }
    // }
    // if (errorFields.length > 0) {
    //   console.log(errorFields);
    //   setErrors(errorFields);
    //   return false;
    // }
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
    // setButtonLoad(true);

    onSubmit(formState);
    // closeModal();
  };

  useEffect(() => {
    Promise.all([KategotiPerkara()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const KategotiPerkara = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadKategoriPerkara(params, token)
      .then((res) => {
        setkategoriperkara(res.data.records);
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

  // useEffect(() => {
  //   const fetchDataKategori = async () => {
  //     let params = {
  //       pageSize: 1000,
  //     };
  //     try {
  //       const perka = await apiReadKategoriPerkara(params, token);
  //       const kategori = perka.data.records;
  //       setkategoriperkara(kategori);

  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 500);
  //     } catch (e: any) {
  //       if (e.response.status === 403) {
  //         navigate('/auth/signin', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     }
  //   };
  //   fetchDataKategori();
  // }, []);

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
          title: 'Nama perkara',
          description: 'Isi nama perkara',
        },
      },
      {
        element: '.f-pasal',
        popover: {
          title: 'Nomor pasal ',
          description: 'Isi nomor pasal perkara',
        },
      },
      {
        element: '.f-kategori',
        popover: {
          title: 'Kategori perkara',
          description: 'Pilih kategori perkara',
        },
      },
      {
        element: `${isEdit ? '.b-ubah-modal' : '.b-tambah-modal'}`,
        popover: {
          title: `${isEdit ? 'Ubah' : 'Tambah'}`,
          description: `Klik untuk ${isEdit ? 'mengubah' : 'menambahkan'} data perkara`,
        },
      },
    ];

    const driverObj: any = driver({
      showProgress: true,
      steps: steps,
    });

    driverObj.drive();
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
        <div className="modal rounded-sm w-full">
          {isLoading ? (
            <div className="h-[500px] justify-center flex items-center">
              <svg
                className="animate-spin h-30 w-30 text-white"
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
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? 'Detail Jenis Perkara'
                      : isEdit
                        ? 'Edit Jenis Perkara'
                        : 'Tambah Jenis Perkara'}
                  </h3>
                </div>
                {!isDetail && (
                  <button className="pr-90">
                    <HiQuestionMarkCircle
                      // values={filter}
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
                <div className="mt-5 grid grid-cols-1 justify-normal">
                  <div className="f-nama form-group w-full h-22">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Jenis Perkara
                    </label>
                    <input
                      className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="nama_jenis_perkara"
                      placeholder="Nama Jenis Perkara"
                      onChange={handleChange}
                      value={formState.nama_jenis_perkara}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_jenis_perkara'
                          ? 'Masukan Jenis Perkara'
                          : '',
                      )}
                    </p>
                  </div>

                  <div className="f-pasal form-group w-full h-22">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Pasal
                    </label>
                    <input
                      className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      name="pasal"
                      placeholder="pasal"
                      onChange={handleChange}
                      value={formState.pasal}
                      disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'pasal' ? 'Masukan Pasal' : '',
                      )}
                    </p>
                  </div>

                  {/* kategori perkara id start */}
                  <div className="f-kategori form-group w-full flex flex-col h-22">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Kategori Perkara
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      styles={customStyles}
                      name="kategori_perkara_id"
                      isDisabled={isDetail}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="Pilih kategori perkara"
                      defaultValue={
                        isEdit || isDetail
                          ? {
                              value: formState.kategori_perkara_id,
                              label: formState.nama_kategori_perkara,
                            }
                          : formState.kategori_perkara_id
                      }
                      options={kategoriPerkara.map((item: any) => ({
                        value: item.kategori_perkara_id,
                        label: item.nama_kategori_perkara,
                      }))}
                      onChange={(e: any) => {
                        setFormState({
                          ...formState,
                          kategori_perkara_id: e.value,
                          nama_kategori_perkara: e.label,
                        });
                      }}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === 'nama_kategori_perkara'
                          ? 'Pilih Kategori Perkara'
                          : '',
                      )}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {/* <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Vonis Tahun
                </label>
                <input
                  className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                  name="vonis_tahun_perkara"
                  placeholder='vonis tahun'
                  onChange={handleChange}
                  value={formState.vonis_tahun_perkara}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'vonis_tahun_perkara'
                      ? 'Pilih vonis tahun'
                      : ''
                  )}
                </p>
              </div>
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Vonis Bulan
                </label>
                <input
                  className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                  name="vonis_bulan_perkara"
                  placeholder='vonis bulan'
                  onChange={handleChange}
                  value={formState.vonis_bulan_perkara}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'vonis_bulan_perkara'
                      ? 'Pilih vonis bulan'
                      : ''
                  )}
                </p>
              </div>
              <div className="form-group w-full">
                <label
                  className="block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Vonis Hari
                </label>
                <input
                  className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                  name="vonis_hari_perkara"
                  placeholder='vonis hari'
                  onChange={handleChange}
                  value={formState.vonis_hari_perkara}
                  disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'vonis_hari_perkara'
                      ? 'Pilih vonis hari'
                      : ''
                  )}
                </p>
              </div> */}
                </div>

                <div className={` ${isDetail ? 'h-auto' : 'h-15'}  mt-3`}>
                  {/* <br></br> */}
                  {isDetail ? null : isEdit ? (
                    <button
                      className={`b-ubah-modal items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? 'bg-slate-400' : ''
                      }`}
                      type="submit"
                      disabled={buttonLoad}
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
                      Ubah Jenis Perkara
                    </button>
                  ) : (
                    <button
                      className={`b-tambah-modal items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? 'bg-slate-400' : ''
                      }`}
                      type="submit"
                      disabled={buttonLoad}
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
                      Tambah Jenis Perkara
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
