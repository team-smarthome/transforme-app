import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  apiChangePassword,
  apiCreateUser,
  apiEditUser,
  apiNewDeleteUser,
  apiReadAllRole,
  apiReadAllUser,
} from "../../services/api";
import { AddUserModal } from "./ModalAddUser";
// import Alerts from './AlertUser';
import { Alerts } from "./AlertUser";
import Loader from "../../common/Loader";
import Pagination from "../../components/Pagination";
import { DeleteUserModal } from "./ModalDeleteUser";
import { UbahPasswordModal } from "./ModalUbahPassword";
import SearchInputButton from "../MasterData/Search";
import DropdownActionWithPass from "../../components/DropdownActionWithPass";
import * as xlsx from "xlsx";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import dayjs from "dayjs";
import { Error403Message } from "../../utils/constants";
import { Breadcrumbs } from "../../components/Breadcrumbs";

let tokenItem = localStorage.getItem("token");
let dataToken = tokenItem ? JSON.parse(tokenItem) : null;
let token = dataToken.token;
let lokasiUser: string = "";

const UserList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
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
  const [filterRole, setFilterRole] = useState("");
  const [roleData, setRoleData] = useState([]);
  // const [token,setToken] = useState(null)
  const [dataExcel, setDataExcel] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  //   useEffect(()=>{
  //     const tokenItem = localStorage.getItem('token')
  // const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  //  setToken(dataToken.token)
  //   },[token])

  useEffect(() => {
    const dataUser: any = localStorage.getItem("dataUser");
    lokasiUser = JSON.parse(dataUser).lokasi_otmil_id;
    console.log("lokasiUser", lokasiUser);
  }, []);

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".search",
          popover: {
            title: "Search",
            description: "Mencari nama pengguna",
          },
        },
        {
          element: ".p-role",
          popover: {
            title: "Semua Role",
            description: "Pilih role yang diinginkan",
          },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Klik button untuk mencari nama pengguna",
          },
        },
        {
          element: ".b-excel",
          popover: {
            title: "Export Excel",
            description: "Klik untuk mendapatkan file excel",
          },
        },
        {
          element: ".b-tambah",
          popover: {
            title: "Tambah",
            description: "Menambahkan data pengguna aplikasi",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChagePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailClick = (item: any) => {
    console.log(item, "item item");
    setDetailData(item);
    setModalDetailOpen(true);
  };

  const handleEditClick = (item: any) => {
    console.log(item, "item item");
    setEditData(item);
    setModalEditOpen(true);
  };

  const handleUbahPassword = (item: any) => {
    console.log(item, "item password");
    const dataPassword: any = {
      user_id: item.user_id,
      username: item.username,
    };
    setUbahPasswordData(dataPassword);
    setModalUbahPasswordOpen(true);
  };

  const handleCloseAddModal = () => {
    setModalAddOpen(false);
  };

  const handleCloseUbahPassword = () => {
    setModalUbahPasswordOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  const handleSearchClick = async () => {
    try {
      let params = {
        nama: filter,
        user_role_id: filterRole,
        page: currentPage,
        pageSize: 10,
        lokasi_otmil_id: lokasiUser,
      };
      const responseRead = await apiReadAllUser(params, token);
      if (responseRead.data.status === "OK") {
        setData(responseRead.data.records);
        setPages(responseRead.data.pagination.totalPages);
        setRows(responseRead.data.pagination.totalRecords);
      } else {
        throw new Error(responseRead.data.message);
      }
    } catch (e: any) {
      // if (e.response.status === 403) {
      //   navigate('/auth/signin', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.response.status === 403 ? 'warning' : 'error',
      //   title: e.response.status === 403 ? Error403Message : e.message,
      // });
    }
  };

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handleFilterChangeRole = async (e: any) => {
    const newFilter = e.target.value;
    setFilterRole(newFilter);
  };

  const handleSubmitAddUser = async (params: any) => {
    console.log(params, "params submit add");
    try {
      const responseCreate = await apiCreateUser(params, token);
      if (responseCreate.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        setModalAddOpen(false);
        fetchData();
      } else if (responseCreate.data.status === "error") {
        const errorCreate = responseCreate.data.message;
        // Alerts.fire({
        //   icon: "error",
        //   title: errorCreate,
        // });
      } else {
        throw new Error(responseCreate.data.message);
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

  const handleSubmitEditUser = async (params: any) => {
    console.log(params, "params submit edit");
    try {
      const responseEdit = await apiEditUser(params, token);
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

  const handleSubmitUbahPassword = async (params: any) => {
    console.log(params, "has submit");
    try {
      const responseUbah = await apiChangePassword(params, token);
      if (responseUbah.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Password berhasil diubah",
        });
        setModalUbahPasswordOpen(false);
        fetchData();
      } else if (responseUbah.data.status === "No") {
        const errorUbah = responseUbah.data.message;
        Alerts.fire({
          icon: "error",
          title: errorUbah,
        });
      } else {
        throw new Error(responseUbah.data.message);
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

  const handleSubmitDeleteDataPetugas = async (params: any) => {
    console.log("DELETE", params);
    try {
      const responseDelete = await apiNewDeleteUser(params, token);
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
        setModalDeleteOpen(false);
      } else {
        throw new Error(responseDelete.data.message);
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

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const exportToExcel = async () => {
    const dataToExcel = [
      [
        "Nama Petugas",
        "Role",
        "NRP",
        "Matra",
        "Jabatan",
        "Divisi",
        "Email",
        "Phone",
        "Suspended",
        "Masa Berlaku Akun",
      ],
      ...data.map((item: any) => [
        item.nama,
        item.user_role_id,
        item.role_name,
        item.nrp,
        item.nama_matra,
        item.jabatan,
        item.divisi,
        item.email,
        item.phone,
        item.is_suspended,
        item.expiry_date,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(
      wb,
      `Data-Pengguna ${dayjs(new Date()).format("DD-MM-YYYY HH.mm")}.xlsx`
    );
  };

  let fetchData = async () => {
    setIsLoading(true);
    let params = {
      lokasi_otmil_id: lokasiUser,
      page: currentPage,
      pageSize: 10,
    };
    try {
      const res = await apiReadAllUser(params, token);
      setData(res.data.records);
      setPages(res.data.pagination.totalPages);
      setRows(res.data.pagination.totalRecords);
      setIsLoading(false);
      getAllRole();
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

  const getAllRole = async () => {
    try {
      const response = await apiReadAllRole(token);
      console.log("responseRole", response);
      if (response.data.status !== "OK") {
        throw new Error(response.data.message);
      }
      const result = response.data;
      console.log("resultRoleData", result);
      setRoleData(result.records);
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
                placehorder="Cari nama pengguna"
                onChange={handleFilterChange}
              />
            </div>

            <select
              value={filterRole}
              onChange={handleFilterChangeRole}
              className="capitalize rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary p-role">
              <option value="">Semua role</option>
              {roleData.map((item: any) => (
                <option value={item.id}>{item.role_name}</option>
              ))}
            </select>

            <button
              className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search"
              type="button"
              onClick={handleSearchClick}
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-black">
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={exportToExcel}
              className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium b-excel">
              Export&nbsp;Excel
            </button>

            <div className="w-5">
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
            Data Pengguna Aplikasi
          </h4>
          <button
            onClick={() => setModalAddOpen(true)}
            className=" text-black rounded-md bg-blue-300 w-20 h-10 b-tambah">
            Tambah
          </button>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama Pengguna
              </h5>
            </div>

            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Role
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 ">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Aksi
              </h5>
            </div>
          </div>

          {data.length == 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any) => {
                return (
                  <div>
                    <div className="grid grid-cols-4 rounded-sm  bg-gray-2 dark:bg-meta-4  ">
                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                        <p className="hidden text-black dark:text-white sm:block">
                          {item.nama}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                        <p className="hidden text-black dark:text-white sm:block">
                          {item.role_name}
                        </p>
                      </div>

                      <div
                        onClick={() => handleDetailClick(item)}
                        className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                        <p className="hidden text-black dark:text-white sm:block">
                          {item.email}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 p-2.5 xl:p-5">
                        {/* <button
                      onClick={() => handleDetailClick(item)}
                      className="py-1 px-2  text-black rounded-md bg-blue-300"
                    >
                      Detail
                    </button> */}

                        {/* <button
                          onClick={() => handleEditClick(item)}
                          className="py-1 px-2  text-black rounded-md bg-blue-300"
                        >
                          Ubah
                        </button>
                        <button
                          onClick={() => handleUbahPassword(item)}
                          className="py-1  px-2 text-black rounded-md bg-blue-300"
                        >
                          Ganti Sandi
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="py-1  px-2 text-white rounded-md bg-red-400"
                        >
                          Hapus
                        </button> */}
                        <DropdownActionWithPass
                          handleUbahPassword={() => handleUbahPassword(item)}
                          handleEditClick={() => handleEditClick(item)}
                          handleDeleteClick={() =>
                            handleDeleteClick(item)
                          }></DropdownActionWithPass>
                      </div>
                    </div>
                    <div className="border-t border-slate-600"></div>
                  </div>
                );
              })}
            </>
          )}

          {modalDetailOpen && (
            <AddUserModal
              closeModal={() => setModalDetailOpen(false)}
              onSubmit={handleSubmitAddUser}
              defaultValue={detailData}
              isDetail={true}
              dataUser={data}
              token={token}
            />
          )}
          {modalEditOpen && (
            <AddUserModal
              closeModal={handleCloseEditModal}
              onSubmit={handleSubmitEditUser}
              defaultValue={editData}
              isEdit={true}
              dataUser={data}
              token={token}
            />
          )}
          {modalAddOpen && (
            <AddUserModal
              closeModal={handleCloseAddModal}
              onSubmit={handleSubmitAddUser}
              dataUser={data}
              token={token}
            />
          )}
          {modalDeleteOpen && (
            <DeleteUserModal
              closeModal={handleCloseDeleteModal}
              onSubmit={handleSubmitDeleteDataPetugas}
              defaultValue={deleteData}
              token={token}
            />
          )}
          {modalUbahPasswordOpen && (
            <UbahPasswordModal
              closeModal={handleCloseUbahPassword}
              onSubmit={handleSubmitUbahPassword}
              defaultValue={ubahPasswordData}
              token={token}
            />
          )}
        </div>

        {data.length === 0 ? null : (
          <div className="mt-5">
            <p>
              Total Rows: {rows} Page: {rows ? currentPage : null} of {pages}
            </p>
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

export default UserList;
