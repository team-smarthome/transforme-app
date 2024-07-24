import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation, useNavigate } from "react-router-dom";
import { Alerts } from "../pages/Statistic/Alert";
import { apiDashboard, apiReadAllWBP } from "../services/api";
import { Error403Message } from "../utils/constants";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { TutorialStatistic } from "../utils/atomstates";
import { useAtom } from "jotai";

const ChartFive: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken?.token ? dataToken?.token : null;
  const [pidanaKejahatan, setPidanaKejahatan] = useState(6);
  const [pidanaPelanggaran, setPidanaPelanggaran] = useState(7);
  const [perbedaanPendapat, setPerbedaanPendapat] = useState(2);
  const [other, setOther] = useState(1);
  const [kasus, setKasus] = useState([]);
  const pidana =
    pidanaKejahatan + pidanaPelanggaran + perbedaanPendapat + other;

  const [dataKasus, setDataKasus] = useState([{}]);

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
    const fecthdata = async () => {
      try {
        const response = await apiDashboard(token);
        const kasus = response.data.records.perkara;
        setDataKasus(kasus);
      } catch (e: any) {
        if (e.response.status === 403) {
          navigate("/", {
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
      fecthdata();
    } else {
      navigate("/");
    }
  }, []);

  const perkara = dataKasus
    ? Object.keys(dataKasus).filter((key: any) => dataKasus[key] !== "0")
    : [];

  const dataPerkara = dataKasus
    ? Object.values(dataKasus)
        .filter((value) => value !== "0")
        .map((value: any) => parseInt(value, 10))
    : [];
  const totalNilai = dataPerkara.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const colors = [
    "#10B981",
    "#375E83",
    "#259AE6",
    "#FFA70B",
    "#FF6347",
    "#FFD700",
  ];

  const dynamicColors = Array.from({ length: perkara.length }, (_, index) => {
    const colorIndex = index % colors.length; // Gunakan modulo untuk memastikan pengulangan warna
    return colors[colorIndex];
  });

  const options: ApexOptions = {
    chart: {
      type: "donut",
      foreColor: "fffff", // Warna teks di luar donut chart
    },
    colors: dynamicColors,
    labels: perkara,
    legend: {
      show: true,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "24px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: undefined,
      },
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
      id="chart"
    >
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Analisa Perkara Tahanan
          </h5>
        </div>
        <div>
          <div className="flex ">
            <div className="relative z-20 inline-block">
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="dark:bg-boxdark rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div id="chartThree" className="mx-auto flex justify-center text-white">
          <ReactApexChart options={options} series={dataPerkara} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-1">
        {perkara.length > 0 &&
          perkara.map((item: any, index: number) => (
            <div key={index} className="w-full px-8 sm:w-1/2">
              <div className="flex w-full items-center">
                {/* <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#375E83]"></span> */}
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                  <span className="capitalize">{item}</span>
                  <span>
                    {Math.round((dataPerkara[index] / totalNilai) * 100)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChartFive;
