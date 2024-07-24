import { useEffect, useState } from "react";
import { apiEvent } from "../../services/api";
import { useAtom } from "jotai";
import { TutorialStatistic } from "../../utils/atomstates";
import toast from "react-hot-toast";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Kegiatan = () => {
  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken?.token ? dataToken?.token : null;

  const [Kegiatan, setKegiatan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagenation, setPagenation] = useState(0);
  const [totalRecords, setTotalRecors] = useState(0);
  const [isStatistic, setIsStatistic] = useAtom(TutorialStatistic);

  // const location = useLocation();
  let handleDetail = (item) => {
    console.log("notif check clicked");

    // toast("Hello World")

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } w-[50%] absolute left-[25%] top-[15vh] h-[70vh] bg-slate-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
        overflow-y-scroll
        `}
        >
          <div className="w-full text-white">
            <section className="w-full flex px-4 py-4 justify-between">
              <button
                type="button"
                onClick={() => {
                  toast.remove();
                }}
              >
                <p className="font-semibold text-lg">Detail Kegiatan</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.remove();
                }}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </section>

            <div className="flex px-6 mb-4 gap-x-6">
              <section className="w-full">
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Nama</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">{item.nama_kegiatan}</p>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Status</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">{item.status_kegiatan}</p>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Waktu Mulai</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">{item.waktu_mulai_kegiatan}</p>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Waktu Selesai</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">{item.waktu_selesai_kegiatan}</p>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Jenis Ruangan</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">
                      {item.jenis_ruangan_lemasmil
                        ? item.jenis_ruangan_lemasmil
                        : item.jenis_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Lokasi</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">
                      {item.nama_lokasi_lemasmil
                        ? item.nama_lokasi_lemasmil
                        : item.nama_lokasi_otmil}
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Ruangan</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">
                      {item.nama_ruangan_lemasmil
                        ? item.nama_ruangan_lemasmil
                        : item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Zona</p>
                  </div>
                  <div className="flex-2">
                    <p className="text-sm">
                      {item.status_zona_lemasmil
                        ? item.status_zona_lemasmil
                        : item.status_zona_otmil}
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="mt-4 pb-4">
              <p className=" mb-3 text-center bg-slate-500  font-semibold text-white rounded-md mx-8">
                Peserta Kegiatan
              </p>
              <div className="w-full px-8  text-center overflow-y-scroll">
                <table className=" table-auto w-full ">
                  <thead>
                    <tr className="bg-slate-700  py-1">
                      <th className="text-xs w-[50%]">No</th>
                      <th className="text-xs w-[50%]">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-xs">1</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">2</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">3</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">4</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">5</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">6</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">7</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">8</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">9</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                    <tr>
                      <td className="text-xs">10</td>
                      <td className="text-xs">Dodi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: 50000,
      }
    );
  };
  useEffect(() => {
    const data = async () => {
      try {
        const response = await apiEvent(token);
        const kegiatan = response?.records;
        const pagenation = response?.pagination;
        setPagenation(pagenation?.totalPages);
        setTotalRecors(pagenation?.totalRecords);
        setKegiatan(kegiatan);
      } catch (e: any) {
        // if (e.response.status === 403) {
        //   navigate("/", {
        //     state: { forceLogout: true, lastPage: location.pathname },
        //   });
        // }
        // Alerts.fire({
        //   icon: e.response.status === 403 ? "warning" : "error",
        //   title: e.response.status === 403 ? Error403Message : e.message,
        // });
      }
    };
    data();
  }, [currentPage]);

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

  const handleNextPage = () => {
    if (currentPage < pagenation) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= pagenation) {
      setCurrentPage(newPage);
    }
  };

  const renderPageButtons = () => {
    const totalButtons = pagenation;
    const pageButtons = [];

    // Menentukan halaman pertama yang akan ditampilkan
    let startPage =
      currentPage <= 5 ? 1 : Math.floor((currentPage - 1) / 5) * 5;

    for (let i = startPage; i <= totalButtons && i < startPage + 5; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`hover:border rounded flex items-center justify-center bg-meta-4 mr-1 ${
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
  const startingNumber = (currentPage - 1) * Kegiatan.length + 1;

  return (
    <div className=" w-full mt-2 text-slate-300 text-base lg:text-m">
      <div className="flex bg-meta-4 h-44 justify-between items-center">
        <div className="border-2 ">
          <div className="border-b-2 h-12 flex items-center px-2">No</div>
          <div className="">
            <div className="h-32">
              {Kegiatan.map((_, index) => (
                <h2
                  className="flex justify-center items-center"
                  key={index + 1}
                >
                  {startingNumber + index}
                </h2>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/6 border-y-2">
          <div className="h-12 border-b-2 items-center flex pl-2">
            Jenis Kegiatan
          </div>
          <div className="h-32  text-center">
            {Kegiatan.map((item: any) => {
              return (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      handleDetail(item);
                    }}
                    className="pl-2  hover:bg-slate-600 w-full truncate capitalize"
                  >
                    {item.nama_kegiatan}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/6 border-2">
          <div className="h-12 flex justify-center items-center border-b-2">
            Lokasi
          </div>
          <div className="h-32 ">
            {Kegiatan.map((item: any) => {
              return (
                <div className="flex justify-center items-center truncate">
                  <h2 className="truncate capitalize">
                    {item.nama_ruangan_otmil}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-2/6 border-y-2">
          <div className="h-12 border-b-2">
            <h1 className="flex justify-center border-b-2">Waktu kegiatan</h1>
            <div className="flex">
              <h2 className="w-1/2 flex justify-center text-sm border-r-2">
                Mulai
              </h2>
              <h2 className="w-1/2 flex justify-center text-sm">Selesai</h2>
            </div>
          </div>
          <div className="flex">
            <div className="w-2/4 border-r-2">
              <div className="h-32">
                {Kegiatan.map((item: any) => {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        handleDetail(item);
                      }}
                      className="flex justify-center  w-full text-center items-center"
                    >
                      <h2 className="truncate  text-center  hover:bg-slate-600 w-full ">
                        {item.waktu_mulai_kegiatan}
                      </h2>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-2/4">
              <div className="h-32">
                {Kegiatan.map((item: any) => {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        handleDetail(item);
                      }}
                      className="flex justify-center w-full text-center items-center"
                    >
                      <h2 className="truncate text-center  hover:bg-slate-600 w-full  capitalize">
                        {item.waktu_selesai_kegiatan}
                      </h2>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/6 border-2">
          <h1 className="h-12 items-center flex justify-center border-b-2">
            Jumlah Peserta
          </h1>
          <div className="h-32">
            {Kegiatan.map((item: any) => {
              return (
                <button
                  type="button"
                  onClick={() => {
                    handleDetail(item);
                  }}
                  className="flex  hover:bg-slate-600 w-full  justify-center items-center"
                >
                  <h2>{item.peserta.length}</h2>
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-1/6 border-y-2 border-r-2">
          <h1 className="h-12 items-center flex border-b-2 justify-center">
            Status
          </h1>
          <div className="h-32 text-center">
            {Kegiatan.map((item: any) => {
              return (
                <div className="flex justify-center items-center">
                  <h2 className="capitalize truncate">
                    {item.status_kegiatan}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-2 ml-4 flex items-center h-6">
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
          onClick={handleNextPage}
          className={`${currentPage === pagenation ? "hidden" : "w-5"}`}
          disabled={currentPage === pagenation}
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
    </div>
  );
};

export default Kegiatan;
