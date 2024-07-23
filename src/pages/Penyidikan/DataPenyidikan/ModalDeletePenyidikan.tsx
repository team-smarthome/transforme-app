import React, { useState, useEffect, useRef } from 'react';

export const DeletePenyidikanModal = ({
  closeModal,
  onSubmit,
  defaultValue,
}: any) => {
  const [formState, setFormState] = useState(defaultValue || {});
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef: any = useRef(null);
  const [buttonLoad, setButtonLoad] = useState(false);

  // useEffect(() => {
  //   const handleOutsideClick = (e:any) => {
  //     if (
  //       modalContainerRef.current &&
  //       !modalContainerRef.current.contains(e.target)
  //     ) {
  //       closeModal();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [closeModal]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setButtonLoad(true);
    console.log(formState, 'formState');

    onSubmit(formState).then(() => setButtonLoad(false));
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
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-slate-600 overflow-auto">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <div className="w-full flex justify-between">
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Konfirmasi Hapus Data
                </h3>
              </div>
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <div className="pt-6">
              <p className="text-sm text-center text-black dark:text-white max-w-md">
                Apakah Anda yakin ingin menghapus data ini ?
              </p>
              <p className="text-sm text-center text-black dark:text-white">
                Nomor Penyidikan{' '}
                <span className="text-red-400">
                  {formState.nomor_penyidikan}
                </span>{' '}
                akan dihapus
              </p>
            </div>

            <br></br>

            <div className="flex justify-between">
              <button
                className="btn flex justify-center rounded bg-blue-500 py-2 px-6 font-medium text-white hover:bg-blue-400"
                type="submit"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className={`btn flex justify-center rounded py-2 px-6 font-medium text-white  ${
                  buttonLoad
                    ? 'bg-slate-400 hover:bg-none'
                    : 'hover:bg-red-400 bg-red-500 '
                }`}
                type="submit"
                disabled={buttonLoad}
                onClick={handleSubmit}
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
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
