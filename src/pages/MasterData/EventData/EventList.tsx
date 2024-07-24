import React, { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import { Alerts } from "./AlertEvent";
import SearchInputButton from "../Search";
import Pagination from "../../../components/Pagination";
import {
  apiCreateAllEvent,
  apiDeleteAllEvent,
  apiReadAllEvent,
  apiUpdateAllEvent,
} from "../../../services/api";
import { AddEventModal } from "./ModalAddEvent";
import { DeleteEventModal } from "./ModalDeleteEvent";
import * as xlsx from "xlsx";
import ToolsTip from "../../../components/ToolsTip";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import DropdownAction from "../../../components/DropdownAction";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

// Interface untuk objek 'params' dan 'item'
interface Params {
  filter: string;
}
interface Item {
  kegiatan_id: string;
  nama_kegiatan: string;
  nama_lokasi_otmil: string;
  lokasi_otmil_id: string;
  ruangan_otmil_id: string;
  nama_ruangan_otmil: string;
  jenis_ruangan_otmil: string;
  status_zona_otmil: string;
  status_kegiatan: string;
  waktu_selesai_kegiatan: any;
  waktu_mulai_kegiatan: any;
}

const EventList = () => {
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
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [dataExcel, setDataExcel] = useState([]);
  const [isOperator, setIsOperator] = useState<boolean>();
  const [pageSize, setPageSize] = useState(10);
  const [totalPeserta, setTotalPeserta] = useState(0);

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    // try {
    //   const response = await apiReadAllEvent({
    //     filter: { nama_kegiatan: newFilter },
    //   });
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
  const handleSearchClick = async () => {
    let params = {
      filter: {
        nama_kegiatan: filter,
        nama_lokasi_otmil: "Cimahi",
      },
    };
    try {
      const response = await apiReadAllEvent(params, token);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      if (response.status === 200) {
        const result = response.data;
        setData(result.records);
      } else {
        throw new Error("Terjadi kesalahan saat mencari data.");
      }
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

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".search",
          popover: {
            title: "Search",
            description: "Mencari nama kegiatan",
          },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari nama kegiatan",
          },
        },
        {
          element: ".excel",
          popover: { title: "Excel", description: "Mendapatkan file excel" },
        },
        {
          element: ".b-tambah",
          popover: {
            title: "Tambah",
            description: "Menambahkan data kegiatan",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearchClick();
      console.log("ENTER DIPNCET");
    }
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

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };
  // useEffect untuk fetch data dari API
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); // Anda juga dapat menambahkan dependencies jika diperlukan

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener("keypress", handleEnterKeyPress);
    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [filter]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

  // useEffect untuk fetch data dari API
  useEffect(() => {
    fetchData();
  }, [currentPage]); // Anda juga dapat menambahkan dependencies jika diperlukan
  const fetchData = async () => {
    let params = {
      filter: {
        nama_lokasi_otmil: "Cimahi",
      },
      page: currentPage,
      pageSize: pageSize,
    };
    setIsLoading(true);
    try {
      const response = await apiReadAllEvent(params, token);
      console.log("response :", response);
      if (response.data.status !== "OK") {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      // Menghitung jumlah peserta dari data yang diterima
      let totalPeserta = result.reduce((total: number, event: any) => {
        return total + event.peserta.length;
      }, 0);
      setData(result);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      setTotalPeserta(totalPeserta); // Menyimpan total peserta dalam state jika diperlukan
      setIsLoading(false);
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

  // const fetchData = async () => {
  //   let params = {
  //     filter: {
  //       nama_lokasi_otmil: 'Cimahi',
  //     },
  //     page: currentPage,
  //     pageSize: pageSize,
  //   };
  //   setIsLoading(true);
  //   try {
  //     const response = await apiReadAllEvent(params, token);
  //     console.log('response :', response);
  //     if (response.data.status !== 'OK') {
  //       throw new Error(response.data.message);
  //     }
  //     const result = response.data.records;
  //     setData(result);
  //     setPages(response.data.pagination.totalPages);
  //     setRows(response.data.pagination.totalRecords);
  //     setIsLoading(false);
  //   } catch (e: any) {
  //     if (e.response.status === 403) {
  //       navigate('/', {
  //         state: { forceLogout: true, lastPage: location.pathname },
  //       });
  //     }
  //     Alerts.fire({
  //       icon: e.response.status === 403 ? 'warning' : 'error',
  //       title: e.response.status === 403 ? Error403Message : e.message,
  //     });
  //   }
  // };
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
  const handleDeleteClick = (item: any) => {
    const newDelItem: any = {
      nama_kegiatan: item.nama_kegiatan,
      kegiatan_id: item.kegiatan_id,
    };
    setDeleteData(newDelItem);
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
      const responseDelete = await apiDeleteAllEvent(params, token);
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

  // function untuk menambah data
  const handleSubmitAdd = async (params: any) => {
    console.log("DATA DARI LIST", params);
    try {
      const responseCreate = await apiCreateAllEvent(params, token);
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

  // function untuk mengubah data
  const handleSubmitEdit = async (params: any) => {
    console.log(params, "edit");
    try {
      const responseEdit = await apiUpdateAllEvent(params, token);
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

  useEffect(() => {
    if (dataAdmin?.role_name === "operator") {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }
    console.log(isOperator, "Operator");
  }, [isOperator]);

  const exportToExcel = () => {
    const dataToExcel = [
      [
        "Nama Kegiatan",
        "status kegiatan",
        "waktu mulai",
        "waktu selesai",
        "peserta",
        "nama ruangan",
        "jenis ruangan",
        "nama lokasi",
        "zona",
      ],
      ...data.map((item: any) => {
        const pesertaNames = item.peserta
          .map((peserta: any) => peserta.wbp_nama)
          .join(", "); // Mengambil semua nama peserta dan menggabungkannya menjadi satu string
        return [
          item.nama_kegiatan,
          item.status_kegiatan,
          item.waktu_mulai_kegiatan,
          item.waktu_selesai_kegiatan,
          pesertaNames,
          item.nama_ruangan_otmil,
          item.jenis_ruangan_otmil,
          item.nama_lokasi_otmil,
          item.status_zona_otmil,
        ];
      }),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "data_kegiatan.xlsx");
  };

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
                placehorder="Cari nama Kegiatan"
                onChange={handleFilterChange}

                // onClick={handleSearchClick}
              />
            </div>
            <button
              className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search"
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
              onClick={exportToExcel}
              className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium excel"
            >
              Export&nbsp;Excel
            </button>
            {/* <div className="w-10"> */}
            <button>
              <HiQuestionMarkCircle
                values={filter}
                aria-placeholder="Show tutorial"
                // onChange={}
                onClick={handleClickTutorial}
              />
            </button>
            {/* </div> */}
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Kegiatan
          </h4>
          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(true)}
              className="text-black rounded-md font-semibold bg-blue-300 py-2 px-3 b-tambah"
            >
              Tambah
            </button>
          )}
        </div>
        <div className="flex flex-col">
          {isOperator ? (
            <div className="grid grid-cols-5 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-5">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Kegiatan
                </h5>
              </div>
              <div className="p-2.5 text-center xl:py-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status Kegiatan
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Mulai Kegiatan{" "}
                </h5>
              </div>
              <div className="p-2.5 text-center xl:py-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Selesai Kegiatan
                </h5>
              </div>
              {/* <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Zona
            </h5>
          </div> */}
            </div>
          ) : (
            <div className="grid grid-cols-7 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-7">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Kegiatan
                </h5>
              </div>
              <div className="p-2.5 text-center xl:py-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status Kegiatan
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Mulai Kegiatan{" "}
                </h5>
              </div>
              <div className="p-2.5 text-center xl:py-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Selesai Kegiatan
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Ruangan
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Total Peserta
                </h5>
              </div>
              {/* <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Zona
            </h5>
          </div> */}
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Aksi
                </h5>
              </div>
            </div>
          )}

          {data.length == 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any) => {
                return (
                  <div>
                    {isOperator ? (
                      <>
                        <div
                          className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5 capitalize"
                          key={item.nama_kegiatan}
                        >
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex cursor-pointer items-center justify-center gap-3 p-2.5 xl:p-5"
                          >
                            <p className="hidden text-black dark:text-white sm:block">
                              {item.nama_kegiatan}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex cursor-pointer items-center justify-center gap-3 p-2.5 xl:p-5"
                          >
                            <p className="hidden text-black dark:text-white sm:block">
                              {item.status_kegiatan}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex cursor-pointer items-center justify-center p-2.5 xl:p-5"
                          >
                            <p className="text-black dark:text-white">
                              {formatDate(item.waktu_mulai_kegiatan)}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="hidden cursor-pointer items-center justify-center p-2.5 sm:flex xl:p-5"
                          >
                            <p className="text-black dark:text-white">
                              {formatDate(item.waktu_selesai_kegiatan)}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="hidden cursor-pointer items-center justify-center p-2.5 sm:flex xl:p-5"
                          >
                            <p className="text-black dark:text-white">
                              {item.nama_ruangan_otmil}
                            </p>
                          </div>
                        </div>
                        <div className="border-t border-slate-600"></div>
                      </>
                    ) : (
                      <>
                        <div
                          className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 capitalize"
                          key={item.nama_jaksa}
                        >
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex cursor-pointer items-center justify-center gap-3 p-2.5 xl:p-5"
                          >
                            <p className="hidden text-black dark:text-white sm:block">
                              {item.nama_kegiatan}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex cursor-pointer items-center justify-center gap-3 p-2.5 xl:p-5"
                          >
                            <p className="hidden text-black dark:text-white sm:block">
                              {item.status_kegiatan}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="flex cursor-pointer items-center justify-center p-2.5 xl:p-5"
                          >
                            <p className="text-black dark:text-white">
                              {formatDate(item.waktu_mulai_kegiatan)}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="hidden cursor-pointer items-center justify-center p-2.5 sm:flex xl:p-5"
                          >
                            <p className="text-black dark:text-white">
                              {formatDate(item.waktu_selesai_kegiatan)}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="hidden cursor-pointer items-center justify-center p-2.5 sm:flex xl:p-5"
                          >
                            <p className="text-black dark:text-white">
                              {item.nama_ruangan_otmil}
                            </p>
                          </div>
                          <div
                            onClick={() => handleDetailClick(item)}
                            className="hidden cursor-pointer items-center justify-center p-2.5 sm:flex xl:p-5"
                          >
                            <p className="text-black dark:text-white">
                              {/* {item.peserta.length} */}
                              {item.peserta.length > 0 &&
                                `${item.peserta.length} Peserta`}
                            </p>
                          </div>
                          {/* <div onClick={() => handleDetailClick(item)} className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    {item.status_zona_otmil === 'Hijau' ? (
                      <p className="text-green-500 dark:text-green-300">Hijau</p>
                    ) : item.status_zona_otmil === 'Merah' ? (
                      <p className="text-red-500 dark:text-red-300">Merah</p>
                    ) : item.status_zona_otmil === 'Kuning' ? (
                      <p className="text-yellow-500 dark:text-yellow-300">Kuning</p>
                    ) : (
                      <p className="text-black dark:text-white">Status Tidak Dikenali</p>
                    )}
                  </div> */}

                          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 flex-wrap lg:flex-nowrap gap-2">
                            <div className="relative">
                              <DropdownAction
                                handleEditClick={() => handleEditClick(item)}
                                handleDeleteClick={() =>
                                  handleDeleteClick(item)
                                }
                              ></DropdownAction>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-slate-600"></div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {modalDetailOpen && (
            <AddEventModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAdd}
              defaultValue={detailData}
              isDetail={true}
            />
          )}
          {modalEditOpen && (
            <AddEventModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEdit}
              defaultValue={editData}
              isEdit={true}
            />
          )}
          {modalAddOpen && (
            <AddEventModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAdd}
            />
          )}
          {modalDeleteOpen && (
            <DeleteEventModal
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
export default EventList;
