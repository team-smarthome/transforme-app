import React, { useEffect, useRef, useState } from 'react';

import { Alerts } from './AlertHakim';

const dataUserItem = localStorage.getItem('dataUser');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
console.log(dataAdmin, 'DATA ADMIN');

export const AddHakimModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}: any) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nip: '',
      nama_hakim: '',
      alamat: '',
      departemen: '',
    },
  );
  // const lokasi_lemasmil_id = localStorage.getItem('lokasi_lemasmil_id')

  //state

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement>(null);

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
                      ? 'Detail Data Hakim'
                      : isEdit
                        ? 'Edit Data Hakim'
                        : 'Tambah Data Hakim'}
                  </h3>
                </div>
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Nama Hakim */}
                <div className="form-group w-full mt-4">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Nama Hakim
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                    name="nama_hakim"
                    placeholder="Nama Hakim"
                    onChange={handleChange}
                    value={formState.nama_hakim}
                    disabled={isDetail}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'nama_hakim' ? 'Masukan Nama Hakim' : '',
                    )}
                  </p>
                </div>

                {/* NIP */}
                <div className="form-group w-full mt-4">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    NIP
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                    name="nip"
                    placeholder="NIP"
                    onChange={handleChange}
                    value={formState.nip}
                    disabled={isDetail}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'nip' ? 'Masukan NIP' : '',
                    )}
                  </p>
                </div>

                {/* alamat */}
                <div className="form-group w-full mt-4">
                  <label
                    className=" capitalize block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    alamat
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                    name="alamat"
                    placeholder="alamat"
                    onChange={handleChange}
                    value={formState.alamat}
                    disabled={isDetail}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'alamat' ? 'Masukan alamat' : '',
                    )}
                  </p>
                </div>

                {/* departemen */}
                <div className="form-group w-full mt-4">
                  <label
                    className=" capitalize block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    departemen
                  </label>
                  <input
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                    name="departemen"
                    placeholder="departemen"
                    onChange={handleChange}
                    value={formState.departemen}
                    disabled={isDetail}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === 'departemen' ? 'Masukan departemen' : '',
                    )}
                  </p>
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
                {errors.length > 0 && (
                  <div className="error mt-4">
                    <p className="text-red-400">
                      Ada data yang masih belum terisi !
                    </p>
                  </div>
                )}
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

                <br></br>
                {isDetail ? null : isEdit ? (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
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
                    Ubah Data hakim
                  </button>
                ) : (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
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
                    Tambah Data hakim
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
