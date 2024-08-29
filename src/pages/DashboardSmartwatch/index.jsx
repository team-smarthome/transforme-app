import React, { useEffect, useState } from "react";
import HeaderMonitor from "./Header";
import TotalPerangkatKomponen from "./TotalPerangkat";
import BateraiKomponen from "./Baterai";
import MapKomponen from "./Map";
import InformasiKomponen from "./InformasiPengguna";
import HealthStatistic from "./StatistikKesehatan";
import BestPeformance from "./BestPeformance";
import { FaBullseye } from "react-icons/fa6";
import { useUnauthorizedHandler } from "../../utils/handleUnauthorizedDashboardSmartwatch";
import { LaravelApiDashboard } from "../../services/DashboardSmartwatchApi/dashboardApi";
import pengajarData from "../../hooks/pengajarData";
import { Spin } from "antd";
// import waveBg from "../../../assets/monior-bg.jpg";
import waveBg from "../../../assets/monitor-bg.jpg";
import ListKegiatan from "./ListKegiatan";
import {
	authLoginDashboardSmartwatch,
	pengajarDataAtom,
	pesertaDataAtom,
	dashboardDataAtom,
} from "../../utils/atomDashboardSmartwatch"
import { useAtom } from "jotai";

const CornerLineTop = () => {
	return (
		<>
			<span className="absolute left-0 top-0 bg-wLineLightBlue  w-[3px] h-[30px] "></span>
			<span className="absolute left-0 top-0 bg-wLineLightBlue w-[160px] h-[3px]"></span>
			<span className="absolute left-[6px] top-[6px] border-wLineLightBlue border-t-[3px] border-l-[3px] h-4 w-4"></span>
		</>
	);
};

const CornerLineBottom = () => {
	return (
		<>
			<span className="absolute right-0 bottom-0 bg-wLineLightBlue w-[3px] h-[160px] "></span>
			<span className="absolute right-0 bottom-0 bg-wLineLightBlue w-[30px] h-[3px]"></span>
			<span className="absolute right-[6px] bottom-[6px] border-wLineLightBlue border-r-[3px] border-b-[3px] h-4 w-4"></span>
		</>
	);
};

const DashboardSmartwatch = () => {
	const [loading, setLoading] = useState(false);
	const [formLoading, setFormLoading] = useState(true);
	const handleUnauthorized = useUnauthorizedHandler();
	// const [dashboardData, setDashboardData] = useState(null);

	const [authUser,setAuthUser] =  useAtom(authLoginDashboardSmartwatch);
	const [dashboardData, setDashboardData] =  useAtom(dashboardDataAtom);
	let [pengajarDataTemp, setPengajarDataTemp] = useAtom(pengajarDataAtom);
	let [pesertaDataTemp, setPesertaDataTemp] = useAtom(pesertaDataAtom);

	const { pengajarList, pesertaList, handlePesertaData, handlePengajarData } =
		pengajarData();
	const [dataList, setDataList] = useState([]);

	const fetchDashboard = async () => {
		try {
			const { data } = await LaravelApiDashboard(authUser?.token);
			console.log(data, "Data Temp");
			console.log(authUser, "Data Temp");

			if (data.status === 200) {
				setDashboardData(data?.records);
			}
		
		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				handleUnauthorized();
			}
		}
	};

	useEffect(() => {
		console.log('====================================');
		console.log(pesertaDataTemp, pengajarDataTemp, "Data Temp");
		console.log('====================================');
		Promise.all([
			fetchDashboard(),
			handlePesertaData(),
			handlePengajarData(),
		]).then(() => setFormLoading(false));
	}, []);

	console.log(dashboardData, "Data Temp");
	useEffect(() => {
		
		if (pesertaDataTemp !== undefined && pengajarDataTemp !== undefined) {
			const userList = [...pesertaDataTemp, ...pengajarDataTemp];

			let dataDeviceCombine = userList.map((item1) => {
				let item2 = dashboardData?.perangkat?.detail.find(
					(item2) => item2?.v_imei === item1?.device?.imei
				);
				return {
					...item1,
					detail: item2,
				};
			});
			console.log(dataDeviceCombine, "Data Temp");

			setDataList(
				dataDeviceCombine
				.filter(
					(item3) =>
						item3?.device !== null &&
						item3?.detail?.n_lat !== 0 &&
						item3?.detail?.status === "terhubung"
				)
			);
		}
		
	}, [pesertaDataTemp, pengajarDataTemp, dashboardData]);

	

	console.log(dataList, "List Data");

	return (
		<div className="h-full w-full bg-slate-800">
			{formLoading ? (
				<div
					className="h-full w-full flex flex-col gap-4 justify-center bg-slate-800 items-center z-1"
				>
					<span className=" text-white font-extrabold text-3xl">
						Loading Data Smartwatch
					</span>
					<Spin size="large"></Spin>
				</div>
			) : (
				<div className="h-full w-full  overflow-auto  bg-slate-800 z-1">
					{/* <HeaderMonitor></HeaderMonitor> */}
					<div className="grid grid-rows-0 md:grid-rows-2 h-full p-4 gap-2">
						<div className="flex gap-4 ">
							<div className="relative flex-auto w-[30rem] p-4 ">
								<CornerLineTop></CornerLineTop>
								<TotalPerangkatKomponen
									data={dashboardData?.perangkat}
								></TotalPerangkatKomponen>
								<CornerLineBottom></CornerLineBottom>
							</div>
							<div className="w-full flex flex-col gap-4">
								<div className="relative h-16 overflow-hidden ">
									<CornerLineTop></CornerLineTop>
									<BateraiKomponen
										data={dashboardData?.perangkat}
									></BateraiKomponen>
									<CornerLineBottom></CornerLineBottom>
								</div>
								<div className="relative flex-auto  p-3 ">
									<CornerLineTop></CornerLineTop>
									<MapKomponen data={dataList}></MapKomponen>
									<CornerLineBottom></CornerLineBottom>
								</div>
							</div>
							<div className="w-full relative p-4">
								<CornerLineTop></CornerLineTop>
								<BestPeformance></BestPeformance>
								<CornerLineBottom></CornerLineBottom>
							</div>
						</div>
						<div className="flex gap-4">
							<div className="relative w-full p-4">
								<CornerLineTop></CornerLineTop>
								<InformasiKomponen
									data={pesertaList}
									loading={formLoading}
								></InformasiKomponen>
								<CornerLineBottom></CornerLineBottom>
							</div>
							<div className="relative w-full p-4 ">
								<CornerLineTop></CornerLineTop>
								<HealthStatistic
									data={dashboardData?.avgKesehatan}
								></HealthStatistic>
								<CornerLineBottom></CornerLineBottom>
							</div>
							<div className="relative w-full p-4">
								<CornerLineTop></CornerLineTop>
								<ListKegiatan
									data={dashboardData?.kegiatan}
								></ListKegiatan>
								<CornerLineBottom></CornerLineBottom>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardSmartwatch;
