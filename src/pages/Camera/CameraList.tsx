import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SlOptionsVertical } from "react-icons/sl";
import { apiBuilding, apiUpdateKamera } from "../../services/api";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { RiCameraOffLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import ReactPlayer from "react-player";
import { RiErrorWarningFill } from "react-icons/ri";
import { HiRefresh } from "react-icons/hi";
import ToolsTip from "../../components/ToolsTip";
import MenuItemComponent from "../../components/MenuItemCameraSave";
import { Alerts } from "./AlertCamera";
import { AddKamera } from "../Device/Kamera/ModalAddKamera";

interface BuildingRecord {
	data?: {
		records?: {
			gedung: any[]; // Ganti any dengan tipe yang sesuai untuk array gedung
		};
	};
}

const CameraList = () => {
	const navigate = useNavigate();
	const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
	const [buildings, setBuilding] = useState<BuildingRecord>();
	const [editData, setEditData] = useState(null);
	const startLiveViewCalled = useRef(false);
	const [selectedRoom, setSelectedRoom] = useState("");
	const [selectedBuilding, setSelectedBuilding] = useState("");
	const [selectedFloor, setSelectedFloor] = useState("");
	const [columns, setColumns] = useState(2);
	const [modalEditOpen, setModalEditOpen] = useState(false);
	const [rows, setRows] = useState(3);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPageCamOnline, setCurrentPageCamOnline] = useState(1);
	const [menuIndex, setMenuIndex] = useState<number | null>(null);
	const [hovering, setHovering] = useState(false);
	const camerasPerPage = columns * rows;

	const webSocketFirst = "192.168.1.111:5000";
	const webSocketSecond = "10.34.7.43:5000";
	interface messageCam {
		kamera_id: any;
		status_kamera: any;
	}

	const [messageCamera, setMessageCamera] = useState();

	useEffect(() => {
		fetchData();
	}, []);

	const handleRefreshClick = () => {
		fetchData();
	};

	const handleIconClick = (index: number) => {
		setMenuIndex(index === menuIndex ? null : index);
	};

	const handleMouseEnter = () => {
		setHovering(true);
	};

	const handleMouseLeave = () => {
		setHovering(false);
		setMenuIndex(null);
	};

	const handleEditClick = (item: Item) => {
		setEditData(item);
		setModalEditOpen(true);
	};
	const handleCloseEditModal = () => {
		setModalEditOpen(false);
	};
	let getToken: any = localStorage.getItem("token");
	const token = JSON.parse(getToken);

	let fetchData = async () => {
		try {
			let dataLocal = localStorage.getItem("dataUser");
			let dataUser = JSON.parse(dataLocal!);
			dataUser = {
				lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
				lokasi_otmil_id: dataUser.lokasi_otmil_id,
				// nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
				// nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
			};

			const response = await apiBuilding(dataUser, token?.token);

			if (response.data.status === "OK") {
				setBuilding(response);
			} else {
				throw new Error(response.data.message);
			}
		} catch (e: any) {
			console.log("error", e);
			// if (e.response.status === 403) {
			//   navigate('/', {
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
	// useEffect(() => {
	// 	if (buildings) {
	// 		console.log("buildings changed, sending request");
	// 		sendRequestOnce();
	// 	}
	// }, [buildings]);

	useEffect(() => {
		if (buildings && !startLiveViewCalled.current) {
			console.log("buildings changed, sending request");
			sendRequestOnce();
			startLiveViewCalled.current = true;
		}
	}, [buildings]);
	const errorTimeoutRef: any = useRef(null);
	const client = useRef(new W3CWebSocket(`ws://${webSocketFirst}`));
	const [receivedObjects, setReceivedObjects] = useState([]);

	useEffect(() => {
		// Initialize WebSocket connection
		client.current = new WebSocket(`ws://${webSocketFirst}`);

		client.current.onopen = () => {
			setIsWebSocketConnected(true);
			console.log("WebSocket Client Connected");
		};
		client.current.onmessage = (message: any) => {
			const data = JSON.parse(message.data);

			setReceivedObjects((prevObjects) => [...prevObjects, data]);

			setMessageCamera(data);
		};
		return () => {
			setIsWebSocketConnected(false);
			console.log("WebSocket Client DISConnected");
			client.current.close(); // Close WebSocket connection when component unmounts
		};
	}, []);

	const sendRequest = (method: any, params: any) => {
		if (isWebSocketConnected) {
			client.current.send(
				JSON.stringify({ method: method, params: params })
			);
		} else {
			console.log("WebSocket connection is not yet established.");
		}
	};
	// const sendRequest = (method, params) => {
	//   client.current.send(JSON.stringify({ method: method, params: params }));
	// };

	const sendRequestOnce = () => {
		let onlineCameras = buildings?.data?.records?.gedung.flatMap(
			(gedung: any) =>
				gedung.lantai.flatMap((lantai: any) =>
					lantai.ruangan.flatMap((ruangan: any) => ruangan.kamera)
				)
		);

		if (onlineCameras && onlineCameras.length > 0) {
			onlineCameras.forEach((camera) => {
				// Panggil sendRequest untuk setiap kamera online
				console.log("Sending request for camera:", camera);
				sendRequest("startLiveView", {
					listViewCameraData: [
						{
							IpAddress: camera?.ip_address,
							urlRTSP: camera?.url_rtsp,
							deviceName: camera?.nama_kamera,
							deviceId: camera?.kamera_id,
							token: token?.token,
							ruangan_otmil_id: camera?.ruangan_otmil_id,
							nama_ruangan_otmil: camera?.nama_ruangan_otmil,
							merk: camera?.merk,
							model: camera?.model,
							is_play: camera?.is_play,
						},
					],
				});
			});
		} else {
			console.log("Tidak ada kamera online");
		}
	};

	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: "#s-gedung",
					popover: {
						title: "GEDUNG",
						description: "Pilih gedung yang diinginkan",
					},
				},
				{
					element: "#s-lantai",
					popover: {
						title: "LANTAI",
						description: "Pilih lantai yang diinginkan",
					},
				},
				{
					element: "#s-ruangan",
					popover: {
						title: "RUANGAN",
						description: "Pilih ruangan yang diinginkan",
					},
				},
			],
		});

		driverObj.drive();
	};

	const handleSubmitEdit = async (params: any) => {
		console.log(params, "edit");
		try {
			const responseEdit = await apiUpdateKamera(params, token?.token);
			if (responseEdit.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil mengubah data",
				});
				setModalEditOpen(false);
				fetchData();
			} else if (responseEdit.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal mengubah data",
				});
			} else {
				throw new Error(responseEdit.data.message);
			}
		} catch (e: any) {
			if (e.response.status === 403) {
				navigate("/", {
					state: { forceLogout: true, lastPage: location.pathname },
				});
			}
			Alerts.fire({
				icon: e.response.status === 403 ? "warning" : "error",
				title: e.response.status === 403 ? Error403Message : e.message,
			});
		}
	};

	const handleUpdateIsPlay = async (kameraId: any, isPlay: any) => {
		try {
			const params = { kamera_id: kameraId, is_play: isPlay };
			const responseEdit = await apiUpdateKamera(params, token?.token);
			if (responseEdit.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil mengubah status kamera",
				});
				fetchData();
			} else if (responseEdit.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal mengubah status kamera",
				});
			} else {
				throw new Error(responseEdit.data.message);
			}
		} catch (e: any) {
			if (e.response.status === 403) {
				navigate("/", {
					state: { forceLogout: true, lastPage: location.pathname },
				});
			}
			Alerts.fire({
				icon: e.response.status === 403 ? "warning" : "error",
				title: e.response.status === 403 ? Error403Message : e.message,
			});
		}
	};

	// handle select gedung and other
	const handleSelectBuilding = (e: any) => {
		const selectedBuildingId = e.target.value;
		setSelectedBuilding(selectedBuildingId);
		setSelectedFloor("");
		setSelectedRoom("");
	};

	const handleSelectFloor = (e: any) => {
		const selectedFloorId = e.target.value;
		setSelectedFloor(selectedFloorId);
		setSelectedRoom(""); // Reset selected room when floor changes
	};
	const handleClickRoom = (roomId: any) => {
		console.log("id", roomId);
		setSelectedRoom(roomId);
		setCurrentPage(1);
	};
	const handleLayoutChange = (columns: number, rows: number) => {
		setColumns(columns);
		setRows(rows);
		setCurrentPage(1);
	};

	// pagination
	const indexOfLastCamera = currentPage * camerasPerPage;
	const indexOfFirstCamera = indexOfLastCamera - camerasPerPage;

	const indexOfLastCameraOnline = currentPageCamOnline * camerasPerPage;
	const indexOfFirstCameraOnline = indexOfLastCameraOnline - camerasPerPage;

	const totalCameras = buildings?.data?.records?.gedung.flatMap(
		(gedung: any) =>
			gedung.lantai.flatMap((lantai: any) =>
				lantai.ruangan
					.filter(
						(ruangan: any) =>
							ruangan.ruangan_otmil_id === selectedRoom
					)
					.flatMap((ruangan: any) => ruangan.kamera)
			)
	);

	const totalCamerasOnline = buildings?.data?.records?.gedung.flatMap(
		(gedung: any) =>
			gedung.lantai.flatMap((lantai: any) =>
				lantai.ruangan.flatMap((ruangan: any) => ruangan.kamera)
			)
	);
	if (!totalCameras || !totalCamerasOnline) {
		return null;
	}
	const currentCameras = totalCameras.slice(
		indexOfFirstCamera,
		indexOfLastCamera
	);
	const currentCamerasOnline = totalCamerasOnline.slice(
		indexOfFirstCameraOnline,
		indexOfLastCameraOnline
	);

	const totalPages = Math.ceil(totalCameras.length / camerasPerPage);
	const totalPagesCameraOnline = Math.ceil(
		totalCamerasOnline.length / camerasPerPage
	);

	const renderPagination = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			// pageNumbers.push(i);
			console.log("push", pageNumbers.push(i));
		}
		return pageNumbers;
	};
	const renderPaginationCameraOnline = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPagesCameraOnline; i++) {
			// pageNumbers.push(i);
			console.log("push", pageNumbers.push(i));
		}
		return pageNumbers;
	};
	const handlePageClick = (pageNumber: any) => {
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
			currentPage - Math.floor(maxPageNumbersToShow / 2)
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

	const { startPage, endPage } = getPageNumbers();

	const renderThumb = (cam: any) => {
		const urlStream = `http://${webSocketFirst}/stream/${cam.ip_address}_.m3u8`;
		return (
			<ReactPlayer
				url={urlStream}
				playing={true}
				height="100%"
				width="100%"
				muted
				// onBuffer={() => setLoading(true)}
				// onBufferEnd={() => setLoading(false)}
			/>
		);
	};

	const renderCameraList = () => {
		const selectedRoomData = buildings?.data?.records?.gedung.flatMap(
			(gedung) =>
				gedung.lantai.flatMap((lantai: any) =>
					lantai.ruangan
						.filter(
							(ruangan: any) =>
								ruangan.ruangan_otmil_id === selectedRoom
						)
						.flatMap((ruangan: any) => ruangan.kamera)
				)
		);

		if (!selectedRoomData || selectedRoomData.length === 0) {
			return (
				<div className="w-full flex justify-center items-center bg-graydark h-5/6">
					<h1 className="font-semibold text-lg">
						Data Kamera kosong
					</h1>
				</div>
			);
		}

		return (
			<div
				style={{
					backgroundColor: "#333a48",
					height: "90%",
					maxHeight: "90vh",
					overflowY: "scroll",
				}}
			>
				<div className="flex flex-col justify-between p-5">
					{selectedRoom && (
						<div
							className={`grid ${
								columns === 1 && rows === 1
									? "grid-cols-1 grid-rows-1"
									: columns === 2 && rows === 2
									? "grid-cols-2 grid-rows-2"
									: columns === 2 && rows === 3
									? "grid-cols-3 grid-rows-2"
									: columns === 2 && rows === 4
									? "grid-cols-4 grid-rows-2 h-[80vh]"
									: "grid-cols-1 grid-rows-1"
							} gap-4 justify-center w-full`}
						>
							{newArrayPage.map((camera) => (
								<div
									key={camera.kamera_id}
									className={`rounded-sm border bg-meta-4-dark py-2 px-2 shadow-default backdrop-blur-sm relative ${
										columns && rows === 1 && " h-[28rem]"
									} hover:bg-slate-700`}
								>
									<Link
										to={camera.nama_kamera}
										state={camera?.kamera_id}
										className="block w-full h-full rounded-lg overflow-hidden relative"
									>
										{/* header */}
										<div className=" flex h-full w-full items-center justify-center rounded-t-lg bg-meta-4 text-white relative">
											{camera.status_kamera ===
											"online" ? (
												isWebSocketConnected ? (
													renderThumb(camera)
												) : (
													<RiErrorWarningFill
														className={`${
															rows === 4
																? "w-2/5 h-2/5"
																: "w-3/5 h-3/5"
														} text-white`}
													/>
												)
											) : (
												<RiCameraOffLine
													className={`${
														rows === 4
															? "w-2/5 h-2/5"
															: "w-3/5 h-3/5"
													} text-white`}
												/>
											)}
											{/* {camera.status_kamera === 'online' ? (
                        renderThumb(camera)
                      ) : (
                        <RiCameraOffLine
                          className={`${rows === 4 ? 'w-2/5 h-2/5' : 'w-3/5 h-3/5'} text-white`}
                        />
                      )} */}
										</div>
										{/* footer kamera */}

										<div className="absolute top-1 right-2 flex items-center">
											{camera.status_kamera ===
											"online" ? (
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
												className={`${
													(rows === 3 && "text-xs") ||
													(rows === 4 && "text-xs")
												} text-center font-bold text-red-50`}
											>
												{camera.nama_kamera} (
												{getRoomLocationCamOnline(
													camera.ruangan_otmil_id
												)}
												)
											</h4>
										</div>
									</Link>
								</div>
							))}
						</div>
					)}
					<div className="mt-4 flex justify-end">
						{currentPage > 1 && (
							<button
								onClick={handlePrevPage}
								className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
							>
								Previous
							</button>
						)}
						{renderPagination()
							.filter(
								(page) => page >= startPage && page <= endPage
							)
							.map((page) => (
								<button
									key={page}
									onClick={() => handlePageClick(page)}
									className={`mx-1 px-3 py-1 rounded ${
										currentPage === page
											? "bg-blue-500 text-white"
											: "bg-gray-200 text-gray-700"
									}`}
								>
									{page}
								</button>
							))}
						{currentPage < totalPages && (
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

	const dataFromMessage = receivedObjects.map((item: any) => item.massage);

	// Reverse the array to prioritize the last occurrence of duplicates
	const reversedArray = [...dataFromMessage].reverse();

	const uniqueArray = reversedArray.filter(
		(obj, index, self) =>
			index === self.findIndex((t) => t?.kamera_id === obj?.kamera_id)
	);
	const uniqueArrayPage = reversedArray.filter(
		(obj, index, self) =>
			index === self.findIndex((t) => t?.kamera_id === obj?.kamera_id)
	);

	uniqueArray.reverse();
	uniqueArrayPage.reverse();

	const newArray = uniqueArray.filter((item) =>
		currentCamerasOnline
			.map((item2) => item2?.kamera_id)
			.includes(item?.kamera_id)
	);

	console.log(newArray, "newArray");
	const newArrayPage = uniqueArrayPage.filter((item) =>
		currentCameras
			.map((item2) => item2?.kamera_id)
			.includes(item?.kamera_id)
	);

	const renderCameraOnlineList = () => {
		const onlineCamera = buildings?.data?.records?.gedung.flatMap(
			(gedung: any) =>
				gedung.lantai.flatMap((lantai: any) =>
					lantai.ruangan
						.flatMap((ruangan: any) => ruangan.kamera)
						.filter((kamera: any) => kamera.kamera_id)
				)
		);
		if (onlineCamera.length === 0) {
			return (
				<div className="flex justify-center items-center bg-graydark w-11/12 h-5/6">
					<h1 className="font-semibold text-lg">
						Tidak ada kamera yang aktif
					</h1>
				</div>
			);
		}

		return (
			<div
				style={{
					backgroundColor: "#333a48",
					height: "90%",
					maxHeight: "90vh",
					overflowY: "scroll",
				}}
			>
				<div className="flex flex-col justify-between p-5">
					{onlineCamera && (
						<div
							className={`grid ${
								columns === 1 && rows === 1
									? "grid-cols-1 grid-rows-1"
									: columns === 2 && rows === 2
									? "grid-cols-2 grid-rows-2"
									: columns === 2 && rows === 3
									? "grid-cols-3 grid-rows-2"
									: columns === 2 && rows === 4
									? "grid-cols-4 grid-rows-2 h-[80vh]"
									: "grid-cols-1 grid-rows-1"
							} gap-4 justify-center w-full`}
						>
							{/* {currentCamerasOnline
                .filter((item) => receivedObjects.includes(item?.kamera_id))
                .map((obj) => console.log(obj, 'hasil map'))} */}
							{newArray.map((camera, index) => (
								<div
									key={camera.kamera_id}
									className={`rounded-sm border bg-meta-4-dark py-2 px-2 shadow-default backdrop-blur-sm relative ${
										columns && rows === 1 && " h-[28rem]"
									} hover:bg-slate-700 group`}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								>
									<Link
										to={camera.nama_kamera}
										state={camera?.kamera_id}
										className="block w-full h-full rounded-lg overflow-hidden relative"
									>
										{/* header */}
										<div className=" flex h-full w-full items-center justify-center rounded-t-lg bg-meta-4 text-white relative">
											{camera.status_kamera ===
											"online" ? (
												isWebSocketConnected ? (
													renderThumb(camera)
												) : (
													<RiErrorWarningFill
														className={`${
															rows === 4
																? "w-2/5 h-2/5"
																: "w-3/5 h-3/5"
														} text-white`}
													/>
												)
											) : (
												<RiCameraOffLine
													className={`${
														rows === 4
															? "w-2/5 h-2/5"
															: "w-3/5 h-3/5"
													} text-white`}
												/>
											)}
										</div>
										{/* footer kamera */}

										<div className="absolute top-1 right-2 flex items-center justify-between w-full px-4">
											{camera.status_kamera ===
											"online" ? (
												<div className="flex items-center">
													<div className="w-2 h-2 rounded-full bg-green-500 mr-2 mt-1 animate-pulse"></div>
													<h5 className="text-green-500 text-center mt-1">
														Online
													</h5>
												</div>
											) : (
												<div className="flex items-center">
													<h5 className="text-red-500 text-center mt-1">
														Offline
													</h5>
												</div>
											)}

											<div
												className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handleIconClick(index);
													console.log("test1", index);
												}}
											>
												<SlOptionsVertical
													size={19}
													className="text-slate-400 f0nt-bold "
												/>
											</div>
										</div>

										{menuIndex === index && hovering && (
											<MenuItemComponent
												onEdit={() =>
													handleEditClick(camera)
												}
												onDelete={() =>
													console.log(camera)
												}
												onDetail={() =>
													console.log(camera)
												}
												onClose={() =>
													setMenuIndex(null)
												}
												onTogglePlay={
													handleUpdateIsPlay
												}
												data={camera}
											/>
										)}
										<div className="absolute bottom-2 left-2 text-white">
											<h4
												className={`${
													(rows === 3 && "text-xs") ||
													(rows === 4 && "text-xs")
												} text-center font-bold text-red-50`}
											>
												{camera.nama_kamera} (
												{getRoomLocationCamOnline(
													camera.ruangan_otmil_id
												)}
												)
											</h4>
										</div>
									</Link>
								</div>
							))}
						</div>
					)}

					{/* pagination */}
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
							.filter(
								(page) => page >= startPage && page <= endPage
							)
							.map((page) => (
								<button
									key={page}
									onClick={() => handlePageClick(page)}
									className={`mx-1 px-3 py-1 rounded ${
										currentPageCamOnline === page
											? "bg-blue-500 text-white"
											: "bg-gray-200 text-gray-700"
									}`}
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

	const getRoomLocationCamOnline = (id: any) => {
		let location = "";
		buildings?.data?.records?.gedung.forEach((gedung: any) => {
			gedung.lantai.forEach((lantai: any) => {
				const foundRoom = lantai.ruangan.find(
					(ruangan: any) => ruangan.ruangan_otmil_id === id
				);
				if (foundRoom) {
					location = `${gedung.nama_gedung_otmil} - ${lantai.nama_lantai} - ${foundRoom.nama_ruangan_otmil}`;
				}
			});
		});

		return location;
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
					<ToolsTip>
						<HiRefresh
							size={33}
							className="mr-3 transition-all duration-300 hover:text-slate-100 transform-gpu hover:rotate-180"
							onClick={handleRefreshClick}
						/>
					</ToolsTip>
					<>
						<select
							id="layoutSelect"
							className="p-2  border rounded w-22  bg-meta-4 font-semibold"
							value={`${columns}x${rows}`}
							onChange={(e) => {
								const [cols, rows] = e.target.value
									.split("x")
									.map(Number);
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
						<>
							{buildings?.data?.records?.gedung?.find(
								(building) =>
									building.gedung_otmil_id ===
									selectedBuilding
							)?.lantai.length > 0 && (
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
											(building) =>
												building.gedung_otmil_id ===
												selectedBuilding
										)
										?.lantai.map((floor: any) => (
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
							{buildings?.data?.records?.gedung
								?.find(
									(building) =>
										building.gedung_otmil_id ===
										selectedBuilding
								)
								?.lantai.find(
									(floor: any) =>
										floor.lantai_otmil_id === selectedFloor
								)?.ruangan.length > 0 && (
								<select
									value={selectedRoom}
									onChange={(e) =>
										setSelectedRoom(e.target.value)
									}
									className="p-2 border rounded w-36 bg-meta-4 font-semibold"
								>
									<option disabled value="">
										Pilih Ruangan
									</option>
									{buildings?.data?.records?.gedung
										?.find(
											(building) =>
												building.gedung_otmil_id ===
												selectedBuilding
										)
										?.lantai.find(
											(floor: any) =>
												floor.lantai_otmil_id ===
												selectedFloor
										)
										?.ruangan.map((room: any) => (
											<option
												key={room.ruangan_otmil_id}
												value={room.ruangan_otmil_id}
												onClick={() =>
													handleClickRoom(
														room.ruangan_otmil_id
													)
												}
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
					<>
						{selectedRoom
							? renderCameraList()
							: renderCameraOnlineList()}
					</>
				</div>
			</div>

			{modalEditOpen && (
				<AddKamera
					closeModal={handleCloseEditModal}
					onSubmit={handleSubmitEdit}
					defaultValue={editData}
					isEdit={true}
				/>
			)}
		</>
	);
};

export default CameraList;
