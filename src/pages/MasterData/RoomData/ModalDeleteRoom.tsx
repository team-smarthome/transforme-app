import { useState, useEffect, useRef } from 'react';

// interface
interface RoomModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
}
export const DeleteRoomModal: React.FC<RoomModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
}) => {
  const [formState, setFormState] = useState(defaultValue || {});
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [buttonLoad, setButtonLoad] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setButtonLoad(true);
    onSubmit(formState);
    closeModal();
    setButtonLoad(false);
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
              <p className="text-sm text-black dark:text-white">
                Apakah Anda yakin ingin menghapus data ini?
              </p>
              <p className="text-sm text-center text-black dark:text-white">
                Nama Ruangan{' '}
                <span className="text-red-400 uppercase font-semibold">
                  {' '}
                  {formState.nama_ruangan_otmil}{' '}
                </span>{' '}
                Akan Dihapus
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
    </div>
  );
};
