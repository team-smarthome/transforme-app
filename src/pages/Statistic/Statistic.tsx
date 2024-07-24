import ChartFive from "../../components/ChardKasus";
import Tahanan from "./tahanan";
import Kegiatan from "./event";
import Kamera from "./kamera";
import Gateway from "./gateway";
import Brecelet from "./gelang";
import ChartBar from "../../components/chardWBP";
import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import { apiDashboard } from "../../services/api";
import { Alerts } from "./Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";
import { useAtom } from "jotai";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Helmet from "./Helmet";

const Statistic = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [loading, setloading] = useState(false);
	const [tahanan, setTahanan] = useState(0);
	const [tahananSakit, setTahananSakit] = useState(0);
	const [tahananIsolasi, SettahananIsolasi] = useState(0);

	const tokenItem = localStorage.getItem("token");
	const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
	const token = dataToken?.token ? dataToken?.token : null;

	return loading ? (
		<Loader />
	) : (
		<div className="p-4 md:p-6 2xl:p-10">
			{/* ---static lemasmil start--- */}
			<Tahanan defaultValue={{ tahanan, tahananIsolasi, tahananSakit }} />
			{/* ---static lemasmil end--- */}

			{/* Event Start */}
			<div className="mt-8">
				<div className="flex justify-between">
					<h1 className="font-bold text-2xl">Event</h1>
					<MdOutlineAddCircleOutline
						className="mr-2 hover:cursor-pointer hover:text-slate-400"
						size={35}
						onClick={() => navigate("/workstation/kegiatan")}
					/>
				</div>
				<div className="flex items-center justify-center">
					<Kegiatan />
				</div>
			</div>
			{/* Event End */}
			{/* ---Kasus start--- */}
			<div className="flex justify-between w-full ">
				<div className="mt-8 font-semibold text-2xl">Kesehatan</div>
				<MdOutlineAddCircleOutline
					className="mt-8 mr-2 hover:cursor-pointer hover:text-slate-400"
					size={35}
					onClick={() => navigate("/workstation/daftar-kasus")}
				/>
			</div>

			<div className=" flex justify-center w-full mt-4 md:mt-6 md:gap-6 2xl:mt-5 2xl:gap-7.5">
				<div className="w-full h-full">
					<ChartBar />
				</div>
			</div>
			{/* ---Kasus End--- */}

			{/* ---Kamera start--- */}
			<div className="mt-8 xl:flex xl:space-x-2">
				<div className="mt-2 xl:w-1/2 md:w-full ">
					<div className="flex justify-between">
						<h1 className="font-semibold text-2xl">Kamera</h1>
						<MdOutlineAddCircleOutline
							className="mr-2 hover:cursor-pointer hover:text-slate-400"
							size={35}
							onClick={() =>
								navigate(
									"/workstation/pengaturan-list/perangkat/kamera"
								)
							}
						/>
					</div>

					<div className="mt-2">
						<Kamera />
					</div>
				</div>
				<div className="mt-2 xl:w-1/2 md:w-full">
					<div className="flex justify-between">
						<h1 className="font-semibold text-2xl">Smartwatch</h1>
						<MdOutlineAddCircleOutline
							className="mr-2 hover:cursor-pointer hover:text-slate-400"
							size={35}
							onClick={() =>
								navigate(
									"/dashboard/pengaturan-list/perangkat/smartwatch"
								)
							}
						/>
					</div>
					<div className="mt-2">
						<Brecelet />
					</div>
				</div>
			</div>
			{/* ---Kamera end--- */}

			{/* ---Gateway start--- */}
			<div>
				<div className="flex justify-between">
					<h1 className="mt-8 font-semibold text-2xl">Gateway</h1>
					<MdOutlineAddCircleOutline
						className="mt-8 mr-2 hover:cursor-pointer hover:text-slate-400"
						size={35}
						onClick={() =>
							navigate(
								"/workstation/pengaturan-list/perangkat/gateway"
							)
						}
					/>
				</div>
				<Gateway />
			</div>

			{/* ---Helmet start--- */}
			<div className="mt-8 xl:flex xl:space-x-2">
				<div className="mt-2 xl:full md:w-full ">
					<div className="flex justify-between">
						<h1 className="font-semibold text-2xl">Helmet</h1>
						<MdOutlineAddCircleOutline
							className="mr-2 hover:cursor-pointer hover:text-slate-400"
							size={35}
							onClick={() =>
								navigate(
									"/dashboard/pengaturan-list/perangkat/helmet"
								)
							}
						/>
					</div>

					<div className="mt-2">
						<Helmet />
					</div>
				</div>
			</div>
			{/* ---Helmet end--- */}
		</div>
	);
};

export default Statistic;
