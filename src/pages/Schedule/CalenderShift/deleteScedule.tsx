import { useEffect, useRef, useState } from 'react';
import { apiReadAllScheduleShift } from '../../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'dayjs/locale/id';
import { Alerts } from '../GrupShift/Alert';
import dayjs from 'dayjs';
import { BsTrash, BsX } from 'react-icons/bs';
import { BiLoaderAlt } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../../utils/constants';

interface Schedule {
  schedule_id: any;
  shif_id: any;
}
const DeleteSchedule = ({ closeModal, onSubmit, defaultValue }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  //get Token
  const tokenItem = localStorage.getItem('token');
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
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

  const [endDate, setEndDate] = useState({
    tanggal: parseInt(dayjs(selectedEndDate).format('D')),
    bulan: parseInt(dayjs(selectedEndDate).format('M')),
    tahun: parseInt(dayjs(selectedEndDate).format('YYYY')),
  });

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

  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [activeDeleteItemIds, setActiveDeleteItemIds] = useState<string[]>([]);
  const [scheduleDeleteData, setScheduleDeleteData] = useState([
    {
      schedule_id: '',
    },
  ]);

  const handledelete = (item: any) => {
    const newScheduleDeleteData = scheduleDeleteData.filter(
      (schedule) => schedule.schedule_id !== '',
    );

    newScheduleDeleteData.push({ schedule_id: item });

    setScheduleDeleteData(newScheduleDeleteData);
    setActiveDeleteItemIds([...activeDeleteItemIds, item]);
  };
  const handleCancel = (item: any) => {
    const updatedItemIds = activeDeleteItemIds.filter((id) => id !== item);
    const updatedataDelete = scheduleDeleteData.filter(
      (id) => id.schedule_id !== item,
    );
    setActiveDeleteItemIds(updatedItemIds);
    setScheduleDeleteData(updatedataDelete);
  };
  const handleDeleteAll = () => {
    const deleteAll = schedule?.map((item: any) => ({
      schedule_id: item.schedule_id,
    }));
    const deleteAlll = schedule?.map((item: any) => item.schedule_id);

    setScheduleDeleteData(deleteAll);
    setActiveDeleteItemIds(deleteAlll);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchSchedule = async () => {
      const filter = {
        filter: {
          tanggal: `${startDate.tanggal}-${endDate.tanggal}`,
          bulan: defaultValue.bulan,
          tahun: defaultValue.tahun,
        },
      };

      try {
        const schedule = await apiReadAllScheduleShift(filter, token);
        setSchedule(schedule.data.records);
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

  useEffect(() => {
    const fetchSchedule = async () => {
      const filter = {
        filter: {
          tanggal: `${startDate.tanggal}-${endDate.tanggal}`,
          bulan: defaultValue.bulan,
          tahun: defaultValue.tahun,
        },
      };

      try {
        const schedule = await apiReadAllScheduleShift(filter, token);
        setSchedule(schedule.data.records);
        setScheduleDeleteData([{ ...scheduleDeleteData, schedule_id: '' }]);
        setActiveDeleteItemIds([]);
      } catch (error: any) {
        Alerts.fire({
          icon: 'error',
          title: error.message,
        });
      }
    };
    fetchSchedule();
  }, [selectedEndDate]);

  const [errors, setErrors] = useState('');
  const validate = () => {
    if (
      scheduleDeleteData[0]?.schedule_id == '' ||
      scheduleDeleteData.length === 0
    ) {
      setErrors('Silahkan pilih shift!');
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setButtonLoad(true);
    onSubmit(scheduleDeleteData).then(() => setButtonLoad(false));
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
                <h3 className="text-lg font-semibold text-black dark:text-white mr-6">
                  Hapus Data Jadwal Shift Kerja
                </h3>
              </div>
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <div className="pt-6 ">
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
              <div className="w-full pb-2 flex justify-between mt-4  bg-slate-700 rounded-t">
                <h1 className="text-sm font-semibold  xt-black dark:text-white w-2/3">
                  Nama Shift
                </h1>
                <h1 className="text-sm font-semibold  xt-black dark:text-white w-2/3">
                  Tanggal
                </h1>
                <h1 className="text-sm font-semibold  xt-black dark:text-white w-1/3 flex justify-center">
                  Aksi
                </h1>
              </div>
              <div className="h-36 overflow-y-auto bg-slate-800 rounded-b-md">
                {schedule.map((item: any) => {
                  const isDeleteVisible = activeDeleteItemIds.includes(
                    item.schedule_id,
                  );

                  return (
                    <div className="flex justify-between pb-2">
                      <h1
                        className={`w-2/3 capitalize ${
                          !isDeleteVisible ? 'text-white' : ''
                        }`}
                      >
                        {item.nama_shift}{' '}
                      </h1>
                      <h1
                        className={`w-2/3 capitalize ${
                          !isDeleteVisible ? 'text-white' : ''
                        }`}
                      >
                        {` ${item.tanggal}/${item.bulan}/${item.tahun} `}
                      </h1>
                      <div className="w-1/3 flex justify-center ">
                        {!isDeleteVisible ? (
                          <button
                            onClick={() => handledelete(item.schedule_id)}
                            className="flex items-center space-x-2 rounded bg-red-500 px-2 text-white"
                          >
                            <BsTrash size={10} />{' '}
                            <h2 className="text-sm">Hapus</h2>{' '}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCancel(item.schedule_id)}
                            className="flex items-center space-x-2 rounded bg-blue-500 px-2 text-white"
                          >
                            <BsX size={10} />{' '}
                            <h2 className="text-sm">Cancel</h2>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div className="h-3">
                <h1 className="text-red-600 text-sm">{errors}</h1>
              </div>
              <div>
                <button
                  onClick={handleDeleteAll}
                  className="flex items-center space-x-2 rounded bg-red-500 px-2 text-white"
                >
                  <BsTrash size={10} /> <h2 className="text-sm">Hapus Semua</h2>{' '}
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                className={` ${
                  buttonLoad ? 'bg-slate-600' : 'bg-primary hover:bg-blue-500'
                }btn w-full flex justify-center rounded  py-2 px-6 font-medium text-gray hover:shadow-1`}
                type="submit"
                onClick={handleSubmit}
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

export default DeleteSchedule;
