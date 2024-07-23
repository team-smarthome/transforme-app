import { useEffect, useState } from "react";
import { apiJenisSidangRead, apiSidangDelete, apiSidangInsert, apiSidangRead, apiSidangUpdate } from "../../services/api";
import { AddSidangModal } from "./ModalAddSidang";
import { Alerts } from "./AlertSidang";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../common/Loader";
import { DeleteSidangModal } from "./ModalDeleteSidang";
import * as xlsx from "xlsx";

import SearchInputButton from "../Device/Search";
import dayjs from "dayjs";
import Pagination from "../../components/Pagination";
import DropdownAction from "../../components/DropdownAction";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Error403Message } from "../../utils/constants";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const tokenItem = localStorage.getItem("token");
const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
const token = dataToken.token;

const dataUserItem = localStorage.getItem("dataUser");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

const SidangList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [jenisSidang, setJenisSidang] = useState([]);
  const [editData, setEditData] = useState([]);
  const [ubahPasswordData, setUbahPasswordData] = useState([]);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalUbahPasswordOpen, setModalUbahPasswordOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [searchData, setSearchData] = useState({
    namaSidang: "",
    jenisSidang: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOperator, setIsOperator] = useState<boolean>();

  const [alertIsAdded, setAlertIsAdded] = useState(false);
  const [alertIsEdited, setAlertIsEdited] = useState(false);
  const [alertIsDeleted, setAlertIsDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleChagePage = (pageNumber: any) => {
    console.log(currentPage, "currentPage");
    console.log(pageNumber, "pageNumber");
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (dataAdmin?.role_name === "operator") {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }

    console.log(isOperator, "Operator");
  }, [isOperator]);

  const handleDetailClick = (item: any) => {
    console.log(item, "detail item");
    const newArrayJaksa: any = [];
    const newArrayAhli: any = [];
    const newArraySaksi: any = [];
    const newArrayPengacara: any = [];
    const newArrayHakim: any = [];
    const newArrayWbp: any = [];

    item?.sidang_oditur?.map(
      (item: any) =>
        newArrayJaksa?.push({
          oditur_penuntut_id: item?.oditur_penuntut_id,
          nama_oditur: item?.nama_oditur,
        })
    );

    item?.sidang_ahli.map((item: any) =>
      newArrayAhli.push({
        ahli_id: item?.ahli_id,
        nama_ahli: item?.nama_ahli,
        bidang_ahli: item?.bidang_ahli,
      })
    );

    item?.sidang_saksi.map((item: any) =>
      newArraySaksi.push({
        saksi_id: item?.saksi_id,
        nama_saksi: item?.nama_saksi,
      })
    );

    item?.sidang_hakim.map((item: any) =>
      newArrayHakim.push({
        hakim_id: item?.hakim_id ?? "",
        nama_hakim: item?.nama_hakim ?? "",
      })
    );

    item?.sidang_kasus_wbp.map((item: any) =>
      newArrayWbp.push({
        wbp_profile_id: item?.wbp_profile_id,
        nama: item?.nama,
      })
    );

    // Assuming newArrayWbp is defined somewhere before this code block

    // item?.sidang_wbp?.forEach((sidangItem: any) => {
    //   // Check if sidangItem is defined and contains the expected properties
    //   if (sidangItem && sidangItem.wbp_profile_id && sidangItem.nama) {
    //     newArrayWbp.push({
    //       wbp_profile_id: sidangItem.wbp_profile_id,
    //       nama: sidangItem.nama,
    //     });
    //   } else {
    //     // Handle the case where sidangItem is not defined or does not contain the expected properties
    //     console.error(
    //       'sidangItem is undefined or does not contain the expected properties:',
    //       sidangItem,
    //     );
    //   }
    // });

    const hakimKetua = item?.sidang_hakim.find((item: any) => item.ketua_hakim === "1");
    const jaksaKetua = item?.sidang_oditur.find((item: any) => item.role_ketua_oditur === "1");

    const detailItem: any = {
      sidang_id: item?.sidang_id,
      waktu_mulai_sidang: item?.waktu_mulai_sidang,
      waktu_selesai_sidang: item?.waktu_selesai_sidang,
      jadwal_sidang: item?.jadwal_sidang,
      perubahan_jadwal_sidang: item?.perubahan_jadwal_sidang,
      kasus_id: item?.kasus_id,
      nama_kasus: item?.nama_kasus,
      nomor_kasus: item?.nomor_kasus,
      masa_tahanan_tahun: item?.masa_tahanan_tahun,
      masa_tahanan_bulan: item?.masa_tahanan_bulan,
      masa_tahanan_hari: item?.masa_tahanan_hari,
      nama_sidang: item?.nama_sidang,
      juru_sita: item?.juru_sita,
      pengawas_peradilan_militer: item?.pengawas_peradilan_militer,
      jenis_persidangan_id: item?.jenis_persidangan_id,
      nama_jenis_persidangan: item?.nama_jenis_persidangan,
      pengadilan_militer_id: item?.pengadilan_militer_id,
      nama_pengadilan_militer: item?.nama_pengadilan_militer,
      nama_dokumen_persidangan: item?.nama_dokumen_persidangan,
      hasil_vonis: item?.hasil_vonis,
      ahliHolder: newArrayAhli,
      agenda_sidang: item?.agenda_sidang,
      saksiHolder: newArraySaksi,
      pengacara: item?.sidang_pengacara?.map((item: any) => item?.nama_pengacara),
      hakimHolder: newArrayHakim,
      wbpHolder: newArrayWbp,
      oditurHolder: newArrayJaksa,
      hasil_keputusan_sidang: item?.hasil_keputusan_sidang,
      role_ketua_oditur_holder: {
        oditur_penuntut_id: jaksaKetua?.oditur_penuntut_id,
        nama_oditur: jaksaKetua?.nama_oditur,
      },
      link_dokumen_persidangan: item.link_dokumen_persidangan,
    };
    setDetailData(detailItem);
    setModalDetailOpen(true);
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".search",
          popover: {
            title: "Search",
            description: "Mencari nama binaan",
          },
        },
        {
          element: ".p-sidang",
          popover: {
            title: "Jenis Sidang",
            description: "Pilih jenis sidang yang diinginkan",
          },
        },
        {
          element: ".b-search",
          popover: {
            title: "Button Search",
            description: "Click button untuk mencari nama binaan",
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
            description: "Menambahakan data daftar sidang",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleEditClick = (item: any) => {
    console.log(item, "item edit");
    const newArrayJaksa: any = [];
    const newArrayAhli: any = [];
    const newArraySaksi: any = [];
    const newArrayPengacara: any = [];
    const newArrayHakim: any = [];
    const newArrayWbp: any = [];

    item?.sidang_oditur?.map(
      (item: any) =>
        newArrayJaksa?.push({
          oditur_penuntut_id: item?.oditur_penuntut_id,
          nama_oditur: item?.nama_oditur,
        })
    );

    item?.sidang_ahli.map((item: any) =>
      newArrayAhli.push({
        ahli_id: item?.ahli_id,
        nama_ahli: item?.nama_ahli,
        bidang_ahli: item?.bidang_ahli,
      })
    );

    item?.sidang_saksi.map((item: any) =>
      newArraySaksi.push({
        saksi_id: item?.saksi_id,
        nama_saksi: item?.nama_saksi,
      })
    );

    item?.sidang_pengacara.map((item: any) => newArrayPengacara.push(item?.nama_pengacara));

    item?.sidang_hakim.map((item: any) =>
      newArrayHakim.push({
        hakim_id: item?.hakim_id,
        nama_hakim: item?.nama_hakim,
      })
    );

    item?.sidang_kasus_wbp.map((item: any) =>
      newArrayWbp.push({
        wbp_profile_id: item?.wbp_profile_id,
        nama: item?.nama,
      })
    );

    const hakimKetua = item?.sidang_hakim.find((item: any) => item.ketua_hakim === "1");
    const jaksaKetua = item?.sidang_oditur.find((item: any) => item.role_ketua_oditur === "1");
    // console.log('HAKIM KETUA', hakimKetua);

    // console.log('NEW ARRAY',newArrayJaksa)

    const editItem: any = {
      sidang_id: item?.sidang_id,
      waktu_mulai_sidang: item?.waktu_mulai_sidang,
      waktu_selesai_sidang: item?.waktu_selesai_sidang,
      jadwal_sidang: item?.jadwal_sidang,
      perubahan_jadwal_sidang: item?.perubahan_jadwal_sidang,
      kasus_id: item?.kasus_id,
      nama_kasus: item?.nama_kasus,
      nomor_kasus: item?.nomor_kasus,
      masa_tahanan_tahun: item?.masa_tahanan_tahun,
      masa_tahanan_bulan: item?.masa_tahanan_bulan,
      masa_tahanan_hari: item?.masa_tahanan_hari,
      nama_sidang: item?.nama_sidang,
      juru_sita: item?.juru_sita,
      pengawas_peradilan_militer: item?.pengawas_peradilan_militer,
      jenis_persidangan_id: item?.jenis_persidangan_id,
      nama_jenis_persidangan: item?.nama_jenis_persidangan,
      pengadilan_militer_id: item?.pengadilan_militer_id,
      nama_pengadilan_militer: item?.nama_pengadilan_militer,
      nama_dokumen_persidangan: item?.nama_dokumen_persidangan,
      hasil_vonis: item?.hasil_vonis,
      ahli: newArrayAhli?.map((item: any) => item?.ahli_id),
      ahliHolder: newArrayAhli,
      agenda_sidang: item?.agenda_sidang,
      saksiHolder: newArraySaksi,
      saksi: newArraySaksi?.map((item: any) => item?.saksi_id),
      wbpHolder: newArrayWbp,
      wbp_profile: newArrayWbp?.map((item: any) => item?.wbp_profile_id),
      pengacara: newArrayPengacara,
      hakimHolder: newArrayHakim,
      oditur_penuntut_id: newArrayJaksa?.map((item: any) => item?.oditur_penuntut_id),
      oditurHolder: newArrayJaksa,
      hasil_keputusan_sidang: item?.hasil_keputusan_sidang,
      role_ketua_oditur_holder: {
        oditur_penuntut_id: jaksaKetua?.oditur_penuntut_id,
        nama_oditur: jaksaKetua?.nama_oditur,
      },
      role_ketua_oditur: jaksaKetua?.oditur_penuntut_id,
      link_dokumen_persidangan: item?.link_dokumen_persidangan,
    };
    console.log("NEW ITEM EDIT", editItem);
    setEditData(editItem);
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

  const handleSubmitAddUser = async (params: any) => {
    console.log(params, "params submit add");
    try {
      const responseCreate = await apiSidangInsert(params, token);
      if (responseCreate.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        setModalAddOpen(false);
        console.log(responseCreate, "crrr");
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

  const handleSubmitEditUser = async (params: any) => {
    console.log(params, "params submit edit");
    try {
      const responseEdit = await apiSidangUpdate(params, token);
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

  const handleSubmitDeleteDataPetugas = async (params: any) => {
    console.log("DELETE", params);
    try {
      const responseDelete = await apiSidangDelete(params, token);
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

  const handleCloseEditModal = () => {
    setModalEditOpen(false);
  };
  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
  };
  useEffect(() => {
    fetchData();
    getAllJenisSidang();
  }, [currentPage, pageSize]);

  useEffect(() => {
    // Menambahkan event listener untuk tombol "Enter" pada komponen ini
    document.addEventListener("keypress", handleEnterKeyPress);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [searchData]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

  let fetchData = async () => {
    setIsLoading(true);
    let params = {
      filter: "",
      page: currentPage,
      pageSize: pageSize,
    };
    try {
      const response = await apiSidangRead(params, token);
      if (response.data.status === "OK") {
        setData(response.data.records);
        console.log(response.data.records, "dataa");
        setPages(response.data.pagination.totalPages);
        setRows(response.data.pagination.totalRecords);
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
    setIsLoading(false);
  };

  const getAllJenisSidang = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };

    try {
      const response = await apiJenisSidangRead(params, token);
      console.log("Response from API:", response);

      if (response.data && response.data.records) {
        const data = response.data.records;
        console.log("JENIS SIDANG", data);

        const uniqueData = [];
        const trackedNames = [];

        data.forEach((item) => {
          if (!trackedNames.includes(item.nama_jenis_persidangan)) {
            trackedNames.push(item.nama_jenis_persidangan);
            uniqueData.push(item);
          }
        });

        console.log("uniqueData", uniqueData);
        setJenisSidang(uniqueData);
      } else {
        console.error("Response does not contain records:", response.data);
      }
    } catch (e) {
      if (e.response && e.response.status === 403) {
        navigate("/auth/signin", {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      } else {
        console.error("Error fetching data:", e);
      }

      Alerts.fire({
        icon: e.response && e.response.status === 403 ? "warning" : "error",
        title: e.response && e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  const flattenObject = (obj: any, prefix = ""): any => {
    return Object.keys(obj).reduce((acc: any, key) => {
      const propName = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        return { ...acc, ...flattenObject(obj[key], propName) };
      } else {
        return {
          ...acc,
          [propName]: obj[key] !== null && typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key],
        };
      }
    }, {});
  };

  const exportToExcel = async () => {
    const keyProperty: any[] = [];
    for (const obj of data) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          keyProperty.push(key);
        }
      }
    }
    const dataToExcel = [
      keyProperty.filter((property) => property !== "sidang_id"),
      ...data.map((item: any) => {
        const { sidang_id, ...itemWithoutSidangId } = item;
        const flattenedItem = flattenObject(itemWithoutSidangId);
        return Object.values(flattenedItem);
      }),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, `DataSidang${dayjs(new Date()).format("DDMMYYYY-HHmmss")}.xlsx`);
  };

  interface ItemType {
    nama_wbp: string;
    nama_jenis_persidangan: string;
  }
  const handleSearchSidang = async () => {
    // console.log('searchData', searchData);
    try {
      let params = {
        // filter: {
        nama_sidang: searchData.namaSidang,
        nama_jenis_persidangan: searchData.jenisSidang,
        // },
        currentPage: currentPage,
        pageSize: 10,
      };
      const response = await apiSidangRead(params, token);
      if (response.data.status === "OK") {
        const result = response.data.records;
        // console.log('result', result);
        setData(result);
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
      handleSearchSidang();
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
              <SearchInputButton value={searchData.namaSidang} placehorder="Cari nama sidang" onChange={(e) => setSearchData({ ...searchData, namaSidang: e.target.value })} />
            </div>

            <select
              value={searchData.jenisSidang}
              onChange={(e) => setSearchData({ ...searchData, jenisSidang: e.target.value })}
              className=" rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary p-sidang"
            >
              <option value="">Semua jenis sidang</option>
              {jenisSidang.map((item: any, index) => (
                <option key={index} value={item.nama_jenis_persidangan}>
                  {item.nama_jenis_persidangan}
                </option>
              ))}
            </select>

            <button className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search " type="button" onClick={handleSearchSidang} id="button-addon1" data-te-ripple-init data-te-ripple-color="light">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-black">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </button>

            <button onClick={exportToExcel} className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium excel">
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
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Data Daftar Sidang</h4>
          {!isOperator && (
            <button onClick={() => setModalAddOpen(true)} className=" text-black rounded-md bg-blue-300 w-20 h-10 b-tambah">
              Tambah
            </button>
          )}
        </div>

        <div className="flex flex-col">
          {isOperator ? (
            <div className="grid grid-cols-6 text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Nama Sidang</h5>
              </div>

              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">No Kasus</h5>
              </div>

              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Jenis Sidang</h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Jadwal Sidang</h5>
              </div>

              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Ketua Oditur</h5>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-6 text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Nama Sidang</h5>
              </div>

              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">No Kasus</h5>
              </div>

              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Jenis Sidang</h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Jadwal Sidang</h5>
              </div>

              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Ketua Oditur</h5>
              </div>
              <div className="p-2.5 xl:p-5 ">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Aksi</h5>
              </div>
            </div>
          )}
          {data.length == 0 ? (
            <div className="flex justify-center p-4 w-ful">No Data</div>
          ) : (
            <>
              {data.map((item: any, index) => {
                return (
                  <div key={index}>
                    {isOperator ? (
                      <div className="grid grid-cols-6 rounded-sm  bg-gray-2 dark:bg-meta-4  ">
                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                          <p className="hidden text-black dark:text-white sm:block">{item.nama_sidang}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                          <p className="hidden text-black dark:text-white sm:block">{item.nomor_kasus}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer truncate">
                          <p className="hidden text-black dark:text-white sm:block">{item.nama_jenis_persidangan}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                          <p className="hidden text-black dark:text-white sm:block">{formatDate(item.jadwal_sidang)}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer capitalize">
                          <p className="hidden text-black dark:text-white sm:block text-center">
                            {item?.sidang_oditur && item.sidang_oditur.length > 0 ? item?.sidang_oditur?.find((item: any) => item.role_ketua_oditur === "1")?.nama_oditur || "" : ""}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-6 rounded-sm  bg-gray-2 dark:bg-meta-4  ">
                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                          <p className="hidden text-black dark:text-white sm:block">{item.nama_sidang}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                          <p className="hidden text-black dark:text-white sm:block">{item.nomor_kasus}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer truncate">
                          <p className="hidden text-black dark:text-white sm:block">{item.nama_jenis_persidangan}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                          <p className="hidden text-black dark:text-white sm:block">{formatDate(item.jadwal_sidang)}</p>
                        </div>

                        <div onClick={() => handleDetailClick(item)} className="sm:flex items-center justify-center p-2.5 xl:p-5 cursor-pointer capitalize">
                          <p className="hidden text-black dark:text-white sm:block text-center">
                            {item?.sidang_oditur && item.sidang_oditur.length > 0 ? item?.sidang_oditur?.find((oditur: any) => oditur.role_ketua_oditur === "1")?.nama_oditur || "" : ""}
                          </p>
                        </div>

                        <div className="lg:flex-nowrap sm:flex flex-wrap items-center justify-center gap-2 p-2.5 xl:p-5">
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
                            <DropdownAction handleEditClick={() => handleEditClick(item)} handleDeleteClick={() => handleDeleteClick(item)}></DropdownAction>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-slate-600"></div>
                  </div>
                );
              })}
            </>
          )}

          {modalDetailOpen && <AddSidangModal closeModal={() => setModalDetailOpen(false)} onSubmit={handleSubmitAddUser} defaultValue={detailData} isDetail={true} token={token} />}
          {modalEditOpen && <AddSidangModal closeModal={handleCloseEditModal} onSubmit={handleSubmitEditUser} defaultValue={editData} isEdit={true} token={token} />}
          {modalAddOpen && <AddSidangModal closeModal={handleCloseAddModal} onSubmit={handleSubmitAddUser} token={token} />}
          {modalDeleteOpen && <DeleteSidangModal closeModal={handleCloseDeleteModal} onSubmit={handleSubmitDeleteDataPetugas} defaultValue={deleteData} />}
          {/* {alertIsAdded && (
          <Alerts
            alertType="success"
            alertMessage="Added"
            alertDescription="Successfully added data"
          />
        )}

        {alertIsEdited && (
          <Alerts
            alertType="success"
            alertMessage="Edited"
            alertDescription="Successfully edited data"
          />
        )} */}
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

export default SidangList;
