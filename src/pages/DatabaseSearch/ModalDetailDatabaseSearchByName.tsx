import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import {
  apiReadAllPangkat,
  apiReadAllRuanganOtmil,
  apiReadAllKesatuan,
  apiReadAllJenisJahat,
  apiReadAllKategoriJahat,
  apiReadAllJenisPerkara,
  apiReadAllLokasi,
  apiKota,
  apiProvinsi,
  apiAgama,
  apiStatusKawin,
  apiPendidikan,
  apiKeahlian,
  apiKesatuan,
  apiReadAllHunian,
  apiGelang,
  apiMatraRead,
  apiStatusWbp,
} from "../../services/api";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { deflate } from "zlib";
// import { Alerts } from './AlertInmate';
import { Alerts } from "./AlertDatabaseSearch";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { Error403Message } from "../../utils/constants";

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

const dataUserItem = localStorage.getItem("dataUser");
const tokenItem = localStorage.getItem("token");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
// const [isLoading, setIsLoading] = useState(false);

// console.log(token,'TOKEN')

export const DetailPelacakanWajahPrajurit = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
  dataWbp,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pangkat, setPangkat] = useState([]);
  const [kategoriJahat, setKategoriJahat] = useState([]);
  const [jenisPerkara, setJenisPerkara] = useState([]);
  const [kota, setKota] = useState<Kota[]>([]);
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [agama, setAgama] = useState<Agama[]>([]);
  const [statusKawin, setStatusKawin] = useState<StatusKawin[]>([]);
  const [pendidikan, setPendidikan] = useState<Pendidikan[]>([]);
  const [keahlian, setKeahlian] = useState<Keahlian[]>([]);
  const [kesatuan, setKesatuan] = useState<Kesatuan[]>([]);
  const [hunian, setHunian]: any = useState([]);
  const [gelang, setGelang]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [matra, setMatra] = useState([]);
  const [statusWbp, setStatusWbp] = useState([]);

  // console.log(isDetail);
  // console.log(isEdit);
  const [formState, setFormState] = useState(
    defaultValue || {
      foto_wajah: "",
      nama: "",
      pangkat_id: "",
      // nama_pangkat: '',
      matra_id: "",
      nrp: "",
      alamat: "",
      kesatuan_id: "",
      nama_kontak_keluarga: "",
      nomor_kontak_keluarga: "",
      hubungan_kontak_keluarga: "",
      provinsi_id: "",
      kota_id: "",
      jenis_kelamin: "",
      agama_id: "",
      tanggal_lahir: "",
      tempat_lahir: "",
      status_kawin_id: "",
      pendidikan_id: "",
      is_sick: "",
      wbp_sickness: "",
      // kejahatan: 'a',
      // kategori_perkara_id_jenis_perkara: '',
      // jenis_perkara_id: '',
      // vonis_tahun: '',
      // vonis_bulan: '',
      // vonis_hari: '',
      tanggal_ditahan_otmil: "",
      tanggal_masa_penahanan_otmil: "",
      bidang_keahlian_id: "",
      gelang_id: "",
      DMAC: "",
      residivis: "",
      hunian_wbp_otmil_id: "",
      nomor_tahanan: "",
      is_isolated: "",
      akses_ruangan_otmil_id: [],
      zona_merah: [],
      lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
      is_deleted: "0",
      status_wbp_kasus_id: "",
      tanggal_penetapan_tersangka: "",
      tanggal_penetapan_terdakwa: "",
      tanggal_penetapan_terpidana: "",
      zat_adiktif: "",
      jenis_olahraga: "",
      // penyakit: '',
      // berat_badan: '',
      // tinggi_badan: '',
      // pola_makan: '',
      // zona_hijau: [],
      // zona_kuning: [],
      // zona_merah: [],
      // lokasi_lemasmil_id:'',
      // nama_gateway:''
    }
  );

  console.log(formState, "EDIT BOYS");
  console.log(formState.nama_tersangka, "Nama Tersangka");

  const [errors, setErrors] = useState<string[]>([]);
  const [zona, setZona]: any = useState([]);
  const modalContainerRef = useRef(null);
  const [autocompleteDataZona, setAutocompleteDataZona]: any = useState(zona);
  const [filteredJenisPerkara, setFilteredJenisPerkara] = useState([]);
  const [dataArrayPasal, setDataArrayPasal]: any = useState([]);
  const [inputPasal, setInputPasal]: any = useState("");

  // useEffect(() => {
  //   const handleOutsideClick = (e: any) => {
  //     if (
  //       modalContainerRef.current &&
  //       !modalContainerRef.current.contains(e.target)
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
          // if (!value) {
          //   errorFields.push(key);
          // }
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
      // else {
      //   console.log('STATUS ANEH');
      // }

      if (!value) {
        errorFields.push(key);
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
    // console.log('TEST', e.target.name, '&', e.target.value);

    if (e.target.name === "gelang_id") {
      const selectedGelang = gelang.find(
        (item: any) => item.gelang_id === e.target.value
      );
      // console.log(selectedGelang, 'ASDASDS');
      setFormState({
        ...formState,
        gelang_id: e.target.value,
        DMAC: selectedGelang ? selectedGelang.dmac : "",
      });
    } else if (e.target.name === "is_sick") {
      // Jika is_sick berubah, atur nilai wbp_sickness sesuai kondisi
      const newWbpSickness =
        e.target.value === "0" ? "" : formState.wbp_sickness;
      setFormState({
        ...formState,
        is_sick: e.target.value,
        wbp_sickness: newWbpSickness,
      });
    } else if (e.target.name === "tanggal_penetapan_terdakwa") {
      if (isEdit) {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: formState.tanggal_penetapan_tersangka,
          tanggal_penetapan_terdakwa: e.target.value,
          tanggal_penetapan_terpidana: formState.tanggal_penetapan_terpidana,
        });
      } else {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: "",
          tanggal_penetapan_terdakwa: e.target.value,
          tanggal_penetapan_terpidana: "",
        });
      }
    } else if (e.target.name === "tanggal_penetapan_terpidana") {
      if (isEdit) {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: formState.tanggal_penetapan_tersangka,
          tanggal_penetapan_terdakwa: formState.tanggal_penetapan_terdakwa,
          tanggal_penetapan_terpidana: e.target.value,
        });
      } else {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: "",
          tanggal_penetapan_terdakwa: "",
          tanggal_penetapan_terpidana: e.target.value,
        });
      }
    } else if (e.target.name === "tanggal_penetapan_tersangka") {
      if (isEdit) {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: e.target.value,
          tanggal_penetapan_terdakwa: formState.tanggal_penetapan_terdakwa,
          tanggal_penetapan_terpidana: formState.tanggal_penetapan_terpidana,
        });
      } else {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: e.target.value,
          tanggal_penetapan_terdakwa: "",
          tanggal_penetapan_terpidana: "",
        });
      }
    } else {
      // console.log('tanpa if');
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleSelectPangkat = (e: any) => {
    setFormState({ ...formState, pangkat_id: e?.value });
  };

  const handleSelectAgama = (e: any) => {
    setFormState({ ...formState, agama_id: e?.value });
  };

  const handleSelectKesatuan = (e: any) => {
    setFormState({ ...formState, kesatuan_id: e?.value });
  };

  const handleSelectStatusKawin = (e: any) => {
    setFormState({ ...formState, status_kawin_id: e?.value });
  };

  const handleSelectBidangKeahlian = (e: any) => {
    setFormState({ ...formState, bidang_keahlian_id: e?.value });
  };

  const handleSelectHunianTahanan = (e: any) => {
    setFormState({ ...formState, hunian_wbp_otmil_id: e?.value });
  };

  const handleSelectPendidikan = (e: any) => {
    setFormState({ ...formState, pendidikan_id: e?.value });
  };

  const handleSelectMatra = (e: any) => {
    setFormState({ ...formState, matra_id: e?.value });
  };

  const handleSelectProvinsi = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, provinsi_id: e?.value, kota_id: "" });
  };

  const handleSelectKota = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, kota_id: e?.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader.result, "reader reader");

      reader.onloadend = async () => {
        console.log(reader.result, "reader.result reader.result");
        setFormState({ ...formState, foto_wajah: reader.result });

        // setImagePreview(reader.result);
        console.log(formState.foto_wajah, "imagePreview imagePreview");
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState, "received values");
    if (!validateForm()) return;
    setButtonLoad(true);
    onSubmit(formState).then(() => setButtonLoad(false)); //dikasih  then ... catch
    console.log(formState, "formstateSuccesValidate");

    // closeModal();
  };

  // Function to handle adding a "zona" to a specific input
  const handleAddZona = (zonaId: any, inputField: any) => {
    console.log("ZONA", zonaId, "INPUT", inputField);

    if (formState[inputField].includes(zonaId)) {
      // Check if the "zona" is already added to any input

      // If it's already added, show an error or handle it as needed
      setErrors([
        ...errors,
        `Zona ${zonaId} is already assigned to ${inputField}.`,
      ]);
    } else {
      // If it's not added to any input, assign it to the specified input
      setFormState({
        ...formState,
        [inputField]: [...formState[inputField], zonaId],
      });

      // Remove the selected zona from the autocomplete data
      setAutocompleteDataZona((prevData: any) =>
        prevData.filter((zonaItem: any) => zonaItem.ruangan_otmil_id !== zonaId)
      );
    }
  };

  // Function to handle removing a "zona" from the selected chips
  const handleRemoveZona = (zonaId: any, inputField: any) => {
    // Remove the zona from the selected input field
    setFormState({
      ...formState,
      [inputField]: formState[inputField].filter((id: any) => id !== zonaId),
    });

    // Add the removed zona back to the autocomplete data

    if (!isEdit) {
      setAutocompleteDataZona((prevData: any) => [
        ...prevData,
        zona.find((zonaItem: any) => zonaItem.ruangan_otmil_id === zonaId),
      ]);
    }
  };

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
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isDetail) {
      setFormState({
        ...formState,
        akses_ruangan_otmil: defaultValue.akses_ruangan_otmil,
      });
    }
  }, [isDetail]);

  // const handleInputPasal = (e: any) => {
  //   const newValue = e.target.value;
  //   setFormState({ ...formState, input_pasal: newValue });
  // };

  // const handlePasal = () => {
  //   if (formState.input_pasal.trim() !== '') {
  //     setFormState({
  //       ...formState,
  //       array_pasal: [...formState.array_pasal, formState.input_pasal],
  //       input_pasal: '', // Mengosongkan nilai input setelah ditambahkan ke dalam array
  //     });
  //   }
  // };

  // const handleRemovePasal = (index: any) => {
  //   const newArrayPasal = formState.array_pasal.filter(
  //     (_: any, i: any) => i !== index
  //   );

  //   setFormState({
  //     ...formState,
  //     array_pasal: newArrayPasal,
  //   });
  // };

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
        // const dataGelangId = dataWbp.map((item:any)=>item.gelang_id)
        // const filter = result.filter((item:any)=>!dataGelangId.includes(item.gelang_id))
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

  const handleRemoveFoto = () => {
    setFormState({ ...formState, foto_wajah: "" });
    const inputElement = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
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

  // Kodingan Driver Tutorial

  const handleClickTutorial = () => {
    const steps = [
      // {
      //   element: '.f-unggah-gambar',
      //   popover: {
      //     title: 'Tombol Unggah Gambar',
      //     description: 'Tombol unggah foto tersangka',
      //   },

      // },
      {
        element: ".t-remove-gambar",
        popover: {
          title: "Tombol Remove Gambar",
          description: "Tombol remove foto tersangka",
        },
      },
      {
        element: ".f-nama",
        popover: {
          title: "Nama tersangka",
          description: "Isi nama tersangka",
        },
      },
      {
        element: ".f-pangkat",
        popover: {
          title: "Pangkat tersangka",
          description: "Pilih pangkat tersangka",
        },
      },
      {
        element: ".f-matra",
        popover: {
          title: "Matra tersangka",
          description: "Pilih matra tersangka",
        },
      },
      {
        element: ".f-nrp",
        popover: {
          title: "Nomor registrasi pegawai tersangka",
          description: "Isi nomor registrasi pegawai tersangka",
        },
      },
      {
        element: ".f-pendidikan",
        popover: {
          title: "Pendidikan militer tersangka",
          description: "Pilih Pendidikan militer tersangka",
        },
      },
      {
        element: ".f-kesatuan",
        popover: {
          title: "Kesatuan tersangka",
          description: "Pilih kesatuan tersangka",
        },
      },
      {
        element: ".f-kelamin",
        popover: {
          title: "Jenis Kelamin tersangka",
          description: "Pilih jenis kelamin tersangka",
        },
      },
      {
        element: ".f-agama",
        popover: {
          title: "Agama tersangka",
          description: "Pilih agama tersangka",
        },
      },
      {
        element: ".f-tempat-lahir",
        popover: {
          title: "Tempat lahir tersangka",
          description: "Isi tempat lahir tersangka",
        },
      },
      {
        element: ".f-tanggal-lahir",
        popover: {
          title: "Tanggal lahir tersangka",
          description: "Isi tanggal lahir tersangka",
        },
      },
      {
        element: ".f-provinsi",
        popover: {
          title: "Provinsi domisili tersangka",
          description: "Pilih provinsi domisili tersangka",
        },
      },
      {
        element: ".f-kota",
        popover: {
          title: "Kota domisili tersangka",
          description: "Pilih kota domisili tersangka",
        },
      },
      {
        element: ".f-alamat",
        popover: {
          title: "Alamat domisili tersangka",
          description: "Isi alamat domisili tersangka",
        },
      },
      {
        element: ".f-status-kawin",
        popover: {
          title: "Status perkawinan tersangka",
          description: "Pilih status perkawinan tersangka",
        },
      },
      {
        element: ".f-nama-keluarga",
        popover: {
          title: "Nama keluarga tersangka",
          description: "Isi nama keluarga tersangka",
        },
      },
      {
        element: ".f-status-keluarga",
        popover: {
          title: "Status keluarga tersangka",
          description: "Isi status keluarga tersangka",
        },
      },
      {
        element: ".f-kontak-keluarga",
        popover: {
          title: "Nomor kontak keluarga tersangka",
          description: "Isi nomor kontak keluarga tersangka",
        },
      },
      {
        element: ".f-penyakit",
        popover: {
          title: "Status penyakit tersangka",
          description: "Pilih status penyakit tersangka",
        },
      },
      {
        element: ".f-tanggal-ditahan",
        popover: {
          title: "Tanggal ditahan tersangka",
          description: "Isi tanggal ditahan tersangka",
        },
      },
      {
        element: ".f-keahlian",
        popover: {
          title: "Keahlian tersangka",
          description: "Isi keahlian tersangka",
        },
      },
      {
        element: ".f-gelang",
        popover: {
          title: "Merek gelang tersangka",
          description: "Pilih merek gelang tersangka",
        },
      },
      {
        element: ".f-dmac-gelang",
        popover: {
          title: "Kode DMAC gelang tersangka",
          description: "Isi kode DMAC gelang tersangka",
        },
      },
      {
        element: ".f-residivis",
        popover: {
          title: "Residivis tersangka",
          description: "Pilih residivis tersangka",
        },
      },
      {
        element: ".f-hunian-tahanan",
        popover: {
          title: "Tempat hunian tahanan tersangka",
          description: "Pilih tempat hunian tahanan tersangka",
        },
      },
      {
        element: ".f-nomor-tahanan",
        popover: {
          title: "Nomor tahanan tersangka",
          description: "Isi tahanan tersangka",
        },
      },
      {
        element: ".f-status-terisolasi",
        popover: {
          title: "Status terisolasi tersangka",
          description: "Pilih status terisolasi tersangka",
        },
      },
      {
        element: ".f-status-tersangka",
        popover: {
          title: "Status Wbp tersangka",
          description: "Pilih status Wbp tersangka",
        },
      },
      {
        element: ".f-tanggal-masa-penahanan",
        popover: {
          title: "Tanggal masa penahanan tersangka",
          description: "Isi tanggal masa penahanan tersangka",
        },
      },
      {
        element: ".f-kesehatan-penyakit",
        popover: {
          title: "Nama penyakit tersangka",
          description: "Isi nama penyakit tersangka",
        },
      },
      {
        element: ".f-berat-badan",
        popover: {
          title: "Berat badan tersangka",
          description: "Isi berat badan tersangka",
        },
      },
      {
        element: ".f-tinggi-badan",
        popover: {
          title: "Tinggi badan tersangka",
          description: "Isi tinggi badan tersangka",
        },
      },
      {
        element: ".f-pola-makan",
        popover: {
          title: "Nama pola makan tersangka",
          description: "Isi nama pola makan tersangka",
        },
      },
      {
        element: ".f-jenis-olahraga",
        popover: {
          title: "Jenis olahraga tersangka",
          description: "Pilih jenis olahraga tersangka",
        },
      },
      {
        element: ".f-zat-adiktif",
        popover: {
          title: "Zat adiktif tersangka",
          description: "Pilih zat adiktif tersangka",
        },
      },
      {
        element: ".akses-zona",
        popover: {
          title: "Zona akses tersangka",
          description: "Pilih zona akses tersangka",
        },
      },
      {
        element: ".zona-hijau",
        popover: {
          title: "Zona hijau tersangka",
          description: "Daftar zona hijau tersangka",
        },
      },
      {
        element: ".zona-merah",
        popover: {
          title: "Zona merah tersangka",
          description: "Daftar zona merah tersangka",
        },
      },
      {
        element: ".tombol-submit",
        popover: {
          title: "Tombol Submit tersangka",
          description: "Klik tombol submit tersangka",
        },
      },
    ];

    // Kondisi Status Penyakit Tersangka

    if (formState.is_sick === "1") {
      steps.splice(20, 0, {
        element: ".f-nama-penyakit",
        popover: {
          title: "Nama penyakit tersangka",
          description: "Isi nama penyakit tersangka",
        },
      });
    }

    // Kondisi Status Penyakit Tersangka

    // Kondisi Tambah,Edit,Detail

    let gambarElement: string | undefined;
    let gambarTitle: string | undefined;
    let gambarDescription: string | undefined;

    if (isEdit) {
      gambarElement = ".f-edit-gambar";
      gambarTitle = "Tombol Edit Gambar";
      gambarDescription = "Tombol edit foto tersangka";
    } else if (!isDetail && !isEdit) {
      gambarElement = ".f-unggah-gambar";
      gambarTitle = "Tombol Unggah Gambar";
      gambarDescription = "Tombol unggah foto tersangka";
    }

    if (isEdit && gambarElement && gambarTitle && gambarDescription) {
      steps.splice(0, 0, {
        element: gambarElement,
        popover: {
          title: gambarTitle,
          description: gambarDescription,
        },
      });
    } else if (
      !isEdit &&
      !isDetail &&
      gambarElement &&
      gambarTitle &&
      gambarDescription
    ) {
      steps.splice(0, 0, {
        element: gambarElement,
        popover: {
          title: gambarTitle,
          description: gambarDescription,
        },
      });
    }

    // Kondisi Tambah,Edit,Detail

    // Kondisi Status Wbp Tersangka

    let tanggalElement: string | undefined;
    let tanggalTitle: string | undefined;
    let tanggalDescription: string | undefined;

    if (
      formState.status_wbp_kasus_id === "55ae39b7-dbad-4c89-8968-6d1e2450c963"
    ) {
      tanggalElement = ".f-tanggal-terpidana";
      tanggalTitle = "Tanggal terpidana tersangka";
      tanggalDescription = "Isi tanggal terpidana tersangka";
    } else if (
      formState.status_wbp_kasus_id === "ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064"
    ) {
      tanggalElement = ".f-tanggal-terdakwa";
      tanggalTitle = "Tanggal terpidana tersangka";
      tanggalDescription = "Isi tanggal terpidana tersangka";
    } else if (
      formState.status_wbp_kasus_id === "e9e467a1-9132-4787-8938-7517da9ba964"
    ) {
      tanggalElement = ".f-tanggal-tersangka";
      tanggalTitle = "Tanggal penetapan tersangka";
      tanggalDescription = "Isi tanggal penetapan tersangka";
    }

    if (
      formState.is_sick === "1" &&
      tanggalElement &&
      tanggalTitle &&
      tanggalDescription
    ) {
      steps.splice(30, 0, {
        element: tanggalElement,
        popover: {
          title: tanggalTitle,
          description: tanggalDescription,
        },
      });
    } else if (tanggalElement && tanggalTitle && tanggalDescription) {
      steps.splice(29, 0, {
        element: tanggalElement,
        popover: {
          title: tanggalTitle,
          description: tanggalDescription,
        },
      });
    }

    // Kondisi Status Wbp Tersangka

    const driverObj: any = driver({
      showProgress: true,
      steps: steps,
    });

    driverObj.drive();
  };

  return (
    // <div
    //   ref={modalContainerRef}
    //   className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-boxdark"
    // >
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full"> */}
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
              <div className="w-full flex justify-between mb-2  items-center  ">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {isDetail
                      ? "Detail data Tersangka"
                      : isEdit
                      ? "Edit data Tersangka"
                      : "Tambah data Tersangka"}
                  </h3>
                  {!isDetail && (
                    <button className="">
                      <HiQuestionMarkCircle
                        // values={filter}
                        aria-placeholder="Show tutorial"
                        // onChange={}
                        onClick={handleClickTutorial}
                      />
                    </button>
                  )}
                </div>
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  {/* ----- DATA PRIBADI ----- */}
                  <div>
                    <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                      Data Tersangka
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className=" grid grid-cols-2 gap-4 items-start ">
                        {/* Gambar */}

                        {isDetail &&
                          (formState.foto_wajah === "" ||
                          formState.foto_wajah === null ? (
                            <div className="form-group w-full h-fit">
                              <div className=" mt-1 flex flex-col items-center">
                                <div className="mt-4 flex flex-col justify-center items-center h-[200px]">
                                  <p className="text-center bg-slate-500 font-bold text-white rounded-md p-3">
                                    Tidak Ada Foto!
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="form-group w-full h-fit">
                              <div className=" mt-1 flex flex-col items-center">
                                <img
                                  className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                  src={
                                    "https://dev.transforme.co.id/siram_admin_api" +
                                    formState.foto_wajah
                                  }
                                  alt="Image Preview"
                                />
                              </div>
                            </div>
                          ))}

                        {isEdit && (
                          <div className="form-group w-full h-fit ">
                            <div className="mt-1 flex flex-col items-center">
                              {formState.foto_wajah ? (
                                formState.foto_wajah.startsWith(
                                  "data:image/"
                                ) ? (
                                  <img
                                    className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                    src={formState.foto_wajah}
                                    alt="Image Preview"
                                  />
                                ) : (
                                  <img
                                    className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                    src={
                                      "http://dev.transforme.co.id/siram_admin_api" +
                                      formState.foto_wajah
                                    }
                                    alt="Image Preview"
                                  />
                                ) // Don't render anything if the image format is not as expected
                              ) : (
                                <img
                                  className="w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
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
                                  <div className="f-edit-gambar cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                                    Edit Gambar
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
                            </div>
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "foto_wajah" ? "Masukan foto" : ""
                              )}
                            </p>
                          </div>
                        )}

                        {!isEdit && !isDetail && (
                          <div className="form-group w-full h-fit ">
                            <div className="mt-1 flex flex-col items-center">
                              {formState.foto_wajah ? (
                                <img
                                  className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                  src={formState.foto_wajah}
                                  alt="Image Preview"
                                />
                              ) : (
                                <img
                                  className="w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
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
                          </div>
                        )}

                        <div className="flex flex-col gap-4 ">
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
                              value={formState.nama_tersangka}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "nama" ? "Masukan nama" : ""
                              )}
                            </p>
                          </div>

                          {/* Pangkat */}
                          <div className="f-pangkat form-group w-full flex flex-col">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Pangkat
                            </label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.pangkat.pangkat_id,
                                      label: formState.pangkat.nama_pangkat,
                                    }
                                  : formState.pangkat.pangkat_id
                              }
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Pangkat"
                              name="pangkat_id"
                              options={pangkat.map((item: any) => ({
                                value: item.pangkat_id,
                                label: item.nama_pangkat,
                              }))}
                              onChange={handleSelectPangkat}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "pangkat_id" ? "Pilih pangkat" : ""
                              )}
                            </p>
                          </div>

                          {/* Matra */}
                          <div className="f-matra form-group w-full flex flex-col">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Matra
                            </label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              name="matra_id"
                              placeholder="Pilih Matra"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.matra.matra_id,
                                      label: formState.matra.nama_matra,
                                    }
                                  : formState.matra.matra_id
                              }
                              options={matra.map((item: any) => ({
                                value: item.matra_id,
                                label: item.nama_matra,
                              }))}
                              onChange={handleSelectMatra}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "matra_id" ? "Pilih matra" : ""
                              )}
                            </p>
                          </div>

                          {/* NRP */}
                          <div className="f-nrp form-group w-full flex flex-col">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              NRP
                            </label>
                            <input
                              className="w-full rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-gray dark:bg-slate-800  dark:focus:border-primary"
                              name="nrp"
                              placeholder="Nomor registrasi"
                              onChange={handleChange}
                              value={formState.nrp}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "nrp" ? "Masukan nomor registrasi" : ""
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ----- DATA FOTO KAMERA ----- */}
                  {formState.kamera_log.length === 0 ? (
                    <div className="mt-4">
                      <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                        Foto Kamera
                      </p>
                      <div className="mt-4 flex flex-col justify-center items-center h-[200px]">
                        <p className="text-center bg-slate-500 font-bold text-white rounded-md p-3">
                          Tidak Ada Foto!
                        </p>
                      </div>
                    </div>
                  ) : formState.kamera_log.length === 1 ? (
                    <div className="mt-4">
                      <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                        Foto Kamera
                      </p>
                      <div className="h-[350px] overflow-x-auto">
                        <div className="flex flex-row justify-center items-center">
                          {" "}
                          {/* Kontainer horizontal */}
                          {formState.kamera_log.map((item: any) => (
                            <div
                              key={item.id} // Pastikan setiap elemen memiliki key yang unik
                              className="bg-boxdark px-4 py-4 flex-shrink-0 border border-slate-400 h-full w-1/2"
                              // onClick={() => handleDetailClick(item)}
                            >
                              <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
                                <img
                                  src={
                                    "https://dev.transforme.co.id/siram_admin_api" +
                                    item.image_kamera_log
                                  }
                                  alt="picture"
                                  className="object-cover w-[150px] h-[150px] border border-slate-400"
                                ></img>
                              </div>
                              <div className="ml-10 grid grid-cols-1 items-center">
                                <div className="flex flex-col w-full">
                                  <p className="text-3xl font-bold text-white">
                                    Ruangan :{" "}
                                    {item.ruangan_otmil.nama_ruangan_otmil}
                                  </p>
                                  <p className="text-2xl font-base text-slate-500">
                                    Lokasi :{" "}
                                    {
                                      item.ruangan_otmil.lokasi_otmil
                                        .nama_lokasi_otmil
                                    }
                                  </p>
                                </div>
                                <div className="flex flex-col mt-6 item-center  w-full">
                                  <p className="text-lg">Keterangan</p>
                                  <div className="flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      width="15"
                                      height="15"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p className="text-md">
                                      {item.timestamp_kamera_log}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                        Foto Kamera
                      </p>
                      <div className="h-[350px] overflow-x-auto">
                        <div className="flex flex-row">
                          {" "}
                          {/* Kontainer horizontal */}
                          {formState.kamera_log.map((item: any) => (
                            <div
                              key={item.id} // Pastikan setiap elemen memiliki key yang unik
                              className="bg-boxdark px-4 py-4 flex-shrink-0 border border-slate-400 h-full w-1/2"
                              // onClick={() => handleDetailClick(item)}
                            >
                              <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
                                <img
                                  src={
                                    "https://dev.transforme.co.id/siram_admin_api" +
                                    item.image_kamera_log
                                  }
                                  alt="picture"
                                  className="object-cover w-[150px] h-[150px] border border-slate-400"
                                ></img>
                              </div>
                              <div className="ml-10 grid grid-cols-1 items-center">
                                <div className="flex flex-col w-full">
                                  <p className="text-3xl font-bold text-white">
                                    Ruangan :{" "}
                                    {item.ruangan_otmil.nama_ruangan_otmil}
                                  </p>
                                  <p className="text-2xl font-base text-slate-500">
                                    Lokasi :{" "}
                                    {
                                      item.ruangan_otmil.lokasi_otmil
                                        .nama_lokasi_otmil
                                    }
                                  </p>
                                </div>
                                <div className="flex flex-col mt-6 item-center  w-full">
                                  <p className="text-lg">Keterangan</p>
                                  <div className="flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      width="15"
                                      height="15"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p className="text-md">
                                      {item.timestamp_kamera_log}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ----- DATA DETAIL TERSANGKA ----- */}
                  <div className="mt-4">
                    <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                      Data Detail Tersangka
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-5">
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
                          styles={customStyles}
                          name="pendidikan_id"
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih Pendidikan"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.pendidikan.pendidikan_id,
                                  label: formState.pendidikan.nama_pendidikan,
                                }
                              : formState.pendidikan.pendidikan_id
                          }
                          options={pendidikan.map((item) => ({
                            value: item.pendidikan_id,
                            label: item.nama_pendidikan,
                          }))}
                          onChange={handleSelectPendidikan}
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
                        {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="kesatuan_id"
                            onChange={handleChange}
                            value={formState.kesatuan_id}
                            disabled={isDetail}
                          >
                            <option value="" disabled>
                              Pilih Kesatuan
                            </option>
                            {kesatuan.map((item: any) => (
                              <option value={item.kesatuan_id}>
                                {item.nama_kesatuan}
                              </option>
                            ))}
                          </select> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          styles={customStyles}
                          name="kesatuan_id"
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih Kesatuan"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.kesatuan.kesatuan_id,
                                  label: formState.kesatuan.nama_kesatuan,
                                }
                              : formState.kesatuan.kesatuan_id
                          }
                          options={kesatuan.map((item: any) => ({
                            value: item.kesatuan_id,
                            label: item.nama_kesatuan,
                          }))}
                          onChange={handleSelectKesatuan}
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
                          disabled={isDetail}
                        >
                          <option disabled value="">
                            Pilih Jenis Kelamin
                          </option>
                          <option value="1">Laki-laki</option>
                          <option value="0">Perempuan</option>
                        </select>
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "jenis_kelamin"
                              ? "Pilih jenis kelamin"
                              : ""
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
                        {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="agama_id"
                            onChange={handleChange}
                            value={formState.agama_id}
                            disabled={isDetail}
                          >
                            <option value="" disabled>
                              Pilih Agama
                            </option>

                            {agama.map((item) => (
                              <option value={item.agama_id}>
                                {item.nama_agama}
                              </option>
                            ))}
                          </select> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          styles={customStyles}
                          name="agama_id"
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih Agama"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.agama.agama_id,
                                  label: formState.agama.nama_agama,
                                }
                              : formState.agama.agama_id
                          }
                          options={agama.map((item: any) => ({
                            value: item.agama_id,
                            label: item.nama_agama,
                          }))}
                          onChange={handleSelectAgama}
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
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "tempat_lahir"
                              ? "Masukan tempat_lahir"
                              : ""
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
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "tanggal_lahir"
                              ? "Masukan tanggal lahir"
                              : ""
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

                        {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="provinsi_id"
                            onChange={handleChange}
                            value={formState.provinsi_id}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Provinsi
                            </option>
                            {provinsi.map((item) => (
                              <option value={item.provinsi_id}>
                                {item.nama_provinsi}
                              </option>
                            ))}
                          </select> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.provinsi.provinsi_id,
                                  label: formState.provinsi.nama_provinsi,
                                }
                              : formState.provinsi.provinsi_id
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
                      <div className="f-kota form-group w-full flex flex-col">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Kota
                        </label>
                        {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="kota_id"
                            onChange={handleChange}
                            value={formState.kota_id}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Kota
                            </option>
                            {kota
                              .filter((item: any) => {
                                return (
                                  item.provinsi_id === formState.provinsi_id
                                );
                              })
                              .map((item) => (
                                <option value={item.kota_id}>
                                  {item.nama_kota}
                                </option>
                              ))}
                          </select> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.kota.kota_id,
                                  label: formState.kota.nama_kota,
                                }
                              : formState.kota.kota_id
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
                            item === "kota_id" ? "Pilih Kota" : ""
                          )}
                        </p>
                      </div>
                    </div>
                    {/* Alamat */}
                    <div className="f-alamat form-group w-full flex flex-col">
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
                        disabled={isDetail}
                      />
                      <p className="error-text">
                        {errors.map((item) =>
                          item === "alamat" ? "Masukan alamat" : ""
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 ">
                      {/* Status Kawin */}
                      <div className="f-status-kawin form-group w-full flex flex-col">
                        <label
                          className="  block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Status Kawin
                        </label>

                        {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="status_kawin_id"
                            onChange={handleChange}
                            value={formState.status_kawin_id}
                            disabled={isDetail}
                          >
                            <option value="" disabled>
                              Pilih Status Kawin
                            </option>
                            {statusKawin.map((item) => (
                              <option value={item.status_kawin_id}>
                                {item.nama_status_kawin}
                              </option>
                            ))}
                          </select> */}
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          styles={customStyles}
                          name="status_kawin_id"
                          isDisabled={isDetail}
                          isClearable={true}
                          isSearchable={true}
                          placeholder="Pilih Status Kawin"
                          defaultValue={
                            isEdit || isDetail
                              ? {
                                  value: formState.status_kawin.status_kawin_id,
                                  label:
                                    formState.status_kawin.nama_status_kawin,
                                }
                              : formState.status_kawin.status_kawin_id
                          }
                          options={statusKawin.map((item) => ({
                            value: item.status_kawin_id,
                            label: item.nama_status_kawin,
                          }))}
                          onChange={handleSelectStatusKawin}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "status_kawin_id"
                              ? "Pilih status nikah"
                              : ""
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
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "nama_kontak_keluarga"
                              ? "Masukan nama keluarga"
                              : ""
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
                          disabled={isDetail}
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
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === "nomor_kontak_keluarga"
                              ? "Masukan kontak keluarga"
                              : ""
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ----- DATA PERKARA ----- */}
                  <div className="mt-4">
                    <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                      Data Perkara
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Kategori Perkara */}
                        {/* <div className="form-group w-full ">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Kategori Perkara
                          </label>
                          <select
                            className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="kategori_perkara_id_jenis_perkara"
                            onChange={handleChange}
                            value={formState.kategori_perkara_id_jenis_perkara}
                            disabled={isDetail}
                          >
                            <option value="">Pilih Kategori Perkara</option>
                            {kategoriJahat.map((item: any) => (
                              <option value={item.kategori_perkara_id}>
                                {item.nama_kategori_perkara}
                              </option>
                            ))}
                          </select>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'kategori_perkara_id_jenis_perkara'
                                ? 'Pilih kategori perkara'
                                : ''
                            )}
                          </p>
                        </div> */}

                        {/* Jenis Perkara */}
                        {/* <div className="form-group w-full ">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Jenis Perkara
                          </label>
                          <select
                            className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="jenis_perkara_id"
                            onChange={handleChange}
                            value={formState.jenis_perkara_id}
                            disabled={isDetail}
                          >
                            <option value="">Pilih Jenis Perkara</option>
                            {jenisPerkara
                              .filter((item: any) => {
                                // Apply your filter condition here
                                // For example, only render items that meet a certain condition
                                return (
                                  item.kategori_perkara_id ===
                                  formState.kategori_perkara_id_jenis_perkara
                                ); // Change 'someCondition' to your actual condition
                              })
                              .map((item: any) => (
                                <option
                                  key={item.jenis_perkara_id}
                                  value={item.jenis_perkara_id}
                                >
                                  {item.nama_jenis_perkara} - {item.pasal}
                                </option>
                              ))}
                          </select>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'jenis_perkara_id'
                                ? 'Pilih jenis perkara'
                                : ''
                            )}
                          </p>
                        </div> */}
                      </div>

                      {/* Pasal */}
                      {/* <div className="hidden">
                        <p className="text-white">Pasal</p>
                        <select className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary">
                          <option value="">Pilih Jenis Perkara</option>
                          {jenisPerkara.map((item: any) => (
                            <option value={item.pasal}>{item.pasal}</option>
                          ))}
                        </select> */}

                      {/* <div className="border-[1px] border-slate-500 rounded-md p-2">
                      <div className="flex flex-row gap-2">

                        <input
                          type="text"
                          value={formState.input_pasal}
                          placeholder={isDetail ? '' : 'Input Pasal'}
                          onChange={handleInputPasal}
                          disabled={isDetail}
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        ></input>

                        <button
                          onClick={handlePasal}
                          type="button"
                          className="py-3 px-3 rounded-md bg-blue-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                      <div
                        className={`mt-2 flex flex-col overflow-hidden gap-2 ${
                          formState.array_pasal?.length === 0
                            ? 'hidden'
                            : 'block'
                        }`}
                      >
                        {formState.array_pasal?.map((item: any, index: any) => (
                          <div className="flex flex-row items-center">
                            <p
                              key={index}
                              className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                            >
                              {item}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                handleRemovePasal(index);
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
                    </div> */}
                      {/* </div> */}

                      {/* Vonis */}
                      {isDetail && (
                        <div className=" grid grid-cols-3 gap-4">
                          {/* Vonis Tahun */}
                          {/* <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Vonis Tahun
                            </label>
                            <input
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="vonis_tahun"
                              placeholder="Tahun"
                              onChange={handleChange}
                              value={formState.vonis_tahun}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'vonis_tahun'
                                  ? 'Masukan vonis tahun'
                                  : '',
                              )}
                            </p>
                          </div> */}

                          {/* Vonis Bulan */}
                          {/* <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Vonis Bulan
                            </label>
                            <input
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="vonis_bulan"
                              placeholder="Bulan"
                              onChange={handleChange}
                              value={formState.vonis_bulan}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'vonis_bulan'
                                  ? 'Masukan vonis bulan'
                                  : '',
                              )}
                            </p>
                          </div> */}

                          {/* Vonis Hari */}
                          {/* <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Vonis Hari
                            </label>
                            <input
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="vonis_hari"
                              placeholder="Hari"
                              onChange={handleChange}
                              value={formState.vonis_hari}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'vonis_hari'
                                  ? 'Masukan vonis hari'
                                  : '',
                              )}
                            </p>
                          </div> */}
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
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "tanggal_ditahan_otmil"
                                  ? "Masukan tanggal ditahan"
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
                            {/* <select
                              className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="bidang_keahlian_id"
                              onChange={handleChange}
                              value={formState.bidang_keahlian_id}
                              disabled={isDetail}
                            >
                              <option disabled value="">
                                Pilih Keahlian
                              </option>
                              {keahlian.map((item) => (
                                <option value={item.bidang_keahlian_id}>
                                  {item.nama_bidang_keahlian}
                                </option>
                              ))}
                            </select> */}
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              name="bidang_keahlian_id"
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Keahlian"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value:
                                        formState.bidang_keahliann
                                          .bidang_keahlian_id,
                                      label:
                                        formState.bidang_keahliann
                                          .nama_bidang_keahlian,
                                    }
                                  : formState.bidang_keahliann
                                      .bidang_keahlian_id
                              }
                              options={keahlian.map((item: any) => ({
                                value: item.bidang_keahlian_id,
                                label: item.nama_bidang_keahlian,
                              }))}
                              onChange={handleSelectBidangKeahlian}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "bidang_keahlian_id"
                                  ? "Pilih keahlian"
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
                            <select
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="gelang_id"
                              onChange={handleChange}
                              value={formState.gelang.gelang_id}
                              disabled={isDetail}
                            >
                              <option value="" disabled>
                                Pilih Gelang
                              </option>

                              {isDetail
                                ? gelang.map((item: any) => (
                                    <option value={item.gelang_id}>
                                      {item.nama_gelang}
                                    </option>
                                  ))
                                : isEdit
                                ? gelang.map((item: any) => {
                                    const isUsed = dataWbp.some(
                                      (wbp: any) =>
                                        wbp.gelang_id === item.gelang_id
                                    );
                                    return (
                                      <option
                                        value={item.gelang_id}
                                        key={item.gelang_id}
                                      >
                                        {item.nama_gelang}{" "}
                                        {isUsed
                                          ? "(Sedang Digunakan)"
                                          : "(Tidak Digunakan)"}
                                      </option>
                                    );
                                  })
                                : gelang
                                    .filter(
                                      (item: any) =>
                                        !dataWbp
                                          .map(
                                            (wbp: any) =>
                                              wbp.gelang_id || wbp.gelang_id
                                          )
                                          .includes(item.gelang_id)
                                    )
                                    .map((item: any) => (
                                      <option value={item.gelang_id}>
                                        {item.nama_gelang}
                                      </option>
                                    ))}
                            </select>
                            {/* <Select
                              name="gelang_id"
                              onChange={handleChange}
                              isClearable={true}
                              isSearchable={true}
                              isDisabled={isDetail}
                              placeholder="Pilih Gelang"
                              styles={customStyles}
                            /> */}
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
                              onChange={handleChange}
                              value={formState.gelang.DMAC}
                              disabled
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
                              disabled={isDetail}
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
                              styles={customStyles}
                              name="hunian_wbp_otmil_id"
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Hunian Tahanan"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value:
                                        formState.hunian_wbp_otmil
                                          .hunian_wbp_otmil_id,
                                      label:
                                        formState.hunian_wbp_otmil
                                          .nama_hunian_wbp_otmil,
                                    }
                                  : formState.hunian_wbp_otmil
                                      .hunian_wbp_otmil_id
                              }
                              options={hunian.map((item: any) => ({
                                value: item.hunian_wbp_otmil_id,
                                label: item.nama_hunian_wbp_otmil,
                              }))}
                              onChange={handleSelectHunianTahanan}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "hunian_wbp_otmil_id"
                                  ? "Pilih hunian"
                                  : ""
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
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "nomor_tahanan"
                                  ? "Masukan nomor tahanan"
                                  : ""
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
                              disabled={isDetail}
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
                            <select
                              className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="status_wbp_kasus_id"
                              onChange={handleChange}
                              // defaultValue={formState.status_wbp_kasus_id ?? ''}
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.status_wbp_kasus_id,
                                      label: formState.nama_status_wbp_kasus,
                                    }
                                  : formState.status_wbp_kasus_id
                              }
                              disabled={isDetail}
                            >
                              <option disabled value="">
                                Pilih status
                              </option>
                              {statusWbp.map((item: any) => (
                                <option value={item.status_wbp_kasus_id}>
                                  {item.nama_status_wbp_kasus}
                                </option>
                              ))}
                            </select>
                            {/* <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              name="status_wbp_kasus_id"
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Status"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.status_wbp_kasus_id,
                                      label: formState.nama_status_wbp_kasus,
                                    }
                                  : formState.status_wbp_kasus_id
                              }
                              options={statusWbp.map((item: any) => ({
                                value: item.status_wbp_kasus_id,
                                label: item.nama_status_wbp_kasus,
                              }))}
                            /> */}
                            <p className="error-text">
                              {errors.map((item) =>
                                item === "status_wbp_kasus_id"
                                  ? "Pilih status"
                                  : ""
                              )}
                            </p>
                          </div>

                          {/* Tanggal Penetapan*/}
                          {/* <div
                            className={`form-group w-full ${
                              formState.status_wbp_kasus_id === '' ||
                              formState.status_wbp_kasus_id === null
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Tanggal penetapan{' '}
                              {formState.status_wbp_kasus_id ===
                              '55ae39b7-dbad-4c89-8968-6d1e2450c963' //id terpidana
                                ? 'terpidana'
                                : formState.status_wbp_kasus_id ===
                                  'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' // id terdakwa
                                ? 'terdakwa'
                                : 'tersangka'}
                            </label>
                            <input
                              type="date"
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              // name="tanggal_penetapan_terpidana"
                              name={
                                formState.status_wbp_kasus_id ===
                                '55ae39b7-dbad-4c89-8968-6d1e2450c963' //id terpidana
                                  ? 'tanggal_penetapan_terpidana'
                                  : formState.status_wbp_kasus_id ===
                                    'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' //id terdakwa
                                  ? 'tanggal_penetapan_terdakwa'
                                  : formState.status_wbp_kasus_id ===
                                    'e9e467a1-9132-4787-8938-7517da9ba964'
                                  ? 'tanggal_penetapan_tersangka'
                                  : ''
                              }
                              onChange={handleChange}
                              value={
                                formState.status_wbp_kasus_id ===
                                '55ae39b7-dbad-4c89-8968-6d1e2450c963' //id terpidana
                                  ? formState.tanggal_penetapan_terpidana
                                  : formState.status_wbp_kasus_id ===
                                    'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' //id terdakwa
                                  ? formState.tanggal_penetapan_terdakwa
                                  : formState.status_wbp_kasus_id ===
                                    'e9e467a1-9132-4787-8938-7517da9ba964'
                                  ? formState.tanggal_penetapan_tersangka
                                  : ''
                              }
                              // value={formState.tanggal_penetapan_terpidana}

                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'tanggal_penetapan_terpidana'
                                  ? 'Masukan tanggal penetapan '
                                  : item === 'tanggal_penetapan_terdakwa'
                                  ? 'Masukan tanggal penetapan '
                                  : item === 'tanggal_penetapan_tersangka'
                                  ? 'Masukan tanggal penetapan'
                                  : ''
                              )}
                            </p>
                          </div> */}

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
                                  disabled={isDetail}
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
                                  disabled={isDetail}
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
                                  disabled={isDetail}
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
                              disabled={isDetail}
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

                    {/* ----- DATA KESEHATAN ----- */}
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
                                disabled={isDetail}
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
                                    disabled={isDetail}
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

                            {/* Berat Badan */}
                            {/* <div className="f-berat-badan form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Berat Badan
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="berat_badan"
                                placeholder="Berapa berat badan"
                                onChange={handleChange}
                                value={formState.berat_badan}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'berat_badan'
                                    ? 'Masukan berat badan'
                                    : '',
                                )}
                              </p>
                            </div> */}

                            {/* Tinggi Badan */}
                            {/* <div className="f-tinggi-badan form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Tinggi Badan
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="tinggi_badan"
                                placeholder="Berapa tinggi badan"
                                onChange={handleChange}
                                value={formState.tinggi_badan}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'tinggi_badan'
                                    ? 'Masukan tinggi badan'
                                    : '',
                                )}
                              </p>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ----- DATA PERILAKU ----- */}
                    <div className="mt-4">
                      <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                        Data Perilaku
                      </p>

                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Pola Makan */}
                            {/* <div className="f-pola-makan form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Pola Makan
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="pola_makan"
                                placeholder="Nama pola makan"
                                onChange={handleChange}
                                value={formState.pola_makan}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'pola_makan'
                                    ? 'Masukan nama pola makan'
                                    : '',
                                )}
                              </p>
                            </div> */}

                            {/* Jenis Olahraga */}
                            <div className="f-jenis-olahraga form-group w-full flex flex-col">
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
                                disabled={isDetail}
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
                                  item === "jenis_olahraga"
                                    ? "Pilih jenis olahraga"
                                    : ""
                                )}
                              </p>
                            </div>

                            {/* Konsumsi Zat Adiktif */}
                            <div className="f-zat-adiktif form-group w-full flex flex-col">
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
                                disabled={isDetail}
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
                                  item === "zat_adiktif"
                                    ? "Pilih jenis zat adiktif"
                                    : ""
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*  Zona  */}
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
                  <div className="error mt-4">
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
                        .filter(
                          (item: string) => !item.startsWith('INVALID_ID')
                        )
                        .join(', ')}
                    </p>
                  </div>
                )} */}
                <br></br>

                {isDetail ? null : isEdit ? (
                  <button
                    className={`tombol-submit items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? "bg-slate-400" : ""
                    }`}
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
                    Ubah Data Tersangka
                  </button>
                ) : (
                  <button
                    className={`tombol-submit items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? "bg-slate-400" : ""
                    }`}
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
                    Tambah Data Tersangka
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
