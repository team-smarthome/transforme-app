import { useEffect, useState } from "react";
import {
  apiDashboard,
  apiReadAllWBPOtmil,
  apiReadAllWBPOtmilIsolasi,
  apiReadAllWBPOtmilSick,
} from "../../services/api";
import { FaHospitalUser } from "react-icons/fa";
import { BsPersonFillLock } from "react-icons/bs";
import { Alerts } from "./Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { TutorialStatistic } from "../../utils/atomstates";
import { useAtom } from "jotai";
import Breadcrumb from "../../components/Breadcrumb";

const Tahanan = ({ defaultValue }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(defaultValue, "cek!!");

  ///lokasi lemasmil
  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken?.token ? dataToken?.token : null;
  const [lokasi, setLokasi] = useState("Cimahi");

  //lemasmil
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSick, setCurrentPageSick] = useState(1);
  const [currentPageIsolate, setCurrentPageIsolate] = useState(1);
  const [pagenation, setPagenation] = useState(0);
  const [pagenationSick, setPagenationSick] = useState(0);
  const [pagenationIsolate, setPagenationIsolate] = useState(0);
  const [WPB, setWBP] = useState([]);

  const [dataTahanan, setDataTahanan] = useState(null);

  const [tahananWbp, setTahananWbp] = useState(0);
  const [tahananSakit, setTahananSakit] = useState(0);
  const [tahananIsolasi, setTahananIsolasi] = useState(0);

  const [WPBSick, setWBPSick] = useState([]);
  const [WPBIsolated, setWBPIsolated] = useState([]);
  const [isStatistic, setIsStatistic] = useAtom(TutorialStatistic);

  const [filter, setFilter] = useState("");

  const [openTahanan, setOpenTahanan] = useState(false);
  const [openKesehatan, setKesehatan] = useState(false);
  const [openIsolasi, setOpenIsolasi] = useState(false);
  const handleOpenTahanan = () => {
    setOpenTahanan(!openTahanan);
    setKesehatan(false);
    setOpenIsolasi(false);
  };
  const handleOpenKesehatan = () => {
    setKesehatan(!openKesehatan);
    setOpenTahanan(false);
    setOpenIsolasi(false);
  };
  const handelOpenIsolasi = () => {
    setOpenIsolasi(!openIsolasi);
    setOpenTahanan(false);
    setKesehatan(false);
  };

  const handleClickTutorial = () => {
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
      ],
    });

    driverObj.drive();
    if (location.pathname == "/statistic") {
      return setIsStatistic(true);
    }
  };
  // function runDriver() {
  //   driverObj.drive();
  // }
  // const [isStatistic, setIsStatistic] = useAtom(TutorialStatistic);
  // useEffect(() => {
  //   if (isStatistic) {
  //     runDriver();
  //     setIsStatistic(false);
  //   }
  // }, [isStatistic]);

  useEffect(() => {
    const requestData = {
      pagination: {
        pageSize: 5,
        currentPage: currentPage,
      },
      // filter: {
      //   lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
      // },
    };
    const data = async () => {
      try {
        //Total WBP
        const responseWBP = await apiReadAllWBPOtmil(token, requestData);
        const pagenation = responseWBP.data.pagination;
        setWBP(responseWBP.data.records);
        let tahananWbp = responseWBP.data.pagination.totalRecords;
        setTahananWbp(tahananWbp);
        let tahananSakit = responseWBP.data.records.filter(
          (sakit: any) => sakit.is_sick === 1
        ).length;
        setTahananSakit(tahananSakit);
        let tahananIsolasi = responseWBP.data.records.filter(
          (isolated: any) => isolated.is_isolated === 1
        ).length;
        setTahananIsolasi(tahananIsolasi);

        const findWBPSakit = responseWBP.data.records.filter(
          (records) => records.is_sick === 1
        );
        setWBPSick(findWBPSakit);

        const findWBPIsolate = responseWBP.data.records.filter(
          (records) => records.is_isolated === 1
        );
        setWBPIsolated(findWBPIsolate);

        //wbp sick
        // const WBPSick = await apiReadAllWBPOtmilSick(token, currentPageSick);
        // const pagenationSick = WBPSick.data.pagination;
        // const filteredSick = WBPSick.data.records.filter(
        //   (record) => record.is_sick === 1
        // );
        // setWBPSick(filteredSick);
        // setWBPSick(WBPSick.data.records);

        //WBP Isolated
        // const WBPIsolate = await apiReadAllWBPOtmilIsolasi(
        //   token,
        //   currentPageIsolate
        // );
        // const pagenationIsolate = WBPIsolate.data.pagination;
        // const filteredIsolated = WBPIsolate.data.records.filter(
        //   (record) => record.is_sick === 1
        // );
        // setWBPIsolated(filteredIsolated);
        // setWBPIsolated(WBPIsolate.data.records);

        setPagenation(pagenation.totalPages);
        setPagenationSick(pagenationSick.totalPages);
        setPagenationIsolate(pagenationIsolate.totalPages);
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
      data();
    } else {
      localStorage.removeItem("dataUser");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [currentPage, currentPageSick]);

  const handleNext = () => {
    if (currentPage < pagenation) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextSick = () => {
    if (currentPageSick < pagenationSick) {
      setCurrentPageSick(currentPageSick + 1);
    }
  };

  const handleNextIsolate = () => {
    if (currentPageIsolate < pagenationIsolate) {
      setCurrentPageIsolate(currentPageIsolate + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePrevPageSick = () => {
    if (currentPageSick > 1) {
      setCurrentPageSick(currentPageSick - 1);
    }
  };

  const handlePrevPageIsolate = () => {
    if (currentPageIsolate > 1) {
      setCurrentPageIsolate(currentPageIsolate - 1);
    }
  };

  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= pagenation) {
      setCurrentPage(newPage);
    }
  };

  const handlePageChangeSick = (newPage: any) => {
    if (newPage >= 1 && newPage <= pagenationSick) {
      setCurrentPageSick(newPage);
    }
  };

  const handlePageChangeIsolate = (newPage: any) => {
    if (newPage >= 1 && newPage <= pagenationIsolate) {
      setCurrentPageIsolate(newPage);
    }
  };

  const renderPageButtons = () => {
    const totalButtons = pagenation;
    const pageButtons = [];

    // Menentukan halaman pertama yang akan ditampilkan
    let startPage =
      currentPage <= 3 ? 1 : Math.floor((currentPage - 1) / 3) * 3;

    for (let i = startPage; i <= totalButtons && i < startPage + 3; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`hover:border rounded flex items-center justify-center mr-1 ${
            i === currentPage
              ? "bg-white text-black w-5 h-5 "
              : "bg-meta-4 text-white w-5 h-5 "
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  const renderPageButtonsSick = () => {
    const totalButtons = pagenationSick;
    const pageButtonsSick = [];

    // Menentukan halaman pertama yang akan ditampilkan
    let startPage =
      currentPageSick <= 3 ? 1 : Math.floor((currentPageSick - 1) / 3) * 3;

    for (let i = startPage; i <= totalButtons && i < startPage + 3; i++) {
      pageButtonsSick.push(
        <button
          key={i}
          className={`hover:border rounded flex items-center justify-center mr-1 ${
            i === currentPageSick
              ? "bg-white text-black w-5 h-5 "
              : "bg-meta-4 text-white w-5 h-5 "
          }`}
          onClick={() => handlePageChangeSick(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtonsSick;
  };

  const renderPageButtonsIsolate = () => {
    const totalButtons = pagenationIsolate;
    const pageButtonsIsolate = [];

    // Menentukan halaman pertama yang akan ditampilkan
    let startPage =
      currentPageIsolate <= 3
        ? 1
        : Math.floor((currentPageIsolate - 1) / 3) * 3;

    for (let i = startPage; i <= totalButtons && i < startPage + 3; i++) {
      pageButtonsIsolate.push(
        <button
          key={i}
          className={`hover:border rounded flex items-center justify-center mr-1 ${
            i === currentPageIsolate
              ? "bg-white text-black w-5 h-5 "
              : "bg-meta-4 text-white w-5 h-5 "
          }`}
          onClick={() => handlePageChangeIsolate(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtonsIsolate;
  };

  return (
    <>
      {/* <Breadcrumb url={window.location.href} pageName="Statistic"  /> */}
      <div className="mt-1 font-semibold text-2xl tracking-wider">
        Statistik Transforme
        <button className="pl-5">
          <HiQuestionMarkCircle
            values={filter}
            aria-placeholder="Show tutorial"
            onClick={handleClickTutorial}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-2">
        <div
          className={` border border-stroke bg-white pt-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark transition-all duration-300 ease-linear ${
            openTahanan ? "h-40" : "h-36 rounded-sm"
          }`}
          id="total"
        >
          <div className="flex items-center mt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full dark:bg-meta-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {tahananWbp}
              </h4>
              <span className="text-sm font-medium ">Total Pegawai</span>
            </div>
          </div>
          <div className="flex mt-3 items-end justify-center">
            <button onClick={handleOpenTahanan}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${
                  !openTahanan ? "h-5 w-5 hover:h-6 hover:w-6" : "hidden"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${
                  openTahanan ? "h-5 w-5 hover:h-6 hover:w-6" : "hidden"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* jumlah tahanan sakit */}
        <div
          className={` border border-stroke bg-white pt-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark transition-all duration-300 ease-linear ${
            openKesehatan ? "h-40" : "h-36 rounded-sm"
          }`}
          id="sakit"
        >
          <div className="flex items-center mt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2 dark:bg-red-600">
              <FaHospitalUser size={25} color="white" />
            </div>
            <div className="ml-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {tahananSakit}
                </h4>
                <span className="text-sm font-medium">
                  Jumlah Pegawai Sakit
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-3 items-end justify-center">
            <button onClick={handleOpenKesehatan}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${
                  !openKesehatan ? "h-5 w-5 hover:h-6 hover:w-6" : "hidden"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${
                  openKesehatan ? "h-5 w-5 hover:h-6 hover:w-6" : "hidden"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>{" "}
        {/* tahanan Terisolasi */}
        <div
          className={`border border-stroke bg-white pt-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark transition-all duration-300 ease-linear ${
            openIsolasi ? "h-40" : "h-36 rounded-sm"
          }`}
          id="terisolasi"
        >
          <div className="flex items-center mt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-300">
              <BsPersonFillLock size={25} color="red" />
            </div>

            <div className="ml-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {tahananIsolasi}
                </h4>
                <span className="text-sm font-medium">
                  Jumlah Pegawai Hadir
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-3 items-end justify-center">
            <button onClick={handelOpenIsolasi}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${
                  !openIsolasi ? "h-5 w-5 hover:h-6 hover:w-6" : "hidden"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`${
                  openIsolasi ? "h-5 w-5 hover:h-6 hover:w-6" : "hidden"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* jumlah tahanan */}
      <div
        className={`overflow-hidden ${
          openTahanan ? "h-44 w-full" : "h-0 mt-2"
        } transition-all duration-300 ease-linear ${
          !openIsolasi ? "" : "hidden"
        } ${!openKesehatan ? "" : "hidden"}`}
      >
        <div className="z-9999 flex h-full justify-end">
          <div className="w-full border bg-white shadow-default dark:border-2 dark:bg-boxdark ">
            <div className="flex ">
              <div className="w-28">
                <h1 className="border-b-2 flex justify-center">No Pegawai</h1>
                <div className="h-44  border-b-2">
                  {WPB.map((item: any) => {
                    return (
                      <h1 className="truncate flex justify-center capitalize mb-1">
                        {item.nomor_tahanan}
                      </h1>
                    );
                  })}
                </div>
              </div>
              <div className="w-1/4">
                <h1 className="border-x-2 border-b-2 pl-2">Nama</h1>
                <div className="h-44 border-x-2 border-b-2 pl-2">
                  {WPB.map((item: any) => {
                    return (
                      <h1 className="truncate capitalize mb-1">{item.nama}</h1>
                    );
                  })}
                </div>
              </div>
              <div className="w-1/4">
                <h1 className="border-b-2 pl-2">NIP</h1>
                <div className="h-44 pl-2">
                  {WPB.map((item: any) => {
                    return <h1 className="capitalize mb-1">{item.nrp}</h1>;
                  })}
                </div>
              </div>
              <div className="w-1/4">
                <h1 className="border-l-2 border-b-2 pl-2">Status</h1>
                <div className="h-44 border-l-2 border-b-2 pl-2">
                  {WPB.map((item: any) => {
                    return (
                      <h1 className="capitalize mb-1">
                        {item.nama_status_wbp_kasus}
                      </h1>
                    );
                  })}
                </div>
              </div>
              <div className="w-1/4">
                <h1 className="border-b-2 border-l-2 pl-2">Tanggal Kontrak</h1>
                <div className="h-44 border-l-2 pl-2">
                  {WPB.map((item: any) => {
                    return (
                      <h1 className="capitalize mb-1">
                        {item.tanggal_ditahan_otmil}
                      </h1>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          openTahanan ? "mt-2 ml-4 flex items-center h-5" : "hidden"
        }`}
      >
        <button
          className={`${currentPage === 1 ? "hidden" : "w-5"}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 hover:w-5 hover:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {renderPageButtons()}
        <button
          className={`${currentPage === pagenation ? "hidden" : "w-5"}`}
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 hover:w-5 hover:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      {/* jumlah tahanan SAKIT */}
      <div
        className={`overflow-hidden ${
          openKesehatan ? "h-44 w-full" : "h-0 mt-2"
        } transition-all duration-300 ease-linear ${
          !openIsolasi ? "" : "hidden"
        } ${!openTahanan ? "" : "hidden"}`}
      >
        <div className="z-9999 flex h-full justify-center">
          <div className="w-full border bg-white shadow-default dark:border-2 dark:bg-boxdark ">
            <div className="flex ">
              <div className="w-28">
                <h1 className="border-b-2 flex justify-center">No Pegawai</h1>
                <div className="h-44  border-b-2">
                  {WPBSick.map((item: any) => {
                    return (
                      <h1 className="truncate flex justify-center mb-1">
                        {item.nomor_tahanan}
                      </h1>
                    );
                  })}
                </div>
              </div>
              <div className="w-2/4">
                <h1 className="border-x-2 border-b-2 pl-2">Nama</h1>
                <div className="h-44 border-x-2 border-b-2 pl-2">
                  {WPBSick.map((item: any) => {
                    return (
                      <h1 className="truncate capitalize mb-1">{item.nama}</h1>
                    );
                  })}
                </div>
              </div>
              <div className="w-2/4">
                <h1 className=" border-b-2 pl-2">Keterangan Sakit</h1>
                <div className="h-44 border-b-2 pl-2">
                  {WPBSick.map((item: any) => {
                    return (
                      <h1 className="truncate capitalize mb-1">
                        {item.wbp_sickness}
                      </h1>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          openKesehatan ? "mt-2 ml-4 flex items-center h-5" : "hidden"
        }`}
      >
        <button
          className={`${currentPageSick === 1 ? "hidden" : "w-5"}`}
          onClick={handlePrevPageSick}
          disabled={currentPageSick === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 hover:w-5 hover:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {renderPageButtonsSick()}
        <button
          className={`${currentPageSick === pagenationSick ? "hidden" : "w-5"}`}
          onClick={handleNextSick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 hover:w-5 hover:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      {/* jumlah TERISOLIR */}
      <div
        className={`overflow-hidden ${
          openIsolasi ? "h-44 w-full" : "h-0 mt-1"
        } transition-all duration-300 ease-linear ${
          !openKesehatan ? "" : "hidden"
        } ${!openTahanan ? "" : "hidden"}`}
      >
        <div className="z-9999 flex h-full justify-end">
          <div className="w-full border bg-white shadow-default dark:border-2 dark:bg-boxdark ">
            <div className="flex ">
              <div className="w-1/6">
                <h1 className="border-b-2 flex justify-center">No Tahanan</h1>
                <div className="h-44  border-b-2">
                  {WPBIsolated.map((item: any) => {
                    return (
                      <h1 className="truncate flex justify-center capitalize mb-1">
                        {item.nomor_tahanan}
                      </h1>
                    );
                  })}
                </div>
              </div>
              <div className="w-5/6">
                <h1 className="border-x-2 border-b-2 pl-2">Nama</h1>
                <div className="h-44 border-x-2 border-b-2 ">
                  {WPBIsolated.map((item: any) => {
                    return (
                      <h1 className="truncate pl-2 capitalize mb-1">
                        {item.nama}
                      </h1>
                    );
                  })}
                </div>
              </div>
              {/* <div className="w-1/4">
                <h1 className="border-b-2">Penyebab</h1>
                <div className="h-44">
                  <h1>2312</h1>
                </div>
              </div>
              <div className="w-2/4">
                <h1 className="border-l-2 border-b-2 ">
                  Keterangan Terisolasi
                </h1>
                <div className="h-44 border-l-2 border-b-2 ">
                  <h1>2312</h1>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          openIsolasi ? "mt-2 ml-4 flex items-center h-5" : "hidden"
        }`}
      >
        <button
          className={`${currentPageIsolate === 1 ? "hidden" : "w-5"}`}
          onClick={handlePrevPageIsolate}
          disabled={currentPageIsolate === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 hover:w-5 hover:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {renderPageButtonsIsolate()}
        <button
          className={`${
            currentPageIsolate === pagenationIsolate ? "hidden" : "w-5"
          }`}
          onClick={handleNextIsolate}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 hover:w-5 hover:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Tahanan;
