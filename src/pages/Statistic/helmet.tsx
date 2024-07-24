import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiDashboard, apiReadStatusKamera } from "../../services/api";
import { Alerts } from "./Alert";
import { Error403Message } from "../../utils/constants";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { TutorialStatistic } from "../../utils/atomstates";
import { useAtom } from "jotai";

const Helmet = () => {
	const navigate = useNavigate();
	const location = useLocation();

	//kamera
	// const navigate = useNavigate();
	const [kamera, setKamera] = useState(0);
	const [kameraAktif, setKameraAktif] = useState(0);
	const [kameraNonAktif, setKameraNonAktif] = useState(0);
	const [kameraRusak, setKameraRusak] = useState(0);

	const tokenItem = localStorage.getItem("token");
	const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
	const token = dataToken?.token ? dataToken?.token : null;

	const [isStatistic, setIsStatistic] = useAtom(TutorialStatistic);

	// const handleClickTutorial = () => {
	const driverObj = driver({
		nextBtnText: "lanjut",
		prevBtnText: "sebelum",
		doneBtnText: "selesai",
		showProgress: true,
		steps: [
			// {
			//   element: "#b-bar",
			//   popover: {
			//     title: "Sidebar",
			//     description: "Menampilkan sidebar",
			//   },
			// },
			// {
			//   element: "#logo",
			//   popover: {
			//     title: "SIRAM",
			//     description: "Menampilkan SIRAM Dashboard OTMIL",
			//   },
			// },
			// {
			//   element: "#b-screen",
			//   popover: {
			//     title: "Set Fullscreen",
			//     description: "Menampilkan layar fullscreen",
			//   },
			// },
			// {
			//   element: "#b-notif",
			//   popover: {
			//     title: "Notification",
			//     description: "Menampilkan notifikasi",
			//   },
			// },
			// {
			//   element: "#user",
			//   popover: {
			//     title: "Profil",
			//     description: "Menampilkan profil user",
			//   },
			// },
			{
				element: "#total",
				popover: {
					title: "Total Tahanan",
					description: "Menampilkan total tahanan",
				},
			},
			{
				element: "#sakit",
				popover: {
					title: "Jumlah Tahanan Sakit",
					description: "Menampilkan jumlah tahanan sakit",
				},
			},
			{
				element: "#terisolasi",
				popover: {
					title: "Jumlah Tahanan Terisolasi",
					description: "Menampilkan jumlah tahanan terisolasi",
				},
			},
			{
				element: "#event",
				popover: {
					title: "Event",
					description: "Menampilkan data event",
				},
			},
			{
				element: "#chart",
				popover: {
					title: "Analisa Perkara Tahanan",
					description: "Menampilkan grafik analisa perkara tahanan",
				},
			},
			{
				element: "#bar",
				popover: {
					title: "Analisa Kesatuan Tahanan",
					description: "Menampilkan grafik analisa kesatuan tahanan",
				},
			},
			{
				element: "#kamera",
				popover: {
					title: "Kamera",
					description:
						"Menampilkan data kamera aktif, kamera non-aktif, kamera rusak dan jumlah kamera",
				},
			},
		],
	});
	// };
	function runDriver() {
		driverObj.drive();
	}
	// const [isStatistic, setIsStatistic] = useAtom(TutorialStatistic);
	useEffect(() => {
		if (isStatistic) {
			runDriver();
			setIsStatistic(false);
		}
	}, [isStatistic]);

	useEffect(() => {
		const data = async () => {
			try {
				const response = await apiDashboard(token);
				setKamera(response.data.records.total_kamera);
				setKameraAktif(response.data.records.kamera_aktif);
				setKameraNonAktif(response.data.records.kamera_nonaktif);
				setKameraRusak(response.data.records.kamera_rusak);
			} catch (e: any) {
				if (e.response.status === 403) {
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
				});
			}
		};
		if (token !== null) {
			data();
		} else {
			localStorage.removeItem("dataUser");
			localStorage.removeItem("token");
			navigate("/auth/signin");
		}
	}, []);

	return (
		<>
			<div className="xl:mr-2 grid grid-cols-2 gap-2" id="kamera">
				<div className="grid gap-2">
					<div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
						<div className="flex h-11 w-11 items-center justify-center text-black rounded-full bg-blue-400 dark:bg-blue-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="white"
								className="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 2a10 10 0 0 0-10 10h20A10 10 0 0 0 12 2zM2 12h20v3a1 1 0 0 1-1 1h-5a1 1 0 0 0-1 1v4H9v-4a1 1 0 0 0-1-1H3a1 1 0 0 1-1-1v-3zM8 16h8v3H8v-3z"
								/>
							</svg>
						</div>
						<div className="ml-5 flex items-end justify-between">
							<div>
								<h4 className="text-title-md font-bold text-black dark:text-white">
									{kameraAktif}
								</h4>
								<span className="text-sm font-medium">
									Helmet Aktif
								</span>
							</div>
						</div>
					</div>{" "}
					<div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
						<div className="flex h-11 w-11 items-center justify-center rounded-full  bg-slate-100 dark:bg-slate-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 2a10 10 0 0 0-10 10h20A10 10 0 0 0 12 2zM2 12h20v3a1 1 0 0 1-1 1h-5a1 1 0 0 0-1 1v4H9v-4a1 1 0 0 0-1-1H3a1 1 0 0 1-1-1v-3zM8 16h8v3H8v-3z"
								/>
							</svg>
						</div>

						<div className="ml-5 flex items-end justify-between">
							<div>
								<h4 className="text-title-md font-bold text-black dark:text-white">
									{kameraRusak}
								</h4>
								<span className="text-sm font-medium">
									Helmet Rusak
								</span>
							</div>
						</div>
					</div>{" "}
				</div>
				<div className="grid gap-2">
					<div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
						<div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="white"
								className="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 2a10 10 0 0 0-10 10h20A10 10 0 0 0 12 2zM2 12h20v3a1 1 0 0 1-1 1h-5a1 1 0 0 0-1 1v4H9v-4a1 1 0 0 0-1-1H3a1 1 0 0 1-1-1v-3zM8 16h8v3H8v-3z"
								/>
							</svg>
						</div>

						<div className="ml-5 flex items-end justify-between">
							<div>
								<h4 className="text-title-md font-bold text-black dark:text-white">
									{kameraNonAktif}
								</h4>
								<span className="text-sm font-medium">
									Helmet Non-Aktif
								</span>
							</div>
						</div>
					</div>{" "}
					<div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
						<div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="white"
								className="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 2a10 10 0 0 0-10 10h20A10 10 0 0 0 12 2zM2 12h20v3a1 1 0 0 1-1 1h-5a1 1 0 0 0-1 1v4H9v-4a1 1 0 0 0-1-1H3a1 1 0 0 1-1-1v-3zM8 16h8v3H8v-3z"
								/>
							</svg>
						</div>

						<div className="ml-5 flex items-end justify-between">
							<div>
								<h4 className="text-title-md font-bold text-black dark:text-white">
									{kamera}
								</h4>
								<span className="text-sm font-medium">
									Jumlah Helmet
								</span>
							</div>
						</div>
					</div>{" "}
				</div>
			</div>
		</>
	);
};

export default Helmet;
