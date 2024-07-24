import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  apiAsetDelete,
  apiAsetInsert,
  apiAsetRead,
  apiAsetUpdate,
  apiChangePassword,
  apiCreateUser,
  apiEditUser,
  apiNewDeleteUser,
  apiReadAllUser,
  apiTipeAsetRead,
} from "../../services/api";
import { AddInventarisModal } from "./ModalAddInventaris";
import { Alerts } from "./AlertInventaris";
import Loader from "../../common/Loader";
import Pagination from "../../components/Pagination";
import { DeleteInventarisModal } from "./ModalDeleteInventaris";
import SearchInputButton from "../MasterData/Search";
import { HiQuestionMarkCircle } from "react-icons/hi2";

import * as xlsx from "xlsx";
import TextWithEllipsis from "./truncate";
import DropdownAction from "../../components/DropdownAction";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Error403Message } from "../../utils/constants";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const tokenItem = localStorage.getItem("token");
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

const dataUserItem = localStorage.getItem("dataUser");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

const InventarisList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData]: any = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [ubahPasswordData, setUbahPasswordData] = useState([]);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalUbahPasswordOpen, setModalUbahPasswordOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [filter, setFilter] = useState("");
  const [filterTipe, setFilterTipe] = useState("");
  const [tipeAset, setTipeAset] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOperator, setIsOperator] = useState<boolean>();

  const [alertIsAdded, setAlertIsAdded] = useState(false);
  const [alertIsEdited, setAlertIsEdited] = useState(false);
  const [alertIsDeleted, setAlertIsDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [gambarVisitorPreview, setGambarVisitorPreview] = useState("");

  console.log(editData, "ini data EDIT BOSS QQ");

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailClick = (item: any) => {
    console.log(item, "item item");
    setDetailData(item);
    setModalDetailOpen(true);
  };

  const handleEditClick = (item: any) => {
    const { nama_ruangan_lemasmil, ...filteredData } = item;
    // console.log(filteredData,"ini filter data BOSS");
    // console.log(item, 'item item');
    setEditData(filteredData);
    setModalEditOpen(true);
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".search",
          popover: { title: "Search", description: "Mencari nama inventaris" },
        },
        {
          element: ".tipe",
          popover: {
            title: "Tipe",
            description: "Memilih tipe yang disediakan",
          },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari nama inventaris",
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
            description: "Menambahkan data inventaris",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSubmitAddInventaris = async (params: any) => {
    console.log(params, "params submit add");
    try {
      const responseCreate = await apiAsetInsert(params, token);
      if (responseCreate.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        setModalAddOpen(false);
        fetchData();
      } else if (responseCreate.data.status === "error") {
        const errorCreate = responseCreate.data.message;
        Alerts.fire({
          icon: "error",
          title: errorCreate,
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

  const handleSubmitEditInventaris = async (params: any) => {
    console.log(params, "params submit edit");
    try {
      const responseEdit = await apiAsetUpdate(params, token);
      if (responseEdit.data.status === "OK") {
        console.log("edit succes");
        Alerts.fire({
          icon: "success",
          title: "Berhasil mengubah data",
        });
        setModalEditOpen(false);
        fetchData();
      } else if (responseEdit.data.status === "error") {
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

  const handleSubmitDeleteInventaris = async (params: any) => {
    console.log("DELETE", params);
    try {
      const responseDelete = await apiAsetDelete(params, token);
      if (responseDelete.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menghapus data",
        });
        setModalDeleteOpen(false);
        fetchData();
      } else if (responseDelete.data.status === "error") {
        Alerts.fire({
          icon: "error",
          title: "Gagal Delete Data",
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

  const handleSearchClick = async () => {
    let params = {
      nama_aset: filter,
      nama_tipe: filterTipe,

      page: currentPage,
      pageSize: pageSize,
    };
    try {
      // let params = {
      //   filter: {
      //     nama_aset: filter,
      //     nama_tipe: filterTipe,
      //     // nama_hunian_wbp_otmil: filterHunian,
      //   },
      //   page: currentPage,
      //   pageSize: pageSize,
      // };
      const responseRead = await apiAsetRead(params, token);
      if (responseRead.data.status === "OK") {
        setData(responseRead.data.records);
        setPages(responseRead.data.pagination.totalPages);
        setRows(responseRead.data.pagination.totalRecords);
      } else {
        throw new Error(responseRead.data.message);
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

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handleFilterChangeTipe = async (e: any) => {
    const newFilter = e.target.value;
    setFilterTipe(newFilter);
  };

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  useEffect(() => {
    fetchData();
    getTipeAset();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (dataAdmin?.role_name === "operator") {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }

    console.log(isOperator, "Operator");
  }, [isOperator]);

  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener("keypress", handleEnterKeyPress);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [filter, filterTipe]);

  let fetchData = async () => {
    setIsLoading(true);
    let params = {
      // filter: {
      //   lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
      // },
      page: currentPage,
      pageSize: pageSize,
    };
    try {
      const response = await apiAsetRead(params, token);
      if (response.data.status === "OK") {
        setData(response.data.records);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else {
        throw new Error(response.data.message);
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
    setIsLoading(false);
  };

  const getTipeAset = async () => {
    let params = {
      filter: "",
    };
    try {
      const response = await apiTipeAsetRead(params, token);
      // console.log(response,'RUANGAN')
      setTipeAset(response.data.records);
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

  const exportToExcel = async () => {
    const dataToExcel = [
      ["Nama Barang", "Kode SN", "Tipe", "Model", "Merek", "Tanggal Masuk"],
      ...data.map((item: any) => [
        item.nama_aset,
        item.serial_number,
        item.nama_tipe,
        item.model,
        item.merek,
        item.tanggal_masuk,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "data_inventaris.xlsx");
  };

  document.querySelectorAll(".custom-truncate").forEach(function (element) {
    let text: any = element.textContent;
    if (text.length > 5) {
      element.textContent = "..." + text.substring(text.length - 3); // Ubah 24 menjadi 21
    }
  });

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
                placehorder="Cari nama inventaris"
                onChange={handleFilterChange}
              />
            </div>

            <select
              value={filterTipe}
              onChange={handleFilterChangeTipe}
              className=" rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary tipe"
            >
              <option value="">Semua tipe</option>
              {tipeAset.map((item: any) => (
                <option value={item.nama_tipe}>{item.nama_tipe}</option>
              ))}
            </select>

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
              onClick={exportToExcel}
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
        <div className="flex justify-between">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Daftar Inventaris
          </h4>
          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(true)}
              className=" text-black rounded-md font-semibold bg-blue-300 w-20 h-10 b-tambah"
            >
              Tambah
            </button>
          )}
        </div>

        <div className="flex flex-col">
          <div
            className={`text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ${
              isOperator ? "grid grid-cols-5" : "grid grid-cols-6"
            }`}
          >
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base ">
                Foto Barang
              </h5>
            </div>

            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama Barang
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 ">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Kode SN
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 ">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Model
              </h5>
            </div>

            <div className="p-2.5 xl:p-5 ">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Update Terakhir
              </h5>
            </div>
            {!isOperator && (
              <div className="p-2.5 xl:p-5 ">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Aksi
                </h5>
              </div>
            )}
          </div>

          {data.length === 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any) => {
                console.log(item, "dataku");
                return (
                  <div>
                    <div
                      className={` rounded-sm justify-center bg-gray-2 dark:bg-meta-4 ${
                        isOperator ? "grid grid-cols-5" : "grid grid-cols-6"
                      }`}
                    >
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                      >
                        <img
                          src={
                            // `http://127.0.0.1:8000/storage/${item.foto_barang}`
                            "https://dev-siram-workstation.transforme.co.id/storage/" +
                            item.foto_barang
                          }
                          alt="picture"
                          className="w-20 h-20 object-fit border-slate-400 border"
                        ></img>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className="hidden text-black dark:text-white sm:block truncate">
                          {item.nama_aset}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className="hidden text-black dark:text-white sm:block">
                          <TextWithEllipsis
                            text={item.serial_number}
                            maxLength={10}
                          ></TextWithEllipsis>
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className="hidden text-black dark:text-white sm:block truncate">
                          {item.model}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                      >
                        <p className="hidden text-black dark:text-white sm:block truncate">
                          {item.updated_at}
                        </p>
                      </div>

                      {!isOperator && (
                        <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
                          {/* <button
                        onClick={() => handleEditClick(item)}
                        className="py-1 px-2  text-black rounded-md bg-blue-300"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="py-1  px-2 text-white rounded-md bg-red-400"
                      >
                        Hapus
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
            <AddInventarisModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAddInventaris}
              defaultValue={detailData}
              isDetail={true}
              token={token}
            />
          )}
          {modalEditOpen && (
            <AddInventarisModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEditInventaris}
              defaultValue={editData}
              isEdit={true}
              token={token}
            />
          )}
          {modalAddOpen && (
            <AddInventarisModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAddInventaris}
              token={token}
            />
          )}
          {modalDeleteOpen && (
            <DeleteInventarisModal
              closeModal={handleCloseDeleteModal}
              onSubmit={handleSubmitDeleteInventaris}
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

export default InventarisList;
