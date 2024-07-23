import { useState, useEffect, useMemo } from 'react';

import axios from 'axios';
import { apiVisitorRealtimeLogList } from '../../../services/api';

import { webserviceurl } from '../../../services/api';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Alerts } from '../AlertLog';
import { Error403Message } from '../../../utils/constants';

const DataNotFoundModal = ({ open, onClose, message }) => {
  return (
    <div
      className={`fixed ${open ? 'block' : 'hidden'} inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-xl font-bold text-gray-900">Data Not Found</h2>
            <p className="text-gray-700">{message}</p>
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DoorLog() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
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

  let fetch = async () => {
    try {
      let params = {
        device_id: selectedDevice,
        country_id: selectedCountry,
        age: selectedAge,
        analytics: selectedAnalytics,
        name: selectedName,
        gender: selectedGender,
      };

      await setLoading(true); // Set loading state to true

      let data = await apiVisitorRealtimeLogList(params);
      setData(data);
      setLoading(false);
      console.log(data);
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

  useEffect(() => {
    fetch();
  }, [
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

  return (
    <>
      {/* <NavLink to='/log-access-control'>
        <div className='flex capitalize mb-5 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
          <h1 className='text-lg font-semibold uppercase'>log akses kontrol</h1>
        </div>
      </NavLink> */}
      <div className="flex-col justify-between items-center">
        <h3 className="font-semibold mb-3 text-2xl">Log Pintu</h3>
        <div className="flex justify-between items-end space-x-4 pb-4">
          <div className="flex gap-4 flex-wrap">
            <div className="">
              <div className="w-full">
                <label
                  htmlFor="analytics-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pilih Analitik
                </label>
                <select
                  id="analytics-select"
                  name="Select Analytics"
                  className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-0 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={selectedAnalytics}
                  onChange={(e) => setSelectedAnalytics(e.target.value)}
                >
                  <option value="">Semua Analitik</option>
                  <option value="unrecognized">Tidak Dikenal</option>
                  <option value="face_recognition">Pengenalan Wajah</option>
                </select>
              </div>
            </div>
            {selectedAnalytics !== 'unrecognized' && (
              <div className="">
                <div className="w-full">
                  <label
                    htmlFor="name-input"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama
                  </label>
                  <input
                    id="name-input"
                    placeholder="Masukan Nama"
                    type="text"
                    name="Name"
                    className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {selectedAnalytics !== 'unrecognized' && (
              <div className="">
                <div className="w-full">
                  <label
                    htmlFor="age-input"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Usia
                  </label>
                  <input
                    placeholder="Masukan Usia"
                    id="age-input"
                    type="text"
                    name="Age"
                    className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={selectedAge}
                    onChange={(e) => setSelectedAge(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/* <div className="">
            <div className="w-full">
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-gray-700"
              >
                Select Country
              </label>
              <select
                id="country-select"
                name="Select Country"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">All Nationality</option>
                <option value="WNA">WNA</option>
                <option value="WNI">WNI</option>
              </select>
            </div>
          </div> */}
            {selectedAnalytics !== 'unrecognized' && (
              <div className="">
                <div className="w-full">
                  <label
                    htmlFor="gender-select"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pilih Gender
                  </label>
                  <select
                    id="gender-select"
                    name="Select Gender"
                    className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  >
                    <option value="">Semua Gender</option>
                    <option value="true">Pria</option>
                    <option value="false">Wanita</option>
                  </select>
                </div>
              </div>
            )}

            <div className="">
              <div className="w-full">
                <label
                  htmlFor="location-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pilih Lokasi
                </label>
                <select
                  id="location-select"
                  name="Select Location"
                  className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-0 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
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
              </div>
            </div>
            <div className="">
              <div className="w-full">
                <label
                  htmlFor="device-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pilih Kamera
                </label>
                <select
                  id="device-select"
                  name="Select Device"
                  className="w-full rounded-md border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={selectedDevice}
                  onChange={handleDeviceChange}
                >
                  <option value="">Semua Kamera</option>
                  {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.deviceName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleExportClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Export CSV
            </button>
            <DataNotFoundModal
              open={showModal}
              onClose={handleCloseModal}
              message={modalMessage}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-9 rounded-t-md bg-gray-2 dark:bg-meta-4 sm:grid-cols-9 dark:bg-slate-600">
          <div className="py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Prajurit Binaan
            </h5>
          </div>
          <div className="py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              No DMAC Gelang{' '}
            </h5>
          </div>
          <div className="hidden py-2.5 text-center sm:block xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Baterai Gelang{' '}
            </h5>
          </div>
          <div className="hidden py-2.5 text-center sm:block xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Detak Jantung{' '}
            </h5>
          </div>
          <div className="hidden py-2.5 text-center sm:block xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Suhu Tubuh{' '}
            </h5>
          </div>
          <div className="hidden py-2.5 text-center sm:block xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lokasi Ruangan{' '}
            </h5>
          </div>
          <div className="hidden py-2.5 text-center sm:block xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Zonasi Gateway{' '}
            </h5>
          </div>
          <div className="hidden py-2.5 text-center sm:block xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Time Stamp{' '}
            </h5>
          </div>
          <div className="hidden py-2.5 text-center sm:block xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lokasi Gedung{' '}
            </h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-9 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9">
              <div className="flex items-center justify-center py-2.5 xl:py-5">
                <p className="text-meta-2">
                  {item.visitor_name == 'unrecognized'
                    ? 'Tidak Dikenal'
                    : item.visitor_name}
                </p>
              </div>
              <div className="flex items-center justify-center py-2.5 xl:py-5">
                <p className="text-meta-2">
                  {item.visitor_name == 'unrecognized'
                    ? 'DMAC 1234'
                    : 'iDMAC 1234'}
                </p>
              </div>

              <div className="flex items-center justify-center py-2.5 xl:py-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="flex items-center justify-center py-2.5 xl:py-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="flex items-center justify-center py-2.5 xl:py-5">
                <p className="text-meta-2">
                  {item.dob == null ? item.age : calculateAge(item.dob)}
                </p>
              </div>

              <div className="hidden items-center justify-center py-2.5 sm:flex xl:py-5">
                <p className="text-black dark:text-white">{item.device_name}</p>
              </div>
              <div className="hidden items-center justify-center py-2.5 sm:flex xl:py-5">
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
              <div className="hidden items-center justify-center px-1 py-2.5 sm:flex xl:py-5">
                <p className="text-black dark:text-white">{item.timestamp}</p>
              </div>
              <div className="hidden items-center justify-center py-2.5 sm:flex xl:py-5">
                <p className="text-black dark:text-white">
                  {item.location_name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
