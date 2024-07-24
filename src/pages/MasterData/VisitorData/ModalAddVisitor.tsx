import React, { useState, useRef, useEffect } from "react";
import {
  apiReadAllWBP,
  apiReadKota,
  apiReadProvinsi,
} from "../../../services/api";
import Select from "react-select";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { Alerts } from "./AlertVisitor";

interface AddVisitorModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => void;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
}

interface Kota {
  kota_id: string;
  nama_kota: string;
}

interface Pronvisi {
  provinsi_id: string;
  nama_provinsi: string;
}

interface namawbp {
  nama: string;
  wbp_profile_id: string;
}

export const AddVisitorModal: React.FC<AddVisitorModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState(
    defaultValue || {
      nama: "",
      foto_wajah: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      provinsi_id: "",
      kota_id: "",
      alamat: "",
      hubungan_wbp: "",
      wbp_profile_id: "",
      nik: "",
    }
  );

  console.log(formState, "cuyy");

  const [kota, setkota] = useState<Kota[]>([]);
  const [provinsi, setprovinsi] = useState<Pronvisi[]>([]);
  const [nameWBP, setnameWBP] = useState<namawbp[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [gambarVisitorPreview, setGambarVisitorPreview] = useState("");
  const [dataDefaultValue, setDataDefaultValue] = useState(defaultValue);

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  const dataUserItem = localStorage.getItem("dataUser");
  const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

  //useEffect untuk menambahkan event listener  ke elemen dokumen
  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent) => {
  //     if (
  //       modalContainerRef.current &&
  //       !modalContainerRef.current.contains(e.target as Node)
  //     ) {
  //       closeModal();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [closeModal]);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== "foto_wajah" // Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
      ) {
        if (!value) {
          errorFields.push(key);
        }
      }
    }
    if (errorFields.length > 0) {
      console.log(errorFields);
      setErrors(errorFields);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: `${isEdit ? ".b-edit" : ".b-unggah"}`,
          popover: {
            title: `${isEdit ? "Edit" : "Unggah"}`,
            description: `${isEdit ? "Edit" : "Unggah"} gambar yang diinginkan`,
          },
        },
        {
          element: ".b-del",
          popover: {
            title: "Button Delete",
            description: "Klik untuk menghapus gambar",
          },
        },
        {
          element: ".i-nama",
          popover: {
            title: "Nama",
            description: "Isi nama pengunjung",
          },
        },
        {
          element: ".i-jenis",
          popover: {
            title: "Jenis Kelamin",
            description: "Pilih jenis kelamin",
          },
        },
        {
          element: ".i-nik",
          popover: {
            title: "NIK",
            description: "Isi NIK pengunjung",
          },
        },
        {
          element: ".t-alamat",
          popover: {
            title: "Alamat",
            description: "Isi alamat dengan lengkap",
          },
        },
        {
          element: ".i-wbp",
          popover: {
            title: "Hubungan WBP",
            description: "Isi hubungan WBP",
          },
        },
        {
          element: ".p-wbp",
          popover: {
            title: "WBP Yang Dikunjungi",
            description: "Pilih wbp yang dikunjungi yang diinginkan",
          },
        },
        {
          element: ".p-provinsi",
          popover: {
            title: "Provinsi",
            description: "Pilih provinsi yang diinginkan",
          },
        },
        {
          element: ".p-kota",
          popover: {
            title: "Kota",
            description: "Pilih kota yang diinginkan",
          },
        },
        {
          element: ".i-tempat",
          popover: {
            title: "Tempat Lahir",
            description: "Isi tempat lahir",
          },
        },
        {
          element: ".i-tanggal",
          popover: {
            title: "Tanggal Lahir",
            description: "Menentukan tanggal lahir",
          },
        },
        {
          element: `${isEdit ? "#b-ubah" : "#b-tambah"}`,
          popover: {
            title: `${isEdit ? "Ubah" : "Tambah"}`,
            description: `Klik untuk ${
              isEdit ? "mengubah" : "menambahkan"
            } data pengunjung`,
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, "formState");

    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    console.log(onSubmit);
    // closeModal();
  };

  const handleSelectProvinsi = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, provinsi_id: e?.value });
  };

  const handleSelectWBP = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, wbp_profile_id: e?.value });
  };

  const handleSelectKota = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, kota_id: e?.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({ ...formState, foto_wajah: file });
      const imageUrl = URL.createObjectURL(file);
      setGambarVisitorPreview(imageUrl);
    }
  };

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     console.log(reader.result, "reader reader");

  //     reader.onloadend = async () => {
  //       console.log(reader.result, "reader.result reader.result");
  //       setFormState({ ...formState, foto_wajah: reader.result });

  //       // setGambarVisitorPreview(reader.result);
  //     };
  //     console.log(formState.foto_wajah, "imagePreview imagePreview");
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      let params = {
        pageSize: 1000,
      };

      let paramsWbp = {
        pagination: {
          pageSize: 1000,
        },
      };
      try {
        const kotanama = await apiReadKota(params, token);
        setkota(kotanama.records);

        const dataProvici = await apiReadProvinsi(params, token);
        setprovinsi(dataProvici.records);

        const wbp = await apiReadAllWBP(paramsWbp, token);

        const filteredWbp = wbp.data.records.filter(
          (namaWbp: any) => namaWbp.nama != null && namaWbp.nama != ""
        );

        setnameWBP(filteredWbp);

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

    fetchData();
  }, []);

  const [query, setQuery] = useState(""); // State untuk input pencarian
  const [results, setResults] = useState([]); // State untuk hasil pencarian
  const pageSize = 5; // Gantilah dengan nilai pagesize yang sesuai

  // Fungsi untuk menampilkan hasil pencarian
  async function showResults(query: any) {
    if (query === "") {
      setResults([]);
    } else {
      try {
        const response = await apiReadAllWBP(
          {
            filter: { nama: query },
            pagination: { pageSize: pageSize, page: 1 }, // Menggunakan pageSize tetap, halaman pertama
          },
          token
        );

        if (response.data.status === "OK") {
          const result = response.data;
          setResults(result.records);
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
    }
  }

  // const handleRemoveFoto = (e: any) => {
  //   // if (isEdit && !formState.gambar_barang_bukti) {
  //   //   setFormState({ ...formState, gambar_barang_bukti: '' });
  //   // }
  //   e.preventDefault()
  //   setFormState({ ...formState, foto_wajah: "" });
  //   setDataDefaultValue({
  //     ...dataDefaultValue,
  //     foto_wajah: "",
  //   });
  //   setGambarVisitorPreview(null);
  //   const inputElement = document.getElementById("image-upload") as HTMLInputElement;
  //   if (inputElement) {
  //     inputElement.value = "";
  //   }
  // };

  const handleRemoveFoto = (e: any) => {
    e.preventDefault();
    setFormState({ ...formState, foto_wajah: null });
    setDataDefaultValue({
      ...dataDefaultValue,
      foto_wajah: "",
    });
    setGambarVisitorPreview(null);
    const inputElement = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  console.log(formState, "formstate");
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

  const modalStyles: any = {
    backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)", // Background color with transparency for the blur effect
      backdropFilter: "blur(5px)", // Adjust the blur intensity as needed
      zIndex: 40, // Ensure the backdrop is behind the modal
    },
    modalContainer: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      // Add your other modal styles here
    },
  };

  console.log(gambarVisitorPreview, "gambar");

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        <div className="modal rounded-sm w-full">
          {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-slate-600 h-full w-[80vh]"> */}
          {isLoading ? (
            <div>
              <div className="flex flex-row-reverse pr-5 pt-3">
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <div className="h-[500px] justify-center flex items-center">
                <svg
                  className="animate-spin h-20 w-20 text-white "
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
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? "Detail data Pengunjung"
                      : isEdit
                      ? "Edit data Pengunjung"
                      : "Tambah data Pengunjung"}
                  </h3>
                </div>

                {/* <div className="w-full"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-90">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                ) : (
                  <button className="pr-80">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                )}
                {/* </div> */}

                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div className=" grid grid-cols-2 gap-2 items-start">
                      {/* Gambar */}
                      {isDetail && (
                        <div className="form-group w-full h-[330px]">
                          <div className=" mt-6 flex flex-col items-center">
                            {formState.foto_wajah && (
                              <img
                                className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                src={
                                  "https://dev-siram-workstation.transforme.co.id/storage/" +
                                  formState.foto_wajah
                                }
                                alt="Image Preview"
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {isEdit && (
                        <div className="form-group w-full h-[330px] ">
                          <div className="mt-6 flex flex-col items-center">
                            {/* {formState.foto_wajah ? (
                              formState.foto_wajah.startsWith("data:image/") ? (
                                <img className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md" src={formState.foto_wajah} alt="Image Preview" />
                              ) : (
                                <img className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md" src={"https://dev-siram-workstation.transforme.co.id/storage/" + formState.foto_wajah} alt="Image Preview" />
                              ) // Don't render anything if the image format is not as expected
                            ) : (
                              <img className="w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md" src="https://via.placeholder.com/200x300" alt="Placeholder" />
                            )} */}

                            {formState.foto_wajah ? (
                              typeof formState.foto_wajah === "string" ? (
                                <img
                                  className="object-contain w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                  src={
                                    "https://dev-siram-workstation.transforme.co.id/storage/" +
                                    formState.foto_wajah
                                  }
                                  alt="Image Preview"
                                />
                              ) : (
                                <img
                                  className="object-contain w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                  src={URL.createObjectURL(
                                    formState.foto_wajah
                                  )}
                                  alt="Image Preview"
                                />
                              )
                            ) : (
                              <img
                                className="w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                src="https://via.placeholder.com/200x200"
                                alt="Placeholder"
                              />
                            )}

                            <input
                              accept="image/*"
                              type="file"
                              id="image-upload"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                            <div className="flex gap-2">
                              <label htmlFor="image-upload">
                                <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded b-edit">
                                  Edit Gambar
                                </div>
                              </label>
                              <p
                                onClick={handleRemoveFoto}
                                className="cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded b-del"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </p>
                            </div>
                          </div>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === "foto_wajah" ? "Masukan foto wbp" : ""
                            )}
                          </p>
                        </div>
                      )}

                      {!isEdit && !isDetail && (
                        <div className="form-group w-full h-[330px]  ">
                          <div className="mt-6 flex flex-col items-center">
                            {formState.foto_wajah ? (
                              <img
                                className="object-cover w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                src={gambarVisitorPreview}
                                alt="Image Preview"
                              />
                            ) : (
                              <img
                                className="w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                src="https://via.placeholder.com/200x300"
                                alt="Placeholder"
                              />
                            )}
                            <input
                              accept="image/*"
                              type="file"
                              id="image-upload"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                            <div className="flex gap-2">
                              <label htmlFor="image-upload">
                                <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded b-unggah">
                                  Unggah Gambar
                                </div>
                              </label>

                              <button
                                onClick={handleRemoveFoto}
                                className=" cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded b-del"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "foto_wajah" ? "Masukan foto wbp" : ""
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col ">
                        <div className="form-group h-22 w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Nama
                          </label>
                          <input
                            className="w-full rounded border border-stroke   py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
                            name="nama"
                            onChange={handleChange}
                            value={formState.nama}
                            placeholder="Nama Pengunjung"
                            disabled={isDetail}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === "nama" ? "Masukan nama" : ""
                            )}
                          </p>
                        </div>

                        {/* jenis kelamin */}
                        <div className="form-group h-22 w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Jenis Kelamin
                          </label>
                          <select
                            className="w-full rounded border border-stroke   py-[13.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-jenis"
                            name="jenis_kelamin"
                            onChange={handleChange}
                            value={formState.jenis_kelamin}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Jenis Kelamin
                            </option>
                            <option value="0">Laki-laki</option>
                            <option value="1">Perempuan</option>
                          </select>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === "jenis_kelamin"
                                ? "Pilih Jenis Kelamin"
                                : ""
                            )}
                          </p>
                        </div>

                        {/* nik */}
                        <div className="form-group h-22 w-full">
                          <label
                            className="block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            NIK
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border border-stroke   py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nik"
                            name="nik"
                            placeholder="NIK"
                            onChange={handleChange}
                            value={formState.nik}
                            disabled={isDetail}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === "nik" ? "Masukan NIK" : ""
                            )}
                          </p>
                        </div>

                        {/* Alamat */}
                        <div className="form-group h-30 w-full flex flex-col">
                          <label
                            className=" block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Alamat
                          </label>
                          <textarea
                            className="w-full max-h-[94px] min-h-[100px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-alamat"
                            name="alamat"
                            onChange={handleChange}
                            placeholder="Alamat"
                            value={formState.alamat}
                            disabled={isDetail}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === "alamat" ? "Masukan Alamat" : ""
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 mt-2 gap-x-4 items-start">
                    {/* wbp yg di kunjungi
            {isDetail && (
          <div className="form-group h-22 w-full">
            <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
              WBP Yang DiKunjungi
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                placeholder="Cari Nama WBP"
                name="nama_wbp"
                disabled={true}
                value={formState.nama_wbp}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setQuery(inputValue);
                  showResults(inputValue);
                }}
              />
              <p className="error-text">
              {errors.map((item) =>
                item === 'nama_wbp'
                  ? 'Pilih WBP'
                  : ''
              )}
            </p>
              {results.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                  {results.map((result:any, index:any) => (
                    <li
                      key={index}
                      className="w-full rounded border border-stroke   py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      onClick={() => {
                        setQuery(result.nama); // Isi input dengan nama WBP yang dipilih
                        setFormState({ ...formState, wbp_profile_id: result.wbp_profile_id }); // Set nilai wbp_profile_id
                        setResults([]); // Bersihkan hasil pencarian setelah memilih
                      }}
                    >
                      {result.nama}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          )}

          {isEdit && (
          <div className="form-group h-22 w-full">
            <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
              WBP Yang DiKunjungi
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                placeholder="Cari Nama WBP"
                name="nama_wbp"
                value={formState.nama_wbp}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormState({
                    ...formState,
                    nama_wbp: newValue, // Update nama_wbp dengan input pengguna
                  });
                  setQuery(newValue); // Update query untuk pencarian
                  showResults(newValue); // Tampilkan hasil pencarian yang sesuai
                }}
              />
              <p className="error-text">
              {errors.map((item) =>
                item === 'nama_wbp'
                  ? 'Pilih WBP'
                  : ''
              )}
            </p>
              {results.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                  {results.map((result:any, index:any) => (
                    <li
                      key={index}
                      className="w-full rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      onClick={() => {
                        setFormState({
                          ...formState,
                          nama_wbp: result.nama, // Isi input dengan nama WBP yang dipilih
                          wbp_profile_id: result.wbp_profile_id, // Set nilai wbp_profile_id
                        });
                        setQuery(result.nama); // Setel query untuk menunjukkan hasil yang dipilih
                        setResults([]); // Bersihkan hasil pencarian setelah memilih
                      }}
                    >
                      {result.nama}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          )}

          {!isEdit && !isDetail && (
          <div className="form-group h-22 w-full">
            <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
              WBP Yang DiKunjungi
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                placeholder="Cari Nama WBP"
                name="nama"
                value={query}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setQuery(inputValue);
                  showResults(inputValue);
                }}
              />
              <p className="error-text">
              {errors.map((item) =>
                item === 'nama'
                  ? 'Pilih WBP'
                  : ''
              )}
            </p>
              {results.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                  {results.map((result:any, index:any) => (
                    <li
                      key={index}
                      className="w-full rounded border border-stroke   py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      onClick={() => {
                        setQuery(result.nama); // Isi input dengan nama WBP yang dipilih
                        setFormState({ ...formState, wbp_profile_id: result.wbp_profile_id }); // Set nilai wbp_profile_id
                        setResults([]); // Bersihkan hasil pencarian setelah memilih
                      }}
                    >
                      {result.nama}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          )} */}

                    {/* Hubungan WBP */}
                    <div className="form-group h-22 w-full">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Hubungan WBP
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border border-stroke   py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-wbp"
                        name="hubungan_wbp"
                        placeholder="Hubungan"
                        onChange={handleChange}
                        value={formState.hubungan_wbp}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "hubungan_wbp" ? "Masukan Hubungan" : ""
                        )}
                      </p>
                    </div>

                    {/* wbp yg di kunjungi */}
                    <div className="form-group h-22 w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        WBP Yang DiKunjungi
                      </label>
                      <Select
                        className="basic-single p-wbp"
                        classNamePrefix="select"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value: formState.wbp_profile_id,
                                label: formState.nama_wbp,
                              }
                            : formState.wbp_profile_id
                        }
                        placeholder={"Pilih wbp yang dikunjungi"}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        name="wbp_profile_id"
                        styles={customStyles}
                        options={nameWBP.map((item: any) => ({
                          value: item.wbp_profile_id,
                          label: item.nama,
                        }))}
                        onChange={handleSelectWBP}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "wbp_profile_id"
                            ? "Pilih WBP Yang DiKunjungi"
                            : ""
                        )}
                      </p>
                    </div>

                    {/* Provinsi */}
                    <div className="form-group h-22 w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Provinsi
                      </label>

                      {/* <select
              className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              name="provinsi_id"
              onChange={handleChange}
              value={formState.provinsi_id}
              disabled={isDetail}
            >
              <option disabled value="">
                Pilih provinsi
              </option>
              {provinsi.map((item) => (
                <option value={item.provinsi_id}>
                  {item.nama_provinsi}
                </option>
              ))}
            </select> */}
                      <Select
                        className="basic-single p-provinsi"
                        classNamePrefix="select"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value: formState.provinsi_id,
                                label: formState.nama_provinsi,
                              }
                            : formState.provinsi_id
                        }
                        placeholder={"Pilih provinsi"}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        name="provinsi_id"
                        styles={customStyles}
                        options={provinsi.map((item: any) => ({
                          value: item.provinsi_id,
                          label: item.nama_provinsi,
                        }))}
                        onChange={handleSelectProvinsi}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "provinsi_id" ? "Pilih provinsi" : ""
                        )}
                      </p>
                    </div>
                    {/* Kota */}
                    <div className="form-group h-22 w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Kota
                      </label>

                      {/* <select
              className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              name="kota_id"
              onChange={handleChange}
              value={formState.kota_id}
              disabled={isDetail}
            >
              <option disabled value="">
                Pilih kota
              </option>
              {kota
                .filter((item: any) => {
                  return item.provinsi_id === formState.provinsi_id; 
                })
                .map((item) => (
                  <option value={item.kota_id}>
                    {item.nama_kota}
                  </option>
                ))}
            </select> */}
                      <Select
                        className="basic-single p-kota"
                        classNamePrefix="select"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value: formState.kota_id,
                                label: formState.nama_kota,
                              }
                            : formState.kota_id
                        }
                        placeholder={"Pilih kota"}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        name="kota_id"
                        styles={customStyles}
                        options={kota
                          .filter((item: any) => {
                            return item.provinsi_id === formState.provinsi_id;
                          })
                          .map((item) => ({
                            value: item.kota_id,
                            label: item.nama_kota,
                          }))}
                        onChange={handleSelectKota}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "kota_id" ? "Pilih kota" : ""
                        )}
                      </p>
                    </div>

                    {/* Tempat Lahir */}
                    <div className="form-group h-22 w-full">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border border-stroke   py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-tempat"
                        name="tempat_lahir"
                        placeholder="Tempat Lahir"
                        onChange={handleChange}
                        value={formState.tempat_lahir}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "tempat_lahir" ? "Masukan Tempat Lahir" : ""
                        )}
                      </p>
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="form-group h-22 w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        className="w-full rounded border border-stroke   py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-tanggal"
                        name="tanggal_lahir"
                        onChange={handleChange}
                        value={formState.tanggal_lahir}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "tanggal_lahir" ? "Pilih Tanggal Lahir" : ""
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={` ${isDetail ? "h-auto" : "h-15"}  mt-3`}>
                  {isDetail ? null : isEdit ? (
                    <button
                      className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? "bg-slate-400" : ""
                      }`}
                      type="submit"
                      disabled={buttonLoad}
                      id="b-ubah"
                    >
                      {buttonLoad ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      ) : (
                        ""
                      )}
                      Ubah Data Pengunjung
                    </button>
                  ) : (
                    <button
                      className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                        buttonLoad ? "bg-slate-400" : ""
                      }`}
                      type="submit"
                      disabled={buttonLoad}
                      id="b-tambah"
                    >
                      {buttonLoad ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      ) : (
                        ""
                      )}
                      Tambah Data Pengunjung
                    </button>
                  )}
                  {errors.filter((item: string) =>
                    item.startsWith("INVALID_ID")
                  ).length > 0 && (
                    <>
                      <br />
                      <div className="error">
                        {errors
                          .filter((item: string) =>
                            item.startsWith("INVALID_ID")
                          )[0]
                          .replace("INVALID_ID_", "")}{" "}
                        is not a valid bond
                      </div>
                    </>
                  )}
                  {errors.length > 0 && (
                    <div className="error text-center">
                      <p className="text-red-400">
                        Ada data yang masih belum terisi !
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
