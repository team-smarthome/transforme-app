import { useState, useEffect, useRef } from 'react';

// interface
interface RoomModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
}
export const DeleteModal: React.FC<RoomModalProps> = ({ closeModal, onSubmit, defaultValue }) => {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e:any) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target)
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onSubmit( defaultValue);
    closeModal();
  };

  return (
    <div
      ref={modalContainerRef}
      className="modal-container fixed z-50 flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
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
            <p className="text-sm te  xt-black dark:text-white">
              Apakah Anda yakin ingin menghapus data ini?
            </p>
            <p className="text-sm text-black dark:text-white">
              
            </p>
          </div>

          <br></br>

          <div className="flex justify-between">
            <button
              className="btn flex justify-center rounded bg-gray-200 py-2 px-6 font-medium text-gray-900 hover:shadow-1"
              type="submit"
              onClick={closeModal}
            >
              Batal
            </button>
            <button
              className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit"
              onClick={handleSubmit}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
