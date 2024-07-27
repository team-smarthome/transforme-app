import dayjs from "dayjs";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect, useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import * as xlsx from "xlsx";
import Loader from "../../../common/Loader";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import DropdownAction from "../../../components/DropdownAction";
import Pagination from "../../../components/Pagination";
import {
    apiCreatePenyidikan,
    apiDeletePenyidikan,
    apiReadPenyidikan,
    apiUpdatePenyidikan,
} from "../../../services/api";
import { Error403Message } from "../../../utils/constants";
import SearchInputButton from "../../MasterData/Search";
import { Alerts } from "./AlertPenyidikan";
import { AddPenyidikanModal } from "./ModalAddPenyidikan";
import { DeletePenyidikanModal } from "./ModalDeletePenyidikan";

// Interface untuk objek 'params' dan 'item'
interface Item {
  nomor_penyidikan: string;
  wbp_profile_id: string;
  kasus_id: string;
  // alasan_penyidikan: string;
  lokasi_penyidikan: string;
  waktu_penyidikan: string;
  agenda_penyidikan: string;
  hasil_penyidikan: string;
  nama_wbp: string;
  jenis_perkara_id: string;
  nama_jenis_perkara: string;
  kategori_perkara_id: string;
  nama_kategori_perkara: string;
  jaksa_penyidik: any;
  saksi: any;
  histori_penyidikan: any;
}

const PenyidikanList = () => {
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

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handleSearchClick = async () => {
    try {
      let params = {
        filter: {
          nomor_penyidikan: filter,
        },
        page: currentPage,
        pageSize: pageSize,
      };
      const response = await apiReadPenyidikan(params, token);

      if (response.data.status === "OK") {
        const result = response.data.records;
        setData(result);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else if (response.data.status === "error") {
        const result = response.data.records;
        setData(result);
        // setPages(response.data.pagination.totalPages);
        // setRows(response.data.pagination.totalRecords);
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
          popover: { title: "Search", description: "Mencari nomor penyidikan" },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari nomor penyidikan",
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
            description: "Menambahkan data penyidikan",
          },
        },
        {
          element: ".b-bap",
          popover: {
            title: "BAP",
            description: "Masuk ke halaman BAP",
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

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
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

  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener("keypress", handleEnterKeyPress);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [filter]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

  const fetchData = async () => {
    let params = {
      filter: " ",
      page: currentPage,
      pageSize: pageSize,
    };

    setIsLoading(true);
    try {
      const response = await apiReadPenyidikan(params, token);
      // console.log('api response :', response);
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

  const [nomorPenyidikan, setNomorPenyidikann] = useState({
    nomor_penyidikan: "",
  });

  const handleModalAddOpen = () => {
    function convertToRoman(num: number) {
      const romanNumerals = [
        "M",
        "CM",
        "D",
        "CD",
        "C",
        "XC",
        "L",
        "XL",
        "X",
        "IX",
        "V",
        "IV",
        "I",
      ];
      const decimalValues = [
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1,
      ];

      let result = "";

      for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= decimalValues[i]) {
          result += romanNumerals[i];
          num -= decimalValues[i];
        }
      }

      return result;
    }
    const type = "Sp.Sidik";
    const day = dayjs(new Date()).format("DD");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear().toString();
    const lokasi = "Otmil";
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;

    data.forEach((item) => {
      const nomorPenyidikan = item.nomor_penyidikan.split("/")[0]; // Get the first part of the case number
      const angka = parseInt(nomorPenyidikan, 10);

      if (!isNaN(angka) && item.nomor_penyidikan.includes(currentDate)) {
        angkaTerbesar = Math.max(angkaTerbesar, angka);
      }
    });

    // Increment the largest number by 1 if the date is the same
    if (angkaTerbesar === 0) {
      // No matching cases for the current date
      angkaTerbesar = 1;
    } else {
      angkaTerbesar += 1;
    }

    setNomorPenyidikann({
      ...nomorPenyidikan,
      nomor_penyidikan: `${angkaTerbesar}/${type}/${currentDate}/${lokasi}`,
    });

    setModalAddOpen(true);
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
      const responseDelete = await apiDeletePenyidikan(params, token);
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
  console.log("DATA:", data);

  // function untuk menambah data
  const handleSubmitAdd = async (params: any) => {
    console.log("paramsADD", params);

    try {
      const responseCreate = await apiCreatePenyidikan(params, token);
      console.log("response", responseCreate);

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
    console.log("token", token);

    try {
      const responseEdit = await apiUpdatePenyidikan(params, token);
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
  }, [isOperator]);

  const exportToExcel = () => {
    const dataToExcel = [
      [
        "nomor penyidikan",
        // 'alasan penyidikan',
        // 'lokasi penyidikan',
        // 'waktu penyidikan',
        "waktu dimulai penyidikan",
        "waktu selesai penyidikan",
        "agenda penyidikan",
        "hasil penyidikan",
        "nama wbp",
        "nama jenis perkara",
        "kategori perkara",
      ],
      ...data.map((item: any) => [
        item.nomor_penyidikan,
        // item.alasan_penyidikan,
        // item.lokasi_penyidikan,
        // item.waktu_penyidikan,
        item.waktu_dimulai_penyidikan,
        item.waktu_selesai_penyidikan,
        item.agenda_penyidikan,
        item.hasil_penyidikan,
        item.nama_wbp,
        item.nama_jenis_perkara,
        item.nama_kategori_perkara,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(
      wb,
      `Data-Penyidikan ${dayjs(new Date()).format("DD-MM-YYYY HH.mm")}.xlsx`
    );
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
            <div className="w-full search">
              <SearchInputButton
                value={filter}
                placehorder="Cari Nomor Penyidikan"
                onChange={handleFilterChange}
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
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Penyidikan
          </h4>

          <div className="flex gap-3">
            <button
              className="text-black rounded-md font-semibold py-2 px-3 bg-green-500 b-bap"
              onClick={() => navigate("/pencatatan-bap")}
            >
              BAP
            </button>
            {!isOperator && (
              <button
                onClick={handleModalAddOpen}
                className="  text-black rounded-md font-semibold bg-blue-300 py-2 px-3 b-tambah"
              >
                Tambah
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`grid ${
              isOperator ? "grid-cols-4" : "grid-cols-5"
            }  rounded-t-md bg-gray-2 dark:bg-slate-600 `}
          >
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nomor Penyidikan
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Pihak Terlibat
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama Kasus
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Agenda Penyidikan
              </h5>
            </div>
            {isOperator ? (
              <></>
            ) : (
              <div className=" p-2.5 text-center xl:p-5 justify-center flex">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Aksi
                </h5>
              </div>
            )}
          </div>
          {data.length == 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any, index) => {
                return (
                  <div
                    className={`grid ${
                      isOperator ? "grid-cols-4" : "grid-cols-5"
                    } border-t border-slate-600 rounded-sm bg-gray-2 dark:bg-meta-4 capitalize`}
                    key={index}
                  >
                    <div
                      onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate dark:text-white capitalize">
                        {item.nomor_penyidikan}
                      </p>
                    </div>
                    <div
                      onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate dark:text-white capitalize">
                        {item.nama_wbp
                          ? `${item.nama_wbp} (tersangka)`
                          : `${item.nama_saksi} (saksi)`}
                      </p>
                    </div>
                    <div
                      onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate dark:text-white capitalize">
                        {item.nama_kasus}
                      </p>
                    </div>
                    <div
                      onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate dark:text-white capitalize">
                        {item.agenda_penyidikan}
                      </p>
                    </div>
                    {!isOperator && (
                      <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
                        <div className="relative">
                          <DropdownAction
                            handleEditClick={() => handleEditClick(item)}
                            handleDeleteClick={() => handleDeleteClick(item)}
                          ></DropdownAction>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {modalDetailOpen && (
            <AddPenyidikanModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAdd}
              defaultValue={detailData}
              isDetail={true}
              token={token}
            />
          )}
          {modalEditOpen && (
            <AddPenyidikanModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEdit}
              defaultValue={editData}
              isEdit={true}
              token={token}
            />
          )}
          {modalAddOpen && (
            <AddPenyidikanModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAdd}
              defaultValue={nomorPenyidikan}
              token={token}
            />
          )}
          {modalDeleteOpen && (
            <DeletePenyidikanModal
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

export default PenyidikanList;
