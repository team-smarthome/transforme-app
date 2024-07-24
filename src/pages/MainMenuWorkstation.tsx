import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import Logo from "../images/logo/logo.png";

import {
  CameraIcon,
  PengaturanIcon,
  LogIcon,
  DaftarInventarisIcon,
  Pengunjung,
} from "../components/Icons";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { apiversion } from "../services/api";
import Swal from "sweetalert2";

const MainMenuWorkstation = () => {
  const navigate = useNavigate();
  const dataUserItem = localStorage.getItem("dataUser");
  const dataUser = dataUserItem ? JSON.parse(dataUserItem) : null;

  const handleSelectMap = (path: string) => {
    navigate(`/dashboard${path}`);
  };

  useEffect(() => {
    if (!dataUser) {
      navigate("/");
    }
  }, []);

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
        <div className="flex justify-center items-center gap-x-6 py-4 bg-transparent-dark1 backdrop-blur w-full fixed z-10">
          <img src={Logo} alt="Logo" className="w-100" />
          <span className="text-3xl text-white font-bold tracking-wider uppercase">
            {dataUser.nama_lokasi_otmil
              ? "Monitoring System"
              : "Monitoring System"}
          </span>
        </div>
        <div className="pb-20 pt-40 px-20 overflow-y-auto grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-3 2xl:gap-20 relative">
          {routes.map((menu: any) => {
            return (
              <MenuItem
                menu={menu}
                key={menu.id}
                onSelect={() => handleSelectMap(menu.link)}
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
                let versionName: any;
                const version = response.data.records.map((a: any) => {
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
  {
    id: 5,
    name: "STAFF",
    link: "/staff",
    icon: Pengunjung,
  },
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
