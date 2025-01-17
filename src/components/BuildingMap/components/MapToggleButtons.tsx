import {
  SignalIcon,
  VideoCameraIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { LuScanFace } from "react-icons/lu";
import { BiUser } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { SlScreenDesktop } from "react-icons/sl";
import { LuMonitorCheck } from "react-icons/lu";
import { PiDeviceTabletSpeakerLight } from "react-icons/pi";
import { BsInboxes } from "react-icons/bs";
import {
  MdOutlineStorage,
  MdPersonAddAlt1,
  MdPersonSearch,
  MdWifiFind,
  MdSignalWifiStatusbar3Bar,
} from "react-icons/md";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaWalking } from "react-icons/fa";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useState } from "react";
import { FaVectorSquare } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { ImSearch } from "react-icons/im";
import { ImPlus } from "react-icons/im";

import {
  TbDeviceDesktopPlus,
  TbDeviceDesktopSearch,
  TbCameraSearch,
  TbCameraPlus,
} from "react-icons/tb";
import Modal from "../../Modal";
import { Tooltip } from "antd";
import ModalSearch from "../../Modal/ModalSearch";
import { useNavigate } from "react-router-dom";
import { selectedRoute } from "../../../utils/atomstates";
import { useAtom } from "jotai";

const handleClickTutorial = () => {
  const driverObj = driver({
    nextBtnText: "Selanjutnya",
    prevBtnText: "Sebelumnya",
    doneBtnText: "Selesai",
    showProgress: true,
    steps: [
      {
        element: ".b-wbp",
        popover: {
          title: "WBP",
          description: "Tombol untuk menampilkan/menyembunyikan WBP",
        },
      },
      {
        element: ".b-petugas",
        popover: {
          title: "Petugas",
          description: "Tombol untuk menampilkan/menyembunyikan petugas",
        },
      },
      {
        element: ".b-pengunjung",
        popover: {
          title: "Pengunjung",
          description: "Tombol untuk menampilkan/menyembunyikan pengunjung",
        },
      },
      {
        element: ".b-gateway",
        popover: {
          title: "GateWay",
          description: "Tombol untuk menampilkan/menyembunyikan gateway",
        },
      },
      {
        element: ".b-ptp",
        popover: {
          title: "PTP & AP",
          description: "Tombol untuk menampilkan/menyembunyikan PTP & AP",
        },
      },
      {
        element: ".b-camera",
        popover: {
          title: "Camera",
          description: "Tombol untuk menampilkan/menyembunyikan Camera",
        },
      },
      {
        element: ".b-acces-door",
        popover: {
          title: "Acces Door",
          description: "Tombol untuk menampilkan/menyembunyikan Acces Door",
        },
      },
      {
        element: ".b-face-recognition",
        popover: {
          title: "Face Recognition",
          description:
            "Tombol untuk menampilkan/menyembunyikan Face Recognition",
        },
      },
      {
        element: ".b-interactive-desktop",
        popover: {
          title: "Interactive Desktop",
          description:
            "Tombol untuk menampilkan/menyembunyikan Interactive Desktop",
        },
      },
      {
        element: ".b-interactive-tv",
        popover: {
          title: "Interactive TV",
          description: "Tombol untuk menampilkan/menyembunyikan Interactive TV",
        },
      },
      {
        element: ".b-self-registration",
        popover: {
          title: "Self Regristrasion Kiosk",
          description:
            "Tombol untuk menampilkan/menyembunyikan Self Regristrasion Kiosk",
        },
      },
      {
        element: ".b-nvr",
        popover: {
          title: "NVR",
          description: "Tombol untuk menampilkan/menyembunyikan NVR",
        },
      },
      {
        element: ".b-nas",
        popover: {
          title: "NAS",
          description: "Tombol untuk menampilkan/menyembunyikan NAS",
        },
      },
      {
        element: ".b-lihat-semua",
        popover: {
          title: "Lihat Semua Icon",
          description:
            "Tombol untuk menampilkan/menyembunyikan semua ikon sekaligus",
        },
      },
    ],
  });

  driverObj.drive();
};

interface MapToggleButtonsProps {
  toggleAllVisibility: any;
  toggleWBPVisibility: any;
  togglePetugasVisibility: any;
  togglePengunjungVisibility: any;
  WBPVisible: boolean;
  petugasVisible: boolean;
  pengunjungVisible: boolean;
  toggleGatewayVisibility: any;
  gatewayVisible: boolean;
  toggleRouterVisibility: any;
  routerVisible: boolean;
  toggleCameraVisibility: any;
  cameraVisible: boolean;
  toggleAccessDoorVisibility: any;
  accessDoorVisible: boolean;
  toggleFaceRecognitionVisibility: any;
  faceRecognitionVisible: boolean;
  toggleInteractiveDesktopVisibility: any;
  interactiveDesktopVisible: boolean;
  toggleInteractiveTVisibility: any;
  interactiveTVisible: boolean;
  toggleSelfRegKioskVisibility: any;
  selfRegKioskVisible: boolean;
  toggleNVRVisibility: any;
  NVRVisible: boolean;
  toggleNASVisibility: any;
  NASVisible: boolean;
  toggleZoneVisibility: any;
  zoneVisible: boolean;
  toggleNotificationVisibility: any;
  NotificationVisible: boolean;
  allVisible: boolean;
  toggleWithDescription: any;
  isToggleWithDescription: boolean;
}

const MapToggleButtons = ({
  toggleAllVisibility,
  toggleWBPVisibility,
  togglePetugasVisibility,
  togglePengunjungVisibility,
  WBPVisible,
  petugasVisible,
  pengunjungVisible,
  toggleGatewayVisibility,
  gatewayVisible,
  toggleRouterVisibility,
  routerVisible,
  toggleCameraVisibility,
  cameraVisible,
  toggleAccessDoorVisibility,
  accessDoorVisible,
  toggleFaceRecognitionVisibility,
  faceRecognitionVisible,
  toggleInteractiveDesktopVisibility,
  interactiveDesktopVisible,
  toggleInteractiveTVisibility,
  interactiveTVisible,
  toggleSelfRegKioskVisibility,
  selfRegKioskVisible,
  toggleNVRVisibility,
  NVRVisible,
  toggleNASVisibility,
  NASVisible,
  toggleZoneVisibility,
  zoneVisible,
  isToggleWithDescription,
}: MapToggleButtonsProps) => {
  console.log(toggleCameraVisibility, 'sini')
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useAtom(selectedRoute);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoverData, setHoverData] = useState<string>("");
  const [open, setOpen] = useState(false);
  let timeoutId: ReturnType<typeof setTimeout>;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (data: string) => {
    setHoverData(data);
    setOpen(true);
  };

  const handleMouseEnter = (button: string) => {
    clearTimeout(timeoutId);
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setHoveredButton(null);
    }, 300);
  };

  const handleNavigateAdd = (name: any) => {
    setSelectedMenu("workstation");
    let path = "";
    switch (name) {
      case "WBP":
        path = "/workstation/master-data/tersangka";
        break;
      case "Petugas":
        path = "/workstation/master-data/petugas";
        break;
      case "Pengunjung":
        path = "/workstation/master-data/pengunjung";
        break;
      case "Gateway":
        path = "/workstation/pengaturan-list/perangkat/gateway";
        break;
      case "PTP":
        path = "/workstation/master-data/ptp/add";
        break;
      case "Camera":
        path = "/workstation/pengaturan-list/perangkat/kamera";
        break;
      case "Access":
        path = "/workstation/master-data/access-door/add";
        break;
      case "Face":
        path = "/workstation/master-data/face-recognition/add";
        break;
      case "Desktop":
        path = "/workstation/master-data/desktop/add";
        break;
      case "TV":
        path = "/workstation/master-data/tv/add";
        break;
      case "SelfReg":
        path = "/workstation/master-data/self-registration/add";
        break;
      case "NVR":
        path = "/workstation/master-data/nvr/add";
        break;
      case "NAS":
        path = "/workstation/master-data/nas/add";
        break;
      case "Zone":
        path = "/workstation/master-data/zone/add";
        break;
      default:
        break;
    }
    navigate(path);
  };

  return (
    <nav className="flex justify-center items-center w-full p-1 gap-x-7">
      <div
        onMouseEnter={() => handleMouseEnter("WBP")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-wbp ">
          <button
            onClick={toggleWBPVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              WBPVisible
                ? "bg-red-600 hover:bg-red-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <BiUser
              className={`${
                WBPVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">WBP</span>
          )}
          {hoveredButton === "WBP" && WBPVisible && (
            <div className="absolute  ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38 ">
              <div
                className="flex flex-row mb-2 gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("WBP")}>
                <button style={{ color: "white" }}>
                  <MdPersonSearch className="w-6 h-6" />
                  {/* <IoSearchCircleOutline className="w-6 h-6" /> */}
                </button>
                <h5 className="text-white text-sm">Cari WBP</h5>
              </div>
              <div
                className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleNavigateAdd("WBP")}>
                <button style={{ color: "white" }} className="flex flex-row">
                  <MdPersonAddAlt1 className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah WBP</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Petugas")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Petugas</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-petugas">
          <button
            onClick={togglePetugasVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              petugasVisible
                ? "bg-yellow-600 hover:bg-yellow-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <GiPoliceOfficerHead
              className={`${
                petugasVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Petugas</span>
          )}
          {hoveredButton === "Petugas" && petugasVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-50">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Petugas")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <MdPersonSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari Petugas</h5>
              </div>
              <div
                className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleNavigateAdd("Petugas")}>
                <button style={{ color: "white" }}>
                  <MdPersonAddAlt1 className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Petugas</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Pengunjung")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Pengunjung</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-pengunjung">
          <button
            onClick={togglePengunjungVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              pengunjungVisible
                ? "bg-teal-600 hover:bg-teal-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <FaWalking
              className={`${
                pengunjungVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Pengunjung</span>
          )}
          {hoveredButton === "Pengunjung" && pengunjungVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Pengunjung")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <MdPersonSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari Pengunjung</h5>
              </div>
              <div
                className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleNavigateAdd("Pengunjung")}>
                <button style={{ color: "white" }}>
                  <MdPersonAddAlt1 className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Pengunjung</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Gateway")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Gateway</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-gateway">
          <button
            onClick={toggleGatewayVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              gatewayVisible
                ? "bg-blue-600 hover:bg-blue-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <WifiIcon
              className={`${
                gatewayVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Gateway</span>
          )}
          {hoveredButton === "Gateway" && gatewayVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Gateway")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <MdWifiFind className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari Gateway</h5>
              </div>
              <div
                className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleNavigateAdd("Gateway")}>
                <button style={{ color: "white" }}>
                  <MdSignalWifiStatusbar3Bar className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Gateway</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("PTP")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">PTP & AP</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-ptp">
          <button
            onClick={toggleRouterVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              routerVisible
                ? "bg-blue-600 hover:bg-blue-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <SignalIcon
              className={`${
                routerVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">PTP & AP</span>
          )}
          {hoveredButton === "PTP" && routerVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("PTP & AP")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <ImSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari PTP & AP</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <ImPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah PTP & AP</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Camera")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Camera</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-camera">
          <button
            onClick={toggleCameraVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              cameraVisible
                ? "bg-violet-600 hover:bg-violet-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <VideoCameraIcon
              className={`${
                cameraVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Camera</span>
          )}
          {hoveredButton === "Camera" && cameraVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Camera")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <TbCameraSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari Kamera</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md" onClick={() => handleNavigateAdd("Camera")}>
                <button style={{ color: "white" }}>
                  <TbCameraPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Kamera</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Access")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Access Door</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-acces-door">
          <button
            onClick={toggleAccessDoorVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              accessDoorVisible
                ? "bg-orange-600 hover:bg-orange-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <BsDoorOpen
              className={`${
                accessDoorVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Access Door</span>
          )}
          {hoveredButton === "Access" && accessDoorVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Access Door")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <ImSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm"> Cari Access Door</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <ImPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Access Door</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Face")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Face Recognition</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-face-recognition">
          <button
            onClick={toggleFaceRecognitionVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              faceRecognitionVisible
                ? "bg-pink-600 hover:bg-pink-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <LuScanFace
              className={`${
                faceRecognitionVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Face Rec</span>
          )}
          {hoveredButton === "Face" && faceRecognitionVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Face Recognition")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <ImSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari Face Rec</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <ImPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Face Rec</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Desktop")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Interactive Desktop</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-interactive-desktop">
          <button
            onClick={toggleInteractiveDesktopVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              interactiveDesktopVisible
                ? "bg-lime-600 hover:bg-lime-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <SlScreenDesktop
              className={`${
                interactiveDesktopVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Desktop</span>
          )}
          {hoveredButton === "Desktop" && interactiveDesktopVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Desktop")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <TbDeviceDesktopSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari Desktop</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <TbDeviceDesktopPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Desktop</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("TV")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Interactive TV</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-interactive-tv">
          <button
            onClick={toggleInteractiveTVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              interactiveTVisible
                ? "bg-green-800 hover:bg-green-700 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <LuMonitorCheck
              className={`${
                interactiveTVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">TV</span>
          )}
          {hoveredButton === "TV" && interactiveTVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("TV")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <TbDeviceDesktopSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari TV</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <TbDeviceDesktopPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah TV</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        className="pr-3"
        onMouseEnter={() => handleMouseEnter("M-Kiosk")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">Self Registration Kiosk</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-self-registration">
          <button
            onClick={toggleSelfRegKioskVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              selfRegKioskVisible
                ? "bg-amber-600 hover:bg-amber-500 shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <PiDeviceTabletSpeakerLight
              className={`${
                selfRegKioskVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">M-Kiosk</span>
          )}
          {hoveredButton === "M-Kiosk" && selfRegKioskVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("M-Kiosk")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <ImSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari M-Kiosk</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <ImPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah M-Kiosk</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        className="pr-3"
        onMouseEnter={() => handleMouseEnter("NVR")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">NVR</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-nvr">
          <button
            onClick={toggleNVRVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              NVRVisible
                ? "bg-slate-100 hover:bg-white shadow-3 shadow-transparent-light"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <BsInboxes
              className={`${
                NVRVisible ? "text-black" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">NVR</span>
          )}
          {hoveredButton === "NVR" && NVRVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("NVR")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <ImSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari NVR</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <ImPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah NVR</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        className="pr-3"
        onMouseEnter={() => handleMouseEnter("NAS")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">NAS</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-nas">
          <button
            onClick={toggleNASVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              NASVisible
                ? "bg-slate-900 hover:bg-slate-800 shadow-3 shadow-transparent-light border border-slate-500"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <MdOutlineStorage
              className={`${
                NASVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">NAS</span>
          )}
          {hoveredButton === "NAS" && NASVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between  z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("NAS")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <ImSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari NAS</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <ImPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah NAS</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <div
        className="pr-3"
        onMouseEnter={() => handleMouseEnter("Zona")}
        onMouseLeave={handleMouseLeave}>
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          // title={<span className="text-black">NAS</span>}
          placement="bottom"
          color="white"
          className="text-black flex flex-col items-center justify-center b-nas">
          <button
            onClick={toggleZoneVisibility}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
              zoneVisible
                ? "bg-green-500 hover:bg-green-400 shadow-3 shadow-transparent-light border border-slate-500"
                : "bg-slate-600 hover:bg-slate-500"
            } `}>
            <FaVectorSquare
              className={`${
                zoneVisible ? "text-white" : "text-slate-300"
              } w-5 h-5`}
            />
          </button>
          {isToggleWithDescription && (
            <span className="text-white text-xs">Zona</span>
          )}
          {hoveredButton === "Zona" && zoneVisible && (
            <div className="absolute ml-25 mt-39 flex flex-col bg-slate-600 p-2 rounded-md shadow  justify-between z-99999 w-38">
              <div
                className="flex flex-row gap-2 w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md"
                onClick={() => handleClick("Zona")}>
                <button className="mb-1" style={{ color: "white" }}>
                  <ImSearch className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Cari Zona</h5>
              </div>
              <div className="flex flex-row gap-2  w-full items-center hover:cursor-pointer hover:bg-slate-700 py-2 px-2 rounded-md">
                <button style={{ color: "white" }}>
                  <ImPlus className="w-6 h-6" />
                </button>
                <h5 className="text-white text-sm">Tambah Zona</h5>
              </div>
            </div>
          )}
        </Tooltip>
      </div>
      <Tooltip
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode as HTMLElement
        }
        // title={<span className="text-black">Lihat Semua</span>}
        placement="bottom"
        color="white"
        className="text-black flex flex-col items-center justify-center b-lihat-semua">
        <button
          onClick={toggleAllVisibility}
          className={`flex text-white text-sm py-1 px-2 items-center justify-center rounded-full transition-colors duration-200 ${
            WBPVisible &&
            gatewayVisible &&
            routerVisible &&
            cameraVisible &&
            accessDoorVisible &&
            faceRecognitionVisible &&
            interactiveDesktopVisible &&
            interactiveTVisible &&
            selfRegKioskVisible &&
            NVRVisible &&
            NASVisible &&
            zoneVisible
              ? "bg-sky-600 hover:bg-sky-500 shadow-3 shadow-transparent-light"
              : "bg-slate-600 hover:bg-slate-500"
          } `}>
          {WBPVisible &&
          gatewayVisible &&
          routerVisible &&
          cameraVisible &&
          accessDoorVisible &&
          faceRecognitionVisible &&
          interactiveDesktopVisible &&
          interactiveTVisible &&
          selfRegKioskVisible &&
          NVRVisible &&
          NASVisible &&
          zoneVisible
            ? "Sembunyikan Semua"
            : "Lihat Semua"}
        </button>
      </Tooltip>
      {/* <Tooltip
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode as HTMLElement
        }
        // title={<span className="text-black">Lihat Keterangan</span>}
        placement="bottom"
        color="white"
        className="text-black flex flex-col items-center  justify-center b-lihat-semua ">
        <button
          onClick={toggleWithDescription}
          className={`flex text-white text-sm py-1 p-2 items-center justify-center rounded-full transition-colors duration-200 ${
            isToggleWithDescription 
            ? "bg-sky-600 hover:bg-sky-500 shadow-3 shadow-transparent-light"
            : "bg-slate-600 hover:bg-slate-500"
            } `}>
          {isToggleWithDescription
            ? "Sembunyikan Keterangan"
            : "Lihat Keterangan"}
        </button>
      </Tooltip> */}
      <div className="">
        <button>
          <HiQuestionMarkCircle
            // values={filter}
            aria-placeholder="Show tutorial"
            // onChange={}
            onClick={handleClickTutorial}
          />
        </button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <ModalSearch handleClose={handleClose} hoverData={hoverData} />
      </Modal>
    </nav>
  );
};

export default MapToggleButtons;
