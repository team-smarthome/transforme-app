import Select from "react-select";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import {
  apiReadKasus,
  apiReadPenyidikan,
  apiCreatePenyidikan,
} from "../../services/api";
import { Alerts } from "../Penyidikan/DataPenyidikan/AlertPenyidikan";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";

dayjs.locale("id");
dayjs.extend(utc);
dayjs.extend(timezone);

export const AddPenyidikan = ({
  defaultValue,
  onSubmit,
  // nomorPenyidikan,
  handleNext,
}: any) => {
  const [formState, setFormState] = useState({
    penyidikan_id: "",
    kasus_id: "",
    nomor_penyidikan: defaultValue?.nomor_penyidikan,
    nama_kasus: "",
    agenda_penyidikan: "",
    // waktu_dimulai_penyidikan: dayjs().format('YYYY-MM-DDTHH:mm'),
    // waktu_selesai_penyidikan: dayjs().format('YYYY-MM-DDTHH:mm'),
    waktu_dimulai_penyidikan: "",
    waktu_selesai_penyidikan: "",
    wbp_profile_id: "",
    nomor_kasus: "",
    saksi_id: "",
    oditur_penyidik_id: "",
    nama_jenis_perkara: "",
    nama_kategori_perkara: "",
    nrp_wbp: "",
    zona_waktu: "",
  });

  console.log(defaultValue, "default cuyy");

  console.log(formState, "formstate cuyy");

  const navigate = useNavigate();
  const location = useLocation();

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataKasus, setDataKasus] = useState<any[]>([]);
  const [dataKasusSelect, setDataKasusSelect] = useState<any>();
  const [currentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [nomor, setNomor] = useState("");

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;

  useEffect(() => {
    handleModalAddOpen();
    generateNomorPenyidikan();
    fetchData();
  }, []);

  console.log(token, "token cuyy");

  console.log(data, "data cuyy");

  const handleChangeWaktu = (e: any) => {
    console.log("1213", e);

    const timeZone = dayjs().format("Z");
    let zonaWaktu;
    switch (timeZone) {
      case "+07:00":
        zonaWaktu = "WIB";
        break;
      case "+08:00":
        zonaWaktu = "WITA";
        break;
      case "+09:00":
        zonaWaktu = "WIT";
        break;
      default:
        zonaWaktu = "Zona Waktu Tidak Dikenal";
    }

    setFormState({
      ...formState,
      waktu_dimulai_penyidikan: dayjs(e).format("YYYY-MM-DDTHH:mm"),
      zona_waktu: zonaWaktu,
    });
  };

  console.log(handleChangeWaktu, "waktu mulai");

  const handleChangeWaktuSelesai = (e: any) => {
    try {
      const timeZone = dayjs().format("Z");
      let zonaWaktu;
      switch (timeZone) {
        case "+07:00":
          zonaWaktu = "WIB";
          break;
        case "+08:00":
          zonaWaktu = "WITA";
          break;
        case "+09:00":
          zonaWaktu = "WIT";
          break;
        default:
          zonaWaktu = "Zona Waktu Tidak Dikenal";
      }
      setFormState({
        ...formState,
        waktu_selesai_penyidikan: dayjs(e).format("YYYY-MM-DDTHH:mm"),
        zona_waktu: zonaWaktu,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log("3333", e.target.value);
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
      // const params = {pageSize: Number.MAX_SAFE_INTEGER};
      // const paramsPenyidikan = {filter: ' ', page: 1, pageSize: 10000}
      const kasus = await apiReadKasus(params, token);
      const penyidikan = await apiReadPenyidikan(params, token);
      console.log(kasus, penyidikan, "data kasus dan penyidikan");

      if (penyidikan.data.status !== "OK")
        throw new Error(penyidikan.data.message);

      if (kasus.data.status !== "OK") throw new Error(kasus.data.message);

      const resultPenyidikan = penyidikan.data.records;
      const resultKasus = kasus.data.records;
      const filter = resultKasus.filter(
        (data: any) =>
          !resultPenyidikan.some(
            (dataresult: any) => dataresult.nomor_kasus === data.nomor_kasus
          )
      );

      // console.log(resultPenyidikan, "penyidikan cuyy");
      // console.log(resultKasus, "kasus cuyy");
      setDataKasus(resultKasus);
      setData(resultPenyidikan);
      handleTimeZone();
      // setFormState(filter);
      setIsLoading(false);
    } catch (e: any) {
      handleErrorResponse(e);
      // setIsLoading(false);
      // if (e.response.status === 403) {
      //   navigate('/', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.response.status === 403 ? 'warning' : 'error',
      //   title: e.response.status === 403 ? Error403Message : e.message,
      // });
    }
  };

  const handleErrorResponse = (error: any) => {
    setIsLoading(false);
    const errorMessage =
      error.response.status === 403 ? Error403Message : error.message;
    navigate("/", {
      state: {
        forceLogout: error.response.status === 403,
        lastPage: location.pathname,
      },
    });
    Alerts.fire({
      icon: error.response.status === 403 ? "warning" : "error",
      title: errorMessage,
    });
  };

  const handleTimeZone = () => {
    setIsLoading(false);
    const timeZone = dayjs().format("Z");
    let zonaWaktu;
    switch (timeZone) {
      case "+07:00":
        zonaWaktu = "WIB";
        break;
      case "+08:00":
        zonaWaktu = "WITA";
        break;
      case "+09:00":
        zonaWaktu = "WIT";
        break;
      default:
        zonaWaktu = "Zona Waktu Tidak Dikenal";
    }
    if (!formState?.zona_waktu) {
      setFormState({
        ...formState,
        zona_waktu: zonaWaktu,
      });
    }
  };

  const validateForm = () => {
    let errorFields = [];

    // Validasi elemen Select
    // if (!formState.wbp_profile_id && !formState.saksi_id) {
    //   errorFields.push('pihak_terlibat');
    // }

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== "wbp_profile_id" &&
        key !== "penyidikan_id" &&
        key !== "nrp_wbp" &&
        key !== "no_kasus" &&
        key !== "nomor_kasus" &&
        key !== "saksi_id" &&
        key !== "nomor_penyidikan"
      ) {
        if (!value) {
          errorFields.push(key);
        }
      }

      if (
        (key === "nrp_wbp" ||
          key === "saksi_id" ||
          key === "penyidikan_id" ||
          key === "saksi_id" ||
          key === "wbp_profile_id") &&
        !value
      ) {
        continue;
      }
    }
    if (errorFields.length > 0) {
      console.log(errorFields, "field error");
      setErrors(errorFields);
      return false;
    }
    setErrors([]);
    return true;
  };

  const kasusOptions = dataKasus?.map((item: any) => ({
    value: item.kasus_id,
    label: item.nomor_kasus,
  }));

  // const kasusOptionsValue = {
  //   value: defaultValue?.kasus_id,
  //   label: defaultValue?.nomor_kasus,
  // };

  const onChangeKasus = (e: any) => {
    const kasusFilter: any = dataKasus.find(
      (item: any) => item.kasus_id === e?.value
    );

    const dataSaksi = {
      value: kasusFilter?.saksi[0]?.saksi_id,
      label: `${kasusFilter?.saksi[0]?.nama_saksi} (saksi)`,
    };

    console.log(dataSaksi, "saksi cuyy");

    const dataWbp = {
      value: kasusFilter?.wbp_profile[0]?.wbp_profile_id,
      label: `${kasusFilter?.wbp_profile[0]?.nama} (tersangka)`,
    };

    const splitData: any = [dataSaksi, dataWbp];

    setTerlibatOptionState(splitData);
    setDataKasusSelect(kasusFilter);
    setFormState({
      ...formState,
      kasus_id: e?.value,
      nomor_kasus: kasusFilter ? kasusFilter.nomor_kasus : "",
      nama_kasus: kasusFilter ? kasusFilter.nama_kasus : "",
      nama_jenis_perkara: kasusFilter ? kasusFilter.nama_jenis_perkara : "",
      nama_kategori_perkara: kasusFilter
        ? kasusFilter.nama_kategori_perkara
        : "",
      saksi_id: dataSaksi.value,
      wbp_profile_id: dataWbp.value,
    });
  };

  const terlibatOptions = dataKasusSelect
    ? [
        ...dataKasusSelect?.saksi?.map((item: any) => ({
          value: item.saksi_id,
          label: `${item.nama_saksi} (saksi)`,
        })),

        ...dataKasusSelect?.wbp_profile?.map((item: any) => ({
          value: item.wbp_profile_id,
          label: `${item.nama} (tersangka)`,
        })),
      ]
    : [];

  const [terlibatOptionsState, setTerlibatOptionState] = useState([]);

  // const dataSaksi = {
  //   value: defaultValue.saksi_id,
  //   label: `${defaultValue.nama_saksi} (saksi)`,
  // };

  // const dataWbp = {
  //   value: defaultValue.wbp_profile_id,
  //   label: `${defaultValue.nama_wbp} (tersangka)`,
  // };

  // const splitData: any = [dataSaksi, dataWbp];
  // const terlibatOptionsValue = splitData;

  const handleSelectPihakTerlibat = (selectedOptions: any) => {
    if (selectedOptions && selectedOptions.length > 0) {
      let saksiCount = 0;
      let tersangkaCount = 0;

      // Iterasi melalui opsi yang dipilih untuk menghitung jumlah saksi dan tersangka yang dipilih
      selectedOptions.forEach((option) => {
        if (option.label.includes("(saksi)")) {
          saksiCount++;
        }
        if (option.label.includes("(tersangka)")) {
          tersangkaCount++;
        }
      });

      // Jika jumlah saksi atau tersangka yang dipilih melebihi 1, batalkan pemilihan terakhir
      if (saksiCount > 1 || tersangkaCount > 1) {
        // Menghapus opsi terakhir dari yang dipilih
        selectedOptions.pop();
      }

      // Setel form state dengan nilai yang ditemukan
      setFormState({
        ...formState,
        saksi_id:
          selectedOptions.find((option) => option.label.includes("(saksi)"))
            ?.value || null,
        wbp_profile_id:
          selectedOptions.find((option) => option.label.includes("(tersangka)"))
            ?.value || null,
        // Sesuaikan dengan cara Anda mendapatkan nilai nrp
        nrp: "",
      });
    } else {
      // Reset form state jika tidak ada opsi yang dipilih
      setFormState({
        ...formState,
        saksi_id: null,
        wbp_profile_id: null,
        // Reset nilai nrp jika tidak ada opsi yang dipilih
        nrp: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState, "ada bro");
    if (!validateForm()) return;
    // setButtonLoad(true);

    handleSubmitAdd(formState).then(() => {
      // setButtonLoad(false);
      setFormState({
        penyidikan_id: "",
        kasus_id: "",
        nomor_penyidikan: "",
        nama_kasus: "",
        agenda_penyidikan: "",
        waktu_dimulai_penyidikan: "",
        waktu_selesai_penyidikan: "",
        wbp_profile_id: "",
        nomor_kasus: "",
        saksi_id: "",
        oditur_penyidik_id: "",
        nama_jenis_perkara: "",
        nama_kategori_perkara: "",
        nrp_wbp: "",
        zona_waktu: "",
      });
    });
  };

  const handleSubmitAdd = async (params: any) => {
    console.log("DATA DARI LIST", params);
    try {
      const responseCreate = await apiCreatePenyidikan(params, token);
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
        navigate("/", {
          state: { forceLogout: true, lastPage: location.pathname },
        });
      }
      Alerts.fire({
        icon: "warning",
        title: e.response.status === 403 ? Error403Message : e.message,
      });
    }
  };

  const selectedKasus = dataKasus?.find(
    (item: any) => item.kasus_id === formState.kasus_id
  );

  const penyidikOptions: any = selectedKasus
    ? selectedKasus?.oditur_penyidik?.map((item: any) => ({
        value: item.oditur_penyidik_id,
        label: item.nama_oditur,
      }))
    : [];

  const penyidikOptionsValue = {
    value: defaultValue?.oditur_penyidik_id,
    label: defaultValue?.nama_oditur,
  };

  const onChangePenyidik = (e: any) => {
    setFormState({ ...formState, oditur_penyidik_id: e.value });
  };

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided: any) => ({
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
      height: "35px",
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
      fontSize: "16px",
      color: "grey",
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
      fontSize: "16px",
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

  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );

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
    const type = "Sp.Sidik";
    const day = dayjs(new Date()).format("DD");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear().toString();
    const lokasi = "Otmil";
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;

    data.forEach((item: any) => {
      if (item.nomor_penyidikan) {
        const nomorPenyidikan = item.nomor_penyidikan.split("/")[0]; // Get the first part of the case number
        const angka = parseInt(nomorPenyidikan, 10);

        if (!isNaN(angka) && item.nomor_penyidikan.includes(currentDate)) {
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
      nomor_penyidikan: `${angkaTerbesar}/${type}/${currentDate}/${lokasi}`,
    });

    // setModalAddOpen(true);
  };

  const generateNomorPenyidikan = async () => {
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
    const type = "Sp.Sidik";
    const day = dayjs(new Date()).format("DD");
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const year = new Date().getFullYear().toString();
    const lokasi = "Otmil";
    const romanNumber = convertToRoman(parseInt(month));
    const currentDate = `${day}-${romanNumber}/${year}`;
    let angkaTerbesar = 0;
    const penyidikan = await apiReadPenyidikan({}, token);
    const resultPenyidikan = penyidikan.data.records;
    resultPenyidikan.forEach((item: any) => {
      if (item.nomor_penyidikan) {
        const nomorPenyidikan = item.nomor_penyidikan.split("/")[0]; // Get the first part of the case number
        const angka = parseInt(nomorPenyidikan, 10);

        if (!isNaN(angka) && item.nomor_penyidikan.includes(currentDate)) {
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
    const output = `${angkaTerbesar}/${type}/${currentDate}/${lokasi}`;
    console.log(output, "outputnya");
    setNomor(output);
  };

  return (
    <div className="bg-slate-600 w-full h-full flex flex-col gap-10 p-8 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="form-group w-full h-22 mt-4">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Nomor Penyidikan
            </label>
            <input
              className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nomor"
              name="nomor_penyidikan"
              onChange={handleChange}
              value={formState.nomor_penyidikan}
              disabled
            />
            <p className="error-text">
              {errors?.map((item) =>
                item === "nomor_penyidikan" ? "Masukan Nomor Penyidikan" : ""
              )}
            </p>
          </div>
          <div className="form-group h-22 mt-4 w-full">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Nomor Kasus
            </label>
            <Select
              placeholder="Nomor Kasus"
              //   isDisabled={isDetail}
              onChange={onChangeKasus}
              // defaultValue={kasusOptionsValue}
              options={kasusOptions}
              styles={customStyles}
              id="p-kasus"
            />
            <p className="error-text">
              {errors?.map((item) =>
                item === "kasus_id" ? "Masukan Nomor Kasus" : ""
              )}
            </p>
          </div>
          <div className="form-group w-full h-22">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Nama Kasus
            </label>
            <input
              className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nama"
              name="nama_kasus"
              placeholder="Nama Kasus"
              onChange={handleChange}
              value={formState.nama_kasus}
              // disabled={isDetail}
              disabled
            />
            <p className="error-text">
              {errors?.map((item) =>
                item === "nama_kasus" ? "Masukan Nama Kasus" : ""
              )}
            </p>
          </div>
          <div className="form-group w-full h-22">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Jenis Perkara
            </label>
            <input
              className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-perkara"
              name="nama_jenis_perkara"
              placeholder="Jenis Perkara"
              onChange={handleChange}
              value={formState.nama_jenis_perkara}
              // disabled={isDetail}
              disabled
            />
            <p className="error-text">
              {errors?.map((item) =>
                item === "nama_jenis_perkara" ? "Masukan Jenis Perkara" : ""
              )}
            </p>
          </div>
          <div className="form-group w-full h-22">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Kategori Perkara
            </label>
            <input
              className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-kategori"
              name="nama_kategori_perkara"
              placeholder="Kategori Perkara"
              onChange={handleChange}
              value={formState.nama_kategori_perkara}
              // disabled={isDetail}
              disabled
            />
            <p className="error-text">
              {errors?.map((item) =>
                item === "nama_kategori_perkara"
                  ? "Masukan Kategori Perkara"
                  : ""
              )}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="form-group w-full h-22">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Pihak Terlibat
            </label>
            <Select
              isMulti
              className="capitalize"
              options={terlibatOptions}
              isDisabled={true}
              // defaultValue={terlibatOptionsValue}
              value={terlibatOptionsState.map((data: any) => ({
                label: data.label,
                value: data.value,
              }))}
              onChange={handleSelectPihakTerlibat}
              placeholder="Pihak Terlibat"
              styles={customStyles}
              id="p-terlibat"
            />
            <p className="error-text">
              {errors.map((item) =>
                item === "kasus_id" ? "Masukan Tersangka" : ""
              )}
            </p>
          </div>
        </div>

        <div className="form-group w-full h-22">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Penyidik
          </label>
          <Select
            onChange={onChangePenyidik}
            // isDisabled={isDetail}
            // defaultValue={penyidikOptionsValue}
            options={penyidikOptions}
            placeholder="Penyidik"
            styles={customStyles}
            id="p-penyidikan"
          />
          <p className="error-text">
            {errors?.map((item) =>
              item === "oditur_penyidik_id" ? "Pilih Penyidik" : ""
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="form-group w-full">
            <label
              className=" block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Waktu Mulai Penyidikan
            </label>

            <div className="flex items-center justify-start">
              <DatePicker
                selected={
                  formState.waktu_dimulai_penyidikan
                    ? dayjs(formState.waktu_dimulai_penyidikan).toDate()
                    : dayjs().toDate()
                }
                onChange={handleChangeWaktu}
                dateFormat="dd/MM/yyyy HH:mm"
                timeCaption="Pilih Waktu"
                showTimeInput
                name="waktu_dimulai_penyidikan"
                timeInputLabel="Waktu"
                timeFormat="HH:mm"
                disabled={false}
                customTimeInput={<ExampleCustomTimeInput />}
                className="w-[30rem] rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                locale="id"
              />

              <input
                type="text"
                value={formState.zona_waktu}
                disabled
                className="w-20 text-center flex justify-center capitalize rounded border border-stroke p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              />
            </div>
            <p className="error-text">
              {formSubmitted &&
                errors.includes("waktu_dimulai_penyidikan") &&
                "Masukan Waktu Mulai Penyidikan"}
            </p>
          </div>
          <div className="form-group w-full h-22">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Waktu Selesai Penyidikan
            </label>

            <div className="flex items-center justify-start">
              <DatePicker
                selected={
                  formState.waktu_selesai_penyidikan
                    ? dayjs(formState.waktu_selesai_penyidikan).toDate()
                    : dayjs().toDate()
                }
                onChange={(date) => handleChangeWaktuSelesai(date)}
                dateFormat="dd/MM/yyyy HH:mm"
                timeCaption="Pilih Waktu" // Ganti dengan caption waktu yang diinginkan
                showTimeInput
                timeInputLabel="Waktu" // Ganti dengan label waktu yang diinginkan
                timeFormat="HH:mm" // Ganti dengan format waktu yang diinginkan
                disabled={false} // Ganti dengan kondisi yang sesuai
                customTimeInput={<ExampleCustomTimeInput />}
                className="w-[30rem] rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                locale="id"
                name="waktu_selesai_penyidikan"
              />
              <input
                type="text"
                value={formState.zona_waktu}
                disabled
                className="w-20 text-center flex justify-center capitalize rounded border border-stroke p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              />
            </div>
            <p className="error-text">
              {formSubmitted &&
                errors.includes("waktu_selesai_penyidikan") &&
                "Masukan Waktu Selesai Penyidikan"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div className="form-group w-full h-29 relative">
            <label
              className="  block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Agenda Penyidikan
            </label>
            <textarea
              className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-agenda"
              name="agenda_penyidikan"
              id="textArea"
              placeholder="Agenda Penyidikan"
              onChange={handleChange}
              value={formState.agenda_penyidikan}
              // disabled={isDetail}
            />
            <p className="error-text absolute bottom-1">
              {errors?.map((item) =>
                item === "agenda_penyidikan" ? "Masukan Alasan Penyidikan" : ""
              )}
            </p>
          </div>
        </div>

        <button
          className={
            "items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          }
          type="submit"
          disabled={buttonLoad}
          // id="b-tambah"
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
          Tambah Data Penyidikan
        </button>

        {errors.filter((item: string) => item.startsWith("INVALID_ID")).length >
          0 && (
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
            <p className="text-red-400">Ada data yang masih belum terisi !</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPenyidikan;
