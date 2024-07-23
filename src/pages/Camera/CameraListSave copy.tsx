import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { apiBuilding, apiReadKameraTersimpan } from '../../services/api';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Link } from 'react-router-dom';
import { RiCameraOffLine, RiErrorWarningFill } from 'react-icons/ri';
import ToolsTip from '../../components/ToolsTip';
import { HiRefresh } from 'react-icons/hi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ReactPlayer from 'react-player';

interface Building {
  id: string;
  name: string;
}
const CameraListSave = () => {
  const [data, setData] = useState<any>([]);
  let getToken = localStorage.getItem('token');
  const token = JSON.parse(getToken);
  console.log(token, 'token');
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [buildings, setBuilding] = useState<Building[]>([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCamOnline, setCurrentPageCamOnline] = useState(1);
  const [messageCamera, setMessageCamera] = useState();
  const [receivedObjects, setReceivedObjects] = useState([]);

  const id = useParams().id;
  const camerasPerPage = columns * rows;

  const fetchData = async (id: any) => {
    const params = id ? { id } : {};
    console.log('ini params', params);
    console.log(params, 'params');
    try {
      const response = await apiReadKameraTersimpan(params, token?.token);
      setData(response.data.records);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataGedung = async () => {
    try {
      let dataLocal = localStorage.getItem('dataUser');
      console.log(dataLocal, 'data local');
      let dataUser = JSON.parse(dataLocal!);
      dataUser = {
        lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
        lokasi_otmil_id: dataUser.lokasi_otmil_id,
        // nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
        // nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
      };
      const response = await apiBuilding(dataUser, token?.token);
      console.log(response, 'response');
      if (response.data.status === 'OK') {
        setBuilding(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = (method, params) => {
    if (isWebSocketConnected) {
      client.current.send(JSON.stringify({ method: method, params: params }));
    } else {
      console.log('WebSocket connection is not yet established.');
    }
  };

  const sendRequestOnce = () => {
    let onlineCameras = buildings?.records?.gedung.flatMap((gedung: any) =>
      gedung.lantai.flatMap((lantai: any) =>
        lantai.ruangan.flatMap((ruangan: any) => ruangan.kamera),
      ),
    );

    if (onlineCameras && onlineCameras.length > 0) {
      onlineCameras.forEach((camera) => {
        // Panggil sendRequest untuk setiap kamera online
        sendRequest('startLiveView', {
          listViewCameraData: [
            {
              IpAddress: camera?.ip_address,
              urlRTSP: camera?.url_rtsp,
              deviceName: camera?.nama_kamera,
              deviceId: camera?.kamera_id,
              token: token?.token,
              ruangan_otmil_id: camera?.ruangan_otmil_id,
            },
          ],
        });
      });
    } else {
      console.log('Tidak ada kamera online');
    }
  };
  useEffect(() => {
    fetchDataGedung();
  }, []);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  useEffect(() => {
    if (buildings) {
      sendRequestOnce();
    }
  }, [buildings]);

  const client = useRef(new W3CWebSocket('ws://192.168.1.111:5000'));
  useEffect(() => {
    // Initialize WebSocket connection
    client.current = new WebSocket('ws://192.168.1.111:5000');

    client.current.onopen = () => {
      setIsWebSocketConnected(true);
      console.log('WebSocket Client Connected');
    };
    client.current.onmessage = (message: any) => {
      const data = JSON.parse(message.data);

      setReceivedObjects((prevObjects) => [...prevObjects, data]);

      setMessageCamera(data);
      // if (data.type === 'error') {
      //   // Tangkap pesan error dan tampilkan kepada pengguna
      //   clearTimeout(errorTimeoutRef.current); // Hapus timeout sebelumnya (jika ada)
      //   errorTimeoutRef.current = setTimeout(() => {
      //     setErrorCam(true);
      //     console.log(data, 'ini data error');
      //     console.log('Error from server camera:', data.message);
      //   }, 1500); // Setelah 2 detik, tampilkan pesan error
      // }
      // if (data.type === 'info') {
      //   clearTimeout(errorTimeoutRef.current); // Hapus timeout jika mendapatkan pesan info
      //   setErrorCam(false);
      //   console.log(data, 'ini data berhasil');
      // }
    };
    // client.current.onmessage = (message) => {
    //   const data = JSON.parse(message.data);
    //   if (data.type === 'info') {
    //     // Tangkap pesan error dan tampilkan kepada pengguna
    //     console.log(data, 'ini data info');

    //     console.log('Error from server camera:', data.message);
    //   }
    // };
    // Cleanup function
    return () => {
      setIsWebSocketConnected(false);
      console.log('WebSocket Client DISConnected');
      client.current.close(); // Close WebSocket connection when component unmounts
    };
  }, []);

  const handleLayoutChange = (columns: any, rows: any) => {
    setColumns(columns);
    setRows(rows);
    setCurrentPage(1);
  };

  const handleSelectBuilding = (e) => {
    const selectedBuildingId = e.target.value;
    setSelectedBuilding(selectedBuildingId);
    setSelectedFloor(''); // Reset selected floor when building changes
    setSelectedRoom(''); // Reset selected room when building changes
  };
  const handleSelectFloor = (e) => {
    const selectedFloorId = e.target.value;
    setSelectedFloor(selectedFloorId);
    setSelectedRoom(''); // Reset selected room when floor changes
  };
  const handleClickRoom = (roomId) => {
    console.log('id', roomId);
    setSelectedRoom(roomId);
    setCurrentPage(1);
  };

  const test1 = receivedObjects.map((item) => item.massage);
  console.log(test1, 'test 11111111');

  const reversedArray = [...test1].reverse();

  const uniqueArray = reversedArray.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t?.kamera_id === obj?.kamera_id),
  );
  const uniqueArrayPage = reversedArray.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t?.kamera_id === obj?.kamera_id),
  );

  uniqueArray.reverse();
  uniqueArrayPage.reverse();

  const totalCamerasOnline = buildings?.records?.gedung.flatMap((gedung: any) =>
    gedung.lantai.flatMap((lantai: any) =>
      lantai.ruangan.flatMap((ruangan: any) => ruangan.kamera),
    ),
  );

  const filteredCameras = data.flatMap((grup) =>
    grup.kamera_tersimpan.reduce((acc, kamera) => {
      const foundCameras = totalCamerasOnline.filter(
        (camOnline) => camOnline.kamera_id === kamera.kamera_id,
      );
      return [...acc, ...foundCameras];
    }, []),
  );

  if (!filteredCameras) {
    return null;
  }

  const indexOfLastCamera = currentPage * camerasPerPage;
  const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;

  const totalCameras = data?.map((item: any) =>
    item.kamera_tersimpan?.map((c) => c.kamera),
  );

  const currentCameras = totalCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );
  const currentCamerasOnline = filteredCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera,
  );
  const newArray = uniqueArray.filter((item) =>
    currentCamerasOnline
      .map((item2) => item2?.kamera_id)
      .includes(item?.kamera_id),
  );
  const newArrayPage = uniqueArrayPage.filter((item) =>
    currentCameras.map((item2) => item2?.kamera_id).includes(item?.kamera_id),
  );
  const totalPages = Math.ceil(totalCameras.length / camerasPerPage);
  const totalPagesCameraOnline = Math.ceil(
    filteredCameras.length / camerasPerPage,
  );

  const handlePageClick = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
  };
  const getPageNumbers = () => {
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2),
    );
    let endPage = startPage + maxPageNumbersToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageNumbers();

  console.log(totalCameras, 'totalCameras');

  const renderPaginationCameraOnline = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPagesCameraOnline; i++) {
      // pageNumbers.push(i);
      console.log('push', pageNumbers.push(i));
    }
    return pageNumbers;
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
  const renderThumb = (cam: any) => {
    const urlStream = `http://192.168.100.111:5000/stream/${cam.ip_address}_.m3u8`;
    console.log(urlStream, 'url stream');
    return (
      <ReactPlayer
        url={urlStream}
        playing={true}
        height="100%"
        width="100%"
        muted
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
      />
    );
  };

  // console.log(buildings, 'buildings');
  const renderCameraOnlineList = () => {
    const onlineCamera = buildings?.records?.gedung.flatMap((gedung) =>
      gedung.lantai.flatMap((lantai) =>
        lantai.ruangan
          .flatMap((ruangan) => ruangan.kamera)
          .filter((kamera) => kamera.kamera_id),
      ),
    );
    console.log(onlineCamera, 'on cam');
    // if (onlineCamera.length === 0) {
    //   return (
    //     <div className="flex justify-center items-center bg-graydark w-11/12 h-5/6">
    //       <h1 className="font-semibold text-lg">Tidak ada kamera yang aktif</h1>
    //     </div>
    //   );
    // }

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
                        ? 'grid-cols-4 grid-rows-2 h-[80vh]'
                        : 'grid-cols-1 grid-rows-1'
              } gap-4 justify-center w-full`}
            >
              {/* {currentCamerasOnline
                .filter((item) => receivedObjects.includes(item?.kamera_id))
                .map((obj) => console.log(obj, 'hasil map'))} */}
              {newArray.map((camera) => (
                <div
                  key={camera.kamera_id}
                  className={`rounded-sm border bg-meta-4-dark py-2 px-2 shadow-default backdrop-blur-sm relative ${columns && rows === 1 && ' h-[28rem]'} hover:bg-slate-700`}
                >
                  <Link
                    to={camera.nama_kamera}
                    state={camera?.kamera_id}
                    className="block w-full h-full rounded-lg overflow-hidden relative"
                  >
                    {/* header */}
                    <div className=" flex h-full w-full items-center justify-center rounded-t-lg bg-meta-4 text-white relative">
                      {/* {camera.status_kamera === 'online' ? (
                        renderThumb(camera)
                      ) : (
                        <RiCameraOffLine
                          className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                        />
                      )} */}
                      {/* {camera.status_kamera === 'online' ? (
                        renderThumb(camera)
                      ) : client.current.readyState !== WebSocket.OPEN ? (
                        <RiErrorWarningFill
                          className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                        />
                      ) : (
                        <RiCameraOffLine
                          className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                        />
                      )} */}
                      {camera.status_kamera === 'online' ? (
                        isWebSocketConnected ? (
                          renderThumb(camera)
                        ) : (
                          <RiErrorWarningFill
                            className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                          />
                        )
                      ) : (
                        <RiCameraOffLine
                          className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                        />
                      )}
                    </div>
                    {/* footer kamera */}

                    <div className="absolute top-1 right-2 flex items-center">
                      {camera.status_kamera === 'online' ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1 animate-pulse"></div>
                          <h5 className="text-green-500 text-center mt-1">
                            Online
                          </h5>
                        </>
                      ) : (
                        <>
                          <h5 className="text-red-500 text-center mt-1">
                            Offline
                          </h5>
                        </>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 text-white">
                      <h4
                        className={`${(rows === 3 && 'text-xs') || (rows === 4 && 'text-xs')} text-center font-bold text-red-50`}
                      >
                        {camera.nama_kamera} (
                        {/* {getRoomLocationCamOnline(camera.ruangan_otmil_id)}) */}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-end">
            {currentPageCamOnline > 1 && (
              <button
                onClick={handlePrevPage}
                className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
              >
                Previous
              </button>
            )}
            {renderPaginationCameraOnline()
              .filter((page) => page >= startPage && page <= endPage)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`mx-1 px-3 py-1 rounded ${currentPageCamOnline === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {page}
                </button>
              ))}
            {currentPageCamOnline < totalPagesCameraOnline && (
              <button
                onClick={handleNextPage}
                className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full ml-1 flex gap-5  px-7 mt-4 items-center justify-between">
        <div className="flex items-center justify-between w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-white rounded-md px-4 py-2 text-white hover:bg-meta-4 hover:text-white transition duration-300 ease-in-out"
          >
            <IoMdArrowRoundBack /> Kembali
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <ToolsTip text="Refresh">
            <HiRefresh
              size={33}
              className="mr-3 transition-all duration-300 hover:text-slate-100 transform-gpu hover:rotate-180"
              // onClick={handleRefreshClick}
            />
          </ToolsTip>
          <>
            <select
              id="layoutSelect"
              className="p-2  border rounded w-22  bg-meta-4 font-semibold"
              value={`${columns}x${rows}`}
              onChange={(e) => {
                const [cols, rows] = e.target.value.split('x').map(Number);
                handleLayoutChange(cols, rows);
              }}
            >
              <option value="1x1">1x1</option>
              <option value="2x2">2x2</option>
              <option value="2x3">2x3</option>
              <option value="2x4">2x4</option>
            </select>
          </>
          <select
            value={selectedBuilding}
            onChange={handleSelectBuilding}
            className="p-2 border rounded w-36 bg-meta-4 font-semibold"
          >
            <option disabled value="">
              Pilih Gedung
            </option>
            {buildings?.records?.gedung?.map((building) => (
              <option
                key={building.gedung_otmil_id}
                value={building.gedung_otmil_id}
              >
                {building.nama_gedung_otmil}
              </option>
            ))}
          </select>

          {selectedBuilding && (
            <>
              {buildings?.records?.gedung?.find(
                (building) => building.gedung_otmil_id === selectedBuilding,
              )?.lantai.length > 0 && (
                <select
                  value={selectedFloor}
                  onChange={handleSelectFloor}
                  className="p-2 border rounded w-36 bg-meta-4 font-semibold"
                >
                  <option disabled value="">
                    Pilih Lantai
                  </option>
                  {buildings?.records?.gedung
                    ?.find(
                      (building) =>
                        building.gedung_otmil_id === selectedBuilding,
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
            </>
          )}

          {selectedFloor && (
            <>
              {buildings?.records?.gedung
                ?.find(
                  (building) => building.gedung_otmil_id === selectedBuilding,
                )
                ?.lantai.find(
                  (floor) => floor.lantai_otmil_id === selectedFloor,
                )?.ruangan.length > 0 && (
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="p-2 border rounded w-36 bg-meta-4 font-semibold"
                >
                  <option disabled value="">
                    Pilih Ruangan
                  </option>
                  {buildings?.records?.gedung
                    ?.find(
                      (building) =>
                        building.gedung_otmil_id === selectedBuilding,
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
            </>
          )}
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-5 min-h-sceen flex gap-4">
        <div className="w-full h-screen">
          <div className="py-4 pl-6 w-[95%] flex justify-between items-center"></div>
          <>{selectedRoom ? 'renderCameraList' : renderCameraOnlineList()}</>
        </div>
      </div>
    </>
  );
};

export default CameraListSave;
