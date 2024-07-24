import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../common/Loader";
import { Alerts } from "./AlertDaftarKasus";
import {
  apiCreateDaftarKasus,
  apiReadDaftarKasus,
  apiUpdateDaftarKasus,
  apiDeleteDaftarKasus,
  apiCreateBarangBukti,
  apiJenisPidanaRead,
} from "../../services/api";
import { AddDaftarKasusModal } from "./ModalAddDaftarKasus";
import { DeleteDaftarKasusModal } from "./ModalDeleteDaftarKasus";
import Pagination from "../../components/Pagination";
import * as xlsx from "xlsx";
import SearchInputButton from "../Device/Search";
import DropdownAction from "../../components/DropdownAction";
import dayjs from "dayjs";
import { EditDaftarKasusModal } from "./modalEditdaftarKasus";
import { AddBarangBuktiModal } from "../MasterData/BarangBukti/ModalAddBarangBukti";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Error403Message } from "../../utils/constants";
import DetailPerkara from "./DetailPerkara";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import DetailKasus from "../EntryData/DetailKasus";

interface Item {
  nama_kasus: string;
  nomor_kasus: string;
  nama_jenis_perkara: string;
  nama_jenis_pidana: string;
  oditur_penyidik: [];
}

const DaftarKasus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // useState untuk menampung data dari API
  const [data, setData] = useState<Item[]>([]);
  const [detailData, setDetailData] = useState<Item | null>(null);
  const [editData, setEditData] = useState<Item | null>(null);
  const [deleteData, setDeleteData] = useState<Item | null>(null);
  const [jenisPidana, setJenisPidana] = useState([]);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalAddBarangBukti, setModalAddBarangBukti] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOperator, setIsOperator] = useState<boolean>();
  const [searchData, setSearchData] = useState({
    nama_kasus: "",
    nama_jenis_pidana: "",
  });
  const [ketuaOditur, setKetuaODitur] = useState("");
  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  //Filter Table

  const [searchTanggalPelaporan, setSearchTanggalPelaporan] = useState(false);
  const [searchTanggalKejadian, setSearchTanggalKejadian] = useState(false);
  const [searchNomorKasus, setSearchNomorKasus] = useState(false);
  const [searchNamaKasus, setSearchNamaKasus] = useState(false);

  //Filter Value Search Table

  const [filterNomorKasus, setFilterNomorKasus] = useState("");
  const [filterNamaKasus, setFilterNamaKasus] = useState("");
  const [filterTanggalPelaporan, setFilterTanggalPelaporan] = useState("");
  const [filterTanggalKejadian, setFilterTanggalKejadian] = useState("");

  // const handleButtonFilter = (type: any) => {
  //   if (type === 'tanggal_pelaporan') {
  //     setSearchTanggalPelaporan((prevState) => !prevState);
  //   } else if (type === 'tanggal_kejadian') {
  //     setSearchTanggalKejadian((prevState) => !prevState);
  //   }
  // };

  // const navigate = useNavigate();

  // const dataUserItem = localStorage.getItem('dataUser');
  // const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  // useEffect(()=>{
  //   if(dataAdmin.role_name !== "superadmin"){
  //     navigate('/')
  //   }
  // },[])

  const handleButtonFilter = (type: any) => {
    if (type === "nomor_kasus") {
      setSearchNomorKasus((prevState) => !prevState);
    } else if (type === "nama_kasus") {
      setSearchNamaKasus((prevState) => !prevState);
    } else if (type === "tanggal_pelaporan") {
      setSearchTanggalPelaporan((prevState) => !prevState);
    } else if (type === "tanggal_kejadian") {
      setSearchTanggalKejadian((prevState) => !prevState);
    }
  };

  const handleFilterChange = async (e: any) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handleFilterChangeNomorKasus = async (e: any) => {
    const newFilter = e.target.value;
    setFilterNomorKasus(newFilter);
  };

  const handleFilterChangeNamaKasus = async (e: any) => {
    const newFilter = e.target.value;
    setFilterNamaKasus(newFilter);
  };

  const handleFilterChangeTanggalPelaporan = async (e: any) => {
    const newFilter = e.target.value;
    setFilterTanggalPelaporan(newFilter);
  };

  const handleFilterChangeTanggalKejadian = async (e: any) => {
    const newFilter = e.target.value;
    setFilterTanggalKejadian(newFilter);
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".search",
          popover: {
            title: "Search",
            description: "Mencari nama kasus",
          },
        },
        {
          element: ".p-pidana",
          popover: {
            title: "Jenis Pidana",
            description: "Pilih jenis pidana yang diinginkan",
          },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari nama kasus",
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
            description: "Menambahkan daftar kasus",
          },
        },
        {
          element: ".b-penyidikan",
          popover: {
            title: "Penyidikan",
            description: "Masuk ke halaman penyidikan",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleSearchClick = async () => {
    try {
      let params = {
        nama_kasus: filter,
        nama_jenis_pidana: searchData.nama_jenis_pidana,
        page: currentPage,
        pageSize: pageSize,
      };
      console.log(params, "sini");
      const response = await apiReadDaftarKasus(params, token);

      if (response.data.status === "OK") {
        const result = response.data.records;
        setData(result);
        // setKetuaOditur(result.?oditur_penyidik?)
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
      } else if (response.data.status === "No Data") {
        const result = response.data.records;
        setData(result);
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
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
    getAllJenisPidana();
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
    let param = {
      filter: "",
      page: currentPage,
      pageSize: pageSize,
    };
    console.log("testingParam", param);
    setIsLoading(true);
    try {
      const response = await apiReadDaftarKasus(param, token);
      if (response.data.status === "OK") {
        const result = response.data.records;
        let namaKetuaOditur = result.filter((data: any) => {
          return data.oditur_penyidik.some(
            (oditur: any) => oditur.role_ketua === 1
          );
        });
        namaKetuaOditur.forEach((data: any) => {
          data.oditur_penyidik
            .filter((oditur: any) => oditur.role_ketua === 1)
            .forEach((oditur: any) => {
              setKetuaODitur(oditur.nama_oditur);
              console.log(oditur.nama_oditur, "ketuaODitur");
            });
        });
        setData(result);
        console.log("hasilResult", result);
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

  const getAllJenisPidana = async () => {
    let params = {
      filter: "",
      pageSize: 10,
    };
    try {
      const response = await apiJenisPidanaRead(params, token);
      // console.log('JENIS Pidana', response.data.records);
      const data = response.data.records;
      const uniqueData: any[] = [];
      const trackedNames: any[] = [];

      data.forEach((item: any) => {
        if (!trackedNames.includes(item.nama_jenis_pidana)) {
          trackedNames.push(item.nama_jenis_pidana);
          uniqueData.push(item);
        }
      });

      // console.log('uniqueData', uniqueData);
      setJenisPidana(uniqueData);
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

  console.log(jenisPidana);

  // function untuk menampilkan modal detail
  const handleDetailClick = (item: Item) => {
    // console.log(item, 'kfan')
    setDetailData(item);
    setModalDetailOpen(true);

    const newArrayOditur: any = [];

    item?.oditur_penyidik?.map(
      (item: any) =>
        newArrayOditur?.push({
          oditur_penyidik_id: item?.oditur_penyidik_id,
          nama_oditur: item?.nama_oditur,
        }),
      console.log(newArrayOditur, "kfan")
    );
  };

  const [detailPerkaraOpen, setDetailPerkaraOpen] = useState(false);

  const handleDetailPerkara = (item: Item) => {
    setDetailData(item);
    setDetailPerkaraOpen(true);
  };

  // function untuk menampilkan modal edit
  const handleEditClick = (item: Item) => {
    const newArrayOditur: any = [];

    item?.oditur_penyidik?.map(
      (item: any) =>
        newArrayOditur?.push({
          oditur_penyidik_id: item?.oditur_penyidik_id,
          nama_oditur: item?.nama_oditur,
        })
    );

    const oditurKetua: any = item?.oditur_penyidik.find(
      (item: any) => item.role_ketua === "1"
    );

    const editData: any = {
      oditur_penyidik_id: newArrayOditur?.map(
        (item: any) => item?.oditur_penyidik_id
      ),
      role_ketua_oditur_holder: {
        oditur_penyidik_id: oditurKetua?.oditur_penyidik_id,
        nama_oditur: oditurKetua?.nama_oditur,
      },
      role_ketua: oditurKetua?.oditur_penyidik_id,
      oditurHolder: newArrayOditur,
    };

    const combinedData = {
      ...item,
      ...editData,
    };
    console.log(combinedData, "combinedData");
    setEditData(combinedData);
    setModalEditOpen(true);
  };

  const handleAddBarangBuktiClick = (item: Item) => {
    setDetailData(item);
    setModalAddBarangBukti(true);
  };

  // function untuk menampilkan modal delete
  const handleDeleteClick = (item: Item) => {
    setDeleteData(item);
    setModalDeleteOpen(true);
  };

  // function untuk menutup modal
  const handleCloseModal = () => {
    setModalDeleteOpen(false);
    setModalAddOpen(false);
    setModalEditOpen(false);
    setModalAddBarangBukti(false);
  };

  // function untuk menghapus data
  const handleSubmitDelete = async (params: any) => {
    try {
      const responseDelete = await apiDeleteDaftarKasus(params, token);
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
    try {
      const responseCreate = await apiCreateDaftarKasus(params, token);

      if (responseCreate.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        setModalAddOpen(false);
        fetchData();
      } else if (responseCreate.data.status === "error") {
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
    try {
      const responseEdit = await apiUpdateDaftarKasus(params, token);

      if (responseEdit.data.status === "OK") {
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

  useEffect(() => {
    if (dataAdmin?.role_name === "operator") {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }
  }, [isOperator]);

  const [nomorKasus, setNomorKasus] = useState({
    nomor_kasus: "",
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
    const type = "Pid.K";
    const day = dayjs(new Date()).format("DD");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear().toString();
    const lokasi = "Otmil";
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;

    data.forEach((item) => {
      if (item.nomor_kasus) {
        const nomorKasus = item.nomor_kasus.split("/")[0]; // Get the first part of the case number
        const angka = parseInt(nomorKasus, 10);

        if (!isNaN(angka) && item.nomor_kasus.includes(currentDate)) {
          angkaTerbesar = Math.max(angkaTerbesar, angka);
        }
      }
    });

    // Increment the largest number by 1 if the date is the same
    if (angkaTerbesar === 0) {
      // No matching cases for the current date
      angkaTerbesar = 1;
    } else {
      angkaTerbesar += 1;
    }

    setNomorKasus({
      ...nomorKasus,
      nomor_kasus: `${angkaTerbesar}/${type}/${currentDate}/${lokasi}`,
    });

    setModalAddOpen(true);
  };

  const exportToExcel = () => {
    const dataToExcel = [
      [
        "Nama Kasus",
        "Nomor Kasus",
        "Nama Kategori Perkara",
        "Nama Jenis Perkara",
        "Lokasi Kasus",
        "Tanggal Registrasi Kasus",
        "Tanggal Kejadian Kasus",
        "Tanggal Pelimpahan Kasus",
        "Jumlah Penyidikan",
        "Nama Oditur",
        "Nama Saksi",
        "Nama Tersangka",
      ],
      ...data.map((item: any) => [
        item.nama_kasus,
        item.nomor_kasus,
        item.nama_kategori_perkara,
        item.nama_jenis_perkara,
        item.lokasi_kasus,
        item.waktu_pelaporan_kasus,
        item.waktu_kejadian,
        item.tanggal_pelimpahan_kasus,
        item.penyidikan.length,
        item.oditur_penyidik
          .map((oditur: any) => oditur.nama_oditur)
          .join(", "),
        item.saksi.map((saksi: any) => saksi.nama_saksi).join(", "),
        item.wbp_profile.map((item: any) => item.nama).join(", "),
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(
      wb,
      `DataKasus${dayjs(new Date()).format("DDMMYYYY-HHmmss")}.xlsx`
    );
  };

  //AddBarang bukti
  const handleSubmitAddBarangBukti = async (params: any) => {
    try {
      const responseCreate = await apiCreateBarangBukti(params, token);
      if (responseCreate.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        handleCloseModal();
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
  const getDetailData = (datanya: any) => {
    return navigate("/workstation/detail-perkara", {
      state: { data: datanya },
    });
  };
  console.log(searchData);

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
                placehorder="Cari Nama Kasus"
                onChange={handleFilterChange}
                // onChange={(e) =>
                //   setSearchData({ ...searchData, nama_kasus: e.target.value })
                // }
              />
            </div>

            <select
              value={searchData.nama_jenis_pidana}
              onChange={(e) =>
                setSearchData({
                  ...searchData,
                  nama_jenis_pidana: e.target.value,
                })
              }
              className=" rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary p-pidana"
            >
              <option value="">Semua jenis pidana</option>
              {jenisPidana.map((item: any, index) => (
                <option key={index} value={item.nama_jenis_pidana}>
                  {item.nama_jenis_pidana}
                </option>
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

        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {/* Daftar Kasus */}
            Daftar Kasus
          </h4>
          <div className="flex flex-row space-x-4 space-x">
            <div>
              <button
                className="text-black rounded-md font-semibold py-2 px-3 bg-green-600 b-penyidikan"
                onClick={() => navigate("/workstation/penyidikan")}
              >
                Penyidikan
              </button>
            </div>
            <div>
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
        </div>
      </div>

      <div className="">
        <div
          className={`${
            isOperator ? "grid grid-cols-4" : "grid grid-cols-5"
          } rounded-t-md bg-gray-2 dark:bg-slate-600 h-[100px]`}
        >
          <div className="flex flex-col items-center">
            <div
              className="p-2.5 xl:p-5 justify-center flex"
              onClick={() => handleButtonFilter("nomor_kasus")}
            >
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nomer Kasus
              </h5>
            </div>
            {searchNomorKasus && (
              <div className="w-[80%] search">
                <SearchInputButton
                  value={filterNomorKasus}
                  // placehorder="Cari Nama Kasus"
                  onChange={handleFilterChangeNomorKasus}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div
              className="p-2.5 xl:p-5 justify-center flex"
              onClick={() => handleButtonFilter("nama_kasus")}
            >
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama Kasus
              </h5>
            </div>
            {searchNamaKasus && (
              <div className="w-[80%] search">
                <SearchInputButton
                  value={filterNamaKasus}
                  // placehorder="Cari Nama Kasus"
                  onChange={handleFilterChangeNamaKasus}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div
              className="p-2.5 xl:p-5 justify-center flex"
              onClick={() => handleButtonFilter("tanggal_pelaporan")}
            >
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tanggal Pelaporan
              </h5>
            </div>
            {searchTanggalPelaporan && (
              <div className="w-[80%] search">
                <SearchInputButton
                  // value={filter}
                  // placehorder="Cari Nama Kasus"
                  // onChange={handleFilterChange}
                  value={filterTanggalPelaporan}
                  // placehorder="Cari Nama Kasus"
                  onChange={handleFilterChangeTanggalPelaporan}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div
              className="p-2.5 xl:p-5 justify-center flex"
              onClick={() => handleButtonFilter("tanggal_kejadian")}
            >
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tanggal Kejadian
              </h5>
            </div>
            {searchTanggalKejadian && (
              <div className="w-[80%] search">
                <SearchInputButton
                  // value={filter}
                  // placehorder="Cari Nama Kasus"
                  // onChange={handleFilterChange}

                  value={filterTanggalKejadian}
                  // placehorder="Cari Nama Kasus"
                  onChange={handleFilterChangeTanggalKejadian}
                />
              </div>
            )}
          </div>
          {isOperator ? null : (
            <div className=" p-2.5 text-center col-span-1 xl:p-5 justify-center flex">
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
            {data.map((item: any, index) => {
              return (
                <div key={index}>
                  <div
                    className={`${
                      isOperator ? "grid grid-cols-4" : "grid grid-cols-5"
                    } rounded-sm bg-gray-2 dark:bg-meta-4 capitalize`}
                    key={item.nama_kasus}
                  >
                    <div
                      onClick={() => handleDetailClick(item)}
                      // onClick={() => getDetailData(item)}
                      className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate dark:text-white capitalize">
                        {item.nomor_kasus}
                      </p>
                    </div>

                    <div
                      onClick={() => handleDetailClick(item)}
                      // onClick={() => getDetailData(item)}
                      className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate dark:text-white capitalize">
                        {item.nama_kasus}
                      </p>
                    </div>

                    <div
                      onClick={() => handleDetailClick(item)}
                      // onClick={() => getDetailData(item)}
                      className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate dark:text-white capitalize">
                        {formatDate(item.waktu_pelaporan_kasus)}
                      </p>
                    </div>

                    <div
                      onClick={() => handleDetailClick(item)}
                      // onClick={() => getDetailData(item)}
                      className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className=" text-black truncate text-center dark:text-white capitalize">
                        {/* {item.waktu_kejadian} */}
                        {formatDate(item.waktu_kejadian)}
                      </p>
                    </div>
                    {isOperator ? (
                      <></>
                    ) : (
                      <>
                        <div className="hidden items-center  justify-center p-2.5 sm:flex xl:p-5 flex-wrap lg:flex-nowrap gap-2">
                          <div className="relative">
                            <DropdownAction
                              kasus={true}
                              handleAddClick={() =>
                                handleAddBarangBuktiClick(item)
                              }
                              handleEditClick={() => handleEditClick(item)}
                              handleDeleteClick={() => handleDeleteClick(item)}
                            >
                              <button></button>
                            </DropdownAction>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="border-t border-slate-600"></div>
                </div>
              );
            })}
          </>
        )}

        {modalDetailOpen && (
          <EditDaftarKasusModal
            closeModal={() => setModalDetailOpen(false)}
            onSubmit={handleSubmitAdd}
            defaultValue={detailData}
            isDetail={true}
            token={token}
            ketua={ketuaOditur}
          />
        )}
        {modalEditOpen && (
          <EditDaftarKasusModal
            closeModal={handleCloseModal}
            onSubmit={handleSubmitEdit}
            defaultValue={editData}
            isEdit={true}
            token={token}
            ketua={ketuaOditur}
          />
        )}
        {modalAddBarangBukti && (
          <AddBarangBuktiModal
            isKasus={true}
            defaultValue={detailData}
            closeModal={handleCloseModal}
            onSubmit={handleSubmitAddBarangBukti}
            token={token}
          />
        )}
        {modalAddOpen && (
          <AddDaftarKasusModal
            closeModal={handleCloseModal}
            onSubmit={handleSubmitAdd}
            defaultValue={nomorKasus}
            token={token}
            dataKasus={data}
          />
        )}
        {/* {modalAddOpen && (
          <DetailKasus
            closeModal={handleCloseModal}
            onSubmit={handleSubmitAdd}
            defaultValue={nomorKasus}
            token={token}
          />
        )} */}
        {modalDeleteOpen && (
          <DeleteDaftarKasusModal
            closeModal={handleCloseModal}
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
  );
};

export default DaftarKasus;
