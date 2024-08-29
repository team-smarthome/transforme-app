import React, { useContext, useEffect, useState } from "react";
import MapKomponen from "./Map";
import { FaShieldAlt } from "react-icons/fa";
import { BiChevronDown, BiRfid } from "react-icons/bi";
import { IoBatteryFullSharp, IoBatteryHalfSharp } from "react-icons/io5";
import { GoShield, GoShieldX } from "react-icons/go";
import { IoMdTabletPortrait } from "react-icons/io";
import { MdOutlineAdfScanner } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import PenggunaanTPPChart from "./Chart/grafikPenggunaanTPP";
import KetersediaanTPPChart from "./Chart/jumlahKetersediaanTPP";
import { Alert, Tooltip } from "antd";
import { Spin } from "antd";

// import { AppContext } from "../../utils/AppContext";
import { ApiDashboardPin } from "../../services/DashboardPinApi/dashboardApi";
import useAuthUserhook from "../../hooks/useAuthUserPinHook";
// import { notificationError } from "../../component/notification/toastNotification";
// import { useUnauthorizedHandler } from "../../utils/handleUnauthorized";

const DashboardPin = () => {
	const [active, setActive] = useState(false);
	const [loading, setLoading] = useState(true);
	const { authUser } = useAuthUserhook();
	const [record, setRecord] = useState(null);
	// const handleUnauthorized = useUnauthorizedHandler();
	const handleDropdown = () => {
		setActive(!active);
	};

	const handleDataDashboard = async () => {
		try {
			const { data } = await ApiDashboardPin(authUser?.token);
			if (data.status === 200) {
				setRecord(data.records);
			}
		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				// handleUnauthorized();
				Alert("Terjadi kesalahan pada server");
			}
			if (data.status === 500) {
				// notificationError("Terjadi kesalahan pada server");
				Alert("Terjadi kesalahan pada server");
			}
		}
	};

	useEffect(() => {
		handleDataDashboard().then(() => setLoading(false));
	}, []);

	return (
		<div className="h-full w-full ">
			{!loading ? (
				<div className="flex h-full w-full flex-col gap-10 justify-center bg-slate-900 items-center text-slate-800 z-1">
					<div className="flex h-full gap-2 w-full">
						{/* Col 1 */}
						<div className=" grid grid-cols-1 gap-2 w-[15rem]  ">
							<div className="bg-white px-4 py-3 flex gap-2 items-center justify-around  shadow-md">
								<FaShieldAlt
									size={80}
									className="text-red-500 "
								></FaShieldAlt>
								<div className="flex flex-col items-center ">
									<label className="text-2xl font-bold">
										{record?.section1?.totalTppActive}
									</label>
									<label className="text-md font-light">
										TPP Aktif
									</label>
								</div>
							</div>

							<div className="bg-white px-4 py-3 flex gap-2 items-center justify-around  shadow-md">
								<BiRfid
									size={80}
									className="text-blue-500 "
								></BiRfid>

								<div className="flex flex-col items-center ">
									<label className="text-2xl font-bold">
										{" "}
										{
											record?.section1
												?.totalHandheldScannerActive
										}
									</label>
									<label className="text-md font-light">
										Handheld Aktif
									</label>
								</div>
							</div>

							<div className="bg-white px-4 py-3 flex gap-2 items-center justify-around  shadow-md">
								<IoMdTabletPortrait
									size={80}
									className="text-teal-500 "
								></IoMdTabletPortrait>
								<div className="flex flex-col items-center ">
									<label className="text-2xl font-bold">
										{record?.section1?.totalTabletActive}
									</label>
									<label className="text-md font-light">
										Tablet Aktif
									</label>
								</div>
							</div>
						</div>

						{/* Col 2 */}
						<div className="grow flex flex-col gap-2 ">
							<div className="bg-white ">
								<div className=" relative flex justify-center items-center font-mono ">
									<span>Lokasi Penyimpanan</span>
									<button
										onClick={handleDropdown}
										className="absolute right-0 mr-2"
									>
										<BiChevronDown
											size={25}
											className={` duration-150 ${
												active
													? "rorate-0"
													: "-rotate-90"
											}`}
										></BiChevronDown>
									</button>
								</div>
								<div
									className={`flex justify-center items-center duration-150 ${
										active ? "max-h-20" : "max-h-0"
									}`}
								>
									<div
										className={`relative duration-150 ${
											active
												? "opacity-100 "
												: "opacity-0 "
										}`}
									>
										<div className="max-w-[600px] py-3 px-4 overflow-x-scroll space-x-10 whitespace-nowrap ">
											<BiRfid
												size={40}
												className="text-red-500 inline-block"
											/>
											<IoMdTabletPortrait
												size={40}
												className="text-blue-500 inline-block"
											/>
											<MdOutlineAdfScanner
												size={40}
												className="text-yellow-500 inline-block"
											/>
											<FaShieldAlt
												size={40}
												className="text-red-500 inline-block"
											/>
											<FaShieldAlt
												size={40}
												className="text-red-500 inline-block"
											/>
											<FaShieldAlt
												size={40}
												className="text-red-500 inline-block"
											/>
											<FaShieldAlt
												size={40}
												className="text-red-500 inline-block"
											/>
										</div>
										<div className="absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-white to-transparent"></div>
										<div className="absolute right-0 top-0 h-full w-5 bg-gradient-to-l from-white to-transparent"></div>
									</div>
								</div>
							</div>
							<div className="bg-white grow p-2 shadow-md">
								<MapKomponen></MapKomponen>
							</div>
						</div>

						{/* Col 3 */}
						<div className="flex flex-col gap-2 w-[15rem]  ">
							<div className="flex h-10 gap-2 bg-white justify-center items-center shadow-md">
								<IoMdNotificationsOutline
									size={20}
								></IoMdNotificationsOutline>
								<h1 className="text-lg font-mono">
									Notifikasi
								</h1>
							</div>
							<div className="h-[calc(100%-40px)] space-y-2 overflow-scroll  bg-white">
								<div className="pt-2 px-2 flex justify-center bg-white font-mono">
									<text className=" font-light">
										Tidak ada notfikasi
									</text>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-3  gap-2  w-full">
						<div className="flex flex-col gap-2">
							<div className="h-10 flex  items-center bg-white shadow-md">
								<h1 className="font-mono px-2">
									Grafik Penggunaan TPP Pertahun
								</h1>
							</div>
							<div className="h-[calc(100%-40px)] flex items-center justify-center bg-white shadow-md">
								<PenggunaanTPPChart
									data={record?.section2?.graphTppUsed}
								></PenggunaanTPPChart>
							</div>
						</div>
						<div className="flex flex-col gap-2 ">
							<div className="grid grid-cols-2 gap-2">
								<div className="bg-white h-20 py-1 flex gap-2 items-center justify-around  shadow-md">
									<BiRfid
										size={40}
										className="text-green-500 "
									></BiRfid>
									<div className="flex flex-col -space-y-2 items-center ">
										<label className="text-lg font-bold">
											001
										</label>
										<IoBatteryFullSharp
											size={40}
											className="text-green-500"
										></IoBatteryFullSharp>
									</div>
								</div>

								<div className="bg-white h-20 py-1 flex gap-2 items-center justify-around  shadow-md">
									<BiRfid
										size={40}
										className="text-red-500 "
									></BiRfid>
									<div className="flex flex-col -space-y-2 items-center ">
										<label className="text-lg font-bold">
											001
										</label>
										<IoBatteryHalfSharp
											size={40}
											className="text-red-500"
										></IoBatteryHalfSharp>
									</div>
								</div>

								<div className="bg-white h-20 py-1 flex gap-2 items-center justify-around  shadow-md">
									<GoShieldX
										size={40}
										className="text-red-500 "
									></GoShieldX>
									<div className="flex flex-col items-center ">
										<label className="text-lg font-bold">
											006
										</label>
										<label className="text-sm font-light">
											TPP Hilang
										</label>
									</div>
								</div>

								<div className="bg-white h-20 py-1 flex gap-2 items-center justify-around  shadow-md">
									<GoShield
										size={40}
										className="text-red-500 "
									></GoShield>
									<div className="flex flex-col items-center ">
										<label className="text-lg font-bold">
											200
										</label>
										<label className="text-sm font-light">
											TPP Rusak
										</label>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<span className="text-xs font-bold text-white font-mono">
									Jumlah Perangkat Rusak
								</span>
								<div className="grid grid-cols-3 gap-2">
									<div className="bg-white h-20 py-1 flex gap-2 items-center justify-around  shadow-md">
										<Tooltip title={"Rfid Reader"}>
											<MdOutlineAdfScanner
												size={40}
												className="text-red-500 "
											></MdOutlineAdfScanner>
										</Tooltip>
										<div className="flex flex-col items-center ">
											<label className="text-lg font-bold">
												200
											</label>
										</div>
									</div>

									<div className="bg-white h-20 py-1 flex gap-2 items-center justify-around  shadow-md">
										<Tooltip title={"Handheld Scanner"}>
											<BiRfid
												size={40}
												className="text-blue-500 "
											></BiRfid>
										</Tooltip>
										<div className="flex flex-col items-center ">
											<label className="text-lg font-bold">
												200
											</label>
										</div>
									</div>

									<div className="bg-white h-20 py-1 flex gap-2 items-center justify-around  shadow-md">
										<Tooltip title={"Tablet"}>
											<IoMdTabletPortrait
												size={40}
												className="text-teal-500 "
											></IoMdTabletPortrait>
										</Tooltip>
										<div className="flex flex-col items-center ">
											<label className="text-lg font-bold">
												200
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2  ">
							<div className="h-10 flex items-center bg-white shadow-md">
								<h1 className="font-mono px-2">
									Presentase Jumlah Ketersediaan TPP
								</h1>
							</div>
							<div className="h-[calc(100%-40px)] flex items-center justify-center bg-white shadow-md">
								<KetersediaanTPPChart
									data={record?.section3?.pinAvailable}
								></KetersediaanTPPChart>
							</div>
							{/* <div className="bg-white font-mono px-2 flex justify-end shadow-md">
								Total : 
							</div> */}
						</div>
					</div>
				</div>
			):(
				<div
					className="h-full w-full flex flex-col gap-4 justify-center bg-slate-800 items-center z-1"
				>
					<span className=" text-white font-extrabold text-3xl">
						Loading Data Smart Pin
					</span>
					<Spin size="large"></Spin>
				</div>
			)}
		</div>
	);
};

export default DashboardPin;
