import { useEffect, useRef, useState } from "react";
import { Alerts } from "../GrupShift/Alert";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { BsPlusSquareDotted, BsTrash } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import {
  apiCreateScheduleShift,
  apiCretePetugasShift,
  apiDeletePetugasShift,
  apiDeleteScheduleShift,
  apiEditPetugasShift,
  apiReadAllGrupPetugas,
  apiReadAllPetugasShift,
  apiReadAllScheduleShift,
  apiReadAllShift,
  apiReadAllStaff,
} from "../../../services/api";
import AddDataSchedule from "./ModalAddSchedule";
import EditPetugasShift from "./DetailPetugasShift";
import AddPetugasShiftGrup from "./addPetugasShiftGrup";
import DeletePetugasShift from "./deletePetugasShiftGrup";
import DeleteSchedule from "./deleteScedule";
import EditPegawaiPetugasShift from "./editPegawaiShift";
import * as xlsx from "xlsx";
import Select from "react-select";
dayjs.locale("id");
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

interface DaysInMonthProps {
  year: number;
  month: number;
}

const DaysInMonth = ({ year, month }: DaysInMonthProps) => {
  const daysInMonth = new Date(year, month, 0).getDate(); // Mendapatkan jumlah hari dalam bulan
  const daysArray = [];

  // Mengisi array dengan tanggal dari 1 hingga jumlah hari dalam bulan
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  return daysArray;
};

const getDayOfWeek = (year: any, month: any, day: any) => {
  const date = dayjs().year(year).month(month).date(day).locale("id"); // Menggunakan lokal bahasa Indonesia
  return date.format("dddd"); // Format hari dalam bahasa Indonesia (Senin, Selasa, dll.)
};

interface Petugas {
  petugas_id: any;
  waktu_mulai: any;
  waktu_selesai: any;
  tanggal: any;
  bulan: any;
  tahun: any;
  shift_id: any;
  nama_shift: any;
  schedule_id: any;
  nama: any;
  status_izin: any;
  status_kehadiran: number;
  status_pengganti: any;
  grup_petugas_id: any;
  nama_grup_petugas: any;
}

interface Schedule {
  tanggal: any;
  bulan: any;
  tahun: any;
  nama_shift: any;
  schedule_id: any;
  shift_id: any;
}

const shiftJaga = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  //Get Token
  const getToken = localStorage.getItem("token");
  let tokenItem = getToken ? JSON.parse(getToken) : null;
  let token = tokenItem.token;

  const [isLoading, setIsLoading] = useState(false);

  //Kalender
  registerLocale("id", id);
  setDefaultLocale("id");
  const [year, setYear] = useState(parseInt(dayjs(new Date()).format("YYYY"))); // Ganti tahun sesuai kebutuhan Anda
  const [month, setMonth] = useState(parseInt(dayjs(new Date()).format("MM"))); // Ganti bulan (0-11) sesuai kebutuhan Anda, 0 = Januari, 11 = Desember
  const [startDate, setStartDate] = useState(
    parseInt(dayjs(new Date()).format("D"))
  ); // Tanggal awal rentang
  const [endDate, setEndDate] = useState(0); // Tanggal akhir rentang
  const [tanggal, setTanggal] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  // Modal
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalAddPegawaiShift, setModalAddPegawaiShift] = useState(false);
  const [Modaldelete, setModalDelete] = useState(false);
  const [modalDeleteSchedule, setModalDeleteSchedule] = useState(false);
  const [filter, setFilter] = useState("");

  // dropdown
  const [openFilter, setOpenFilter] = useState(false);
  const [openGrup, setOpenGrup] = useState(false);

  //Data GrupPetugas
  const [grupPetugas, setGrupPetugas] = useState<any[]>([]);

  //shift
  const [shift, setShift] = useState([
    {
      nama_shift: "",
    },
  ]);

  //Petugas Shift
  const [petugasShift, setPetugasShift] = useState<Petugas[]>([]);
  const [dataExcel, setDataExcel] = useState<Petugas[]>([]);

  //Schedule Read
  const [loadSchedule, setLoadSchedule] = useState(false);
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  //Validasi Operator
  const [isOperator, setIsOperator] = useState<boolean>();

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  useEffect(() => {
    if (dataAdmin?.role_name === "operator") {
      setIsOperator(true);
    } else {
      setIsOperator(false);
    }

    console.log(isOperator, "Operator");
  }, [isOperator]);
  const [selectedFilterGrup, setSelectedFilterGrup] = useState("1");
  const [filteredGrup, setFilteredGrup] = useState([]);

  //Pegawai
  const [staff, setStaff] = useState<any[]>([
    {
      nama: "",
      petugas_id: "",
      tanggal: "",
      nama_petugas_grup: "",
      nama_shift: "",
    },
  ]);

  const [staffFilter, setStaffFilter] = useState([
    {
      nama: "",
      petugas_id: "",
      tanggal: "",
      nama_petugas_grup: "",
      nama_shift: "",
    },
  ]);

  const filterFetch = {
    filter: {},
  };
  let filterStaff = {
    filter: {
      nama: filter,
    },
    page: 1,
    pageSize: 1000,
  };
  const filterSchedule = {
    pageSize: Number.MAX_SAFE_INTEGER,
    filter: {
      tanggal: `${startDate}-${startDate + 6}`,
      bulan: dayjs(selectedDate).format("M"),
      tahun: dayjs(selectedDate).format("YYYY"),
    },
  };
  const filter1bln = {
    pageSize: Number.MAX_SAFE_INTEGER,
    filter: {
      bulan: dayjs(selectedDate).format("M"),
      tahun: dayjs(selectedDate).format("YYYY"),
    },
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const shift = await apiReadAllShift(filterFetch, token);
      const schedule = await apiReadAllScheduleShift(
        filterSchedule.filter,
        token
      );
      const grupPetugas = await apiReadAllGrupPetugas(filterFetch, token);
      const Petugas = await apiReadAllPetugasShift(
        filterSchedule.filter,
        token
      );
      const staff = await apiReadAllStaff(filterStaff, token);
      const petugasShift = await apiReadAllPetugasShift(
        filter1bln.filter,
        token
      );
      console.log(filterSchedule.filter, "filter  222");
      setDataExcel(petugasShift.data.records);
      setGrupPetugas(grupPetugas.data.records);
      setShift(shift.data.records);
      setPetugasShift(Petugas.data.records);
      setSchedule(schedule.data.records);
      setStaffFilter(staff.data.records);
      setStaff(staff.data.records);
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

  console.log(schedule, "schedule nih");
  useEffect(() => {
    fetchData();
  }, [selectedDate, loadSchedule]);

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // const handleClickTutorial = () => {
  //   const driverObj = driver({
  //     showProgress: true,
  //     steps: [
  //       {
  //         element: '.p-grup',
  //         popover: {
  //           title: 'Grup',
  //           description: 'Pilih grup yang diinginkan',
  //         },
  //       },
  //       {
  //         element: '.p-semua',
  //         popover: {
  //           title: 'Semua Grup',
  //           description: 'Pilih semua grup yang diinginkan',
  //         },
  //       },
  //       {
  //         element: '.p-tanggal',
  //         popover: {
  //           title: 'Pilih Tanggal',
  //           description: 'Pilih tanggal yang diinginkan',
  //         },
  //       },
  //       {
  //         element: '.b-jadwal',
  //         popover: {
  //           title: 'Buat Jadwal',
  //           description: 'Klik untuk membuat jadwal',
  //         },
  //       },
  //       {
  //         element: '#b-ubah',
  //         popover: {
  //           title: 'Ubah Jadwal',
  //           description: `Klik untuk mengubah jadwal`,
  //         },
  //       },
  //       {
  //         element: '#b-hapus',
  //         popover: {
  //           title: 'Hapus Jadwal',
  //           description: `Klik untuk menghapus jadwal`,
  //         },
  //       },
  //       {
  //         element: '.b-excel',
  //         popover: {
  //           title: 'Export Excel',
  //           description: `Klik untuk mengexport excel`,
  //         },
  //       },
  //     ],
  //   });

  //   driverObj.drive();
  // };

  const handleClickTutorial = () => {
    const steps = [
      {
        element: ".p-grup",
        popover: {
          title: "Grup",
          description: "Pilih grup yang diinginkan",
        },
      },
      {
        element: ".p-semua",
        popover: {
          title: "Semua Grup",
          description: "Pilih semua grup yang diinginkan",
        },
      },
      {
        element: ".p-tanggal",
        popover: {
          title: "Pilih Tanggal",
          description: "Pilih tanggal yang diinginkan",
        },
      },
      {
        element: ".b-jadwal",
        popover: {
          title: "Buat Jadwal",
          description: "Klik untuk membuat jadwal",
        },
      },
    ];

    const isElementVisible = (selector: any) => {
      const element = document.querySelector(selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      return false;
    };

    if (isElementVisible("#b-ubah")) {
      steps.push({
        element: "#b-ubah",
        popover: {
          title: "Ubah Jadwal",
          description: "Klik untuk mengubah jadwal",
        },
      });
    }

    if (isElementVisible("#b-hapus")) {
      steps.push({
        element: "#b-hapus",
        popover: {
          title: "Hapus Jadwal",
          description: "Klik untuk menghapus jadwal",
        },
      });
    }

    steps.push({
      element: ".b-excel",
      popover: {
        title: "Export Excel",
        description: "Klik untuk mengexport excel",
      },
    });

    const driverObj = driver({
      showProgress: true,
      steps: steps,
    });

    driverObj.drive();
  };

  const modalContainerRef = useRef<HTMLDivElement>(null);
  //useEffect untuk menambahkan event listener  ke elemen dokumen
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        handleCloseFilter();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleCloseFilter]);

  useEffect(() => {
    const days = DaysInMonth({ year, month });
    // Menggunakan metode .slice() untuk memilih rentang tanggal yang dipilih
    const selectedDays = days.slice(startDate - 1, endDate);
    console.log(selectedDays, "days");
    // startDate - 1 karena indeks dimulai dari 0
    setTanggal(selectedDays);
    setEndDate(startDate + 6);
  }, [year, month, startDate, endDate]);
  console.log(
    "tanggal",
    tanggal.map((a) => a)
  );

  const handleDateChange = (date: any) => {
    const dateValue = date;
    setSelectedDate(dayjs(dateValue));

    // Mendapatkan tanggal, bulan, dan tahun dari tanggal yang dipilih
    const selectedDateObj = new Date(dateValue);

    const selectDate = selectedDateObj.getDate();
    const selectedYear = selectedDateObj.getFullYear();
    const selectedMonth = selectedDateObj.getMonth();

    // Mengupdate state tahun dan bulan
    setStartDate(selectDate);
    setYear(selectedYear);
    setMonth(selectedMonth + 1);
  };

  const [dataPetugasShift, setDataPetugasShift] = useState([]);
  const [dataDetailPetugasShift, setDataDetailPetugasShift] = useState();
  const handleOpenAddModal = (data: any) => {
    console.log("data1", data);

    setModalAddOpen(!modalAddOpen);
    setDataPetugasShift(data);
  };
  const handleOpenDetailModal = (data: any) => {
    setDataDetailPetugasShift(data);
    setModalDetailOpen(!modalDetailOpen);
  };
  const handleCloseModal = () => {
    setModalDetailOpen(false);
    setModalAddPegawaiShift(false);
    setModalAddScheduleOpen(false);
    setModalAddOpen(false);
    setModalDelete(false);
    setModalDeleteSchedule(false);
  };
  //pegawai edit
  const [dataPegawaiShift, setDataPegawaiShift] = useState();
  const handleopenPegawaiShift = (item: any) => {
    setModalAddPegawaiShift(true);
    setDataPegawaiShift(item);
  };

  //filter
  const grupPetugasOption = [
    { value: "1", label: "Semua Grup" },
    ...grupPetugas.map((item: any) => ({
      value: item.grup_petugas_id,
      label: item.nama_grup_petugas,
    })),
  ];
  const PetugasOption = [
    { value: "1", label: "Semua Pegawai" },
    ...staffFilter.map((item: any) => ({
      value: item.petugas_id,
      label: item.nama,
    })),
  ];

  const selectFilter = [
    {
      value: "1",
      label: "Grup",
    },
    {
      value: "2",
      label: "Pegawai",
    },
  ];

  const handleChangeSelectFilter = (e: any) => {
    if (e.value === "2") {
      setOpenGrup(true);
    } else {
      setOpenGrup(false);
    }
  };
  const handleFilterPegawai = (e: any) => {
    const filter = staffFilter.filter(
      (item: any) => item.petugas_id === e.value
    );
    if (e.value === "1") {
      setStaff(staffFilter);
    } else {
      setStaff(filter);
    }
  };

  const handleFilterGrup = (e: any) => {
    // console.log(e.label, 'label');
    console.log(e.value, "value");
    // console.log(grup, 'grup dalem fun');
    // const filter = grup?.filter((data) => data.grup_petugas_id == '');
    // if (e.value == '1') {
    //   set;
    // }
    setSelectedFilterGrup(e.value);
  };

  useEffect(() => {
    if (selectedFilterGrup == "1") {
      const grup = grupPetugas?.filter((item: any) =>
        staff.map(
          (staffItem) => staffItem.grup_petugas_id === item.grup_petugas_id
        )
      );
      setFilteredGrup(grup);
    } else {
      const grup = grupPetugas
        ?.filter((item: any) =>
          staff.map(
            (staffItem) => staffItem.grup_petugas_id === item.grup_petugas_id
          )
        )
        .filter((data) => data.grup_petugas_id == selectedFilterGrup);
      setFilteredGrup(grup);
    }
  }, [selectedFilterGrup, grupPetugas, staff]);

  console.log(filteredGrup, "filteredGrup");
  //Schedule Create
  const [modalAddScheduleOpen, setModalAddScheduleOpen] = useState(false);
  const handleSubmitSchedule = async (data: any) => {
    let alertShown = false;
    try {
      const promises = data.map(async (singleData: any) => {
        const AddDataSchedule = await apiCreateScheduleShift(singleData, token);
        if (AddDataSchedule.data.status === "OK") {
          if (!alertShown) {
            Alerts.fire({
              icon: "success",
              title: "Berhasil menambah data",
            });
            alertShown = true; // Set alertShown menjadi true
            setModalAddScheduleOpen(false);
            setTimeout(() => {
              setLoadSchedule(!loadSchedule);
            }, 1000);
          }
        } else if (AddDataSchedule.data.status === "NO") {
          Alerts.fire({
            icon: "error",
            title: "Data Sudah Tersedia",
          });
        } else {
          Alerts.fire({
            icon: "error",
            title: AddDataSchedule.data.message,
          });
        }
      });

      await Promise.all(promises);
      fetchData();
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

  //add petugasShiftGrup
  // const handleAddPetugasShift = async (data: any) => {
  //   let alertShown = false;
  //   try {
  //     const promises = data.map(async (singleData: any) => {
  //       const addPetugasShift = await apiCretePetugasShift(singleData, token);
  //       console.log('single data', singleData);
  //       if (addPetugasShift.data.status === 'OK') {
  //         if (!alertShown) {
  //           alertShown = true; // Set alertShown menjadi true
  //           Alerts.fire({
  //             icon: 'success',
  //             title: 'Berhasil menambah data',
  //           });
  //           setModalAddOpen(!modalAddOpen);
  //           setTimeout(() => {
  //             setLoadSchedule(!loadSchedule);
  //           }, 500);
  //         }
  //       }
  //     });

  //     await Promise.all(promises);
  //     fetchData();
  //   } catch (e: any) {
  //     if (e.response.status === 403) {
  //       navigate('/', {
  //         state: { forceLogout: true, lastPage: location.pathname },
  //       });
  //     }
  //     Alerts.fire({
  //       icon: e.response.status === 403 ? 'warning' : 'error',
  //       title: e.response.status === 403 ? Error403Message : e.message,
  //     });
  //   }
  // };
  const handleAddPetugasShift = async (data: any) => {
    try {
      const response = await apiCretePetugasShift(data, token);
      if (response.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        setModalAddOpen(!modalAddOpen);
        setTimeout(() => {
          setLoadSchedule(!loadSchedule);
        }, 500);
      }
      fetchData();
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

  //Edit Petugas ShiftGrup
  // const handleEditPetugasShiftGrup = async (data: any) => {
  //   let alertShown = false;
  //   try {
  //     for (let i = 0; i < data.length; i++) {
  //       const singleData = data[i];
  //       const addPetugasShift = await apiEditPetugasShift(singleData, token);
  //       if (addPetugasShift.data.status === 'OK') {
  //         if (!alertShown) {
  //           Alerts.fire({
  //             icon: 'success',
  //             title: 'Berhasil mengubah data',
  //           });
  //           alertShown = true; // Set alertShown menjadi true
  //           handleCloseModal();
  //           setTimeout(() => {
  //             setLoadSchedule(!loadSchedule);
  //           }, 1000);
  //         }
  //       }
  //     }
  //   } catch (e: any) {
  //     if (e.response.status === 403) {
  //       navigate('/', {
  //         state: { forceLogout: true, lastPage: location.pathname },
  //       });
  //     }
  //     Alerts.fire({
  //       icon: e.response.status === 403 ? 'warning' : 'error',
  //       title: e.response.status === 403 ? Error403Message : e.message,
  //     });
  //   }
  // };

  const handleEditPetugasShiftGrup = async (data) => {
    try {
      const addPetugasShift = await apiEditPetugasShift(
        { petugas_shifts: data.petugas_shifts },
        token
      );
      if (addPetugasShift.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil mengubah data",
        });
        handleCloseModal();
        setTimeout(() => {
          setLoadSchedule(!loadSchedule);
        }, 1000);
      }
    } catch (e) {
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

  const handleEditPetugasShift = async (data: any) => {
    try {
      const addPetugasShift = await apiEditPetugasShift(data, token);
      if (addPetugasShift.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil mengubah data",
        });
        handleCloseModal();
        setTimeout(() => {
          setLoadSchedule(!loadSchedule);
        }, 500);
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

  //delete
  //Schedule Delete
  const [dataDeleteSchedule, setDataDeleteSchedule] = useState();
  const handleOpenDeleteSchedule = (item: any) => {
    setModalDeleteSchedule(true);
    setDataDeleteSchedule(item);
  };
  const handleDeleteSchedule = async (data: any) => {
    let alertShown = false;
    try {
      const deletePetugasShift = await apiDeleteScheduleShift(data, token);
      if (deletePetugasShift.data.status === "OK") {
        if (!alertShown) {
          Alerts.fire({
            icon: "success",
            title: "Berhasil menghapus data",
          });
          alertShown = true; // Set alertShown menjadi true
          setTimeout(() => {
            setLoadSchedule(!loadSchedule);
          }, 1000);
          handleCloseModal();
        }
      }
      fetchData();
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

  //Petugas Shift Delete
  const [hapusPetugasShift, setHapusPetugasShift] = useState(false);
  const [dataDelete, setDataDelete] = useState();
  const handleHapusPetugasShift = () => {
    setHapusPetugasShift(!hapusPetugasShift);
  };

  const handleOpenModalDelete = (item: any) => {
    setModalDelete(true);
    setDataDelete(item);
  };

  const handleDeletePetugasShiftGrup = async (data: any) => {
    let alertShown = false;
    try {
      const promises = data.map(async (singleData: any) => {
        const deletePetugasShift = await apiDeletePetugasShift(
          singleData,
          token
        );
        if (deletePetugasShift.data.status === "OK") {
          if (!alertShown) {
            Alerts.fire({
              icon: "success",
              title: "Berhasil menghapus data",
            });
            alertShown = true;
          }
          handleCloseModal();
          setTimeout(() => {
            setLoadSchedule(!loadSchedule);
          }, 500);
        }
      });

      await Promise.all(promises);
      fetchData();
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

  const [hari, setHari] = useState<{ hari: string; tanggal: string }[]>([]);
  //export Excel
  useEffect(() => {
    const tanggal = () => {
      const startDate = dayjs(`${selectedDate}`).startOf("month");
      const endDate = dayjs(`${selectedDate}`).endOf("month");
      const updatedHari = [];

      let currentDate = startDate;
      while (
        currentDate.isBefore(endDate) ||
        currentDate.isSame(endDate, "day")
      ) {
        const formattedDate = currentDate.format("D");
        const dayOfWeek = dayjs(currentDate, {
          locale: "id",
        }).format("dddd");

        updatedHari.push({ hari: dayOfWeek, tanggal: formattedDate });
        currentDate = currentDate.add(1, "day");
      }
      setHari(updatedHari);
    };
    tanggal();
  }, [selectedDate]);
  function exportToExcel() {
    const dataToExport = [
      ["Nama", ...hari.map((item: any) => [item.tanggal])],
      ["", ...hari.map((item: any) => [item.hari])],
      ...staff.map((item: any) => [
        item.nama,
        ...hari.map((itemtgl: any) => {
          // Mencari petugasShift yang sesuai dengan tanggal dan petugas_id
          const petugas = dataExcel.filter(
            (data: any) => data.petugas_id === item.petugas_id
          );
          const petugasShiftItem = petugas.find(
            (itemoo) => itemoo.tanggal === itemtgl.tanggal
          );

          // Jika ditemukan, mengambil nama_shift, jika tidak, mengembalikan string kosong
          if (petugasShiftItem) {
            return petugasShiftItem.nama_shift;
          } else {
            return "";
          }
        }),
      ]),
    ];

    const ws = xlsx.utils.aoa_to_sheet(dataToExport);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(
      wb,
      `ScheduleShift${dayjs(selectedDate).format("DDMMYYYY-HHmmss")}.xlsx`
    );
  }

  //react Select
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: "14px",
      color: "white",
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      fontSize: "14px",
      color: "white",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      fontSize: "14px",
      backgroundColor: "rgb(30 41 59)",
      borderColor: "rgb(30 41 59)",
      color: "white",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 3,
      paddingRight: 4.5,
      borderRadius: 5,

      "&:hover": {
        borderColor: "rgb(30 41 59)",
      },
      "&:active": {
        borderColor: "rgb(30 41 59)",
      },
      "&:focus": {
        borderColor: "rgb(30 41 59)",
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided: any) => ({
      ...provided,
      color: "white",
      paddingLeft: "5px",
      paddingRight: "5px",
      backgroundColor: "rgb(30 41 59)",
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        borderRadius: "6px",

        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? ""
          : isFocused
          ? "rgb(51, 133, 255)"
          : undefined,

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled,
        },
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "rgb(51, 133, 255)",
      };
    },
  };
  const timeString = (startTime: string, endTime: string): string => {
    return `${startTime.split(":").slice(0, 2).join(":")} - ${endTime
      .split(":")
      .slice(0, 2)
      .join(":")}`;
  };
  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="pb-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      {/* Grup */}
      {modalAddOpen && (
        <AddPetugasShiftGrup
          onSubmit={handleAddPetugasShift}
          closeModal={handleCloseModal}
          defaultValue={dataPetugasShift}
        />
      )}
      {/*Edit pegawai Shift*/}
      {modalAddPegawaiShift && (
        <EditPegawaiPetugasShift
          onSubmit={handleEditPetugasShift}
          closeModal={handleCloseModal}
          defaultValue={dataPegawaiShift}
        />
      )}
      {modalDetailOpen && (
        <EditPetugasShift
          onSubmit={handleEditPetugasShiftGrup}
          closeModal={handleCloseModal}
          defaultValue={dataDetailPetugasShift}
        />
      )}
      {/* add schedule */}
      {modalAddScheduleOpen && (
        <AddDataSchedule
          closeModal={handleCloseModal}
          onSubmit={handleSubmitSchedule}
        />
      )}
      {/* delete petugas shift grup */}
      {Modaldelete && (
        <DeletePetugasShift
          onSubmit={handleDeletePetugasShiftGrup}
          closeModal={handleCloseModal}
          defaultValue={dataDelete}
        />
      )}
      {/* delete schedule */}
      {modalDeleteSchedule && (
        <DeleteSchedule
          onSubmit={handleDeleteSchedule}
          closeModal={handleCloseModal}
          defaultValue={dataDeleteSchedule}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl w-2/5">Kalender Jadwal Shift Kerja</h1>

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

      <div className="flex h-8 items-center mt-2">
        <div className="flex space-x-2 w-1/2 items-center">
          <h1>Filter : </h1>
          <div className="w-1/3">
            <Select
              className="text-black p-grup"
              styles={customStyles}
              onChange={handleChangeSelectFilter}
              options={selectFilter}
              defaultValue={selectFilter[0]}
            />
          </div>
          <div className={` ${openGrup ? "hidden" : "w-1/3"}`}>
            <Select
              className="text-black capitalize p-semua"
              // isDisabled
              styles={customStyles}
              options={grupPetugasOption}
              defaultValue={grupPetugasOption[0]}
              // value={{ value: '1', label: 'Semua Grup' }}
              onChange={handleFilterGrup}
            />
          </div>
          <div className={` ${!openGrup ? "hidden" : "w-1/3"}`}>
            <Select
              className="text-black capitalize"
              styles={customStyles}
              onChange={handleFilterPegawai}
              options={PetugasOption}
              defaultValue={PetugasOption[0]}
            />
          </div>
        </div>
        <div className="space-x-2 flex w-1/2 justify-end items-center">
          <div className="flex space-x-2">
            <label htmlFor="tanggal">Pilih Tanggal :</label>
            <div className="">
              <DatePicker
                className="rounded text-black text-center w-36 p-tanggal"
                selected={selectedDate.toDate()}
                onChange={handleDateChange}
                dateFormat="dd MMMM yyyy"
                placeholderText="Pilih tanggal"
                locale="id"
              />
            </div>
          </div>
          {!isOperator && (
            <>
              <button
                className="bg-blue-500 text-white px-2 rounded-sm text-sm py-1 b-jadwal"
                onClick={() => setModalAddScheduleOpen(true)}
              >
                Buat Jadwal
              </button>
              <button
                onClick={handleHapusPetugasShift}
                className={`${
                  hapusPetugasShift ? "block" : "hidden"
                } bg-blue-500 text-white p-1 rounded-sm space-x-2 text-sm flex items-center`}
                id="b-ubah"
              >
                Ubah Jadwal
              </button>
              <button
                onClick={handleHapusPetugasShift}
                className={`${
                  !hapusPetugasShift ? "block" : "hidden"
                } bg-red-500 text-white p-1 rounded-sm space-x-2 text-sm flex items-center`}
                id="b-hapus"
              >
                Hapus Jadwal
              </button>
            </>
          )}
          <button
            className="bg-blue-500 text-white px-2 rounded-sm text-sm py-1 b-excel"
            onClick={() => exportToExcel()}
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex w-full">
          <div className="w-1/6 bg-slate-600 flex justify-between mr-1">
            <h2
              className={`${
                !openGrup ? "" : "hidden"
              } pl-3 flex items-center h-full`}
            >
              Nama Grup
            </h2>
            <h2
              className={`${
                openGrup ? "" : "hidden"
              } pl-3 flex items-center h-full`}
            >
              Nama Pegawai
            </h2>
          </div>
          <div className="w-4/6">
            <div className="flex space-x-1">
              {tanggal.map((item: any, index) => {
                const backgroundColor =
                  index % 2 === 0 ? "bg-slate-500" : "bg-slate-600";
                const dayOfWeek = getDayOfWeek(year, month - 1, item);
                return (
                  <div
                    key={index}
                    className={`w-full xl:flex items-center justify-center ${backgroundColor}`}
                  >
                    <h3 className={`flex justify-center font-bold text-2xl`}>
                      {item}
                    </h3>
                    <h3 className="font-semibold ml-2 flex justify-center sm:text-xs xl:text-sm">
                      {dayOfWeek}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/6 bg-slate-500 ml-1">
            <h2 className="flex justify-center h-full items-center w-full">
              Keterangan
            </h2>
          </div>
        </div>
        {isLoading ? (
          <div className={`justify-center flex items-center h-80`}>
            <svg
              className="animate-spin h-20 w-20 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            {filteredGrup?.map((itemNama: any) => {
              const jadwal = petugasShift.filter(
                (itemJadwal: any) =>
                  itemJadwal.grup_petugas_id === itemNama.grup_petugas_id
              );
              const jumlahIzin = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Izin"
              ).length;
              const jumlahSakit = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Sakit"
              ).length;
              const jumlahAbsen = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Absen"
              ).length;
              const jumlahCuti = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Cuti"
              ).length;
              return (
                <div className={`flex my-1 ${!openGrup ? "" : "hidden"}`}>
                  <div className="w-1/6 bg-slate-600 mr-1">
                    <h2 className=" pl-3 flex items-center h-full">
                      {itemNama.nama_grup_petugas}
                    </h2>
                  </div>
                  <div className="w-4/6">
                    <div className="flex space-x-1">
                      {tanggal.map((item: any, index) => {
                        console.log(item, "item nihh");
                        const backgroundColor =
                          index % 2 === 0 ? "bg-slate-500" : "bg-slate-600";
                        const backgroundColorHover =
                          index % 2 === 0 ? "bg-slate-300" : "bg-slate-300";

                        // Cari shift sesuai dengan tanggal
                        //Apii
                        const jadwal = petugasShift.filter(
                          (itemJadwal: any) =>
                            itemJadwal.grup_petugas_id ===
                            itemNama.grup_petugas_id
                        );
                        const jadwalPegawai = jadwal.find(
                          (itemJadwal: any) =>
                            parseInt(itemJadwal.tanggal) === item
                        );
                        console.log(jadwalPegawai, "kkk");
                        //Schedule
                        const scheduleShift = schedule.find(
                          (schedule: any) => parseInt(schedule.tanggal) === item
                        );

                        console.log(scheduleShift, "jadwal pegawai 1");

                        console.log(item, "item nihh");
                        const dataAdd = {
                          grup_petugas_id: itemNama.grup_petugas_id,
                          nama_grup_petugas: itemNama.nama_grup_petugas,
                          ketua_grup_id: itemNama.ketua_grup_id,
                          nama_ketua_grup: itemNama.nama_ketua_grup,
                          schedule_id: scheduleShift?.schedule_id,
                          nama_shift: scheduleShift?.nama_shift,
                          shift_id: scheduleShift?.shift_id,
                          tanggal: scheduleShift?.tanggal,
                          bulan: scheduleShift?.bulan,
                          tahun: scheduleShift?.tahun,
                        };
                        const dataEdit = {
                          grup_petugas_id: itemNama.grup_petugas_id,
                          nama_grup_petugas: itemNama.nama_grup_petugas,
                          ketua_grup_id: itemNama.ketua_grup_id,
                          nama_ketua_grup: itemNama.nama_ketua_grup,
                          schedule_id: jadwalPegawai?.schedule_id,
                          nama_shift: jadwalPegawai?.nama_shift,
                          shift_id: jadwalPegawai?.shift_id,
                          tanggal: jadwalPegawai?.tanggal,
                          bulan: jadwalPegawai?.bulan,
                          tahun: jadwalPegawai?.tahun,
                          waktu_mulai: jadwalPegawai?.waktu_mulai,
                          waktu_selesai: jadwalPegawai?.waktu_selesai,
                        };
                        let jam = "";
                        let shiftBackgroundColor = "";
                        let shiftBgList = "";

                        console.log(shift, "testing");
                        if (jadwalPegawai) {
                          if (
                            jadwalPegawai.shift_id ===
                            "c5e99fed-d404-4c3e-a96b-9cfde0e341f5"
                          ) {
                            shiftBackgroundColor = "bg-yellow-300";
                            shiftBgList = "bg-yellow-500";
                            jam = timeString(
                              jadwalPegawai.waktu_mulai,
                              jadwalPegawai.waktu_selesai
                            );
                          } else if (
                            jadwalPegawai.shift_id ===
                            "c6e99fed-d404-4c3e-a96b-9cfde0e341f7"
                          ) {
                            shiftBackgroundColor = "bg-orange-500";
                            shiftBgList = "bg-orange-700";
                            jam = timeString(
                              jadwalPegawai.waktu_mulai,
                              jadwalPegawai.waktu_selesai
                            );
                          } else if (
                            jadwalPegawai.shift_id ===
                            "c7e99fed-d404-4c3e-a96b-9cfde0e341f8"
                          ) {
                            shiftBackgroundColor = "bg-blue-500";
                            shiftBgList = "bg-blue-700";
                            jam = timeString(
                              jadwalPegawai.waktu_mulai,
                              jadwalPegawai.waktu_selesai
                            );
                          }
                          // else if(jadwalPegawai.shift_id != "i20q8t3b-wy0j-9u0v-b6zl-zpgejzjjvq7s" || jadwalPegawai.shift_id != "4bb362e5-f9ac-4cdd-ae48-27e6ce348136" || jadwalPegawai.shift_id != "4bb362e5-f9ac-4cdd-ae48-27e6ce348136"){
                          //   shiftBackgroundColor = 'bg-orange-500';
                          //   shiftBgList = 'bg-orange-700';
                          //   jam = timeString(jadwalPegawai.waktu_mulai, jadwalPegawai.waktu_selesai);
                          // }
                          else {
                            shiftBackgroundColor = "bg-orange-500";
                            shiftBgList = "bg-orange-700";
                            jam = timeString(
                              jadwalPegawai.waktu_mulai,
                              jadwalPegawai.waktu_selesai
                            );
                          }
                        }
                        return (
                          <>
                            {jadwalPegawai ? (
                              <>
                                {hapusPetugasShift ? (
                                  <button
                                    onClick={() =>
                                      handleOpenModalDelete(dataEdit)
                                    }
                                    key={index}
                                    className={`${shiftBackgroundColor} w-full flex justify-center items-center h-16`}
                                  >
                                    <BsTrash className="w-5 text-black h-5" />
                                  </button>
                                ) : (
                                  <button
                                    key={index}
                                    className={`w-full flex justify-center ${shiftBackgroundColor} h-16`}
                                    onClick={() =>
                                      handleOpenDetailModal(dataEdit)
                                    }
                                  >
                                    <div className="text-black">
                                      <div
                                        className={`h-2 w-full ${shiftBgList}`}
                                      ></div>
                                      <h3 className="sm:hidden xl:block text-sm font-semibold ml-1">
                                        {jam}
                                      </h3>
                                      <h3
                                        className={`flex items-center font-bold text-sm ml-1`}
                                      >
                                        {jadwalPegawai.nama_shift}
                                      </h3>
                                    </div>
                                  </button>
                                )}
                              </>
                            ) : (
                              <div
                                key={index}
                                className={`w-full flex justify-center items-center ${backgroundColor} hover:${backgroundColorHover} h-16`}
                              >
                                {scheduleShift ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleOpenDeleteSchedule(dataAdd)
                                      }
                                      className={`${
                                        hapusPetugasShift ? "block" : "hidden"
                                      } text-white h-5 w-5 hover:${backgroundColorHover} rounded flex items-center justify-center`}
                                    >
                                      <BsTrash className="w-full h-full" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleOpenAddModal(dataAdd)
                                      }
                                      className={`${
                                        !hapusPetugasShift ? "block" : "hidden"
                                      } text-white max-w-xs h-full w-auto  rounded flex flex-col items-center justify-center pt-2`}
                                    >
                                      <BsPlusSquareDotted className="h-[40%] w-[40%] mb-2" />
                                      <span className="text-xs">
                                        Tambah Shift
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <h1 className="flex text-xs text-center justify-center items-center text-white w-full h-full bg-red-600">
                                    Jadwal Belum Dibuat
                                  </h1>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-1/6 bg-slate-500 ml-1 ">
                    <div className="flex items-center">
                      {jumlahIzin ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Izin : {jumlahIzin}
                        </h1>
                      ) : (
                        <></>
                      )}
                      {jumlahSakit ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Sakit : {jumlahSakit}
                        </h1>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex items-center">
                      {jumlahCuti ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Cuti : {jumlahCuti}
                        </h1>
                      ) : (
                        <></>
                      )}
                      {jumlahAbsen ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Absen : {jumlahAbsen}
                        </h1>
                      ) : (
                        <></>
                      )}
                    </div>
                    <h2 className="flex justify-center h-full items-center w-full"></h2>
                  </div>
                </div>
              );
            })}
            {/* {filteredGrup?.map((itemNama: any) => {
              const jadwal = petugasShift.filter(
                (itemJadwal: any) =>
                  itemJadwal.grup_petugas_id === itemNama.grup_petugas_id,
              );
              const jumlahIzin = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === 'Izin',
              ).length;
              const jumlahSakit = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === 'Sakit',
              ).length;
              const jumlahAbsen = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === 'Absen',
              ).length;
              const jumlahCuti = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === 'Cuti',
              ).length;

              return (
                <div
                  className={`flex my-1 ${!openGrup ? '' : 'hidden'}`}
                  key={itemNama.grup_petugas_id}
                >
                  <div className="w-1/6 bg-slate-600 mr-1">
                    <h2 className="pl-3 flex items-center h-full">
                      {itemNama.nama_grup_petugas}
                    </h2>
                  </div>
                  <div className="w-4/6">
                    <div className="flex space-x-1">
                      {tanggal.map((item: any, index) => {
                        const backgroundColor =
                          index % 2 === 0 ? 'bg-slate-500' : 'bg-slate-600';
                        const backgroundColorHover =
                          index % 2 === 0 ? 'bg-slate-300' : 'bg-slate-300';

                        // Filter jadwal yang sesuai dengan tanggal
                        const jadwalPadaTanggal = jadwal.filter(
                          (itemJadwal: any) =>
                            parseInt(itemJadwal.tanggal) === item,
                        );

                        // Filter schedule yang sesuai dengan tanggal
                        const scheduleShifts = schedule.filter(
                          (schedule: any) =>
                            parseInt(schedule.tanggal) === item,
                        );

                        // Ambil shift_id dari jadwal
                        const shiftIds = scheduleShifts.map(
                          (s: any) => s.shift_id,
                        );

                        // Generate data untuk add/edit
                        const dataAdd = {
                          grup_petugas_id: itemNama.grup_petugas_id,
                          nama_grup_petugas: itemNama.nama_grup_petugas,
                          ketua_grup_id: itemNama.ketua_grup_id,
                          nama_ketua_grup: itemNama.nama_ketua_grup,
                          tanggal: item,
                          bulan: new Date().getMonth() + 1, // Contoh saja, sesuaikan dengan data Anda
                          tahun: new Date().getFullYear(), // Contoh saja, sesuaikan dengan data Anda
                          shift_ids: shiftIds,
                        };

                        const dataEdit = (jadwalPegawai: any) => ({
                          grup_petugas_id: itemNama.grup_petugas_id,
                          nama_grup_petugas: itemNama.nama_grup_petugas,
                          ketua_grup_id: itemNama.ketua_grup_id,
                          nama_ketua_grup: itemNama.nama_ketua_grup,
                          schedule_id: jadwalPegawai.schedule_id,
                          nama_shift: jadwalPegawai.nama_shift,
                          shift_id: jadwalPegawai.shift_id,
                          tanggal: jadwalPegawai.tanggal,
                          bulan: jadwalPegawai.bulan,
                          tahun: jadwalPegawai.tahun,
                          waktu_mulai: jadwalPegawai.waktu_mulai,
                          waktu_selesai: jadwalPegawai.waktu_selesai,
                        });

                        return (
                          <div
                            key={index}
                            className={`w-full flex flex-col items-center ${backgroundColor} hover:${backgroundColorHover} h-auto`}
                          >
                            {jadwalPadaTanggal.length > 0 ? (
                              jadwalPadaTanggal.map(
                                (jadwalPegawai: any, idx: number) => {
                                  let jam = '';
                                  let shiftBackgroundColor = '';
                                  let shiftBgList = '';

                                  if (
                                    jadwalPegawai.shift_id ===
                                    'c5e99fed-d404-4c3e-a96b-9cfde0e341f5'
                                  ) {
                                    shiftBackgroundColor = 'bg-yellow-300';
                                    shiftBgList = 'bg-yellow-500';
                                    jam = timeString(
                                      jadwalPegawai.waktu_mulai,
                                      jadwalPegawai.waktu_selesai,
                                    );
                                  } else if (
                                    jadwalPegawai.shift_id ===
                                    'c6e99fed-d404-4c3e-a96b-9cfde0e341f7'
                                  ) {
                                    shiftBackgroundColor = 'bg-orange-500';
                                    shiftBgList = 'bg-orange-700';
                                    jam = timeString(
                                      jadwalPegawai.waktu_mulai,
                                      jadwalPegawai.waktu_selesai,
                                    );
                                  } else if (
                                    jadwalPegawai.shift_id ===
                                    'c7e99fed-d404-4c3e-a96b-9cfde0e341f8'
                                  ) {
                                    shiftBackgroundColor = 'bg-blue-500';
                                    shiftBgList = 'bg-blue-700';
                                    jam = timeString(
                                      jadwalPegawai.waktu_mulai,
                                      jadwalPegawai.waktu_selesai,
                                    );
                                  } else {
                                    shiftBackgroundColor = 'bg-orange-500';
                                    shiftBgList = 'bg-orange-700';
                                    jam = timeString(
                                      jadwalPegawai.waktu_mulai,
                                      jadwalPegawai.waktu_selesai,
                                    );
                                  }

                                  return (
                                    <div
                                      key={idx}
                                      className={`w-full flex ${shiftBackgroundColor} h-16 items-center justify-center`}
                                    >
                                      {hapusPetugasShift ? (
                                        <button
                                          onClick={() =>
                                            handleOpenModalDelete(
                                              dataEdit(jadwalPegawai),
                                            )
                                          }
                                          className={`${shiftBackgroundColor} w-full flex justify-center items-center h-16`}
                                        >
                                          <BsTrash className="w-5 text-black h-5" />
                                        </button>
                                      ) : (
                                        <button
                                          className={`w-full flex justify-center ${shiftBackgroundColor} h-16`}
                                          onClick={() =>
                                            handleOpenDetailModal(
                                              dataEdit(jadwalPegawai),
                                            )
                                          }
                                        >
                                          <div className="text-black">
                                            <div
                                              className={`h-2 w-full ${shiftBgList}`}
                                            ></div>
                                            <h3 className="sm:hidden xl:block text-sm font-semibold ml-1">
                                              {jam}
                                            </h3>
                                            <h3
                                              className={`flex items-center font-bold text-sm ml-1`}
                                            >
                                              {jadwalPegawai.nama_shift}
                                            </h3>
                                          </div>
                                        </button>
                                      )}
                                    </div>
                                  );
                                },
                              )
                            ) : (
                              <div
                                className={`w-full flex justify-center items-center h-16`}
                              >
                                {scheduleShifts.length > 0 ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleOpenDeleteSchedule(dataAdd)
                                      }
                                      className={`${
                                        hapusPetugasShift ? 'block' : 'hidden'
                                      } text-white h-5 w-5 hover:${backgroundColorHover} rounded flex items-center justify-center`}
                                    >
                                      <BsTrash className="w-full h-full" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleOpenAddModal(dataAdd)
                                      }
                                      className={`${
                                        !hapusPetugasShift ? 'block' : 'hidden'
                                      } text-white max-w-xs h-full w-auto  rounded flex flex-col items-center justify-center pt-2`}
                                    >
                                      <BsPlusSquareDotted className="h-[40%] w-[40%] mb-2" />
                                      <span className="text-xs">
                                        Tambah Shift
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <h1 className="flex text-xs text-center justify-center items-center text-white w-full h-full bg-red-600">
                                    Jadwal Belum Dibuat
                                  </h1>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-1/6 bg-slate-500 ml-1">
                    <div className="flex items-center">
                      {jumlahIzin ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Izin : {jumlahIzin}
                        </h1>
                      ) : (
                        <></>
                      )}
                      {jumlahSakit ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Sakit : {jumlahSakit}
                        </h1>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex items-center">
                      {jumlahCuti ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Cuti : {jumlahCuti}
                        </h1>
                      ) : (
                        <></>
                      )}
                      {jumlahAbsen ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Absen : {jumlahAbsen}
                        </h1>
                      ) : (
                        <></>
                      )}
                    </div>
                    <h2 className="flex justify-center h-full items-center w-full"></h2>
                  </div>
                </div>
              );
            })} */}
            {staff.map((itemNama: any) => {
              const jadwal = petugasShift.filter(
                (itemJadwal: any) =>
                  itemJadwal.petugas_id === itemNama.petugas_id
              );

              const jumlahIzin = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Izin"
              ).length;
              const jumlahSakit = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Sakit"
              ).length;
              const jumlahAbsen = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Absen"
              ).length;
              const jumlahCuti = jadwal?.filter(
                (pegawai: any) => pegawai.status_izin === "Cuti"
              ).length;
              return (
                <div className={`flex my-1 ${openGrup ? "" : "hidden"}`}>
                  <div className="w-1/6 bg-slate-600 mr-1">
                    <h2 className=" pl-3 flex items-center h-full">
                      {itemNama.nama}{" "}
                      {itemNama.nama_grup_petugas
                        ? `(${itemNama.nama_grup_petugas})`
                        : null}
                    </h2>
                  </div>
                  <div className="w-4/6">
                    <div className="flex space-x-1">
                      {tanggal.map((item: any, index) => {
                        const backgroundColor =
                          index % 2 === 0 ? "bg-slate-500" : "bg-slate-600";

                        // Cari shift sesuai dengan tanggal
                        //Apii
                        const jadwal = petugasShift.filter(
                          (itemJadwal: any) =>
                            itemJadwal.petugas_id === itemNama.petugas_id
                        );

                        const jadwalPegawai = jadwal.find(
                          (itemJadwal: any) =>
                            parseInt(itemJadwal.tanggal) === item
                        );
                        //Schedule
                        const scheduleShift = schedule.find(
                          (schedule: any) => parseInt(schedule.tanggal) === item
                        );

                        const statuIzin = jadwalPegawai?.status_izin;

                        let jam = "";
                        let shiftBackgroundColor = "";
                        let shiftBgList = "";
                        if (jadwalPegawai) {
                          switch (jadwalPegawai.nama_shift) {
                            case shift[0].nama_shift:
                              shiftBackgroundColor = "bg-yellow-300";
                              shiftBgList = "bg-yellow-500";
                              jam = `${jadwalPegawai.waktu_mulai
                                .split(":")
                                .slice(0, 2)
                                .join(":")} - ${jadwalPegawai.waktu_selesai
                                .split(":")
                                .slice(0, 2)
                                .join(":")}`;
                              break;
                            case shift[1].nama_shift:
                              shiftBackgroundColor = "bg-orange-500";
                              shiftBgList = "bg-orange-700";
                              jam = `${jadwalPegawai.waktu_mulai
                                .split(":")
                                .slice(0, 2)
                                .join(":")} - ${jadwalPegawai.waktu_selesai
                                .split(":")
                                .slice(0, 2)
                                .join(":")}`;
                              break;
                            case shift[2].nama_shift:
                              shiftBackgroundColor = "bg-blue-500";
                              shiftBgList = "bg-blue-700";
                              jam = `${jadwalPegawai.waktu_mulai
                                .split(":")
                                .slice(0, 2)
                                .join(":")} - ${jadwalPegawai.waktu_selesai
                                .split(":")
                                .slice(0, 2)
                                .join(":")}`;
                              break;
                            default:
                              shiftBackgroundColor = "bg-yellow-300";
                              shiftBgList = "bg-yellow-700";
                              break;
                          }
                        }
                        return (
                          <>
                            {jadwalPegawai ? (
                              <button
                                key={index}
                                className={`w-full flex justify-center ${shiftBackgroundColor} h-16 `}
                                onClick={() =>
                                  handleopenPegawaiShift(jadwalPegawai)
                                }
                              >
                                <div className="text-black">
                                  <div
                                    className={`h-2 w-full ${shiftBgList}`}
                                  ></div>
                                  <h3 className="sm:hidden xl:block text-sm font-semibold ml-1">
                                    {jam}
                                  </h3>
                                  <h3
                                    className={`flex items-center font-bold text-sm ml-1`}
                                  >
                                    {jadwalPegawai.nama_shift}
                                  </h3>
                                  <div className="w-full flex justify-center">
                                    {statuIzin ? (
                                      <h3 className="text-xs font-semibold text-red-500 xl:w-1/2 sm:w-full bg-white rounded-lg">
                                        {jadwalPegawai.status_izin}
                                      </h3>
                                    ) : (
                                      <h3></h3>
                                    )}
                                  </div>
                                </div>
                              </button>
                            ) : (
                              <div
                                key={index}
                                className={`w-full flex justify-center items-center ${backgroundColor} h-16`}
                              >
                                {scheduleShift ? (
                                  <>
                                    <h1 className="text-gray-200	">
                                      Tidak Ada Shift
                                    </h1>
                                  </>
                                ) : (
                                  <h1 className="flex text-xs text-center justify-center items-center text-white w-full h-full bg-red-600">
                                    Jadwal Belum Dibuat
                                  </h1>
                                )}
                              </div>
                            )}
                            {/* <h3 className="font-semibold ml-2">{dayOfWeek}</h3> */}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-1/6 bg-slate-500 ml-1 ">
                    <div className="flex items-center">
                      {jumlahIzin ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Izin : {jumlahIzin}
                        </h1>
                      ) : (
                        <></>
                      )}
                      {jumlahSakit ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Sakit : {jumlahSakit}
                        </h1>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex items-center">
                      {jumlahCuti ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Cuti : {jumlahCuti}
                        </h1>
                      ) : (
                        <></>
                      )}
                      {jumlahAbsen ? (
                        <h1 className="text-black font-semibold pl-3 pt-2 sm:text-xs xl:text-sm ">
                          Absen : {jumlahAbsen}
                        </h1>
                      ) : (
                        <></>
                      )}
                    </div>
                    <h2 className="flex justify-center h-full items-center w-full"></h2>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="flex justify-end">
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1">
            <h1 className="rounded-full bg-slate-500 h-3 w-3"></h1>
            <h1 className="text-xs">Off</h1>
          </div>
          <div className="flex items-center space-x-1">
            <h1 className="rounded-full bg-red-600 h-3 w-3"></h1>
            <h1 className="text-xs">Libur</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default shiftJaga;
