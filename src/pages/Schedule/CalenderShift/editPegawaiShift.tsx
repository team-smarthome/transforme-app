import { useEffect, useRef, useState } from "react";
import {
  apiReadAllGrupPetugas,
  apiReadAllPetugasShift,
  apiReadAllStaff,
} from "../../../services/api";
import { Alerts } from "../GrupShift/Alert";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Select from "react-select";
import { BiLoaderAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface AddRoomModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
}
const EditPegawaiPetugasShift: React.FC<AddRoomModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  //get Token
  const tokenItem = localStorage.getItem("token");
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [kehadiran, setKehadiran] = useState(false);
  const [filter, setFilter] = useState("");

  //data
  const [grupPetugas, setGrupPetugas] = useState([
    {
      grup_petugas_id: "",
      nama_grup_petugas: "",
    },
  ]);
  const [staff, setStaff] = useState([
    {
      petugas_id: "",
      nama: "",
    },
  ]);
  const [dataEdit, setDataEdit] = useState({
    petugas_shift_id: defaultValue.petugas_shift_id,
    petugas_id: defaultValue.petugas_id,
    schedule_id: defaultValue.schedule_id,
    shift_id: defaultValue.shift_id,
    status_kehadiran: defaultValue.status_kehadiran,
    jam_kehadiran: defaultValue.jam_kehadiran,
    status_izin: defaultValue.status_izin,
    penugasan_id: defaultValue.penugasan_id,
    ruangan_otmil_id: defaultValue.ruangan_otmil_id,
    ruangan_lemasmil_id: defaultValue.ruangan_lemasmil_id,
    status_pengganti: defaultValue.status_pengganti,
    created_at: defaultValue.created_at,
    updated_at: dayjs(new Date()).format("DD/MM/YYYY"),
  });

  //useEffect untuk menambahkan event listener  ke elemen dokumen
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if (defaultValue.status_kehadiran == "0") {
      setKehadiran(true);
    }
  }, []);

  const [grupPetugasSelected, setGrupPetugasSelected] = useState({
    grup_petugas_id: "",
  });
  const grupPetugasOption = grupPetugas.map((item: any) => ({
    value: item.grup_petugas_id,
    label: item.nama_grup_petugas,
  }));

  const [grupPetugasDefaultValue, setGrupPetugasDefaultValue] = useState({
    value: "",
    label: "",
  });
  const StaffOptions = staff.map((item: any) => ({
    value: item.petugas_id,
    label: item.nama,
  }));

  const [staffDeafaultValue, setStaffDeafaultValue] = useState({
    value: "",
    label: "",
  });

  const onChangeGrupPetugas = (e: any) => {
    setGrupPetugasSelected({ grup_petugas_id: e.value });
  };
  useEffect(() => {
    const filter = {
      filter: {
        grup_petugas_id: grupPetugasSelected.grup_petugas_id,
      },
    };
    const filterPetugasShift = {
      filter: {
        tanggal: defaultValue.tanggal,
        bulan: defaultValue.bulan,
        tahun: defaultValue.tahun,
      },
    };

    const fecthPegawai = async () => {
      if (grupPetugasSelected.grup_petugas_id == "") {
      } else {
        try {
          const staff = await apiReadAllStaff(filter, token);
          const petugasShift = await apiReadAllPetugasShift(
            filterPetugasShift,
            token
          );

          const statusPengganti = petugasShift.data.records.map(
            (item: any) => item.status_pengganti
          );
          const availableStaff = staff.data.records.filter(
            (item: any) => !statusPengganti.includes(item.petugas_id)
          );
          setStaff(availableStaff);
        } catch (e: any) {
          if (e.response.status === 403) {
            navigate("/", {
              state: {
                forceLogout: true,
                lastPage: location.pathname,
              },
            });
          }
          Alerts.fire({
            icon: e.response.status === 403 ? "warning" : "error",
            title: e.response.status === 403 ? Error403Message : e.message,
          });
        }
      }
    };
    fecthPegawai();
  }, [grupPetugasSelected]);

  useEffect(() => {
    const filter = "";
    const fecthPegawai = async () => {
      const filter = {
        filter: {
          petugas_id: dataEdit.status_pengganti,
        },
      };
      if (
        defaultValue.status_pengganti === 0 ||
        defaultValue.status_pengganti === "" ||
        defaultValue.status_pengganti === "0"
      ) {
      } else {
        try {
          const staff = await apiReadAllStaff(filter, token);
          const staffFilter = staff.data.records.filter(
            (item: any) => item.petugas_id === dataEdit.status_pengganti
          );
          const filter2 = {
            filter: {
              grup_petugas_id: staffFilter[0]?.grup_petugas_id,
            },
          };
          const staff2 = await apiReadAllStaff(filter2, token);
          const staffValue = staff2.data.records.filter(
            (item: any) => item.petugas_id === defaultValue.status_pengganti
          );
          setStaffDeafaultValue({
            ...staffDeafaultValue,
            value: staffValue[0]?.petugas_id,
            label: staffValue[0]?.nama,
          });
          setStaff(staff2.data.records);
          setGrupPetugasDefaultValue({
            ...grupPetugasDefaultValue,
            value: staffFilter[0]?.grup_petugas_id,
            label: staffFilter[0]?.nama_grup_petugas,
          });
        } catch (e: any) {
          if (e.response.status === 403) {
            navigate("/", {
              state: {
                forceLogout: true,
                lastPage: location.pathname,
              },
            });
          }
          Alerts.fire({
            icon: e.response.status === 403 ? "warning" : "error",
            title: e.response.status === 403 ? Error403Message : e.message,
          });
        }
      }
    };
    const fecthData = async () => {
      try {
        const grupPetugas = await apiReadAllGrupPetugas(filter, token);
        const filterGrup = grupPetugas.data.records.filter(
          (item: any) => item.grup_petugas_id !== defaultValue.grup_petugas_id
        );
        setGrupPetugas(filterGrup);
      } catch (e: any) {
        if (e.response.status === 403) {
          navigate("/", {
            state: {
              forceLogout: true,
              lastPage: location.pathname,
            },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      }
    };
    fecthData();
    fecthPegawai();
  }, []);

  const handleChangeKehadiran = (e: any) => {
    if (e.target.value == "0") {
      setDataEdit({ ...dataEdit, status_kehadiran: e.target.value });
      setKehadiran(true);
    } else {
      setDataEdit({ ...dataEdit, status_kehadiran: e.target.value });
      setKehadiran(false);
    }
  };

  const handleChangePengganti = (e: any) => {
    setDataEdit({ ...dataEdit, status_pengganti: e.value });
  };

  const handleChangeStatusIzin = (e: any) => {
    setDataEdit({ ...dataEdit, status_izin: e.target.value });
  };

  const handleSubmit = () => {
    console.log("handle ini");
    setButtonLoad(true);
    onSubmit(dataEdit).then(() => setButtonLoad(false));
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".i-nama",
          popover: {
            title: "Nama Shift",
            description: "Isi nama shift",
          },
        },
        {
          element: ".i-mulai",
          popover: {
            title: "Waktu Mulai",
            description: "Menentukan waktu mulai",
          },
        },
        {
          element: ".i-selesai",
          popover: {
            title: "Waktu Selesai",
            description: "Menentukan waktu selesai",
          },
        },

        {
          element: ".b-submit",
          popover: {
            title: "Submit",
            description: "Klik submit",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const tanggal = dayjs(
    `${defaultValue.tahun}-${defaultValue.bulan}-${defaultValue.tanggal}`,
    {
      locale: "id",
    }
  ).format("dddd MMMM YYYY");

  return (
    <div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div
        className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[90vh]`}
        ref={modalContainerRef}
      >
        {isLoading ? (
          <div className={`justify-center flex items-center`}>
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
            <div className="w-full flex justify-between px-4 mt-2">
              <h1 className="text-xl font-semibold text-black dark:text-white">
                Data Jadwal Shift Kerja {tanggal}
              </h1>
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>

            <button className="pr-55">
              <HiQuestionMarkCircle
                values={filter}
                aria-placeholder="Show tutorial"
                // onChange={}
                onClick={handleClickTutorial}
              />
            </button>

            <div>
              <div className="m-4">
                <div className="">
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Jadwal Shift
                    </label>
                    <input
                      disabled
                      value={defaultValue.nama_shift}
                      name="nama_shift"
                      className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="form-group w-1/2 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu Masuk
                      </label>
                      <input
                        disabled
                        value={defaultValue.waktu_mulai}
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      />
                    </div>
                    <div className="form-group w-1/2 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Waktu Pulang
                      </label>
                      <input
                        disabled
                        value={defaultValue.waktu_selesai}
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Nama
                      </label>
                      <input
                        value={defaultValue.nama}
                        disabled
                        name="nama"
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      />
                    </div>
                    <div className="form-group w-full">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Nama Grup
                      </label>
                      <input
                        disabled
                        value={defaultValue.nama_grup_petugas}
                        name="nama_grup_petugas"
                        className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="form-group w-full mt-2">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Status Kehadiran
                    </label>
                    <select
                      className="capitalize w-full rounded  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:focus-border-primary"
                      onChange={handleChangeKehadiran}
                      defaultValue={dataEdit.status_kehadiran}
                    >
                      <option value="1">Hadir</option>
                      <option value="0">Tidak Hadir</option>
                    </select>
                  </div>
                  {kehadiran ? (
                    <div className="form-group w-full mt-2 ">
                      <div className="mt-2">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Pengganti
                        </label>
                        <div className="flex space-x-2">
                          <Select
                            className="mr-3 dark:text-black capitalize w-1/3"
                            placeholder="Pilih Grup"
                            onChange={onChangeGrupPetugas}
                            options={grupPetugasOption}
                            defaultValue={
                              grupPetugasDefaultValue.value
                                ? grupPetugasDefaultValue
                                : null
                            }
                          />
                          <Select
                            className="mr-3 dark:text-black capitalize w-2/3"
                            placeholder="Pilih Petugas"
                            defaultValue={
                              staffDeafaultValue.value
                                ? staffDeafaultValue
                                : null
                            }
                            onChange={handleChangePengganti}
                            options={StaffOptions}
                          />
                        </div>
                      </div>
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Keterangan
                      </label>
                      <select
                        onChange={handleChangeStatusIzin}
                        defaultValue={dataEdit.status_izin}
                        className="capitalize w-full rounded  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:focus-border-primary"
                      >
                        <option value="sakit">Sakit</option>
                        <option value="cuti">Cuti</option>
                        <option value="izin">Izin </option>
                        <option value="absen">Absen</option>
                      </select>
                    </div>
                  ) : null}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSubmit}
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? "bg-slate-400" : ""
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                  >
                    {buttonLoad ? (
                      <>
                        <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      </>
                    ) : (
                      <></>
                    )}
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPegawaiPetugasShift;
