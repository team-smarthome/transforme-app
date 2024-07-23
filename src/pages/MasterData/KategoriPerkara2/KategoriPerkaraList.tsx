import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import { AddKategoriPerkaraModal } from "./ModalAddKategoriPerkara";
import { DeleteKategoriPerkaraTypeModal } from "./ModalDeleteKategoriPerkara";
import { Alerts } from "./AlertKategoriPerkara";
import {
  apiReadKategoriPerkara,
  apiDeleteKategoriPerkara,
  apiCreateKategoriPerkara,
  apiUpdateKategoriPerkara,
} from "../../../services/api";
import Pagination from "../../../components/Pagination";
import SearchInputButton from "../Search";
import * as xlsx from "xlsx";
// import ToolsTip from 'renderer/components/ToolsTip';
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import DropdownAction from "../../../components/DropdownAction";
import dayjs from "dayjs";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

interface Item {
  nama_kategori_perkara: string;
}

const KategoriPerkaraList = () => {
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
  const [pageSize, setPageSize] = useState(10);
  const [isOperator, setIsOperator] = useState<boolean>();

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;
  console.log(token, "tokennn");

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

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

  const handleSearchClick = async () => {
    try {
      let params = {
        filter: { nama_kategori_perkara: filter },
        page: currentPage,
        pageSize: pageSize,
      };
      const response = await apiReadKategoriPerkara(params, token);

      if (response.data.status === "OK") {
        const result = response.data.records;
        setData(result);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else if (response.data.status === "error") {
        const result = response.data.records;
        setData(result);
      } else {
        throw new Error("Terjadi kesalahan saat mencari data.");
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

  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearchClick();
      console.log("ENTER DIPNCET");
    }
  };

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); // Anda juga dapat menambahkan dependencies jika diperlukan

  const fetchData = async () => {
    let param = {
      filter: " ",
      page: currentPage,
      pageSize: pageSize,
    };
    setIsLoading(true);
    try {
      const response = await apiReadKategoriPerkara(param, token);
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
  const handleSubmitDeleteKategotiPerkara = async (params: any) => {
    try {
      const responseDelete = await apiDeleteKategoriPerkara(params, token);
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
  const handleSubmitAddKategotiPerkara = async (params: any) => {
    console.log("DATA DARI LIST", params);
    try {
      const responseCreate = await apiCreateKategoriPerkara(params, token);
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
  const handleSubmitEditKategotiPerkara = async (params: any) => {
    console.log(params, "edit");
    try {
      const responseEdit = await apiUpdateKategoriPerkara(params, token);
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

  const exportToExcel = () => {
    const dataToExcel = [
      ["Nama kategori perkara"],
      ...data.map((item: any) => [item.nama_kategori_perkara]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(
      wb,
      `Data-KategoriPerkara ${dayjs(new Date()).format(
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

  const handleClickTutorial = () => {
    const driverObj: any = driver({
      showProgress: true,
      steps: [
        {
          element: ".f-kategori-perkara",
          popover: {
            title: "Search",
            description: "Tempat mencari kategori perkara",
          },
        },
        {
          element: ".tombol-pencarian",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari kategori perkara",
          },
        },
        {
          element: ".excel",
          popover: {
            title: "Excel",
            description: "Mendapatkan file excel kategori perkara",
          },
        },
        {
          element: ".b-tambah",
          popover: {
            title: "Tambah",
            description: "Menambahkan data kategori perkara",
          },
        },
      ],
    });

    driverObj.drive();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="pb-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-15 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="f-kategori-perkara w-full">
              <SearchInputButton
                value={filter}
                placehorder="Cari kategori perkara"
                onChange={handleFilterChange}

                // onClick={handleSearchClick}
              />
            </div>
            <button
              className="tombol-pencarian rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium "
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
        <div className=" flex justify-between items-center mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Kategori Perkarasss
          </h4>
          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(true)}
              className="b-tambah text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
            >
              Tambah
            </button>
          )}
        </div>

        <div className="justify-center items-center text-center flex">
          <div className="flex flex-col w-full">
            {isOperator ? (
              <div className="grid grid-cols-1 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-1   ">
                <div className="p-2.5 text-center justify-start col-span-2 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama Kategori Perkara
                  </h5>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-2   ">
                <div className="p-2.5 text-center justify-start xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama Kategori Perkara
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
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
                            className="grid grid-cols-1 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-1 capitalize"
                            key={item.nama_kategori_perkara}
                          >
                            <div
                              onClick={() => handleDetailClick(item)}
                              className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                            >
                              <p className=" text-black dark:text-white capitalize">
                                {item.nama_kategori_perkara}
                              </p>
                            </div>
                          </div>
                          <div className="border-t border-slate-600"></div>
                        </>
                      ) : (
                        <>
                          <div
                            className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 capitalize"
                            key={item.nama_kategori_perkara}
                          >
                            <div
                              onClick={() => handleDetailClick(item)}
                              className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                            >
                              <p className=" text-black dark:text-white capitalize">
                                {item.nama_kategori_perkara}
                              </p>
                            </div>

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
              <AddKategoriPerkaraModal
                closeModal={() => setModalDetailOpen(false)}
                onSubmit={handleSubmitAddKategotiPerkara}
                defaultValue={detailData}
                isDetail={true}
              />
            )}
            {modalEditOpen && (
              <AddKategoriPerkaraModal
                closeModal={handleCloseEditModal}
                onSubmit={handleSubmitEditKategotiPerkara}
                defaultValue={editData}
                isEdit={true}
              />
            )}
            {modalAddOpen && (
              <AddKategoriPerkaraModal
                closeModal={handleCloseAddModal}
                onSubmit={handleSubmitAddKategotiPerkara}
              />
            )}
            {modalDeleteOpen && (
              <DeleteKategoriPerkaraTypeModal
                closeModal={handleCloseDeleteModal}
                onSubmit={handleSubmitDeleteKategotiPerkara}
                defaultValue={deleteData}
              />
            )}
          </div>
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

export default KategoriPerkaraList;
