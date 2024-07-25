import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import SidebarLinkGroup from "./SidebarLinkGroup";
import {
  selectedRoutess,
  isSidebarNotifOpen,
  NotificationAtom,
  checkState,
} from "../utils/atomstates";
import toast, { Toaster } from "react-hot-toast";
import { apiversion } from "../services/api";
import { useAtom } from "jotai";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [isNotification, setIsNotification] = useAtom(NotificationAtom);
  const [sidebarNotifOpen, setSidebarNotifOpen] = useAtom(isSidebarNotifOpen);
  const [open, setOpen] = useState(false);
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
  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
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
        toast.success(`This app version is up-to-date (Version ${version})`, {
          duration: 5000,
        });
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
            There is an update from version {version} to version {versionName}{" "}
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
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      <aside
        ref={sidebar}
        className={`fixed top-0 h-screen  flex flex-col overflow-y-hidden bg-black z-999 duration-300 ease-linear dark:bg-dark2 translate-x-0  ${
          sidebarOpen ? "w-0 translate-x-0" : "w-72.5 -translate-x-full"
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
            <div>
              <button
                onClick={handleToggle}
                className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 w-full"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
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
                <svg
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transform ${
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
              </button>
              {open && (
                <ul className="mb-6 flex flex-col gap-1.5 ml-2">
                  {/* <!-- Menu Item Aktifitas Pengunjung --> */}
                  <li>
                    <NavLink
                      to="/dashboard/staff"
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
                  </li>

                  {/* <!-- Menu Item Kamera --> */}
                  <li>
                    <NavLink
                      to="/dashboard/kamera-live"
                      onClick={() => handleNavLinkClick("petas")}
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname === "/dashboard/kamera-live" &&
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
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
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

                  {/* <!-- Menu Item Pengaturan --> */}
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/workstation/pengaturan-list" ||
                      pathname.includes("setting-list")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              (pathname === "/workstation/pengaturan-list" ||
                                pathname.includes("setting-list")) &&
                              "bg-graydark dark:bg-meta-4"
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
                                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                              ></path>
                            </svg>
                            Pengaturan
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
                          {/* <!-- Dropdown Menu Start --> */}
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && "hidden"
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6 ml-4">
                              {isSuperAdmin && (
                                <li>
                                  <NavLink
                                    to="/dashboard/pengaturan-list/manajemen-pengguna"
                                    onClick={() => handleNavLinkClick("petas")}
                                    className={({ isActive }) =>
                                      "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                      (isActive && "!text-white")
                                    }
                                  >
                                    Manajemen Pengguna
                                  </NavLink>
                                </li>
                              )}
                              <li>
                                <NavLink
                                  to="/dashboard/pengaturan-list/perangkat/smartwatch"
                                  onClick={() => handleNavLinkClick("petas")}
                                  className={({ isActive }) =>
                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                    (isActive && "!text-white")
                                  }
                                >
                                  Smartwatch
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/dashboard/pengaturan-list/perangkat/kamera"
                                  onClick={() => handleNavLinkClick("petas")}
                                  className={({ isActive }) =>
                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                    (isActive && "!text-white")
                                  }
                                >
                                  Kamera
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/dashboard/pengaturan-list/perangkat/gateway"
                                  onClick={() => handleNavLinkClick("petas")}
                                  className={({ isActive }) =>
                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                    (isActive && "!text-white")
                                  }
                                >
                                  Gateway
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/dashboard/pengaturan-list/perangkat/helmet"
                                  onClick={() => handleNavLinkClick("petas")}
                                  className={({ isActive }) =>
                                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                    (isActive && "!text-white")
                                  }
                                >
                                  Helmet
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
                      pathname === "/workstation/log" ||
                      pathname.includes("log")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              (pathname === "/workstation/log" ||
                                pathname.includes("log")) &&
                              "bg-graydark dark:bg-meta-4"
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
                                  pathname === "/workstation/log" ||
                                  pathname.includes("log")
                                }
                              >
                                {(handleClick, open) => {
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
                                        to="/dashboard/log-realtime"
                                        // to="/workstation/log-riwayat/realtime"
                                        onClick={() =>
                                          handleNavLinkClick("petas")
                                        }
                                        className={({ isActive }) =>
                                          "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                          (isActive && "!text-white")
                                        }
                                      >
                                        Log Realtime
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
                                  pathname === "/workstation/log" ||
                                  pathname.includes("log")
                                }
                              >
                                {(handleClick, open) => {
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
                                        to="/dashboard/staff-log"
                                        onClick={() =>
                                          handleNavLinkClick("petas")
                                        }
                                        className={({ isActive }) =>
                                          "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                          (isActive && "!text-white")
                                        }
                                      >
                                        Log Staff
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
                   onClick={() => handleNavLinkClick("petas")}
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
                   onClick={() => handleNavLinkClick("petas")}
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
                   onClick={() => handleNavLinkClick("petas")}
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
                     onClick={() => handleNavLinkClick("petas")}
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
                   onClick={() => handleNavLinkClick("petas")}
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
                  <Toaster position="top-center" reverseOrder={false} />
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
              )}
            </div>
            <ul>
              {/* peta */}
              <li>
                <NavLink
                  to="/peta"
                  onClick={() => handleNavLinkClick("peta")}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === "/peta" && "bg-graydark dark:bg-meta-4"
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
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
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
              {/* statistik */}
              <li>
                <NavLink
                  to="/dashboard/statistic"
                  onClick={() => handleNavLinkClick("petas")}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === "/dashboard/statistic" &&
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
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
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
