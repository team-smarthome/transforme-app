import React, { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import {
  apiJenisSidangInsert,
  apiJenisSidangRead,
  apiJenisSidangUpdate,
  apiJenisSidangDelete,
  apiRealtimeLog,
  apiReadKamera,
} from "../../../services/api";
import Pagination from "../../../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import * as xlsx from "xlsx";
import Alerts from "../../User/AlertUser";
import SearchInputButton from "../../Device/Search";

// Interface untuk objek 'params' dan 'item'
interface Params {
  filter: string;
}

interface Item {
  timestamp: any;
  nama_kamera: string;
  tipe_lokasi: string;
  nama_lokasi: string;
  keterangan: string;
}

const LogRealtime = () => {
  // useState untuk menampung data dari API
  const [data, setData] = useState<Item[]>([]);
  const [dataKamera, setDataKamera] = useState<Item[]>([]);
  const [modalAddOpen, setModalAddOpen] = useState(false);
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
      const params = {
        filter: {
          nama_kamera: filter,
        },
        page: currentPage,
        pageSize: pageSize,
      };
      const response = await apiRealtimeLog(params, token);

      if (response.data.status === "OK") {
        const result = response.data;
        setData(result.records);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else {
        throw new Error("Terjadi kesalahan saat mencari data.");
      }
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: "error",
        title: error,
      });
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

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData1();
    }, 1000);
    return () => clearInterval(fetchDataInterval);
  });

  useEffect(() => {
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
      const response = await apiRealtimeLog(params, token);
      if (response.data.status !== "OK") {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setData(result);
      setPages(response.data.pagination.totalPages);
      setRows(response.data.pagination.totalRecords);
      setIsLoading(false);
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: "error",
        title: error,
      });
    }
  };

  const fetchData1 = async () => {
    let params = {
      filter: " ",
      page: currentPage,
      pageSize: pageSize,
    };
    try {
      const response = await apiRealtimeLog(params, token);
      if (response.data.status !== "OK") {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setData(result);
    } catch (e: any) {
      const error = e.message;
      Alerts.fire({
        icon: "error",
        title: error,
      });
    }
  };

  const kasus = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadKamera(params, token)
      .then((res) => {
        setDataKamera(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: "error",
          title: err.massage,
        })
      );
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
      ["waktu", "nama kamera", "tipe lokasi", "nama lokasi", "keterangan"],
      ...data.map((item: any) => [
        item.timestamp,
        item.nama_kamera,
        item.tipe_lokasi,
        item.nama_lokasi,
        item.keterangan,
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "data_Log_Realtime.xlsx");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-center w-full">
        <div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
          <div className="w-full">
            <SearchInputButton
              value={filter}
              placehorder="Cari log"
              onChange={handleFilterChange}
            />
          </div>

          <button
            className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium "
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

          {/* <button
            onClick={exportToExcel}
            className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium"
          >
            Export&nbsp;Excel
          </button> */}
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Log Realtime
        </h4>
        {/* {!isOperator && 
        <button
          onClick={() => setModalAddOpen(true)}
          className="  text-black rounded-md font-semibold bg-blue-300 py-2 px-3"
        >
          Tambah
        </button>
        } */}
      </div>
      <div className="flex flex-col">
        {isOperator ? (
          <div className="grid grid-cols-1 rounded-t-md bg-gray-2 dark:bg-slate-600 ">
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                gambar kamera
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                nama kamera
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                tipe lokasi
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                nama lokasi
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                keterangan
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                waktu
              </h5>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-6 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                gambar kamera
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                nama kamera
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                tipe lokasi
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                nama lokasi
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                keterangan
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 justify-center flex">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                waktu
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
                        className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6 capitalize"
                        key={item.nama_kamera}
                      >
                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <img
                            src={
                              "https://dev.transforme.co.id/siram_admin_api" +
                              item.image
                            }
                            alt="picture"
                            className="w-20 h-20 object-fit border-slate-400 border"
                          ></img>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.nama_kamera}
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.tipe_lokasi}
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.nama_lokasi}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.keterangan}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-slate-600"></div>
                    </>
                  ) : (
                    <>
                      <div
                        className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 capitalize"
                        key={item.timestamp}
                      >
                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <img
                            src={
                              "https://dev.transforme.co.id/siram_admin_api" +
                              item.image
                            }
                            alt="picture"
                            className="w-20 h-20 object-fit border-slate-400 border"
                          ></img>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.nama_kamera}
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.tipe_lokasi}
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.nama_lokasi}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.keterangan}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer">
                          <p className=" text-black dark:text-white capitalize">
                            {item.timestamp}
                          </p>
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
  );
};

export default LogRealtime;
