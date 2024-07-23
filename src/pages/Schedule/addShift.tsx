interface AddRoomModalProps {
  closeModal: () => void;
  isDetail?: boolean;
  defaultValue?: any;
}

const AddShift: React.FC<AddRoomModalProps> = ({
  closeModal,
  isDetail,
  defaultValue,
}) => {
  return (
    <div className="fixed w-full h-4/5 ">
      <div className="bg-white top-1 left-1/3  w-96 rounded-md absolute inset-0 shadow-default dark:border-strokedark dark:bg-slate-600">
        <h1 className="mt-2 text-white font-semibold text-lg ml-3 flex justify-center">
          {isDetail ? 'Edit Data Ruangan' : 'Tambah Data Ruangan'}
        </h1>
        <strong
          className="text-xl align-center cursor-pointer absolute top-0 right-2"
          onClick={closeModal}
        >
          &times;
        </strong>
        <div className="flex justify-center items-center mt-2">
          <div className="w-1/2 space-y-2">
            <div>
              <h1>Nama </h1>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="nama"
                placeholder="Nama"
              />
            </div>
            <div>
              <h1>Jadwal Shift</h1>
              <select
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="lokasi_otmil_id"
              >
                <option disabled value="">
                  Pilih jadwal
                </option>
                <option value="Pagi">Pagi</option>
                <option value="Siang">Siang</option>
                <option value="Malam">Malam</option>
              </select>
            </div>
            <div>
              <h1>Grup </h1>
              <select
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="lokasi_otmil_id"
                disabled
              >
                <option disabled value="">
                  Pilih jadwal
                </option>
                <option value="Pagi">A</option>
                <option value="Siang">B</option>
                <option value="Malam">C</option>
              </select>
            </div>
            <div>
              <h1>Status Kehadiran </h1>
              <select
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="lokasi_otmil_id"
              >
                <option disabled value="">
                  Pilih Status
                </option>
                <option value="Pagi">Hadir</option>
                <option value="Siang">Cuti</option>
                <option value="Malam">Sakit</option>
              </select>
            </div>
            <div>
              <h1>Penugasan </h1>
              <select
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="lokasi_otmil_id"
              >
                <option disabled value="">
                  Pilih Status
                </option>
                <option value="Pagi">Patroli</option>
                <option value="Siang">Jaga Pos</option>
              </select>
            </div>
            <div
              className={`flex justify-center w-full`}
            >
              <button
              onClick={closeModal}
                className={`bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 rounded`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddShift;
