import React, { useEffect, useRef, useState } from "react";
import { apiAhliRead, apiHakimRead, apiJaksaRead, apiJenisSidangRead, apiKasusRead, apiPengadilanMiliterRead, apiReadAllRole, apiReadAllStaff, apiReadAllUser, apiReadAllWBP, apiReadJaksapenuntut, apiReadSaksi } from "../../services/api";
import Select from "react-select";
import { Alerts } from "./AlertSidang";
import { CiGlass } from "react-icons/ci";
import dayjs from "dayjs";
// import { ipcRenderer } from 'electron';]
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { da } from "date-fns/locale";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";
import { set } from "react-hook-form";

interface AddSidangModalProps {
  closeModal: () => void;
  onSubmit: (params: any) => any;
  defaultValue?: any;
  isDetail?: boolean;
  isEdit?: boolean;
  token: any;
}

const dataUserItem = localStorage.getItem("dataUser");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const AddSidangModal: React.FC<AddSidangModalProps> = ({ closeModal, onSubmit, defaultValue, isDetail, isEdit, token }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
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
      juru_sita: "",
      hasil_keputusan_sidang: "",
      pengawas_peradilan_militer: "",
      jenis_persidangan_id: "",
      pengadilan_militer_id: "",
      nama_dokumen_persidangan: "",
      // pdf_file_base64: '',
      link_dokumen_persidangan: "",
      hasil_vonis: "",
      ahli: [],
      agenda_sidang: "",
      saksi: [],
      pengacara: [],
      wbp_profile: [],
      // nama: [],
      // hakim_id: [],
      // role_ketua_hakim: '',
      oditur_penuntut_id: [],
      role_ketua_oditur: {},
      // zona_waktu: '',
    }
  );
  console.log(isDetail, "detail click");
  const navigate = useNavigate();
  const location = useLocation();

  const modalContainerRef = useRef(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [staffData, setStaffData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [saksiEror, setSaksiEror] = useState(false);
  const [pengacaraEror, setPengacaraEror] = useState(false);

  const [jenisSidang, setJenisSidang] = useState([]);
  const [jaksa, setJaksa] = useState([]);
  const [hakim, setHakim] = useState([]);
  const [kasus, setKasus] = useState([]);
  console.log(kasus, "kasus");
  const [pengadilanMiliter, setPengadilanMiliter] = useState([]);
  const [ahli, setAhli] = useState([]);
  const [saksi, setSaksi] = useState([]);
  const [wbp, setWbp] = useState([]);
  const [getWbp, setGetWbp] = useState([]);
  const [getZona, setGetZona] = useState([]);
  const [getSaksi, setGetSaksi] = useState([]);
  const [saksiField, setSaksiField] = useState("");
  const [pengacaraField, setPengacaraField] = useState("");
  const [filter, setFilter] = useState("");
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdftUrl] = useState(`https://dev.transforme.co.id${formState.link_dokumen_persidangan}`);
  const [selectedAnggotaOditur, setSelectedAnggotaOditur] = useState(formState?.oditur_penuntut_id || []);
  const [selectedKetuaOditur, setSelectedKetuaOditur] = useState(formState?.role_ketua_oditur_holder?.oditur_penuntut_id || null);

  console.log(formState.wbpHolder, "testing");

  useEffect(() => {
    if (isEdit || isDetail) {
      setGetWbp(
        formState.wbpHolder.map((item: any) => ({
          value: item.wbp_profile_id,
          label: item.nama,
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (isEdit || isDetail) {
      setGetSaksi(
        formState.saksiHolder.map((item: any) => ({
          value: item.saksi_id,
          label: item.nama_saksi,
        }))
      );
    }
  }, []);

  useEffect(() => {
    Promise.all([getTimeZone(), getAllJenisSidang(), getAllJaksaPenuntut(), getAllHakim(), getAllKasus(), getAllPengadilanMiliter(), getAllWbp(), getAllAhli(), getAllSaksi()]).then(() => setIsLoading(false));
  }, []);

  // useEffect untuk mengambil data dari api
  const validateForm = () => {
    let errorFields = [];

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
        key !== "nama_dokumen_persidangan" &&
        key !== "link_dokumen_persidangan" &&
        key !== "provinsi_id" &&
        key !== "nama_provinsi" &&
        key !== "nama_kota" &&
        key !== "nama_pengadilan_militer" &&
        key !== "link_dokumen_persidangan"

        // Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
        // || key === 'saksi' && Array.isArray(value) && value.length === 0
      ) {
        if (
          !value ||
          // (key === 'hakim_id' && Array.isArray(value) && value.length === 0) ||
          (key === "jaksa_penuntut_id" && Array.isArray(value) && value.length === 0) ||
          (key === "oditur_penuntut_id" && Array.isArray(value) && value.length === 0) ||
          (key === "wbp_profile" && Array.isArray(value) && value.length === 0) ||
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

  const handleSelectKetuaHakim = (e: any) => {
    setFormState({ ...formState, role_ketua_oditur: e?.value });
  };

  const handleSelectKetuaJaksa = (e) => {
    setFormState({ ...formState, role_ketua_oditur: e?.value });
  };

  const handleSelectHakim = (e: any) => {
    console.log("hakim", e);
    let arrayTemp: any = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }
    setFormState({ ...formState, hakim_id: arrayTemp });
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".p-nama",
          popover: {
            title: "Nama Sidang",
            description: "Pilih nama sidang yang diinginkan",
          },
        },
        {
          element: ".p-jenis",
          popover: {
            title: "Pilih Jenis Sidang",
            description: "Pilih jenis sidang yang diinginkan",
          },
        },
        {
          element: ".p-anggota",
          popover: {
            title: "Anggota Oditur Penuntut",
            description: "Pilih anggota oditur penuntut yang diinginkan",
          },
        },
        {
          element: ".p-ketua",
          popover: {
            title: "Ketua Oditur",
            description: "Pilih ketua oditur yang diinginkan",
          },
        },
        {
          element: ".p-kasus",
          popover: {
            title: "Kasus",
            description: "Pilih kasus yang diinginkan",
          },
        },
        {
          element: ".input-nomor",
          popover: {
            title: "Nomor Kasus",
            description: "Isi nomor kasus",
          },
        },
        {
          element: ".p-militer",
          popover: {
            title: "Pengadilan militer",
            description: "Pilih pengadilan militer yang diinginkan",
          },
        },
        {
          element: ".input-juru",
          popover: {
            title: "Juru Sita",
            description: "Isi juru sita",
          },
        },
        {
          element: ".input-pengawas",
          popover: {
            title: "Pengawas peradilan militer",
            description: "Isi pengawas peradilan militer",
          },
        },
        {
          element: ".input-agenda",
          popover: {
            title: "Agenda Sidang",
            description: "Isi agenda sidang",
          },
        },
        {
          element: ".input-keputusan",
          popover: {
            title: "Hasil Keputusan Sidang",
            description: "Isi hasil keputusan sidang",
          },
        },
        {
          element: ".input-jadwal",
          popover: {
            title: "Jadwal Sidang",
            description: "Menentukan tanggal jadwal sidang",
          },
        },
        {
          element: ".input-perubahan",
          popover: {
            title: "Perubahan Jadwal Sidang",
            description: "Menentukan tanggal perubahan jadwal sidang",
          },
        },
        {
          element: ".input-waktu",
          popover: {
            title: "Waktu Mulai",
            description: "Menentukan tanggal waktu mulai",
          },
        },
        {
          element: ".input-selesai",
          popover: {
            title: "Waktu Selesai",
            description: "Menentukan tanggal waktu selesai",
          },
        },
        {
          element: ".s-wbp",
          popover: {
            title: "WBP",
            description: "Pilih wbp yang diinginkan",
          },
        },
        {
          element: ".p-ahli",
          popover: {
            title: "Ahli",
            description: "Pilih ahli yang diinginkan",
          },
        },
        {
          element: ".p-saksi",
          popover: {
            title: "Saksi",
            description: "Pilih saksi yang diinginkan",
          },
        },
        {
          element: "#a-pengacara",
          popover: {
            title: "Pengacara",
            description: "Isi dan tambah pengacara",
          },
        },
        {
          element: ".i-vonis",
          popover: {
            title: "Vonis",
            description: "Menentukan tahun, bulan, hari vonis",
          },
        },
        {
          element: ".input-nama",
          popover: {
            title: "Nama Dokumen",
            description: "Isi nama dokumen",
          },
        },
        {
          element: ".p-unggah",
          popover: {
            title: "Unggah File",
            description: "Pilih file pdf yang diinginkan",
          },
        },
        {
          element: ".t-hasil",
          popover: {
            title: "Hasil Vonis",
            description: "Isi hasil vonis",
          },
        },
        {
          element: `${isEdit ? "#b-ubah" : "#b-tambah"}`,
          popover: {
            title: `${isEdit ? "Ubah" : "Tambah"}`,
            description: `Klik untuk ${isEdit ? "mengubah" : "menambahkan"} data sidang`,
          },
        },
      ],
    });

    driverObj.drive();
  };
  console.log("ff dan", formState);

  // const handleSelectJaksa = (e) => {
  //   const selectedValues = e ? e.map((item) => item.value) : [];
  //   setSelectedAnggotaOditur(selectedValues);
  // };

  const handleSelectJaksa = (e) => {
    const selectedValues = e ? e.map((item) => item.value) : [];
    setSelectedAnggotaOditur(selectedValues);
    setFormState((prevState) => ({
      ...prevState,
      oditur_penuntut_id: selectedValues,
    }));
  };
  // useEffect(() => {
  //   // Update formState when selectedAnggotaOditur or selectedKetuaOditur changes
  //   setFormState(prevState => ({
  //     ...prevState,
  //     oditur_penuntut_id: selectedAnggotaOditur,
  //     role_ketua_oditur: selectedKetuaOditur
  //   }));
  // }, [selectedAnggotaOditur, selectedKetuaOditur]);

  // useEffect(() => {

  //   console.log('jaksa aja', jaksa);

  //   if (isEdit || isDetail) {
  //     const jaksaMap = formState?.oditurHolder?.map(
  //       (item: any) => item?.oditur_penuntut_id,
  //     );
  //     const wbpMap = formState.wbpHolder.map(
  //       (item: any) => item.wbp_profile_id,
  //     );
  //     const ahliMap = formState.ahliHolder.map((item: any) => item.ahli_id);
  //     const saksiMap = formState.saksiHolder.map((item: any) => item.saksi_id);
  //     // const pengacaraMap = formState.sidang_pengacara.map(
  //     //   (item: any) => item.nama_pengacara,
  //     // );
  //     // setFormState({ ...formState, jaksa_penuntut_id: jaksaMap });
  //     const hakimMap = formState.hakimHolder.map((item: any) => item.hakim_id);
  //     setFormState({
  //       ...formState,
  //       hakim_id: hakimMap,
  //       oditur_penuntut_id: jaksaMap,
  //       // role_ketua_hakim: formState.role_ketua_hakim_holder.hakim_id,
  //       role_ketua_oditur:
  //         formState?.role_ketua_oditur_holder?.oditur_penuntut_id,
  //       wbp_profile: wbpMap,
  //       ahli: ahliMap,
  //       saksi: saksiMap,
  //       // pengacara: pengacaraMap,
  //       link_dokumen_persidangan: formState.link_dokumen_persidangan,
  //     });
  //   }
  // });

  // useEffect(() => {
  //   if (getSaksi.length > 0 && getWbp.length > 0) {
  //     const saksiValues = getSaksi.map((item: any) => item.value);
  //     const wbpValues = getWbp.map((item: any) => item.value);

  //     setFormState((prevFormState: any) => ({
  //       ...prevFormState,
  //       saksi: saksiValues,
  //       wbp_profile: wbpValues,
  //     }));
  //   }
  // }, []);

  console.log(formState, "formmmmmm");
  const handleSelectWbp = (e: any) => {
    const selectedValues = e.map((item: any) => ({
      value: item.value,
      label: item.label,
    }));

    setFormState((prevFormState: any) => ({
      ...prevFormState,
      wbp_profile: selectedValues.map((valueItem: any) => valueItem.value),
      wbpHolder: selectedValues.map((valueItem: any) => ({
        wbp_profile_id: valueItem.value,
        nama: valueItem.label,
      })),
    }));

    setGetWbp(selectedValues);
  };

  const handleSelectSaksi = (e: any) => {
    console.log(e, "handleSelectSaksi");
    const selectedValues = e.map((item: any) => ({
      value: item.value,
      label: item.label,
    }));

    setFormState((prevFormState: any) => ({
      ...prevFormState,
      saksi: selectedValues.map((valueItem: any) => valueItem.value),
      saksiHolder: selectedValues.map((valueItem: any) => ({
        saksi_id: valueItem.value,
        nama_saksi: valueItem.label,
      })),
    }));

    setGetSaksi(selectedValues);
    // console.log('getSaksi', getSaksi);
  };

  const handleSelectAhli = (e: any) => {
    let arrayTemp = [];
    for (let i = 0; i < e.length; i++) {
      arrayTemp.push(e[i].value);
    }

    setFormState({ ...formState, ahli: arrayTemp });
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    console.log("asdasdaewdafge", formState);
    e.preventDefault();
    // console.log(formState, 'formState');
    console.log("SUBMIT", e);

    // if (!validateForm()) return;
    setButtonLoad(true);
    // console.log('formstateValidate', formState);
    onSubmit(formState).then(() => setButtonLoad(false));
    // onSubmit(formState);
  };

  //pengacara
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

  const handleRemovePengacara = (index) => {
    // Cek nilai indeks yang akan dihapus
    console.log("Index to remove:", index);

    // Buat array baru tanpa elemen yang ingin dihapus
    const newArrayPasal = formState.pengacara.filter((_, i) => i !== index);

    // Log array baru setelah penghapusan
    console.log("New array", newArrayPasal);

    // Update state dengan array baru
    setFormState({
      ...formState,
      pengacara: newArrayPasal,
    });
  };

  const handleUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      // const reader = new FileReader();

      // reader.onloadend = () => {
      //   setFormState({ ...formState, link_dokumen_persidangan: reader.result});
      //   console.log('Preview:', reader.result);
      //   setPdftUrl(reader.result as string);
      // };

      // reader.readAsDataURL(file);

      setFormState({ ...formState, link_dokumen_persidangan: file });
    }
  };

  const handleRemoveDoc = () => {
    setFormState({
      ...formState,
      link_dokumen_persidangan: "",
      // pdf_file_base64: '',
    });
    const inputElement = document.getElementById("fileUpload") as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handlePenadilanMiliter = (e: any) => {
    setFormState({ ...formState, pengadilan_militer_id: e?.value });
  };

  const handleJenisPersidangan = (e: any) => {
    setFormState({ ...formState, jenis_persidangan_id: e?.value });
  };

  const handleKasus = async (selectedOption: any) => {
    if (selectedOption) {
      const selectedKasusId = selectedOption.value;
      setFormState((prevFormState) => ({
        ...prevFormState,
        kasus_id: selectedKasusId,
      }));

      const selectedKasus = kasus.find((item: any) => item.kasus_id === selectedKasusId);

      if (selectedKasus) {
        const saksiMap = selectedKasus.saksi.map((item: any) => ({
          label: item.nama_saksi,
          value: item.saksi_id,
        }));
        setGetSaksi(saksiMap);

        const wbpMap = selectedKasus.wbp_profile.map((item: any) => ({
          label: item.nama,
          value: item.wbp_profile_id,
        }));
        setGetWbp(wbpMap);

        setFormState((prevFormState) => ({
          ...prevFormState,
          nomor_kasus: selectedKasus.nomor_kasus,
          kasus_id: selectedKasus.kasus_id,
          nama_kasus: selectedKasus.nama_kasus,
          saksi: saksiMap.map((saksi: any) => saksi.value),
          wbp_profile: wbpMap.map((wbp: any) => wbp.value),
        }));

        console.log("saksiMap", saksiMap);
        console.log("wbpMap", wbpMap);
      } else {
        setGetSaksi([]);
        setGetWbp([]);
        setFormState((prevFormState) => ({
          ...prevFormState,
          nomor_kasus: "",
          nama_kasus: "",
          saksi: [],
          wbp_profile: [],
        }));
      }
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        kasus_id: "",
      }));
      setGetSaksi([]);
      setGetWbp([]);
    }
  };

  // Use effect to log changes in getSaksi
  // useEffect(() => {
  //   console.log('getSaksi updated:', getSaksi);
  // }, [getSaksi]);

  // // Use effect to log changes in getWbp
  // useEffect(() => {
  //   console.log('getWbp updated:', getWbp);
  // }, [getWbp]);

  console.log(getWbp, "get wbp");

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

  const handleZonaWaktu = () => {
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
    setFormState({ ...formState, zona_waktu: zonaWaktu });
  };
  useEffect(() => {
    handleZonaWaktu();
  }, []);

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

  const getAllHakim = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiHakimRead(params, token);
      setHakim(response.data.records);
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

  const getAllKasus = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiKasusRead(params, token);
      const filteredKasus = response.data.records.filter((kasus: any) => kasus.nama_kasus != null && kasus.nama_kasus != "");

      setKasus(filteredKasus);
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

  const getAllWbp = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiReadAllWBP(params, token);
      setWbp(response.data.records);
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

  const getAllAhli = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiAhliRead(params, token);
      setAhli(response.data.records);
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

  const getAllSaksi = async () => {
    let params = {
      filter: "",
      pageSize: 1000,
    };
    try {
      const response = await apiReadSaksi(params, token);
      setSaksi(response.data.records);
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
    },
  };

  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => <input value={value} onChange={(e) => onChange(e.target.value)} style={{ border: "solid 1px pink" }} />;

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

        backgroundColor: isDisabled ? undefined : isSelected ? "" : isFocused ? "rgb(51, 133, 255)" : undefined,

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

  console.log("FORMSTATEMODAL", formState);

  // const handleDownloadDoc = () => {
  //   const url = `https://dev.transforme.co.id${formState.link_dokumen_persidangan}`; // Replace with the actual file URL
  //   // const url = window.URL.createObjectURL(`https://dev.transforme.co.id${formState.link_dokumen_persidangan}`);
  //   const filename:any = url.split('/').pop()
  //   const link = document.createElement('a');
  //   const nameFile = `${formState.nama_dokumen_persidangan}-${filename}`
  //   console.log(filename)
  //   link.style.display = 'none';
  //   link.href = url;
  //   link.setAttribute(nameFile, nameFile); // Set the filename for the download
  //   // link.download =`${formState.nama_dokumen_persidangan}-${filename}`
  //   document.body.appendChild(link);
  //   link.click();
  //    document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

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
    window.open(`https://dev.transforme.co.id${formState.link_dokumen_persidangan}`, "_blank");

    const ExampleCustomTimeInput = ({ date, value, onChange }: any) => <input value={value} onChange={(e) => onChange(e.target.value)} style={{ border: "solid 1px pink" }} />;
  };

  const checkFileType = (file: any) => {
    if (file) {
      console.log(file, "file");
      const fileExtension = file.split(".").pop().toLowerCase();
      console.log(fileExtension, "file");
      setFile(fileExtension);
    } else {
      console.error("File is undefined or empty.");
    }
  };
  console.log(formState?.oditur_penuntut_id, "form oditur");
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
                <strong className="text-xl align-center cursor-pointer " onClick={closeModal}>
                  &times;
                </strong>
              </div>
              <div className="h-[500px] justify-center flex items-center">
                <svg className="animate-spin h-20 w-20 text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">{isDetail ? "Detail Data Sidang" : isEdit ? "Edit Data Sidang" : "Tambah Data Sidang"}</h3>
                </div>

                {/* <div className="w-10"> */}
                {isDetail ? null : isEdit ? (
                  <button className="pr-100">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                ) : (
                  <button className="pr-90">
                    <HiQuestionMarkCircle
                      values={filter}
                      aria-placeholder="Show tutorial"
                      // onChange={}
                      onClick={handleClickTutorial}
                    />
                  </button>
                )}
                {/* </div> */}

                <strong className="text-xl align-center cursor-pointer  " onClick={closeModal}>
                  &times;
                </strong>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div className="grid grid-cols-2 gap-4 justify-normal">
                    {/* Nama sidang */}
                    <div className="form-group w-full ">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Nama sidang
                      </label>

                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                        onChange={handleChange}
                        // placeholder="Tahap sidang"
                        name="nama_sidang"
                        value={formState.nama_sidang}
                        disabled={isDetail}
                      >
                        <option value="" disabled>
                          Pilih tahap sidang{" "}
                        </option>
                        <option value="Tahap Pertama">Tahap Pertama</option>
                        <option value="Tahap Kedua">Tahap Kedua</option>
                        <option value="Tahap Ketiga">Tahap Ketiga</option>
                      </select>

                      <p className="error-text">{errors.map((item) => (item === "nama_sidang" ? "Pilih nama sidang" : ""))}</p>
                    </div>

                    <div className="form-group w-full">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Pilih Jenis Sidang
                      </label>
                      <Select
                        className="basic-single p-jenis"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value: formState.jenis_persidangan_id,
                                label: formState.nama_jenis_persidangan,
                              }
                            : formState.jenis_persidangan_id
                        }
                        name="jenis_persidangan_id"
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        placeholder="Pilih jenis sidang"
                        styles={customStyles}
                        options={jenisSidang.map((item: any) => ({
                          value: item.jenis_persidangan_id,
                          label: item.nama_jenis_persidangan,
                        }))}
                        onChange={handleJenisPersidangan}
                      />
                      <p className="error-text">{errors.map((item) => (item === "jenis_persidangan_id" ? "Pilih jenis sidang" : ""))}</p>
                    </div>
                  </div>

                  {/* anggota Jaksa Penuntut */}
                  <div className="form-group w-full ">
                    <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      Anggota Oditur Penuntut
                    </label>
                    <Select
                      className="basic-multi-select p-anggota"
                      isMulti
                      classNamePrefix="select"
                      defaultValue={
                        isDetail
                          ? formState?.oditurHolder?.map((item) => ({
                              value: item.oditur_penuntut_id,
                              label: item.nama_oditur,
                            }))
                          : isEdit
                          ? formState?.oditur_penuntut_id?.map((item) => ({
                              value: item,
                              label: jaksa.find((jaksaItem) => jaksaItem.oditur_penuntut_id === item)?.nama_oditur,
                            }))
                          : ""
                      }
                      placeholder={"Pilih oditur penuntut"}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="oditur_penuntut_id"
                      styles={customStyles}
                      options={jaksa?.map((item) => ({
                        value: item.oditur_penuntut_id,
                        label: item.nama_oditur,
                      }))}
                      onChange={handleSelectJaksa}
                    />
                    <p className="error-text">{errors.map((item) => (item === "oditur_penuntut_id" ? "Pilih oditur penuntut" : ""))}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Ketua Jaksa */}
                    <div className="form-group w-full ">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Ketua Oditur
                      </label>
                      <Select
                        className="basic-select p-ketua"
                        classNamePrefix="select"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value: formState.role_ketua_oditur_holder?.oditur_penuntut_id,
                                label: formState.role_ketua_oditur_holder?.nama_oditur,
                              }
                            : selectedKetuaOditur
                        }
                        placeholder={"Pilih ketua oditur"}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        name="oditur_penuntut_id"
                        styles={customStyles}
                        options={jaksa
                          .filter((item) => selectedAnggotaOditur.includes(item.oditur_penuntut_id))
                          .map((item) => ({
                            value: item.oditur_penuntut_id,
                            label: item.nama_oditur,
                          }))}
                        onChange={handleSelectKetuaJaksa}
                      />
                      <p className="error-text">{errors.map((item) => (item === "oditur_penuntut_id" ? "Pilih ketua oditur" : ""))}</p>
                    </div>

                    {/* kasus sidang */}
                    <div className="form-group w-full ">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Kasus
                      </label>
                      <Select
                        className="basic-single p-kasus"
                        classNamePrefix="select"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value: formState.kasus_id,
                                label: formState.nama_kasus,
                              }
                            : formState.kasus_id
                        }
                        placeholder={"Pilih kasus"}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={isDetail}
                        name="kasus_id"
                        styles={customStyles}
                        options={kasus.map((item: any) => ({
                          value: item.kasus_id,
                          label: item.nama_kasus,
                        }))}
                        onChange={handleKasus}
                      />
                      <p className="error-text">{errors.map((item) => (item === "kasus_id" ? "Pilih kasus" : ""))}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-normal">
                    {/* nomor kasus */}
                    <div className="form-group w-full ">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Nomor Kasus
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                        onChange={handleChange}
                        placeholder="Nomor Kasus"
                        name="nomor_kasus"
                        value={formState?.nomor_kasus}
                        disabled
                      />
                      <p className="error-text">{errors.map((item) => (item === "nomor_kasus" ? "Masukan nomor kasus" : ""))}</p>
                    </div>

                    {/* pengadilan militer */}
                    <div className="form-group w-full ">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Pengadilan militer
                      </label>
                      <Select
                        className="basic-single p-militer"
                        classNamePrefix="select"
                        defaultValue={
                          isEdit || isDetail
                            ? {
                                value: formState.pengadilan_militer_id,
                                label: formState.nama_pengadilan_militer,
                              }
                            : formState.pengadilan_militer_id
                        }
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"Pilih pengadilan militer"}
                        // onChange={handleChange}
                        name="pengadilan_militer_id"
                        isDisabled={isDetail}
                        styles={customStyles}
                        options={pengadilanMiliter.map((item: any) => ({
                          value: item.pengadilan_militer_id,
                          label: item.nama_pengadilan_militer,
                        }))}
                        onChange={handlePenadilanMiliter}
                      />
                      <p className="error-text">{errors.map((item) => (item === "pengadilan_militer_id" ? "Pilih pengadilan militer" : ""))}</p>
                    </div>

                    {/* Pengawas Peradilan */}
                    <div className="form-group w-full ">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Juru Sita
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-juru"
                        onChange={handleChange}
                        placeholder="Juru sita"
                        name="juru_sita"
                        value={formState.juru_sita}
                        disabled={isDetail}
                      />

                      <p className="error-text">{errors.map((item) => (item === "juru_sita" ? "Masukan Juru Sita" : ""))}</p>
                    </div>
                    <div className="form-group w-full ">
                      <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Pengawas peradilan militer
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-pengawas"
                        onChange={handleChange}
                        placeholder="Pengawas"
                        name="pengawas_peradilan_militer"
                        value={formState.pengawas_peradilan_militer}
                        disabled={isDetail}
                      />

                      <p className="error-text">{errors.map((item) => (item === "pengawas_peradilan_militer" ? "Masukan pengawas" : ""))}</p>
                    </div>
                  </div>

                  {/* agenda sidang */}
                  <div className="form-group w-full ">
                    <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      Agenda sidang
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-agenda"
                      onChange={handleChange}
                      placeholder="Agenda sidang"
                      name="agenda_sidang"
                      value={formState.agenda_sidang}
                      disabled={isDetail}
                    />
                    <p className="error-text">{errors.map((item) => (item === "agenda_sidang" ? "Masukan agenda sidang" : ""))}</p>
                  </div>
                  {/* hasil kepusutan sidang */}
                  <div className="form-group w-full ">
                    <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      Hasil keputusan sidang
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-keputusan"
                      onChange={handleChange}
                      placeholder="hasil keputusan sidang"
                      name="hasil_keputusan_sidang"
                      value={formState.hasil_keputusan_sidang}
                      disabled={isDetail}
                    />
                    <p className="error-text">{errors.map((item) => (item === "hasil_keputusan_sidang" ? "Masukan hasil keputusan sidang" : ""))}</p>
                  </div>

                  {/* jadwal sidang */}
                  <div className="grid grid-cols-2 gap-4 justify-normal">
                    <div className="form-group w-full ">
                      <label className="  block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Jadwal sidang
                      </label>
                      <div className="flex flex-row input-jadwal">
                        <DatePicker
                          selected={formState.jadwal_sidang ? dayjs(formState.jadwal_sidang).toDate() : dayjs().toDate()}
                          onChange={handleJadwalSidang}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
                          // customInput={<ExampleCustomTimeInput />}
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
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
                      </div>
                      <p className="error-text">{errors.map((item) => (item === "jadwal_sidang" ? "Masukan jadwal sidang" : ""))}</p>
                    </div>

                    {/* perubahan jadwal sidang*/}
                    <div className="form-group w-full ">
                      <label className="  block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Perubahan jadwal sidang
                      </label>
                      <div className="flex flex-row input-perubahan">
                        <DatePicker
                          selected={formState.perubahan_jadwal_sidang ? dayjs(formState.perubahan_jadwal_sidang).toDate() : dayjs().toDate()}
                          onChange={handlePerubahanJadwal}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-selesai"
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
                      </div>
                      <p className="error-text">{errors.map((item) => (item === "perubahan_jadwal_sidang" ? "Masukan perubahan jadwal" : ""))}</p>
                    </div>

                    {/* waktu mulai */}
                    <div className="form-group w-full ">
                      <label className="  block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Waktu mulai
                      </label>
                      <div className="flex flex-row input-waktu">
                        <DatePicker
                          selected={formState.waktu_mulai_sidang ? dayjs(formState.waktu_mulai_sidang).toDate() : dayjs().toDate()}
                          onChange={handleWaktuMulai}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
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
                      </div>
                      <p className="error-text">{errors.map((item) => (item === "waktu_mulai_sidang" ? "Masukan tanggal mulai" : ""))}</p>
                    </div>

                    {/* waktu selesai */}
                    <div className="form-group w-full ">
                      <label className="  block text-sm font-medium text-black dark:text-white" htmlFor="id">
                        Waktu selesai
                      </label>
                      <div className="flex flex-row input-selesai">
                        <DatePicker
                          selected={formState.waktu_selesai_sidang ? dayjs(formState.waktu_selesai_sidang).toDate() : dayjs().toDate()}
                          onChange={handleWaktuSelesai}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-selesai"
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
                      </div>
                      <p className="error-text">{errors.map((item) => (item === "waktu_selesai_sidang" ? "Masukan tanggal selesai" : ""))}</p>
                    </div>
                  </div>

                  {/* WBP */}
                  <div className="form-group w-full ">
                    <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      WBP
                    </label>
                    <Select
                      className="basic-multi-select s-wbp"
                      isMulti
                      classNamePrefix="select"
                      value={getWbp.map((item: any) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                      placeholder={"Pilih wbp"}
                      isClearable={true}
                      isSearchable={true}
                      // isDisabled={isDetail}
                      isDisabled
                      name="wbp_profile"
                      styles={customStyles}
                      options={wbp.map((item: any) => ({
                        value: item.wbp_profile_id,
                        label: item.nama,
                      }))}
                      onChange={handleSelectWbp}
                    />
                    {/* <p className="error-text">
                      {errors.map((item) =>
                        item === 'wbp_profile' ? 'Pilih wbp' : '',
                      )}
                    </p> */}
                  </div>

                  {/* Ahli */}
                  <div className="form-group w-full ">
                    <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      Ahli
                    </label>
                    <Select
                      className="basic-multi-select p-ahli"
                      isMulti
                      classNamePrefix="select"
                      defaultValue={
                        isEdit || isDetail
                          ? formState.ahliHolder.map((item: any) => ({
                              value: item.ahli_id,
                              label: item.nama_ahli + " " + "(" + item.bidang_ahli + ")",
                            }))
                          : formState.ahli_id
                      }
                      placeholder={"Pilih ahli"}
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={isDetail}
                      name="ahli"
                      styles={customStyles}
                      options={ahli.map((item: any) => ({
                        value: item.ahli_id,
                        label: item.nama_ahli + " " + "(" + item.bidang_ahli + ")",
                      }))}
                      onChange={handleSelectAhli}
                    />
                    <p className="error-text">{errors.map((item) => (item === "ahli" ? "Pilih ahli" : ""))}</p>
                  </div>

                  {/* Saksi */}
                  <div className="form-group w-full ">
                    <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      Saksi
                    </label>
                    <Select
                      className="basic-multi-select p-saksi"
                      isMulti
                      classNamePrefix="select"
                      value={getSaksi.map((item: any) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                      placeholder={"Pilih saksi"}
                      isClearable={true}
                      isSearchable={true}
                      // isDisabled={isDetail}
                      isDisabled
                      name="saksi"
                      styles={customStyles}
                      options={saksi.map((item: any) => ({
                        value: item.saksi_id,
                        label: item.nama_saksi,
                      }))}
                      onChange={handleSelectSaksi}
                    />
                  </div>

                  {/* pengacara */}
                  <div className="">
                    <div className="flex items-center">
                      <p className="text-white">Pengacara</p>
                      <p className={`${pengacaraEror ? "block" : "hidden"} ml-4 text-red-400 text-sm`}>Masukan nama pengacara</p>
                    </div>

                    <div className="border-[1px] border-blue-500 rounded-md p-2" id="a-pengacara">
                      <div className="flex flex-row gap-2">
                        {!isDetail && (
                          <>
                            <input
                              type="text"
                              name=""
                              // defaultValue={
                              //   isDetail || isEdit ? formState.pengacara : ''
                              // }
                              value={pengacaraField}
                              placeholder={isDetail ? "" : "Masukan pengacara"}
                              onChange={handleInputPengacara}
                              disabled={isDetail}
                              className="w-full rounded border border-stroke  dark:bg-slate-800 py-3 pl-3 pr-4.5 text-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            />

                            <button onClick={handlePengacara} type="button" className="py-3 px-3 rounded-md bg-blue-500">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                      <p className="error-text">{errors.map((item) => (item === "pengacara" ? "Tambahkan pengacara" : ""))}</p>
                      <div className={`mt-2 flex flex-col overflow-hidden gap-2 ${formState.pengacara?.length === 0 ? "hidden" : "block"}`}>
                        {formState.pengacara?.map((item: any, index: any) => (
                          <div className="flex flex-row items-center" key={index}>
                            <p className="capitalize px-3 py-1 truncate w-full rounded-md bg-boxdark border-[1px] border-slate-500 text-white">{item}</p>
                            <button className={`${isDetail ? "hidden" : "block"}`} type="button" onClick={() => handleRemovePengacara(index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vonis */}
                  <div className="grid grid-cols-1 ">
                    <p className="text-white text-sm font-medium">Vonis</p>
                    <div className=" grid grid-cols-3 gap-4 border px-2 py-2 rounded-lg border-blue-500 i-vonis">
                      {/* Vonis tahun */}
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          onChange={handleChange}
                          placeholder="Tahun"
                          name="masa_tahanan_tahun"
                          value={formState.masa_tahanan_tahun}
                          disabled={isDetail}
                        />
                        <p className="error-text">{errors.map((item) => (item === "masa_tahanan_tahun" ? "Masukan vonis tahun" : ""))}</p>
                      </div>
                      {/* Vonis bulan */}
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          onChange={handleChange}
                          name="masa_tahanan_bulan"
                          placeholder="Bulan"
                          value={formState.masa_tahanan_bulan}
                          disabled={isDetail}
                        />
                        <p className="error-text">{errors.map((item) => (item === "masa_tahanan_bulan" ? "Masukan vonis bulan" : ""))}</p>
                      </div>
                      {/* Vonis hari */}
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          onChange={handleChange}
                          placeholder="Hari"
                          name="masa_tahanan_hari"
                          value={formState.masa_tahanan_hari}
                          disabled={isDetail}
                        />
                        <p className="error-text">{errors.map((item) => (item === "masa_tahanan_hari" ? "Masukan vonis hari" : ""))}</p>
                      </div>
                    </div>
                  </div>

                  {/* Nama Dokument */}
                  <div className="form-group w-full ">
                    <label className="block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      Nama Dokumen
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nama"
                      onChange={handleChange}
                      placeholder="Nama Dokumen"
                      name="nama_dokumen_persidangan"
                      value={formState.nama_dokumen_persidangan}
                      disabled={isDetail}
                    />
                    <p className="error-text">{errors.map((item) => (item === "nama_dokumen_persidangan" ? "Masukan nama dokumen" : ""))}</p>
                  </div>

                  {/* Dokumentasi */}
                  <div className="grid grid-cols-1">
                    <div
                      // id="FileUpload"
                      className="relative  block w-full appearance-none overflow-hidden rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 p-unggah"
                    >
                      <input type="file" id="fileUpload" accept=".pdf, .doc, .docx" onChange={handleUpload} className="hidden" />
                      {formState.link_dokumen_persidangan ? (
                        (console.log(formState.link_dokumen_persidangan, "pdf_file_base64"),
                        (
                          <div className="grid grid-cols-1">
                            <div className={`absolute top-0 right-0  bg-red-500 flex items-center  rounded-bl  ${isDetail ? "hidden" : "block"}`}>
                              <button className="p-[2px]" onClick={handleRemoveDoc}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20">
                                  <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="">
                              <div style={{ height: "10%" }}>
                                {/* PDF */}
                                {file && (
                                  <div className="">
                                    {
                                      file === "pdf" ? (
                                        <iframe
                                          // src={`https://dev.transforme.co.id${formState.link_dokumen_persidangan}`}
                                          src={pdfUrl}
                                          title="pdf"
                                          width="100%"
                                          height="600px"
                                          className="border-0 text-center justify-center"
                                        />
                                      ) : file === "docx" || file === "doc" ? (
                                        <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=https://dev.transforme.co.id${formState.link_dokumen_persidangan}`} title="docx" width="100%" height="600px" />
                                      ) : null
                                      // : (
                                      //   <p>Ekstensi file tidak didukung</p>
                                      // )
                                    }
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-center text-sm text-blue-500">Dokumen terupload !</p>
                            <div className={`flex justify-center mt-3 ${isDetail ? "block" : "hidden"}`}>
                              <button type="button" onClick={handleDownloadDoc} className="bg-blue-500 px-3 py-1 rounded-xl text-white duration-300 ease-in-out  hover:scale-105 ">
                                Unduh Dokumen
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-blue-500" xmlns="http://www.w3.org/2000/svg">
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
                            <span className="text-blue-500 underline">Klik untuk unggah</span>
                          </label>
                          <p className="mt-1.5">Pdf,doc dan docx </p>
                        </div>
                      )}
                    </div>
                    <p className="error-text">{errors.map((item) => (item === "link_dokumen_persidangan" ? "Masukan dokumen sidang" : ""))}</p>
                  </div>

                  {/* Hasil vonis */}
                  <div className="form-group w-full flex flex-col">
                    <label className=" block text-sm font-medium text-black dark:text-white" htmlFor="id">
                      Hasil vonis
                    </label>
                    <textarea
                      className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-hasil"
                      name="hasil_vonis"
                      placeholder="Hasil vonis"
                      onChange={handleChange}
                      value={formState.hasil_vonis}
                      disabled={isDetail}
                    />
                    <p className="error-text">{errors.map((item) => (item === "hasil_vonis" ? "Masukan hasil vonis" : ""))}</p>
                  </div>
                </div>

                {errors.filter((item: string) => item.startsWith("INVALID_ID")).length > 0 && (
                  <>
                    <br />
                    <div className="error">{errors.filter((item: string) => item.startsWith("INVALID_ID"))[0].replace("INVALID_ID_", "")} is not a valid bond</div>
                  </>
                )}
                <br></br>
                {isDetail ? null : isEdit ? (
                  <button className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? "bg-slate-400" : ""}`} type="submit" disabled={buttonLoad} id="b-ubah">
                    {buttonLoad ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      ""
                    )}
                    Ubah Data Sidang
                  </button>
                ) : (
                  <button className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${buttonLoad ? "bg-slate-400" : ""}`} type="submit" disabled={buttonLoad} id="b-tambah">
                    {buttonLoad ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      ""
                    )}
                    Tambah Data Sidang
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
