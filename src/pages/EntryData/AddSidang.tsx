import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { Alerts } from "../../pages/DaftarSidangPerkara/AlertSidang";
import { Error403Message } from "../../utils/constants";
import {
  apiAhliRead,
  apiHakimRead,
  apiJaksaRead,
  apiJenisSidangRead,
  apiKasusRead,
  apiPengadilanMiliterRead,
  apiReadAllRole,
  apiReadAllStaff,
  apiReadAllUser,
  apiReadAllWBP,
  apiReadJaksapenuntut,
  apiReadSaksi,
  apiSidangInsert,
} from "../../services/api";
import { set } from "react-hook-form";

interface AddSidangProps {
  defaultValue?: any;
  token: string;
  // onSubmit : (params)
}

const AddSidang = ({ handleNext }: any) => {
  const [formState, setFormState] = useState({
    waktu_mulai_sidang: "",
    waktu_selesai_sidang: "",
    jadwal_sidang: "",
    perubahan_jadwal_sidang: "",
    kasus_id: "",
    nama_kasus: "",
    nomor_kasus: "",
    masa_tahanan_tahun: "",
    masa_tahanan_bulan: "",
    masa_tahanan_hari: "",
    nama_sidang: "",
    wbp_profile: [],
    juru_sita: "",
    hasil_keputusan_sidang: "",
    pengawas_peradilan_militer: "",
    jenis_persidangan_id: "",
    pengadilan_militer_id: "",
    nama_dokumen_persidangan: "",
    link_dokumen_persidangan: "",
    hasil_vonis: "",
    ahli: [],
    agenda_sidang: "",
    saksi: [],
    pengacara: [],
    oditur_penuntut_id: [],
    // nama_oditur: null,
    role_ketua_oditur: {},
    zona_waktu: "",
  });
  console.log(formState, "data sidang");

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pengacaraEror, setPengacaraEror] = useState(false);
  const [jenisSidang, setJenisSidang] = useState([]);
  const [jaksa, setJaksa] = useState([]);
  const [pengadilanMiliter, setPengadilanMiliter] = useState([]);
  const [ahli, setAhli] = useState([]);
  const [saksi, setSaksi] = useState([]);
  const [kasus, setKasus] = useState([]);
  const [getSaksi, setGetSaksi] = useState([]);
  const [getWbp, setGetWbp] = useState([]);
  const [file, setFile] = useState(null);
  const [pengacaraField, setPengacaraField] = useState("");
  const [errors, setErrors] = useState([]);

  const getAllJenisSidang = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiJenisSidangRead(params, token);
      console.log(response, "jenis sidang");
      const data = response.data.records;
      const uniqueData: any[] = [];
      const trackedNames: any[] = [];

      data.forEach((item: any) => {
        if (!trackedNames.includes(item.nama_jenis_persidangan)) {
          trackedNames.push(item.nama_jenis_persidangan);
          uniqueData.push(item);
        }
      });
      setJenisSidang(uniqueData);
      console.log("uniq", uniqueData);
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

  const getAllJaksaPenuntut = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };

    try {
      const response = await apiReadJaksapenuntut(params, token);
      setJaksa(response.data.records);
      // console.log('JAKSA', response.data.records);
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

  const getAllPengadilanMiliter = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiPengadilanMiliterRead(params, token);
      setPengadilanMiliter(response.data.records);
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

  const getAllAhli = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiAhliRead(params, token);
      console.log("ahli", response.data.records);
      setAhli(response.data.records);
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

  // const getAllSaksi = async () => {
  //   let params = {
  //     filter: '',
  //     pageSize: 1000,
  //   }
  //   try {
  //     const response = await apiReadSaksi(params, token);
  //     // setSaksi(response.data.records);
  //   } catch (e: any) {
  //     if (e.response.status === 403) {
  //       navigate('/', {
  //         state: { forceLogout: true, lastPage: location.pathname},
  //       });
  //     }
  //     Alerts.fire({
  //       icon: e.response.status === 403 ? 'warning' : 'error',
  //       title: e.response.status === 403 ? Error403Message : e.message,
  //     });
  //   }
  // }

  const getAllKasus = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiKasusRead(params, token);
      setKasus(response.data.records);
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

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleJenisPersidangan = (e: any) => {
    console.log(e, "Jenis Sidang");
    setFormState({ ...formState, jenis_persidangan_id: e?.value });
  };

  const handleSelectJaksa = (e: any) => {
    console.log("jaksa", e);
    let arrayTemp: any = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, oditur_penuntut_id: arrayTemp });
  };

  const handleSelectKetuaJaksa = (e: any) => {
    console.log(e, "dapet");
    setFormState({ ...formState, role_ketua_oditur: e?.value });
  };

  const handleKasus = async (selectedOption: any) => {
    if (selectedOption) {
      setFormState({ ...formState, kasus_id: selectedOption.value });
      const saksiFilter = kasus.filter(
        (item: any) => item.kasus_id === selectedOption.value
      )[0];
      console.log(saksiFilter, "saksiFilter");
      if (saksiFilter) {
        // const saksiMap = saksiFilter.saksi.map((item: any) => ({
        //   label: item.nama_saksi,
        //   value: item.saksi_id,
        // }));
        const getSaksiId = saksiFilter.saksi.map((item: any) => item.saksi_id);
        const getWBPId = saksiFilter.wbp_profile.map(
          (item: any) => item.wbp_profile_id
        );
        console.log(getSaksiId, "getSaksiId");
        setGetSaksi(saksiFilter?.saksi);
        setGetWbp(saksiFilter?.wbp_profile);
        setFormState({
          ...formState,
          nomor_kasus: saksiFilter.nomor_kasus,
          kasus_id: saksiFilter.kasus_id,
          nama_kasus: saksiFilter.nama_kasus,
          saksi: getSaksiId,
          wbp_profile: getWBPId,
        });
        console.log("getSaksi", getSaksi);
      } else {
        setGetSaksi([]); // Set getSaksi to an empty array if no matching kasus is found
      }
    } else {
      setFormState({ ...formState, kasus_id: "" });
      setGetSaksi([]);
    }
  };

  const handlePengadilanMiliter = (e: any) => {
    setFormState({ ...formState, pengadilan_militer_id: e?.value });
  };

  const handleSelectAhli = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }
    setFormState({ ...formState, ahli: arrayTemp });
  };

  const handleSelectSaksi = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, saksi: arrayTemp });
  };

  useEffect(() => {
    setFormState({
      ...formState,
      role_ketua_oditur:
        formState?.role_ketua_oditur_holder?.oditur_penuntut_id,
    });
  }, []);

  // useEffect(() => {
  //   console.log('holder', jaksa);
  //   // console.log('jaksa filter', jaksa.filter((item) => formState.oditur_penuntut_id.includes(item.oditur_penuntut_id)));
  //   // console.log("jaksa", formState.oditur_penuntut_id)
  //   // const jaksaMap = formState.oditur_penuntut_id.map((item: any) => item.oditur_penuntut_id);
  //   const ahliMap = formState.ahli.map((item: any) => item.ahli_id);
  //   // const saksiMap = formState.saksiHolder.map((item: any) => item.saksi_id);
  //   // const hakimMap = formState.hakimHolder.map((item: any) => item.hakim_id);
  //   setFormState({
  //       ...formState,
  //       // hakim_id: hakimMap,
  //       // oditur_penuntut_id: jaksaMap,
  //       // role_ketua_oditur:
  //       //     formState?.role_ketua_oditur_holder?.oditur_penuntut_id,x
  //       ahli: ahliMap
  //       // saksi: saksiMap,
  //   });
  // }, []);

  const handleJadwalSidang = (e: any) => {
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
      jadwal_sidang: dayjs(e).format("YYYY-MM-DDTHH:mm"),
      zona_waktu: zonaWaktu,
    });
  };

  const handlePerubahanJadwal = (e: any) => {
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
      perubahan_jadwal_sidang: dayjs(e).format("YYYY-MM-DDTHH:mm"),
      zona_waktu: zonaWaktu,
    });
  };

  const handleWaktuMulai = (e: any) => {
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
      waktu_mulai_sidang: dayjs(e).format("YYYY-MM-DDTHH:mm"),
      zona_waktu: zonaWaktu,
    });
  };

  const handleWaktuSelesai = (e: any) => {
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
      waktu_selesai_sidang: dayjs(e).format("YYYY-MM-DDTHH:mm"),
      zona_waktu: zonaWaktu,
    });
  };

  const getTimeZone = () => {
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

  useEffect(() => {
    Promise.all([
      getTimeZone(),
      getAllJenisSidang(),
      getAllJaksaPenuntut(),
      getAllPengadilanMiliter(),
      getAllAhli(),
      // getAllSaksi(),
      getAllKasus(),
    ]).then(() => setIsLoading(false));
  }, []);

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
  const validateForm = () => {
    let errorFields: any = [];

    for (const [key, value] of Object.entries(formState)) {
      if (
        key !== "lokasi_lemasmil_id" &&
        key !== "last_login" &&
        key !== "nama_lokasi_lemasmil" &&
        key !== "image" &&
        // key !== 'pengacara' &&
        key !== "jadwal_sidang" &&
        key !== "perubahan_jadwal_sidang" &&
        key !== "waktu_mulai_sidang" &&
        key !== "waktu_selesai_sidang" &&
        // key !== 'hasil_keputusan_sidang' &&
        key !== "provinsi_id" &&
        key !== "nama_provinsi" &&
        key !== "nama_kota" &&
        key !== "nama_pengadilan_militer"

        // Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
        // || key === 'saksi' && Array.isArray(value) && value.length === 0
      ) {
        if (
          !value ||
          // (key === 'hakim_id' && Array.isArray(value) && value.length === 0) ||
          (key === "jaksa_penuntut_id" &&
            Array.isArray(value) &&
            value.length === 0) ||
          (key === "oditur_penuntut_id" &&
            Array.isArray(value) &&
            value.length === 0) ||
          (key === "wbp_profile" &&
            Array.isArray(value) &&
            value.length === 0) ||
          (key === "ahli" && Array.isArray(value) && value.length === 0) ||
          (key === "saksi" && Array.isArray(value) && value.length === 0) ||
          (key === "pengacara" && Array.isArray(value) && value.length === 0)
        ) {
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
    if (!validateForm()) return;
    handleSubmitAddUser(formState);
    setAhli([]);
    setGetWbp([]);
    setGetSaksi([]);
    setFormState({
      ...formState,
      waktu_mulai_sidang: "",
      waktu_selesai_sidang: "",
      jadwal_sidang: "",
      perubahan_jadwal_sidang: "",
      kasus_id: "",
      nama_kasus: "",
      nomor_kasus: "",
      masa_tahanan_tahun: "",
      masa_tahanan_bulan: "",
      masa_tahanan_hari: "",
      nama_sidang: "",
      wbp_profile: [],
      juru_sita: "",
      hasil_keputusan_sidang: "",
      pengawas_peradilan_militer: "",
      jenis_persidangan_id: "",
      pengadilan_militer_id: "",
      nama_dokumen_persidangan: "",
      link_dokumen_persidangan: "",
      hasil_vonis: "",
      ahli: [],
      agenda_sidang: "",
      saksi: [],
      pengacara: [],
      oditur_penuntut_id: [],
      role_ketua_oditur: {},
      zona_waktu: "",
    });

    console.log(handleSubmitAddUser, "handleadd");
  };
  const handleUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      // const reader = new FileReader();

      // reader.onloadend = () => {
      //   setFormState({ ...formState, pdf_file_base64: reader.result });
      //   console.log("Preview:", reader.result);
      // };

      // reader.readAsDataURL(file);
      setFormState({ ...formState, link_dokumen_persidangan: file });
    }
  };
  const handleRemoveDoc = () => {
    setFormState({ ...formState, link_dokumen_persidangan: "" });
    const inputElement = document.getElementById(
      "fileUpload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };
  const handleDownloadDoc = () => {
    // const url = `/proxy?url=https://dev.transforme.co.id${formState.link_dokumen_persidangan}`; // Ganti dengan URL file yang ingin Anda unduh

    // fetch(url)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const blobUrl = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     const filename: any = url.split('/').pop();
    //     a.href = blobUrl;
    //     a.download = `${formState.nama_dokumen_persidangan}-${filename}`; // Ganti dengan nama file yang Anda inginkan
    //     a.style.display = 'none';
    //     document.body.appendChild(a);
    //     a.click();
    //     // document.body.removeChild(a);
    //     window.URL.revokeObjectURL(blobUrl);
    //   })
    //   .catch((error) => {
    //     console.error('Gagal mengunduh file:', error);
    //   });
    window.open(
      `https://dev.transforme.co.id${formState.link_dokumen_persidangan}`,
      "_blank"
    );
  };
  const handleInputPengacara = (e: any) => {
    const newValue = e.target.value;
    // setFormState({ ...formState, pengacara: newValue });
    setPengacaraField(newValue);
  };

  const handlePengacara = () => {
    if (!pengacaraField) {
      setPengacaraEror(true);
    } else {
      if (pengacaraField.trim() !== "") {
        setPengacaraEror(false);
        setFormState({
          ...formState,
          pengacara: [...formState.pengacara, pengacaraField],
        });
        setPengacaraField("");
      }
    }
  };
  const handleRemovePengacara = (index: any) => {
    const newArrayPasal = formState.pengacara.filter(
      (_: any, i: any) => i !== index
    );
    setFormState({
      ...formState,
      pengacara: newArrayPasal,
    });
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
        handleNext();
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
  return (
    <div className="px-10">
      <div className="bg-slate-500 p-5 shadow-xl rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama Sidang
                </label>
                <select
                  className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                  name="nama_sidang"
                  onChange={handleChange}
                  value={formState.nama_sidang}
                >
                  <option value="">Pilih tahap sidang </option>
                  <option value="Tahap Pertama">Tahap Pertama</option>
                  <option value="Tahap Pertama">Tahap Kedua</option>
                  <option value="Tahap Pertama">Tahap Ketiga</option>
                </select>
                <p className="error-text">
                  {errors.map((item) =>
                    item === "nama_sidang" ? "Pilih nama sidang" : ""
                  )}
                </p>
              </div>
              <div className="">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Pilih Jenis Sidang
                </label>
                <Select
                  className="basic-single p-jenis"
                  name="jenis_persidangan_id"
                  isClearable={true}
                  isSearchable={true}
                  placeholder="Pilih jenis sidang"
                  styles={customStyles}
                  // value={formState.jenis_persidangan_id
                  //     ? {
                  //         value: formState.jenis_persidangan_id,
                  //         label: formState.nama_jenis_persidangan,
                  //       }
                  //     : ''
                  // }
                  options={jenisSidang.map((item: any) => ({
                    value: item.jenis_persidangan_id,
                    label: item.nama_jenis_persidangan,
                  }))}
                  onChange={handleJenisPersidangan}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "jenis_persidangan_id" ? "Pilih jenis sidang" : ""
                  )}
                </p>
              </div>
            </div>
            {/* oditur */}
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Anggota Oditur Penuntut
              </label>
              <Select
                className="basic-multi-select p-anggota"
                isMulti
                classNamePrefix="select"
                defaultValue={formState.oditur_penuntut_id.map((item: any) => ({
                  value: item.oditur_penuntut_id,
                  label: item.nama_oditur,
                }))}
                placeholder={"Pilih oditur penuntut"}
                isClearable={true}
                isSearchable={true}
                name="oditur_penuntut_id"
                styles={customStyles}
                options={jaksa.map((item: any) => ({
                  value: item.oditur_penuntut_id,
                  label: item.nama_oditur,
                }))}
                onChange={handleSelectJaksa}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "oditur_penuntut_id" ? "Pilih oditur penuntut" : ""
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Ketua Oditur
                </label>
                <Select
                  className="basic-multi-select p-anggota"
                  // isMulti
                  classNamePrefix="select"
                  defaultValue={
                    formState.role_ketua_oditur
                      ? {
                          value: formState.role_ketua_oditur,
                          label: formState.nama_oditur,
                        }
                      : formState.role_ketua_oditur
                  }
                  placeholder={"Pilih oditur penuntut"}
                  isClearable={true}
                  isSearchable={true}
                  name="oditur_penuntut_id"
                  styles={customStyles}
                  options={jaksa
                    .filter(
                      (item) =>
                        formState?.oditur_penuntut_id?.includes(
                          item.oditur_penuntut_id
                        )
                    )

                    .map((item: any) => ({
                      value: item.oditur_penuntut_id,
                      label: item.nama_oditur,
                    }))}
                  onChange={handleSelectKetuaJaksa}
                />

                <p className="error-text">
                  {errors.map((item) =>
                    item === "oditur_penuntut_id" ? "Pilih ketua oditur" : ""
                  )}
                </p>
              </div>
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Kasus
                </label>
                <Select
                  className="basic-single p-kasus"
                  classNamePrefix="select"
                  value={
                    formState.kasus_id
                      ? {
                          value: formState.kasus_id,
                          label: formState.nama_kasus,
                        }
                      : formState.kasus_id
                  }
                  placeholder={"Pilih kasus"}
                  isClearable={true}
                  isSearchable={true}
                  // isDisabled={isDetail}
                  name="kasus_id"
                  styles={customStyles}
                  options={kasus.map((item: any) => ({
                    value: item.kasus_id,
                    label: item.nama_kasus,
                  }))}
                  onChange={handleKasus}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "kasus_id" ? "Pilih kasus" : ""
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nomor Kasus
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                  onChange={handleChange}
                  placeholder="Nomor kasus"
                  name="nomor_kasus"
                  value={formState?.nomor_kasus}
                  disabled
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "nomor_kasus" ? "Masukan nomor kasus" : ""
                  )}
                </p>
              </div>
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Pengadilan Militer
                </label>
                <Select
                  className="basic-single p-kasus"
                  classNamePrefix="select"
                  // value = {
                  //   formState.pengadilan_militer_id
                  //   ? {
                  //       value: formState.pengadilan_militer_id,
                  //       label: formState.nama_pengadilan_militer
                  //   }
                  //   : formState.pengadilan_militer_id
                  // }
                  placeholder={"Pilih pengadilan militer"}
                  isClearable={true}
                  isSearchable={true}
                  name="pengadilan_militer_id"
                  styles={customStyles}
                  options={pengadilanMiliter.map((item: any) => ({
                    value: item.pengadilan_militer_id,
                    label: item.nama_pengadilan_militer,
                  }))}
                  onChange={handlePengadilanMiliter}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "pengadilan_militer_id"
                      ? "Pilih pengadilan militer"
                      : ""
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Juru Sita
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                  onChange={handleChange}
                  placeholder="Juru sita"
                  name="juru_sita"
                  value={formState?.juru_sita}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "juru_sita" ? "Masukan Juru Sita" : ""
                  )}
                </p>
              </div>
              <div className="form-group w-full ">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Pengawas Peradilan Militer
                </label>
                <input
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                  onChange={handleChange}
                  placeholder="Pengawas peradilan militer"
                  name="pengawas_peradilan_militer"
                  value={formState.pengawas_peradilan_militer}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "pengawas_peradilan_militer"
                      ? "Masukan pengawas"
                      : ""
                  )}
                </p>
              </div>
            </div>
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Agenda Sidang
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-agenda"
                onChange={handleChange}
                placeholder="Agenda sidang"
                name="agenda_sidang"
                value={formState.agenda_sidang}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "agenda_sidang" ? "Masukan agenda sidang" : ""
                )}
              </p>
            </div>
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Hasil Keputusan Sidang
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-agenda"
                onChange={handleChange}
                placeholder="Hasil keputusan sidang"
                name="hasil_keputusan_sidang"
                value={formState.hasil_keputusan_sidang}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "hasil_keputusan_sidang"
                    ? "Masukan hasil keputusan sidang"
                    : ""
                )}
              </p>
            </div>
            {/* jadwal sidang */}
            <div className="grid grid-cols-4 gap-4 justify-normal">
              <div className="form-group w-full ">
                <label
                  htmlFor="id"
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                >
                  Jadwal Sidang
                </label>
                <div className="flex flex-row">
                  <DatePicker
                    selected={
                      formState.jadwal_sidang
                        ? dayjs(formState.jadwal_sidang).toDate()
                        : dayjs().toDate()
                    }
                    onChange={handleJadwalSidang}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="Pilih Waktu"
                    dateFormat="dd/MM/yyyy HH:mm"
                    // customInput={<ExampleCustomTimeInput />}
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                    name="jadwal_sidang"
                    disabled={false}
                    locale="id"
                  />
                  <input
                    type="text"
                    className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                    name="zona_waktu"
                    value={formState.zona_waktu}
                    disabled
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "jadwal_sidang" ? "Masukan jadwal sidang" : ""
                    )}
                  </p>
                </div>
              </div>
              {/* perubahan jadwal sidang */}
              <div className="form-group w-full ">
                <label
                  htmlFor="id"
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                >
                  Perubahan Jadwal Sidang
                </label>
                <div className="flex flex-row">
                  <DatePicker
                    selected={
                      formState.perubahan_jadwal_sidang
                        ? dayjs(formState.perubahan_jadwal_sidang).toDate()
                        : dayjs().toDate()
                    }
                    onChange={handlePerubahanJadwal}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="Pilih Waktu"
                    dateFormat="dd/MM/yyyy HH:mm"
                    // customInput={<ExampleCustomTimeInput />}
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                    name="perubahan_jadwal_sidang"
                    disabled={false}
                    locale="id"
                  />
                  <input
                    type="text"
                    className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                    name="zona_waktu"
                    value={formState.zona_waktu}
                    disabled
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "jadwal_sidang" ? "Masukan jadwal sidang" : ""
                    )}
                  </p>
                </div>
              </div>
              {/* Waktu Mulai */}
              <div className="form-group w-full ">
                <label
                  htmlFor="id"
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                >
                  Waktu Mulai
                </label>
                <div className="flex flex-row">
                  <DatePicker
                    selected={
                      formState.waktu_mulai_sidang
                        ? dayjs(formState.waktu_mulai_sidang).toDate()
                        : dayjs().toDate()
                    }
                    onChange={handleWaktuMulai}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="Pilih Waktu"
                    dateFormat="dd/MM/yyyy HH:mm"
                    // customInput={<ExampleCustomTimeInput />}
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                    name="waktu_mulai_sidang"
                    disabled={false}
                    locale="id"
                  />
                  <input
                    type="text"
                    className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                    name="zona_waktu"
                    value={formState.zona_waktu}
                    disabled
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "waktu_mulai" ? "Masukan jadwal sidang" : ""
                    )}
                  </p>
                </div>
              </div>
              {/* waktu selesai */}
              <div className="form-group w-full ">
                <label
                  htmlFor="id"
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                >
                  Waktu Selesai
                </label>
                <div className="flex flex-row">
                  <DatePicker
                    selected={
                      formState.waktu_selesai_sidang
                        ? dayjs(formState.waktu_selesai_sidang).toDate()
                        : dayjs().toDate()
                    }
                    onChange={handleWaktuSelesai}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="Pilih Waktu"
                    dateFormat="dd/MM/yyyy HH:mm"
                    // customInput={<ExampleCustomTimeInput />}
                    className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                    name="waktu_selesai_sidang"
                    disabled={false}
                    locale="id"
                  />
                  <input
                    type="text"
                    className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                    name="zona_waktu"
                    value={formState.zona_waktu}
                    disabled
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "waktu_selesai_sidang"
                        ? "Masukan tanggal selesai"
                        : ""
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* WBP */}
            <div className="form-group w-full ">
              <label
                className="block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                WBP
              </label>
              <Select
                className="basic-multi-select s-wbp"
                isMulti
                classNamePrefix="select"
                // defaultValue={
                //   isEdit || isDetail
                //     ? formState.wbpHolder.map((item: any) => ({
                //         value: item.wbp_profile_id,
                //         label: item.nama,
                //       }))
                //     : formState.wbp_profile_id
                // }
                // value={
                //   isEdit || isDetail
                //   ? formState.wbpHolder.map((item: any) => ({
                //     value: item.wbp_profile_id,
                //     label: item.nama,
                //   }))
                //   : getWbp.map((item: any) => ({
                //     value: item.value,
                //     label: item.label,
                //   }))
                // }
                value={getWbp.map((item: any) => ({
                  value: item.value,
                  label: item.nama,
                }))}
                placeholder={"Pilih wbp"}
                isClearable={true}
                isSearchable={true}
                isDisabled={true}
                name="wbp_profile"
                styles={customStyles}
                // options={wbp.map((item: any) => ({
                //   value: item.wbp_profile_id,
                //   label: item.nama,
                // }))}
                // onChange={handleSelectWbp}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "wbp_profile" ? "Pilih wbp" : ""
                )}
              </p>
            </div>
            {/* <div className="grid grid-cols-2 gap-4 justify-normal"> */}
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Ahli
              </label>
              <Select
                className="basic-select p-ketua"
                classNamePrefix="select"
                placeholder={"Pilih ahli"}
                isClearable={true}
                isSearchable={true}
                defaultValue={formState.ahli.map((item: any) => ({
                  value: item.ahli_id,
                  label: item.nama_ahli + " " + "(" + item.bidang_ahli + ")",
                }))}
                onChange={handleSelectAhli}
                name="ahli_id"
                styles={customStyles}
                options={ahli.map((item: any) => ({
                  value: item.ahli_id,
                  label: item.nama_ahli + " " + "(" + item.bidang_ahli + ")",
                }))}
                isMulti
              />
              <p className="error-text">
                {errors.map((item) => (item === "ahli" ? "Pilih ahli" : ""))}
              </p>
            </div>
            <div className="form-group w-full ">
              <label
                className="block mb-1 text-base font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Saksi
              </label>
              <Select
                className="basic-single p-kasus"
                classNamePrefix="select"
                // defaultValue={
                //   formState.ahli.map((item: any) => ({
                //     value: item.saksi_id,
                //     label: item.nama_saksi,
                //   }))
                // }
                placeholder={"Pilih saksi"}
                isClearable={false}
                isSearchable={false}
                isMulti
                isDisabled
                name="saksi_id"
                styles={customStyles}
                value={getSaksi.map((item: any) => ({
                  value: item.saksi_id,
                  label: item.nama_saksi,
                }))}
                onChange={handleSelectSaksi}
              />
              <p className="error-text">
                {errors.map((item) => (item === "saksi" ? "Pilih saksi" : ""))}
              </p>
            </div>
            {/* </div> */}
            <div className="">
              {/* <div className="flex -items-center block mb-1 text-base font-medium text-black dark:text-white">
                    Pengacara
                  </div> */}
              <div className="flex items-center">
                <div className="flex items-center">
                  <p className="text-white">Pengacara</p>
                  <p
                    className={`${
                      pengacaraEror ? "block" : "hidden"
                    } ml-4 text-red-400 text-sm`}
                  >
                    Masukan nama pengacara
                  </p>
                </div>
              </div>
              <div className="border-[1px] border-blue-500 rounded-md p-2">
                <div className="flex flex-row gap-2">
                  <input
                    type="text"
                    // placeholder="Masukan Pengacara"
                    className="w-full rounded border border-stroke  dark:bg-slate-800 py-3 pl-3 pr-4.5 text-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    onChange={handleInputPengacara}
                    value={pengacaraField}
                  />
                  <button
                    className="py-3 px-3 rounded-md bg-blue-500"
                    onClick={handlePengacara}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <p className="error-text">
                  {errors.map((item) =>
                    item === "pengacara" ? "Tambahkan pengacara" : ""
                  )}
                </p>
                <div
                  className={`mt-2 flex flex-col overflow-hidden gap-2 ${
                    formState.pengacara?.length === 0 ? "hidden" : "block"
                  }`}
                >
                  {formState.pengacara?.map((item: any, index: any) => (
                    <div className="flex flex-row items-center">
                      <p
                        key={index}
                        className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                      >
                        {item}
                      </p>
                      <button
                        className="block"
                        type="button"
                        onClick={() => {
                          handleRemovePengacara(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              <div className="form-group w-full">
                <label className="block mb-1 text-base font-medium text-black dark:text-white">
                  Vonis
                </label>
                <div className="grid grid-cols-3 gap-4 border px-2 py-2 rounded-lg border-blue-500 i-vonis">
                  <div className="form-group w-full ">
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      placeholder="Tahun"
                      name="masa_tahanan_tahun"
                      value={formState.masa_tahanan_tahun}
                      // disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "masa_tahanan_tahun"
                          ? "Masukan vonis tahun"
                          : ""
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full ">
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      placeholder="Bulan"
                      name="masa_tahanan_bulan"
                      value={formState.masa_tahanan_bulan}
                      // disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "masa_tahanan_bulan"
                          ? "Masukan vonis tahun"
                          : ""
                      )}
                    </p>
                  </div>
                  <div className="form-group w-full ">
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      onChange={handleChange}
                      placeholder="Hari"
                      name="masa_tahanan_hari"
                      value={formState.masa_tahanan_hari}
                      // disabled={isDetail}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "masa_tahanan_hari"
                          ? "Masukan vonis tahun"
                          : ""
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-group w-full">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Nama Dokumen
                </label>
                <input
                  onChange={handleChange}
                  placeholder="Nama Dokumen"
                  name="nama_dokumen_persidangan"
                  value={formState.nama_dokumen_persidangan}
                  type="text"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-2.5 pr-4.5 mt-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "nama_dokumen_persidangan"
                      ? "Masukan nama dokumen"
                      : ""
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-normal">
              {/* dokumen */}
              <div className="relative  block w-full appearance-none overflow-hidden rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                <input
                  type="file"
                  id="fileUpload"
                  accept=".pdf, .doc, .docx"
                  className="hidden"
                  onChange={handleUpload}
                />
                {formState.link_dokumen_persidangan ? (
                  <div className="grid grid-cols-1">
                    <div
                      className={`absolute top-0 right-0  bg-red-500 flex items-center  rounded-bl block`}
                    >
                      <button className="p-[2px]" onClick={handleRemoveDoc}>
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
                      </button>
                    </div>
                    {/* <div className="flex justify-center">
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
                          </div> */}
                    <div className="">
                      <div style={{ height: "10%" }}>
                        {/* PDF */}
                        {file && (
                          <div className="">
                            {file === "pdf" ? (
                              <iframe
                                src={`https://dev.transforme.co.id${formState.link_dokumen_persidangan}`}
                                title="pdf"
                                width="100%"
                                height="600px"
                                className="border-0 text-center justify-center"
                              />
                            ) : file === "docx" || file === "doc" ? (
                              <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=https://dev.transforme.co.id${formState.link_dokumen_persidangan}`}
                                title="docx"
                                width="100%"
                                height="600px"
                              />
                            ) : (
                              <p>Ekstensi file tidak didukung</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-center text-sm text-blue-500">
                      Dokumen terupload !
                    </p>
                    {/* <div
                            className={`flex justify-center mt-3 block`}
                          >
                            <button
                              type="button"
                              onClick={handleDownloadDoc}
                              className="bg-blue-500 px-3 py-1 rounded-xl text-white duration-300 ease-in-out  hover:scale-105 "
                            >
                              Unduh Dokumen
                            </button>
                          </div> */}
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
                    <p className="mt-1.5">Pdf,doc dan docx </p>
                  </div>
                )}
              </div>
              {/* hasil vonis */}
              <div className="">
                <label
                  className="block mb-1 text-base font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Hasil vonis
                </label>
                <textarea
                  className="w-full max-h-[149px] min-h-[149px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-hasil"
                  name="hasil_vonis"
                  placeholder="Hasil vonis"
                  onChange={handleChange}
                  value={formState.hasil_vonis}
                  // disabled={isDetail}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === "hasil_vonis" ? "Masukan hasil vonis" : ""
                  )}
                </p>
              </div>
            </div>
            <button
              className="items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit"
            >
              Tambah Data Sidang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSidang;
