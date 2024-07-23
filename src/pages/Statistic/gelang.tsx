import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiDashboard } from "../../services/api";
import { Alerts } from "./Alert";
import { Error403Message } from "../../utils/constants";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { TutorialStatistic } from "../../utils/atomstates";
import { useAtom } from "jotai";

//icon gelang
let IconBracelet = () => {
  return (
    <div className="flex h-11 w-11 items-center justify-center text-black rounded-full bg-slate-100 dark:bg-slate-200">
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
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

const tokenItem = localStorage.getItem("token");
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken?.token ? dataToken?.token : null;
const Brecelet = () => {
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
      {
        element: "#b-bar",
        popover: {
          title: "Sidebar",
          description: "Menampilkan sidebar",
        },
      },
      {
        element: "#logo",
        popover: {
          title: "SIRAM",
          description: "Menampilkan SIRAM Dashboard OTMIL",
        },
      },
      {
        element: "#b-screen",
        popover: {
          title: "Set Fullscreen",
          description: "Menampilkan layar fullscreen",
        },
      },
      {
        element: "#b-notif",
        popover: {
          title: "Notification",
          description: "Menampilkan notifikasi",
        },
      },
      {
        element: "#user",
        popover: {
          title: "Profil",
          description: "Menampilkan profil user",
        },
      },
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

  //gelang
  // const navigate = useNavigate()
  const [gelang, setGelang] = useState({
    prajuritBinaanAktif: 0,
    prajuritLowPower: 0,
    jumlah: 0,
  });
  useEffect(() => {
    const data = async () => {
      try {
        const response = await apiDashboard(token);
        setGelang({
          ...gelang,
          prajuritBinaanAktif: response.data.records.gelang_aktif,
          prajuritLowPower: response.data.records.gelang_low_power,
          jumlah: response.data.records.total_gelang,
        });
      } catch (e: any) {
        if (e.response.status === 403) {
          navigate("/auth/signin", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
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
      <div className=" grid grid-cols-2 gap-2" id="gelang">
        <div className="grid gap-2">
          <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <IconBracelet />
            <div className="ml-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {gelang.prajuritBinaanAktif}
                </h4>
                <span className="text-sm font-medium">Gelang WBP Aktif</span>
              </div>
            </div>
          </div>{" "}
          <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <IconBracelet />

            <div className="ml-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {gelang.prajuritLowPower}
                </h4>
                <span className="text-sm font-medium">
                  Gelang WBP Low Power
                </span>
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div>
              <div className="flex items-center">
                <IconBracelet />
                <h4 className="ml-2 text-title-xl font-bold text-black dark:text-white">
                  {gelang.jumlah}
                </h4>
              </div>
              <span className="text-xl font-medium">Jumlah Gelang WBP</span>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Brecelet;
