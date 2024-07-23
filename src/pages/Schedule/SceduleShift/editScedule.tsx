import { useEffect, useRef, useState } from 'react';

interface AddRoomModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

const EditDataShiftKerja: React.FC<AddRoomModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [dataShift, setDataShift] = useState(
    defaultValue || {
      nama_shift: '',
      waktu_mulai: '',
      waktu_selesai: '',
    },
  );

  const [errors, setErrors] = useState({
    nama_shift: '',
    waktu_mulai: '',
    waktu_selesai: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  //useEffect untuk menambahkan event listener  ke elemen dokumen
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);

  const validateForm = () => {
    const newErrors = {
      nama_shift: '',
      waktu_mulai: '',
      waktu_selesai: '',
    };
    if (
      dataShift.nama_shift &&
      dataShift.waktu_mulai &&
      dataShift.waktu_selesai
    ) {
      setErrors({
        ...errors,
        nama_shift: '',
        waktu_mulai: '',
        waktu_selesai: '',
      });
      return true;
    } else {
      if (!dataShift.nama_shift) {
        newErrors.nama_shift = 'Isi Nama Shift';
      }
      if (!dataShift.waktu_mulai) {
        newErrors.waktu_mulai = 'Isi Waktu Mulai';
      }
      if (!dataShift.waktu_selesai) {
        newErrors.waktu_selesai = 'Isi Waktu selesai';
      }
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
    setDataShift({ ...dataShift, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(dataShift);
  };

  return (
    <div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div
        className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[80vh]`}
        ref={modalContainerRef}
      >
        {isLoading ? (
          <div className={`justify-center flex items-center`}>
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
          <>
            <div className="w-full flex justify-between px-4 mt-2">
              <h1 className="text-xl font-semibold text-black dark:text-white">
                {isDetail
                  ? 'Detail Data Ruangan'
                  : isEdit
                    ? 'Edit Data Ruangan'
                    : 'Tambah Data Ruangan'}
              </h1>
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 m-4">
                <div className="grid gap-4">
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Shift
                    </label>
                    <input
                      name="nama_shift"
                      className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      disabled={isDetail}
                      value={dataShift.nama_shift}
                      onChange={handleChange}
                    />
                    <h1 className="pl-2 text-xs text-red-500">
                      {errors.nama_shift}
                    </h1>
                  </div>
                  <div className="flex justify-between space-x-2">
                    <div className="form-group w-1/2 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu Mulai
                      </label>
                      <input
                        name="waktu_mulai"
                        type="time"
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        disabled={isDetail}
                        value={dataShift.waktu_mulai}
                        onChange={handleChange}
                      />
                      <h1 className="pl-2 text-xs text-red-500">
                        {errors.waktu_mulai}
                      </h1>
                    </div>
                    <div className="form-group w-1/2 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu Selesai
                      </label>
                      <input
                        name="waktu_selesai"
                        type="time"
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        disabled={isDetail}
                        value={dataShift.waktu_selesai}
                        onChange={handleChange}
                      />
                      <h1 className="pl-2 text-xs text-red-500">
                        {errors.waktu_selesai}
                      </h1>
                    </div>
                  </div>
                </div>
                {isDetail ? null : (
                  <button
                    className="btn w-full flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditDataShiftKerja;
