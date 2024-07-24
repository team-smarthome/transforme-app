import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { CustomStyles } from "./CustomStyle";
import {
  apiAgama,
  apiCreateWBP,
  apiGelang,
  apiKeahlian,
  apiKesatuan,
  apiKota,
  apiMatraRead,
  apiPendidikan,
  apiProvinsi,
  apiReadAllHunian,
  apiReadAllJenisPerkara,
  apiReadAllKategoriJahat,
  apiReadAllPangkat,
  apiReadAllRuanganOtmil,
  apiReadAllWBP,
  apiStatusKawin,
  apiStatusWbp,
  apiKasusRead,
  apiReadjenisperkara,
  apiJenisPidanaRead,
  apiReadJaksaPenyidik,
  apiReadSaksi,
} from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";
import { Alerts } from "../MasterData/InmateData/AlertInmate";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

dayjs.extend(utc);
dayjs.extend(timezone);

type WBPProps = {
  handleNext: () => void;
  nomorKasus: string;
};
export const WbpInsert = ({ handleNext, nomorKasus }: WBPProps) => {
  interface type {
    [key: string]: any;
  }

  interface Kota {
    kota_id: string;
    nama_kota: string;
  }

  interface Provinsi {
    provinsi_id: string;
    nama_provinsi: string;
  }

  interface Agama {
    agama_id: string;
    nama_agama: string;
  }

  interface StatusKawin {
    status_kawin_id: string;
    nama_status_kawin: string;
  }

  interface Pendidikan {
    pendidikan_id: string;
    nama_pendidikan: string;
  }

  interface Keahlian {
    bidang_keahlian_id: string;
    nama_bidang_keahlian: string;
  }

  interface Kesatuan {
    kesatuan_id: string;
    nama_kesatuan: string;
  }

  interface JenisPerkara {
    jenis_perkara_id: string;
    nama_jenis_perkara: string;
  }

  interface KasusData {
    kasus_id: string;
    wbp_profile: { wbp_profile_id: string }[];
  }

  interface JenisPerkara {
    jenis_perkara_id: string;
    nama_jenis_perkara: string;
    vonis_tahun_perkara: string;
    vonis_bulan_perkara: string;
    vonis_hari_perkara: string;
  }

  let dataAdmin = JSON.parse(localStorage.getItem("formState") || "{}");

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState<type>({
    foto_wajah: dataAdmin.foto_wajah ?? "",
    nama: dataAdmin.nama ?? "",
    pangkat: dataAdmin.pangkat ?? { value: "", label: "Pilih Pangkat" },
    pangkat_id: "",
    matra: dataAdmin.matra ?? { value: "", label: "Pilih Matra" },
    matra_id: "",
    nrp: dataAdmin.nrp ?? "",
    alamat: dataAdmin.alamat ?? "",
    kesatuan: dataAdmin.kesatuan ?? { value: "", label: "Pilih Kesatuan" },
    kesatuan_id: "",
    nama_kontak_keluarga: dataAdmin.nama_kontak_keluarga ?? "",
    nomor_kontak_keluarga: dataAdmin.nomor_kontak_keluarga ?? "",
    hubungan_kontak_keluarga: dataAdmin.hubungan_kontak_keluarga ?? "",
    provinsi: dataAdmin.provinsi ?? { value: "", label: "Pilih Provinsi" },
    provinsi_id: "",
    kota: dataAdmin.kota ?? { value: "", label: "Pilih Kota" },
    kota_id: "",
    jenis_kelamin: dataAdmin.jenis_kelamin ?? "",
    agama: dataAdmin.agama ?? { value: "", label: "Pilih Agama" },
    agama_id: "",
    tanggal_lahir: dataAdmin.tanggal_lahir ?? "",
    tempat_lahir: dataAdmin.tempat_lahir ?? "",
    status_kawin: dataAdmin.status_kawin ?? {
      value: "",
      label: "Pilih Status Kawin",
    },
    status_kawin_id: "",
    pendidikan: dataAdmin.pendidikan ?? {
      value: "",
      label: "Pilih Pendidikan",
    },
    pendidikan_id: "",
    is_sick: dataAdmin.is_sick ?? "0",
    wbp_sickness: dataAdmin.wbp_sickness ?? "",
    nama_status_wbp_kasus: "",
    jenisPerkara: dataAdmin.jenisPerkara ?? {
      value: "",
      label: "Pilih Jenis Kasus",
    },
    jenis_perkara_id: "",
    // vonisTahun: dataAdmin.vonisTahunPerkara ?? {value: '', label: 'Pilih Vonis Tahun Perkara'},
    vonis_tahun_perkara: "",
    vonis_bulan_perkara: "",
    vonis_hari_perkara: "",
    tanggal_ditahan_otmil: dataAdmin.tanggal_ditahan_otmil ?? "",
    tanggal_masa_penahanan_otmil: dataAdmin.tanggal_masa_penahanan_otmil ?? "",
    bidang_keahlian: dataAdmin.bidang_keahlian ?? {
      value: "",
      label: "Pilih Bidang Keahlian",
    },
    bidang_keahlian_id: "",
    gelang: dataAdmin.gelang ?? { value: "", label: "Pilih Gelang" },
    gelang_id: "",
    // dmacGelang: dataAdmin.dmacGelang ?? {value: '', label: 'Pilih DMAC Gelang'},
    dmac: dataAdmin.dmac ?? "",
    residivis: dataAdmin.residivis ?? "0",
    hunian_wbp_otmil: dataAdmin.hunian_wbp_otmil ?? {
      value: "",
      label: "Pilih Hunian WBP OTMIL",
    },
    hunian_wbp_otmil_id: "",
    nomor_tahanan: dataAdmin.nomor_tahanan ?? "",
    is_isolated: dataAdmin.is_isolated ?? "0",
    akses_ruangan_otmil_id: [],
    zona_merah: [],
    // lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
    is_deleted: "0",
    status_wbp_kasus: dataAdmin.status_wbp_kasus ?? {
      value: "",
      label: "Pilih Status WBP Kasus",
    },
    status_wbp_kasus_id: dataAdmin.status_wbp_kasus_id ?? "",
    tanggal_penetapan_tersangka: dataAdmin.tanggal_penetapan_tersangka ?? "",
    tanggal_penetapan_terdakwa: dataAdmin.tanggal_penetapan_terdakwa ?? "",
    tanggal_penetapan_terpidana: dataAdmin.tanggal_penetapan_terpidana ?? "",
    zat_adiktif: "",
    jenis_olahraga: "",
    kasus: dataAdmin.kasus ?? { value: "", label: "Pilih Kasus" },
    kasus_id: "",
    // jenis_kasus_id: dataAdmin.jenis_kasus_id ?? '',
    nama_kasus: "",
    nomor_kasus: nomorKasus,
    lokasi_kasus: "",
    is_new_kasus: "false",
    jenis_pidana_id: "",
    kategori_perkara_id: "",
    waktu_kejadian: dayjs().format("YYYY-MM-DDTHH:mm"),
    waktu_pelaporan_kasus: dayjs().format("YYYY-MM-DDTHH:mm"),
    keterangans: [],
    role_ketua_oditur_ids: "",
    wbp_profile_ids: [],
    saksi_id: [],
    keteranganSaksis: [],
    zona_waktu: "",
    nama_jenis_pidana: "",
  });

  const tokenItem = localStorage.getItem("token");
  const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
  const token = dataToken.token;
  const navigate = useNavigate();

  //state handle select
  const [pangkat, setPangkat] = useState([]);
  const [kategoriJahat, setKategoriJahat] = useState([]);
  const [jenisPerkara, setJenisPerkara] = useState<JenisPerkara[]>([]);
  const [kota, setKota] = useState<Kota[]>([]);
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [agama, setAgama] = useState<Agama[]>([]);
  const [statusKawin, setStatusKawin] = useState<StatusKawin[]>([]);
  const [pendidikan, setPendidikan] = useState<Pendidikan[]>([]);
  const [keahlian, setKeahlian] = useState<Keahlian[]>([]);
  const [kesatuan, setKesatuan] = useState<Kesatuan[]>([]);
  const [hunian, setHunian]: any = useState([]);
  const [gelang, setGelang]: any = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [matra, setMatra] = useState([]);
  const [statusWbp, setStatusWbp] = useState([]);
  const [kasusData, setKasusData] = useState<KasusData[]>([]);
  const [buatKasusBaru, setBuatKasusBaru] = useState("false");
  const [data, setData] = useState([]);
  const [dataJenisPerkara, setDataJenisPerkara] = useState<any[]>([]);
  const [dataOditurPenyidik, setDataOditurPenyidik] = useState([]);
  const [pihakTerlibat, setPihakTerlibat] = useState([]);
  const [dataWBP, setDataWBP] = useState([]);
  const [dataSaksi, setDataSaksi] = useState([]);
  const [ketuaOditurPenyidik, setKetuaOditurPenyidik] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const [selectSaksi, setSelectSaksi] = useState([]);
  const [selectTersangka, setSelectTersangka] = useState([]);
  //end handle state

  function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  }
  const maxDate = formatDate(new Date());

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

  const handleWaktuKejadian = (e: any) => {
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
      waktu_kejadian: dayjs(e).format("YYYY-MM-DDTHH:mm"),
      zona_waktu: zonaWaktu,
    });
  };

  const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );

  const validateForm = () => {
    let errorFields: any = [];

    for (const [key, value] of Object.entries(formState)) {
      if (key !== "lokasi_otmil_id")
        if (formState.is_sick === "0") {
          if (key === "wbp_sickness") {
            if (!value) {
              continue;
            }
          }
        }
      if (
        (key === "nama_status_wbp_kasus" ||
          key === "zat_adiktif" ||
          key === "jenis_olahraga" ||
          key === "nomor_kasus" ||
          key === "tanggal_penetapan_tersangka" ||
          key === "tanggal_penetapan_terdakwa" ||
          key === "tanggal_penetapan_terpidana") &&
        !value
      ) {
        continue;
      }

      // if(key !== 'jenis_olahraga')

      if (formState.is_new_kasus == "true") {
        // jika is_new_kasus adalah 'true', maka abaikan validasi untuk field-field berikut.
        const ignoredFields = ["kasus_id"];

        if (ignoredFields.includes(key) && !value) {
          continue;
        }
      }

      if (formState.is_new_kasus == "false") {
        // Jika is_new_kasus adalah 'false', maka abaikan validasi untuk field-field berikut.
        const ignoredFields = [
          "vonis_tahun_perkara",
          "vonis_bulan_perkara",
          "vonis_hari_perkara",
          "nama_kasus",
          "nomor_kasus",
          "lokasi_kasus",
          "jenis_perkara_id",
          "jenis_pidana_id",
          "kategori_perkara_id",
          "waktu_kejadian",
          "waktu_pelaporan_kasus",
          "role_ketua_oditur_ids",
          "nama_jenis_perkara",
          "nama_jenis_pidana",
          "zat_adiktif",
          "jenis_olahraga",
        ];

        // Jika field saat ini merupakan salah satu dari field yang diabaikan, dan value-nya kosong, maka abaikan validasi untuk field tersebut.
        if (ignoredFields.includes(key) && !value) {
          continue; // Melanjutkan iterasi ke field selanjutnya.
        }
      }

      if (key === "lokasi_lemasmil_id" || key === "nama_hunian_wbp_lemasmil") {
        console.log("STATUS ADA");
        continue;
      }

      if (
        formState.status_wbp_kasus_id === "" ||
        formState.status_wbp_kasus_id === null
      ) {
        console.log("STATUS KOSONG");
        if (
          key === "tanggal_penetapan_tersangka" ||
          key === "tanggal_penetapan_terdakwa" ||
          key === "tanggal_penetapan_terpidana"
        ) {
          continue;
        }
      } else if (
        formState.status_wbp_kasus_id === "55ae39b7-dbad-4c89-8968-6d1e2450c963"
      ) {
        //terpidana
        console.log("STATUS terpidana");
        if (
          key === "tanggal_penetapan_tersangka" ||
          key === "tanggal_penetapan_terdakwa"
        ) {
          continue;
        }
      } else if (
        formState.status_wbp_kasus_id === "ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064"
      ) {
        //terdakwa
        console.log("STATUS terdakwa");
        if (
          key === "tanggal_penetapan_tersangka" ||
          key === "tanggal_penetapan_terpidana"
        ) {
          continue;
        }
      } else if (
        formState.status_wbp_kasus_id === "e9e467a1-9132-4787-8938-7517da9ba964"
      ) {
        //tersangka
        console.log("STATUS tersangka");
        if (
          key === "tanggal_penetapan_terdakwa" ||
          key === "tanggal_penetapan_terpidana"
        ) {
          continue;
        }
      }

      if (!value) {
        errorFields.push(key);
      }
    }
    console.log(errorFields, "errorFields");
    if (errorFields.length > 0) {
      setErrors(errorFields);
      return false;
    }

    setErrors([]);
    return true;
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let updatedFormState;

    if (name === "gelang_id") {
      const selectedGelang = gelang.find(
        (item: any) => item.gelang_id === value
      );
      updatedFormState = {
        ...formState,
        gelang_id: value,
        dmac: selectedGelang ? selectedGelang.dmac : "",
      };
    } else if (name === "is_sick") {
      const newWbpSickness = value === "0" ? "" : formState.wbp_sickness;
      updatedFormState = {
        ...formState,
        is_sick: value,
        wbp_sickness: newWbpSickness,
      };
    } else {
      updatedFormState = { ...formState, [name]: value };
    }

    // Simpan formState yang diperbarui ke localStorage
    localStorage.setItem("formState", JSON.stringify(updatedFormState));

    setFormState(updatedFormState);
  };

  useEffect(() => {
    // Memeriksa apakah ada nilai formState yang disimpan di localStorage saat komponen dimuat
    const savedFormState = JSON.parse(localStorage.getItem("formState"));
    if (savedFormState) {
      console.log("test untuk set form state");
      console.log("savedFormState useeffect", savedFormState);
      setFormState(savedFormState);
    }
  }, []);

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     console.log(reader.result, "reader reader");

  //     reader.onloadend = async () => {
  //       console.log(reader.result, "reader.result reader.result");
  //       setFormState({ ...formState, foto_wajah: reader.result });

  //       // setImagePreview(reader.result);
  //       console.log(formState.foto_wajah, "imagePreview imagePreview");
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const updatedFormState = { ...formState, foto_wajah: reader.result };

        // Simpan formState yang diperbarui ke localStorage
        localStorage.setItem("formState", JSON.stringify(updatedFormState));

        setFormState(updatedFormState);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFoto = () => {
    setFormState({ ...formState, foto_wajah: "" });
    const inputElement = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const fetchJenisPerkara = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadjenisperkara(params, token)
      .then((res) => {
        setDataJenisPerkara(res.data.records);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const Oditur = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadJaksaPenyidik(params, token)
      .then((res) => {
        setDataOditurPenyidik(res.data.records);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const tersangka = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadAllWBP(params, token)
      .then((res) => {
        setDataWBP(res.data.records);
        const tersangka = res.data.records?.map((item: any) => ({
          value: item.wbp_profile_id,
          label: `${item.nama} (Tersangka)`,
        }));
        setPihakTerlibat((prevPihakTerlibat) =>
          prevPihakTerlibat.concat(tersangka)
        );
      })
      .catch((e) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const Saksi = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadSaksi(params, token)
      .then((res) => {
        setDataSaksi(res.data.records);
        console.log("responsaksi", res.data.records);

        const Saksi = res.data.records?.map((item: any) => ({
          value: item.saksi_id,
          label: `${item.nama_saksi} (Saksi)`,
        }));
        setPihakTerlibat((prevPihaklibat) => prevPihaklibat.concat(Saksi));
      })
      .catch((e) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  let fetchData = async () => {
    setIsLoading(true);
    try {
      let params = {
        //   pagination: {
        //     currentPage: currentPage,
        //     pageSize: pageSize,
        //   },
      };
      const responseRead = await apiReadAllWBP(params, token);
      if (responseRead.data.status === "OK") {
        let temp = responseRead.data.records;
        temp.forEach((obj: any) => {
          obj.akses_ruangan_otmil_id = obj.akses_ruangan_otmil.map(
            (item: any) => item.ruangan_otmil_id
          );
        });
        // setData(temp);
        // setPages(responseRead.data.pagination.totalPages);
        // setRows(responseRead.data.pagination.totalRecords);
        setIsLoading(false);
      } else if (responseRead.data.status === "NO") {
        Alerts.fire({
          icon: "error",
          title: "Data tidak bisa dimuat",
        });
      } else {
        throw new Error(responseRead.data.message);
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

  const fecthKasusData = async () => {
    let params = {
      pageSize: 1000,
      page: 1,
      filter: {},
    };
    await apiKasusRead(params, token)
      .then((res) => {
        const result = res.data.records;
        setKasusData(result);
      }, token)
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const onSubmit = async (params: any) => {
    if (params.hasOwnProperty("is_new_kasus")) {
      params.is_new_kasus = params.is_new_kasus === "true";
    }
    console.log(params, "paramsTersangka");
    try {
      const responseAdd = await apiCreateWBP(params, token);
      if (responseAdd.data[1].status === "OK") {
        Alerts.fire({
          icon: "success",
          title: "Berhasil membuat data",
        });
        handleNext();
        // setModalAddOpen(false);
        fetchData();
      } else if (responseAdd.data.status === "NO") {
        Alerts.fire({
          icon: "error",
          title: "Gagal membuat data",
        });
      } else {
        throw new Error(responseAdd.data.message);
      }

      // return true
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

  async function handleSetNomorKasus() {
    if (formState.is_new_kasus == "true") {
      await setFormState({ ...formState, nomor_kasus: nomorKasus });
    }
  }
  useEffect(() => {
    handleSetNomorKasus();
  }, [formState.is_new_kasus]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(formState, "formstate");
    if (!validateForm()) return;
    setButtonLoad(true);

    onSubmit(formState);
    setButtonLoad(false);
  };

  //start api select
  const getAllRuangan = async () => {
    await apiReadAllRuanganOtmil(
      {
        pageSize: 1000,
        page: 1,
        filter: {
          nama_lokasi_otmil: "Cimahi",
        },
      },
      token
    )
      .then((res) => {
        console.log(res.data.records, "res");
        setZona(res.data.records);
        setAutocompleteDataZona(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const getAllKategoriPerkara = async () => {
    let params = {};
    await apiReadAllKategoriJahat(params, token)
      .then((res) => {
        setKategoriJahat(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const getAllJenisPerkara = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadAllJenisPerkara(params, token)
      .then((res) => {
        setJenisPerkara(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const pangkatData = async () => {
    let params = {};
    await apiReadAllPangkat(params, token)
      .then((res) => {
        setPangkat(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const kotaData = async () => {
    await apiKota(token)
      .then((res) => {
        setKota(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const provinsiData = async () => {
    await apiProvinsi(token)
      .then((res) => {
        setProvinsi(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const agamaData = async () => {
    await apiAgama(token)
      .then((res) => {
        setAgama(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const statusKawinData = async () => {
    await apiStatusKawin(token)
      .then((res) => {
        setStatusKawin(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const pendidikanData = async () => {
    await apiPendidikan(token)
      .then((res) => {
        setPendidikan(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const keahlianData = async () => {
    await apiKeahlian(token)
      .then((res) => {
        setKeahlian(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const kesatuanData = async () => {
    await apiKesatuan(token)
      .then((res) => {
        setKesatuan(res);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const hunianData = async () => {
    let params = {
      pageSize: 1000,
      page: 1,
      filter: {},
    };
    await apiReadAllHunian(params, token)
      .then((res) => {
        setHunian(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const gelangData = async () => {
    let params = {
      pageSize: 1000,
      page: 1,
      filter: {},
    };
    await apiGelang(params, token)
      .then((res) => {
        const result = res.data.records;
        setGelang(result);
      }, token)
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const matraData = async () => {
    await apiMatraRead(
      {
        params: {
          pageSize: 1000,
          page: 1,
          filter: {},
        },
      },
      token
    )
      .then((res) => {
        setMatra(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };

  const statusWbpData = async () => {
    await apiStatusWbp(
      {
        params: {
          pageSize: 1000,
          page: 1,
          filter: {},
        },
      },
      token
    )
      .then((res) => {
        setStatusWbp(res.data.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
  };
  //end api select

  // handle select start
  const handleSelectPangkat = (selectedOption: any) => {
    let newFormState = {
      ...formState,
      pangkat_id: selectedOption?.value,
      pangkat: { label: selectedOption?.label, value: selectedOption?.value },
    };

    setFormState(newFormState);
    // Menyimpan nilai formState ke localStorage setiap kali nilai berubah
    // console.log(selectedOption, 'selectedOption pangkat');
    console.log("newFormState pangkat", newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectAgama = (selectedOption: any) => {
    // setFormState({ ...formState, agama_id: e?.value });
    let newFormState = {
      ...formState,
      agama_id: selectedOption?.value,
      agama: { label: selectedOption?.label, value: selectedOption?.value },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectKesatuan = (selectedOption: any) => {
    // setFormState({ ...formState, kesatuan_id: e?.value });
    let newFormState = {
      ...formState,
      kesatuan_id: selectedOption?.value,
      kesatuan: { label: selectedOption?.label, value: selectedOption?.value },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectStatusKawin = (selectedOption: any) => {
    // setFormState({ ...formState, status_kawin_id: e?.value });
    let newFormState = {
      ...formState,
      status_kawin_id: selectedOption?.value,
      status_kawin: {
        label: selectedOption?.label,
        value: selectedOption?.value,
      },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectBidangKeahlian = (selectedOption: any) => {
    // setFormState({ ...formState, bidang_keahlian_id: e?.value });
    let newFormState = {
      ...formState,
      bidang_keahlian_id: selectedOption?.value,
      bidang_keahlian: {
        label: selectedOption?.label,
        value: selectedOption?.value,
      },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectHunianTahanan = (selectedOption: any) => {
    // setFormState({ ...formState, hunian_wbp_otmil_id: e?.value });
    let newFormState = {
      ...formState,
      hunian_wbp_otmil_id: selectedOption?.value,
      hunian_wbp_otmil: {
        label: selectedOption?.label,
        value: selectedOption?.value,
      },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };
  console.log(formState, "formState");
  const handleSelectPendidikan = (selectedOption: any) => {
    // setFormState({ ...formState, pendidikan_id: e?.value });
    let newFormState = {
      ...formState,
      pendidikan_id: selectedOption?.value,
      pendidikan: {
        label: selectedOption?.label,
        value: selectedOption?.value,
      },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectWbpStatus = (selectedOption: any) => {
    // setFormState({ ...formState, status_wbp_kasus_id: e?.value });
    let newFormState = {
      ...formState,
      status_wbp_kasus_id: selectedOption?.value,
      status_wbp_kasus: {
        label: selectedOption?.label,
        value: selectedOption?.value,
      },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectMatra = (selectedOption: any) => {
    let newFormState = {
      ...formState,
      matra_id: selectedOption?.value,
      matra: { label: selectedOption?.label, value: selectedOption?.value },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectProvinsi = (selectedOption: any) => {
    // setFormState({ ...formState, provinsi_id: e?.value, kota_id: '' });
    let newFormState = {
      ...formState,
      provinsi_id: selectedOption?.value,
      provinsi: { label: selectedOption?.label, value: selectedOption?.value },
      kota_id: "",
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectKota = (selectedOption: any) => {
    // setFormState({ ...formState, kota_id: e?.value });
    let newFormState = {
      ...formState,
      kota_id: selectedOption?.value,
      kota: { label: selectedOption?.label, value: selectedOption?.value },
    };

    setFormState(newFormState);

    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectGelang = (selectedOption: any) => {
    // setFormState({ ...formState, gelang_id: e?.value });
    console.log("selectedOption", selectedOption);

    let newFormState = {
      ...formState,
      dmac: selectedOption?.dmac,
      gelang_id: selectedOption?.value,
      gelang: {
        label: selectedOption?.label,
        value: selectedOption?.value,
        dmac: selectedOption?.dmac,
      },
    };
    setFormState(newFormState);

    console.log("newFormState", newFormState);
    localStorage.setItem("formState", JSON.stringify(newFormState));
  };

  const handleSelectJenisPerkara = (e: any) => {
    const selectedId = e?.value;
    const vonisFilter = jenisPerkara.find(
      (item: any) => item.jenis_perkara_id === selectedId
    );
    const kategoriPerkara: any = dataJenisPerkara.find(
      (item: any) => item.jenis_perkara_id === e?.value
    );
    setFormState({
      ...formState,
      jenis_perkara_id: selectedId,
      vonis_tahun_perkara: vonisFilter ? vonisFilter.vonis_tahun_perkara : "",
      vonis_bulan_perkara: vonisFilter ? vonisFilter.vonis_bulan_perkara : "",
      vonis_hari_perkara: vonisFilter ? vonisFilter.vonis_hari_perkara : "",

      kategori_perkara_id: kategoriPerkara
        ? kategoriPerkara.kategori_perkara_id
        : "",
      jenis_pidana_id: kategoriPerkara ? kategoriPerkara.jenis_pidana_id : "",
      nama_jenis_perkara: kategoriPerkara
        ? kategoriPerkara.nama_jenis_perkara
        : "",
      nama_jenis_pidana: kategoriPerkara
        ? kategoriPerkara.nama_jenis_pidana
        : "",
    });
  };

  const oditurPenyidikOptions = dataOditurPenyidik.map((item: any) => ({
    value: item.oditur_penyidik_id,
    label: item.nama_oditur,
  }));

  const handleSelectOditurPenyidik = (e: any) => {
    let arrayTemp: any = [];
    let arrayAnggota: any = [];
    for (let i = 0; i < e?.length; i++) {
      arrayTemp.push(e[i].value);
      arrayAnggota.push(e[i]);
    }
    setFormState({ ...formState, oditur_penyidik_id: arrayTemp });
    setKetuaOditurPenyidik(arrayAnggota);
  };

  const handleSelectKetuaOditur = (e: any) => {
    setFormState({ ...formState, role_ketua_oditur_ids: e.value });
  };

  const handleSelectPihakTerlibat = (e: any) => {
    let arrayTersangka: any = [];
    let arraySaksi: any = [];
    let arraySaksiOptions: any = [];
    let arrayTersangkaOptions: any = [];
    for (let i = 0; i < e?.length; i++) {
      if (e[i].label.includes("(Tersangka)")) {
        arrayTersangka.push(e[i].value);
        arrayTersangkaOptions.push(e[i]);
      } else if (e[i].label.includes("(Saksi)")) {
        arraySaksi.push(e[i].value);
        arraySaksiOptions.push(e[i]);
      }
    }
    setFormState({
      ...formState,
      wbp_profile_ids: arrayTersangka,
      saksi_id: arraySaksi,
    });
    setSelectSaksi(arraySaksiOptions);
    setSelectTersangka(arrayTersangkaOptions);
  };

  const handleChangeKeteranganTersangka = (e: any, index: any) => {
    const newKeteranganSaksi = [...formState.keterangans];
    newKeteranganSaksi[index] = e.target.value;
    setFormState({
      ...formState,
      keterangans: newKeteranganSaksi,
    });
  };

  const handleChangeKeterangan = (e: any, index: any) => {
    const newKeteranganSaksi = [...formState.keteranganSaksis];
    newKeteranganSaksi[index] = e.target.value;
    setFormState({
      ...formState,
      keteranganSaksis: newKeteranganSaksi,
    });
  };

  // const handleSelectJenisKasus = (e: any) => {
  //   if (e && e.value) {
  //     const filterKasus = kasusData.find((item) => item.kasus_id == e.value);
  //     const existingWbpId = filterKasus?.wbp_profile.map(
  //       (item) => item.wbp_profile_id,
  //     );
  //     console.log(filterKasus, 'INI HASIL FILTER');
  //     console.log(existingWbpId, 'INI HASIL EXISTING');
  //     console.log(kasusData, 'INI KASUS DATA');
  //     setFormState({
  //       ...formState,
  //       kasus_id: e.value,
  //     });
  //   } else {
  //     setFormState({
  //       ...formState,
  //       kasus_id: '',
  //     });
  //   }
  // };

  const handleSelectJenisKasus = (selectedOption: any) => {
    if (selectedOption && selectedOption.value) {
      const filterKasus = kasusData.find(
        (item) => item.kasus_id == selectedOption.value
      );
      const existingWbpId = filterKasus?.wbp_profile.map(
        (item) => item.wbp_profile_id
      );
      console.log(filterKasus, "INI HASIL FILTER");
      console.log(existingWbpId, "INI HASIL EXISTING");
      console.log(kasusData, "INI KASUS DATA");
      const newFormState = {
        ...formState,
        kasus_id: selectedOption?.value,
        kasus: { label: selectedOption?.label, value: selectedOption?.value },
      };
      setFormState(newFormState);
      localStorage.setItem("formState", JSON.stringify(newFormState)); // Simpan data di localStorage
    } else {
      const newFormState = {
        ...formState,
        kasus_id: "",
        kasus: { label: "", value: "" },
      };
      setFormState(newFormState);
      localStorage.setItem("formState", JSON.stringify(newFormState)); // Simpan data di localStorage
    }
  };

  const handleNewKasus = (e: any) => {
    const checked = e.target.value;
    setBuatKasusBaru(checked);
    setFormState({
      ...formState,
      is_new_kasus: checked,
      vonis_bulan_perkara: "",
      vonis_tahun_perkara: "",
      vonis_hari_perkara: "",
    });
  };

  //end handle select

  //start handle zona
  const [zona, setZona] = useState<any>([]);
  const [autocompleteDataZona, setAutocompleteDataZona]: any[] = useState([
    zona,
  ]);

  // const handleAddZona = (zonaId: number, isPermitted: number) => {
  //   console.log('ZONA', zonaId, 'INPUT', isPermitted);

  //   if (formState.akses_ruangan_otmil_id.includes(zonaId)) {
  //     // Check if the "zona" is already added to any input

  //     // If it's already added, show an error or handle it as needed
  //     setErrors([...errors, `Zona ${zonaId} is already assigned.`]);
  //   } else {
  //     // If it's not added to any input, assign it to the specified input
  //     let objectZona = {};
  //     if (isPermitted == 1) {
  //       objectZona = {
  //         id: zonaId,
  //         isPermitted: 1,
  //       };
  //     } else {
  //       objectZona = {
  //         id: zonaId,
  //         isPermitted: 0,
  //       };
  //     }
  //     setFormState({
  //       ...formState,
  //       akses_ruangan_otmil_id: [
  //         ...formState.akses_ruangan_otmil_id,
  //         objectZona,
  //       ],
  //     });

  //     // combine state
  //     // const combineZona = [...formState.akses_ruangan_otmil_id, ...formState.zona_merah]
  //     // setFormState({...formState, akses_wbp_otmil: combineZona})

  //     // Remove the selected zona from the autocomplete data
  //     setAutocompleteDataZona((prevData: any) =>
  //       prevData.filter(
  //         (zonaItem: any) => zonaItem.ruangan_otmil_id !== zonaId,
  //       ),
  //     );
  //   }
  // };

  const handleAddZona = (zonaId: number, isPermitted: number) => {
    console.log("ZONA", zonaId, "INPUT", isPermitted);

    if (formState.akses_ruangan_otmil_id.includes(zonaId)) {
      // Check if the "zona" is already added to any input

      // If it's already added, show an error or handle it as needed
      setErrors([...errors, `Zona ${zonaId} is already assigned.`]);
    } else {
      // If it's not added to any input, assign it to the specified input
      let objectZona = {};
      if (isPermitted == 1) {
        objectZona = {
          id: zonaId,
          isPermitted: 1,
        };
      } else {
        objectZona = {
          id: zonaId,
          isPermitted: 0,
        };
      }
      // Update formState
      const updatedFormState = {
        ...formState,
        akses_ruangan_otmil_id: [
          ...formState.akses_ruangan_otmil_id,
          objectZona,
        ],
      };
      setFormState(updatedFormState);

      // Remove the selected zona from the autocomplete data
      setAutocompleteDataZona((prevData: any) =>
        prevData.filter((zonaItem: any) => zonaItem.ruangan_otmil_id !== zonaId)
      );

      // Simpan data yang diperbarui ke localStorage
      localStorage.setItem(
        "akses_ruangan_otmil_id",
        JSON.stringify(updatedFormState.akses_ruangan_otmil_id)
      );
    }
  };

  const savedDataString = localStorage.getItem("akses_ruangan_otmil_id");
  if (savedDataString) {
    const savedData = JSON.parse(savedDataString);
    console.log(savedData);
  } else {
    console.log("Data not found in localStorage");
  }

  // useEffect(() => {
  //   // if (dataAdmin?.akses_ruangan_otmil_id?.length === 0) {
  //     localStorage.setItem('formState', JSON.stringify(formState));
  //   // }
  // }, [formState]);
  // useEffect(() => {
  //   if (dataAdmin?.akses_ruangan_otmil_id?.length === 0) {
  //     localStorage.setItem('formState', JSON.stringify(formState));
  //   }
  // }, [formState]);
  // Function to handle removing a "zona" from the selected chips
  // const handleRemoveZona = (zonaId: any, inputField: any) => {
  //   // Remove the zona from the selected input field
  //   setFormState({
  //     ...formState,
  //     akses_ruangan_otmil_id: formState.akses_ruangan_otmil_id.filter(
  //       (id: any) => id.id !== zonaId,
  //     ),
  //   });

  //   setAutocompleteDataZona((prevData: any) => [
  //     ...prevData,
  //     zona.find((zonaItem: any) => zonaItem.ruangan_otmil_id === zonaId),
  //   ]);
  //   // }
  // };

  const handleRemoveZona = (zonaId: any, inputField: any) => {
    // Hapus zona dari selected input field
    const updatedFormState = {
      ...formState,
      akses_ruangan_otmil_id: formState.akses_ruangan_otmil_id.filter(
        (id: any) => id.id !== zonaId
      ),
    };
    setFormState(updatedFormState);

    // Tambahkan zona yang dihapus kembali ke data autocomplete
    setAutocompleteDataZona((prevData: any) => [
      ...prevData,
      zona.find((zonaItem: any) => zonaItem.ruangan_otmil_id === zonaId),
    ]);

    // Simpan data yang diperbarui ke localStorage
    localStorage.setItem(
      "akses_ruangan_otmil_id",
      JSON.stringify(updatedFormState.akses_ruangan_otmil_id)
    );
  };

  //end handle zona

  useEffect(() => {
    Promise.all([
      matraData(),
      pangkatData(),
      kotaData(),
      provinsiData(),
      agamaData(),
      statusKawinData(),
      pendidikanData(),
      keahlianData(),
      kesatuanData(),
      hunianData(),
      gelangData(),
      getAllJenisPerkara(),
      getAllKategoriPerkara(),
      getAllRuangan(),
      statusWbpData(),
      fecthKasusData(),
      fetchJenisPerkara(),
      getTimeZone(),
      Oditur(),
      tersangka(),
      Saksi(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const [isZonaHijauEmpty, setIsZonaHijauEmpty] = useState(false);
  const [isZonaMerahEmpty, setIsZonaMerahEmpty] = useState(false);

  const handleZona = () => {
    setIsZonaHijauEmpty(formState.akses_ruangan_otmil_id.length === 0);
    setIsZonaMerahEmpty(formState.zona_merah.length === 0);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-600 w-full h-full p-6">
          <div className="form group w-full h-[360px]">
            <div className="mb-4">
              <p className="text-center bg-slate-500 font-bold text-white rounded-md">
                Data Tersangka
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Foto Wajah */}
              <div className="mt-1 flex flex-col items-center h-65">
                {formState.foto_wajah ? (
                  <img
                    className="object-contain w-[300px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                    src={formState.foto_wajah}
                    alt="Image Preview"
                  />
                ) : (
                  <img
                    className="w-[300px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
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
                    <div className="f-unggah-gambar cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                      Unggah Gambar
                    </div>
                  </label>

                  <button
                    onClick={handleRemoveFoto}
                    className="t-remove-gambar cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
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
                    item === "foto_wajah" ? "Masukan foto" : ""
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                {/* Nama */}
                <div className="f-nama form-group w-full flex flex-col">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Nama
                  </label>
                  <input
                    className="w-full rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-gray dark:bg-slate-800  dark:focus:border-primary"
                    name="nama"
                    placeholder="Nama"
                    onChange={handleChange}
                    value={formState.nama}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "nama" ? "Masukan nama" : ""
                    )}
                  </p>
                </div>

                {/* Pangkat */}
                <div className="f-pangkat form-group w-full flex flex-col mt-3">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Pangkat
                  </label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={CustomStyles}
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Pilih Pangkat"
                    name="pangkat_id"
                    options={pangkat.map((item: any) => ({
                      value: item.pangkat_id,
                      label: item.nama_pangkat,
                    }))}
                    onChange={handleSelectPangkat}
                    defaultValue={formState.pangkat}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "pangkat_id" ? "Pilih pangkat" : ""
                    )}
                  </p>
                </div>

                {/* Matra */}
                <div className="f-pangkat form-group w-full flex flex-col mt-3">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Matra
                  </label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={CustomStyles}
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Pilih Matra"
                    name="matra_id"
                    options={matra.map((item: any) => ({
                      value: item.matra_id,
                      label: item.nama_matra,
                    }))}
                    onChange={handleSelectMatra}
                    defaultValue={formState.matra}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "matra_id" ? "Pilih matra" : ""
                    )}
                  </p>
                </div>

                {/* NRP  */}
                <div className="f-nrp form-group w-full flex flex-col mt-3">
                  <label
                    className="  block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    NRP
                  </label>
                  <input
                    className="w-full rounded border border-stroke  py-3 pl-3 pr-4.5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-gray dark:bg-slate-800  dark:focus:border-primary"
                    name="nrp"
                    placeholder="Nomor registrasi"
                    onChange={handleChange}
                    value={formState.nrp}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "nrp" ? "Masukan nomor" : ""
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-18">
            {/* Pendidikan*/}
            <div className="f-pendidikan form-group w-full flex flex-col ">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Pendidikan Militer
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                name="pendidikan_id"
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Pendidikan"
                options={pendidikan.map((item) => ({
                  value: item.pendidikan_id,
                  label: item.nama_pendidikan,
                }))}
                onChange={handleSelectPendidikan}
                defaultValue={formState.pendidikan}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "pendidikan_id" ? "Pilih pendidikan" : ""
                )}
              </p>
            </div>

            {/* Kesatuan */}
            <div className="f-kesatuan form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Kesatuan
              </label>

              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                name="kesatuan_id"
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Kesatuan"
                options={kesatuan.map((item: any) => ({
                  value: item.kesatuan_id,
                  label: item.nama_kesatuan,
                }))}
                onChange={handleSelectKesatuan}
                defaultValue={formState.kesatuan}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "kesatuan_id" ? "Pilih kesatuan" : ""
                )}
              </p>
            </div>

            {/* Jenis Kelamin */}
            <div className="f-kelamin form-group w-full flex flex-col">
              <label
                className=" block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Jenis Kelamin
              </label>
              <select
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="jenis_kelamin"
                onChange={handleChange}
                value={formState.jenis_kelamin}
              >
                <option disabled value="">
                  Pilih Jenis Kelamin
                </option>
                <option value="1">Laki-laki</option>
                <option value="0">Perempuan</option>
              </select>
              <p className="error-text">
                {errors.map((item) =>
                  item === "jenis_kelamin" ? "Pilih jenis kelamin" : ""
                )}
              </p>
            </div>

            {/* Agama */}
            <div className="f-agama form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Agama
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                name="agama_id"
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Agama"
                options={agama.map((item: any) => ({
                  value: item.agama_id,
                  label: item.nama_agama,
                }))}
                onChange={handleSelectAgama}
                defaultValue={formState.agama}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "agama_id" ? "Pilih agama" : ""
                )}
              </p>
            </div>

            {/* Tempat Lahir */}
            <div className="f-tempat-lahir form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Tempat Lahir
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[10.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="tempat_lahir"
                placeholder="Tempat Lahir"
                onChange={handleChange}
                value={formState.tempat_lahir}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "tempat_lahir" ? "Masukan tempat_lahir" : ""
                )}
              </p>
            </div>

            {/* Tanggal Lahir */}
            <div className="f-tanggal-lahir form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Tanggal Lahir
              </label>
              <input
                type="date"
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="tanggal_lahir"
                onChange={handleChange}
                value={formState.tanggal_lahir}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "tanggal_lahir" ? "Masukan tanggal lahir" : ""
                )}
              </p>
            </div>

            {/* Provinsi */}
            <div className="f-provinsi form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Provinsi
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder={"Pilih provinsi"}
                isClearable={true}
                isSearchable={true}
                name="provinsi_id"
                styles={CustomStyles}
                options={provinsi.map((item: any) => ({
                  value: item.provinsi_id,
                  label: item.nama_provinsi,
                }))}
                onChange={handleSelectProvinsi}
                defaultValue={formState.provinsi}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "provinsi_id" ? "Pilih provinsi" : ""
                )}
              </p>
            </div>

            {/* Kota */}
            <div className="f-kota form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Kota
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder={"Pilih kota"}
                isClearable={true}
                isSearchable={true}
                name="kota_id"
                styles={CustomStyles}
                options={kota
                  .filter((item: any) => {
                    return item.provinsi_id === formState.provinsi_id;
                  })
                  .map((item) => ({
                    value: item.kota_id,
                    label: item.nama_kota,
                  }))}
                onChange={handleSelectKota}
                defaultValue={formState.kota}
              />
              <p className="error-text">
                {errors.map((item) => (item === "kota_id" ? "Pilih Kota" : ""))}
              </p>
            </div>
          </div>

          {/* Alamat */}
          <div className="f-alamat form-group w-full flex flex-col mt-3">
            <label
              className=" block text-sm font-medium text-black dark:text-white"
              htmlFor="id"
            >
              Alamat
            </label>
            <textarea
              className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
              name="alamat"
              placeholder="Alamat"
              onChange={handleChange}
              value={formState.alamat}
            />
            <p className="error-text">
              {errors.map((item) =>
                item === "alamat" ? "Masukan alamat" : ""
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Status Kawin */}
            <div className="f-status-kawin form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Status Kawin
              </label>

              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                name="status_kawin_id"
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Status Kawin"
                options={statusKawin.map((item) => ({
                  value: item.status_kawin_id,
                  label: item.nama_status_kawin,
                }))}
                onChange={handleSelectStatusKawin}
                defaultValue={formState.status_kawin}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "status_kawin_id" ? "Pilih status nikah" : ""
                )}
              </p>
            </div>

            {/* Kontak Keluarga Nama */}
            <div className="f-nama-keluarga form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Nama Keluarga
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="nama_kontak_keluarga"
                placeholder="Nama keluarga"
                onChange={handleChange}
                value={formState.nama_kontak_keluarga}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "nama_kontak_keluarga" ? "Masukan nama keluarga" : ""
                )}
              </p>
            </div>

            {/* Status Keluarga */}
            <div className="f-status-keluarga form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Status Hubungan
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="hubungan_kontak_keluarga"
                placeholder="Status hubungan"
                onChange={handleChange}
                value={formState.hubungan_kontak_keluarga}
              />

              <p className="error-text">
                {errors.map((item) =>
                  item === "hubungan_kontak_keluarga"
                    ? "Pilih status hubungan"
                    : ""
                )}
              </p>
            </div>

            {/* Kontak Keluarga no HP */}
            <div className="f-kontak-keluarga form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Nomor Kontak Keluarga
              </label>
              <input
                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                name="nomor_kontak_keluarga"
                placeholder="Kontak keluarga"
                onChange={handleChange}
                value={formState.nomor_kontak_keluarga}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "nomor_kontak_keluarga"
                    ? "Masukan kontak keluarga"
                    : ""
                )}
              </p>
            </div>

            {/* Keahlian */}
            <div className="f-keahlian form-group w-full ">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Keahlian
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                name="bidang_keahlian_id"
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Keahlian"
                options={keahlian.map((item: any) => ({
                  value: item.bidang_keahlian_id,
                  label: item.nama_bidang_keahlian,
                }))}
                onChange={handleSelectBidangKeahlian}
                defaultValue={formState.bidang_keahlian}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === "bidang_keahlian_id" ? "Pilih keahlian" : ""
                )}
              </p>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <p className="text-center bg-slate-500 font-bold text-white rounded-md">
              Data Perkara
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-col gap-4">
              {/* buat kasus baru */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group w-full">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-black dark:text-white"
                  >
                    Buat Kasus Baru (?)
                  </label>
                  <select
                    name="is_new_kasus"
                    className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    onChange={handleNewKasus}
                    defaultValue={formState.is_new_kasus}
                  >
                    <option value="">Silahkan Pilih</option>

                    <option value="false">Tidak</option>
                    <option value="true">Ya</option>
                  </select>
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "is_new_kasus" ? "Pilih Ya/Tidak" : ""
                    )}
                  </p>
                </div>
              </div>
              {formState.is_new_kasus == "" ? null : buatKasusBaru ===
                "true" ? (
                // Kasus Baru
                <div className="grid grid-cols-1 gap-4">
                  {/* <div className="form-group w-full ">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Kasus
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      placeholder="Nomor Kasus"
                      name="nomor_kasus"
                      value={formState.nomor_kasus}
                    />
                    <div className="">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'nomor_kasus' ? 'Masukan Nomor Kasus' : '',
                        )}
                      </p>
                    </div>
                  </div> */}

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Kasus
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      placeholder="Nama Kasus"
                      name="nama_kasus"
                      onChange={handleChange}
                      // disabled={isDetail}
                    />
                    <div className="">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "nama_kasus" ? "Masukkan Nama Kasus" : ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="f-alamat form-group">
                    <label
                      htmlFor="id"
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Jenis Perkara
                    </label>
                    <Select
                      className="basic-single p-gelang"
                      classNamePrefix="select"
                      styles={CustomStyles}
                      defaultValue={
                        formState.jenis_perkara_id
                          ? jenisPerkara.find(
                              (item: any) =>
                                item.jenis_perkara_id ===
                                formState.jenis_perkara_id
                            )
                          : formState.jenis_perkara_id
                      }
                      placeholder={"Pilih Jenis Perkara"}
                      isSearchable={true}
                      isClearable={true}
                      name="jenis_perkara_id"
                      options={jenisPerkara.map((item: any) => ({
                        value: item.jenis_perkara_id,
                        label: item.nama_jenis_perkara,
                      }))}
                      onChange={handleSelectJenisPerkara}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "jenis_perkara_id" ? "Pilih jenis perkara" : ""
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="f-alamat form-group">
                      <label
                        htmlFor="id"
                        className="block text-sm font-medium text-black dark:text-white"
                      >
                        Vonis Tahun
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="vonis_tahun_perkara"
                        value={formState.vonis_tahun_perkara}
                        disabled
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "vonis_tahun_perkara"
                            ? "Masukan tanggal masa penahanan"
                            : ""
                        )}
                      </p>
                    </div>

                    <div className="f-alamat form-group">
                      <label
                        htmlFor="id"
                        className="block text-sm font-medium text-black dark:text-white"
                      >
                        Vonis Bulan
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="vonis_bulan_perkara"
                        value={formState.vonis_bulan_perkara}
                        disabled
                      />
                    </div>

                    <div className="f-alamat form-group">
                      <label
                        htmlFor="id"
                        className="block text-sm font-medium text-black dark:text-white"
                      >
                        Vonis Hari
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="vonis_hari_perkara"
                        value={formState.vonis_hari_perkara}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white pt-3"
                      htmlFor="id"
                    >
                      Nama Jenis Pidana
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      placeholder="Nama Jenis Pidana"
                      name="nama_jenis_pidana"
                      onChange={handleChange}
                      value={formState.nama_jenis_pidana}
                      disabled
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "nama_jenis_pidana"
                            ? "Masukan Nama Jenis Pidana"
                            : ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Lokasi Kasus
                    </label>
                    <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      placeholder="Lokasi Kasus"
                      name="lokasi_kasus"
                      onChange={handleChange}
                    />
                    <div className="">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "lokasi_kasus" ? "Masukan Lokasi Kasus" : ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="f-tanggal-lahir form-group w-full flex flex-col">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Tanggal Kejadian Kasus
                      </label>
                      <div className="flex">
                        {/* <input
                          type="datetime-local"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          name="waktu_kejadian"
                          onChange={handleChange}
                          value={formState.waktu_kejadian}
                        /> */}
                        <DatePicker
                          selected={
                            formState.waktu_kejadian
                              ? dayjs(formState.waktu_kejadian).toDate()
                              : dayjs().toDate()
                          }
                          showTimeInput
                          timeFormat="HH:mm"
                          onChange={handleWaktuKejadian}
                          timeCaption="Time"
                          dateFormat="dd/MM/yyyy HH:mm"
                          customTimeInput={<ExampleCustomTimeInput />}
                          className="w-full rounded border border-stroke py-3 pl-3 pr-15.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-kejadian"
                          name="waktu_kejadian"
                          disabled={false}
                          locale="id"
                        />
                        <input
                          type="text"
                          className="w-[5rem] mx-1 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                          name="zona_waktu"
                          value={formState.zona_waktu}
                          disabled
                        />
                      </div>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "waktu_kejadian"
                            ? "Masukan waktu kejadian"
                            : ""
                        )}
                      </p>
                    </div>

                    <div className="f-tanggal-lahir form-group w-full flex flex-col mb-5">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Tanggal Pelaporan Kasus
                      </label>
                      <div className="flex">
                        <input
                          type="datetime-local"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          name="waktu_pelaporan_kasus"
                          onChange={handleChange}
                          value={formState.waktu_pelaporan_kasus}
                        />
                        <input
                          type="text"
                          className="w-[5rem] mx-1 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                          name="zona_waktu"
                          value={formState.zona_waktu}
                          disabled
                        />
                      </div>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "waktu_pelaporan_kasus"
                            ? "Masukan waktu pelaporan kasus"
                            : ""
                        )}
                      </p>
                    </div>

                    <div className="form-group w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Tanggal Pelimpahan Kasus
                      </label>
                      <input
                        type="date"
                        className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-pelimpahan"
                        name="tanggal_pelimpahan_kasus"
                        placeholder="Tanggal Pelimpahan Kasus"
                        onChange={handleChange}
                        // disabled={isDetail}
                        max={maxDate}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "tanggal_pelimpahan_kasus"
                            ? "Masukan Tanggal Pelimpahan Kasus"
                            : ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className={"block mt-4hidden"}>
                    {/* <div className="form-group w-full">
                              <label
                                className="block text-sm font-medium text-black dark:text-white pt-3"
                                htmlFor="id"
                              >
                                Jumlah Penyidikan
                              </label>
                              <input
                                className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                placeholder="Jumlah Penyidikan"
                                name="waktu_pelaporan_kasus"
                                onChange={handleChange}
                                // disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'waktu_pelaporan_kasus'
                                    ? 'Masukan Jumlah Penyidikan'
                                    : '',
                                )}
                              </p>
                            </div> */}
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white pt-3"
                      htmlFor="id"
                    >
                      Oditur Penyidik
                    </label>
                    <Select
                      className="capitalize text-white"
                      isMulti
                      placeholder="Pilih Oditur Penyidik"
                      styles={customStyles}
                      options={oditurPenyidikOptions}
                      onChange={handleSelectOditurPenyidik}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "nama" ? "Masukan Tersangka" : ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white pt-3"
                      htmlFor="id"
                    >
                      Ketua Oditur Penyidik
                    </label>
                    <Select
                      className="capitalize"
                      placeholder="Pilih Ketua Oditur"
                      styles={customStyles}
                      options={ketuaOditurPenyidik}
                      onChange={handleSelectKetuaOditur}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "role_ketua_oditur_ids"
                            ? "Pilih Ketua Oditur Penyidik"
                            : ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="form-group w-full">
                    <label
                      className="block text-sm font-medium text-black dark:text-white pt-3"
                      htmlFor="id"
                    >
                      Pihak Terlibat
                    </label>
                    <Select
                      className="capitalize"
                      isMulti
                      placeholder="Pihak Terlibat"
                      styles={customStyles}
                      options={pihakTerlibat}
                      onChange={handleSelectPihakTerlibat}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.includes("saksi_id") ||
                        errors.includes("wbp_profile_ids")
                          ? `${
                              errors.includes("wbp_profile_ids")
                                ? "Tersangka"
                                : ""
                            } ${
                              errors.includes("saksi_id") &&
                              errors.includes("wbp_profiles_ids")
                                ? "Dan"
                                : ""
                            } ${
                              errors.includes("saksi_id") ? "Saksi" : ""
                            } Belum di Pilih`
                          : ""}
                      </p>
                    </div>
                  </div>
                  {selectTersangka.length === 0 ? null : (
                    <>
                      <div className="grid grid-rows-2">
                        <label
                          htmlFor="id"
                          className="mt-4 block text-sm font-medium text-black dark:text-white"
                        >
                          Tersangka
                        </label>

                        <div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
                          <div className="form-group w-2/6">
                            <label
                              htmlFor="id"
                              className="block text-sm font-medium text-black dark:text-white"
                            >
                              Nama Tersangka
                            </label>
                          </div>

                          <div className="form-group w-4/6">
                            <label
                              htmlFor="id"
                              className="block text-sm font-medium text-black dark:text-white"
                            >
                              Keterangan
                            </label>
                          </div>
                        </div>

                        <div className="h-32 overflow-y-auto bg-slate-800 rounded-b">
                          {selectTersangka.map((item: any, index: number) => {
                            return (
                              <div
                                className="flex items-center mt-2 bg-slate-800 py-2 pl-4"
                                key={index}
                              >
                                <div className="form-group w-2/6">
                                  <label
                                    htmlFor={`keterangans-${index}`}
                                    className="capitalize block text-sm font-medium text-black dark:text-white"
                                  >
                                    {item.label}
                                  </label>
                                </div>

                                <div className="form-group w-4/6 flex items-center mr-2">
                                  <input
                                    id={`keterangans${index}`}
                                    className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                    placeholder={`${
                                      errors.includes("keterangan")
                                        ? "Keterangan Belum Di Isi"
                                        : "Keterangan"
                                    }`}
                                    onChange={(e) =>
                                      handleChangeKeteranganTersangka(e, index)
                                    }
                                    // disabled={isDetail}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {selectSaksi.length === 0 ? null : (
                    <>
                      <div className="grid grid-rows-2">
                        <label
                          htmlFor="id"
                          className="mt-4 block text-sm font-medium text-black dark:text-white"
                        >
                          Saksi
                        </label>

                        <div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
                          <div className="form-group w-2/6">
                            <label
                              htmlFor="id"
                              className="block text-sm font-medium text-black dark:text-white"
                            >
                              Nama Saksi
                            </label>
                          </div>

                          <div className="form-group w-4/6">
                            <label
                              htmlFor="id"
                              className="block text-sm font-medium text-black dark:text-white"
                            >
                              Keterangan Saksi
                            </label>
                          </div>
                        </div>

                        <div className="h-32 overflow-y-auto bg-slate-800 rounded-b">
                          {selectSaksi.map((item: any, index: number) => {
                            return (
                              <div
                                className="flex items-center mt-2 bg-slate-800 py-2 pl-4"
                                key={index}
                              >
                                <div className="form-group w-2/6">
                                  <label
                                    className="capitalize block text-sm font-medium text-black dark:text-white"
                                    htmlFor={`keterangan-${index}`}
                                  >
                                    {item.label}
                                  </label>
                                </div>

                                <div className="form-group w-4/6 flex items-center mr-2">
                                  <input
                                    id={`keterangan-${index}`}
                                    className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                    placeholder={`${
                                      errors.includes("keteranganSaksis")
                                        ? "Keterangan Belum Di Isi"
                                        : "Keterangan Saksi"
                                    }`}
                                    onChange={(e) =>
                                      handleChangeKeterangan(e, index)
                                    }
                                    // disabled={isDetail}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Select Kasus
                <div className="f-alamat form-group">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-black dark:text-white"
                  >
                    Jenis Kasus
                  </label>
                  <Select
                    className="basic-single p-gelang"
                    classNamePrefix="select"
                    styles={CustomStyles}
                    // defaultValue={
                    //   formState.kasus_id
                    //     ? kasusData.find(
                    //         (item: any) =>
                    //           item.kasus_id === formState.kasus_id,
                    //       )
                    //     : formState.kasus_id
                    // }
                    defaultValue={formState.kasus}
                    placeholder={"Pilih Jenis Kasus"}
                    isSearchable={true}
                    // isDisabled={isDetail}
                    name="kasus_id"
                    // styles={customStyles}
                    options={kasusData.map((item: any) => ({
                      value: item.kasus_id,
                      label: item.nama_kasus,
                    }))}
                    onChange={handleSelectJenisKasus}
                  />
                  <p className="error-text">
                    {errors.map((item) =>
                      item === "kasus_id" ? "Pilih kasus" : ""
                    )}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Tanggal diTahan */}
                  <div className="f-tanggal-ditahan form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tanggal Ditahan
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="tanggal_ditahan_otmil"
                      onChange={handleChange}
                      value={formState.tanggal_ditahan_otmil}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "tanggal_ditahan_otmil"
                          ? "Masukan tanggal ditahan"
                          : ""
                      )}
                    </p>
                  </div>

                  {/* Gelang */}
                  <div className="f-gelang form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Gelang
                    </label>

                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      styles={CustomStyles}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="Pilih Gelang"
                      name="gelang_id"
                      options={gelang.map((item: any) => ({
                        value: item.gelang_id,
                        label: item.nama_gelang,
                        dmac: item.dmac,
                      }))}
                      onChange={handleSelectGelang}
                      defaultValue={formState.gelang}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "gelang_id" ? "Pilih gelang" : ""
                      )}
                    </p>
                  </div>

                  {/* DMAC Gelang */}
                  <div className="f-dmac-gelang form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      DMAC Gelang
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="DMAC"
                      placeholder="DMAC"
                      disabled
                      // onChange={handleChange}
                      value={formState.dmac}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "DMAC" ? "Pilih gelang dulu" : ""
                      )}
                    </p>
                  </div>

                  {/* Residivis */}
                  <div className="f-residivis form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Residivis
                    </label>

                    <select
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="residivis"
                      onChange={handleChange}
                      value={formState.residivis}
                    >
                      <option value="" disabled>
                        Pilih Residivis
                      </option>

                      <option value="0">Tidak</option>
                      <option value="1">Ya</option>
                    </select>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "residivis" ? "Pilih Ya/Tidak" : ""
                      )}
                    </p>
                  </div>

                  {/* Hunian Tahanan */}
                  <div className="f-hunian-tahanan form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Hunian Tahanan
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      styles={CustomStyles}
                      name="hunian_wbp_otmil_id"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="Pilih Hunian Tahanan"
                      options={hunian.map((item: any) => ({
                        value: item.hunian_wbp_otmil_id,
                        label: item.nama_hunian_wbp_otmil,
                      }))}
                      onChange={handleSelectHunianTahanan}
                      defaultValue={formState.hunian_wbp_otmil}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "hunian_wbp_otmil_id" ? "Pilih hunian" : ""
                      )}
                    </p>
                  </div>

                  {/* Nomor Tahanan*/}
                  <div className="f-nomor-tahanan form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nomor Tahanan
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="nomor_tahanan"
                      placeholder="Nomor Tahanan"
                      onChange={handleChange}
                      value={formState.nomor_tahanan}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "nomor_tahanan" ? "Masukan nomor tahanan" : ""
                      )}
                    </p>
                  </div>

                  {/* Terisolasi */}
                  <div className="f-status-terisolasi form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Terisolasi (?)
                    </label>
                    <select
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="is_isolated"
                      onChange={handleChange}
                      value={formState.is_isolated}
                    >
                      <option value="" disabled>
                        Silahkan Dipilih
                      </option>
                      <option value="0">Tidak</option>
                      <option value="1">Ya</option>
                    </select>
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "is_isolated" ? "Pilih Ya/Tidak" : ""
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Status Wbp*/}
                  <div className="f-status-tersangka form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Status Tersangka
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      styles={CustomStyles}
                      name="status_wbp_kasus_id"
                      isDisabled={false}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="Pilih Status"
                      options={statusWbp.map((item: any) => ({
                        value: item.status_wbp_kasus_id,
                        label: item.nama_status_wbp_kasus,
                      }))}
                      onChange={handleSelectWbpStatus}
                      defaultValue={formState.status_wbp_kasus}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "status_wbp_kasus_id" ? "Pilih status" : ""
                      )}
                    </p>
                  </div>

                  {formState.status_wbp_kasus_id === "" ||
                  formState.status_wbp_kasus_id === null ? null : (
                    <>
                      {/* Tanggal Penetapan Terpidana*/}
                      <div
                        className={`f-tanggal-terpidana form-group w-full  ${
                          formState.status_wbp_kasus_id ===
                          "55ae39b7-dbad-4c89-8968-6d1e2450c963"
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Tanggal penetapan terpidana
                        </label>
                        <input
                          type="date"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          name="tanggal_penetapan_terpidana"
                          onChange={handleChange}
                          value={formState.tanggal_penetapan_terpidana}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "tanggal_penetapan_terpidana"
                              ? "Masukan tanggal penetapan"
                              : ""
                          )}
                        </p>
                      </div>

                      {/* Tanggal Penetapan Terdakwa*/}
                      <div
                        className={`f-tanggal-terdakwa form-group w-full  ${
                          formState.status_wbp_kasus_id ===
                          "ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064"
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Tanggal penetapan terdakwa
                        </label>
                        <input
                          type="date"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          name="tanggal_penetapan_terdakwa"
                          onChange={handleChange}
                          value={formState.tanggal_penetapan_terdakwa}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "tanggal_penetapan_terdakwa"
                              ? "Masukan tanggal penetapan"
                              : ""
                          )}
                        </p>
                      </div>

                      {/* Tanggal Penetapan Tersangka*/}
                      <div
                        className={`f-tanggal-tersangka form-group w-full  ${
                          formState.status_wbp_kasus_id ===
                          "e9e467a1-9132-4787-8938-7517da9ba964"
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Tanggal penetapan tersangka
                        </label>
                        <input
                          type="date"
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          name="tanggal_penetapan_tersangka"
                          onChange={handleChange}
                          value={formState.tanggal_penetapan_tersangka}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "tanggal_penetapan_tersangka"
                              ? "Masukan tanggal penetapan"
                              : ""
                          )}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Tanggal Masa Penahanan */}
                  <div className="f-tanggal-masa-penahanan form-group w-full ">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Tanggal Masa Penahanan
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                      name="tanggal_masa_penahanan_otmil"
                      onChange={handleChange}
                      value={formState.tanggal_masa_penahanan_otmil}
                    />
                    <p className="error-text">
                      {errors.map((item) =>
                        item === "tanggal_masa_penahanan_otmil"
                          ? "Masukan tanggal masa penahanan"
                          : ""
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                Data Kesehatan
              </p>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Penyakit */}
                    <div className="f-penyakit form-group w-full ">
                      <label
                        className="  block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Penyakit (?)
                      </label>
                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="is_sick"
                        onChange={handleChange}
                        value={formState.is_sick}
                      >
                        <option value="" disabled>
                          Silahkan Pilih
                        </option>

                        <option value="0">Tidak</option>
                        <option value="1">Ya</option>
                      </select>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "is_sick" ? "Pilih Ya/Tidak" : ""
                        )}
                      </p>
                    </div>

                    {formState.is_sick === "0" ||
                    formState.is_sick === "" ? null : (
                      <>
                        <div className="f-nama-penyakit form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Nama Penyakit
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="wbp_sickness"
                            placeholder="Nama Penyakit"
                            onChange={handleChange}
                            value={formState.wbp_sickness}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === "wbp_sickness"
                                ? "Masukan nama penyakit"
                                : ""
                            )}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className=""> */}
            {/* <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                Data Perilaku
              </p> */}

            {/* <div className="flex flex-col gap-4"> */}
            {/* <div className="grid grid-cols-1 gap-4"> */}
            {/* <div className="grid grid-cols-2 gap-4"> */}
            {/* Jenis Olahraga */}
            {/* <div className="f-jenis-olahraga form-group w-full flex flex-col">
                      <label
                        className=" block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Jenis Olahraga
                      </label>
                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="jenis_olahraga"
                        onChange={handleChange}
                        value={formState.jenis_olahraga}
                      >
                        <option disabled value="">
                          Pilih Jenis Olahraga
                        </option>
                        <option value="0">Futsal</option>
                        <option value="1">Voli</option>
                        <option value="2">Badminton</option>
                        <option value="3">Berenang</option>
                        <option value="4">Golf</option>
                        <option value="5">Basket</option>
                        <option value="6">Sepak Bola</option>
                      </select>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'jenis_olahraga'
                            ? 'Pilih jenis olahraga'
                            : '',
                        )}
                      </p>
                    </div> */}

            {/* Konsumsi Zat Adiktif */}
            {/* <div className="f-zat-adiktif form-group w-full flex flex-col">
                      <label
                        className=" block text-sm font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Jenis Zat Adiktif
                      </label>
                      <select
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        name="zat_adiktif"
                        onChange={handleChange}
                        value={formState.zat_adiktif}
                      >
                        <option disabled value="">
                          Pilih Jenis Zat Adiktif
                        </option>
                        <option value="0">Nikotin</option>
                        <option value="1">Alkohol</option>
                        <option value="2">Kafein</option>
                        <option value="3">Amfetamin</option>
                        <option value="4">Ganja</option>
                        <option value="5">Kokain</option>
                        <option value="6">Heroin</option>
                      </select>
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'zat_adiktif'
                            ? 'Pilih jenis zat adiktif'
                            : '',
                        )}
                      </p>
                    </div> */}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}

            <div className="mt-4">
              <>
                {/*  Akses Zona  */}
                <div className="grid grid-cols-3 gap-5 justify-normal pt-4">
                  <div className="w-full col-span-3">
                    <h3 className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                      Akses Zona
                    </h3>

                    <div className="border-slate-500 grid grid-cols-3 gap-5 p-2 border rounded-lg akses-zona">
                      {autocompleteDataZona?.map((zonaItem: any) => (
                        <div
                          key={zonaItem.ruangan_otmil_id}
                          className={`gap-2 py-2 word-wrap: break-word flex flex-col h-fit cursor-default items-center justify-between rounded-[16px] border-4 ${
                            zonaItem.nama_zona === "Hijau"
                              ? "border-green-500"
                              : zonaItem.nama_zona === "Kuning"
                              ? "border-yellow-400"
                              : zonaItem.nama_zona === "Merah"
                              ? "border-red-500"
                              : "border-slate-500"
                          } bg-slate-500 bg-[transparent] px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none dark:text-neutral-200`}
                          data-te-ripple-color="dark"
                        >
                          <p className="text-xs text-white capitalize font-semibold">
                            {" "}
                            {zonaItem.nama_ruangan_otmil}
                          </p>
                          <button
                            className="text-white w-full bg-green-500 border-white border-[1px] rounded-md font-bold text-[9px]"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddZona(zonaItem.ruangan_otmil_id, 1);
                            }}
                          >
                            Ijinkan
                          </button>
                          <button
                            className="text-white w-full bg-red-500 border-white border-[1px] rounded-md font-bold text-[9px]"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddZona(zonaItem.ruangan_otmil_id, 0);
                            }}
                          >
                            Larang
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/*  Zona  */}
                <div className=" grid grid-cols-2 gap-5 justify-normal pt-4">
                  <div className="zona-hijau w-full ">
                    <h3 className="text-md font-semibold mb-2">Zona Hijau</h3>

                    <div className="border-green-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
                      {localStorage.getItem("akses_ruangan_otmil_id") &&
                        JSON.parse(
                          localStorage.getItem("akses_ruangan_otmil_id")
                        )
                          .filter((data: any) => data.isPermitted === 1)
                          .map((zonaId: any) => (
                            <div
                              defaultValue={formState.akses_ruangan_otmil_id
                                ?.filter((data: any) => data.isPermitted === 1)
                                .map((data: any) => data.ruangan_otmil_id)
                                .includes(zonaId.id)}
                              key={zonaId.id}
                              className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-green-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-green-500 hover:!shadow-none dark:text-neutral-200"
                              data-te-ripple-color="dark"
                            >
                              <p className="capitalize text-center">
                                {
                                  zona.find(
                                    (zonaItem: any) =>
                                      zonaItem.ruangan_otmil_id === zonaId.id
                                  )?.nama_ruangan_otmil
                                }
                              </p>
                              <span
                                data-te-chip-close
                                onClick={() =>
                                  handleRemoveZona(
                                    zonaId.id,
                                    "akses_ruangan_otmil_id"
                                  )
                                }
                                className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-3 w-3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </span>
                            </div>
                          ))}
                    </div>
                    {/* <p className="error-text">
                      {isZonaHijauEmpty ? 'Pilih zona hijau' : ''}
                    </p> */}
                  </div>

                  <div className="zona-merah w-full ">
                    <h3 className="text-md font-semibold mb-2">Zona Merah</h3>
                    <div className="border-red-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
                      {/* {formState.akses_ruangan_otmil_id
                        ?.filter((data) => data.isPermitted == 0)
                        .map((zonaId: any, index: number) => (
                          <div
                            defaultValue={formState.zonaId?.includes(zonaId.id)}
                            key={index}
                            className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-red-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
                            data-te-ripple-color="dark"
                          >
                            <p className="capitalize text-center">
                              {
                                zona.find(
                                  (zonaItem: any) =>
                                    zonaItem.ruangan_otmil_id === zonaId.id,
                                )?.nama_ruangan_otmil
                              }
                            </p>
                            <span
                              data-te-chip-close
                              onClick={() =>
                                handleRemoveZona(zonaId.id, 'zona_merah')
                              }
                              className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-3 w-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </span>
                          </div>
                        ))} */}
                      {localStorage.getItem("akses_ruangan_otmil_id") &&
                        JSON.parse(
                          localStorage.getItem("akses_ruangan_otmil_id")
                        )
                          .filter((data: any) => data.isPermitted === 0)
                          .map((zonaId: any) => (
                            <div
                              defaultValue={formState.akses_ruangan_otmil_id
                                ?.filter((data: any) => data.isPermitted === 0)
                                .map((data: any) => data.ruangan_otmil_id)
                                .includes(zonaId.id)}
                              key={zonaId.id}
                              className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-red-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
                              data-te-ripple-color="dark"
                            >
                              <p className="capitalize text-center">
                                {
                                  zona.find(
                                    (zonaItem: any) =>
                                      zonaItem.ruangan_otmil_id === zonaId.id
                                  )?.nama_ruangan_otmil
                                }
                              </p>
                              <span
                                data-te-chip-close
                                onClick={() =>
                                  handleRemoveZona(
                                    zonaId.id,
                                    "akses_ruangan_otmil_id"
                                  )
                                }
                                className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-3 w-3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </span>
                            </div>
                          ))}
                    </div>
                    {/* <p className="error-text">
                      {isZonaMerahEmpty ? 'Pilih zona merah' : ''}
                    </p> */}
                  </div>
                </div>
              </>
            </div>
          </div>
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
            <div className="error mt-4">
              <p className="text-red-400">Ada data yang masih belum terisi !</p>
            </div>
          )}

          <button
            className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 mt-5`}
            type="submit"
            onClick={handleZona}
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
            Tambah Data Tersangka
          </button>
        </div>
      </form>
    </div>
  );
};
