import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { Alerts } from "../pages/Statistic/Alert";
import { apiReadAllWBPOtmil } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../utils/constants";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { TutorialStatistic } from "../utils/atomstates";
import { useAtom } from "jotai";

const ChartBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken?.token ? dataToken?.token : null;

  const [matra, setMatra] = useState<any[]>([]);

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
    const requestData = {
      pagination: {
        pageSize: Number.MAX_SAFE_INTEGER,
      },
    };
    const data = async () => {
      try {
        //Total WBP
        const responseWBP = await apiReadAllWBPOtmil(token, requestData);
        const dataMatra = responseWBP.data.records;
        setMatra(dataMatra);
      } catch (e: any) {
        if (e.response.status === 403) {
          navigate("/auth/signin", {
            state: {
              forceLogout: true,
              lastPage: location.pathname,
            },
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
      navigate("/auth/signin");
    }
  }, []);
  const namaMatra = matra
    ?.filter((item) => item.nama_matra !== null)
    .map((item) => item.nama_matra);
  const countByNamaMatra = namaMatra?.reduce((acc, nama) => {
    acc[nama] = (acc[nama] || 0) + 1;
    return acc;
  }, {});

  const propertiesAndValues = Object.entries(countByNamaMatra || {});
  const namaMtra = propertiesAndValues?.map(([property, value], index) => [
    property,
  ]);
  const jumlahMatra = propertiesAndValues?.map(
    ([property, value]: any, index) => parseInt(value)
  );
  console.log(jumlahMatra, "matra");
  const colors = ["#00E396", "#FF0000", "#FEB019"];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
      width: 100,
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "50%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: namaMtra,
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Jumlah Pegawai",
        style: {
          fontSize: "12px",
          color: "#fff",
          fontWeight: "semibold",
          // fontStyle: 'italic', // Tulisan miring
        },
      },
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    series: [
      {
        data: jumlahMatra,
      },
    ],
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 500,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 430,
          },
        },
      },
    ],
  };

  const series = [
    {
      data: jumlahMatra,
      colors: ["#fff"], // Warna putih untuk kolom chart
    },
  ];
  return (
    <div
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6 "
      // id="bar"
    >
      <div className="mb-3 justify-between gap-4" id="bar">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Analisa Pegawai
        </h5>
        <div className="flex justify-center mt-6">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartBar;
