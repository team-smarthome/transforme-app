import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import {
  faceCompareChina,
  apiVisitorLogList,
  apiDeviceDetail,
  apiVisitorRealtimeLogList,
} from '../../services/api.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Alerts } from './AlertCamera.js';
import { Error403Message } from '../../utils/constants.js';

const stylesListComent = {
  inline: {
    display: 'inline',
  },
};

const DataCamera = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState({
    groupId: '',
    groupShow: [],
    ffmpegIP: 'localhost',
    baseUrl: 'http://localhost:4000/stream/',
    extenstion: '_.m3u8',
    girdView: 1,
    isFullscreenEnabled: false,
    selectOptionGroup: null,
    optionsDataGroup: [],
    viewListData: [],
    listViewCamera: [],
    getDataPlayer: [],
    deviceDetail: {},
    startDate: '',
    endDate: '',
    isWebSocketConnected: false,
    dataVisitorLog: [],
  });

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const client = useRef(new W3CWebSocket('ws://100.81.142.71:5000'));
  const clientFR = useRef(new W3CWebSocket('ws://100.81.142.71:5000'));

  useEffect(() => {
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    clientFR.current.onopen = () => {
      console.log('WebSocket FR Connected');
    };
    clientFR.current.onmessage = (message) => {
      const dataFromServer = message;
      console.log('got reply! ', dataFromServer);
      if (dataFromServer.data.id == state.deviceDetail.kamera_id) {
        fetchDataInmateRealtime();
      }
    };
    const fetchDataAndSendRequest = async () => {
      await fetchDeviceDetail(); // Wait for fetchDeviceDetail to complete before sending the request

      const date = getTodayDate();
      setState((prevState) => ({ ...prevState, endDate: date }));

      return () => {
        // clearInterval(fetchInterval);
        sendRequest('disconnectedLive', {
          status: 'disconnected',
        });
      };
    };
    // fetchDataInmateRealtime();
    setInterval(fetchDataInmateRealtime, 5000);

    fetchDataAndSendRequest(); // Call the function to initiate the process
  }, [props.id]);

  const fetchDataInmateRealtime = async () => {
    const { id } = props;
    try {
      const res = await apiVisitorRealtimeLogList({ device_id: id });
      console.log(res, 'data dataVisitorLog');
      setState((prevState) => ({
        ...prevState,
        dataVisitorLog: res,
      }));
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

  const fetchDeviceDetail = async () => {
    const { id } = props;
    try {
      const res = await apiDeviceDetail(id);
      // const res = await apiDeviceDetail(id);
      console.log(res, 'Perangkat detail');
      // console.log(state.listViewCamera, 'listViewCamera');

      setState((prevState) => ({
        ...prevState,
        deviceDetail: res,
        viewListData: [
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ],
        listViewCamera: [
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ],
      }));
      sendRequest('startLiveView', {
        listViewCameraData: JSON.stringify([
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ]),
      });
      sendRequestFR('startFR', {
        listViewCameraData: JSON.stringify([
          {
            IpAddress: res.ip_address,
            urlRTSP: res.url_rtsp,
            deviceName: res.nama_kamera,
            deviceId: res.kamera_id,
          },
        ]),
      });
      // sendRequest('startLiveView', {
      //   listViewCameraData: JSON.stringify(state.listViewCamera),
      // });
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

  const componentDidUpdate = (prevProps) => {
    if (props.id !== prevProps.id) {
      fetchDataInmateRealtime();
      fetchDeviceDetail();
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(
      dateObj,
    );
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString('id-ID', { hour12: false });
    return `${day} ${month} ${year} ${time}`;
  };

  const sendRequest = (method, params) => {
    client.current.send(JSON.stringify({ method: method, params: params }));
  };
  const sendRequestFR = (method, params) => {
    clientFR.current.send(JSON.stringify({ method: method, params: params }));
  };

  const destroyCamera = (data) => {
    console.log('destroy streaming');
    playerRef.current.stop();
    setState((prevState) => ({
      ...prevState,
      cameraplayer: null,
    }));
  };

  const reset = () => {
    setState((prevState) => ({
      ...prevState,
      selectOptionGroup: null,
      viewListData: [],
      listViewCamera: [],
    }));
  };

  const pause = () => {
    playerRef.current.stop();
  };

  const renderStream1 = (obj, index) => {
    console.log('render stream 1', obj);
    var urlStream = state.baseUrl + obj.IpAddress + state.extenstion;
    console.log(urlStream);
    return (
      <div className="w-full  p-1" key={index}>
        {client.current.readyState !== 1 ? (
          <h1 className="font-semibold text-xl text-red-500 mb-2 animate-pulse">
            Error connection
          </h1>
        ) : (
          ''
        )}
        {/* {client.current.readyState !== 1 && client.current.readyState !== 3 ? (
          <h1 className="font-semibold text-xl text-red-500 mb-2 animate-pulse">
            Error connection
          </h1>
        ) : client.current.readyState === 3 ? (
          <h1 className="font-semibold text-xl  mb-2">Loading...</h1>
        ) : (
          ''
        )} */}

        <div className="bg-black p-1">
          <div className="relative">
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url="http://100.81.142.71:5000/stream/100.81.142.71_.m3u8"
                width="100%"
                height="100%"
                playing={true}
                playsinline={true}
                controls={true}
              />
            </div>
            {/* <div className="absolute left-4 right-4 top-2">
              <span className="text-white text-lg font-semibold">
                {obj.deviceName}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const { deviceDetail, dataVisitorLog } = state;
  const unrecognizedRows = dataVisitorLog.filter(
    (row) => row.visitor_name === 'unrecognized',
  );
  const faceDetectionRows = dataVisitorLog.filter(
    (row) => row.visitor_name !== 'unrecognized',
  );

  return (
    <>
      <h1 className="font-semibold ">
        {deviceDetail && deviceDetail.nama_kamera} -{' '}
        {deviceDetail.nama_ruangan_otmil && deviceDetail.nama_ruangan_otmil}
        {deviceDetail.nama_ruangan_lemasmil &&
          deviceDetail.nama_ruangan_lemasmil}
        - {deviceDetail.nama_lokasi_otmil && deviceDetail.nama_lokasi_otmil}
        {deviceDetail.nama_lokasi_lemasmil && deviceDetail.nama_lokasi_lemasmil}
      </h1>

      <div className="flex gap-4 h-[52vh] justify-between">
        <div className="w-[80%] h-full">
          {state.listViewCamera.map((obj, index) => (
            <div key={index}>{renderStream1(obj, index)}</div>
          ))}
        </div>
        <div className="w-[20%] h-full ml-auto">
          <div className="w-full h-[93.3%]">
            <div className="container">
              <p className="font-semibold text-center">
                Kemiripan Terdeteksi: {faceDetectionRows.length}
              </p>
            </div>
            <div className="h-full overflow-y-auto">
              <table className="w-full">
                <tbody>
                  {faceDetectionRows?.map((row, index) => (
                    <tr key={index} className="flex items-center">
                      <td className="w-1/4 flex items-center">
                        <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.image}`}
                          alt="Person"
                          className="w-16 h-16 rounded-5 mr-2"
                        />
                        {/* <img
                          src={`https://dev.transforme.co.id/siram_admin_api${row.face_pics}`}
                          alt="Person"
                          className="w-16 h-16 rounded-5"
                        /> */}
                      </td>
                      <td className="w-3/4 flex flex-col items-end">
                        <p className="text-xs font-semibold">
                          {row.nama_wbp ? row.nama_wbp : row.keterangan}
                        </p>
                        {/* <p className="text-xs">
                          {row.gender === true
                            ? 'Pria'
                            : row.gender === false
                            ? 'Wanita'
                            : row.gender === null || row.gender === ''
                            ? 'Unknown'
                            : null}{' '}
                          - {row.age} Years Old
                        </p> */}
                        <p className="text-xs">{row.nationality}</p>
                        <p className="text-xs">
                          {formatTimestamp(row.timestamp)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex w-full h-[20vh] gap-5 mt-12 justify-between">
        <div className="w-[65%] h-full">
          <div className="w-full">
            <p className="font-semibold pl-5 pt-10">
              Kemiripan Terdeteksi: {faceDetectionRows.length}
            </p>
            <div className="pt-1">
              <div className="flex overflow-x-auto">
                <div className="flex space-x-4">
                  {faceDetectionRows?.map((row, index) => (
                    <div key={index} className="flex-shrink-0">
                      <img
                        src={`https://dev.transforme.co.id/siram_admin_api${row.image}`}
                        alt="Person"
                        className="w-20 h-20 rounded-5 flex-wrap"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[35%] h-full">
          <p className="font-semibold text-sm pl-5 pt-10">Informasi Kamera</p>
          <table className="w-full">
            <tbody>
              <tr className="flex justify-between">
                <td>
                  <span className="text-xs">IP Kamera</span>
                </td>
                <td>
                  <span className="text-xs">
                    {deviceDetail && deviceDetail.IpAddress}
                  </span>
                </td>
              </tr>
              <tr className="flex justify-between">
                <td>
                  <span className="text-xs">Nama Kamera</span>
                </td>
                <td>
                  <span className="text-xs">
                    {deviceDetail && deviceDetail.device_name} -{' '}
                    {deviceDetail && deviceDetail.location}
                  </span>
                </td>
              </tr>
              <tr className="flex justify-between">
                <td>
                  <span className="text-xs">Total Deteksi Hari Ini</span>
                </td>
                <td>
                  <span className="text-xs">20266</span>
                </td>
              </tr>
              <tr className="flex justify-between">
                <td>
                  <span className="text-xs">Nomor Seri Analitik</span>
                </td>
                <td>
                  <span className="text-xs">
                    {deviceDetail && deviceDetail.dm_name}
                  </span>
                </td>
              </tr>
              <tr className="flex justify-between">
                <td>
                  <span className="text-xs">AI SNAP Record SIMILAR TO</span>
                </td>
                <td>
                  <span className="text-xs">122</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default DataCamera;
