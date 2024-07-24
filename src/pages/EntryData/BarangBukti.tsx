import { useEffect, useState } from "react";
import Select from "react-select";
import {
  apiCreateBarangBukti,
  apiReadAllJenisPerkara,
  apiReadKasus,
} from "../../services/api";
import { Alerts } from "../MasterData/BarangBukti/AlertBarangBukti";
import { Error403Message } from "../../utils/constants";
import { CustomStyles } from "./CustomStyle";

const BarangBukti = ({ handleNext }: any) => {
  const [formState, setFormState] = useState({
    gambar_barang_bukti: "",
    nama_bukti_kasus: "",
    keterangan: "",
    tanggal_diambil: "",
    pdf_file_base64: "",
    nomor_barang_bukti: "",
    dokumen_barang_bukti: "",
    jenis_perkara_id: "",
    nama_jenis_perkara: "",
  });
  const [buttonLoad, setButtonLoad] = useState(false);
  const [dataKasus, setDataKasus] = useState([]);
  const [dataJenisPerkara, setDataJenisPerkara] = useState([]);
  const [gambarBarangBuktiPreview, setGambarBarangBuktiPreview] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;
  console.log(token, "token");

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     console.log(reader.result, "reader reader");

  //     reader.onloadend = async () => {
  //       console.log(reader.result, "reader.result reader.result");
  //       setFormState({ ...formState, gambar_barang_bukti: reader.result });

  //       // setImagePreview(reader.result);
  //       console.log(formState.gambar_barang_bukti, "imagePreview imagePreview");
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({ ...formState, gambar_barang_bukti: file });
      const imageUrl = URL.createObjectURL(file);
      setGambarBarangBuktiPreview(imageUrl);
    }
  };
  const handleRemoveFoto = () => {
    setFormState({ ...formState, gambar_barang_bukti: "" });
    // setDataDefaultValue({
    //   ...dataDefaultValue,
    //   gambar_barang_bukti: '',
    // });
    setGambarBarangBuktiPreview(null);
    const inputElement = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };
  const handleRemoveDoc = () => {
    setFormState({
      ...formState,
      pdf_file_base64: "",
      dokumen_barang_bukti: "",
    });
    // setDataDefaultValue({
    //   ...dataDefaultValue,
    //   dokumen_barang_bukti: '',
    // });
    const inputElement = document.getElementById(
      "fileUpload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };
  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // console.log(reader.result, "reader reader");

      // reader.onloadend = async () => {
      setFormState({ ...formState, dokumen_barang_bukti: file });

      // setImagePreview(reader.result);
      //   console.log(formState.pdf_file_base64, "Preview");
      // };
      // reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleChangeKasus = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, kasus_id: e?.value });
  };

  useEffect(() => {
    Promise.all([kasus(), apiJenisPerkara()]).then(() => {
      // setIsLoading(false);
    });
  }, []);
  const kasus = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadKasus(params, token)
      .then((res) => {
        setDataKasus(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: "error",
          title: err.massage,
        })
      );
  };

  const apiJenisPerkara = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadAllJenisPerkara(params, token)
      .then((res) => {
        setDataJenisPerkara(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: "error",
          title: err.massage,
        })
      );
  };

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== "dokumen_barang_bukti" &&
        key !== "tanggal_pelimpahan_kasus" &&
        key !== "nama_dokumen_barang_bukti" &&
        key !== "longitude" &&
        key !== "pdf_file_base64"
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, "From State");

    if (!validateForm()) return;
    setButtonLoad(true);

    handleSubmitAdd(formState).then(() => {
      setButtonLoad(false);
      setFormState({
        gambar_barang_bukti: "",
        nama_bukti_kasus: "",
        keterangan: "",
        tanggal_diambil: "",
        pdf_file_base64: "",
        nomor_barang_bukti: "",
        jenis_perkara_id: "",
        nama_jenis_perkara: "",
      });
    });
    // console.log('berhasil');
  };

  const handleSubmitAdd = async (params: any) => {
    console.log("DATA DARI LIST", params);
    try {
      const responseCreate = await apiCreateBarangBukti(params, token);
      if (responseCreate.data.status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil menambah data",
        });
        handleNext();
        // setModalAddOpen(false);
        // fetchData();
      } else if (responseCreate.data.status === "NO") {
        Alerts.fire({
          icon: "error",
          title: "Gagal membuat data",
        });
      } else {
        throw new Error(responseCreate.data.message);
      }
    } catch (e: any) {
      // if (e.response.status === 403) {
      //   navigate('/', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      Alerts.fire({
        icon: e.response.status === 403 ? "warning" : "error",
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };
  return (
    <div className="bg-slate-600 w-full h-full flex flex-col gap-10 p-8 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-between w-full mb-4">
          <div className="flex justify-center items-center w-[50%]">
            <div className="form-group h-[360px] ">
              <div className="mt-13 flex flex-col justify-center items-center h-65">
                {formState.gambar_barang_bukti ? (
                  <img
                    className="object-contain w-[350px] h-[350px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                    // src={`http://127.0.0.1:8000/storage/${formState.gambar_barang_bukti}`}
                    src={gambarBarangBuktiPreview}
                    alt="Image Preview"
                  />
                ) : (
                  <img
                    className="w-[350px] h-[350px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                    src="https://via.placeholder.com/300x300"
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
                    <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                      Unggah Gambar
                    </div>
                  </label>

                  <button
                    type="button"
                    onClick={handleRemoveFoto}
                    className="cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
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
                <p className="error-text bottom-0 absolute">
                  {errors.map((item) =>
                    item === "gambar_barang_bukti"
                      ? "Masukan foto barang bukti"
                      : ""
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[49%]">
            {/* Kasus */}
            <div className="form-group w-full  h-24 relative">
              <label
                className="block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Kasus
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={
                //   isEdit || isDetail || isKasus
                //     ? {
                //         value: formState.kasus_id,
                //         label: formState.nama_kasus,
                //       }
                //     : formState.kasus_id
                // }
                placeholder={"Pilih Kasus"}
                isClearable={true}
                isSearchable={true}
                name="kasus_id"
                styles={CustomStyles}
                options={dataKasus.map((item: any) => ({
                  value: item.kasus_id,
                  label: item.nama_kasus,
                }))}
                onChange={handleChangeKasus}
              />
              <p className="error-text absolute">
                {errors.map((item) =>
                  item === "kasus_id" ? "Pilih Kasus" : ""
                )}
              </p>
            </div>

            {/* Nomer Barang Bukti */}
            <div className="form-group w-full  h-24 relative">
              <label
                className="block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Nomer Barang Bukti
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                onChange={handleChange}
                name="nomor_barang_bukti"
                placeholder="Nomer Barang Bukti"
                value={formState.nomor_barang_bukti}
                // disabled={isDetail}
              />
              <p className="error-text absolute">
                {errors.map((item) =>
                  item === "nomor_barang_bukti"
                    ? "Masukan Nomer Barang Bukti"
                    : ""
                )}
              </p>
            </div>

            {/* Nama Bukti Kasus */}
            <div className="form-group w-full  h-24 relative">
              <label
                className="block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Nama Barang Bukti
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                onChange={handleChange}
                name="nama_bukti_kasus"
                placeholder="Nama Bukti Kasus"
                value={formState.nama_bukti_kasus}
                // disabled={isDetail}
              />
              <p className="error-text absolute">
                {errors.map((item) =>
                  item === "nama_bukti_kasus" ? "Masukan Nama Bukti Kasus" : ""
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          {/* keterangan */}
          <div className="form-group w-full  h-24 relative">
            <label
              className="block text-sm capitalize font-medium text-black dark:text-white"
              htmlFor="id"
            >
              keterangan
            </label>
            <input
              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
              onChange={handleChange}
              name="keterangan"
              placeholder="keterangan"
              value={formState.keterangan}
              // disabled={isDetail}
            />
            <p className="error-text absolute">
              {errors.map((item) =>
                item === "keterangan" ? "Masukan keterangan" : ""
              )}
            </p>
          </div>

          {/* Tanggal Di Ambil */}
          <div className="form-group w-full  h-24 relative">
            <label
              className="block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Tanggal Di Ambil
            </label>
            <input
              type="date"
              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
              onChange={handleChange}
              name="tanggal_diambil"
              placeholder="Tanggal Di Ambil"
              value={formState.tanggal_diambil}
              // disabled={isDetail}
            />
            <p className="error-text absolute">
              {errors.map((item) =>
                item === "tanggal_diambil" ? "Masukan Tanggal Di Ambil" : ""
              )}
            </p>
          </div>
        </div>
        <div className="">
          <label
            className="block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Nama Jenis Perkara
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            // defaultValue={
            //   isEdit || isDetail
            //     ? {
            //         value: formState.jenis_perkara_id,
            //         label: formState.nama_jenis_perkara,
            //       }
            //     : formState.jenis_perkara_id
            // }
            placeholder={"Pilih Jenis Perkara"}
            isClearable={true}
            isSearchable={true}
            // isDisabled={isDetail}
            name="jenis_perkara_id"
            styles={CustomStyles}
            options={dataJenisPerkara.map((item: any) => ({
              value: item.jenis_perkara_id,
              label: item.nama_jenis_perkara,
            }))}
            onChange={(e) => {
              setFormState({
                ...formState,
                jenis_perkara_id: e?.value,
                nama_jenis_perkara: e?.label,
              });
            }}
          />
          <p className="error-text absolute">
            {errors.map((item) =>
              item === "nama_jenis_perkara" ? "Masukan jenis perkara" : ""
            )}
          </p>
        </div>
        <div className="grid grid-cols-1">
          <label
            className="block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Barang Bukti Kasus
          </label>
          <div
            id="FileUpload"
            className="relative  block w-full appearance-none overflow-hidden rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 mb-4"
          >
            <input
              type="file"
              id="fileUpload"
              accept=".pdf, .doc, .docx"
              onChange={handleUpload}
              // className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              className="hidden"
            />
            <div className="mb-10">
              {formState.dokumen_barang_bukti ? (
                <div className="grid grid-cols-1">
                  <div
                    className={`absolute top-0 right-0  bg-red-500 flex items-center  rounded-bl block
                              }`}
                  >
                    <p className="p-[2px]" onClick={handleRemoveDoc}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="50"
                      height="50"
                    >
                      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                    </svg>
                  </div>
                  <p className="text-center text-sm text-blue-500">
                    Dokumen terupload !
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <span className="text-blue-500 underline">
                      Klik untuk unggah
                    </span>
                  </label>
                  <p className="mt-1.5">PDF</p>
                </div>
              )}
            </div>
          </div>
          <p className="error-text">
            {errors.map((item) =>
              item === "pdf_file_base64" ? "Masukan dokumen sidang" : ""
            )}
          </p>
          <button
            className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1`}
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
            Tambah Barang Bukti
          </button>
        </div>
      </form>
    </div>
  );
};

export default BarangBukti;
