import { useEffect, useRef, useState } from 'react';
import { apiReadAllPetugasShift } from '../../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'dayjs/locale/id';
import { Alerts } from '../GrupShift/Alert';
import dayjs from 'dayjs';
import { BiLoaderAlt } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../../utils/constants';

const DeletePetugasShift = ({ closeModal, onSubmit, defaultValue }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  //get Token
  const tokenItem = localStorage.getItem('token');
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [dataPetugasShift, setDataPetugasShift] = useState([
    {
      petugas_shift_id: '',
    },
  ]);

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

  const tanggal = dayjs(
    `${defaultValue.tahun}-${defaultValue.bulan}-${defaultValue.tanggal}`,
    {
      locale: 'id',
    },
  ).format('YYYY MM DD');

  const [selectedDate, setSelectedDate] = useState(dayjs(tanggal));
  const [selectedEndDate, setSelectedEndDate] = useState(
    dayjs(tanggal).add(4, 'day'),
  );

  const [startDate, setStartDate] = useState({
    tanggal: parseInt(dayjs(selectedDate).format('D')),
    bulan: parseInt(dayjs(selectedDate).format('M')),
    tahun: parseInt(dayjs(selectedDate).format('YYYY')),
  });
  console.log(defaultValue, 'defaultValue delete');
  const [endDate, setEndDate] = useState({
    tanggal: parseInt(dayjs(selectedEndDate).format('D')),
    bulan: parseInt(dayjs(selectedEndDate).format('M')),
    tahun: parseInt(dayjs(selectedEndDate).format('YYYY')),
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchSchedule = async () => {
      const filterPetugasShift = {
        pageSize: Number.MAX_SAFE_INTEGER,
        filter: {
          // grup_petugas_id: defaultValue?.grup_petugas_id,
          schedule_id: defaultValue?.schedule_id,
          // tanggal: `${startDate.tanggal}-${endDate.tanggal}`,
          // bulan: defaultValue.bulan,
          // tahun: defaultValue.tahun,
        },
      };

      try {
        const petugasShift = await apiReadAllPetugasShift(
          filterPetugasShift.filter,
          token,
        );
        setDataPetugasShift(petugasShift.data.records);
        setIsLoading(false);
      } catch (e: any) {
        if (e.response.status === 403) {
          navigate('/auth/signin', {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? 'warning' : 'error',
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      }
    };
    fetchSchedule();
  }, []);
  console.log('papap:', dataPetugasShift);
  const handleDateChange = (date: any) => {
    const end = dayjs(date).add(4, 'day');
    setSelectedDate(dayjs(date));
    setStartDate({
      ...startDate,
      tanggal: parseInt(dayjs(date).format('D')),
      bulan: parseInt(dayjs(date).format('M')),
      tahun: parseInt(dayjs(date).format('YYYY')),
    });
    setSelectedEndDate(dayjs(date).add(4, 'day'));
    setEndDate({
      ...endDate,
      tanggal: parseInt(dayjs(end).format('D')),
      bulan: parseInt(dayjs(end).format('M')),
      tahun: parseInt(dayjs(end).format('YYYY')),
    });
  };

  const handleDateChangeEndDate = (date: any) => {
    setSelectedEndDate(dayjs(date));
    setEndDate({
      ...endDate,
      tanggal: parseInt(dayjs(date).format('D')),
      bulan: parseInt(dayjs(date).format('M')),
      tahun: parseInt(dayjs(date).format('YYYY')),
    });
  };
  console.log('1234:', dataPetugasShift);

  const handleSubmit = () => {
    const deleteData = dataPetugasShift?.map((item: any) => ({
      petugas_shift_id: [item.petugas_shift_id],
    }));

    console.log('deleteData', deleteData);

    setIsLoading(true);
    onSubmit(deleteData).then(() => setButtonLoad(false));
  };

  return (
    <div
      ref={modalContainerRef}
      className="modal-container rounded-md fixed z-50 flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <div className="w-full flex justify-between">
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Hapus Data Jadwal Petugas Shift Kerja
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
              <label
                className="block text-md font-medium text-black dark:text-white "
                htmlFor="nama_grup_petugas"
              >
                Tanggal
              </label>
              <div className="w-full flex items-center space-x-1">
                <DatePicker
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                  selected={selectedDate.toDate()}
                  onChange={handleDateChange}
                  dateFormat="dd MMMM yyyy"
                  placeholderText="Pilih tanggal"
                  locale="id"
                />
                <h1>s/d</h1>
                <DatePicker
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                  selected={selectedEndDate.toDate()}
                  onChange={handleDateChangeEndDate}
                  dateFormat="dd MMMM yyyy"
                  placeholderText="Pilih tanggal"
                  locale="id"
                  minDate={dayjs(selectedDate).endOf('day').toDate()} // Set minDate to the selected start date
                  maxDate={dayjs(selectedDate).endOf('month').toDate()}
                />
              </div>
            </div>

            <br></br>

            <div className="flex justify-between">
              <button
                className="btn flex justify-center rounded bg-gray-200 py-2 px-6 font-medium hover:font-semibold text-gray-900 hover:shadow-1"
                type="submit"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className={`btn hover:bg-blue-500 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                  buttonLoad ? 'bg-slate-400' : ''
                }`}
                type="submit"
                disabled={buttonLoad}
              >
                {buttonLoad ? (
                  <>
                    <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  </>
                ) : (
                  <></>
                )}
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePetugasShift;
