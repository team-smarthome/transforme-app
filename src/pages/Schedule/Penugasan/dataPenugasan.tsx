import { useEffect, useState } from "react";
import {
  apiCreatePenugasanShift,
  apiDeletePenugasanShift,
  apiEditPenugasanShift,
  apiReadAllPenugasanShift,
} from "../../../services/api";
import { Alerts } from "../GrupShift/Alert";
import Loader from "../../../common/Loader";
import ModalAddPenugasan from "./modalAddPenugasan";
import ModalEditPenugasan from "./modalEditPenugasan";
import { DeleteModal } from "./modalDeletePenugasan";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
// import { Pagination } from '@windmill/react-ui';
import Pagination from "../../../components/Pagination";
import SearchInputButton from "../../MasterData/Search";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

interface Params {
  filter: string;
}

const Penugasan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //get Token
  const tokenItem = localStorage.getItem("token");
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  // const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isOperator, setIsOperator] = useState<boolean>();

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
          nama_penugasan: filter,
          page: currentPage,
          pageSize: pageSize,
        },
      };

      const response = await apiReadAllPenugasanShift(params.filter, token);

      if (response.data.status === "OK") {
        const data = response.data.records;
        setDataPenugasan(data);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else if (response.data.status === "No Data") {
        const data = response.data.records;
        setDataPenugasan(data);
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

  const handleEnterKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearchClick();
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

  const [dataPenugasan, setDataPenugasan] = useState([
    {
      penugasan_id: "",
      nama_penugasan: "",
    },
  ]);
  const [dataEditPenugasan, setdataEditPenugasan] = useState({
    penugasan_id: "",
    nama_penugasan: "",
  });
  const [dataDeletePenugasan, setdataDeletePenugasan] = useState({
    penugasan_id: "",
  });

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  useEffect(() => {
    fecthPenugasan();
  }, [currentPage, pageSize]);

  useEffect(() => {
    document.addEventListener("keypress", handleEnterKeyPress);

    return () => {
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [filter]);

  const fecthPenugasan = async () => {
    setIsLoading(true);
    const params = {
      penugasan_id: "",

      page: currentPage,
      pageSize: pageSize,
    };

    try {
      const response = await apiReadAllPenugasanShift(params, token);
      const data = response.data.records;
      // if (response.data.status) {
      setDataPenugasan(data);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      setIsLoading(false);
      // }
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

  const handleChangePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseModalAdd = () => {
    setModalAddOpen(false);
  };
  const handleCloseModalEdit = () => {
    setModalDetailOpen(false);
    setModalEditOpen(false);
    setModalDeleteOpen(false);
  };

  const handleDetail = (item: any) => {
    setdataEditPenugasan(item);
    setModalDetailOpen(true);
  };

  const handleEdit = (item: any) => {
    setdataEditPenugasan(item);
    setModalEditOpen(true);
  };

  const handleDelete = (item: any) => {
    setdataDeletePenugasan({ penugasan_id: item });
    setModalDeleteOpen(true);
  };

  //create penugasan
  const handleSubmitPenugasan = async (param: any) => {
    try {
      const addData = await apiCreatePenugasanShift(param, token);

      if (addData.data.status === "OK") {
        handleCloseModalAdd();
        const params = {
          filter: {
            penugasan_id: "",
          },
        };

        fecthPenugasan();
        setFilter("");
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
      } else {
        Alerts.fire({
          icon: "error",
          title: "Gagal menambah data",
        });
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

  //Edit
  const handleEditPenugasan = async (param: any) => {
    try {
      const EditData = await apiEditPenugasanShift(param, token);
      if (EditData.data.status === "OK") {
        handleCloseModalEdit();
        fecthPenugasan();
        setFilter("");
        Alerts.fire({
          icon: "success",
          title: "Berhasil mengubah data",
        });
      } else {
        Alerts.fire({
          icon: "error",
          title: "Gagal mengubah data",
        });
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

  //Delete
  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleDeletePenugasan = async (param: any) => {
    try {
      const addData = await apiDeletePenugasanShift(param, token);
      if (addData.data.status === "OK") {
        handleCloseDeleteModal();
        fecthPenugasan();
        Alerts.fire({
          icon: "success",
          title: "Berhasil menghapus data",
        });
      } else {
        Alerts.fire({
          icon: "error",
          title: "Gagal menghapus data",
        });
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

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container py-[16px]">
      <div className="pb-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-center w-full">
          <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
            <div className="w-full">
              <SearchInputButton
                value={filter}
                placehorder="Cari Nama Penugasan"
                onChange={handleFilterChange}
              />
            </div>
            <button
              className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium"
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
          </div>
        </div>
        {modalAddOpen && (
          <ModalAddPenugasan
            closeModal={handleCloseModalAdd}
            onSubmit={handleSubmitPenugasan}
          />
        )}
        {modalDetailOpen && (
          <ModalEditPenugasan
            closeModal={handleCloseModalEdit}
            onSubmit={handleCloseModalEdit}
            defaultValue={dataEditPenugasan}
            isDetail={true}
          />
        )}
        {modalEditOpen && (
          <ModalEditPenugasan
            closeModal={handleCloseModalEdit}
            onSubmit={handleEditPenugasan}
            defaultValue={dataEditPenugasan}
            isEdit={true}
            token={token}
          />
        )}
        {modalDeleteOpen && (
          <DeleteModal
            closeModal={handleCloseModalEdit}
            onSubmit={handleDeletePenugasan}
            defaultValue={dataDeletePenugasan}
          />
        )}
        <div className="flex justify-between mb-3">
          <h1 className="text-xl font-semibold text-black dark:text-white">
            Data Penugasan Shift
          </h1>
          {!isOperator && (
            <button
              onClick={() => setModalAddOpen(!modalAddOpen)}
              className="text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
            >
              Tambah
            </button>
          )}
        </div>
        <div className="flex flex-col mb-5  ">
          <div className="rounded-b-md rounded-t-md">
            <ul>
              <li className="py-2.5 flex rounded-t-md bg-gray-2 dark:bg-slate-600">
                <ul className="w-full py-2.5">
                  <li className=" items-center justify-center grid grid-cols-2">
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base">
                      Nama Penugasan
                    </div>
                    <div className="flex items-center justify-center text-sm font-medium uppercase xsm:text-base ">
                      Aksi
                    </div>
                  </li>
                </ul>
              </li>

              <li className="py-2.5 flex rounded-b-md bg-gray-2 dark:bg-meta-4 ">
                <ul className="w-full py-2.5 space-y-4">
                  {dataPenugasan.length === 0 ? (
                    <div className="flex justify-center p-1 w-full">
                      No Data
                    </div>
                  ) : (
                    <>
                      {dataPenugasan.map((item: any, index) => {
                        return (
                          <li
                            key={index}
                            className="items-center justify-center grid grid-cols-2"
                          >
                            <div className="capitalize flex items-center justify-center text-sm font-medium xsm:text-base">
                              {item.nama_penugasan}
                            </div>
                            <div className="flex items-center justify-center space-x-1 text-sm font-medium uppercase xsm:text-base ">
                              <button
                                onClick={() => handleDetail(item)}
                                className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                              >
                                Detail
                              </button>
                              {!isOperator && (
                                <>
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="py-1 text-sm px-2 text-black rounded-md bg-blue-300"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDelete(item.penugasan_id)
                                    }
                                    className="py-1 text-sm px-2 text-white rounded-md bg-red-500"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {dataPenugasan.length === 0 ? null : (
          <div className="mt-5">
            <div className="flex gap-4 items-center">
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
              onChangePage={handleChangePage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Penugasan;
