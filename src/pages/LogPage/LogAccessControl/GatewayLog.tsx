import { useState, useEffect, useMemo } from 'react';

import axios from 'axios';
import { apiGatewayLog, apiVisitorLogList } from '../../../services/api';
import { webserviceurl } from '../../../services/api';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import Loader from '../../../common/Loader';
import * as xlsx from 'xlsx';
import dayjs from 'dayjs';
import { Alerts } from '../AlertLog';
import { Error403Message } from '../../../utils/constants';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';

export default function GatewayLog() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const tokenItem = localStorage.getItem('token');
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedAnalytics, setSelectedAnalytics] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLocationChange = (event: any) => {
    setSelectedLocation(event.target.value);
    setSelectedDevice('');
  };

  const handleDeviceChange = (event: any) => {
    setSelectedDevice(event.target.value);
  };

  // const selectedLocationEntry:any = jsonData.find(
  //   (entry:any) => entry.location === selectedLocation
  // );

  // const devices = selectedLocationEntry ? selectedLocationEntry.devices : [];

  console.log(data, 'Ini Data Boss QQ');

  const handleExportClick = async () => {
    const dataToExcel = [
      [
        'Nama Prajurit Binaan',
        'No DMAC Gelang',
        'Lokasi OTMIL',
        'Lokasi Ruangan',
        'Zonasi Gateway',
        'Jenis Ruangan OTMIL',
        'Time Stamp',
      ],
      ...data.map((item: any) => [
        item.nama_wbp,
        item.gmac,
        item.nama_ruangan_otmil,
        item.nama_lokasi_otmil,
        item.status_zona_ruangan_otmil,
        item.jenis_ruangan_otmil,
        item.timestamp,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(
      wb,
      `Data-Gateway-Log ${dayjs(new Date()).format('DD-MM-YYYY HH.mm')}.xlsx`,
    );

    // if (data && data.length > 0) {
    //   exportToCSV(data, 'exported_data.csv');
    // } else {
    //   setShowModal(true);
    //   setModalMessage('No data found to export.');
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };
  function handleStartDateChange(e: any) {
    setStartDate(e.target.value);
  }
  function handleEndDateChange(e: any) {
    setEndDate(e.target.value);
  }

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    // setEndDate(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

  const handleChangePage = (event: any, page: any) => {
    setCurrentPage(event);
  };

  const handleAnalyticsChange = (e: any) => {
    // Reset current page to 1 when analytics value changes
    setSelectedAnalytics(e.target.value);
    // setCurrentPage(1);
  };

  function calculateAge(birthdate: any) {
    const birthDate = new Date(birthdate);

    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--; // Subtract 1 if birthday hasn't occurred yet this year
    }

    return age;
  }

  // let fetch = () => {
  //   let params = {
  //     from: `${startDate} 00:00`,
  //     to: `${endDate} 23:59`,
  //     device_id: selectedDevice,
  //     country_id: selectedCountry,
  //     age: selectedAge,
  //     analytics: selectedAnalytics,
  //     name: selectedName,
  //     gender: selectedGender,
  //     pageSize: itemsPerPage,
  //     pageIndex: currentPage,
  //   };
  //   setLoading(true);
  //   console.log(params);
  //   apiVisitorLogList(params).then((res) => {
  //     console.log(res);
  //     setData(res.records);
  //     setLoading(false);
  //     setTotalPages(res.pagesCount);
  //     setTotalItemPage(res.total);
  //     console.log(data);
  //   });
  // };

  // useEffect(() => {
  //   const date = getTodayDate();
  //   setEndDate(date);
  //   setStartDate(date);
  // }, []);

  // useEffect(() => {
  //   if (endDate !== '') {
  //     // Perform your fetch request here, using todayDate as needed
  //     fetch();
  //   }
  // }, [
  //   currentPage,
  //   endDate,
  //   startDate,
  //   selectedDevice,
  //   selectedCountry,
  //   selectedAge,
  //   selectedAnalytics,
  //   selectedName,
  //   selectedGender,
  // ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.post(
  //       webserviceurl + 'gema_admin_api/location/readOnline.php'
  //     );
  //     console.log(result.data.data.records);
  //     setJsonData(result.data.data.records);
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    getGatewayLog();
  }, []);

  const getGatewayLog = async () => {
    try {
      let params = {
        filter: '',
      };
      setIsLoading(true);
      const responseLog = await apiGatewayLog(params, token);
      setData(responseLog.data.records);
      setPages(responseLog.data.pagination.totalPages);
      setRows(responseLog.data.pagination.totalRecords);
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

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.p-analitik',
          popover: {
            title: 'Pilih Analitik',
            description: 'Pilih analitik yang diinginkan',
          },
        },
        {
          element: '.i-nama',
          popover: {
            title: 'Nama',
            description: 'Isi nama',
          },
        },
        {
          element: '.i-usia',
          popover: {
            title: 'Usia',
            description: 'Isi usia',
          },
        },
        {
          element: '.p-gender',
          popover: {
            title: 'Pilih Gender',
            description: 'Pilih gender yang diinginkan',
          },
        },
        {
          element: '.p-lokasi',
          popover: {
            title: 'Pilih Lokasi',
            description: 'Pilih lokasi yang diinginkan',
          },
        },
        {
          element: '.p-kamera',
          popover: {
            title: 'Pilih Kamera',
            description: 'Pilih kamera yang diinginkan',
          },
        },
        {
          element: '.i-awal',
          popover: {
            title: 'Tanggal Awal',
            description: 'Pilih tanggal awal yang diinginkan',
          },
        },
        {
          element: '.i-akhir',
          popover: {
            title: 'Tanggal Akhir',
            description: 'Pilih tanggal akhir yang diinginkan',
          },
        },
        {
          element: '.excel',
          popover: {
            title: 'Export Excel',
            description: 'Klik untuk mendapatkan file excel',
          },
        },
      ],
    });

    driverObj.drive();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="pb-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div>
        <div className='w-full flex justify-between'>
        <h3 className="text-2xl font-semibold"> Gateway Log</h3>
        
        <button>
          <HiQuestionMarkCircle
            values={filter}
            aria-placeholder="Show tutorial"
            // onChange={}
            onClick={handleClickTutorial}
          />
        </button>
        </div>

        <div className="mt-5 mb-5">
          <form>
            <div className="space-y-3 ">
              <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="grid grid-row-2 gap-2">
                    <label className="text-white">Pilih Analitik</label>
                    <select
                      name="Select Analytics"
                      value={selectedAnalytics}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary p-analitik"
                      onChange={handleAnalyticsChange}
                    >
                      <option value="">Semua Analitik</option>
                      <option value="unrecognized">Unrecognized</option>
                      <option value="face_recognition">Face Recognition</option>
                    </select>
                  </div>

                  {selectedAnalytics == 'unrecognized' ? null : (
                    <>
                      <div className="grid grid-row-2 gap-2">
                        <label className="text-white">Nama</label>
                        <input
                          name="Name"
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary i-nama"
                          // value={selectedName}
                          // onChange={(e) => setSelectedName(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-row-2 gap-2">
                        <label className="text-white">Usia</label>
                        <input
                          type="number"
                          name="Age"
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary i-usia"
                          // value={selectedAge}
                          // onChange={(e) => setSelectedAge(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-row-2 gap-2">
                        <label className="text-white">Pilih Gender</label>
                        <select
                          name="Select Gender"
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary p-gender"
                          // value={selectedGender}
                          // onChange={(e) => setSelectedGender(e.target.value)}
                        >
                          <option value="">Semua Gender</option>
                          <option value="true">Pria</option>
                          <option value="false">Wanita</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label id="demo-simple-select-autowidth-label">
                      Pilih Lokasi
                    </label>
                    <select
                      name="Select Location"
                      // value={selectedLocation}
                      // onChange={handleLocationChange}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary p-lokasi"
                    >
                      <option value="">Semua Lokasi</option>
                      {/* {jsonData.map((entry) => (
                        <option key={entry.location} value={entry.location}>
                          {entry.location}
                        </option>
                      ))} */}
                    </select>
                  </div>

                  <div>
                    <label id="demo-simple-select-autowidth-label">
                      Pilih Perangkat
                    </label>
                    <select
                      name="Select Device"
                      // value={selectedDevice}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-[5.5px] px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary p-kamera"
                      // onChange={handleDeviceChange}
                    >
                      <option value="">Semua Perangkat</option>

                      {/* {devices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.deviceName}
                        </option>
                      ))} */}
                    </select>
                  </div>

                  <div className="">
                    <label>Tanggal Awal</label>
                    <input
                      type="date"
                      // value={startDate}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary i-awal"
                      // onChange={handleStartDateChange}
                    />
                  </div>

                  <div className="">
                    <label>Tanggal Akhir</label>
                    <input
                      type="date"
                      // value={endDate}
                      className="w-full rounded border border-stroke  dark:bg-slate-800 py-1 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-primary i-akhir"
                      // onChange={handleEndDateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  className="bg-blue-500 text-white px-2 rounded-md py-1 excel"
                  type="button"
                  onClick={handleExportClick}
                >
                  Export Excel
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* {showModal && (
          <DataNotFoundModal
            onClose={handleCloseModal}
            message={modalMessage}
          />
        )} */}
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-slate-600 sm:grid-cols-5 text-xs uppercase items-center">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="font-medium uppercase">Nama Prajurit Binaan</h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="">No DMAC Gelang </h5>
          </div>

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Baterai Gelang{' '}
            </h5>
          </div> */}

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Detak Jantung{' '}
            </h5>
          </div> */}

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Suhu Tubuh{' '}
            </h5>
          </div> */}

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">Lokasi Ruangan </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">Zonasi Gateway </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">Time Stamp </h5>
          </div>

          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="">
              Lokasi Gedung{' '}
            </h5>
          </div> */}
        </div>
        {data.map((item: any) => {
          return (
            <div>
              <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4  text-sm">
                <div className="p-2.5 xl:p-5 justify-center flex ">
                  <p className="hidden text-black dark:text-white sm:block truncate capitalize">
                    {item.nama_wbp}
                  </p>
                </div>

                <div className="p-2.5 sm:flex xl:p-5 justify-center flex t">
                  <p className="text-black dark:text-white truncate capitalize">
                    {item.gmac}
                  </p>
                </div>

                <div className="p-2.5 xl:p-5 justify-center flex  ">
                  <p className="text-black dark:text-white truncate capitalize">
                    {item.nama_ruangan_otmil}
                  </p>
                </div>

                <div className="p-2.5 sm:flex xl:p-5 justify-center flex  ">
                  <p className="text-black dark:text-white truncate capitalize">
                    {item.status_zona_ruangan_otmil}
                  </p>
                </div>

                <div className="p-2.5 sm:flex xl:p-5 justify-center flex ">
                  <p className="text-black dark:text-white capitalize ">
                    {item.timestamp}
                  </p>
                </div>

                {/* <div 
                  
                    className="p-2.5  xl:p-5 justify-center flex  ">
                      <p className="text-black dark:text-white max-w-sm truncate cursor-pointer">
                        {item.alamat}
                      </p>
                    </div> */}
              </div>
              <div className="border-t border-slate-600"></div>
            </div>
          );
        })}

        {/* {data.map((item: any) => {
          return (
            <div className="grid grid-cols-9 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9">
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.visitor_name == 'unrecognized'
                    ? 'Tidak Dikenal'
                    : item.visitor_name}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.visitor_name == 'unrecognized'
                    ? 'DMAC 1234'
                    : 'iDMAC 1234'}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.device_name}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                {item.visitor_name == 'unrecognized' ? (
                  <p className="text-red-500 dark:text-red-500">Zona Merah </p>
                ) : item.isemployee == true ? (
                  <p className="text-yellow-500 dark:text-yellow-500">
                    Zona Kuning{' '}
                  </p>
                ) : item.isdpo == true ? (
                  <p className="text-red-500 dark:text-red-500">Zona Merah </p>
                ) : (
                  <p className="text-green-500 dark:text-green-500">
                    Zona Hijau{' '}
                  </p>
                )}
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.timestamp}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {item.location_name}
                </p>
              </div>
            </div>
          );
        })} */}
        {data.length === 0 ? null : (
          <div className="mt-5">
            <p>
              Total Rows: {rows} Page: {rows ? currentPage : null} of {pages}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onChangePage={handleChangePage}
            />
          </div>
        )}
      </div>

      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 100,
        }}
      >

      </div> */}
    </div>
  );
}
