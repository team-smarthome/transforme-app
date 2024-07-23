import { useState, useEffect, useMemo } from 'react';

import axios from 'axios';
import { apiVisitorLogList } from '../../../services/api';
import { webserviceurl } from '../../../services/api';
import Loader from '../../../common/Loader';
import { NavLink } from 'react-router-dom';

const DataNotFoundModal = ({ onClose, message }) => {
  return (
    <div>
      <div>Data Not Found</div>
      <div>{message}</div>
      <div>
        <button onClick={onClose} color="primary">
          Close
        </button>
      </div>
    </div>
  );
};
function Pagination({ totalPages, onPageChange, currentPage }) {
  const [currentPageComponent, setCurrentPageComponent] = useState(currentPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPageComponent(newPage);
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}
export default function VisitorLog() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalItemPage, setTotalItemPage] = useState(0);

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

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedDevice('');
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };
  const selectedLocationEntry = jsonData.find(
    (entry) => entry.location === selectedLocation,
  );
  const devices = selectedLocationEntry ? selectedLocationEntry.devices : [];

  function exportToCSV(data, filename) {
    const csvData = convertToCSV(data);
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    // Check if the browser supports the HTML5 "download" attribute
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE browser
      window.navigator.msSaveOrOpenBlob(csvBlob, filename);
    } else {
      // For other browsers
      const csvURL = URL.createObjectURL(csvBlob);
      const tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', filename);
      tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }

  const handleExportClick = () => {
    if (data && data.length > 0) {
      exportToCSV(data, 'exported_data.csv');
    } else {
      setShowModal(true);
      setModalMessage('No data found to export.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };
  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }
  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }
  function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map((header) => {
        const escapedValue = String(row[header]).replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    // setEndDate(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }
  const handlePageChange = async (event, page) => {
    await setCurrentPage(event);
    console.log(currentPage, 'current page');
  };

  const handleAnalyticsChange = async (e) => {
    // Reset current page to 1 when analytics value changes
    await setSelectedAnalytics(e.target.value);
    await setCurrentPage(1);
  };

  function calculateAge(birthdate) {
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
  let fetch = () => {
    let params = {
      from: `${startDate} 00:00`,
      to: `${endDate} 23:59`,
      device_id: selectedDevice,
      country_id: selectedCountry,
      age: selectedAge,
      analytics: selectedAnalytics,
      name: selectedName,
      gender: selectedGender,
      pageSize: itemsPerPage,
      pageIndex: currentPage,
    };
    setLoading(true);
    console.log(params);
    apiVisitorLogList(params).then((res) => {
      console.log(res);
      setData(res.records);
      // setData(data);
      setLoading(false);
      setTotalPages(res.pagesCount);
      setTotalItemPage(res.total);
      console.log(data);
    });
  };
  useEffect(() => {
    const date = getTodayDate();
    setEndDate(date);
    setStartDate(date);
  }, []);

  useEffect(() => {
    if (endDate !== '') {
      // Perform your fetch request here, using todayDate as needed
      fetch();
    }
  }, [
    currentPage,
    endDate,
    startDate,
    selectedDevice,
    selectedCountry,
    selectedAge,
    selectedAnalytics,
    selectedName,
    selectedGender,
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        webserviceurl + 'gema_admin_api/location/readOnline.php',
      );
      console.log(result.data.data.records);
      setJsonData(result.data.data.records);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {/* <NavLink to='/log-face-recognition'>
        <div className='flex capitalize mb-5 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
          <h1 className='text-lg font-semibold uppercase'>log pengenal wajah</h1>
        </div>
      </NavLink> */}
      <div>
        <h3 className="text-2xl font-semibold mb-4"> Log Prajurit Binaan</h3>
        <div className="flex-col w-full gap-4">
          <div className="flex items-end mb-4 justify-between">
            <div className="flex gap-4 flex-wrap">
              <form>
                <div className="items-center">
                  <h1 className="">Pilih Analitik</h1>
                  <select
                    className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="Select Analytics"
                    value={selectedAnalytics}
                    onChange={handleAnalyticsChange}
                  >
                    <option value="">Semua Analitik</option>
                    <option value="unrecognized">Unrecognized</option>
                    <option value="face_recognition">Face Recognition</option>
                  </select>
                </div>
              </form>
              {selectedAnalytics == 'unrecognized' ? null : (
                <form>
                  <div className="flex-col">
                    <h1>Nama</h1>
                    <input
                      className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="Name"
                      placeholder="Nama"
                      value={selectedName}
                      onChange={(e) => setSelectedName(e.target.value)}
                    />
                  </div>
                </form>
              )}
              {selectedAnalytics == 'unrecognized' ? null : (
                <form>
                  <div className="flex-col">
                    <h1>Usia</h1>
                    <input
                      className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      placeholder="Usia"
                      name="Age"
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                    />
                  </div>
                </form>
              )}
              {selectedAnalytics == 'unrecognized' ? null : (
                <form>
                  <div>
                    <h1 id="demo-simple-select-autowidth-label">
                      Pilih Gender
                    </h1>
                    <select
                      className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="Select Gender"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    >
                      <option value="">Semua Gender</option>
                      <option value="true">Pria</option>
                      <option value="false">Wanita</option>
                    </select>
                  </div>
                </form>
              )}

              <form>
                <h1 id="demo-simple-select-autowidth-label">Pilih Lokasi</h1>
                <select
                  className="w-full rounded-md border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-0 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="Select Location"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option value="">Semua Lokasi</option>
                  {jsonData.map((entry) => (
                    <option key={entry.location} value={entry.location}>
                      {entry.location}
                    </option>
                  ))}
                </select>
              </form>
              <form>
                <div>
                  <h1 id="demo-simple-select-autowidth-label">
                    Pilih Perangkat
                  </h1>
                  <select
                    className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="Select Device"
                    value={selectedDevice}
                    onChange={handleDeviceChange}
                  >
                    <option value="">Semua Perangkat</option>

                    {devices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.deviceName}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div>
              <button
                className=" text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
                onClick={handleExportClick}
              >
                Export CSV
              </button>
            </div>
            {showModal && (
              <DataNotFoundModal
                onClose={handleCloseModal}
                message={modalMessage}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full gap-4 py-4">
        <div className="flex items-center">
          <h1 className="w-full">Tanggal Awal</h1>
          <input
            className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="flex items-center">
          <h1 className="w-full">Tanggal Akhir</h1>
          <input
            className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      {selectedAnalytics == 'unrecognized' ? (
        <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto rounded-t-md">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-slate-600">
                  <th className=" py-4 px-4 text-sm font-medium xsm:text-base text-black dark:text-white xl:pl-11">
                    Gambar Kamera
                  </th>

                  <th className=" py-4 px-4 text-sm font-medium xsm:text-base text-black dark:text-white">
                    Nama
                  </th>
                  <th className=" py-4 px-4 text-sm font-medium xsm:text-base text-black dark:text-white">
                    Lokasi
                  </th>
                  <th className="py-4 px-4 text-sm font-medium xsm:text-base text-black dark:text-white">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <img
                        src={webserviceurl + item.image}
                        className="h-8 w-8 text-black dark:text-white"
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        Tidak Terdaftar{' '}
                      </h5>
                      <p className="text-sm">Usia {item.age}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {' '}
                        {item.device_name} - {item.location_name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {' '}
                        {item.timestamp}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto rounded-t-md">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-slate-600">
                  <th className=" py-4 px-4 font-medium text-black dark:text-white ">
                    Gambar Kamera
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white ">
                    Database Gambar
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white ">
                    Nama
                  </th>

                  <th className=" py-4 px-4 font-medium text-black dark:text-white">
                    Usia
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white">
                    Lokasi
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <img
                        src={webserviceurl + item.image}
                        alt="Gambar Dari Kamera"
                        className="h-8 w-8 text-black dark:text-white"
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {item.face_pics == null ? (
                        <div>No Image</div>
                      ) : (
                        <img
                          src={webserviceurl + item.face_pics}
                          alt="Database Image"
                          className="h-8 w-8 text-black dark:text-white"
                        />
                      )}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.visitor_name}{' '}
                      </h5>
                      <p className="text-sm">
                        {' '}
                        {item.gender === true
                          ? 'Pria'
                          : item.gender === false
                            ? 'Wanita'
                            : item.gender === null || item.gender === ''
                              ? 'Unknown'
                              : null}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.visitor_name !== 'unrecognized'
                          ? calculateAge(item.dob)
                          : item.age}{' '}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {item.isdpo === true ? (
                        <p className="inline-flex rounded-full bg-red-500 bg-opacity-90 py-1 px-3 text-sm font-medium text-white">
                          Watchlist
                        </p>
                      ) : item.isemployee === true ? (
                        <p className="inline-flex rounded-full bg-blue-500 bg-opacity-50 py-1 px-3 text-sm font-medium text-white">
                          Petugas
                        </p>
                      ) : item.isdpo === false && item.isemployee === false ? (
                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                          Warga Binaan
                        </p>
                      ) : (
                        <p className="inline-flex rounded-full bg-yellow-500 bg-opacity-90 py-1 px-3 text-sm font-medium text-white">
                          Tidak Terdaftar
                        </p>
                      )}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div>
                        {' '}
                        {item.device_name} - {item.location_name}
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div> {item.timestamp}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 100,
        }}
      >
        <div>
          {data.length > 0 ? (
            <>
              Showing{' '}
              {data.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{' '}
              {currentPage == totalPages
                ? totalItemPage
                : Math.min(currentPage * itemsPerPage, totalItemPage)}{' '}
              of {totalItemPage} data
            </>
          ) : (
            'No data found'
          )}
        </div>
        {/* <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        /> */}
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
