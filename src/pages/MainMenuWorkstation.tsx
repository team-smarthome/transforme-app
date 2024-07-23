import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import Logo from "../images/logo/logo.png";
import { PiIdentificationCardThin } from "react-icons/pi";
import { VscLaw } from "react-icons/vsc";
import { IoDocumentText } from "react-icons/io5";
import { useAtom } from "jotai";

import {
  CameraIcon,
  DashboardIcon,
  PelacakanIcon,
  PengaturanIcon,
  LogIcon,
  ShiftIcon,
  BAPIcon,
  DaftarInventarisIcon,
  ChatIcon,
  eventIcons,
  Pengunjung,
} from "../components/Icons";
import BackgroundSecurityImage from "../images/security-background.jpg";
import { BsBriefcaseFill } from "react-icons/bs";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { version } from "../utils/constants";
import { apiversion } from "../services/api";
import { FaCirclePlus } from "react-icons/fa6";
import { selectedRoute } from "../utils/atomstates";
import Swal from "sweetalert2";

const MainMenuWorkstation = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useAtom(selectedRoute);
  const dataUserItem = localStorage.getItem("dataUser");
  const dataUser = dataUserItem ? JSON.parse(dataUserItem) : null;

  const handleSelect = (data: string) => {
    console.log(data, "dataygDipilih");
    setSelectedMenu(data);
    localStorage.setItem("appMode", data);
    if (data === "dashboard") {
      navigate("/dashboard");
      window.location.reload();
    } else {
      navigate("/workstation");
      window.location.reload();
    }
  };

  const handleSelectMap = (appMode: string, path: string) => {
    setSelectedMenu("workstation");
    console.log(appMode, path, "data yang dipilih");
    navigate(`/workstation${path}`);
    window.location.reload();
  };

  useEffect(() => {
    if (!dataUser) {
      navigate("/auth/signin");
    }
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${BackgroundSecurityImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroudOpacity: "0.5",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen dark:text-bodydark bg-slate-700">
      <div className="min-h-screen dark:text-bodydark bg-blue-950 bg-opacity-50 ">
        {/* <div className="absolute inset-0" style={overlayStyle}></div> */}
        <div className="flex justify-center items-center gap-x-2 bg-transparent-dark1 backdrop-blur w-full py-5 fixed z-10">
          <img src={Logo} alt="Logo" className="w-12" />
          <span className="text-4xl text-white font-bold tracking-wider uppercase">
            {dataUser.nama_lokasi_otmil
              ? "SIRAM Workstation OTMIL " + dataUser.nama_lokasi_otmil
              : "SIRAM Workstation LEMASMIL " + dataUser.nama_lokasi_lemasmil}
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-15 pt-27 relative z-999">
          <button
            onClick={() => handleSelect("dashboard")}
            className="bg-slate-500 text-white px-10 py-3 rounded-md hover:bg-slate-700"
          >
            SIRAM Dashboard
          </button>
          <button
            onClick={() => handleSelect("workstation")}
            className="bg-slate-500 text-white px-10 py-3 rounded-md hover:bg-slate-700"
          >
            SIRAM Workstation
          </button>
        </div>
        <div className="pb-20 pt-30 px-20 overflow-y-auto grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-3 2xl:gap-20 relative">
          {routes.map((menu: any) => {
            return (
              <MenuItem
                menu={menu}
                key={menu.id}
                onSelect={() => handleSelectMap("siram-dashboard", menu.link)}
              />
            );
          })}
          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                // Call the apiversion function to get the response
                const response = await apiversion({
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                let versionName;
                const version = response.data.records.map((a) => {
                  versionName = a.version_name;
                  return versionName;
                });

                console.log("versionAWS", versionName);

                console.log("versionAWS", version[0]);

                // const versionName = response.data.records.version_name;
                console.log("versionName", response.data);
                if (versionName == version) {
                  console.log("Version is up-to-date");
                  Swal.fire({
                    title: "Success",
                    text: `This app version is up-to-date ( Version ${version} )`,
                    icon: "success",
                    confirmButtonText: "Close",
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
                      There is an update from version {version} to version{" "}
                      {versionName}{" "}
                      <a
                        href={response.data.data.link}
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

                console.log("Data:", response.data.data);
              } catch (error) {
                console.error("Error fetching data:", error);
                toast("Error fetching data", { duration: 5000 });
              }
            }}
            className="rounded-sm border border-stroke py-6 px-7.5 shadow-default backdrop-blur-sm dark:border-slate-400"
            style={{ backgroundColor: "rgba(32,33,35, 0.7)" }}
          >
            <div className="flex h-32 w-full items-center justify-center rounded-lg  bg-meta-4 text-white">
              {LogIcon}
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div className="w-full">
                <h4 className="text-title-md text-center font-bold text-white">
                  Version
                </h4>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const routes = [
  // {
  //   id: 0,
  //   name: "Entry Data",
  //   link: "/entry-data",
  //   icon: <FaCirclePlus size={90} />,
  // },
  // {
  //   id: 1,
  //   name: "Penyidikan",
  //   link: "/penyidikan",
  //   icon: <PiIdentificationCardThin size={90} />,
  // },
  // {
  //   id: 2,
  //   name: "Daftar BAP",
  //   link: "/pencatatan-bap",
  //   icon: BAPIcon,
  // },
  // {
  //   id: 3,
  //   name: "Daftar Sidang",
  //   link: "/daftar-sidang",
  //   icon: <VscLaw size={80} />,
  // },
  // {
  //   id: 4,
  //   name: "Daftar Kasus",
  //   link: "/daftar-kasus",
  //   icon: <BsBriefcaseFill size={80} />,
  // },
  {
    id: 5,
    name: "STAFF",
    link: "/pengunjung",
    icon: Pengunjung,
  },
  // {
  //   id: 6,
  //   name: "Shift",
  //   link: "/shift-jaga",
  //   icon: ShiftIcon,
  // },
  // {
  //   id: 7,
  //   name: "Master Data",
  //   link: "/master-data",
  //   icon: DashboardIcon,
  // },
  // {
  //   id: 8,
  //   name: "Kegiatan",
  //   link: "/kegiatan",
  //   icon: eventIcons,
  // },
  {
    id: 9,
    name: "Daftar Inventaris",
    link: "/daftar-inventaris",
    icon: DaftarInventarisIcon,
  },
  {
    id: 10,
    name: "Kamera Live",
    link: "/kamera-live",
    icon: CameraIcon,
  },
  // {
  //   id: 11,
  //   name: "Kamera Playback",
  //   link: "/kamera-playback",
  //   icon: CameraIcon,
  // },
  // {
  //   id: 12,
  //   name: "Pelacakan",
  //   link: "/pelacakan",
  //   icon: PelacakanIcon,
  // },
  // {
  //   id: 13,
  //   name: "Live Chat",
  //   link: "/live-chat-list",
  //   icon: ChatIcon,
  // },
  {
    id: 14,
    name: "Pengaturan",
    link: "/pengaturan-list",
    icon: PengaturanIcon,
  },
  {
    id: 15,
    name: "Log",
    link: "/log-riwayat",
    icon: LogIcon,
  },
];

export default MainMenuWorkstation;
