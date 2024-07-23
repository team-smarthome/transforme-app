import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { selectedRoute } from "../utils/atomstates";
import { useAtom } from "jotai";
import toast from "react-hot-toast";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	const [appMode] = useAtom(selectedRoute);

	const dataAppMoede = localStorage.getItem("appMode");
	console.log("dataAppMode", dataAppMoede);

	const location = useLocation();
	const { pathname } = location;

	const [isworkstation, setIsworkstation] = useState<boolean>(false);

	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);
	const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();

	const dataUserItem = localStorage.getItem("dataUser");
	const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

	const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null
			? false
			: storedSidebarExpanded === "true"
	);

	const handleNavLinkClick = () => {
		// Menutup sidebar saat NavLink diklik
		setSidebarOpen(!sidebarOpen);
	};

	//handleadminrole
	useEffect(() => {
		if (dataAdmin?.role_name === "superadmin") {
			setIsSuperAdmin(true);
		} else {
			setIsSuperAdmin(false);
		}

		console.log(isSuperAdmin, "ADMIN");
	}, [isSuperAdmin]);

	useEffect(() => {
		console.log(appMode, "appModeSaatIni");
		if (dataAppMoede === "workstation" || appMode === "workstation") {
			setIsworkstation(true);
			// document.querySelector('body')?.classList.add('admin');
		} else {
			setIsworkstation(false);
			// document.querySelector('body')?.classList.remove('admin');
		}
	}, [appMode]);

	//  useEffect(() => {
	//   const handleOutsideClick = (e: any) => {
	//     if (sidebar.current ||  !sidebar.current.contains(e.target)) return;
	//     if (
	//       !sidebarOpen ||
	//       sidebar.current.contains(e.target) ||
	//       trigger.current.contains(e.target)
	//     )
	//       return;
	//     setSidebarOpen(!sidebarOpen);
	//   };

	//   document.addEventListener('mousedown', handleOutsideClick);
	//   return () => {
	//     document.removeEventListener('mousedown', handleOutsideClick);
	//   };
	// }, [sidebarOpen]);

	// close on click outside
	useEffect(() => {
		const clickHandler = (event: any) => {
			// if (!sidebarOpen ) {
			//   setSidebarOpen(!sidebarOpen);
			// }
			if (
				sidebar.current &&
				!sidebar.current.contains(event.target) &&
				!sidebarOpen
			) {
				setSidebarOpen(true);
			}
		};

		document.addEventListener("click", clickHandler);

		return () => document.removeEventListener("click", clickHandler);
	}, [sidebarOpen]);

	// close if the esc key is pressed
	// useEffect(() => {
	//   const keyHandler = ({ keyCode }: KeyboardEvent) => {
	//     if (!sidebarOpen || keyCode !== 27) return;
	//     setSidebarOpen(false);
	//   };
	//   document.addEventListener('keydown', keyHandler);
	//   return () => document.removeEventListener('keydown', keyHandler);
	// });

	useEffect(() => {
		localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector("body")?.classList.add("sidebar-expanded");
		} else {
			document
				.querySelector("body")
				?.classList.remove("sidebar-expanded");
		}
	}, [sidebarExpanded]);

	return (
		<>
			{isworkstation ? (
				<>
					<aside
						ref={sidebar}
						className={`fixed top-0 z-40 h-screen  flex flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-dark2 translate-x-0  ${
							sidebarOpen
								? "w-0 translate-x-0"
								: "w-72.5 -translate-x-full"
						}`}
					>
						{/* <!-- SIDEBAR HEADER --> */}
						<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"></div>
						{/* <!-- SIDEBAR HEADER --> */}

						{/* <!-- SIDEBAR MENU --> */}

						<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
							{/* <!-- Sidebar Menu --> */}
							<nav className="mt-10 py-4 px-4 lg:mt-9 lg:px-6">
								{/* <!-- Menu Group --> */}
								<div>
									<ul className="mb-6 flex flex-col gap-1.5">
										<li>
											<NavLink
												to="/workstation/penyidikan"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"penyidikan"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													fill="#FFFFFF"
													height="18"
													width="18"
													version="1.1"
													id="Capa_1"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 69.961 69.961"
													stroke="#FFFFFF"
												>
													<g
														id="SVGRepo_bgCarrier"
														strokeWidth="0"
													></g>
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													></g>
													<g id="SVGRepo_iconCarrier">
														{" "}
														<g>
															{" "}
															<path d="M66.829,51.329L56.593,41.093c1.479-3.56,2.248-7.387,2.248-11.282c0-16.222-13.198-29.42-29.421-29.42 C13.198,0.391,0,13.589,0,29.811c0,16.223,13.198,29.421,29.42,29.421c4.318,0,8.518-0.932,12.37-2.724l9.931,9.932 c2.019,2.019,4.701,3.13,7.556,3.13s5.539-1.112,7.557-3.132c2.016-2.015,3.127-4.698,3.127-7.553 C69.96,56.032,68.849,53.348,66.829,51.329z M62.588,62.198c-0.914,0.915-2.113,1.372-3.312,1.372s-2.397-0.457-3.313-1.372 L42.798,49.031c-3.794,2.646-8.403,4.201-13.378,4.201C16.485,53.232,6,42.746,6,29.811s10.485-23.42,23.42-23.42 s23.421,10.485,23.421,23.42c0,4.57-1.314,8.832-3.578,12.438l13.325,13.325C64.418,57.403,64.418,60.369,62.588,62.198z"></path>{" "}
															<path d="M29.42,13.061c-9.235,0-16.749,7.514-16.749,16.75s7.514,16.75,16.749,16.75c9.236,0,16.75-7.514,16.75-16.75 S38.656,13.061,29.42,13.061z M29.42,40.561c-5.927,0-10.749-4.822-10.749-10.75s4.822-10.75,10.749-10.75 c5.928,0,10.75,4.822,10.75,10.75S35.348,40.561,29.42,40.561z"></path>{" "}
														</g>{" "}
													</g>
												</svg>
												Penyidikan
											</NavLink>
										</li>
										{/* <!-- Menu Penyidikan --> */}

										{/* <!-- Menu Item Daftar BAP --> */}
										<li>
											<NavLink
												to="/workstation/pencatatan-bap"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"pencatatan-bap"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													width="20"
													height="20"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
													/>
												</svg>
												Daftar BAP
											</NavLink>
										</li>
										{/* <!-- Menu Item Daftar BAP --> */}

										{/* <!-- Menu Item Daftar Sidang --> */}
										<li>
											<NavLink
												to="/workstation/daftar-sidang"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"daftar-sidang"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													width="18"
													height="18"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
													/>
												</svg>
												Daftar Sidang
											</NavLink>
										</li>
										{/* <!-- Menu Item Daftar Sidang --> */}

										{/* <!-- Menu Item Daftar Kasus --> */}
										<li>
											<NavLink
												to="/workstation/daftar-kasus"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"daftar-kasus"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<HiOutlineDocumentSearch
													size={20}
												/>
												{/* Daftar Kasus */}
												Daftar Kasus
											</NavLink>
										</li>
										{/* <!-- Menu Item Daftar Kasus --> */}

										{/* <!-- Menu Item Aktifitas Pengunjung --> */}
										<li>
											<NavLink
												to="/workstation/pengunjung"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"pengunjung"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													width="20"
													height="20"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
													/>
												</svg>
												Aktivitas Pengunjung
											</NavLink>
										</li>
										{/* <!-- Menu Item Aktifitas Pengunjung --> */}

										{/* menu item schedule */}
										<SidebarLinkGroup
											activeCondition={
												pathname ===
													"/workstation/shift-jaga" ||
												pathname.includes("shift-jaga")
											}
										>
											{(handleClick, open) => {
												return (
													<React.Fragment>
														<NavLink
															to="#"
															className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																(pathname ===
																	"/workstation/shift-jaga" ||
																	pathname.includes(
																		"ShiftJaga"
																	)) &&
																"bg-graydark dark:bg-meta-4"
															}`}
															onClick={(e) => {
																e.preventDefault();
																sidebarExpanded
																	? handleClick()
																	: setSidebarExpanded(
																			true
																	  );
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth="1.5"
																stroke="currentColor"
																className="w-5 h-5"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
																/>
															</svg>
															Shift Kerja
															<svg
																className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
																	open &&
																	"rotate-180"
																}`}
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
																	fill=""
																/>
															</svg>
														</NavLink>
														{/* <!-- Dropdown Menu Start --> */}
														<div
															className={`translate transform overflow-hidden ${
																!open &&
																"hidden"
															}`}
														>
															<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
																<li>
																	<NavLink
																		to="/workstation/shift-jaga/calendar-shift"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Jadwal
																		Shift
																		Kerja
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/shift-jaga/group-shift"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Grup
																		Shift
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/shift-jaga/data-schedule-shift"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Shift
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/shift-jaga/penugasan"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Penugasan
																	</NavLink>
																</li>
															</ul>
														</div>
														{/* <!-- Dropdown Menu End --> */}
													</React.Fragment>
												);
											}}
										</SidebarLinkGroup>
										{/* menu item schedule */}

										{/* <!-- Menu Item Master Data --> */}
										<SidebarLinkGroup
											activeCondition={
												pathname ===
													"/workstation/database-wajah" ||
												pathname.includes(
													"database-wajah"
												)
											}
										>
											{(handleClick, open) => {
												return (
													<React.Fragment>
														<NavLink
															to="#"
															className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																(pathname ===
																	"/database-wajah" ||
																	pathname.includes(
																		"database-wajah"
																	)) &&
																"bg-graydark dark:bg-meta-4"
															}`}
															onClick={(e) => {
																e.preventDefault();
																sidebarExpanded
																	? handleClick()
																	: setSidebarExpanded(
																			true
																	  );
															}}
														>
															<svg
																width="18"
																height="18"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
																stroke="#FFFFFF"
															>
																<g
																	id="SVGRepo_bgCarrier"
																	strokeWidth="0"
																></g>
																<g
																	id="SVGRepo_tracerCarrier"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																></g>
																<g id="SVGRepo_iconCarrier">
																	{" "}
																	<path
																		d="M4 18V6"
																		stroke="#FFFFFF"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	></path>{" "}
																	<path
																		d="M20 6V18"
																		stroke="#FFFFFF"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	></path>{" "}
																	<path
																		d="M12 10C16.4183 10 20 8.20914 20 6C20 3.79086 16.4183 2 12 2C7.58172 2 4 3.79086 4 6C4 8.20914 7.58172 10 12 10Z"
																		stroke="#FFFFFF"
																		strokeWidth="1.5"
																	></path>{" "}
																	<path
																		d="M20 12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12"
																		stroke="#FFFFFF"
																		strokeWidth="1.5"
																	></path>{" "}
																	<path
																		d="M20 18C20 20.2091 16.4183 22 12 22C7.58172 22 4 20.2091 4 18"
																		stroke="#FFFFFF"
																		strokeWidth="1.5"
																	></path>{" "}
																</g>
															</svg>
															Master Data
															<svg
																className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
																	open &&
																	"rotate-180"
																}`}
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
																	fill=""
																/>
															</svg>
														</NavLink>
														{/* <!-- Dropdown Menu Start --> */}
														<div
															className={`translate transform overflow-hidden ${
																!open &&
																"hidden"
															}`}
														>
															<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
																<li>
																	<NavLink
																		to="/workstation/master-data/tersangka"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Tersangka
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/petugas"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Petugas
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/pengunjung"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Pengunjung
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/jenis-perkara"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Perkara{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/kategori-perkara"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Kategori
																		Perkara{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/ruangan"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Ruangan{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/tipe-asset"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Tipe
																		Aset{" "}
																	</NavLink>
																</li>
																{/* <li>
                            <NavLink
                              to="/hakim-data"
                              onClick={handleNavLinkClick}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Data Hakim{' '}
                            </NavLink>
                          </li> */}
																<li>
																	<NavLink
																		to="/workstation/master-data/oditur/penyidik"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Oditur
																		Penyidik{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/oditur/penuntut"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Oditur
																		Penuntut{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/saksi"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Saksi{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/ahli"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Ahli{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/jenis-sidang"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Jenis
																		Persidangan{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/barang-bukti"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Barang
																		Bukti{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/pengadilan-militer"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Pengadilan
																		Militer{" "}
																	</NavLink>
																</li>

																<li>
																	<NavLink
																		to="/workstation/master-data/gedung"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Gedung{" "}
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/master-data/data-lantai"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Data
																		Lantai{" "}
																	</NavLink>
																</li>
															</ul>
														</div>
														{/* <!-- Dropdown Menu End --> */}
													</React.Fragment>
												);
											}}
										</SidebarLinkGroup>
										{/* <!-- Menu Item Master data --> */}

										{/* <!-- Menu Item Kegiatan --> */}
										<li>
											<NavLink
												to="/workstation/kegiatan"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"event-data"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="w-5 h-5"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
													/>
												</svg>
												Kegiatan
											</NavLink>
										</li>
										{/* <!-- Menu Item Kegiatan --> */}

										{/* <!-- Menu Item Inventaris --> */}
										<li>
											<NavLink
												to="/workstation/daftar-inventaris"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"daftar-inventaris"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													width="20"
													height="20"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
													/>
												</svg>
												Inventaris
											</NavLink>
										</li>
										{/* <!-- Menu Item Inventaris --> */}

										{/* <!-- Menu Item Kamera --> */}
										<li>
											<NavLink
												to="/workstation/kamera-live"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname ===
														"/workstation/kamera-live" &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													fill="#FFFFFF"
													height="18"
													width="18"
													version="1.1"
													id="Capa_1"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 74.207 74.207"
													stroke="#FFFFFF"
												>
													<g
														id="SVGRepo_bgCarrier"
														strokeWidth="0"
													></g>
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													></g>
													<g id="SVGRepo_iconCarrier">
														{" "}
														<g>
															{" "}
															<path d="M57.746,14.658h-2.757l-1.021-3.363c-0.965-3.178-3.844-5.313-7.164-5.313H28.801c-3.321,0-6.201,2.135-7.165,5.313 l-1.021,3.363h-4.153C7.385,14.658,0,22.043,0,31.121v20.642c0,9.077,7.385,16.462,16.462,16.462h41.283 c9.077,0,16.462-7.385,16.462-16.462V31.121C74.208,22.043,66.823,14.658,57.746,14.658z M68.208,51.762 c0,5.769-4.693,10.462-10.462,10.462H16.462C10.693,62.223,6,57.53,6,51.762V31.121c0-5.769,4.693-10.462,10.462-10.462h8.603 l2.313-7.621c0.192-0.631,0.764-1.055,1.423-1.055h18.003c0.659,0,1.23,0.424,1.423,1.057l2.314,7.619h7.204 c5.769,0,10.462,4.693,10.462,10.462L68.208,51.762L68.208,51.762z"></path>
															<path d="M37.228,25.406c-8.844,0-16.04,7.195-16.04,16.04c0,8.844,7.195,16.039,16.04,16.039s16.041-7.195,16.041-16.039 C53.269,32.601,46.073,25.406,37.228,25.406z M37.228,51.486c-5.536,0-10.04-4.504-10.04-10.039c0-5.536,4.504-10.04,10.04-10.04 c5.537,0,10.041,4.504,10.041,10.04C47.269,46.982,42.765,51.486,37.228,51.486z"></path>
														</g>{" "}
													</g>
												</svg>
												Kamera
											</NavLink>
										</li>
										{/* <!-- Menu Item Kamera --> */}

										{/* <!-- Menu Item Kamera Tersimpan --> */}
										<li>
											<NavLink
												to="/workstation/kamera-tersimpan"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname ===
														"/workstation/kamera-tersimpan" &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													fill="#FFFFFF"
													height="18"
													width="18"
													version="1.1"
													id="Capa_1"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 74.207 74.207"
													stroke="#FFFFFF"
												>
													<g
														id="SVGRepo_bgCarrier"
														strokeWidth="0"
													></g>
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													></g>
													<g id="SVGRepo_iconCarrier">
														{" "}
														<g>
															{" "}
															<path d="M57.746,14.658h-2.757l-1.021-3.363c-0.965-3.178-3.844-5.313-7.164-5.313H28.801c-3.321,0-6.201,2.135-7.165,5.313 l-1.021,3.363h-4.153C7.385,14.658,0,22.043,0,31.121v20.642c0,9.077,7.385,16.462,16.462,16.462h41.283 c9.077,0,16.462-7.385,16.462-16.462V31.121C74.208,22.043,66.823,14.658,57.746,14.658z M68.208,51.762 c0,5.769-4.693,10.462-10.462,10.462H16.462C10.693,62.223,6,57.53,6,51.762V31.121c0-5.769,4.693-10.462,10.462-10.462h8.603 l2.313-7.621c0.192-0.631,0.764-1.055,1.423-1.055h18.003c0.659,0,1.23,0.424,1.423,1.057l2.314,7.619h7.204 c5.769,0,10.462,4.693,10.462,10.462L68.208,51.762L68.208,51.762z"></path>
															<path d="M37.228,25.406c-8.844,0-16.04,7.195-16.04,16.04c0,8.844,7.195,16.039,16.04,16.039s16.041-7.195,16.041-16.039 C53.269,32.601,46.073,25.406,37.228,25.406z M37.228,51.486c-5.536,0-10.04-4.504-10.04-10.039c0-5.536,4.504-10.04,10.04-10.04 c5.537,0,10.041,4.504,10.041,10.04C47.269,46.982,42.765,51.486,37.228,51.486z"></path>
														</g>{" "}
													</g>
												</svg>
												Kamera Tersimpan
											</NavLink>
										</li>

										{/* <!-- Menu Item Playback Kamera --> */}
										<li>
											<NavLink
												to="/workstation/kamera-playback"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"kamera-playback"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													fill="#FFFFFF"
													height="18"
													width="18"
													version="1.1"
													id="Capa_1"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 74.207 74.207"
													stroke="#FFFFFF"
												>
													<g
														id="SVGRepo_bgCarrier"
														strokeWidth="0"
													></g>
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													></g>
													<g id="SVGRepo_iconCarrier">
														{" "}
														<g>
															{" "}
															<path d="M57.746,14.658h-2.757l-1.021-3.363c-0.965-3.178-3.844-5.313-7.164-5.313H28.801c-3.321,0-6.201,2.135-7.165,5.313 l-1.021,3.363h-4.153C7.385,14.658,0,22.043,0,31.121v20.642c0,9.077,7.385,16.462,16.462,16.462h41.283 c9.077,0,16.462-7.385,16.462-16.462V31.121C74.208,22.043,66.823,14.658,57.746,14.658z M68.208,51.762 c0,5.769-4.693,10.462-10.462,10.462H16.462C10.693,62.223,6,57.53,6,51.762V31.121c0-5.769,4.693-10.462,10.462-10.462h8.603 l2.313-7.621c0.192-0.631,0.764-1.055,1.423-1.055h18.003c0.659,0,1.23,0.424,1.423,1.057l2.314,7.619h7.204 c5.769,0,10.462,4.693,10.462,10.462L68.208,51.762L68.208,51.762z"></path>
															<path d="M37.228,25.406c-8.844,0-16.04,7.195-16.04,16.04c0,8.844,7.195,16.039,16.04,16.039s16.041-7.195,16.041-16.039 C53.269,32.601,46.073,25.406,37.228,25.406z M37.228,51.486c-5.536,0-10.04-4.504-10.04-10.039c0-5.536,4.504-10.04,10.04-10.04 c5.537,0,10.041,4.504,10.041,10.04C47.269,46.982,42.765,51.486,37.228,51.486z"></path>
														</g>{" "}
													</g>
												</svg>
												Playback
											</NavLink>
										</li>
										{/* <!-- Menu Item Playback Kamera --> */}

										{/* <!-- Menu Item Pelacakan --> */}
										<SidebarLinkGroup
											activeCondition={
												pathname ===
													"/workstation/pelacakan" ||
												pathname.includes("pelacakan")
											}
										>
											{(handleClick, open) => {
												return (
													<React.Fragment>
														<NavLink
															to="#"
															className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																(pathname ===
																	"/workstation/pelacakan" ||
																	pathname.includes(
																		"pelacakan"
																	)) &&
																"bg-graydark dark:bg-meta-4"
															}`}
															onClick={(e) => {
																e.preventDefault();
																sidebarExpanded
																	? handleClick()
																	: setSidebarExpanded(
																			true
																	  );
															}}
														>
															<svg
																fill="#FFFFFF"
																height="18"
																width="18"
																version="1.1"
																id="Capa_1"
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 69.961 69.961"
																stroke="#FFFFFF"
															>
																<g
																	id="SVGRepo_bgCarrier"
																	strokeWidth="0"
																></g>
																<g
																	id="SVGRepo_tracerCarrier"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																></g>
																<g id="SVGRepo_iconCarrier">
																	{" "}
																	<g>
																		{" "}
																		<path d="M66.829,51.329L56.593,41.093c1.479-3.56,2.248-7.387,2.248-11.282c0-16.222-13.198-29.42-29.421-29.42 C13.198,0.391,0,13.589,0,29.811c0,16.223,13.198,29.421,29.42,29.421c4.318,0,8.518-0.932,12.37-2.724l9.931,9.932 c2.019,2.019,4.701,3.13,7.556,3.13s5.539-1.112,7.557-3.132c2.016-2.015,3.127-4.698,3.127-7.553 C69.96,56.032,68.849,53.348,66.829,51.329z M62.588,62.198c-0.914,0.915-2.113,1.372-3.312,1.372s-2.397-0.457-3.313-1.372 L42.798,49.031c-3.794,2.646-8.403,4.201-13.378,4.201C16.485,53.232,6,42.746,6,29.811s10.485-23.42,23.42-23.42 s23.421,10.485,23.421,23.42c0,4.57-1.314,8.832-3.578,12.438l13.325,13.325C64.418,57.403,64.418,60.369,62.588,62.198z"></path>{" "}
																		<path d="M29.42,13.061c-9.235,0-16.749,7.514-16.749,16.75s7.514,16.75,16.749,16.75c9.236,0,16.75-7.514,16.75-16.75 S38.656,13.061,29.42,13.061z M29.42,40.561c-5.927,0-10.749-4.822-10.749-10.75s4.822-10.75,10.749-10.75 c5.928,0,10.75,4.822,10.75,10.75S35.348,40.561,29.42,40.561z"></path>{" "}
																	</g>{" "}
																</g>
															</svg>
															Pelacakan Tersangka
															<svg
																className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
																	open &&
																	"rotate-180"
																}`}
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
																	fill=""
																/>
															</svg>
														</NavLink>
														{/* <!-- Dropdown Menu Start --> */}
														<div
															className={`translate transform overflow-hidden ${
																!open &&
																"hidden"
															}`}
														>
															<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
																{/* <li>
                            <NavLink
                              to="/pelacakan-wajah-petugas"
                              onClick={handleNavLinkClick}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Pelacakan Petugas
                            </NavLink>
                          </li> */}
																<li>
																	<NavLink
																		to="/workstation/pelacakan-wajah-prajurit"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Pelacakan
																		Dengan
																		Nama
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/pelacakan-dengan-gambar"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Pelacakan
																		Dengan
																		Gambar
																	</NavLink>
																</li>
															</ul>
														</div>
														{/* <!-- Dropdown Menu End --> */}
													</React.Fragment>
												);
											}}
										</SidebarLinkGroup>
										{/* <!-- Menu Item Pelacakan --> */}

										{/* <!-- Menu Item Live chat start --> */}
										<li>
											<NavLink
												to="/workstation/live-chat-list"
												onClick={handleNavLinkClick}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"live-chat-list"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													fill="none"
													width="18"
													height="18"
													stroke="currentColor"
													strokeWidth="1.5"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
													></path>
												</svg>
												Live Chat
											</NavLink>
										</li>
										{/* <!-- Menu Item Live chat end --> */}

										{/* <!-- Menu Item Pengaturan --> */}
										<SidebarLinkGroup
											activeCondition={
												pathname ===
													"/workstation/pengaturan-list" ||
												pathname.includes(
													"setting-list"
												)
											}
										>
											{(handleClick, open) => {
												return (
													<React.Fragment>
														<NavLink
															to="#"
															className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																(pathname ===
																	"/workstation/pengaturan-list" ||
																	pathname.includes(
																		"setting-list"
																	)) &&
																"bg-graydark dark:bg-meta-4"
															}`}
															onClick={(e) => {
																e.preventDefault();
																sidebarExpanded
																	? handleClick()
																	: setSidebarExpanded(
																			true
																	  );
															}}
														>
															<svg
																fill="none"
																width="18"
																height="18"
																stroke="currentColor"
																strokeWidth="1.5"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
																aria-hidden="true"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
																></path>
															</svg>
															Pengaturan
															<svg
																className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
																	open &&
																	"rotate-180"
																}`}
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
																	fill=""
																/>
															</svg>
														</NavLink>
														{/* <!-- Dropdown Menu Start --> */}
														<div
															className={`translate transform overflow-hidden ${
																!open &&
																"hidden"
															}`}
														>
															<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
																{isSuperAdmin && (
																	<li>
																		<NavLink
																			to="/workstation/pengaturan-list/manajemen-pengguna"
																			onClick={
																				handleNavLinkClick
																			}
																			className={({
																				isActive,
																			}) =>
																				"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																				(isActive &&
																					"!text-white")
																			}
																		>
																			Manajemen
																			Pengguna
																		</NavLink>
																	</li>
																)}
																<li>
																	<NavLink
																		to="/workstation/pengaturan-list/perangkat/gelang"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Gelang
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/pengaturan-list/perangkat/kamera"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Kamera
																	</NavLink>
																</li>
																<li>
																	<NavLink
																		to="/workstation/pengaturan-list/perangkat/gateway"
																		onClick={
																			handleNavLinkClick
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																			(isActive &&
																				"!text-white")
																		}
																	>
																		Gateway
																	</NavLink>
																</li>
															</ul>
														</div>
														{/* <!-- Dropdown Menu End --> */}
													</React.Fragment>
												);
											}}
										</SidebarLinkGroup>
										{/* <!-- Menu Item Pelacakan --> */}

										{/* <!-- Menu Item Log Pengenalan Wajah --> */}
										<SidebarLinkGroup
											activeCondition={
												pathname ===
													"/workstation/log" ||
												pathname.includes("log")
											}
										>
											{(handleClick, open) => {
												return (
													<React.Fragment>
														<NavLink
															to="#"
															className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																(pathname ===
																	"/workstation/log" ||
																	pathname.includes(
																		"log"
																	)) &&
																"bg-graydark dark:bg-meta-4"
															}`}
															onClick={(e) => {
																e.preventDefault();
																sidebarExpanded
																	? handleClick()
																	: setSidebarExpanded(
																			true
																	  );
															}}
														>
															<svg
																fill="none"
																width="18"
																height="18"
																stroke="currentColor"
																strokeWidth="1.5"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
																aria-hidden="true"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
																></path>
															</svg>
															Log
															<svg
																className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
																	open &&
																	"rotate-180"
																}`}
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
																	fill=""
																/>
															</svg>
														</NavLink>
														<div
															className={`translate transform overflow-hidden ${
																!open &&
																"hidden"
															}`}
														>
															<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
																<SidebarLinkGroup
																	activeCondition={
																		pathname ===
																			"/workstation/log" ||
																		pathname.includes(
																			"log"
																		)
																	}
																>
																	{(
																		handleClick,
																		open
																	) => {
																		return (
																			<React.Fragment>
																				{/* <NavLink
                                      to="/log-riwayat/realtime"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        (pathname === '/log-riwayat/realtime' ||
                                          pathname.includes('inmate-log')) &&
                                        'bg-graydark dark:bg-meta-4'
                                      }`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <svg
                                        fill="none"
                                        width="18"
                                        height="18"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                        ></path>
                                      </svg>
                                      Log Realtime
                                      <svg
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                          fill=""
                                        />
                                      </svg>
                                    </NavLink> */}
																				<NavLink
																					to="/workstation/log-riwayat/realtime"
																					onClick={
																						handleNavLinkClick
																					}
																					className={({
																						isActive,
																					}) =>
																						"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																						(isActive &&
																							"!text-white")
																					}
																				>
																					Log
																					Realtime
																				</NavLink>
																				{/* <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                        <li>
                                          <NavLink
                                            to="/log-riwayat/realtime"
                                            className={({ isActive }) =>
                                              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                              (isActive && '!text-white')
                                            }
                                          >
                                            Log Realtime
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/inmate-log"
                                            className={({ isActive }) =>
                                              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                              (isActive && '!text-white')
                                            }
                                          >
                                            Log Riwayat
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div> */}
																			</React.Fragment>
																		);
																	}}
																</SidebarLinkGroup>
																<SidebarLinkGroup
																	activeCondition={
																		pathname ===
																			"/workstation/log" ||
																		pathname.includes(
																			"log"
																		)
																	}
																>
																	{(
																		handleClick,
																		open
																	) => {
																		return (
																			<React.Fragment>
																				{/* <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        (pathname === '/log-riwayat/gateway' ||
                                          pathname.includes('door-log')) &&
                                        'bg-graydark dark:bg-meta-4'
                                      }`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <svg
                                        fill="none"
                                        width="18"
                                        height="18"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                        ></path>
                                      </svg>
                                      Log Kontrol Akses
                                      <svg
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                          fill=""
                                        />
                                      </svg>
                                    </NavLink> */}
																				<NavLink
																					to="/workstation/log-riwayat/gateway"
																					onClick={
																						handleNavLinkClick
																					}
																					className={({
																						isActive,
																					}) =>
																						"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
																						(isActive &&
																							"!text-white")
																					}
																				>
																					Log
																					Gateway
																				</NavLink>
																				{/* <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                        <li>
                                          <NavLink
                                            to="/log-riwayat/gateway"
                                            className={({ isActive }) =>
                                              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                              (isActive && '!text-white')
                                            }
                                          >
                                            Log Gateway
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/door-log"
                                            className={({ isActive }) =>
                                              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                              (isActive && '!text-white')
                                            }
                                          >
                                            Log Pintu (Face Recognition)
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div> */}
																			</React.Fragment>
																		);
																	}}
																</SidebarLinkGroup>
															</ul>
														</div>
													</React.Fragment>
												);
											}}
										</SidebarLinkGroup>
										{/* <!-- Menu Item Log Pengenalan Wajah --> */}

										{/* <!-- Menu Item Pendaftaran Wajah --> */}
										{/* <SidebarLinkGroup
                activeCondition={
                  pathname === '/pendaftaran-wajah' ||
                  pathname.includes('pendaftaran-wajah')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/pendaftaran-wajah' ||
                            pathname.includes('pendaftaran-wajah')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          fill="#FFFFFF"
                          height="18"
                          width="18"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 78.509 78.509"
                          stroke="#FFFFFF"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {' '}
                            <g>
                              {' '}
                              <path d="M68.305,51.149h-3.032v-3.031v-6h-6h-5.281c-2.281-2.832-4.785-5.04-7.03-6.974c3.829-3.723,6.22-8.918,6.22-14.668 C53.182,9.186,43.996,0,32.706,0S12.23,9.186,12.23,20.476c0,5.75,2.39,10.945,6.219,14.668 C12.318,40.425,4.205,47.729,4.205,64.26v3h33.708v2.218h6h3.033v3.031v6h6h6.326h6v-6v-3.031h3.032h6v-6V57.15v-6L68.305,51.149 L68.305,51.149z M18.23,20.476C18.23,12.494,24.724,6,32.706,6c7.981,0,14.476,6.494,14.476,14.476 c0,7.449-5.656,13.597-12.897,14.386c-0.072,0.007-0.143,0.016-0.215,0.021c-0.347,0.033-0.698,0.046-1.051,0.054 c-0.097,0.002-0.192,0.01-0.289,0.011c-0.153-0.001-0.303-0.012-0.455-0.017c-0.292-0.009-0.584-0.018-0.871-0.044 c-0.108-0.008-0.215-0.021-0.322-0.031C23.862,34.044,18.23,27.908,18.23,20.476z M22.736,39.369 c0.158-0.137,0.315-0.271,0.472-0.406c2.29,0.981,4.736,1.607,7.242,1.858c0.176,0.02,0.355,0.028,0.532,0.044 c0.469,0.036,0.939,0.062,1.411,0.071c0.105,0.001,0.207,0.016,0.312,0.016c0.078,0,0.154-0.011,0.231-0.012 c0.523-0.009,1.045-0.037,1.566-0.079c0.143-0.013,0.287-0.021,0.428-0.036c2.505-0.246,4.965-0.874,7.271-1.862 c0.155,0.135,0.313,0.27,0.472,0.406c1.415,1.217,2.872,2.48,4.272,3.887v4.862v3.031h-3.033h-6v6v4.11h-27.6 C11.187,49.303,17.297,44.047,22.736,39.369z M68.305,63.478h-9.032v9.031h-6.326v-9.031h-9.033V57.15h9.033v-9.031h6.326v9.031 h9.032V63.478z"></path>{' '}
                            </g>{' '}
                          </g>
                        </svg>
                        Pendaftaran Wajah
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink> */}
										{/* <!-- Dropdown Menu Start --> */}
										{/* <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/add-staff-face"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Petugas Lemasmil
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/add-inmate-face"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Prajurit Binaan
                            </NavLink>
                          </li>
                        </ul>
                      </div> */}
										{/* <!-- Dropdown Menu End --> */}
										{/* </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
										{/* <!-- Menu Item Pendaftaran Wajah --> */}
										{/* <!-- Menu Item Peta --> */}
										{/* <li>
                <NavLink
                  to="/peta"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('peta') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#FFFFFF"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{' '}
                    </g>
                  </svg>
                  Peta
                </NavLink>
              </li> */}

										{/* <li>
                <NavLink
                  to="/pencatatan-bap"
                  onClick={handleNavLinkClick}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('pencatatan-bap') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="18"
                    height="18"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  Pencatatan BAP
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/daftar-sidang"
                  onClick={handleNavLinkClick}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('daftar-sidang') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="18"
                    height="18"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  Daftar Sidang
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/daftar-inventaris"
                  onClick={handleNavLinkClick}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('daftar-inventaris') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="18"
                    height="18"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  Daftar Inventaris
                </NavLink>
              </li> */}

										{/* {isSuperAdmin && (
                <li>
                  <NavLink
                    to="/pengaturan-list/manajemen-pengguna"
                    onClick={handleNavLinkClick}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('manajemen-pengguna') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width="18"
                      height="18"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                    User Management
                  </NavLink>
                </li>
              )} */}
										{/* <li>
                <NavLink
                  to="/kamera-live"
                  onClick={handleNavLinkClick}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('kamera-dev-test') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="18"
                    height="18"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  Kamera Dev Test
                </NavLink>
              </li> */}
										<li>
											<NavLink
												to=""
												onClick={async (e) => {
													e.preventDefault();
													try {
														// Call the apiversion function to get the response
														const response =
															await apiversion({
																method: "GET",
																headers: {
																	"Content-Type":
																		"application/json",
																},
															});

														let versionName: string;
														const version =
															response.data.records.map(
																(a) => {
																	versionName =
																		a.version_name;
																	return versionName;
																}
															);

														// Update toast content with fetched data
														// toast(
														//   `This app version is ${version}.`,
														//   {
														//     duration: 5000,
														//   }
														// );

														if (
															versionName ==
															version
														) {
															toast.success(
																`This app version is up-to-date ( Version ${version} )`,
																{
																	duration: 5000,
																}
															);
														} else {
															toast((t) => (
																<span
																	style={{
																		...t.style,
																		animation:
																			t.visible
																				? "custom-enter 1s ease"
																				: "custom-exit 1s ease",
																	}}
																>
																	There is an
																	update from
																	version{" "}
																	{version} to
																	version{" "}
																	{
																		versionName
																	}{" "}
																	<a
																		href={
																			response
																				.data
																				.records
																				.link
																		}
																		target="_blank"
																		rel="noreferrer"
																		className="text-blue-500 bold"
																	>
																		Download
																	</a>
																	<button
																		onClick={() =>
																			toast.dismiss(
																				t.id
																			)
																		}
																		style={{
																			border: "none",
																			position:
																				"absolute",
																			right: "0.5rem",
																			top: "0.5rem",
																			cursor: "pointer",
																		}}
																	>
																		<b>X</b>
																	</button>
																</span>
															));
														}

														console.log(
															"Data:",
															response.data
																.records
														);
													} catch (error) {
														console.error(
															"Error fetching data:",
															error
														);
														toast(
															"Error fetching data",
															{ duration: 5000 }
														);
													}
												}}
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													pathname.includes(
														"version"
													) &&
													"bg-graydark dark:bg-meta-4"
												}`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													width="18"
													height="18"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
													/>
												</svg>
												Version
											</NavLink>
										</li>
									</ul>
								</div>
							</nav>
							{/* <!-- Sidebar Menu --> */}
						</div>
					</aside>
				</>
			) : (
				<>
					<aside
						ref={sidebar}
						className={`fixed top-0 z-[99] h-screen  flex flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-dark2 translate-x-0  ${
							sidebarOpen
								? "w-0 translate-x-0"
								: "w-72.5 -translate-x-full"
						}`}
					>
						{/* <!-- SIDEBAR HEADER --> */}
						<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
							{/* {!sidebarOpen && (
          // <NavLink
          //   to="#"
          //   className="flex justify-center items-center gap-x-2 w-full"
          // >
          //   <img src={Logo} alt="Logo" className="w-10" />
          //   <span className="text-xl">SIRAM Workstation</span>
          // </NavLink>
        )} */}
						</div>
						{/* <!-- SIDEBAR HEADER --> */}

						{/* <!-- SIDEBAR MENU --> */}

						<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
							{/* <!-- Sidebar Menu --> */}
							<nav className="mt-10 py-4 px-4 lg:mt-9 lg:px-6">
								{/* <!-- Menu Group --> */}
								<div>
									<h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
										MENU
									</h3>

									<ul className="mb-6 flex flex-col gap-1.5">
										{/* <!-- Menu Item Dashboard --> */}
										<li>
											<NavLink
												to="/dashboard/statistic"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													(pathname ===
														"/statistic" ||
														pathname.includes(
															"dashboard"
														)) &&
													"bg-graydark dark:bg-meta-4"
												}`}
												onClick={handleNavLinkClick}
											>
												<svg
													className="fill-current"
													width="18"
													height="18"
													viewBox="0 0 18 18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
														fill=""
													/>
													<path
														d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
														fill=""
													/>
													<path
														d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
														fill=""
													/>
													<path
														d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
														fill=""
													/>
												</svg>
												Statistik
											</NavLink>
										</li>
										{/* <!-- Menu Item Dashboard --> */}

										{/* <!-- Menu Item Kamera --> */}
										{/* <li>
                <NavLink
                  to="/kamera"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('kamera') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    fill="#FFFFFF"
                    height="18"
                    width="18"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 74.207 74.207"
                    stroke="#FFFFFF"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <g>
                        {' '}
                        <path d="M57.746,14.658h-2.757l-1.021-3.363c-0.965-3.178-3.844-5.313-7.164-5.313H28.801c-3.321,0-6.201,2.135-7.165,5.313 l-1.021,3.363h-4.153C7.385,14.658,0,22.043,0,31.121v20.642c0,9.077,7.385,16.462,16.462,16.462h41.283 c9.077,0,16.462-7.385,16.462-16.462V31.121C74.208,22.043,66.823,14.658,57.746,14.658z M68.208,51.762 c0,5.769-4.693,10.462-10.462,10.462H16.462C10.693,62.223,6,57.53,6,51.762V31.121c0-5.769,4.693-10.462,10.462-10.462h8.603 l2.313-7.621c0.192-0.631,0.764-1.055,1.423-1.055h18.003c0.659,0,1.23,0.424,1.423,1.057l2.314,7.619h7.204 c5.769,0,10.462,4.693,10.462,10.462L68.208,51.762L68.208,51.762z"></path>
                        <path d="M37.228,25.406c-8.844,0-16.04,7.195-16.04,16.04c0,8.844,7.195,16.039,16.04,16.039s16.041-7.195,16.041-16.039 C53.269,32.601,46.073,25.406,37.228,25.406z M37.228,51.486c-5.536,0-10.04-4.504-10.04-10.039c0-5.536,4.504-10.04,10.04-10.04 c5.537,0,10.041,4.504,10.041,10.04C47.269,46.982,42.765,51.486,37.228,51.486z"></path>
                      </g>{' '}
                    </g>
                  </svg>
                  Kamera
                </NavLink>
              </li> */}
										{/* <!-- Menu Item Kamera --> */}

										{/* <!-- Menu Item Peta --> */}
										<li>
											<NavLink
												to="/dashboard/peta"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													(pathname.includes(
														"peta"
													) &&
														"bg-graydark dark:bg-meta-4") ||
													(pathname === "/" &&
														"bg-graydark dark:bg-meta-4")
												}`}
												onClick={handleNavLinkClick}
											>
												<svg
													viewBox="0 0 24 24"
													width="18"
													height="18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													stroke="#FFFFFF"
												>
													<g
														id="SVGRepo_bgCarrier"
														strokeWidth="0"
													></g>
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													></g>
													<g id="SVGRepo_iconCarrier">
														{" "}
														<path
															d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
															stroke="#FFFFFF"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>{" "}
													</g>
												</svg>
												Peta
											</NavLink>
										</li>
										{/* <!-- Menu Item Peta --> */}

										{/* <!-- Menu Item Peta --> */}
										{/* <li>
                <NavLink
                  to="/live-chat-list"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('live-chat-list') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    fill="none"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    ></path>
                  </svg>
                  Live Chat
                </NavLink>
              </li> */}
										{/* <!-- Menu Item Peta --> */}
									</ul>
								</div>
							</nav>
							{/* <!-- Sidebar Menu --> */}
						</div>
					</aside>
				</>
			)}
		</>
	);
};

export default Sidebar;
