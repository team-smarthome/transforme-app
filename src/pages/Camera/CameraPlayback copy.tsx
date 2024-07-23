import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { set } from 'react-hook-form';

const CameraPlayback = () => {
  const [baseUrl] = useState('http://localhost:4000/record/');
  const [extension] = useState('.mp4');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const [dataAllCamera, setDataAllCamera] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');

  const [date, setDate] = useState('2023-10-06');
  const [timeStart, setTimeStart] = useState('14:04:00');
  const [timeFinish, setTimeFinish] = useState('15:00:00');

  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [urlRTSP, setUrlRTSP] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://localhost:4000'));

  const renderPlayback = (obj) => {
    console.log(obj, 'ini obj');

    const formattedData = formatData(obj);
    const playlist = generatePlaylist(formattedData);

    const handleVideoError = (error) => {
      console.error('Video playback error:', error);
      console.error('Error object:', error.target.error);

      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
      playerRef.current.seekTo(0);
    };

    const handleVideoEnded = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
      playerRef.current.seekTo(0);
    };

    useEffect(() => {
      axios
        .post(
          'https://dev.transforme.co.id/siram_admin_api/siram_api/dashboard_kamera_read.php',
          {
            device_id: deviceId,
          }
        )
        .then((response) => {
          // console.log(response.data.records);
          setDataAllCamera(response.data.records);
        });

        client.current.onopen = () => {
          console.log('WebSocket Client Connected');
        }

      if (playlist[currentVideoIndex]) {
        playerRef.current.url = playlist[currentVideoIndex];
        console.log(playlist[currentVideoIndex]);
      }
    }, [
      currentVideoIndex,
      playlist,
      date,
      timeStart,
      timeFinish,
      selectedCamera,
    ]);

    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={playlist[currentVideoIndex]}
          playing={true}
          playsinline={true}
          controls={true}
          ref={playerRef}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          key={currentVideoIndex}
        />
      </div>
    );
  };

  const formatData = (obj) => {
    const formattedObj = { ...obj };
    formattedObj.deviceName = formattedObj.deviceName.replace(/\s/g, '');
    formattedObj.date = formattedObj.date.replace(/-/g, '');
    formattedObj.timeStart = formattedObj.timeStart.replace(/:/g, '');
    formattedObj.timeFinish = formattedObj.timeFinish.replace(/:/g, '');
    return formattedObj;
  };

  const generatePlaylist = (obj) => {
    const { deviceName, date, timeStart, timeFinish } = obj;
    const startTimeInSeconds =
      parseInt(timeStart.substring(0, 2)) * 3600 +
      parseInt(timeStart.substring(2, 4)) * 60;
    const endTimeInSeconds =
      parseInt(timeFinish.substring(0, 2)) * 3600 +
      parseInt(timeFinish.substring(2, 4)) * 60;

    const playlist = [];
    for (
      let currentTime = startTimeInSeconds;
      currentTime <= endTimeInSeconds;
      currentTime++
    ) {
      const formattedTime = `${String(Math.floor(currentTime / 3600)).padStart(
        2,
        '0'
      )}:${String(Math.floor((currentTime % 3600) / 60)).padStart(
        2,
        '0'
      )}:${String(currentTime % 60).padStart(2, '0')}`;
      const formattedTimeWithoutColons = formattedTime.replace(/:/g, '');
      const urlStream = `${baseUrl}${deviceName}/${date}/video/${formattedTimeWithoutColons}${extension}`;
      playlist.push(urlStream);
    }
    return playlist;
  };

  const handleCameraChange = async (e) => {
    await setDeviceName(dataAllCamera[e.target.value].nama_kamera);
    await setDeviceId(dataAllCamera[e.target.value].kamera_id);
    await setUrlRTSP(dataAllCamera[e.target.value].url_rtsp);
    await setIpAddress(dataAllCamera[e.target.value].ip_address);
    await setSelectedCamera(dataAllCamera[e.target.value]);

    console.log(dataAllCamera[e.target.value], 'ini data all camera');

    console.log(e.target.value, 'ini value');

    console.log(selectedCamera, 'ini selected camera');
  };
  return (
    <div className="flex flex-col items-center justify-center  ">
      {selectedCamera ? (
        <h1 className="text-2xl font-bold mb-4">
          {selectedCamera.nama_kamera} -{' '}
          {selectedCamera.nama_lokasi_lemasmil
            ? selectedCamera.nama_lokasi_lemasmil
            : selectedCamera.nama_lokasi_otmil}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Playback Camera</h1>
      )}
      <div className="flex justify-around gap-4 mb-4">
        <select
          // value = {selectedCamera}
          onChange={handleCameraChange}
        >
          {dataAllCamera.map((data, index) => (
            <option value={index}>{data.nama_kamera}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={timeStart}
          onChange={(e) => setTimeStart(e.target.value)}
        />
        <input
          type="time"
          value={timeFinish}
          onChange={(e) => setTimeFinish(e.target.value)}
        />
      </div>
      
      <div className=''>
        <div className="w-full h-full">
          {renderPlayback({
            IpAddress: ipAddress,
            deviceName: deviceName,
            deviceId: deviceId,
            date: date,
            timeStart: timeStart,
            timeFinish: timeFinish,
            urlRTSP: urlRTSP,
          })}
        </div>
      </div>
    </div>
  );
};

export default CameraPlayback;

