import { log } from "console";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Select from "react-select";
import { apiReadAllStaff, apiUpdateAllStaff } from "../../../services/api";
import { Alerts } from "../SceduleShift/Alert";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";

interface AddRoomModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isEdit?: boolean;
}

interface Staff {
  petugas_id: any;
  nama: any;
}

const EditGrup: React.FC<AddRoomModalProps> = ({
  closeModal,
  defaultValue,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  //get Token
  const tokenItem = localStorage.getItem("token");
  let tokens = tokenItem ? JSON.parse(tokenItem) : null;
  let token = tokens.token;

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  //data from grufShift
  const [dataGrup, setDataGrup] = useState(
    defaultValue || {
      grup_petugas_id: "",
      nama_grup_petugas: "",
      ketua_grup_id: "",
    }
  );
  console.log(dataGrup, "dataGrup");
  //new data for update
  const [grupEdit, setGrupedit] = useState({
    grup_petugas_id: dataGrup.grup_petugas_id,
    nama_grup_petugas: dataGrup.nama_grup_petugas,
    ketua_grup_id: dataGrup.ketua_grup_id,
  });

  //data petugas grup
  const [staff, setStaff] = useState<Staff[]>([]);

  const [filter, setFilter] = useState("");

  //data all petugas
  const [newStaff, setNewStaff] = useState<Staff[]>([]);
  console.log(newStaff, "newstaff");
  console.log(dataGrup, "dataGrup");
  const StaffOptions = newStaff
    .filter((item: any) => item.grup_petugas_id !== dataGrup.grup_petugas_id)
    .map((item: any) => ({
      value: item.petugas_id,
      label: item.nama,
    }));
  const newStaffOptions = newStaff
    .filter((item: any) => item.grup_petugas_id !== dataGrup.grup_petugas_id)
    .map((item: any) => ({
      value: item.petugas_id,
      label: item.nama_grup_petugas
        ? `${item.nama} (${item.nama_grup_petugas})`
        : `${item.nama} (No team available)`,
    }));
  const [errors, setErrors] = useState({
    namaGrup: "",
    ketuaGrup: "",
  });

  //data add petugas grup
  const [addStaff, setAddStaff] = useState<{
    grup_petugas_id: any;
    petugas_id?: any;
    nama?: any;
  } | null>(null);
  console.log("hallo:", addStaff);

  //fecth data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const dataStaff = async () => {
      const filter = {
        pageSize: Number.MAX_SAFE_INTEGER,
        filter: {
          grup_petugas_id: dataGrup.grup_petugas_id,
        },
      };
      const filter2 = {
        pageSize: Number.MAX_SAFE_INTEGER,
        // filter: {
        //   grup_petugas_id: '',
        // },
      };
      try {
        const staff = await apiReadAllStaff(filter, token);
        const staffNew = await apiReadAllStaff(filter2, token);

        setStaff(staff.data.records);
        setNewStaff(staffNew.data.records);
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
    dataStaff();
  }, []);

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

  //handlechange for setdata update
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGrupedit({ ...grupEdit, [e.target.name]: e.target.value });
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".i-nama",
          popover: {
            title: "Nama Grup",
            description: "Isi nama grup",
          },
        },
        {
          element: ".p-ketua",
          popover: {
            title: "Nama Ketua Grup",
            description: "Pilih nama ketua grup",
          },
        },
        {
          element: ".p-grup",
          popover: {
            title: "Anggota Grup",
            description: "Pilih anggota grup dan klik tambah",
          },
        },
        {
          element: ".d-grup",
          popover: {
            title: "Nama Ketua Grup",
            description: "Menampilkan nama ketua grup",
          },
        },
        {
          element: ".b-submit",
          popover: {
            title: "Submit",
            description: `Klik submit`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChangeSelect = (selectedOption: any) => {
    setGrupedit({
      ...grupEdit,
      ketua_grup: selectedOption.value,
    });
  };

  //data defaul value for select
  const ketuaGrupOption = {
    value: dataGrup.ketua_grup_id,
    label: dataGrup.nama_ketua_grup, // Ganti dengan nama yang sesuai
  };

  //function validate from
  const validateForm = () => {
    const newErrors = {
      namaGrup: "",
      ketuaGrup: "",
    };

    if (grupEdit.grup_petugas_id && grupEdit.nama_grup_petugas) {
      // Menghapus semua kesalahan jika kondisi ini terpenuhi
      setErrors({
        ...errors,
        namaGrup: "",
        ketuaGrup: "",
      });
      return true;
    } else {
      if (!grupEdit.nama_grup_petugas) {
        newErrors.namaGrup = "Nama Grup harus diisi";
      }
      if (!grupEdit.ketua_grup) {
        newErrors.ketuaGrup = "Ketua Grup harus diisi";
      }
      // Anda bisa melanjutkan untuk menambahkan validasi lainnya

      setErrors(newErrors); // Mengatur kesalahan sesuai dengan validasi
      if (Object.values(newErrors).some((error) => error)) {
        return false;
      }
      return true;
    }
  };

  //add petugas Grup
  const handleChangeAdd = (selectedOption: any) => {
    const selectedStaff = newStaff.find(
      (item) => item.petugas_id === selectedOption.value
    );
    console.log("add:", staff);

    // Mengatur data yang dipilih ke dalam state addStaff
    const updatedSelectedStaff = {
      ...selectedStaff,
      grup_petugas_id: dataGrup.grup_petugas_id,
      nama_grup_petugas: dataGrup.nama_grup_petugas,
    };
    console.log("dta:", addStaff);
    setAddStaff(updatedSelectedStaff);
  };

  const handleAddPetugas = async () => {
    try {
      const addDataPetugas = await apiUpdateAllStaff(addStaff, token);
      if (addDataPetugas.data.status === "OK") {
        const filter = {
          pageSize: Number.MAX_SAFE_INTEGER,
          filter: {
            grup_petugas_id: dataGrup.grup_petugas_id,
          },
        };
        const filter2 = {
          pageSize: Number.MAX_SAFE_INTEGER,
          // filter: {
          //   grup_petugas_id: '',
          // },
        };
        const staff = await apiReadAllStaff(filter, token);
        const staffNew = await apiReadAllStaff(filter2, token);
        setStaff(staff.data.records);
        setNewStaff(staffNew.data.records);
      } else {
        // Handle the case when addDataPetugas.data.status is not 'OK'
        Alerts.fire({
          icon: "error",
          title: "Gagal menambahkan petugas",
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

  const handleDeletePetugas = async (item: any) => {
    try {
      const updatedItem = { ...item, grup_petugas_id: null };
      console.log("delete:", updatedItem);

      const addDataPetugas = await apiUpdateAllStaff(updatedItem, token);
      if (addDataPetugas.data.status === "OK") {
        const filter = {
          pageSize: Number.MAX_SAFE_INTEGER,
          filter: {
            grup_petugas_id: dataGrup.grup_petugas_id,
          },
        };
        const filter2 = {
          pageSize: Number.MAX_SAFE_INTEGER,
          // filter: {
          //   grup_petugas_id: '',
          // },
        };
        const staff = await apiReadAllStaff(filter, token);
        const staffNew = await apiReadAllStaff(filter2, token);
        setStaff(staff.data.records);
        setNewStaff(staffNew.data.records);
      } else {
        // Handle the case when addDataPetugas.data.status is not 'OK'
        Alerts.fire({
          icon: "error",
          title: "Gagal menghapus petugas",
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

  //function Submit Update
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(grupEdit);
  };

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "rgb(30 41 59)",
      borderColor: "rgb(30 41 59)",
      color: "white",
      paddingTop: 3,
      paddingBottom: 3,
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
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "rgb(51, 133, 255)",
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "white",
    }),
  };

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
                Edit Grup Shift Kerja
              </h1>

              {/* <div className="w-10"> */}
              <button className="pr-70">
                <HiQuestionMarkCircle
                  values={filter}
                  aria-placeholder="Show tutorial"
                  // onChange={}
                  onClick={handleClickTutorial}
                />
              </button>
              {/* </div> */}

              <strong
                className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="m-4">
                <div className="">
                  <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Grup
                    </label>
                    <input
                      name="nama_grup_petugas"
                      className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white dark:focus:border-primary i-nama"
                      value={grupEdit.nama_grup_petugas}
                      onChange={handleChange}
                    />
                    {errors.namaGrup ? (
                      <h1 className="pl-2 text-xs text-red-500">
                        {errors.namaGrup}
                      </h1>
                    ) : (
                      <h1 className="h-4"></h1>
                    )}
                  </div>
                  <div className="form-group w-full mt-2">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Ketua Grup
                    </label>
                    <Select
                      className="w-full mr-3 dark:text-black capitalize p-ketua"
                      placeholder="Tambah Anggota Grup"
                      styles={customStyles}
                      defaultValue={ketuaGrupOption}
                      options={StaffOptions}
                      onChange={handleChangeSelect}
                    />
                  </div>
                  <label
                    className="block text-sm font-semibold text-black dark:text-white mt-2 "
                    htmlFor="id"
                  >
                    Anggota Grup
                  </label>
                  <div className="flex jutify-between p-grup">
                    <Select
                      className="w-full mr-3 dark:text-black capitalize"
                      placeholder="Tambah Anggota Grup"
                      styles={customStyles}
                      options={newStaffOptions}
                      onChange={handleChangeAdd}
                    />
                    <button
                      type="button"
                      onClick={handleAddPetugas}
                      className="text-black rounded-md flex items-center text-xs bg-blue-300 py-2 px-3"
                    >
                      <AiOutlineUserAdd /> Tambah
                    </button>
                  </div>
                  <div className=" w-full mt-2 mb-1 flex justify-between space-x-2">
                    <div className="form-group w-2/6">
                      <label
                        className="block text-sm font-medium text-black dark:text-white ml-2"
                        htmlFor="id"
                      >
                        Nama
                      </label>
                    </div>
                    <div className="form-group w-2/6 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white "
                        htmlFor="id"
                      >
                        Jabatan
                      </label>
                    </div>
                    <div className="form-group w-2/6 ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Divisi
                      </label>
                    </div>
                  </div>
                  <div className="w-full h-64 overflow-y-auto d-grup">
                    {staff
                      .filter(
                        (item) =>
                          item.grup_petugas_id === defaultValue.grup_petugas_id
                      )
                      .map((item: any) => {
                        return (
                          <div className="flex justify-between space-x-2 mx-1 rounded border border-stroke border-primary my-1 dark:text-gray dark:bg-slate-800 ">
                            <div className="form-group w-2/6 ">
                              <h1></h1>
                              <input
                                name="nama"
                                disabled
                                className="capitalize w-full dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white dark:focus:border-primary"
                                value={item.nama}
                              />
                            </div>
                            <div className="form-group w-2/6 ">
                              <input
                                value={item.jabatan}
                                name="jam"
                                className="capitalize w-full dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white dark:focus:border-primary"
                              />
                            </div>
                            <div className="form-group w-2/6 ">
                              <input
                                name="cuti"
                                value={item.divisi}
                                className="capitalize w-full dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white dark:focus:border-primary"
                              />
                            </div>
                            <div className="w-1/12 ">
                              <button
                                type="button"
                                onClick={() => handleDeletePetugas(item)}
                                className="w-full h-full flex items-center justify-center hover:text-red-600"
                              >
                                <BsTrash />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <button
                  className="btn mt-2 w-full flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 b-submit"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditGrup;
