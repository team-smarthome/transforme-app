import React, { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import { Alerts } from "./AlertLantai";
import { apiDeleteLantaiOtmil, apiInsertLantaiOtmil, apiLantaiOtmilRead, apiUpdateLantaiOtmil } from "../../../services/api";
import { DeleteAhliModal } from "./ModalDeleteLantai";
import SearchInputButton from "../Search";
import Pagination from "../../../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import * as xlsx from "xlsx";
import DropdownAction from "../../../components/DropdownAction";
import dayjs from "dayjs";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { Error403Message } from "../../../utils/constants";
import { ModalAddGedung } from "./ModalAddLantai";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

interface Params {
  filter: string;
}

interface Item {}

const LantaiList = () => {
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
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOperator, setIsOperator] = useState<boolean>();

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".search",
          popover: {
            title: "Search",
            description: "Mencari nama lantai",
          },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Klik untuk mencari nama lantai",
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
            description: "Menambahkan data lantai",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handleSearchClick = async () => {
    console.log(filter);
    try {
      let params = {
        nama_lantai: filter,
  
        page: currentPage,
        pageSize: pageSize,
      };
      const response = await apiLantaiOtmilRead(params, token);

      if (response.status === 200) {
        const result = response.data;
        console.log(result, "DATA");
        setData(result.records);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
        setIsLoading(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      // if (e.response.status === 403) {
      //   navigate("/auth/signin", {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.response.status === 403 ? "warning" : "error",
      //   title: e.response.status === 403 ? Error403Message : e.message,
      // });
    }
  };

  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    document.addEventListener("keypress", handleEnterKeyPress);

    return () => {
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [filter]);

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    let param = {
      filter: "",
      page: currentPage,
      pageSize: pageSize,
    };

    setIsLoading(true);
    try {
      const response = await apiLantaiOtmilRead(param, token);
      if (response.status === 200) {
        const result = response.data.records;
        console.log(result, "DATA");
        setData(result);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
        setIsLoading(false);
      } else {
        throw new Error(response.data.message);
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

  const handleDetailClick = (item: any) => {
    let newItem: any = {
      lantai_otmil_id: item.lantai_otmil_id,
      nama_lantai: item.nama_lantai,
      panjang: item.panjang,
      lebar: item.lebar,
      posisi_X: item.posisi_X,
      posisi_Y: item.posisi_Y,
      lokasi_otmil_id: item?.lokasi_otmil?.id_lokasi_otmil,
      nama_lokasi_otmil: item?.lokasi_otmil?.nama_lokasi_otmil,
      nama_gedung_otmil: item?.gedung_otmil?.nama_gedung_otmil,
      gedung_otmil_id: item?.gedung_otmil?.gedung_otmil_id,
    };
    setDetailData(newItem);
    setModalDetailOpen(true);
  };

  const handleEditClick = (item: any) => {
    // console.log(item, "item edit")
    let newItem: any = {
      lantai_otmil_id: item.lantai_otmil_id,
      nama_lantai: item.nama_lantai,
      panjang: item.panjang,
      lebar: item.lebar,
      posisi_X: item.posisi_X,
      posisi_Y: item.posisi_Y,
      lokasi_otmil_id: item?.lokasi_otmil?.lokasi_otmil_id,
      nama_lokasi_otmil: item.lokasi_otmil.nama_lokasi_otmil,
      nama_gedung_otmil: item?.gedung_otmil?.nama_gedung_otmil,
      gedung_otmil_id: item?.gedung_otmil?.gedung_otmil_id,
    };

    setEditData(newItem);
    setModalEditOpen(true);
  };

  const handleDeleteClick = (item: Item) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  const handleDeleteLantaiOtmil = async (params: any) => {
    try {
      const response = await apiDeleteLantaiOtmil(params, token);
      if (response.status === 200) {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menghapus data",
        });
        setModalDeleteOpen(false);
        fetchData();
      } else if (response.status === 400) {
        Alerts.fire({
          icon: "error",
          title: "Gagal hapus data",
        });
      } else {
        throw new Error(response.data.message);
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

  const handleInsertLantaiOtmil = async (params: any) => {
    try {
      const response = await apiInsertLantaiOtmil(params, token);
      if (response.status === 201) {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        setModalAddOpen(false);
        fetchData();
      } else if (response.status === 400) {
        Alerts.fire({
          icon: "error",
          title: "Gagal membuat data",
        });
      } else {
        throw new Error(response.data.message);
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

  const handleEditDataLantaiOtmil = async (params: any) => {
    try {
      const response = await apiUpdateLantaiOtmil(params, token);
      console.log(response, "response");
      if (response.status === 200) {
        Alerts.fire({
          icon: "success",
          title: "Berhasil mengubah data",
        });
        setModalEditOpen(false);
        fetchData();
      } else if (response.status === 400) {
        Alerts.fire({
          icon: "error",
          title: "Gagal mengubah data",
        });
      } else {
        throw new Error(response.data.messag);
      }
    } catch (e: any) {
      if (e?.response?.status === 403) {
        navigate("/auth/signin", {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: e?.response?.status === 403 ? "warning" : "error",
        title: e?.response?.status === 403 ? Error403Message : e?.message,
      });
    }
  };

  useEffect(() => {
    if (dataAdmin?.role_name === "operator") {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }
  }, [isOperator]);

  const exportToExcel = () => {
    const dataToExcel = [
      ["Nama Lantai", "Panjang", "Lebar", "posisi_x", "posisi_y", "lokasi", "gedung"],
      ...data.map((item: any) => [item.nama_lantai, item.panjang, item.lebar, item.posisi_X, item.posisi_Y, item?.lokasi_otmil?.nama_lokasi_otmil, item?.gedung_otmil?.nama_gedung_otmil]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, `Data-Lantai ${dayjs(new Date()).format("DD-MM-YYYY HH.mm")}.xlsx`);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="pb-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="w-full search">
              <SearchInputButton value={filter} placehorder="Cari lantai otmil" onChange={handleFilterChange} />
            </div>

            <button className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search" type="button" onClick={handleSearchClick} id="button-addon1" data-te-ripple-init data-te-ripple-color="light">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-black">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </button>

            <button onClick={exportToExcel} className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium excel">
              Export&nbsp;Excel
            </button>

            <button>
              <HiQuestionMarkCircle values={filter} aria-placeholder="Show tutorial" onClick={handleClickTutorial} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">Data Lantai</h4>
          {!isOperator && (
            <button onClick={() => setModalAddOpen(true)} className="  text-black rounded-md font-semibold bg-blue-300 py-2 px-3 b-tambah">
              Tambah
            </button>
          )}
        </div>
        <div className="flex flex-col">
          {isOperator ? (
            <div className="grid grid-cols-2 rounded-t-md bg-gray-2 dark:bg-slate-600 ">
              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Nama Lantai</h5>
              </div>
              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Lokasi Otmil</h5>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-3">
              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Nama Lantai</h5>
              </div>
              <div className="p-2.5 xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Lokasi Otmil</h5>
              </div>

              <div className=" p-2.5 text-center xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Aksi</h5>
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
                        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 capitalize" key={item.lantai_otmil_id}>
                          <div onClick={() => handleDetailClick(item)} className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black dark:text-white capitalize">{item.nama_lantai}</p>
                          </div>

                          <div onClick={() => handleDetailClick(item)} className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black dark:text-white capitalize">{item.lokasi_otmil?.nama_lokasi_otmil}</p>
                          </div>
                        </div>
                        <div className="border-t border-slate-600"></div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 capitalize" key={item.lantai_otmil_id}>
                          <div onClick={() => handleDetailClick(item)} className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black dark:text-white capitalize">{item.nama_lantai}</p>
                          </div>

                          <div onClick={() => handleDetailClick(item)} className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                            <p className=" text-black dark:text-white capitalize">{item.lokasi_otmil?.nama_lokasi_otmil}</p>
                          </div>
                          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 flex-wrap lg:flex-nowrap gap-2">
                            <div className="relative">
                              <DropdownAction handleEditClick={() => handleEditClick(item)} handleDeleteClick={() => handleDeleteClick(item)}></DropdownAction>
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

          {modalDetailOpen && <ModalAddGedung closeModal={() => setModalDetailOpen(false)} onSubmit={handleInsertLantaiOtmil} defaultValue={detailData} isDetail={true} token={token} />}
          {modalEditOpen && <ModalAddGedung closeModal={handleCloseEditModal} onSubmit={handleEditDataLantaiOtmil} defaultValue={editData} isEdit={true} token={token} />}
          {modalAddOpen && <ModalAddGedung closeModal={handleCloseAddModal} onSubmit={handleInsertLantaiOtmil} token={token} />}
          {modalDeleteOpen && <DeleteAhliModal closeModal={handleCloseDeleteModal} onSubmit={handleDeleteLantaiOtmil} defaultValue={deleteData} />}
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
            <Pagination currentPage={currentPage} totalPages={pages} onChangePage={handleChagePage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LantaiList;
