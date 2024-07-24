import { log } from "console";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiDashboard, apiStatusZona } from "../../services/api";
import { Alerts } from "./Alert";
import { Error403Message } from "../../utils/constants";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { TutorialStatistic } from "../../utils/atomstates";
import { useAtom } from "jotai";

const tokenItem = localStorage.getItem("token");
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken?.token ? dataToken?.token : null;
const Gateway = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      {
        element: "#gelang",
        popover: {
          title: "Gelang",
          description:
            "Menampilkan data gelang WBP aktif, gelang WBP low power dan jumlah gelang WBP",
        },
      },
      {
        element: "#gateway",
        popover: {
          title: "Gateway",
          description:
            "Menampilkan data gateway aktif, zona hijau, zona kuning, zona merah, gateway rusak dan jumlah gateway",
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

  const [gateway, setGateway] = useState({
    aktif: 0,
    jumlah: 0,
    rusak: 0,
  });

  //zona
  const [zona, setZona] = useState({
    merah: 0,
    kuning: 0,
    hijau: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch gateway
        const dashboardResponse = await apiDashboard(token);
        const dashboardData = dashboardResponse.data.records;

        setGateway({
          aktif: dashboardData.gateway_aktif,
          jumlah: dashboardData.total_gateway,
          rusak: dashboardData.gateway_rusak,
        });

        // Fetch zona status
        const zonaResponse = await apiStatusZona(token);
        const zonaData = zonaResponse.data.records;

        setZona({
          merah: zonaData[0].zona_merah,
          kuning: zonaData[0].zona_kuning,
          hijau: zonaData[0].zona_hijau,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Example: handle navigation or alerts
        // if (error.response.status === 403) {
        //   navigate("/", {
        //     state: { forceLogout: true, lastPage: location.pathname },
        //   });
        // }
        // Alerts.fire({
        //   icon: error.response.status === 403 ? "warning" : "error",
        //   title: error.response.status === 403 ? Error403Message : error.message,
        // });
      }
    };

    if (token !== null) {
      fetchData();
    } else {
      localStorage.removeItem("dataUser");
      // localStorage.removeItem("token");
      navigate("/");
    }
  }, []);

  return (
    <>
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-2"
        id="gateway"
      >
        <div className="rounded-sm border col-span-2 border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center justify-center text-black rounded-full bg-slate-100 dark:bg-slate-200">
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
                      d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    ></path>
                  </svg>
                </div>

                <div className="ml-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      {gateway.aktif}
                    </h4>
                    <span className="text-sm font-medium">Gateway Aktif</span>
                  </div>
                </div>
              </div>{" "}
              <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center justify-center text-black rounded-full bg-green-300 dark:bg-green-500">
                  <svg
                    fill="none"
                    width="18"
                    height="18"
                    stroke="white"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>

                <div className="ml-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      {zona.hijau}
                    </h4>
                    <span className="text-sm font-medium">Zona Hijau</span>
                  </div>
                </div>
              </div>{" "}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center text-black justify-center rounded-full bg-yellow-300 dark:bg-yellow-500">
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
                      d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>

                <div className="ml-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      {zona.kuning}
                    </h4>
                    <span className="text-sm font-medium">Zona Kuning</span>
                  </div>
                </div>
              </div>{" "}
              <div className=" flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5  items-center justify-center rounded-full bg-red-300 dark:bg-red-700">
                  <svg
                    fill="none"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>

                <div className="ml-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      {zona.merah}
                    </h4>
                    <span className="text-sm font-medium">Zona Merah</span>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>{" "}
        <div className="grid gap-2">
          <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
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
                  d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
                ></path>
              </svg>
            </div>

            <div className="ml-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {gateway.rusak}
                </h4>
                <span className="text-sm font-medium">Gateway Rusak</span>
              </div>
            </div>
          </div>{" "}
          <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
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
                  d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
                ></path>
              </svg>
            </div>

            <div className="ml-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {gateway.jumlah}
                </h4>
                <span className="text-sm font-medium">Jumlah Gateway</span>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Gateway;
