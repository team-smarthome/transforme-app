import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

import {
  apiCreateBAP,
  apiReadPenyidikan,
  apiReadBAP,
} from "../../services/api";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Alerts } from "../../pages/PencatatanBAP/AlertBAP";
import { Error403Message } from "../../utils/constants";
import { Alert } from "@windmill/react-ui";
import dayjs from "dayjs";

export const AddBAP = ({ namaDokumenBap, handleNext }: any) => {
  const [formState, setFormState] = useState({
    // untuk default value dari form ini
    // nama_dokumen_bap: '',
    // link_dokumen_bap: '',
    // penyidikan_id: '',
    // pdf_file_base64: '',
    // nomor_penyidikan: '',
    // nama_kasus: '',
    // nama_saksi: '',
    // nama: '',
    // agenda_penyidikan: '',
    // nrp_wbp: '',
    // pdf_file: '',
    nama_dokumen_bap: namaDokumenBap,
    link_dokumen_bap: "",
    penyidikan_id: "",
    // pdf_file_base64: "",
  });

  console.log(formState, "formstate cuyy");

  const [errors, setErrors] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataPenyidikan, setDataPenyidikan] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;
  const [file, setFile] = useState(null);

  console.log(token, "token cuyy");

  const validateForm = () => {
    let errorFields = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== "lokasi_lemasmil" &&
        key !== "lokasi_otmil" &&
        key !== "nama" &&
        key !== "saksi_id" &&
        key !== "nama_saksi" &&
        key !== "wbp_profile_id" &&
        key !== "nrp_wbp" &&
        key !== "link_dokumen_bap" &&
        key !== "nama"
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

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChangePageSize = async (e: any) => {
    const size = e.target.value;
    setPageSize(size);
    setCurrentPage(1);
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
      paddingTop: 3,
      paddingBottom: 3,
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState, "formState");

    if (!validateForm()) return;
    // setButtonLoad(true);
    handleSubmitAdd(formState).then(() => {
      setFormState({
        nama_dokumen_bap: "",
        link_dokumen_bap: "",
        penyidikan_id: "",
        // pdf_file_base64: "",
      });
    });
  };

  const handleSubmitAdd = async (params: any) => {
    console.log("DATA DARI LIST", params);
    try {
      const responseCreate = await apiCreateBAP(params, token);
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
      if (e.response.status === 403) {
        navigate("/auth/signin", {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: "warning",
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  const fetchData = async () => {
    let params = {
      filter: {
        // lokasi_otmil: 'Cimahi',
      },
      page: currentPage,
      pageSize: pageSize,
    };

    setIsLoading(true);
    try {
      const response = await apiReadBAP(params, token);
      if (response.data.status !== "OK") {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setData(result);
      // setPages(response.data.pagination.totalPages);
      // setRows(response.data.pagination.totalRecords);
      setIsLoading(false);
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

  useEffect(() => {
    console.log(formState, "FORMSTATE");
    // checkFileType(formState.link_dokumen_bap);

    // use

    if (formState.link_dokumen_bap) {
      setFormState((prevFormState: any) => ({
        ...prevFormState,
        link_dokumen_bap: prevFormState.link_dokumen_bap,
      }));
    }
  }, [formState.link_dokumen_bap]);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 10 * 1024 * 1024; // 5 MB, adjust as needed

    if (file) {
      if (file.size > maxSizeInBytes) {
        // File size exceeds the limit, handle the error as you wish
        console.log("File size exceeds the limit.");
        toast.error(
          "File size exceeds limit of 10MB. Please reduce file size and try again."
        );
        return;
      }

      setFormState({ ...formState, link_dokumen_bap: file});

      // const reader = new FileReader();

      // reader.onloadend = async () => {
      //   await setFormState({ ...formState, link_dokumen_bap: reader.result });
        // console.log(formState.pdf_file_base64, 'Preview');
        // console.log(file, 'Preview');
        // console.log(reader.result, 'Preview');
      // };

      // reader.readAsDataURL(file);
      // console.log(formState.pdf_file_base64, 'Preview');
    }
  };

  const url = `https://dev.transforme.co.id${formState.link_dokumen_bap}`;
  console.log(formState, "ada");

  const openNewWindow = () => {
    // URL to be opened in the new window
    const url = `https://dev.transforme.co.id${formState.link_dokumen_bap}`;

    // Specify window features (optional)
    const windowFeatures = "width=600,height=400";

    // Open the new window
    window.open(url, "_blank", windowFeatures);
  };

  const handleRemoveDoc = () => {
    setFormState({ ...formState, link_dokumen_bap: "" });
    const inputElement = document.getElementById(
      "fileUpload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handlePenyidikanChange = (e: any) => {
    const selectedPenyidikan: any = dataPenyidikan.find(
      (item: any) => item.penyidikan_id === e?.value
    );

    setFormState({
      ...formState,
      penyidikan_id: e?.value,
      nomor_penyidikan: selectedPenyidikan
        ? selectedPenyidikan.nomor_penyidikan
        : "",
      agenda_penyidikan: selectedPenyidikan
        ? selectedPenyidikan.agenda_penyidikan
        : "",
      nomor_kasus: selectedPenyidikan ? selectedPenyidikan.nomor_kasus : "",
      nama_kasus: selectedPenyidikan ? selectedPenyidikan.nama_kasus : "",
      nrp_wbp: selectedPenyidikan ? selectedPenyidikan.nrp_wbp : "",
      lokasi_otmil: selectedPenyidikan ? selectedPenyidikan.lokasi_otmil : "",
      wbp_profile_id: selectedPenyidikan
        ? selectedPenyidikan.wbp_profile_id
        : "",
      nama: selectedPenyidikan ? selectedPenyidikan.nama_wbp : "",
      saksi_id: selectedPenyidikan ? selectedPenyidikan.saksi_id : "",
      nama_saksi: selectedPenyidikan ? selectedPenyidikan.nama_saksi : "",
    });
  };

  const penyidikan = async () => {
    try {
      let params = {
        pageSize: 100,
      };
      const response = await apiReadPenyidikan(params, token);
      if (response.data.status !== "OK") {
        throw new Error(response.data.message);
      }
      const result = response.data.records;
      setIsLoading(false);
      setDataPenyidikan(result);
    } catch (e: any) {
      setIsLoading(false);
      console.log(e.message);
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

  useEffect(() => {
    handleModalAddOpen();
    penyidikan();
  }, []);

  const valueTerlibat = formState.nama_saksi
    ? `${formState.nama_saksi} (saksi)`
    : formState.nama
    ? `${formState.nama} (tersangka)`
    : "";

  const checkFileType = (file: any) => {
    if (file) {
      console.log(file, "file");
      const fileExtension = file.split(".").pop().toLowerCase();
      console.log(fileExtension, "file");
      setFile(fileExtension);
    } else {
      console.error("File is undefined or empty.");
      // Tindakan tambahan jika perlu, seperti menetapkan nilai default atau memberikan notifikasi kesalahan.
    }
  };

  const [dokumenBAP, setDokumenBap] = useState({
    nama_dokumen_bap: "",
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
    const type = "BAP";
    const day = dayjs(new Date()).format("DD");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear().toString();
    const lokasi = "Otmil";
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;

    data.forEach((item: any) => {
      if (item.nama_dokumen_bap) {
        const namaDokumenBap = item.nama_dokumen_bap.split("/")[0]; // Get the first part of the case number
        const angka = parseInt(namaDokumenBap, 10);

        if (!isNaN(angka) && item.nama_dokumen_bap.includes(currentDate)) {
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

    setFormState({
      ...formState,
      nama_dokumen_bap: `${angkaTerbesar}/${type}/${currentDate}/${lokasi}`,
    });

    // setModalAddOpen(true);
  };

  return (
    <div className="px-10">
      {/* <div className="text-white text-xl font-bold mb-3">
            <h2>Tambah Data BAP</h2>
        </div> */}
      <div className="bg-slate-500 p-5 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols gap-4 mt-5">
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label
                  className="block mb-1 text-base text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama Dokumen BAP
                </label>
                <input
                  type="text"
                  name="nama_dokumen_bap"
                  placeholder="Nama Dokumen BAP"
                  onChange={handleChange}
                  value={formState.nama_dokumen_bap}
                  className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                />
                <p>
                  {errors?.map((item) =>
                    item === "nama_dokumen_bap"
                      ? "Masukan Nama Dokumen BAP"
                      : ""
                  )}
                </p>
              </div>
              <div className="">
                <label
                  className="block mb-1 text-base text-black dark:text-white"
                  htmlFor="id"
                >
                  Nomor Penyidikan
                </label>
                <Select
                  className="basic-single p-nomor"
                  classNamePrefix="select"
                  defaultValue={
                    dataPenyidikan.find(
                      (item: any) =>
                        item.penyidikan_id === formState.penyidikan_id
                    ) || null
                  }
                  placeholder={"Pilih Nomor penyidikan"}
                  isClearable={true}
                  isSearchable={true}
                  // isDisabled
                  name="penyidikan_id"
                  styles={customStyles}
                  options={dataPenyidikan.map((item: any) => ({
                    value: item.penyidikan_id,
                    label: item.nomor_penyidikan,
                  }))}
                  onChange={handlePenyidikanChange}
                />
                <p>
                  {errors?.map((item) =>
                    item === "penyidikan_id" ? "Masukan Nomor Penyidikan" : ""
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label
                  className="block mb-1 text-base text-black dark:text-white"
                  htmlFor="id"
                >
                  Nomor Kasus
                </label>
                <input
                  type="text"
                  name="nomor_kasus"
                  onChange={handleChange}
                  value={formState.nomor_kasus}
                  placeholder="Nomor kasus"
                  className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                  disabled
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "nomor_kasus" ? "Pilih Nomor Kasus" : ""
                  )}
                </p>
              </div>
              <div className="">
                <label
                  className="block mb-1 text-base text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama Kasus
                </label>
                <input
                  type="text"
                  name="nama_kasus"
                  onChange={handleChange}
                  value={formState.nama_kasus}
                  placeholder="Nama kasus"
                  className="w-full disable rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                  disabled
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "nama_kasus" ? "Pilih Nama Kasus" : ""
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label
                  className="block mb-1 text-base text-black dark:text-white"
                  htmlFor="id"
                >
                  Pihak Terlibat
                </label>
                <input
                  onChange={handleChange}
                  value={valueTerlibat}
                  type="text"
                  placeholder="Pihak terlibat"
                  className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                  disabled
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "" ? "Pilih Pihak Terlibat" : ""
                  )}
                </p>
              </div>
              {formState.nama && (
                <div className="form-group w-full ">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    NRP
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 mt-2 py-[8px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nrp"
                    placeholder="NRP"
                    name="nrp_wbp"
                    onChange={handleChange}
                    value={formState.nama_saksi ? "" : formState.nrp_wbp}
                    disabled
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "nrp_wbp" ? "Pilih NRP" : ""
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label
                  className="block mb-1 text-base text-black dark:text-white"
                  htmlFor="id"
                >
                  Agenda Penyidikan
                </label>
                <textarea
                  className="w-full rounded border border-stroke py-10 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-agenda"
                  name="agenda_penyidikan"
                  id="textArea"
                  placeholder="Agenda Penyidikan"
                  onChange={handleChange}
                  value={formState.agenda_penyidikan}
                  disabled
                />
                <p className="error-text">
                  {errors?.map((item) =>
                    item === "agenda_penyidikan"
                      ? "Masukan Agenda Penyidikan"
                      : ""
                  )}
                </p>
              </div>
              <div className="-group w-full">
                {/* dokumen */}
                <label
                  className="block mb-1 text-base text-black dark:text-white"
                  htmlFor="id"
                >
                  Dokumen BAP
                </label>
                <div className="relative  block w-full appearance-none overflow-hidden rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".pdf, .doc, .docx"
                    className="hidden"
                    onChange={handleUpload}
                  />
                  {formState.link_dokumen_bap ? (
                    <div className="grid grid-cols-1">
                      <div
                        // className={`absolute top-0 right-0  bg-red-500 flex items-center  rounded-bl  ${
                        //   isDetail ? 'hidden' : 'block'
                        // }`}
                        className="absolute top-0 right-0  bg-red-500 flex items-center  rounded-bl"
                      >
                        <button className="p-[2px]" onClick={handleRemoveDoc}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="">
                        <div style={{ height: "10%" }}>
                          {/* pdf */}
                          {file && (
                            <div className="">
                              {file === "pdf" ? (
                                <iframe
                                  src={`https://dev.transforme.co.id${formState.link_dokumen_bap}`}
                                  title="pdf"
                                  width="100%"
                                  height="600px" // Adjust the height as per your requirement
                                  className="border-0 text-center justify-center"
                                  // scrolling="no"
                                />
                              ) : file === "docx" || file === "doc" ? (
                                // {/* docx */}
                                <iframe
                                  src={`https://view.officeapps.live.com/op/embed.aspx?src=https://dev.transforme.co.id${formState.link_dokumen_bap}`}
                                  title="docx"
                                  width="100%"
                                  height="600px" // Adjust the height as per your requirement
                                  // className="border-0 text-center justify-center padding-left-10"
                                ></iframe>
                              ) : (
                                <p>Ekstensi file tidak didukung</p>
                              )}
                            </div>
                          )}
                          {/* {formState.pdf_file_base64 && (
                                  <div className="">
                                          <embed
                                              src={`${formState.pdf_file_base64}`}
                                              title="pdf"
                                              type="application/pdf"
                                              width="100%"
                                              height="600px" // Adjust the height as per your requirement
                                              className="border-0 text-center justify-center"
                                              // scrolling="no"
                                          />
                                   
                                  </div>
                              )} */}
                        </div>
                      </div>
                      <p className="text-center text-sm text-blue-500">
                        Dokumen terupload !
                      </p>
                      <div
                        // className={`flex justify-center mt-3 ${
                        //   isDetail ? 'block' : 'hidden'
                        // }`}
                        className="flex justify-center mt-3"
                      >
                        {/* <button
                          type="button"
                          onClick={openNewWindow}
                          className="bg-blue-500 px-3 py-1 rounded-xl text-white duration-300 ease-in-out  hover:scale-105 "
                        >
                          Unduh Dokumen
                        </button> */}
                      </div>
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
                <p className="error-text">
                  {errors.map((item) =>
                    item === "link_dokumen_bap" ? "Masukan dokumen sidang" : ""
                  )}
                </p>
              </div>
            </div>
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
                    stroke-width="4"
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
              Tambah Data BAP
            </button>
            {errors.filter((item: string) => item.startsWith("INVALID_ID"))
              .length > 0 && (
              <>
                <br />
                <div className="error">
                  {errors
                    .filter((item: string) => item.startsWith("INVALID_ID"))[0]
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
    </div>
  );
};

export default AddBAP;
