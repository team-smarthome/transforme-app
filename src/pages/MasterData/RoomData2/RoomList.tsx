import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import Alerts  from "./AlertRoom";
import * as xlsx from "xlsx";
import { AddRoomModal } from "./ModalAddRoom";
import { DeleteRoomModal } from "./ModalDeleteRoom";
import SearchInputButton from "../Search";
import Pagination from "../../../components/Pagination";
import {
  apiCreateAllRuanganOtmil,
  apiDeleteAllRuangan,
  apiReadAllRuanganOtmil,
  apiUpdateAllRuanganOtmil,
} from "../../../services/api";
import DropdownAction from "../../../components/DropdownAction";
import dayjs from "dayjs";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

// Interface untuk objek 'params' dan 'item'
interface Params {
  filter: string;
}

interface Item {
  ruangan_otmil_id: any;
  nama_ruangan_otmil: string;
  jenis_ruangan_otmil: any;
  zona_id: any;
  nama_zona: any;
  lokasi_otmil_id: any;
  nama_lokasi_otmil: any;
}

const RoomList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //get Token
  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  // useState untuk menampung data dari API
  const [data, setData] = useState<Item[]>([]);
  const [detailData, setDetailData] = useState<Item | null>(null);
  const [editData, setEditData] = useState<Item | null>(null);
  const [deleteData, setDeleteData] = useState({
    ruangan_otmil_id: "",
  });
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterJenisRuangan, setFilterJenisRangan] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState(0);
  const [isOperator, setIsOperator] = useState<boolean>();

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    // const { name, value } = e.target;
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   [name]: value,
    // }));

    // try {
    //   if (!filter.jenis_ruangan_otmil || !filter.nama_ruangan_otmil) {
    //     const response = await apiReadAllRuanganOtmil({
    //         filter: { ...filter, [name]: value },
    //         pageSize: 10,
    //     },token);
    //     if (response.data.status === 'OK') {
    //       const result = response.data;
    //       setData(result.records);
    //       setPages(response.data.pagination.totalPages);
    //       setRows(response.data.pagination.totalRecords);
    //     } else {
    //       throw new Error('Terjadi kesalahan saat mencari data.');
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleFilterChangeJenisRuangan = (e: any) => {
    const newFilter = e.target.value;
    setFilterJenisRangan(newFilter);
  };

  const handleSearchClick = async () => {
    let params = {
      filter: {
        search: filter,
        searchType: filterJenisRuangan,
        page: currentPage,
        pageSize: pageSize,
        // nama_lokasi_otmil: 'Cimahi',
      },
    };
    try {
      const response = await apiReadAllRuanganOtmil(params.filter, token);
      if (response.status === 200) {
        const result = response.data;
        setData(result.records);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
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
  }, [filter, filterJenisRuangan]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

  const fetchData = async () => {
    let params = {
      // filter: {
      //   // nama_lokasi_otmil: 'Cimahi',
      // },
      page: currentPage,
      pageSize: pageSize,
    };
    setIsLoading(true);
    try {
      const response = await apiReadAllRuanganOtmil(params, token);
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

  // useEffect untuk fetch data dari API
  useEffect(() => {
    fetchData();
  }, [currentPage, edit]); // Anda juga dapat menambahkan dependencies jika diperlukan

  // function untuk menampilkan modal detail
  const handleDetailClick = (item: Item) => {
    setDetailData(item);
    setModalDetailOpen(true);
  };

  // function untuk menampilkan modal edit
  const handleEditClick = (item: Item) => {
    console.log(item, "Handle edit");
    setEditData(item);
    setModalEditOpen(true);
  };

  // function untuk menampilkan modal delete
  const handleDeleteClick = (item: any) => {
    const ruangDel: any = {
      ruangan_otmil_id: item.ruangan_otmil_id,
      nama_ruangan_otmil: item.nama_ruangan_otmil,
    };
    setDeleteData(ruangDel);
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

  const handleSubmitDeleteRuangan = async (params: any) => {
    try {
      const responseDelete = await apiDeleteAllRuangan(params, token);
      if (responseDelete.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menghapus data",
        });
        setModalDeleteOpen(false);
        fetchData();
      } else if (responseDelete.data.status === "No") {
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
  const handleSubmitAddRuangan = async (params: Params) => {
    apiCreateAllRuanganOtmil(params, token)
      .then((res) => {
        if (res.data.status === "OK") {
          Alerts.fire({
            icon: "success",
            title: "Berhasil menambah data",
          });
          setData(res.data.records);
          handleCloseAddModal(); //tutup modal
          currentPage === 1 ? fetchData() : setCurrentPage(1);
        } else {
          Alerts.fire({
            icon: "error",
            title: "Gagal menambah data",
          });
          handleCloseAddModal(); //tutup modal
        }
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/auth/signin", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  // function untuk mengubah data
  const handleSubmitEditRuangan = async (params: Params) => {
    apiUpdateAllRuanganOtmil(params, token)
      .then((res) => {
        if (res.data.status === "OK") {
          Alerts.fire({
            icon: "success",
            title: "Berhasil mengubah data",
          });
          setModalDeleteOpen(false);
          setEdit(!edit);
          handleCloseEditModal(); //tutup modal
        } else {
          Alerts.fire({
            icon: "error",
            title: "Gagal mengubah data",
          });
        }
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/auth/signin", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
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
      ["Nama nama ruangan", "jenis ruangan", "nama lokasi", "zona"],
      ...data.map((item: any) => [
        item.nama_ruangan_otmil,
        item.jenis_ruangan_otmil,
        item.nama_lokasi_otmil,
        item.nama_zona,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(
      wb,
      `Data-Ruangan ${dayjs(new Date()).format("DD-MM-YYYY HH.mm")}.xlsx`
    );
  };

  const handleClickTutorial = () => {
    const driverObj: any = driver({
      showProgress: true,
      steps: [
        {
          element: ".f-ruangan",
          popover: {
            title: "Search",
            description: "Tempat mencari nama ruangan",
          },
        },
        {
          element: ".f-jenis-ruangan",
          popover: {
            title: "Jenis Ruangan",
            description: "Tempat memilih jenis ruangan",
          },
        },
        {
          element: ".tombol-pencarian",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari nama ruangan",
          },
        },
        {
          element: ".excel",
          popover: {
            title: "Excel",
            description: "Mendapatkan file excel ruangan",
          },
        },
        {
          element: ".b-tambah",
          popover: {
            title: "Tambah",
            description: "Menambahkan data nama ruangan",
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
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="w-full flex justify-center">
          <div className="mb-3 flex items-center px-2 justify-center rounded space-x-1 bg-slate-600 py-1">
            <div className="f-ruangan w-full">
              <SearchInputButton
                value={filter}
                placehorder="Cari Ruangan"
                onChange={handleFilterChange}
                // onClick={handleSearchClick}
              />
            </div>
            <select
              className="f-jenis-ruangan rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
              name="jenis_ruangan_otmil"
              value={filterJenisRuangan}
              onChange={handleFilterChangeJenisRuangan}
            >
              <option value="">Semua Ruangan</option>
              <option value="Fasilitas Kegiatan">Fasilitas Kegiatan</option>
              <option value="Ruang Ibadah">Ruang Ibadah</option>
              <option value="Kantor">Kantor</option>
              <option value="Kamar">Kamar</option>
            </select>
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
        <div className="flex justify-between mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Ruangan
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
          <div
            className={`grid rounded-t-md ${
              isOperator ? "grid-cols-4" : "grid-cols-5"
            } bg-gray-2 dark:bg-slate-600`}
          >
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama Ruangan
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Jenis Ruangan
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Zona
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Lokasi
              </h5>
            </div>
            <div
              className={`p-2.5 ${
                isOperator ? "hidden" : "block"
              } text-center xl:p-5`}
            >
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Aksi
              </h5>
            </div>
          </div>
          {data.map((item: any) => {
            let backgroundZona = "";
            if (item.nama_zona === "Merah") {
              backgroundZona = "text-red-400";
            } else if (item.nama_zona === "Kuning") {
              backgroundZona = "text-yellow-400";
            } else {
              backgroundZona = "text-green-400";
            }
            return (
              <div>
                <div
                  className={`grid ${
                    isOperator ? "grid-cols-4" : "grid-cols-5"
                  } rounded-sm bg-gray-2 dark:bg-meta-4`}
                  key={item.nama_ruangan_otmil}
                >
                  <div
                    onClick={() => handleDetailClick(item)}
                    className="flex cursor-pointer items-center gap-4 p-2.5 xl:p-5"
                  >
                    <p className="hidden text-black dark:text-white sm:block capitalize">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                  <div
                    onClick={() => handleDetailClick(item)}
                    className="flex cursor-pointer items-center justify-center p-2.5 xl:p-5"
                  >
                    <p className="text-white capitalize">
                      {item.jenis_ruangan_otmil}
                    </p>
                  </div>
                  <div
                    onClick={() => handleDetailClick(item)}
                    className="hidden cursor-pointer items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className={`${backgroundZona} capitalize`}>
                      {item.nama_zona}
                    </p>
                  </div>
                  <div
                    onClick={() => handleDetailClick(item)}
                    className="hidden cursor-pointer items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white capitalize">
                      {item.nama_lokasi_otmil}
                    </p>
                  </div>
                  <div
                    className={`hidden items-center ${
                      isOperator ? "hidden" : "block sm:flex"
                    } justify-center p-2.5 xl:p-5 flex-wrap lg:flex-nowrap gap-2`}
                  >
                    <div className="relative">
                      <DropdownAction
                        handleEditClick={() => handleEditClick(item)}
                        handleDeleteClick={() => handleDeleteClick(item)}
                      ></DropdownAction>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
          {modalDetailOpen && (
            <AddRoomModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAddRuangan}
              defaultValue={detailData}
              isDetail={true}
            />
          )}
          {modalEditOpen && (
            <AddRoomModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEditRuangan}
              defaultValue={editData}
              isEdit={true}
            />
          )}
          {modalAddOpen && (
            <AddRoomModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAddRuangan}
            />
          )}
          {modalDeleteOpen && (
            <DeleteRoomModal
              closeModal={handleCloseDeleteModal}
              onSubmit={handleSubmitDeleteRuangan}
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

export default RoomList;
