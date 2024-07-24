import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { clearScreenDown } from "readline";
import {
  apiReadAllRole,
  apiReadAllRuanganOtmil,
  apiReadAllStaff,
  apiReadAllUser,
  apiTipeAsetRead,
} from "../../services/api";
import { Alerts } from "./AlertInventaris";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";

interface AddInventarisModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => any;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
  token: any;
}

const dataUserItem = localStorage.getItem("dataUser");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const AddInventarisModal: React.FC<AddInventarisModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState(
    defaultValue || {
      nama_aset: "",
      serial_number: "",
      tipe_aset_id: "",
      model: "",
      ruangan_otmil_id: "",
      kondisi: "",
      keterangan: "",
      tanggal_masuk: "",
      image: "",
      garansi: "",
      merek: "",
    }
  );

  const modalContainerRef = useRef(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [ruangan, setRuangan]: any = useState([]);
  const [tipeAset, setTipeAset]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [filter, setFilter] = useState("");
  const [gambarAsetPreview, setGambarAsetPreview] = useState("");
  const [dataDefaultValue, setDataDefaultValue] = useState(defaultValue);

  // const handleImageChange = (e: any) => {
  // 	const file = e.target.files[0];
  // 	if (file) {
  // 		const reader = new FileReader();
  // 		console.log(reader.result, "reader");

  // 		reader.onloadend = async () => {
  // 			console.log(reader.result, "reader.result reader.result");
  // 			setFormState({ ...formState, image: reader.result });

  // 			// setImagePreview(reader.result);
  // 			console.log(formState.image, "imagePreview imagePreview");
  // 		};
  // 		reader.readAsDataURL(file);
  // 	}
  // };

  const handleImageChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setFormState({ ...formState, image: file });
      const imageUrl = URL.createObjectURL(file);
      setGambarAsetPreview(imageUrl);
      console.log(imageUrl, "imagePreview");
    }
  };
  console.log(gambarAsetPreview, "setGambarAsetPreview");
  console.log(formState.image, "setGambar euy");
  const handleSelectTipeBarang = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, tipe_aset_id: e?.value });
  };

  const handleSelectRuangan = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, ruangan_otmil_id: e?.value });
  };
  console.log(formState, "formState");
  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".b-unggah-gambar",
          popover: {
            title: `${isEdit ? "Edit" : "Unggah"} Gambar`,
            description: "Upload gambar profile",
          },
        },
        {
          element: ".input-name",
          popover: {
            title: "Nama Barang",
            description: "Isi nama barang",
          },
        },
        {
          element: ".s-number",
          popover: {
            title: "Serial Number",
            description: "Isi serial number",
          },
        },
        {
          element: ".t-barang",
          popover: {
            title: "Tipe Barang",
            description: "Pilih tipe barang",
          },
        },
        {
          element: ".input-merek",
          popover: {
            title: "Merek",
            description: "Isi nama merek",
          },
        },
        {
          element: ".input-model",
          popover: {
            title: "Model",
            description: "Isi nama model",
          },
        },
        {
          element: ".p-ruangan",
          popover: {
            title: "Ruangan",
            description: "Pilih ruangan yang sesuai",
          },
        },
        {
          element: ".p-kondisi",
          popover: {
            title: "Kondisi",
            description: "Pilih kondisi yang sesuai",
          },
        },
        {
          element: ".t-keterangan",
          popover: {
            title: "Keterangan",
            description: "Isi keterangan dengan lengkap",
          },
        },
        {
          element: ".t-masuk",
          popover: {
            title: "Tanggal Masuk",
            description: "Menentukan tanggal masuk",
          },
        },
        {
          element: ".m-garansi",
          popover: {
            title: "Masa Garansi",
            description: "Menentukan tanggal masa garansi",
          },
        },
        {
          element: `${isEdit ? "#t-data-ubah" : "#t-data"}`,
          popover: {
            title: `${isEdit ? "Ubah" : "Tambah"} Data Inventaris`,
            description: `Klik untuk ${
              isEdit ? "mengubah" : "menambahkan"
            } data inventaris`,
          },
        },
      ],
    });

    driverObj.drive();
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

  const handleRemoveFoto = (e: any) => {
    e.preventDefault();
    if (isEdit) {
      setFormState({ ...formState, foto_barang: null });
      setDataDefaultValue({
        ...dataDefaultValue,
        foto_barang: "",
      });
      return;
    }
    setFormState({ ...formState, image: "" });

    setGambarAsetPreview(null);
    const inputElement = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  console.log(isEdit, "image");

  // useEffect untuk mengambil data dari api
  useEffect(() => {
    getRuanganOtmilCimahi();
    getTipeAset();
  }, []);

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        // key !== 'nama_ruangan_lemasmil' &&
        key !== "status_zona_lemasmil" &&
        key !== "updated_at" &&
        key !== "garansi" &&
        key !== "nama_tipe" &&
        key !== "ruangan_lemasmil_id" &&
        key !== "image" &&
        key !== "kondisi" &&
        key !== "foto_barang"
      ) {
        console.log(errorFields, "errorFields");
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

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    for (const key in formState) {
      formData.append(key, formState[key]);
    }

    setButtonLoad(true);
    console.log(formState, "formState");
    onSubmit(formState).then(() => setButtonLoad(false));
  };

  const getRuanganOtmilCimahi = async () => {
    let params = {
      filter: {
        nama_lokasi_otmil: "Cimahi",
      },
      pageSize: 1000,
    };
    try {
      const response = await apiReadAllRuanganOtmil(params, token);
      // console.log(response,'RUANGAN')
      setRuangan(response.data.records);
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
  console.log(formState, "formState");
  const getTipeAset = async () => {
    let params = {
      filter: "",
    };
    try {
      const response = await apiTipeAsetRead(params, token);
      // console.log(response,'RUANGAN')
      setTipeAset(response.data.records);
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

  // Add this CSS style within your modal component
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

  return (
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full w-[80vh]"> */}
        <div className="modal rounded-sm w-full">
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
                      ? "Detail Data Inventaris"
                      : isEdit
                      ? "Edit Data Inventaris"
                      : "Tambah Data Inventaris"}
                  </h3>
                </div>

                {/* <div className="w-10"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-95">
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
                <div className="flex flex-col mt-4">
                  <div className="grid grid-cols-2 gap-4 -mb-8 ">
                    {isDetail && (
                      <div className="form-group w-full h-[330px]">
                        <div className="mt-4 flex flex-col items-center">
                          <img
                            className="object-contain w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                            src={
                              // `http://127.0.0.1:8000/storage/${formState.image}`
                              "https://dev-siram-workstation.transforme.co.id/storage/" +
                              formState.foto_barang
                            }
                            alt="Image Preview"
                          />
                        </div>
                      </div>
                    )}
                    {/* {isEdit && (
											<div className="orm-group w-full h-[330px] ">
												<div className="mt-4 flex flex-col items-center">
													{formState.foto_barang ? (
														typeof formState.foto_barang ===
														"string" ? (
															<img
																className="object-contain w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
																src={
																	// `http://127.0.0.1:8000/storage/${formState.image}`
																	"https://dev-siram-workstation.transforme.co.id/storage/" +
																	formState.foto_barang
																}
																alt="Image Preview"
															/>
														) : (
															<img
																className="object-contain w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
																src={
																	gambarAsetPreview
																}
																alt="Image Preview"
															/>
														) // Don't render anything if the image format is not as expected
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
														style={{
															display: "none",
														}}
														onChange={
															handleImageChange
														}
													/>
													<div className="flex gap-2">
														<label htmlFor="image-upload">
															<div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded b-unggah-gambar">
																Edit Gambar
															</div>
														</label>
														<button
															onClick={
																handleRemoveFoto
															}
															className="cursor-pointer0 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
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
															item === "image"
																? "Masukan foto barang"
																: ""
														)}
													</p>
												</div>
											</div>
										)} */}

                    {isEdit && (
                      <div className="form-group w-full h-[330px]">
                        <div className="mt-4 flex flex-col items-center">
                          {!formState.image && formState.foto_barang ? (
                            <img
                              className="object-contain w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                              src={
                                "https://dev-siram-workstation.transforme.co.id/storage/" +
                                formState.foto_barang
                              }
                              alt="Image Preview"
                            />
                          ) : formState.image ? (
                            <img
                              className="object-contain w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                              src={gambarAsetPreview}
                              alt="Image Preview"
                            />
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
                            style={{
                              display: "none",
                            }}
                            onChange={handleImageChange}
                          />
                          <div className="flex gap-2">
                            <label htmlFor="image-upload">
                              <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded b-unggah-gambar">
                                Edit Gambar
                              </div>
                            </label>
                            <button
                              onClick={handleRemoveFoto}
                              className="cursor-pointer hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
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
                              item === "image" ? "Masukan foto barang" : ""
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {!isEdit && !isDetail && (
                      <div className="form-group w-full h-[300px] ">
                        <div className=" mt-4 flex flex-col items-center">
                          {formState.image ? (
                            <img
                              className="object-cover w-[200px] h-[200px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                              src={gambarAsetPreview}
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
                            style={{
                              display: "none",
                            }}
                            onChange={handleImageChange}
                          />
                          <div className="flex gap-2">
                            <label htmlFor="image-upload">
                              <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded b-unggah-gambar">
                                Unggah Gambar
                              </div>
                            </label>

                            <button
                              onClick={handleRemoveFoto}
                              className="cursor-pointer0 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
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
                              item === "image" ? "Masukan foto barang" : ""
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-5 ">
                      {/* Nama barang */}
                      <div className="form-group w-full relative">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Nama barang
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-name"
                          onChange={handleChange}
                          name="nama_aset"
                          placeholder="Nama barang"
                          value={formState.nama_aset}
                          disabled={isDetail}
                        />
                        <p className="error-text absolute -bottom-5">
                          {errors.map((item) =>
                            item === "nama_aset" ? "Masukan nama barang" : ""
                          )}
                        </p>
                      </div>

                      {/* Serial number */}
                      <div className="form-group w-full relative">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Serial number
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary s-number"
                          onChange={handleChange}
                          name="serial_number"
                          placeholder="Serial number"
                          value={formState.serial_number}
                          disabled={isDetail}
                        />
                        <p className="error-text absolute -bottom-5">
                          {errors.map((item) =>
                            item === "serial_number"
                              ? "Masukan serial number"
                              : ""
                          )}
                        </p>
                      </div>

                      {/* Tipe barang*/}
                      <div className="form-group w-full relative">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Tipe barang
                        </label>
                        <Select
                          className="basic-single t-barang"
                          classNamePrefix="select"
                          styles={customStyles}
                          name="tipe_aset_id"
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih tipe aset"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.tipe_aset_id,
                                  label: formState.nama_tipe,
                                }
                              : formState.tipe_aset_id
                          }
                          options={tipeAset.map((item: any) => ({
                            value: item.tipe_aset_id,
                            label: item.nama_tipe,
                          }))}
                          onChange={handleSelectTipeBarang}
                        />
                        <p className="error-text absolute -bottom-5">
                          {errors.map((item) =>
                            item === "tipe_aset_id" ? "Pilih tipe" : ""
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 ">
                    <div className="grid grid-cols-2 gap-x-4">
                      {/* Merek */}
                      <div className="form-group w-full relative h-22 ">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Merek
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[10.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-merek"
                          onChange={handleChange}
                          placeholder="Merek"
                          name="merek"
                          value={formState.merek}
                          disabled={isDetail}
                        />
                        <p className="error-text absolute bottom-0">
                          {errors.map((item) =>
                            item === "merek" ? "Masukan merek" : ""
                          )}
                        </p>
                      </div>
                      {/* Model */}
                      <div className="form-group w-full relative h-22">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Model
                        </label>
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[10.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-model"
                          onChange={handleChange}
                          placeholder="Model"
                          name="model"
                          value={formState.model}
                          disabled={isDetail}
                        />
                        <p className="error-text absolute bottom-0">
                          {errors.map((item) =>
                            item === "model" ? "Masukan model" : ""
                          )}
                        </p>
                      </div>
                      {/* Ruangan */}
                      <div className="form-group w-full h-22 relative">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Ruangan
                        </label>

                        <Select
                          className="basic-single p-ruangan"
                          classNamePrefix="select"
                          styles={customStyles}
                          name="ruangan_otmil_id"
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih Ruangan"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.ruangan_otmil_id,
                                  label: formState.nama_ruangan_otmil,
                                }
                              : formState.ruangan_otmil_id
                          }
                          options={ruangan.map((item: any) => ({
                            value: item.ruangan_otmil_id,
                            label: item.nama_ruangan_otmil,
                          }))}
                          onChange={handleSelectRuangan}
                        />
                        <p className="error-text bottom-0 absolute">
                          {errors.map((item) =>
                            item === "ruangan_otmil_id" ? "Pilih ruangan" : ""
                          )}
                        </p>
                      </div>

                      {/* Asal barang*/}
                      {/* <div className="form-group w-full ">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Asal Barang
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[10.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        onChange={handleChange}
                        placeholder="Asal barang"
                        name="company"
                        value={formState.company}
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'company' ? 'Masukan Asal barang' : ''
                        )}
                      </p>
                    </div> */}

                      {/* Kondisi */}
                      <div className="form-group w-full relative h-22">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Kondisi
                        </label>
                        <select
                          onChange={handleChange}
                          name="kondisi"
                          value={formState.kondisi}
                          disabled={isDetail}
                          className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary p-kondisi"
                        >
                          <option disabled value="">
                            Pilih kondisi
                          </option>
                          <option value="Berfungsi">Berfungsi</option>
                          <option value="Rusak">Rusak</option>
                          <option value="Perbaikan">Dalam perbaikan</option>
                        </select>
                        <p className="error-text absolute bottom-0">
                          {errors.map((item) =>
                            item === "kondisi" ? "Pilih kondisi" : ""
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Keterangan */}
                    <div className="form-group w-full relative h-34">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Keterangan
                      </label>
                      <textarea
                        className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-keterangan"
                        onChange={handleChange}
                        placeholder="Keterangan"
                        name="keterangan"
                        value={formState.keterangan}
                        disabled={isDetail}
                      />
                      <p className="error-text absolute bottom-0">
                        {errors.map((item) =>
                          item === "keterangan" ? "Masukan keterangan" : ""
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 ">
                      {/* Tanggal masuk */}
                      <div className="form-group w-full relative h-22">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Tanggal masuk
                        </label>
                        <input
                          type="date"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary t-masuk"
                          name="tanggal_masuk"
                          onChange={handleChange}
                          value={formState.tanggal_masuk}
                          disabled={isDetail}
                        />
                        <p className="error-text absolute bottom-0">
                          {errors.map((item) =>
                            item === "tanggal_masuk"
                              ? "Masukan tanggal masuk"
                              : ""
                          )}
                        </p>
                      </div>

                      {/* Tanggal garansi */}
                      <div className="form-group w-full relative h-22">
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Masa garansi
                        </label>
                        <input
                          type="date"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:focus:border-primary m-garansi"
                          name="garansi"
                          onChange={handleChange}
                          value={formState.garansi}
                          disabled={isDetail}
                        />
                        {/* <p className="error-text absolute bottom-0">
                          {errors.map((item) =>
                            item === 'garansi'
                              ? 'Masukan garansi'
                              : ''
                          )}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>

                {errors.filter((item: string) => item.startsWith("INVALID_ID"))
                  .length > 0 && (
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
                  <div className="error mt-4 text-center">
                    <p className="text-red-400">
                      Ada data yang masih belum terisi !
                    </p>
                  </div>
                )}
                {/* {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
              .length > 0 && (
              <div className="error mt-4">
                <span>Please input :</span>
                <p className="text-red-400">
                  {errors
                    .filter((item: string) => !item.startsWith('INVALID_ID'))
                    .join(', ')}
                </p>
              </div>
            )} */}
                {/* <br></br> */}
                {isDetail ? null : isEdit ? (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? "bg-slate-400" : ""
                    }`}
                    id="t-data-ubah"
                    type="submit"
                    disabled={buttonLoad}
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
                    Ubah Data Inventaris
                  </button>
                ) : (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? "bg-slate-400" : ""
                    }`}
                    type="submit"
                    id="t-data"
                    disabled={buttonLoad}
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
                    Tambah Data Inventaris
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
