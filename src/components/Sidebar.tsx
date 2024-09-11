import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import { apiversion } from "../services/api";
import {
	checkState,
	isSidebarNotifOpen,
	NotificationAtom,
	selectedRoutess,
} from "../utils/atomstates";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	const [isNotification, setIsNotification] = useAtom(NotificationAtom);
	const [sidebarNotifOpen, setSidebarNotifOpen] = useAtom(isSidebarNotifOpen);
	const [open, setOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState<string | null>(null);
	const dataAppMoede = localStorage.getItem("appMode");
	console.log("dataAppMode", dataAppMoede);
	const [selectedMenu, setSelectedMenu] = useAtom(selectedRoutess);
	const [selectCheck, setSelectCheck] = useAtom(checkState);

	const location = useLocation();
	const { pathname } = location;

	const sidebar = useRef<any>(null);
	const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();
	const handleToggle = () => {
		setOpen(!open);
	};

	const handleMenuClick = (menu: string) => {
		setOpenMenu(openMenu === menu ? null : menu);
	};
	console.log(openMenu, "openmenu");
	const isActive = (path: string) =>
		location.pathname === path || location.pathname.startsWith(path);

	const dataUserItem = localStorage.getItem("dataUser");
	const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

	const storedSidebarExpanded = null;
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null
			? false
			: storedSidebarExpanded === "true"
	);

	const handleNavLinkClick = (name: string) => {
		console.log(name, "pathname");
		if (name === "peta") {
			localStorage.setItem("appMode", "dashboard");
			setSelectedMenu("dashboard");
			if (selectCheck) {
				setSidebarNotifOpen(true);
			} else {
				setSidebarNotifOpen(true);
			}
		} else {
			localStorage.setItem("appMode", "workstation");
			setSelectedMenu("workstation");
			setSidebarNotifOpen(true);
		}
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
	const handleClickVersion = async (e: any) => {
		e.preventDefault();
		try {
			// Call the apiversion function to get the response
			const response = await apiversion({
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			let versionName: any;
			const version = response.data.records.map((a) => {
				versionName = a.version_name;
				return versionName;
			});

			// Update toast content with fetched data
			toast(`This app version is ${version}.`, {
				duration: 5000,
			});

			console.log(versionName, "versi");
			if (versionName === version) {
				toast.success(
					`This app version is up-to-date (Version ${version})`,
					{
						duration: 5000,
					}
				);
			} else {
				toast((t) => (
					<span
						style={{
							...t.style,
							animation: t.visible
								? "custom-enter 1s ease"
								: "custom-exit 1s ease",
						}}
					>
						There is an update from version {version} to version{" "}
						{versionName}{" "}
						<a
							href={response.data.records.link}
							target="_blank"
							rel="noreferrer"
							className="text-blue-500 bold"
						>
							Download
						</a>
						<button
							onClick={() => toast.dismiss(t.id)}
							style={{
								border: "none",
								position: "absolute",
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

			console.log("Data:", response.data.records);
		} catch (error) {
			console.error("Error fetching data:", error);
			toast("Error fetching data", { duration: 5000 });
		}
	};

	// close on click outside
	useEffect(() => {
		const clickHandler = (event: any) => {
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

	useEffect(() => {
		// Reset openMenu when the location changes
		if (
			!isActive("/device-management") &&
			openMenu === "deviceManagement"
		) {
			setOpenMenu(null);
		}
	}, [location.pathname]);
	return (
		<>
			<aside
				ref={sidebar}
				className={`fixed top-0 h-screen  flex flex-col overflow-y-hidden bg-black z-999 duration-300 ease-linear dark:bg-dark2 translate-x-0  ${
					sidebarOpen
						? "w-0 translate-x-0"
						: "w-80  -translate-x-full"
				}`}
			>
				{/* <!-- SIDEBAR HEADER --> */}
				<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"></div>
				{/* <!-- SIDEBAR HEADER --> */}

				{/* <!-- SIDEBAR MENU --> */}

				<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
					{/* <!-- Sidebar Menu --> */}
					<nav className="mt-10 py-4 px-4 lg:mt-9 lg:px-4">
						{/* <!-- Menu Group --> */}
						{/*
						 */}
						<ul>
							<li>
								<NavLink
									to="/home"
									onClick={() => handleNavLinkClick("home")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/home" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										width="20"
										height="20"
										viewBox="-0.5 0 25 25"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
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
											<path
												d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z"
												stroke="#FFFFFF"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
											<path
												d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z"
												stroke="#FFFFFF"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
											<path
												d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z"
												stroke="#FFFFFF"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
											<path
												d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z"
												stroke="#FFFFFF"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
										</g>
									</svg>
									Dashboard
								</NavLink>
							</li>
							<SidebarLinkGroup
								activeCondition={
									openMenu === "deviceManagement"
								}
							>
								{(handleClick, open) => (
									<>
										<NavLink
											to="#"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												openMenu === "deviceManagement"
													? "!text-white bg-graydark dark:bg-meta-4"
													: ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleMenuClick(
													"deviceManagement"
												);
												handleClick();
											}}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M7 2C5.89543 2 5 2.89543 5 4V5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H5V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5H19V4C19 2.89543 18.1046 2 17 2H7ZM7 4H17V5H7V4ZM5 7H19V17H5V7ZM7 9V11H9V9H7ZM11 9V11H13V9H11ZM15 9V11H17V9H15ZM7 13V15H9V13H7ZM11 13V15H13V13H11ZM15 13V15H17V13H15Z"
													fill="currentColor"
												/>
											</svg>
											Manajemen Perangkat
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
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

										{/* Sub-Menu */}
										<div
											className={`translate transform overflow-hidden ${
												open ? "block" : "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
												<li>
													<SidebarLinkGroup
														activeCondition={
															openMenu ===
															"masterData"
														}
													>
														{(
															handleClick,
															open
														) => (
															<>
																<NavLink
																	to="#"
																	className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																		openMenu ===
																		"masterData"
																			? "!text-white"
																			: ""
																	}`}
																	onClick={(
																		e
																	) => {
																		e.preventDefault();
																		handleMenuClick(
																			"masterData"
																		);
																		handleClick();
																	}}
																>
																	Master Data
																	Perangkat
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

																{/* Nested Sub-Menu */}
																<div
																	className={`translate transform overflow-hidden ${
																		open
																			? "block"
																			: "hidden"
																	}`}
																>
																	<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
																		<li>
																			<NavLink
																				to="/gelang"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/gelang"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Gelang
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/gateway"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/gateway"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Gateway
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/nvr"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/nvr"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				NVR
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/tv"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/tv"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				TV
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/access-point"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/access-point"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Access
																				Point
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/nas"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/nas"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				NAS
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/access-door"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/access-door"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Access
																				Door
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/helmet"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/helmet"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Helmet
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/kamera"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/kamera"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Kamera
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/autogatedual"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/autogatedual"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Auto Gate Dual System
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/autogatesingle"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/autogatesingle"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Auto Gate Single System
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/palm-vein-access-control"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/palm-vein-access-control"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Palm Vein Access Control
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/registration-kios"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/registration-kios"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Registration Kios
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/mesin-xray"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/mesin-xray"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Mesin Xray
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/smart-locker"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/smart-locker"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Smart Locker
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/gate-parking"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/gate-parking"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Gate Parking
																			</NavLink>
																		</li>
																		<li>
																			<NavLink
																				to="/emergency-push-button"
																				className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
																					isActive(
																						"/emergency-push-button"
																					)
																						? "text-white"
																						: ""
																				}`}
																			>
																				Emergency Push Button
																			</NavLink>
																		</li>
																	</ul>
																</div>
															</>
														)}
													</SidebarLinkGroup>
												</li>
											</ul>
										</div>
									</>
								)}
							</SidebarLinkGroup>

							<SidebarLinkGroup
								activeCondition={
									pathname === "/manajemen-gedung" ||
									pathname.includes("gedung")
								}
							>
								{(handleClick, open) => (
									<>
										<NavLink
											to="#"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname ===
													"/manajemen-gedung" ||
												pathname.includes("gedung")
													? "!text-white g-graydark dark:bg-meta-4"
													: ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleClick();
											}}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H14V17H10V22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM9 4H7V6H9V4ZM17 4H15V6H17V4ZM7 8H9V10H7V8ZM15 8H17V10H15V8ZM7 12H9V14H7V12ZM15 12H17V14H15V12ZM7 16H9V18H7V16ZM15 16H17V18H15V16ZM13 8H11V10H13V8ZM11 12H13V14H11V12Z"
													fill="#fff"
												/>
											</svg>
											Manajemen Gedung
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
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
										{/* <!-- Nested Dropdown Menu Start --> */}
										<div
											className={`translate transform overflow-hidden ${
												!open && "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
												<li>
													<NavLink
														to="/manajemen-gedung/gedung"
														onClick={() =>
															handleNavLinkClick(
																"gedung"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-gedung/gedung" &&
															"!text-white"
														}`}
													>
														Gedung
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/manajemen-gedung/data-lantai"
														onClick={() =>
															handleNavLinkClick(
																"lantai"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-gedung/data-lantai" &&
															"!text-white"
														}`}
													>
														Lantai
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/manajemen-gedung/ruangan"
														onClick={() =>
															handleNavLinkClick(
																"firmware"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-gedung/ruangan" &&
															"!text-white"
														}`}
													>
														Ruangan
													</NavLink>
												</li>
											</ul>
										</div>
										{/* <!-- Nested Dropdown Menu End --> */}
									</>
								)}
							</SidebarLinkGroup>

							<SidebarLinkGroup
								activeCondition={
									pathname === "/manajemen-pegawai" ||
									pathname.includes("pegawai")
								}
							>
								{(handleClick, open) => (
									<>
										<NavLink
											to="#"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname ===
													"/manajemen-pegawai" ||
												pathname.includes("pegawai")
													? "!text-white g-graydark dark:bg-meta-4"
													: ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleClick();
											}}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2ZM7 5C7 2.23858 9.23858 0 12 0C14.7614 0 17 2.23858 17 5C17 7.76142 14.7614 10 12 10C9.23858 10 7 7.76142 7 5ZM4 22C4 18.6863 6.68629 16 10 16H14C17.3137 16 20 18.6863 20 22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22ZM18 22C18 19.7909 16.2091 18 14 18H10C7.79086 18 6 19.7909 6 22H18Z"
													fill="#fff"
												/>
											</svg>
											Manajemen Pegawai
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
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
										{/* <!-- Nested Dropdown Menu Start --> */}
										<div
											className={`translate transform overflow-hidden ${
												!open && "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
												<li>
													<NavLink
														to="/manajemen-pegawai/departemen"
														onClick={() =>
															handleNavLinkClick(
																"departemen"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-pegawai/departemen" &&
															"!text-white"
														}`}
													>
														Departemen
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/manajemen-pegawai/hak-akses"
														onClick={() =>
															handleNavLinkClick(
																"pegawai"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-pegawai/hak-akses" &&
															"!text-white"
														}`}
													>
														Hak Akses Staff
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/manajemen-pegawai/staff"
														onClick={() =>
															handleNavLinkClick(
																"pegawai"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-pegawai/staff" &&
															"!text-white"
														}`}
													>
														Staff
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/manajemen-pegawai/jabatan"
														onClick={() =>
															handleNavLinkClick(
																"device-type"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-pegawai/jabatan" &&
															"!text-white"
														}`}
													>
														Jabatan
													</NavLink>
												</li>
											</ul>
										</div>
										{/* <!-- Nested Dropdown Menu End --> */}
									</>
								)}
							</SidebarLinkGroup>

							<SidebarLinkGroup
								activeCondition={
									pathname === "/manajemen-pengunjung" ||
									pathname.includes("pegawai")
								}
							>
								{(handleClick, open) => (
									<>
										<NavLink
											to="#"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname ===
													"/manajemen-pengunjung" ||
												pathname.includes("pengunjung")
													? "!text-white g-graydark dark:bg-meta-4"
													: ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleClick();
											}}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M9 2C7.34315 2 6 3.34315 6 5C6 6.65685 7.34315 8 9 8C10.6569 8 12 6.65685 12 5C12 3.34315 10.6569 2 9 2ZM4 5C4 2.23858 6.23858 0 9 0C11.7614 0 14 2.23858 14 5C14 7.76142 11.7614 10 9 10C6.23858 10 4 7.76142 4 5ZM15 8C13.3431 8 12 9.34315 12 11C12 12.6569 13.3431 14 15 14C16.6569 14 18 12.6569 18 11C18 9.34315 16.6569 8 15 8ZM10 11C10 8.23858 12.2386 6 15 6C17.7614 6 20 8.23858 20 11C20 13.7614 17.7614 16 15 16C12.2386 16 10 13.7614 10 11ZM9 12H14C16.7614 12 19 14.2386 19 17V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V17C5 14.2386 7.23858 12 10 12ZM7 19H17V17C17 15.3431 15.6569 14 14 14H10C8.34315 14 7 15.3431 7 17V19Z"
													fill="#fff"
												/>
											</svg>
											Manajemen Pengunjung
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
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
										{/* <!-- Nested Dropdown Menu Start --> */}
										<div
											className={`translate transform overflow-hidden ${
												!open && "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
												<li>
													<NavLink
														to="/manajemen-pengunjung/pengunjung"
														onClick={() =>
															handleNavLinkClick(
																"pengunjung"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-pengunjung/departemen" &&
															"!text-white"
														}`}
													>
														Penunjung
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/manajemen-pengunjung/hak-akses-pengunjung"
														onClick={() =>
															handleNavLinkClick(
																"hak-akses-pengunjung"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/manajemen-pengunjung/hak-akses-pengunjung" &&
															"!text-white"
														}`}
													>
														Hak Akses Pengunjung
													</NavLink>
												</li>
											</ul>
										</div>
										{/* <!-- Nested Dropdown Menu End --> */}
									</>
								)}
							</SidebarLinkGroup>

							<SidebarLinkGroup
								activeCondition={
									pathname === "/sistem-monitoring" ||
									pathname.includes("pegawai")
								}
							>
								{(handleClick, open) => (
									<>
										<NavLink
											to="#"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname ===
													"/sistem-monitoring" ||
												pathname.includes("monitoring")
													? "!text-white g-graydark dark:bg-meta-4"
													: ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleClick();
											}}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M2 3C2 1.89543 2.89543 1 4 1H20C21.1046 1 22 1.89543 22 3V17C22 18.1046 21.1046 19 20 19H13V21H16C16.5523 21 17 21.4477 17 22C17 22.5523 16.5523 23 16 23H8C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21H11V19H4C2.89543 19 2 18.1046 2 17V3ZM4 3H20V17H4V3ZM6 5H18V15H6V5ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7Z"
													fill="#fff"
												/>
											</svg>
											Sistem Monitoring
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
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
										{/* <!-- Nested Dropdown Menu Start --> */}
										<div
											className={`translate transform overflow-hidden ${
												!open && "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
												<li>
													<NavLink
														to="/sistem-monitoring/kamera-live"
														onClick={() =>
															handleNavLinkClick(
																"kamera-live"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/sistem-monitoring/kamera-live" &&
															"!text-white"
														}`}
													>
														Live View
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/sistem-monitoring/kamera-playback"
														onClick={() =>
															handleNavLinkClick(
																"kamera-playback"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/sistem-monitoring/kamera-playback" &&
															"!text-white"
														}`}
													>
														Playback
													</NavLink>
												</li>
											</ul>
										</div>
										{/* <!-- Nested Dropdown Menu End --> */}
									</>
								)}
							</SidebarLinkGroup>

							<li>
								<NavLink
									to="/daftar-inventaris"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname.includes(
											"daftar-inventaris"
										) && "bg-graydark dark:bg-meta-4"
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
											d="M3 3.75H21V20.25H3V3.75Z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 8.25H18M6 12H18M6 15.75H18"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 6.75H9.01M15 6.75H15.01M12 6.75H12.01"
										/>
									</svg>
									Inventory
								</NavLink>
							</li>

							<SidebarLinkGroup
								activeCondition={
									pathname === "/sistem-monitoring" ||
									pathname.includes("pegawai")
								}
							>
								{(handleClick, open) => (
									<>
										<NavLink
											to="#"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname === "/absensi" ||
												pathname.includes("absensi")
													? "!text-white g-graydark dark:bg-meta-4"
													: ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleClick();
											}}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M19 4H18V2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V4H8V2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM5 8H19V20H5V8ZM7 10H9V12H7V10ZM11 10H13V12H11V10ZM15 10H17V12H15V10ZM7 14H9V16H7V14ZM11 14H13V16H11V14ZM15 14H17V16H15V14Z"
													fill="#fff"
												/>
											</svg>
											Absensi
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
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
										{/* <!-- Nested Dropdown Menu Start --> */}
										<div
											className={`translate transform overflow-hidden ${
												!open && "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
												<li>
													<NavLink
														to="/absensi/calendar-shift"
														onClick={() =>
															handleNavLinkClick(
																"calendar-shift"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/absensi/calendar-shift" &&
															"!text-white"
														}`}
													>
														Jadwal Shift Kerja
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/absensi/group-shift"
														onClick={() =>
															handleNavLinkClick(
																"group-shift"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/absensi/group-shift" &&
															"!text-white"
														}`}
													>
														Grup Petugas Shift
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/absensi/data-schedule-shift"
														onClick={() =>
															handleNavLinkClick(
																"data-schedule-shift"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/absensi/data-schedule-shift" &&
															"!text-white"
														}`}
													>
														Data Shift
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/absensi/penugasan"
														onClick={() =>
															handleNavLinkClick(
																"penugasan"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/absensi/penugasan" &&
															"!text-white"
														}`}
													>
														Data Penugasan
													</NavLink>
												</li>
											</ul>
										</div>
										{/* <!-- Nested Dropdown Menu End --> */}
									</>
								)}
							</SidebarLinkGroup>

							{/* statistik */}
							{/* <li>
								<NavLink
									to="/statistic"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/statistic" &&
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
										viewBox="0 0 24 24"
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
											<path
												d="M3 17h2c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm5 0h2c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1zm5 0h2c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v5c0 .55.45 1 1 1zm5 0h2c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1z"
												stroke="#FFFFFF"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
										</g>
									</svg>
									Statistik
								</NavLink>
							</li> */}
							{/* <!-- Menu Item Aktifitas Pengunjung --> */}
							{/* <li>
								<NavLink
									to="/staff"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname.includes("staff") &&
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
									Staff
								</NavLink>
							</li> */}

							{/* <!-- Menu Item Kamera --> */}
							{/* <li>
								<NavLink
									to="/kamera-live"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/kamera-live" &&
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
									Kamera Live
								</NavLink>
							</li> */}
							{/* <!-- Menu Item Kamera --> */}

							{/* <!-- Menu Item Gelang --> */}
							{/* <li>
								<NavLink
									to="/gelang"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/gelang" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										fill="#fff"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										id="Layer_1"
										data-name="Layer 1"
										xmlns="http://www.w3.org/2000/svg"
									>
										<defs></defs>
										<circle
											className="cls-1"
											cx="7.2"
											cy="12"
											r="5.73"
										/>
										<path
											className="cls-1"
											d="M9.11,12A1.91,1.91,0,1,1,7.2,10.09"
										/>
										<polyline
											className="cls-1"
											points="2.43 8.84 3.38 1.5 11.02 1.5 11.97 8.84"
										/>
										<polyline
											className="cls-1"
											points="11.97 15.16 11.02 22.5 3.38 22.5 2.43 15.16"
										/>
										<line
											className="cls-1"
											x1="14.84"
											y1="12"
											x2="12.93"
											y2="12"
										/>
										<path
											className="cls-1"
											d="M16.58,9.3a3.82,3.82,0,0,1,0,5.4"
										/>
										<path
											className="cls-1"
											d="M19.13,6.75a7.42,7.42,0,0,1,0,10.5"
										/>
									</svg>
									Gelang
								</NavLink>
							</li> */}
							{/* <!-- Menu Item Gelang --> */}

							{/* <!-- Menu Item Manajemen Pengguna --> */}
							{/* {isSuperAdmin && (
								<li>
									<NavLink
										to="/manajemen-pengguna"
										onClick={() =>
											handleNavLinkClick("petas")
										}
										className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
											pathname ===
												"/manajemen-pengguna" &&
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
										Manajemen Pengguna
									</NavLink>
								</li>
							)} */}
							{/* <!-- Menu Item Smartwatch --> */}
							{/* <SidebarLinkGroup
								activeCondition={
									pathname === "/smartwatch" ||
									pathname.includes("smartwatch")
								}
							>
								{(handleClick, open) => (
									<>
										<NavLink
											to="#"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname === "/smartwatch" ||
												pathname.includes("smartwatch")
													? "!text-white g-graydark dark:bg-meta-4"
													: ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleClick();
											}}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M7 3V4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20L7 21C7 22.6569 8.34315 24 10 24H14C15.6569 24 17 22.6569 17 21V20C18.6569 20 20 18.6569 20 17V13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V7C20 5.34315 18.6569 4 17 4V3C17 1.34315 15.6569 0 14 0H10C8.34315 0 7 1.34315 7 3ZM10 2C9.44772 2 9 2.44772 9 3V4H15V3C15 2.44772 14.5523 2 14 2H10ZM7 18C6.44772 18 6 17.5523 6 17V7C6 6.44771 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18H7ZM9 20H15V21C15 21.5523 14.5523 22 14 22H10C9.44772 22 9 21.5523 9 21V20Z"
													fill="#fffF"
												/>
											</svg>
											Smartwatch
											<svg
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
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
												!open && "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
												<li>
													<NavLink
														to="/smartwatch"
														onClick={() =>
															handleNavLinkClick(
																"smartwatch"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/smartwatch" &&
															"!text-white"
														}`}
													>
														Device
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/smartwatch/device-type"
														onClick={() =>
															handleNavLinkClick(
																"device-type"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/smartwatch/device-type" &&
															"!text-white"
														}`}
													>
														Tipe Device
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/smartwatch/firmware"
														onClick={() =>
															handleNavLinkClick(
																"firmware"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/smartwatch/firmware" &&
															"!text-white"
														}`}
													>
														Firmware
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/smartwatch/platform"
														onClick={() =>
															handleNavLinkClick(
																"platform"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/smartwatch/platform" &&
															"!text-white"
														}`}
													>
														Platform
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/smartwatch/manufacture"
														onClick={() =>
															handleNavLinkClick(
																"manufacture"
															)
														}
														className={`${"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "} ${
															pathname ===
																"/smartwatch/manufacture" &&
															"!text-white"
														}`}
													>
														Manufacture
													</NavLink>
												</li>
											</ul>
										</div>
									
									</>
								)}
							</SidebarLinkGroup> */}
							{/* <li>
								<NavLink
									to="/kamera"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/kamera" &&
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
											</g>
										</g>
									</svg>
									Kamera
								</NavLink>
							</li> */}
							{/* <li>
								<NavLink
									to="/gateway"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/gateway" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										fill="#fff"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M9.2255 5.33199C8.92208 5.86298 8.93352 6.58479 9.55278 6.89443C10.3201 7.27808 10.7664 6.59927 11.1323 6.04284C11.4473 5.56389 11.8013 5.11292 12.2071 4.70711C13.0981 3.8161 14.3588 3 16 3C17.6412 3 18.9019 3.8161 19.7929 4.70711C20.1967 5.11095 20.5495 5.5595 20.8632 6.03593C21.2289 6.59127 21.6809 7.27759 22.4472 6.89443C23.0634 6.58633 23.0765 5.86043 22.7745 5.33199C22.7019 5.20497 22.5962 5.02897 22.4571 4.8203C22.1799 4.40465 21.7643 3.8501 21.2071 3.29289C20.0981 2.1839 18.3588 1 16 1C13.6412 1 11.9019 2.1839 10.7929 3.29289C10.2357 3.8501 9.82005 4.40465 9.54295 4.8203C9.40383 5.02897 9.29809 5.20497 9.2255 5.33199Z" />
										<path
											d="M14.4762 6.71292C14.2768 6.90911 14.1223 7.10809 14.0182 7.2579C13.6696 7.75991 13.1966 8.23817 12.5294 7.88235C11.9766 7.58751 11.8923 6.8973 12.193 6.39806C12.2358 6.327 12.2967 6.23053 12.3755 6.1171C12.5319 5.89191 12.7649 5.59089 13.0738 5.28708C13.6809 4.68987 14.6689 4 15.9999 4C17.3309 4 18.3189 4.68986 18.9261 5.28706C19.235 5.59087 19.468 5.89188 19.6244 6.11707C19.7031 6.2305 19.764 6.32697 19.8069 6.39803C20.1082 6.8983 20.0212 7.58858 19.4705 7.88233C18.8032 8.23829 18.3304 7.76001 17.9817 7.25793C17.8776 7.10812 17.7231 6.90913 17.5236 6.71294C17.1141 6.31014 16.6021 6 15.9999 6C15.3977 6 14.8857 6.31013 14.4762 6.71292Z"
											fill="#fff"
										/>
										<path
											d="M5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20C5.55228 20 6 19.5523 6 19C6 18.4477 5.55228 18 5 18Z"
											fill="#fff"
										/>
										<path
											d="M7 19C7 18.4477 7.44771 18 8 18C8.55229 18 9 18.4477 9 19C9 19.5523 8.55229 20 8 20C7.44771 20 7 19.5523 7 19Z"
											fill="#fff"
										/>
										<path
											d="M10 19C10 18.4477 10.4477 18 11 18C11.5523 18 12 18.4477 12 19C12 19.5523 11.5523 20 11 20C10.4477 20 10 19.5523 10 19Z"
											fill="#fff"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M15 8C15 7.44771 15.4477 7 16 7C16.5523 7 17 7.44771 17 8V15H20C21.6569 15 23 16.3431 23 18V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V18C1 16.3431 2.34315 15 4 15H15V8ZM20 17C20.5523 17 21 17.4477 21 18V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V18C3 17.4477 3.44772 17 4 17H20Z"
											fill="#fff"
										/>
									</svg>
									Gateway
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/nvr"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/nvr" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										width="18"
										height="18"
										viewBox="0 -1 24 24"
										id="meteor-icon-kit__regular-harddisk"
										fill="#fff"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M21.4255 14.0297L19.3229 2.81565C19.2342 2.34269 18.8213 1.99995 18.34 1.99995H5.65995C5.17874 1.99995 4.76577 2.34269 4.67709 2.81565L2.57445 14.0297C2.7135 14.01 2.85562 13.9998 3.00013 13.9998H20.9999C21.1444 13.9998 21.2865 14.01 21.4255 14.0297zM23.8305 16.0036C23.9379 16.3089 23.9974 16.6368 23.9997 16.9784C24.0001 16.9922 24.0001 17.006 23.9998 17.0198V18.9997C23.9998 20.6565 22.6567 21.9996 20.9999 21.9996H3.00013C1.3433 21.9996 0.000179629 20.6565 0.000179629 18.9997V17.0198C-0.0000818531 17.006 -0.0000585857 16.9922 0.00025419 16.9784C0.00263729 16.6368 0.0620835 16.3089 0.169533 16.0036L2.71137 2.44708C2.97742 1.02818 4.21632 -0.000015 5.65995 -0.000015H18.34C19.7837 -0.000015 21.0226 1.02818 21.2886 2.44708L23.8305 16.0036zM21.9011 16.5658C21.7395 16.2309 21.3967 15.9997 20.9999 15.9997H3.00013C2.60333 15.9997 2.2605 16.2309 2.09893 16.5658L2.00015 17.0927V18.9997C2.00015 19.552 2.44786 19.9997 3.00013 19.9997H20.9999C21.5521 19.9997 21.9998 19.552 21.9998 18.9997V17.0927L21.9011 16.5658zM16.9999 16.9997C17.5522 16.9997 17.9999 17.4474 17.9999 17.9997C17.9999 18.552 17.5522 18.9997 16.9999 18.9997C16.4476 18.9997 15.9999 18.552 15.9999 17.9997C15.9999 17.4474 16.4476 16.9997 16.9999 16.9997zM19.9999 16.9997C20.5521 16.9997 20.9999 17.4474 20.9999 17.9997C20.9999 18.552 20.5521 18.9997 19.9999 18.9997C19.4476 18.9997 18.9999 18.552 18.9999 17.9997C18.9999 17.4474 19.4476 16.9997 19.9999 16.9997z"
											fill="#fff"
										/>
									</svg>
									NVR
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/tv"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/tv" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 1024 1024"
										className="icon"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M758.8 756.6c16.8 40 7.2 84.1-33.3 84.1H303.4c-40.5 0-50.1-44.1-33.3-84.1H150c-46.4 0-84-37.7-84-84.3v-420c0-46.6 37.4-84.3 84-84.3h728.9c46.4 0 84 37.7 84 84.3v419.9c0 46.6-37.4 84.3-84 84.3H758.8v0.1z"
											fill="#5E676F"
										/>
										<path
											d="M689.9 756.6c13.2 9.7 20.2 28 20.2 28H318.8s7-18.3 20.2-28h350.9zM122.1 252.3v419.9c0 15.7 12.5 28.3 27.9 28.3h728.9c15.5 0 27.9-12.5 27.9-28.3V252.3c0-15.7-12.5-28.3-27.9-28.3H150c-15.5 0.1-27.9 12.6-27.9 28.3z"
											fill="#FFFFFF"
										/>
										<path
											d="M150.1 307.9c0-30.8 25.1-55.8 56-55.8h616.8c30.9 0 56 25 56 55.8v308.8c0 30.8-25.1 55.8-56 55.8H206.1c-30.9 0-56-25-56-55.8V307.9z"
											fill="#5E676F"
										/>
										<path
											d="M178.1 307.9v308.8c0 15.3 12.5 27.8 27.9 27.8h616.8c15.4 0 27.9-12.5 27.9-27.8V307.9c0-15.3-12.5-27.8-27.9-27.8H206.1c-15.4 0-28 12.5-28 27.8z"
											fill="#none"
										/>
									</svg>
									TV
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/access-point"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/access-point" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns="http://www.w3.org/1999/xlink"
									>
										<title>
											ic_fluent_router_24_regular
										</title>
										<desc>Created with Sketch.</desc>
										<g
											id="🔍-System-Icons"
											stroke="none"
											stroke-width="1"
											fill="none"
											fill-rule="evenodd"
										>
											<g
												id="ic_fluent_router_24_regular"
												fill="#fff"
												fill-rule="nonzero"
											>
												<path
													d="M12,8 C13.6569,8 15,9.34315 15,11 C15,12.3371217 14.1252318,13.4699388 12.9168031,13.8573433 L12.75,13.9055 L12.75,16 L18,16 C19.6569,16 21,17.3431 21,19 C21,20.597725 19.7511226,21.903664 18.1762773,21.9949075 L18,22 L6,22 C4.34315,22 3,20.6569 3,19 C3,17.402275 4.24892392,16.096336 5.82372764,16.0050925 L6,16 L11.25,16 L11.25,13.9055 C9.95608,13.5725 9,12.3979 9,11 C9,9.34315 10.3431,8 12,8 Z M18,17.5 L6,17.5 C5.17157,17.5 4.5,18.1716 4.5,19 C4.5,19.8284 5.17157,20.5 6,20.5 L18,20.5 C18.8284,20.5 19.5,19.8284 19.5,19 C19.5,18.1716 18.8284,17.5 18,17.5 Z M12,9.5 C11.1716,9.5 10.5,10.1716 10.5,11 C10.5,11.8284 11.1716,12.5 12,12.5 C12.8284,12.5 13.5,11.8284 13.5,11 C13.5,10.1716 12.8284,9.5 12,9.5 Z M12,2 C16.9706,2 21,6.02944 21,11 L21,11.25 C21,11.6642 20.6642,12 20.25,12 C19.8358,12 19.5,11.6642 19.5,11.25 L19.5,11 C19.5,6.85786 16.1421,3.5 12,3.5 C7.85786,3.5 4.5,6.85786 4.5,11 L4.5,11.25 C4.5,11.6642 4.16421,12 3.75,12 C3.33579,12 3,11.6642 3,11.25 L3,11 C3,6.02944 7.02944,2 12,2 Z M12,5 C15.3137,5 18,7.68629 18,11 L18,11.25 C18,11.6642 17.6642,12 17.25,12 C16.8358,12 16.5,11.6642 16.5,11.25 L16.5,11 C16.5,8.51472 14.4853,6.5 12,6.5 C9.51472,6.5 7.5,8.51472 7.5,11 L7.5,11.25 C7.5,11.6642 7.16421,12 6.75,12 C6.33579,12 6,11.6642 6,11.25 L6,11 C6,7.68629 8.68629,5 12,5 Z"
													id="🎨-Color"
												></path>
											</g>
										</g>
									</svg>
									Access Point
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/nas"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/nas" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 48 48"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>data-storage-network</title>
										<g id="Layer_2" data-name="Layer 2">
											<g
												id="invisible_box"
												data-name="invisible box"
											>
												<rect
													width="48"
													height="48"
													fill="none"
												/>
											</g>
											<g
												id="icons_Q2"
												data-name="icons Q2"
												fill="#fff"
											>
												<g>
													<circle
														cx="38"
														cy="24"
														r="2"
													/>
													<circle
														cx="32"
														cy="24"
														r="2"
													/>
													<path d="M44,4H4A2,2,0,0,0,2,6V30a2,2,0,0,0,2,2H22v4.4A5.1,5.1,0,0,0,19.4,39H7.2a2,2,0,0,0,0,4H19.4a5,5,0,0,0,9.2,0H41a2,2,0,0,0,0-4H28.6A5.1,5.1,0,0,0,26,36.4V32H44a2,2,0,0,0,2-2V6A2,2,0,0,0,44,4ZM24,42a1,1,0,1,1,1-1A.9.9,0,0,1,24,42ZM6,8H42v8H6ZM42,28H6V20H42Z" />
													<circle
														cx="38"
														cy="12"
														r="2"
													/>
													<circle
														cx="32"
														cy="12"
														r="2"
													/>
												</g>
											</g>
										</g>
									</svg>
									NAS
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/access-door"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/access-door" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 1024 1024"
										className="icon"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M706.4 482.2v362.1c0 61.5-49.9 111.3-111.4 111.3H260.8c-61.5 0-111.4-49.8-111.4-111.5V176c0-61.6 49.9-111.5 111.4-111.5H595c61.5 0 111.4 50.1 111.4 111.3v139.3h83.5c46.2 0 83.5 37.2 83.5 83.5 0 46.2-37.3 83.5-83.5 83.5h-83.5v0.1z"
											fill="#5E676F"
										/>
										<path
											d="M400.1 398.7c0 15.5 12.4 27.8 27.9 27.8h362c15.5 0 27.9-12.4 27.9-27.8 0-15.5-12.4-27.8-27.9-27.8H428c-15.6-0.1-27.9 12.3-27.9 27.8z"
											fill="#FFFFFF"
										/>
										<path
											d="M539.3 315.1c-25.7-34.2-66.5-55.7-111.4-55.7-76.9 0-139.2 62.3-139.2 139.2S351 537.9 427.9 537.9c44.9 0 85.7-21.5 111.4-55.7H427.9c-46.2 0-83.5-37.2-83.5-83.5 0-46.2 37.3-83.5 83.5-83.5h111.4v-0.1z"
											fill="#FFFFFF"
										/>
										<path
											d="M650.7 315.1V175.8c0-30.6-25-55.6-55.7-55.6H260.8c-30.7 0-55.7 25-55.7 55.8v668.1c0 30.9 24.9 55.8 55.7 55.8H595c30.7 0 55.7-24.9 55.7-55.6V482.2h-78c-28.9 49.9-82.9 83.5-144.7 83.5-92.3 0-167.1-74.8-167.1-167.1S335.7 231.5 428 231.5c61.8 0 115.8 33.6 144.7 83.5h78v0.1z"
											fill="#FFFFFF"
										/>
										<path
											d="M427.9 788.6c-46.1 0-83.5-37.4-83.5-83.5s37.4-83.5 83.5-83.5 83.5 37.4 83.5 83.5c0 46-37.4 83.5-83.5 83.5z"
											fill="#5E676F"
										/>
										<path
											d="M427.9 760.7c30.8 0 55.7-24.9 55.7-55.7s-24.9-55.7-55.7-55.7c-30.8 0-55.7 24.9-55.7 55.7 0 30.8 24.9 55.7 55.7 55.7z"
											fill="#FFFFFF"
										/>
									</svg>
									Access Door
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/helmet"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/helmet" &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<svg
										fill="#fff"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M11.27,1.023A11.2,11.2,0,0,0,1,12.343V14a6.006,6.006,0,0,0,5,5.91V22a1,1,0,0,0,2,0V19.91a5.994,5.994,0,0,0,3.769-2.284A9.008,9.008,0,0,0,20,23a1,1,0,0,0,.98-.8l2-10A1.807,1.807,0,0,0,23,12,11,11,0,0,0,11.27,1.023ZM7,15a1,1,0,1,1,1-1A1,1,0,0,1,7,15Zm12.189,5.953A7.009,7.009,0,0,1,13,14V13h7.78ZM12,11a1,1,0,0,0-1,1v2a4,4,0,0,1-3,3.858V16.816a3,3,0,1,0-2,0v1.042A4,4,0,0,1,3,14V12.343A9.2,9.2,0,0,1,11.4,3.02,9.006,9.006,0,0,1,20.946,11Z" />
									</svg>
									Helmet
								</NavLink>
							</li> */}

							{/* <!-- Menu Item Log Pengenalan Wajah --> */}
							<SidebarLinkGroup
								activeCondition={
									pathname === "/log" ||
									pathname.includes("log")
								}
							>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													(pathname === "/log" ||
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
														open && "rotate-180"
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
													!open && "hidden"
												}`}
											>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
													<SidebarLinkGroup
														activeCondition={
															pathname ===
																"/log" ||
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
																		to="/log-realtime"
																		// to="/log-riwayat/realtime"
																		onClick={() =>
																			handleNavLinkClick(
																				"petas"
																			)
																		}
																		className={({
																			isActive,
																		}) =>
																			"group relative flex items-center gap-2.5 rounded-md px-4 py-2  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
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
																"/log" ||
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
																		to="/staff-log"
																		onClick={() =>
																			handleNavLinkClick(
																				"petas"
																			)
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
																		Staff
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
							{/* peta */}
							{/*
							<li>
								<NavLink
									to="/"
									onClick={() => handleNavLinkClick("petas")}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/" &&
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
										viewBox="0 0 24 24"
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
											<path
												d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
												stroke="#FFFFFF"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
										</g>
									</svg>
									Peta
								</NavLink>
							</li>
							 */}

							<li>
								<NavLink
									to=""
									// onClick={async (e) => {
									//   e.preventDefault();
									//   try {
									//     // Call the apiversion function to get the response
									//     const response = await apiversion({
									//       method: "GET",
									//       headers: {
									//         "Content-Type": "application/json",
									//       },
									//     });

									//     let versionName: string;
									//     const version = response.data.records.map((a) => {
									//       versionName = a.version_name;
									//       return versionName;
									//     });

									//     // Update toast content with fetched data
									//     // toast(
									//     //   `This app version is ${version}.`,
									//     //   {
									//     //     duration: 5000,
									//     //   }
									//     // );

									//     if (versionName == version) {
									//       toast.success(
									//         `This app version is up-to-date ( Version ${version} )`,
									//         {
									//           duration: 5000,
									//         }
									//       );
									//     } else {
									//       toast((t) => (
									//         <span
									//           style={{
									//             ...t.style,
									//             animation: t.visible
									//               ? "custom-enter 1s ease"
									//               : "custom-exit 1s ease",
									//           }}
									//         >
									//           There is an update from version {version} to
									//           version {versionName}{" "}
									//           <a
									//             href={response.data.records.link}
									//             target="_blank"
									//             rel="noreferrer"
									//             className="text-blue-500 bold"
									//           >
									//             Download
									//           </a>
									//           <button
									//             onClick={() => toast.dismiss(t.id)}
									//             style={{
									//               border: "none",
									//               position: "absolute",
									//               right: "0.5rem",
									//               top: "0.5rem",
									//               cursor: "pointer",
									//             }}
									//           >
									//             <b>X</b>
									//           </button>
									//         </span>
									//       ));
									//     }

									//     console.log("Data:", response.data.records);
									//   } catch (error) {
									//     console.error("Error fetching data:", error);
									//     toast("Error fetching data", { duration: 5000 });
									//   }
									// }}
									onClick={handleClickVersion}
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname.includes("version") &&
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
										<circle
											cx="12"
											cy="12"
											r="9"
											stroke="currentColor"
											strokeWidth="1.5"
											fill="none"
										/>
										<text
											x="12"
											y="16"
											fontFamily="Arial, sans-serif"
											fontSize="12"
											fontWeight="bold"
											fill="currentColor"
											textAnchor="middle"
										>
											I
										</text>
									</svg>
									Version
								</NavLink>
							</li>
						</ul>
					</nav>
					{/* <!-- Sidebar Menu --> */}
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
