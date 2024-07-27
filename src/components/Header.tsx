import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
// import DropdownNotification from "./DropdownNotification";
// import DropdownMessage from "./DropdownMessage";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useAtom } from "jotai";
import { Divider, Tooltip } from "antd";
import { Popover } from "antd";
import { driver } from "driver.js";
import Swal from "sweetalert2";
import useSound from "use-sound";
// const alertSound = require('./alert.mp3');

import "driver.js/dist/driver.css";
import { HiExclamationCircle } from "react-icons/hi2";
import { TiWarning } from "react-icons/ti";

import { ImCross } from "react-icons/im";

import {
  TutorialStatistic,
  isFullScreenAtom,
  NotificationAtom,
  isSidebarNotifOpen,
  checkState,
} from "../utils/atomstates";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toast } from "react-toastify/dist/components";
import { selectedRoutess } from "../utils/atomstates";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  notificationOpen: string | boolean | undefined;
  setNotificationOpen: (arg0: boolean) => void;
  buildingOpen: string | boolean | undefined;
  setBuildingOpen: (arg0: boolean) => void;
}) => {
  let [isFullScreen, setIsFullScreen] = useAtom(isFullScreenAtom);
  let [sidebarNotifOpen, setSidebarNotifOpen] = useAtom(isSidebarNotifOpen);
  const [selectCheck, setSelectCheck] = useAtom(checkState);

  const location = useLocation();
  const [isStatistic, setIsStatistic] = useAtom(TutorialStatistic);
  // console.log(location, "location");

  const [isNotification, setIsNotification] = useAtom(NotificationAtom);
  const dataUserItem = localStorage.getItem("dataUser");
  const dataUser = dataUserItem ? JSON.parse(dataUserItem) : null;

  const handleClickNotification = (e) => {
    e.stopPropagation();
    setIsNotification(!isNotification);
  };
  const [appMode] = useAtom(selectedRoutess);

  const dataAppMoede = localStorage.getItem("appMode");
  console.log("dataAppMode", dataAppMoede);

  const [filter, setFilter] = useState("");
  const [isworkstation, setIsworkstation] = useState<boolean>(false);
  // const [playSound] = useSound('alert.mp3');

  // const handleClickTutorial = () => {
  //   const driverObj = driver({
  //     nextBtnText: "lanjut",
  //     prevBtnText: "sebelum",
  //     doneBtnText: "selesai",
  //     showProgress: true,
  //     steps: [
  //       {
  //         element: "#b-screen",
  //         popover: {
  //           title: "Set Fullscreen",
  //           description: "Menampilkan layar fullscreen",
  //         },
  //       },
  //       {
  //         element: "#b-notif",
  //         popover: {
  //           title: "Notification",
  //           description: "Menampilkan notifikasi",
  //         },
  //       },
  //       {
  //         element: "#user",
  //         popover: {
  //           title: "Profil",
  //           description: "Menampilkan profil user",
  //         },
  //       },
  //       {
  //         element: "#b-bar",
  //         popover: {
  //           title: "Sidebar",
  //           description: "Menampilkan sidebar",
  //         },
  //       },
  //       {
  //         element: "#logo",
  //         popover: {
  //           title: "SIRAM",
  //           description: "Menampilkan SIRAM Dashboard OTMIL",
  //         },
  //       },
  //     ],
  //   });

  //   driverObj.drive();
  //   if (location.pathname == "/statistic") {
  //     return setIsStatistic(true);
  //   }
  // };

  useEffect(() => {
    console.log(dataAppMoede, "appModeSaatIni");
    if (dataAppMoede === "workstation" || appMode === "workstation") {
      setIsworkstation(true);

      // document.querySelector('body')?.classList.add('admin');
    } else if (appMode === "dashboard" || dataAppMoede === "dashboard") {
      setIsworkstation(false);
      // document.querySelector('body')?.classList.remove('admin');
    }
  }, [appMode]);

  const [playSound] = useSound("alert.mp3");

  let handleNotif = () => {
    console.log("notif check clicked");

    playSound();

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } left-[33%] w-[33%] h-[20vh] top-[40vh] absolute     rounded-lg`}
      >
        <audio src="alert.mp3" autoPlay />
        <div className="w-full h-full z-999 bg-white  absolute rounded-lg  flex  border-2 border-red-500">
          <button
            type="button"
            onClick={() => {
              toast.remove();
            }}
            className="absolute right-4 top-4"
          >
            {" "}
            <ImCross className="" color="red" width={30} />
          </button>
          <div className="flex w-full h-full justify-around  items-center">
            <div className="flex-shrink-0 flex justify-center items-center w-1/4">
              <TiWarning className="w-2/3 h-auto animate-bounce" color="red" />
            </div>
            <div className="ml-3 flex-1 text-centerflex-1">
              <p className="text-md font-bold text-red-600 animate-pulse">
                Perhatian
              </p>
              <p className="text-xs text-neutral-950">
                Apel Petugas akan dimulai pada pukul 08.00 WIB
              </p>
            </div>
          </div>
        </div>
        <div className="absolute rounded-lg w-full h-full bg-red-500 animate-ping blur"></div>
      </div>
    ));
  };

  return (
    <>
      {isworkstation ? (
        <>
          <header className="sticky top-0 flex w-full bg-white z-999999 drop-shadow-1 dark:bg-transparent-dark1 dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
              <div className="flex items-center gap-2 sm:gap-4 ">
                <button
                  aria-controls="sidebar"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.setSidebarOpen(!props.sidebarOpen);
                    
                  }}
                  className="z-[9999] block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
                >
                  <span className="relative block h-5.5 w-5.5 cursor-pointer">
                    <span className="du-block absolute right-0 h-full w-full">
                      <span
                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!w-full delay-300"
                        }`}
                      ></span>
                      <span
                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "delay-400 !w-full"
                        }`}
                      ></span>
                      <span
                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!w-full delay-500"
                        }`}
                      ></span>
                    </span>
                    <span className="absolute right-0 h-full w-full rotate-45">
                      <span
                        className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!h-0 !delay-[0]"
                        }`}
                      ></span>
                      <span
                        className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!h-0 !delay-200"
                        }`}
                      ></span>
                    </span>
                  </span>
                </button>
                {/* <!-- Hamburger Toggle BTN --> */}

                {/* <Link className="block flex-shrink-0 lg:hidden" to="/"> */}

                <NavLink
                  to="/home"
                  className="flex justify-center items-center gap-x-2 w-full"
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-50  overflow-hidden"
                  />
                  <span className="text-lg text-white ">
                    {dataUser.nama_lokasi_otmil
                      ? "Monitoring System"
                      : "Monitoring System"}
                  </span>
                </NavLink>
              </div>

              <div className="hidden sm:block"></div>

              <div className="flex items-center gap-3 2xsm:gap-7">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                  {/* <!-- Dark Mode Toggler --> */}
                  <DarkModeSwitcher />
                  {/* <!-- Dark Mode Toggler --> */}

                  {/* <!-- Notification Menu Area --> */}
                  {/* <DropdownNotification /> */}
                  {/* <!-- Notification Menu Area --> */}

                  {/* <!-- Chat Notification Area --> */}
                  {/* <DropdownMessage /> */}
                  {/* <!-- Chat Notification Area --> */}
                </ul>

                {/* <!-- User Area --> */}
                <DropdownUser />
                {/* <!-- User Area --> */}
              </div>
            </div>
          </header>
        </>
      ) : (
        <>
          <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-transparent-dark1 dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
              <div className="flex items-center gap-2 sm:gap-4 ">
                {/* <div className="flex items-center gap-2 sm:gap-4 lg:hidden"> */}
                {/* <!-- Hamburger Toggle BTN --> */}
                <button
                  aria-controls="sidebar"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.setSidebarOpen(!props.sidebarOpen);
                    console.log('====================================');
                    console.log("DATASIDEBAR", props.sidebarOpen);
                    console.log('====================================');
                  }}
                  className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
                  // className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                  id="b-bar"
                >
                  <span className="relative block h-5.5 w-5.5 cursor-pointer">
                    <span className="du-block absolute right-0 h-full w-full">
                      <span
                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!w-full delay-300"
                        }`}
                      ></span>
                      <span
                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "delay-400 !w-full"
                        }`}
                      ></span>
                      <span
                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!w-full delay-500"
                        }`}
                      ></span>
                    </span>
                    <span className="absolute right-0 h-full w-full rotate-45">
                      <span
                        className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!h-0 !delay-[0]"
                        }`}
                      ></span>
                      <span
                        className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                          props.sidebarOpen && "!h-0 !delay-200"
                        }`}
                      ></span>
                    </span>
                  </span>
                </button>
                {/* <!-- Hamburger Toggle BTN --> */}

                {/* <Link className="block flex-shrink-0 lg:hidden" to="/"> */}
                {/* {props.sidebarOpen && ( */}
                <NavLink
                  to="/home"
                  className="flex justify-center items-center gap-x-2 w-full"
                  id="logo"
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-50  overflow-hidden"
                  />
                  <span className="text-lg text-white ">
                    {dataUser.nama_lokasi_otmil
                      ? "Monitoring System"
                      : "Monitoring System"}
                  </span>
                </NavLink>

                {/* )} */}
              </div>

              <div className="hidden sm:block"></div>

              <div className="flex items-center gap-3 2xsm:gap-7">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                  {/* <Tooltip> */}
                  <Tooltip
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentNode as HTMLElement
                    }
                    title={
                      <span className="text-black text-xs">Check Notif</span>
                    }
                    placement="bottom"
                    color="white"
                    className=""
                  >
                    <button className=" bg-stone-700 p-1 rounded-full">
                      <HiExclamationCircle
                        values={filter}
                        aria-placeholder="Check Notif"
                        // onChange={}
                        // onClick={handleNotif}
                        onMouseEnter={() => {
                          console.log("mouse enter");
                          handleNotif();
                        }}
                      />
                    </button>
                  </Tooltip>

                  <Tooltip
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentNode as HTMLElement
                    }
                    title={
                      <span className="text-black text-xs">
                        {" "}
                        {isFullScreen ? "Set Fullscreen" : "Exit Fullscreen"}
                      </span>
                    }
                    placement="bottom"
                    color="white"
                    className=""
                  >
                    <button
                      className={`bg-${
                        isFullScreen ? "sky-600" : "red-600"
                      } text-white px-2 py-1 rounded-md shadow-md transition-colors duration-300 text-xs`}
                      onClick={() => {
                        setIsFullScreen(!isFullScreen);
                        console.log(isFullScreen, "isFullScreen");
                      }}
                      id="b-screen"
                    >
                      {isFullScreen ? "Set Fullscreen" : "Exit Fullscreen"}
                    </button>
                  </Tooltip>

                  {/* <!-- Dark Mode Toggler --> */}
                  <DarkModeSwitcher />
                  {/* <!-- Dark Mode Toggler --> */}

                  {/* <!-- Notification Menu Area --> */}
                  <button
                    aria-controls="notification"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (props.setNotificationOpen) {
                        props.setNotificationOpen(!props.notificationOpen);
                        setSidebarNotifOpen(!sidebarNotifOpen);
                        setSelectCheck(true);
                        console.log(sidebarNotifOpen, "nilaisidebarnya");
                        console.log("MASUKPAKEKO");
                      } else {
                        props.setBuildingOpen(!props.buildingOpen);
                        setSidebarNotifOpen(!sidebarNotifOpen);
                        console.log("MASUKPAKEKO2");
                        console.log("NotifClickedClosed");
                        // setSelectCheck(false);
                      }
                    }}
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white b-notif"
                    id="b-notif"
                  >
                    {/* <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                to="#"
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"> */}
                    <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
                      <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                    </span>

                    <svg
                      className="fill-current duration-300 ease-in-out"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
                        fill=""
                      />
                    </svg>
                    {/* <FaRegBell /> */}
                    {/* </Link> */}
                  </button>
                  {/* <!-- Notification Menu Area --> */}

                  {/* <!-- Chat Notification Area --> */}
                  {/* <DropdownMessage /> */}
                  {/* <!-- Chat Notification Area --> */}
                </ul>

                {/* <!-- User Area --> */}
                <button id="user">
                  <DropdownUser />
                </button>
                {/* <!-- User Area --> */}
              </div>
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
