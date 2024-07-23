import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import { AddAktifitasPengunjung } from "./ModalAddAktifitasPengunjung";
import { DeleteAktifitasPengunjungModal } from "./ModalDeleteAktifitasPengunjung";
import { Alerts } from "./AlertAktifitasPengunjung";
import {
  apiReadAktifitasPengunjung,
  apiDeleteAktifitasPengunjung,
  apiCreateAktifitasPengunjung,
  apiUpdateAktifitasPengunjung,
} from "../../services/api";
import Pagination from "../../components/Pagination";
import SearchInputButton from "../Device/Search";
import * as xlsx from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownAction from "../../components/DropdownAction";
import dayjs from "dayjs";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";
import { Breadcrumbs } from "../../components/Breadcrumbs";

// Interface untuk objek 'params' dan 'item'
interface Item {
  nama_aktivitas_pengunjung: string;
  waktu_mulai_kunjungan: string;
  waktu_selesai_kunjungan: string;
  tujuan_kunjungan: string;
  lokasi_otmil_id: string;
  ruangan_otmil_id: string;
  jenis_ruangan_otmil: string;
  petugas_id: string;
  nama_petugas: string;
  pengunjung_id: string;
  nama_pengunjung: string;
  wbp_profile_id: string;
  nama_wbp: string;
}

const AktifitasPengunjungList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // useState untuk menampung data dari API
  const [data, setData] = useState<Item[]>([]);
  const [detailData, setDetailData] = useState<Item | null>(null);
  const [editData, setEditData] = useState<Item | null>(null);
  const [deleteData, setDeleteData] = useState<Item | null>(null);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dataExcel, setDataExcel] = useState([]);

  const [isOperator, setIsOperator] = useState<boolean>();

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  const [searchData, setSearchData] = useState({
    nama_pengunjung: "",
    nama_wbp: "",
  });

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);

    // try {
    //   const response = await apiReadKategoriPerkara({ filter: { nama_kategori_perkara: newFilter } });
    //   setPages(response.data.pagination.totalPages);
    //   setRows(response.data.pagination.totalRecords);
    //   if (response.data.status === 'OK') {
    //     const result = response.data;
    //     setData(result.records);
    //   } else {
    //     throw new Error('Terjadi kesalahan saat mencari data.');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".search",
          popover: {
            title: "Search",
            description: "Mencari nama pengunjung ",
          },
        },
        {
          element: ".search-wbp",
          popover: {
            title: "Search",
            description: "Mencari nama wbp ",
          },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari nama pengunjung dan wbp",
          },
        },
        {
          element: ".excel",
          popover: {
            title: "Excel",
            description: "Mendapatkan file excel",
          },
        },
        {
          element: ".b-tambah",
          popover: {
            title: "Tambah",
            description: "Menambahkan data aktivitas pengunjung",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleSearchClick = async () => {
    // const params = {
    //   // pagination: {
    //   //   pageSize: 3,
    //   // },
    //   filter: {
    //     nama_wbp: filter,
    //     nama_lokasi_otmil: 'Cimahi',
    //     waktu_mulai_kunjungan: selectedMonth ? selectedMonth : null,
    //   },
    // };
    let params = {
      nama_pengunjung: filter,
      nama_wbp: searchData.nama_wbp,
      page: currentPage,
      pageSize: pageSize,
    };
    // setIsLoading(true);
    try {
      const response = await apiReadAktifitasPengunjung(params, token);
      if (response.data.status !== "OK") {
        throw new Error(response.data);
      }
      const result = response.data.records;
      setData(result);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      // setIsLoading(false);
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

  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearchClick();
      console.log("ENTER DIPNCET");
    }
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  // useEffect untuk fetch data dari API
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); // Anda juga dapat menambahkan dependencies jika diperlukan

  const fetchData = async () => {
    let params = {
      // filter: { nama_lokasi_otmil: 'Cimahi' },
      page: currentPage,
      pageSize: pageSize,
    };
    setIsLoading(true);
    try {
      const response = await apiReadAktifitasPengunjung(params, token);
      if (response.data.status !== "OK") {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setData(result);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      setIsLoading(false);
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

  // function untuk menampilkan modal detail
  const handleDetailClick = (item: Item) => {
    setDetailData(item);
    setModalDetailOpen(true);
  };

  // function untuk menampilkan modal edit
  const handleEditClick = (item: Item) => {
    setEditData(item);
    setModalEditOpen(true);
  };

  // function untuk menampilkan modal delete
  const handleDeleteClick = (item: Item) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  // function untuk menutup modal
  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  // function untuk menutup modal
  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  // function untuk menghapus data
  const handleSubmitDelete = async (params: any) => {
    try {
      const responseDelete = await apiDeleteAktifitasPengunjung(params, token);
      if (responseDelete.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menghapus data",
        });
        setModalDeleteOpen(false);
        fetchData();
      } else if (responseDelete.data.status === "NO") {
        Alerts.fire({
          icon: "error",
          title: "Gagal hapus data",
        });
      } else {
        throw new Error(responseDelete.data.message);
      }
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

  // function untuk menambah data
  const handleSubmitAdd = async (params: any) => {
    console.log("DATA DARI LIST", params);
    try {
      const responseCreate = await apiCreateAktifitasPengunjung(params, token);
      if (responseCreate.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        setModalAddOpen(false);
        fetchData();
      } else if (responseCreate.data.status === "NO") {
        Alerts.fire({
          icon: "error",
          title: "Gagal membuat data",
        });
      } else {
        throw new Error(responseCreate.data.message);
      }
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

  // function untuk mengubah data
  const handleSubmitEdit = async (params: any) => {
    console.log(params, "edit");
    try {
      const responseEdit = await apiUpdateAktifitasPengunjung(params, token);
      if (responseEdit.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil mengubah data",
        });
        setModalEditOpen(false);
        fetchData();
      } else if (responseEdit.data.status === "NO") {
        Alerts.fire({
          icon: "error",
          title: "Gagal mengubah data",
        });
      } else {
        throw new Error(responseEdit.data.message);
      }
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

  useEffect(() => {
    if (dataAdmin?.role_name === "operator") {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }

    console.log(isOperator, "Operator");
  }, [isOperator]);

  const exportToExcelByMonth = () => {
    const dataToExcel = [
      [
        "Nama Aktivitas Pengunjung",
        "Waktu Mulai Kunjungan",
        "Waktu Selesai Kunjungan",
        "Tujuan Kunjungan",
        "Lokasi OTMIL",
        "Ruangan OTMIL",
        "Status Zona Ruangan",
        "Nama Petugas",
        "Nama Pengunjung",
        "Nama WBP",
      ],
      ...data.map((item: any) => [
        item.nama_aktivitas_pengunjung,
        item.waktu_mulai_kunjungan,
        item.waktu_selesai_kunjungan,
        item.tujuan_kunjungan,
        item.nama_lokasi_otmil,
        item.nama_ruangan_otmil,
        item.status_zona_ruangan_otmil,
        item.nama_petugas,
        item.nama_pengunjung,
        item.nama_wbp,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(
      wb,
      `Data-Aktifitas-Pengunjung ${dayjs(new Date()).format(
        "DD-MM-YYYY HH.mm"
      )}.xlsx`
    );
  };

  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener("keypress", handleEnterKeyPress);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [filter]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="pb-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="w-full search">
              <SearchInputButton
                value={filter}
                placehorder="Cari nama pengunjung"
                onChange={handleFilterChange}
                // onClick={handleSearchClick}
              />
            </div>
            <div className="w-full search-wbp">
              <SearchInputButton
                value={searchData.nama_wbp}
                placehorder="Cari nama WBP"
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    nama_wbp: e.target.value,
                  })
                }
              />
            </div>
            <button
              className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search "
              type="button"
              onClick={handleSearchClick}
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={exportToExcelByMonth}
              className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium excel"
            >
              Export&nbsp;Excel
            </button>

            <div className="w-10">
              <button>
                <HiQuestionMarkCircle
                  values={filter}
                  aria-placeholder="Show tutorial"
                  // onChange={}
                  onClick={handleClickTutorial}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="ext-xl font-semibold text-black dark:text-white">
            Data Aktivitas Pengunjung
          </h4>
          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(true)}
              className=" text-black rounded-md font-semibold bg-blue-300 py-2 px-3 b-tambah"
            >
              Tambah
            </button>
          )}
        </div>

        <div className="flex flex-col">
          {isOperator ? (
            <div className="grid items-center grid-cols-6 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-6 ">
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Aktivitas
                </h5>
              </div>
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  waktu mulai
                </h5>
              </div>
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  waktu selesai
                </h5>
              </div>
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  tujuan
                </h5>
              </div>
              <div className="py-2.5 text-center col-span-0.5 xl:py-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  nama Pengunjung
                </h5>
              </div>
              <div className="p-2.5 col-span-0.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  nama WBP
                </h5>
              </div>
            </div>
          ) : (
            <div className="grid items-center grid-cols-7 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-7 ">
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Aktivitas
                </h5>
              </div>
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  waktu mulai
                </h5>
              </div>
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  waktu selesai
                </h5>
              </div>
              <div className="p-2.5 text-center col-span-1 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  tujuan
                </h5>
              </div>
              <div className="py-2.5 text-center col-span-0.5 xl:py-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  nama Pengunjung
                </h5>
              </div>
              <div className="p-2.5 col-span-0.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  nama WBP
                </h5>
              </div>
              <div className="hidden p-2.5 col-span-1 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Aksi
                </h5>
              </div>
            </div>
          )}

          {data.length === 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any, index) => {
                return (
                  <div key={index}>
                    <div
                      className={`grid ${
                        isOperator ? "grid-cols-6" : "grid-cols-7"
                      } rounded-sm bg-gray-2 dark:bg-meta-4`}
                    >
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="cursor-pointer hidden truncate items-center justify-start p-2.5 sm:flex xl:p-5"
                      >
                        <p className="text-black text-start dark:text-white">
                          {item.nama_aktivitas_pengunjung}
                        </p>
                      </div>
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="cursor-pointer hidden truncate items-center justify-center p-2.5 sm:flex xl:p-2"
                      >
                        <p className="text-black text-center dark:text-white">
                          {formatDate(item.waktu_mulai_kunjungan)}
                        </p>
                      </div>
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="cursor-pointer hidden truncate items-center justify-center p-2.5 sm:flex xl:p-2"
                      >
                        <p className="text-black dark:text-white">
                          {formatDate(item.waktu_selesai_kunjungan)}
                        </p>
                      </div>
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="cursor-pointer hidden truncate items-center justify-center p-2.5 sm:flex xl:p-3"
                      >
                        <p className="text-black dark:text-white">
                          {item.tujuan_kunjungan}
                        </p>
                      </div>
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="cursor-pointer hidden truncate items-center justify-center p-2.5 sm:flex xl:p-5"
                      >
                        <p className="text-black dark:text-white">
                          {item.nama_pengunjung}
                        </p>
                      </div>
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="cursor-pointer hidden truncate items-center justify-center p-2.5 sm:flex xl:p-5"
                      >
                        <p className="text-black dark:text-white">
                          {item.nama_wbp}
                        </p>
                      </div>

                      {!isOperator && (
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 flex-wrap lg:flex-nowrap gap-2">
                          {/* <button
                      onClick={() => handleDetailClick(item)}
                      className="py-1 px-2 text-black rounded-md bg-blue-300"
                    >
                      Detail
                    </button> */}

                          {/* <button
                      onClick={() => handleEditClick(item)}
                      className="py-1 px-2 text-black rounded-md bg-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="py-1 px-2 text-white rounded-md bg-red-400"
                    >
                      Delete
                    </button> */}
                          <div className="relative">
                            <DropdownAction
                              handleEditClick={() => handleEditClick(item)}
                              handleDeleteClick={() => handleDeleteClick(item)}
                            ></DropdownAction>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-slate-600"></div>
                  </div>
                );
              })}
            </>
          )}
          {modalDetailOpen && (
            <AddAktifitasPengunjung
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAdd}
              defaultValue={detailData}
              isDetail={true}
            />
          )}
          {modalEditOpen && (
            <AddAktifitasPengunjung
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEdit}
              defaultValue={editData}
              isEdit={true}
            />
          )}
          {modalAddOpen && (
            <AddAktifitasPengunjung
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAdd}
            />
          )}
          {modalDeleteOpen && (
            <DeleteAktifitasPengunjungModal
              closeModal={handleCloseDeleteModal}
              onSubmit={handleSubmitDelete}
              defaultValue={deleteData}
            />
          )}
        </div>
        {data.length === 0 ? null : (
          <div className="mt-5">
            <div className="flex gap-4 items-center ">
              <p>
                Total Rows: {rows} Page: {rows ? currentPage : null} of {pages}
              </p>
              <select
                value={pageSize}
                onChange={handleChangePageSize}
                className=" rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
              </select>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onChangePage={handleChagePage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AktifitasPengunjungList;
