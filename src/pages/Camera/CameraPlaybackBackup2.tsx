import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { apiBuilding } from '../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { Alerts } from './AlertCamera';
import { Error403Message } from '../../utils/constants';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CiCamera } from 'react-icons/ci';
import { IoMdArrowRoundBack } from 'react-icons/io';

const CameraPlayback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date(Date.now()).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [mulaiDate, setMulaiDate] = useState(new Date());
  const [selesaiDate, setSelesaiDate] = useState(new Date());
  const [playlistPlayback, setPlaylistPlayback] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [baseUrl] = useState('http://100.81.142.71:4007/record/');
  const [filter, setFilter] = useState('');
  const [dense, setDense] = React.useState(false);
  const [accordionState, setAccordionState] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });
  let [locationDeviceList, setLocationDeviceList] = useState([]);
  // let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([]);
  // let [locationDeviceListLemasmil, setLocationDeviceListLemasmil] = useState(
  //   [],
  // );
  const [buildings, setBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [selectedTrue, setSelectedTrue] = useState(false);
  const [columns, setColumns] = useState(2);
  const [rows, setRows] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCamOnline, setCurrentPageCamOnline] = useState(1);
  const client = useRef(new W3CWebSocket('ws://192.168.100.111:4007'));
  const camerasPerPage = columns * rows;
  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    setStartDate(formatDate(new Date()));
    setEndDate(formatDate(new Date()));
  }, []);

  useEffect(() => {
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
      // No need to send a request here; it will be sent when the camera is selected.
    };

    // Handle WebSocket messages (response from the server)
    client.current.onmessage = async (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('data_server', message.data);
      // await setDeviceName(dataFromServer.deviceName);

      if (dataFromServer.message === 'GET FILE FROM DIRECTORY PATH') {
        let formattedDate = date.split('-').join('.');
        let formattedDeviceName = dataFromServer.deviceName.split(' ').join('');
        let playlist = dataFromServer.files.map((file) => {
          console.log(
            baseUrl +
              formattedDeviceName +
              '/' +
              formattedDate +
              '/video/' +
              file,
          );

          return (
            baseUrl +
            formattedDeviceName +
            '/' +
            formattedDate +
            '/video/' +
            file
          );
        });
        setPlaylistPlayback(playlist);
        console.log('ini_playback', playlist);
      } else if (dataFromServer.message === 'FILE FROM DIRECTORY EMPTY') {
        console.log('Got reply from the server:', dataFromServer);
        setPlaylistPlayback([]);
      }
    };

    // WebSocket close and error handling
    client.current.onclose = (event) => {
      console.log('WebSocket Client Closed:', event);
    };

    client.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }, []);
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const sendRequest = (method, params) => {
    console.log('dataKameraSendWebsocket', params);
    console.log('dataKameraSendWebsocketMethod', method);
    client.current.send(JSON.stringify({ method, params }));
  };

  const handleChangeStartDate = async (date) => {
    setMulaiDate(date);
    const formattedDate = formatDate(date);
    console.log('Tanggal_dipilih:', formattedDate);
    await setStartDate(formattedDate);
    console.log('startDateSatu:', formattedDate);
  };

  const handleChangeEndDate = async (date) => {
    setSelesaiDate(date);
    const formattedDate = formatDate(date);
    console.log('Tanggal_dipilih:', formattedDate);
    await setEndDate(formattedDate);
  };

  const handleSubmitCamera = async () => {
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart: `${startDate}:00`,
          timeFinish: `${endDate}:59`,
        },
      ],
    });
    console.table({
      deviceName: selectedCamera?.nama_kamera,
      urlRTSP: selectedCamera?.url_rtsp,
      IpAddress: selectedCamera?.ip_address,
      timeStart: startDate + ':00',
      timeFinish: endDate + ':59',
    });
  };

  let fetchData = async () => {
    try {
      let dataLocal = localStorage.getItem('dataUser');
      let dataUser = JSON.parse(dataLocal!);
      dataUser = {
        lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
        lokasi_otmil_id: dataUser.lokasi_otmil_id,
        nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
        nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
      };
      console.log('data user', dataUser);

      const response = await apiBuilding(dataUser);
      console.log('response_building', response);

      if (response.data.status === 'OK') {
        setBuilding(response);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      console.log('error', e);
    }
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#s-gedung',
          popover: {
            title: 'GEDUNG',
            description: 'Pilih gedung yang diinginkan',
          },
        },
        {
          element: '#s-lantai',
          popover: {
            title: 'LANTAI',
            description: 'Pilih lantai yang diinginkan',
          },
        },
        {
          element: '#s-ruangan',
          popover: {
            title: 'RUANGAN',
            description: 'Pilih ruangan yang diinginkan',
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleSelectBuilding = (e) => {
    const selectedBuildingId = e.target.value;
    setSelectedBuilding(selectedBuildingId);
    setSelectedFloor('');
    setSelectedRoom('');
  };

  const handleSelectFloor = (e) => {
    const selectedFloorId = e.target.value;
    setSelectedFloor(selectedFloorId);
    setSelectedRoom('');
  };
  const handleClickRoom = (roomId) => {
    console.log('idroom', roomId);
    setSelectedRoom(roomId);
    setCurrentPage(1);
  };

  const handleClickKamera = (cam) => {
    console.log('ini_camera', cam);
    let dataKamera = JSON.parse(cam);
    setSelectedCamera(dataKamera);
    console.log('data_kamera', dataKamera);
    console.log('data_kamera2', dataKamera.nama_kamera);
  };

  console.log('cammmm', selectedCamera);
  const handleLayoutChange = (columns, rows) => {
    setColumns(columns);
    setRows(rows);
    setCurrentPage(1);
  };

  const indexOfLastCamera = currentPage * camerasPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;
  const totalCameras = playlistPlayback;
  const totalCamerasOnline = buildings?.data?.records?.gedung.flatMap(
    (gedung: any) =>
      gedung.lantai.flatMap((lantai: any) =>
        lantai.ruangan
          .flatMap((ruangan: any) => ruangan.kamera)
          .filter((kamera) => kamera.status_kamera === 'online'),
      ),
  );
  console.log('total', totalCameras);
  console.log('online', totalCamerasOnline);
  if (!totalCameras || !totalCamerasOnline) {
    return null;
  }
  const currentCameras = totalCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );
  const currentCamerasOnline = totalCamerasOnline.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );
  console.log('d', currentCamerasOnline);
  const totalPages = Math.ceil(totalCameras.length / camerasPerPage);
  const totalPagesCameraOnline = Math.ceil(
    totalCamerasOnline.length / camerasPerPage,
  );

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
  };
  const renderPaginationCameraOnline = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPagesCameraOnline; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
  };
  const handlePageClick = (pageNumber) => {
    if (selectedRoom) {
      setCurrentPage(pageNumber);
    } else {
      setCurrentPageCamOnline(pageNumber);
    }
  };
  const handleNextPage = () => {
    if (selectedRoom) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentPageCamOnline((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (selectedRoom) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      setCurrentPageCamOnline((prevPage) => prevPage - 1);
    }
  };
  const getPageNumbers = () => {
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2),
    );
    let endPage = startPage + maxPageNumbersToShow - 1;
    if (selectedRoom) {
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
      }
    } else {
      if (endPage > totalPagesCameraOnline) {
        endPage = totalPagesCameraOnline;
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
      }
    }

    return { startPage, endPage };
  };
  const renderCameraList = () => {
    const selectedRoomData = playlistPlayback;
    console.log('selectedRoomData', selectedRoomData);

    return (
      <div
        className="flex"
        style={{
          backgroundColor: '#333a48',
          height: '90%',
          maxHeight: '90vh',
        }}
      >
        <div className="flex flex-col justify-between p-5 bg-red-400 w-3/4"></div>
        <div className="flex flex-col justify-between p-5 bg-blue-600 w-1/4"></div>
      </div>
    );
  };

  const renderCameraOnlineList = () => {
    const onlineCamera = buildings?.data?.records?.gedung.flatMap((gedung) =>
      gedung.lantai.flatMap((lantai) =>
        lantai.ruangan
          .flatMap((ruangan) => ruangan.kamera)
          .filter((kamera) => kamera.kamera_id),
      ),
    );

    if (onlineCamera.length === 0) {
      return (
        <div className="flex justify-center items-center bg-graydark w-11/12 h-5/6">
          <h1 className="font-semibold text-lg">Tidak ada kamera yang aktif</h1>
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundColor: '#333a48',
          height: '90%',
          maxHeight: '90vh',
          overflowY: 'scroll',
        }}
      >
        <div className="flex flex-col justify-between p-5">
          {onlineCamera && (
            <div
              className={`grid ${
                columns === 1 && rows === 1
                  ? 'grid-cols-1 grid-rows-1'
                  : columns === 2 && rows === 2
                    ? 'grid-cols-2 grid-rows-2'
                    : columns === 2 && rows === 3
                      ? 'grid-cols-3 grid-rows-2'
                      : columns === 2 && rows === 4
                        ? 'grid-cols-4 grid-rows-2'
                        : 'grid-cols-1 grid-rows-1'
              } gap-4 justify-center w-full`}
            >
              <div className=" w-[300%] flex justify-center items-center text-2xl flex-col gap-2 mt-40">
                <p>Silahkan Pilih Ruangan dan Tanggal</p>
                <p>Terlebih dahulu</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getRoomLocation = () => {
    if (!selectedRoom) return null;

    let location = '';
    buildings?.data?.records?.gedung.forEach((gedung) => {
      gedung.lantai.forEach((lantai) => {
        const foundRoom = lantai.ruangan.find(
          (ruangan) => ruangan.ruangan_otmil_id === selectedRoom,
        );
        if (foundRoom) {
          location = `${gedung.nama_gedung_otmil} - ${lantai.nama_lantai} - ${foundRoom.nama_ruangan_otmil}`;
        }
      });
    });

    return location;
  };
  const getRoomLocationCamOnline = (id: any) => {
    let location = '';
    buildings?.data?.records?.gedung.forEach((gedung) => {
      gedung.lantai.forEach((lantai) => {
        const foundRoom = lantai.ruangan.find(
          (ruangan) => ruangan.ruangan_otmil_id === id,
        );
        console.log('found', foundRoom);
        if (foundRoom) {
          location = `${gedung.nama_gedung_otmil} - ${lantai.nama_lantai} - ${foundRoom.nama_ruangan_otmil}`;
        }
      });
    });

    return location;
  };
  console.log('buid', buildings);
  return (
    <>
      <div className="w-full ml-1 flex gap-5  px-7 mt-4 items-center justify-between">
        <div className="flex items-center justify-between w-9/12 gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-white rounded-md px-4 py-2 text-white hover:bg-meta-4 hover:text-white transition duration-300 ease-in-out"
          >
            <IoMdArrowRoundBack /> Kembali
          </button>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedBuilding}
            onChange={handleSelectBuilding}
            className="p-2 border rounded w-36 bg-meta-4 font-semibold"
          >
            <option disabled value="">
              Pilih Gedung
            </option>
            {buildings?.data?.records?.gedung?.map((building) => (
              <option
                key={building.gedung_otmil_id}
                value={building.gedung_otmil_id}
              >
                {building.nama_gedung_otmil}
              </option>
            ))}
          </select>

          {selectedBuilding && (
            <select
              value={selectedFloor}
              onChange={handleSelectFloor}
              className="p-2 border rounded w-36 bg-meta-4 font-semibold"
            >
              <option disabled value="">
                Pilih Lantai
              </option>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.map((floor) => (
                  <option
                    key={floor.lantai_otmil_id}
                    value={floor.lantai_otmil_id}
                  >
                    {floor.nama_lantai}
                  </option>
                ))}
            </select>
          )}

          {selectedFloor && (
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="p-2 border rounded w-36 bg-meta-4 font-semibold"
            >
              <option disabled value="">
                Pilih Ruangan
              </option>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.find(
                  (floor) => floor.lantai_otmil_id === selectedFloor,
                )
                ?.ruangan.map((room) => (
                  <option
                    key={room.ruangan_otmil_id}
                    value={room.ruangan_otmil_id}
                    onClick={() => handleClickRoom(room.ruangan_otmil_id)}
                  >
                    {room.nama_ruangan_otmil}
                  </option>
                ))}
            </select>
          )}
          {selectedRoom && (
            <select
              value={selectedCamera}
              onChange={(e) => handleClickKamera(e.target.value)}
              className="p-2 border rounded w-36 bg-meta-4 font-semibold"
            >
              <option disabled value="">
                Pilih Kamera
              </option>
              {buildings?.data?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.find(
                  (floor) => floor.lantai_otmil_id === selectedFloor,
                )
                ?.ruangan.find((room) => room.ruangan_otmil_id === selectedRoom)
                ?.kamera.map((cam) => (
                  <option
                    key={cam.kamera_id}
                    value={JSON.stringify(cam)}
                    onClick={() => handleClickKamera(cam)}
                  >
                    {cam.nama_kamera}
                  </option>
                ))}
            </select>
          )}
        </div>
      </div>

      <div className=" flex py-4 justify-center items-center  gap-6">
        <label className="text-md font-semibold tracking-wider">
          {' '}
          Pilih Waktu Mulai
        </label>
        <DatePicker
          selected={mulaiDate}
          onChange={handleChangeStartDate}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          className="w-[100%] text-slate-950 text-center"
          timeIntervals={1}
        />
        <label className="text-lg font-semibold tracking-wider">
          {' '}
          Pilih Waktu Selesai
        </label>
        <DatePicker
          selected={selesaiDate}
          onChange={handleChangeEndDate}
          showTimeSelect
          timeIntervals={1}
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          className="w-[100%] text-center text-slate-950"
        />
        <div
          className="bg-green-400 py-2 px-5 text-white rounded-lg"
          onClick={handleSubmitCamera}
        >
          Submit
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-5 min-h-sceen flex gap-4">
        <div className="w-full h-screen">
          <div className="py-4 pl-6 w-[95%] flex justify-between items-center"></div>
          <>{selectedCamera ? renderCameraList() : renderCameraList()}</>
        </div>
      </div>
    </>
  );
};

export default CameraPlayback;
