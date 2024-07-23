import { useState, useEffect, useMemo } from 'react';

import axios from 'axios';
import { apiVisitorRealtimeLogList } from '../../services/api';

import { webserviceurl } from '../../services/api';

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

export default function Realtime() {
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
    let params = {
      device_id: selectedDevice,
      country_id: selectedCountry,
      age: selectedAge,
      analytics: selectedAnalytics,
      name: selectedName,
      gender: selectedGender,
    };
    await setLoading(true);
    let data = await apiVisitorRealtimeLogList(params);
    setData(data);
    setLoading(false);
    console.log(data);
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
        webserviceurl + 'location/readOnline.php',
      );
      console.log(result.data.data.records);
      setJsonData(result.data.data.records);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-2xl">Log Realtime</h3>
        <div className="flex w-[70%] space-x-4 pb-4">
          <div className="w-1/6">
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
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="name-input"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <input
                id="name-input"
                type="text"
                name="Name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              />
            </div>
          </div>
          )}

          {selectedAnalytics !== 'unrecognized' && (
            <div className="w-1/6">
              <div className="w-full">
                <label
                  htmlFor="age-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usia
                </label>
                <input
                  id="age-input"
                  type="text"
                  name="Age"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                />
              </div>
            </div>
          )}
          {/* <div className="w-1/6">
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
            <div className="w-1/6">
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
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

          <div className="w-1/6">
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
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          <div className="w-1/6">
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
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

        <button
          onClick={handleExportClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export CSV
        </button>
        <DataNotFoundModal
          open={showModal}
          onClose={handleCloseModal}
          message={modalMessage}
        />
      </div>

      {selectedAnalytics == 'unrecognized' ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Foto Kamera
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama{' '}
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Usia{' '}
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Kamera{' '}
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Catatan Waktu{' '}
              </h5>
            </div>
          </div>

          {data.map((item) => {
            return (
              <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  {item.image ? (
                    <img
                      className="w-10 h-10 rounded-sm"
                      src={
                        'http://dev.transforme.co.id/gema_admin_api' +
                        item.image
                      }
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300">
                      Foto Tidak Tersedia
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">Tidak Dikenal</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">
                    {item.dob == null ? item.age : calculateAge(item.dob)}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">
                    {item.device_name}-{item.location_name}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{item.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Foto Kamera
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Foto Database
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama{' '}
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Gender{' '}
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Usia{' '}
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Status{' '}
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Kamera{' '}
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Catatan Waktu{' '}
              </h5>
            </div>
          </div>

          {data.map((item) => {
            return (
              <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  {item.image ? (
                    <img
                      className="w-10 h-10 rounded-sm"
                      src={
                        'http://dev.transforme.co.id/gema_admin_api' +
                        item.image
                      }
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300">
                      Foto Tidak Tersedia
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  {item.face_pics ? (
                    <img
                      className="w-10 h-10 rounded-sm"
                      src={
                        'http://dev.transforme.co.id/gema_admin_api' +
                        item.face_pics
                      }
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300">
                      Foto Tidak Tersedia
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{item.visitor_name == 'unrecognized' ? 'Tidak Dikenal' : item.visitor_name}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">
                    {item.gender == null
                      ? 'Tidak Diketahui'
                      : item.gender == true
                      ? 'Pria'
                      : 'Wanita'}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">
                    {item.dob == null ? item.age : calculateAge(item.dob)}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">
                    {item.visitor_name == 'unrecognized'
                      ? 'Tidak Dikenal'
                      : item.isemployee == true
                      ? 'Petugas'
                      : item.isdpo == true
                      ? 'Binaan Watchlist'
                      : 'Tentara Binaan'}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">
                    {item.device_name}-{item.location_name}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{item.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
