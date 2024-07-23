import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { set } from 'react-hook-form';
import {
  allKameraOtmilByLocation,
  apiBuilding,
  apiDeviceDetail,
} from '../../services/api';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Alerts } from './AlertCamera';
import { Error403Message } from '../../utils/constants';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { IoMdDownload } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataCamera from './DataCamera';

const tokenItem = localStorage.getItem('token');
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

function extractTimeFromURL(url) {
  const regex = /\/(\d{2})(\d{2})(\d{2})\.mp4$/;
  const match = url.match(regex);
  if (match) {
    const hours = match[1];
    const minutes = match[2];
    const seconds = match[3];
    return `${hours} : ${minutes} : ${seconds}`;
  } else {
    return null; // Return null if no match found
  }
}

function getTime(offset = 0) {
  const now = new Date();
  now.setHours(now.getHours() + offset);
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const CameraPlayback = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date(Date.now()).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [mulaiDate, setMulaiDate] = useState(new Date());
  const [selesaiDate, setSelesaiDate] = useState(new Date());

  const [baseUrl] = useState('http://100.81.142.71:4007/record/');
  const [extension] = useState('.mp4');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [forUrl, setForurl] = useState('');
  const [currentRecordingIndex, setCurrentRecordingIndex] = useState(-1);
  const [dataAllCamera, setDataAllCamera] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null); // Initially, no camera is selected.
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [date, setDate] = useState(getCurrentDate());
  const [timeStart, setTimeStart] = useState(getTime(-1));
  const [timeFinish, setTimeFinish] = useState(getTime());
  const [detailKamera, setDetailKamera] = useState();
  const [deviceName, setDeviceName] = useState('');
  const [building, setBuilding] = useState([]);
  const [cameraid, setCameraId] = useState();
  let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([
    {
      nama_ruangan_otmil: '',
      kamera: [{ kamera_id: '', nama_kamera: '' }],
      ruangan_otmil_id: '',
    },
  ]);

  let cameraName = location.state;

  const [playlistPlayback, setPlaylistPlayback] = useState([]);

  const videoRef = useRef(null);
  let playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://192.168.100.111:4007'));

  // useEffect(() => {
  //   const getCurrentDateTime = () => {
  //     const now = new Date();
  //     const currentDate = formatDate(now);
  //     const currentTime = formatTime(now);
  //     const futureTime = calculateFutureTime(now, 5); // 5 menit ke depan

  //     setDate(currentDate);
  //     setTimeStart(currentTime);
  //     setTimeFinish(futureTime);
  //   };

  //   getCurrentDateTime();
  // }, []);

  // const formatDate = (date) => {
  //   const year = date.getFullYear();
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   const day = ('0' + date.getDate()).slice(-2);
  //   return `${year}-${month}-${day}`;
  // };

  const formatTime = (date) => {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };

  const calculateFutureTime = (date, minutes) => {
    const futureDate = new Date(date.getTime() + minutes * 60000); // Menambahkan menit ke waktu sekarang
    return formatTime(futureDate);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
      console.log('response from apiBuilding', response);

      if (response.data.status === 'OK') {
        setBuilding(response);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      console.log('error', e);
      // if (e.response.status === 403) {
      //   navigate('/auth/signin', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.response.status === 403 ? 'warning' : 'error',
      //   title: e.response.status === 403 ? Error403Message : e.message,
      // });
    }
    // setIsLoading(false);
  };
  // const client = useRef(new W3CWebSocket('ws://100.81.142.71:4007'));

  // useEffect(() => {
  //   // Fetch camera data when the component mounts.
  //   allKameraOtmilByLocation(token)
  //     .then((res) => {
  //       setLocationDeviceListOtmil(res);
  //       console.log(res, 'res otmil');
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/auth/signin', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });

  //   // WebSocket logic
  //   client.current.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //     // No need to send a request here; it will be sent when the camera is selected.
  //   };

  //   // Handle WebSocket messages (response from the server)
  //   client.current.onmessage = async (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     console.log('data server', message.data);
  //     // await setDeviceName(dataFromServer.deviceName);

  //     if (dataFromServer.message === 'GET FILE FROM DIRECTORY PATH') {
  //       let formattedDate = date.split('-').join('.');
  //       let formattedDeviceName = dataFromServer.deviceName.split(' ').join('');
  //       let playlist = dataFromServer.files.map((file) => {
  //         console.log(
  //           baseUrl + formattedDeviceName + '/' + formattedDate + '/' + file,
  //         );

  //         return (
  //           baseUrl + formattedDeviceName + '/' + formattedDate + '/' + file
  //         );
  //       });
  //       setPlaylistPlayback(playlist);
  //       console.log('ini playback', playlist);
  //     } else if (dataFromServer.message === 'FILE FROM DIRECTORY EMPTY') {
  //       console.log('Got reply from the server:', dataFromServer);
  //       setPlaylistPlayback([]);
  //     }
  //   };

  //   // WebSocket close and error handling
  //   client.current.onclose = (event) => {
  //     console.log('WebSocket Client Closed:', event);
  //   };

  //   client.current.onerror = (error) => {
  //     console.error('WebSocket Error:', error);
  //   };
  // }, [date, selectedCamera]);
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
        console.log('ini playback', playlist);
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
  }, [date, selectedCamera]);
  useEffect(() => {
    fetchDeviceDetail();
  }, [cameraid]);
  const fetchDeviceDetail = async () => {
    const id = cameraid;
    console.log(id, 'props from data camera playback');

    try {
      const res = await apiDeviceDetail(id);
      setDetailKamera(res);
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
  const handleClickCam = (camId) => {
    setCameraId(camId);
    console.log('iii', camId);
  };
  useEffect(() => {
    if (forUrl) {
      // Set the video URL when `forUrl` changes
      playerRef = forUrl;
      console.log(playerRef, 'ini url');
    }
  }, [forUrl]);
  console.log('for', forUrl);
  // Function to send a request to the WebSocket server
  const sendRequest = (method, params) => {
    console.log('dataKameraSendWebsocket', params);
    console.log('dataKameraSendWebsocketMethod', method);
    client.current.send(JSON.stringify({ method, params }));
  };
  console.log(detailKamera, 'ini detail');
  // Handle camera change
  const handleCameraChange = async (e) => {
    const selectedIndex = e.target.value;
    const selectedCam = dataAllCamera[selectedIndex];
    console.log(selectedCam);

    await setSelectedCamera(selectedCam);
    // await setDeviceName(selectedCam.nama_kamera.split(' ').join('_'));

    // Send a request when a camera is selected
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCam.nama_kamera,
          urlRTSP: selectedCam.url_rtsp,
          IpAddress: selectedCam.ip_address,
          timeStart,
          timeFinish,
          date,
        },
      ],
    });
  };

  const handleDateChange = async (e) => {
    await setDate(e.target.value);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart,
          timeFinish,
          date: e.target.value,
        },
      ],
    });
  };

  const handleTimeStartChange = async (e) => {
    let formattedTime = e.target.value;
    console.log(formattedTime);
    await setTimeStart(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart: formattedTime,
          timeFinish,
          date,
        },
      ],
    });
  };

  const handleTimeFinishChange = async (e) => {
    let formattedTime = e.target.value;
    console.log(formattedTime);
    await setTimeFinish(formattedTime);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart,
          timeFinish: formattedTime,
          date,
        },
      ],
    });
  };

  // Handle video playback errors
  const handleVideoError = (error) => {
    console.log(error);
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.i-gedung',
          popover: {
            title: 'Gedung',
            description: 'Pilih Gedung',
          },
        },
        {
          element: '.i-lantai',
          popover: {
            title: 'Lantai',
            description: 'Pilih lantai',
          },
        },
        {
          element: '.i-ruangan',
          popover: {
            title: 'Ruangan',
            description: 'Pilih ruangan',
          },
        },
        {
          element: '.i-kamera',
          popover: {
            title: 'Kamera',
            description: 'Pilih kamera',
          },
        },
      ],
    });

    driverObj.drive();
  };

  // Handle video playback ended
  // const handleVideoEnded = () => {
  //   setCurrentVideoIndex(
  //     (prevIndex) => (prevIndex + 1) % playlistPlayback.length,
  //   );
  //   playerRef.current.seekTo(0);
  // };

  // Load the video URL when the current video index changes

  useEffect(() => {
    if (playlistPlayback[currentVideoIndex]) {
      playerRef = playlistPlayback[currentVideoIndex];
    }
  }, [currentVideoIndex]);

  const handleRecordingClick = (recording: any, index: any) => {
    let newUrl = recording.replace('100.81.142.71', '192.168.1.111');
    // console.log('Recording clicked:', newUrl);
    console.log('clicked', recording);
    setForurl(newUrl);
    // setForurl(recording);
    setCurrentRecordingIndex(index);
  };
  const handleDownload = () => {
    // Create a new anchor element
    const anchor = document.createElement('a');
    anchor.href = forUrl;
    anchor.download = 'video.mp4'; // Nama file yang akan diunduh
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

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

  const handleChangeStartDate = async (date) => {
    setMulaiDate(date);
    const formattedDate = formatDate(date);
    console.log('Tanggal_dipilih:', formattedDate);
    await setStartDate(formattedDate);
    console.log('startDateSatu:', formattedDate);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart: startDate + ':00',
          timeFinish: endDate + ':59',
          date,
        },
      ],
    });
  };

  const handleChangeEndDate = async (date) => {
    setSelesaiDate(date);
    const formattedDate = formatDate(date);
    console.log('Tanggal_dipilih:', formattedDate);
    await setEndDate(formattedDate);
    await sendRequest('getPlayback', {
      dataCamera: [
        {
          deviceName: 'Camera 1',
          // deviceName: selectedCamera?.nama_kamera,
          urlRTSP: selectedCamera?.url_rtsp,
          IpAddress: selectedCamera?.ip_address,
          timeStart: `${startDate}:00`,
          timeFinish: `${endDate}:59`,
          date,
        },
      ],
    });
  };

  return (
    <div className="px-10">
      <div className="flex items-center gap-x-2 pt-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="flex flex-col items-center w-full md:w-11/12 lg:w-full">
          <div className="mr-4 mb-2">
            {client.current.readyState !== WebSocket.OPEN && (
              <h1 className="font-semibold text-xl text-red-500 animate-pulse">
                Error connection
              </h1>
            )}
            {loading && client.current.readyState == WebSocket.OPEN && (
              <p className="animate-pulse">Sedang memuat ....</p>
            )}
          </div>
          {/* <div className="w-full h-full">{playlistPlayback.length > 0 ? ( */}
          <div className="player-wrapper r-player flex justify-center space-x-8 w-full">
            <div className="w-full bg-graydark p-4 flex flex-col justify-center">
              <div className="flex flex-col justify-center ">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <h1 className="text-xl font-bold tracking-wider">
                    Playback Camera
                  </h1>
                  <h1 className="font-semibold text-lg mt-1 tracking-wider">
                    {detailKamera?.nama_kamera !== undefined
                      ? `(${detailKamera?.nama_kamera} - ${detailKamera?.nama_ruangan_otmil} - ${detailKamera?.nama_lokasi_otmil})`
                      : ''}
                  </h1>
                </div>
                {detailKamera?.nama_kamera !== undefined && (
                  <div className="flex gap-4 justify-center mb-4 flex-col items-center">
                    {/* <select onChange={handleCameraChange} className="p-kamera">
            <option value="">Select a Camera</option>
            {dataAllCamera.map((data, index) => (
              <option key={data.kamera_id} value={index}>
                {data.nama_kamera}
              </option>
            ))}
          </select> */}
                    <div className=" flex flex-col gap-5 w-1/2 justify-center items-center">
                      <label className="text-lg font-semibold tracking-wider">
                        {' '}
                        Pilih Waktu Mulai
                      </label>
                      <DatePicker
                        selected={mulaiDate}
                        onChange={handleChangeStartDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="dd/MM/yyyy HH:mm"
                        className="w-[105%] mr-29"
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
                        className="w-[105%] mr-29"
                      />
                    </div>
                  </div>
                )}
              </div>
              {playlistPlayback.length > 0 ? (
                <ReactPlayer
                  className="react-player"
                  url={forUrl}
                  playing={true}
                  controls={true}
                  muted={true}
                  ref={playerRef}
                  onBuffer={() => setLoading(true)}
                  onBufferEnd={() => setLoading(false)}
                  onError={handleVideoError}
                />
              ) : (
                <p className="tracking-wider text-center animate-pulse mr-2">
                  {!cameraid
                    ? 'Silahkan pilih gedung'
                    : 'Silahkan pilih tanggal dan waktu'}
                </p>
              )}
            </div>
            {playlistPlayback.length > 0 && (
              <div className="box w-2/6 ">
                <h2 className="text-xl font-bold mb-2 text-center tracking-wider">
                  Recordings
                </h2>
                <ul className="flex flex-col overflow-auto h-96 divide-y divide-dashed divide-zinc-500">
                  {playlistPlayback.map((recording, index) => {
                    const urlParts = recording.split('/');
                    const fileName = urlParts[urlParts.length - 1];
                    const isActive = index === currentRecordingIndex;

                    return (
                      <div className="flex items-center justify-center gap-8">
                        <li
                          className={`flex p-4 gap-3 items-center cursor-pointer text-white text-center ${isActive ? 'bg-green-700' : 'bg-transparent'} font-light tracking-widest py-2`}
                          key={index}
                          onClick={() => handleRecordingClick(recording, index)}
                        >
                          {extractTimeFromURL(recording)}
                          <a href={forUrl}>
                            <IoMdDownload className="hover:text-2xl hover:text-orange-200" />
                          </a>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="w-1/2 border border-gray-2 p-4 h-[26rem] overflow-y-scroll">
              <div className="w-full flex justify-center pt-2">
                <h2 className="font-bold text-xl tracking-tight mr-3">
                  Daftar Gedung
                </h2>
                <button>
                  <HiQuestionMarkCircle
                    values={filter}
                    aria-placeholder="Show tutorial"
                    // onChange={}
                    onClick={handleClickTutorial}
                  />
                </button>
              </div>
              {building?.data?.records?.gedung.map((gedung, i) => {
                return (
                  <>
                    <div className="i-gedung grid divide-y divide-neutral-200 max-w-xl border-b mx-auto">
                      <div className="py-5" id="s-gedung">
                        <details className="group">
                          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span key={i}>{gedung.nama_gedung_otmil}</span>
                            <span className="transition-transform group-open:rotate-180">
                              <svg
                                fill="none"
                                height="24"
                                shapeRendering="geometricPrecision"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </summary>

                          <div className="pt-2 ml-[20px] i-lantai">
                            {gedung?.lantai.map((a) => {
                              return (
                                <>
                                  <details className="groupChild">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                      <span>
                                        {a?.nama_lantai
                                          ? a?.nama_lantai
                                          : 'Undifined'}
                                      </span>
                                      <span className="transition-transform groupChild-open:rotate-180">
                                        <svg
                                          fill="none"
                                          height="24"
                                          shapeRendering="geometricPrecision"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1.5"
                                          viewBox="0 0 24 24"
                                          width="24"
                                        >
                                          <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                      </span>
                                    </summary>
                                    <div className="mb-2 ml-[20px]">
                                      {a?.ruangan.map((r) => {
                                        return (
                                          <>
                                            <details className="groupChild">
                                              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                                <span className="i-ruangan">
                                                  {r?.nama_ruangan_otmil}
                                                </span>
                                                <span className="transition-transform groupChild-open:rotate-180">
                                                  <svg
                                                    fill="none"
                                                    height="24"
                                                    shapeRendering="geometricPrecision"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                  >
                                                    <path d="M6 9l6 6 6-6"></path>
                                                  </svg>
                                                </span>
                                              </summary>
                                              {r?.kamera.map((k) => (
                                                // <NavLink
                                                //   to={`/kamera-playback/${k.kamera_id}`}
                                                //   state={k.nama_kamera}
                                                // >
                                                //   <p
                                                //     className={` group-open:animate-fadeIn cursor-pointer ml-3 ${
                                                //       k.status_kamera ==
                                                //         'aktif' ||
                                                //       k.status_kamera ==
                                                //         'online'
                                                //         ? 'text-green-500' // warna teks hijau jika status kamera aktif
                                                //         : k.status_kamera ===
                                                //             'rusak'
                                                //           ? 'text-yellow-500' // warna teks kuning jika status kamera rusak
                                                //           : 'text-red-500' // warna teks merah untuk status kamera lainnya
                                                //     }`}
                                                //   >
                                                //     {k.nama_kamera} (
                                                //     {k.status_kamera ===
                                                //       'aktif' ||
                                                //     k.status_kamera == 'online'
                                                //       ? 'aktif'
                                                //       : k.status_kamera ===
                                                //           'rusak'
                                                //         ? 'rusak'
                                                //         : 'tidak aktif'}
                                                //     )
                                                //   </p>
                                                // </NavLink>
                                                <p
                                                  onClick={() =>
                                                    handleClickCam(k.kamera_id)
                                                  }
                                                  className={` group-open:animate-fadeIn cursor-pointer ml-3 ${
                                                    k.status_kamera ==
                                                      'aktif' ||
                                                    k.status_kamera == 'online'
                                                      ? 'text-green-500' // warna teks hijau jika status kamera aktif
                                                      : k.status_kamera ===
                                                          'rusak'
                                                        ? 'text-yellow-500' // warna teks kuning jika status kamera rusak
                                                        : 'text-red-500' // warna teks merah untuk status kamera lainnya
                                                  } i-kamera`}
                                                >
                                                  {k.nama_kamera} (
                                                  {k.status_kamera ===
                                                    'aktif' ||
                                                  k.status_kamera == 'online'
                                                    ? 'aktif'
                                                    : k.status_kamera ===
                                                        'rusak'
                                                      ? 'rusak'
                                                      : 'tidak aktif'}
                                                  )
                                                </p>
                                              ))}
                                            </details>
                                          </>
                                        );
                                      })}
                                    </div>
                                  </details>
                                </>
                              );
                            })}
                          </div>
                        </details>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/* <Player>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player> */}
        </div>
        {/* ) : ( */}
        {/* <h1>No video available for the selected camera and time range.</h1> */}
        {/* )} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CameraPlayback;
