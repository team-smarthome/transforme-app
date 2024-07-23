import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import {
	apiReadAllPangkat,
	apiReadAllRuanganOtmil,
	apiReadAllKategoriJahat,
	apiReadAllJenisPerkara,
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
	apiKasusRead,

	// API FOR KASUS
	apiReadAllWBP,
	apiReadJaksaPenyidik,
	apiReadSaksi,
	apiReadStatusWBP,
	apiReadjenisperkara,
	apiJenisPidanaRead,
} from "../../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Alerts } from "./AlertInmate";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { Error403Message } from "../../../utils/constants";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
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
	vonis_tahun_perkara: string;
	vonis_bulan_perkara: string;
	vonis_hari_perkara: string;
}

interface KasusData {
	kasus_id: string;
	wbp_profile: { wbp_profile_id: string }[];
}

const dataUserItem = localStorage.getItem("dataUser");
const tokenItem = localStorage.getItem("token");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const AddInmateModal = ({
	closeModal,
	onSubmit,
	defaultValue,
	isDetail,
	isEdit,
	token,
	dataWbp,
}: any) => {
	console.log(defaultValue, "aksesRuangan");
	const navigate = useNavigate();
	const location = useLocation();

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
	const [isLoading, setIsLoading] = useState(true);
	const [buttonLoad, setButtonLoad] = useState(false);
	const [matra, setMatra] = useState([]);
	const [statusWbp, setStatusWbp] = useState([]);
	const [kasusData, setKasusData] = useState<KasusData[]>([]);
	const [buatKasusBaru, setBuatKasusBaru] = useState("false");

	// console.log(kasusData[0], 'ISI DATA ID WBP');
	const [formState, setFormState] = useState(
		defaultValue || {
			foto_wajah: "",
			nama: "",
			pangkat_id: "",
			nama_pangkat: "",
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
			is_sick: "0",
			wbp_sickness: "",
			nama_status_wbp_kasus: "",
			// jenis_perkara_id: '',
			vonis_tahun_perkara: "",
			vonis_bulan_perkara: "",
			vonis_hari_perkara: "",
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
			akses_wbp_otmil: [],
			// Form State Kasus
			kasus_id: "",
			is_new_kasus: "false",
			// wbp_existing_id: '',
			nama_kasus: "",
			nomor_kasus: "",
			lokasi_kasus: "",
			jenis_perkara_id: "",
			jenis_pidana_id: "",
			kategori_perkara_id: "",
			waktu_kejadian: "",
			waktu_pelaporan_kasus: "",
			wbp_profile_ids: [],
			keterangans: [],
			role_ketua_oditur_ids: "",
			oditur_penyidikan_id: [],
			nama_jenis_perkara: "",
			nama_jenis_pidana: "",
			saksi_id: [],
			keteranganSaksis: [],
			zona_waktu: "",
		}
	);

	console.log("formStateSaatIni", formState);

	const [errors, setErrors] = useState<string[]>([]);
	const [zona, setZona]: any = useState([]);
	const modalContainerRef = useRef(null);
	const [autocompleteDataZona, setAutocompleteDataZona]: any = useState(zona);

	// Handle Kasus

	const tokenItem = localStorage.getItem("token");
	const dataToken = tokenItem ? JSON.parse(tokenItem) : null;

	const [data, setData] = useState([]);

	const [DataWBP, setDataWBP] = useState<WBP[]>([]);
	const [dataStatusWBP, setDataStatusWBP] = useState([]);
	const [dataOditurPenyidik, setDataOditurPenyidik] = useState([]);
	const [dataJenisPerkara, setDataJenisPerkara] = useState<any[]>([]);
	const [dataJenisPidana, setDataJenisPidana] = useState<any[]>([]);
	const [dataJenisPerkaraSelect, setDataJenisPerkaraSelect] = useState<any>();
	const [dataSaksi, setDataSaksi] = useState([]);
	const [pihakTerlibat, setPihakTerlibat] = useState([]);

	const [ketuaOditurPenyidik, setKetuaOditurPenyidik] = useState([
		{
			value: "",
			label: "",
		},
	]);

	const [selectSaksi, setSelectSaksi] = useState([]);
	const [selectTersangka, setSelectTersangka] = useState([]);

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

	const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			style={{ border: "solid 1px pink" }}
		/>
	);

	const handleWaktuKejadian = (e: any) => {
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

	const handleWaktuPelaporan = (e: any) => {
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
			waktu_pelaporan_kasus: dayjs(e).format("YYYY-MM-DDTHH:mm"),
			zona_waktu: zonaWaktu,
		});
	};

	useEffect(() => {
		console.log(defaultValue, "defaultValueSaatIini");
	}, []);

	//Set Waktu Kejadian dan Waktu Pelaporan Kasus
	// useEffect(() => {
	//   const formattedDate = dayjs().format('YYYY-MM-DDTHH:mm');
	//   console.log("formattedDate:", formattedDate);
	//   const dateObject = dayjs(formattedDate).toDate();
	//   console.log("dateObject:", dateObject);
	//   if(buatKasusBaru === 'true'){
	//     setFormState({
	//       ...formState,
	//       waktu_pelaporan_kasus: 'kontol',
	//       waktu_kejadian: 'kontol'
	//     });
	//     console.log('formattedTest1')
	//   } else {
	//     setFormState({
	//       ...formState,
	//       waktu_pelaporan_kasus: '',
	//       waktu_kejadian: ''
	//     });
	//     console.log('formattedTest2')
	//   }
	// }, [buatKasusBaru]);

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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
				});
			});
	};

	const fetchJenisPidana = async () => {
		let params = {
			pageSize: 1000,
		};
		await apiJenisPidanaRead(params, token)
			.then((res) => {
				setDataJenisPidana(res.data.records);
			})
			.catch((e) => {
				if (e.response.status === 403) {
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
				setPihakTerlibat((prevPihaklibat) =>
					prevPihaklibat.concat(Saksi)
				);
			})
			.catch((e) => {
				if (e.response.status === 403) {
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
				});
			});
	};

	const status = async () => {
		let params = {};
		await apiReadStatusWBP(params, token)
			.then((res) => {
				setDataStatusWBP(res.data.records);
			})
			.catch((e) => {
				if (e.response.status === 403) {
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
				});
			});
	};

	const handleGenerateNomorKasus = () => {
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

		const type = "Pid.K";
		const day = dayjs(new Date()).format("DD");
		const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
		const year = new Date().getFullYear().toString();
		const location = "Otmil";
		const romanNumber = convertToRoman(parseInt(month));
		const currentDate = `${day}-${romanNumber}/${year}`;
		let largestNumber = 0;

		data.forEach((item: any) => {
			if (item.nomor_kasus) {
				const caseNumber = item.nomor_kasus.split("/")[0]; // Get the first part of the case number
				const number = parseInt(caseNumber, 10);

				if (!isNaN(number) && item.nomor_kasus.includes(currentDate)) {
					largestNumber = Math.max(largestNumber, number);
				}
			}
		});

		largestNumber += 1;

		const caseNumberFormatted = `${largestNumber}/${type}/${currentDate}/${location}`;
		console.log(caseNumberFormatted, "caseNumberFormatted");

		setFormState({
			...formState,
			nomor_kasus: caseNumberFormatted,
		});
	};

	useEffect(() => {
		console.log(formState, "formState coy");
		handleGenerateNomorKasus();
	}, [buatKasusBaru]);

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
			vonis_tahun_perkara: vonisFilter
				? vonisFilter.vonis_tahun_perkara
				: "",
			vonis_bulan_perkara: vonisFilter
				? vonisFilter.vonis_bulan_perkara
				: "",
			vonis_hari_perkara: vonisFilter
				? vonisFilter.vonis_hari_perkara
				: "",

			kategori_perkara_id: kategoriPerkara
				? kategoriPerkara.kategori_perkara_id
				: "",
			jenis_pidana_id: kategoriPerkara
				? kategoriPerkara.jenis_pidana_id
				: "",
			nama_jenis_perkara: kategoriPerkara
				? kategoriPerkara.nama_jenis_perkara
				: "",
			nama_jenis_pidana: kategoriPerkara
				? kategoriPerkara.nama_jenis_pidana
				: "",
		});
	};

	const oditurPenyidikOptions = dataOditurPenyidik.map((item: any) => ({
		value: item.oditur_penyidikan_id,
		label: item.nama_oditur,
	}));

	const handleSelectOditurPenyidik = (e: any) => {
		let arrayTemp: any = [];
		let arrayAnggota: any = [];
		for (let i = 0; i < e?.length; i++) {
			arrayTemp.push(e[i].value);
			arrayAnggota.push(e[i]);
		}

		console.log("oditur_penyidikan_id", arrayTemp);

		setFormState({ ...formState, oditur_penyidikan_id: arrayTemp });
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

	const handleSelectJenisKasus = (e: any) => {
		const filterKasus = kasusData.find((item) => item.kasus_id == e.value);
		const existingWbpId = filterKasus?.wbp_profile.map(
			(item) => item.wbp_profile_id
		);
		console.log(filterKasus, "INI HASIL FILTER");
		console.log(existingWbpId, "INI HASIL EXISTING");
		console.log(kasusData, "INI KASUS DATA");
		setFormState({
			...formState,
			kasus_id: e?.value,
		});
	};
	// End Handle Kasus

	//  console.log(errors, 'ini error')
	// const validateForm = () => {
	//   let errorFields: any[] = [];

	//   for (const [key, value] of Object.entries(formState)) {
	//     if (key == 'Terdakwa' && formState.nama_status_wbp_kasus == 'Terdakwa') {
	//       console.log('here!', key)
	//       if (!value) {
	//         errorFields.push(key);
	//       }
	//     }

	//     // if (key == 'Terpidana' && formState.nama_status_wbp_kasus == 'Terpidana'){
	//     //   if (!value) {
	//     //     errorFields.push(key);
	//     //   }
	//     // }
	//     // if (key == 'Tersangka' && formState.nama_status_wbp_kasus == 'Tersangka'){}

	//     if (key != 'lokasi_otmil_id' && key != 'nama_pangkat') {
	//       if (
	//         formState.is_new_kasus == 'false' &&
	//         key != 'nama_kasus' &&
	//         key != 'jenis_perkara_id' &&
	//         key != 'vonis_tahun_perkara' &&
	//         key != 'vonis_bulan_perkara' &&
	//         key != 'vonis_hari_perkara' &&
	//         key != 'nama_jenis_pidana' &&
	//         key != 'lokasi_kasus' &&
	//         key != 'oditur_penyidikan_id' &&
	//         key != 'role_ketua_oditur_ids' &&
	//         key != 'saksi_id'
	//       ) {
	//         if (!value) {
	//           errorFields.push(key);
	//         }
	//       }
	//     }
	//   }

	//   if (errorFields.length > 0) {
	//     console.log(errorFields, 'errorfields detected');
	//     setErrors(errorFields);
	//     return false;
	//   }

	//   setErrors([]);
	//   return true;
	// };

	const validateForm = () => {
		let errorFields: any = [];

		for (const [key, value] of Object.entries(formState)) {
			if (key !== "lokasi_otmil_id")
				if (formState.is_sick === "0" || formState.is_sick === 0) {
					console.log("iniMungking", key, value);
					if (key === "wbp_sickness") {
						if (!value) {
							console.log("iniMungking");
							continue;
						}
					}
				}

			if ((key === "jenis_olahraga" || key === "zat_adiktif") && !value) {
				continue;
			}

			// ) // jika field saat ini bukan field jenis_olahraga, maka abaikan validasi untuk field jenis_olahraga.

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

			if (
				key === "lokasi_lemasmil_id" ||
				key === "nama_hunian_wbp_lemasmil" ||
				key === "vonis_bulan_perkara" ||
				key === "tanggal_penetapan_tersangka" ||
				key === "tanggal_penetapan_terdakwa" ||
				key === "tanggal_penetapan_terpidana" ||
				key === "role_ketua_oditur_ids"
			) {
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
				formState.status_wbp_kasus_id ===
				"55ae39b7-dbad-4c89-8968-6d1e2450c963"
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
				formState.status_wbp_kasus_id ===
				"ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064"
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
				formState.status_wbp_kasus_id ===
				"e9e467a1-9132-4787-8938-7517da9ba964"
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

			if (
				!value &&
				key !== "is_sick" &&
				key !== "is_isolated" &&
				key !== "residivis"
			) {
				errorFields.push(key);
				console.log("errorFieldstaktau", value, key);
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

	const handleChange = (e: any) => {
		if (e.target.name === "gelang_id") {
			const selectedGelang = gelang.find(
				(item: any) => item.gelang_id === e.target.value
			);
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
				is_sick: parseInt(e.target.value),
				wbp_sickness: newWbpSickness,
			});
		} else {
			setFormState({ ...formState, [e.target.name]: e.target.value });
		}
	};

	const handleSelectGelang = (selectedOption: any) => {
		const selectedId = selectedOption?.value;
		const gelangFilter = gelang.find(
			(item: any) => item.gelang_id === selectedId
		);

		if (gelangFilter) {
			setFormState({
				...formState,
				gelang_id: selectedId,
				DMAC: gelangFilter.dmac,
			});
		}
	};

	// const handleSelectStatusKasus = (e: any) => {
	//   setFormState({ ...formState, status_wbp_kasus_id: e?.value });
	// };

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

	const handleSelectWbpStatus = (e: any) => {
		setFormState({
			...formState,
			status_wbp_kasus_id: e?.value,
			nama_status_wbp_kasus: e?.label,
		});
		console.log(e.label, "handle status");
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
			};
			console.log(formState.foto_wajah, "imagePreview imagePreview");
			reader.readAsDataURL(file);
		}
	};

	// async function handleSetNomorKasus(){
	//   if(formState.is_new_kasus == "true"){
	//   await setFormState({...formState, nomor_kasus: nomor_kasus})
	//   }
	// }
	useEffect(() => {
		handleGenerateNomorKasus();
	}, [formState.is_new_kasus]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log(formState, "received values");
		if (!validateForm()) return;
		setButtonLoad(true);
		onSubmit(formState).then(() => setButtonLoad(false));
		// console.log(formState, 'formstateSuccesValidate');

		// closeModal();
	};

	// Function to handle adding a "zona" to a specific input
	const handleAddZona = (zonaId: number, isPermitted: number) => {
		console.log("ZONA", zonaId, "INPUT", isPermitted);

		if (formState.akses_ruangan_otmil_id.includes(zonaId)) {
			// Check if the "zona" is already added to any input
			// If it's already added, show an error or handle it as needed
			// setErrors([...errors, `Zona ${zonaId} is already assigned.`]);
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
			setFormState({
				...formState,
				akses_ruangan_otmil_id: [
					...formState.akses_ruangan_otmil_id,
					objectZona,
				],
			});

			// combine state
			// const combineZona = [...formState.akses_ruangan_otmil_id, ...formState.zona_merah]
			// setFormState({...formState, akses_wbp_otmil: combineZona})

			// Remove the selected zona from the autocomplete data
			setAutocompleteDataZona((prevData: any) =>
				prevData.filter(
					(zonaItem: any) => zonaItem.ruangan_otmil_id !== zonaId
				)
			);
		}
	};
	// Function to handle removing a "zona" from the selected chips
	const handleRemoveZona = (zonaId: any, inputField: any) => {
		// Remove the zona from the selected input field
		setFormState({
			...formState,
			akses_ruangan_otmil_id: formState.akses_ruangan_otmil_id.filter(
				(id: any) => id.id !== zonaId
			),
		});

		// Add the removed zona back to the autocomplete data

		// if (!isEdit) {
		setAutocompleteDataZona((prevData: any) => [
			...prevData,
			zona.find((zonaItem: any) => zonaItem.ruangan_otmil_id === zonaId),
		]);
		// }
	};

	useEffect(() => {
		Promise.all([
			fecthKasusData(),
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
			getTimeZone(),
			tersangka(),
			Saksi(),
			status(),
			fetchJenisPerkara(),
			fetchJenisPidana(),
			Oditur(),
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
				console.log(res.data.records, "resDataRuangan");
				setZona(res.data.records);
				setAutocompleteDataZona(res.data.records);
			})
			.catch((e: any) => {
				if (e.response.status === 403) {
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
				});
			});
	};

	const getNamaRuanganById = (id: any) => {
		// const ruangan = zona.find((item: any) => item.lokasi_otmil_id === id);
		// console.log(ruangan, 'ruanganTestingZona');
		console.log("ruanganTestingZonaParams", id);
		console.log(zona, "ruanganTestingZona2");
		const ruangan = zona.find((item: any) => item.ruangan_otmil_id === id);
		return ruangan
			? ruangan.nama_ruangan_otmil
			: "Nama ruangan tidak ditemukan";
		// console.log(ruangan.nama_ruangan_otmil, 'ruanganTestingZona');
		// return ruangan ? ruangan.nama_ruangan : 'Nama ruangan tidak ditemukan';
	};

	// useEffect(() => {
	//   getNamaRuanganById('9c547936-6033-4ae6-a352-b8f49cf8734d');
	// }, []);

	const getAllKategoriPerkara = async () => {
		let params = {};
		await apiReadAllKategoriJahat(params, token)
			.then((res) => {
				setKategoriJahat(res);
			})
			.catch((e: any) => {
				if (e.response.status === 403) {
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
				});
			});
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
					navigate("/auth/signin", {
						state: {
							forceLogout: true,
							lastPage: location.pathname,
						},
					});
				}
				Alerts.fire({
					icon: e.response.status === 403 ? "warning" : "error",
					title:
						e.response.status === 403 ? Error403Message : e.message,
				});
			});
	};

	const handleRemoveFoto = (e: any) => {
		e.preventDefault();
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
				element: ".f-keahlian",
				popover: {
					title: "Keahlian tersangka",
					description: "Isi keahlian tersangka",
				},
			},
			{
				element: ".f-baru",
				popover: {
					title: "Buat kasus baru",
					description: "Pilih kasus Ya/Tidak",
				},
			},
			{
				element: ".f-jenis",
				popover: {
					title: "Jenis kasus",
					description: "Pilih jenis kasus yang diinginkan",
				},
			},
			{
				element: ".f-ditahan",
				popover: {
					title: "Tanggal ditahan",
					description: "Pilih tanggal ditahan yang diinginkan",
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
				element: ".f-penyakit",
				popover: {
					title: "Status penyakit tersangka",
					description: "Pilih status penyakit tersangka",
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

		if (formState.is_sick === "1" || formState.is_sick === 1) {
			steps.splice(31, 0, {
				element: ".f-nama-penyakit",
				popover: {
					title: "Nama penyakit tersangka",
					description: "Isi nama penyakit tersangka",
				},
			});
			steps.splice(29, 0, {
				element: ".f-penetapan",
				popover: {
					title: "Tanggal penetapan terpidana",
					description:
						"Pilih tanggal penetapan terpidana yang diinginkan",
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

		// if (
		//   formState.status_wbp_kasus_id === '55ae39b7-dbad-4c89-8968-6d1e2450c963'
		// ) {
		//   tanggalElement = '.f-tanggal-terpidana';
		//   tanggalTitle = 'Tanggal terpidana tersangka';
		//   tanggalDescription = 'Isi tanggal terpidana tersangka';
		// } else if (
		//   formState.status_wbp_kasus_id === 'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064'
		// ) {
		//   tanggalElement = '.f-tanggal-terdakwa';
		//   tanggalTitle = 'Tanggal terpidana tersangka';
		//   tanggalDescription = 'Isi tanggal terpidana tersangka';
		// } else if (
		//   formState.status_wbp_kasus_id === 'e9e467a1-9132-4787-8938-7517da9ba964'
		// ) {
		//   tanggalElement = '.f-tanggal-tersangka';
		//   tanggalTitle = 'Tanggal penetapan tersangka';
		//   tanggalDescription = 'Isi tanggal penetapan tersangka';
		// }

		if (
			formState.is_sick === "1" ||
			(formState.is_sick === 1 &&
				tanggalElement &&
				tanggalTitle &&
				tanggalDescription)
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

		const driverObj: any = driver({
			showProgress: true,
			steps: steps,
		});

		driverObj.drive();
	};
	const mikir =
		isEdit &&
		formState.akses_ruangan_otmil?.filter(
			(data: any) => data.isPermitted == 1
		);
	console.log(mikir, "mikir");
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

												{isDetail && (
													<div className="form-group w-full h-fit">
														<div className=" mt-1 flex flex-col items-center">
															{formState.foto_wajah && (
																<img
																	className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
																	src={
																		"https://dev-siram-workstation.transforme.co.id" +
																		formState.foto_wajah
																	}
																	alt="Image Preview"
																/>
															)}
														</div>
													</div>
												)}

												{isEdit && (
													<div className="form-group w-full h-fit ">
														<div className="mt-1 flex flex-col items-center">
															{formState.foto_wajah ? (
																formState.foto_wajah.startsWith(
																	"data:image/"
																) ? (
																	<img
																		className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
																		src={
																			formState.foto_wajah
																		}
																		alt="Image Preview"
																	/>
																) : (
																	<img
																		className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
																		src={
																			"https://dev-siram-workstation.transforme.co.id" +
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
																style={{
																	display:
																		"none",
																}}
																onChange={
																	handleImageChange
																}
															/>
															<div className="flex gap-2">
																<label htmlFor="image-upload">
																	<div className="f-edit-gambar cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
																		Edit
																		Gambar
																	</div>
																</label>
																<button
																	onClick={
																		handleRemoveFoto
																	}
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
															{errors.map(
																(item) =>
																	item ===
																	"foto_wajah"
																		? "Masukan foto"
																		: ""
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
																	src={
																		formState.foto_wajah
																	}
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
																style={{
																	display:
																		"none",
																}}
																onChange={
																	handleImageChange
																}
															/>
															<div className="flex gap-2">
																<label htmlFor="image-upload">
																	<div className="f-unggah-gambar cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
																		Unggah
																		Gambar
																	</div>
																</label>

																<button
																	onClick={
																		handleRemoveFoto
																	}
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
																{errors.map(
																	(item) =>
																		item ===
																		"foto_wajah"
																			? "Masukan foto"
																			: ""
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
															onChange={
																handleChange
															}
															value={
																formState.nama
															}
															disabled={isDetail}
														/>
														<p className="error-text">
															{errors.map(
																(item) =>
																	item ===
																	"nama"
																		? "Masukan nama"
																		: ""
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
															styles={
																customStyles
															}
															defaultValue={
																isEdit ||
																isDetail
																	? {
																			value: formState.pangkat_id,
																			label: formState.nama_pangkat,
																	  }
																	: formState.pangkat_id
															}
															isDisabled={
																isDetail
															}
															isClearable={true}
															isSearchable={true}
															placeholder="Pilih Pangkat"
															name="pangkat_id"
															options={pangkat.map(
																(
																	item: any
																) => ({
																	value: item.pangkat_id,
																	label: item.nama_pangkat,
																})
															)}
															onChange={(e) => {
																setFormState({
																	...formState,
																	pangkat_id:
																		e?.value,
																	nama_pangkat:
																		e?.label,
																});
															}}
														/>
														<p className="error-text">
															{errors.map(
																(item) =>
																	item ===
																	"pangkat_id"
																		? "Pilih pangkat"
																		: ""
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
															styles={
																customStyles
															}
															isDisabled={
																isDetail
															}
															isClearable={true}
															isSearchable={true}
															name="matra_id"
															placeholder="Pilih Matra"
															defaultValue={
																isEdit ||
																isDetail
																	? {
																			value: formState.matra_id,
																			label: formState.nama_matra,
																	  }
																	: formState.matra_id
															}
															options={matra.map(
																(
																	item: any
																) => ({
																	value: item.matra_id,
																	label: item.nama_matra,
																})
															)}
															onChange={
																handleSelectMatra
															}
														/>
														<p className="error-text">
															{errors.map(
																(item) =>
																	item ===
																	"matra_id"
																		? "Pilih matra"
																		: ""
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
															onChange={
																handleChange
															}
															value={
																formState.nrp
															}
															disabled={isDetail}
														/>
														<p className="error-text">
															{errors.map(
																(item) =>
																	item ===
																	"nrp"
																		? "Masukan nomor registrasi"
																		: ""
															)}
														</p>
													</div>
												</div>
											</div>

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
																		value: formState.pendidikan_id,
																		label: formState.nama_pendidikan,
																  }
																: formState.pendidikan_id
														}
														options={pendidikan.map(
															(item) => ({
																value: item.pendidikan_id,
																label: item.nama_pendidikan,
															})
														)}
														onChange={
															handleSelectPendidikan
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"pendidikan_id"
																? "Pilih pendidikan"
																: ""
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
																		value: formState.kesatuan_id,
																		label: formState.nama_kesatuan,
																  }
																: formState.kesatuan_id
														}
														options={kesatuan.map(
															(item: any) => ({
																value: item.kesatuan_id,
																label: item.nama_kesatuan,
															})
														)}
														onChange={
															handleSelectKesatuan
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"kesatuan_id"
																? "Pilih kesatuan"
																: ""
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
														value={
															formState.jenis_kelamin
														}
														disabled={isDetail}
													>
														<option
															disabled
															value=""
														>
															Pilih Jenis Kelamin
														</option>
														<option value="1">
															Laki-laki
														</option>
														<option value="0">
															Perempuan
														</option>
													</select>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"jenis_kelamin"
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
																		value: formState.agama_id,
																		label: formState.nama_agama,
																  }
																: formState.agama_id
														}
														options={agama.map(
															(item: any) => ({
																value: item.agama_id,
																label: item.nama_agama,
															})
														)}
														onChange={
															handleSelectAgama
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item === "agama_id"
																? "Pilih agama"
																: ""
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
														value={
															formState.tempat_lahir
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"tempat_lahir"
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
														value={
															formState.tanggal_lahir
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"tanggal_lahir"
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
																		value: formState.provinsi_id,
																		label: formState.nama_provinsi,
																  }
																: formState.provinsi_id
														}
														placeholder={
															"Pilih provinsi"
														}
														isClearable={true}
														isSearchable={true}
														isDisabled={isDetail}
														name="provinsi_id"
														styles={customStyles}
														options={provinsi.map(
															(item: any) => ({
																value: item.provinsi_id,
																label: item.nama_provinsi,
															})
														)}
														onChange={
															handleSelectProvinsi
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"provinsi_id"
																? "Pilih provinsi"
																: ""
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
																		value: formState.kota_id,
																		label: formState.nama_kota,
																  }
																: formState.kota_id
														}
														placeholder={
															"Pilih kota"
														}
														isClearable={true}
														isSearchable={true}
														isDisabled={isDetail}
														name="kota_id"
														styles={customStyles}
														options={kota
															.filter(
																(item: any) => {
																	return (
																		item.provinsi_id ===
																		formState.provinsi_id
																	);
																}
															)
															.map((item) => ({
																value: item.kota_id,
																label: item.nama_kota,
															}))}
														onChange={
															handleSelectKota
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item === "kota_id"
																? "Pilih Kota"
																: ""
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
														item === "alamat"
															? "Masukan alamat"
															: ""
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
																		value: formState.status_kawin_id,
																		label: formState.nama_status_kawin,
																  }
																: formState.status_kawin_id
														}
														options={statusKawin.map(
															(item) => ({
																value: item.status_kawin_id,
																label: item.nama_status_kawin,
															})
														)}
														onChange={
															handleSelectStatusKawin
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"status_kawin_id"
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
														value={
															formState.nama_kontak_keluarga
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"nama_kontak_keluarga"
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
														value={
															formState.hubungan_kontak_keluarga
														}
														disabled={isDetail}
													/>

													<p className="error-text">
														{errors.map((item) =>
															item ===
															"hubungan_kontak_keluarga"
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
														value={
															formState.nomor_kontak_keluarga
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"nomor_kontak_keluarga"
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
														className="basic-single f-keahlian"
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
																		value: formState.bidang_keahlian_id,
																		label: formState.nama_bidang_keahlian,
																  }
																: formState.bidang_keahlian_id
														}
														options={keahlian.map(
															(item: any) => ({
																value: item.bidang_keahlian_id,
																label: item.nama_bidang_keahlian,
															})
														)}
														onChange={
															handleSelectBidangKeahlian
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"bidang_keahlian_id"
																? "Pilih keahlian"
																: ""
														)}
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* ----- DATA PERKARA ----- */}
									<div className="mt-4">
										<p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
											Data Perkara
										</p>

										<div className="flex flex-col gap-4">
											{/* Handle Kasus */}
											<div className="grid grid-cols-2 gap-4">
												{/* Field Kasus */}
												<div className="form-group w-full ">
													<label
														className="  block text-sm font-medium text-black dark:text-white"
														htmlFor="id"
													>
														Buat Kasus Baru (?)
													</label>
													<select
														className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary f-baru"
														name="is_new_kasus"
														onChange={
															handleNewKasus
														}
														disabled={isDetail}
														defaultValue={
															formState.is_new_kasus
														}
													>
														<option
															disabled
															value=""
														>
															Silahkan Pilih
														</option>

														<option value="false">
															Tidak
														</option>
														<option value="true">
															Ya
														</option>
													</select>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"is_new_kasus"
																? "Pilih Ya/Tidak"
																: ""
														)}
													</p>
												</div>
											</div>

											{formState.is_new_kasus ==
											"" ? null : buatKasusBaru ===
											  "true" ? (
												// Kasus Baru
												<div className="grid grid-cols-1 gap-4">
													{/* <div className="form-group w-full">
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
                                  item === 'nomor_kasus'
                                    ? 'Masukan Nomor Kasus'
                                    : '',
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
															onChange={
																handleChange
															}
															disabled={isDetail}
														/>
														<div className="">
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"nama_kasus"
																			? "Masukkan Nama Kasus"
																			: ""
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
															defaultValue={
																isEdit ||
																isDetail
																	? {
																			value: formState.jenis_perkara_id,
																			label: formState.nama_jenis_perkara,
																	  }
																	: formState.jenis_perkara_id
															}
															placeholder={
																"Pilih Jenis Perkara"
															}
															isSearchable={true}
															isDisabled={
																isDetail
															}
															isClearable={true}
															name="jenis_perkara_id"
															styles={
																customStyles
															}
															options={jenisPerkara.map(
																(
																	item: any
																) => ({
																	value: item.jenis_perkara_id,
																	label: item.nama_jenis_perkara,
																})
															)}
															onChange={
																handleSelectJenisPerkara
															}
														/>
														<p className="error-text">
															{errors.map(
																(item) =>
																	item ===
																	"jenis_perkara_id"
																		? "Pilih jenis perkara"
																		: ""
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
																value={
																	formState.vonis_tahun_perkara
																}
																disabled
															/>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"vonis_tahun_perkara"
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
																value={
																	formState.vonis_bulan_perkara
																}
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
																value={
																	formState.vonis_hari_perkara
																}
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
															onChange={
																handleChange
															}
															value={
																formState.nama_jenis_pidana
															}
															disabled
														/>
														<div className="h-2">
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"nama_jenis_pidana"
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
															onChange={
																handleChange
															}
															disabled={isDetail}
														/>
														<div className="">
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"lokasi_kasus"
																			? "Masukan Lokasi Kasus"
																			: ""
																)}
															</p>
														</div>
													</div>

													<div className="grid grid-cols-2">
														{/* <div className="form-group w-full">
                              <label
                                className="block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Tanggal Kejadian Kasus
                              </label>
                              <div className="flex flex-row">
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
                                  className="w-[200px] rounded border border-stroke py-3 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                  name="waktu_kejadian"
                                  disabled={false}
                                  locale="id"
                                  placeholderText='Masukkan Tanggal'
                                />
                                <input
                                  type="text"
                                  className="w-[5rem] mx-1 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                                  name="zona_waktu"
                                  value={formState.zona_waktu}
                                  disabled
                                />
                              </div>
                              
                              <div className="">
                                <p className="error-text">
                                  {errors.map((item) =>
                                    item === 'waktu_kejadian'
                                      ? 'Masukan Tanggal Kejadian Kasus'
                                      : '',
                                  )}
                                </p>
                              </div>
                            </div> */}

														{/* <div className="form-group w-full">
                              <label
                                className="block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Tanggal Pelaporan Kasus
                              </label>
                              <div className="flex flex-row">
                                <DatePicker
                                  // selected={
                                  //   formState.waktu_pelaporan_kasus
                                  //     ? dayjs(formState.waktu_pelaporan_kasus).toDate()
                                  //     : dayjs().toDate()
                                  // }
                                  showTimeInput
                                  timeFormat="HH:mm"
                                  onChange={handleWaktuPelaporan}
                                  timeCaption="Time"
                                  dateFormat="dd/MM/yyyy HH:mm"
                                  customTimeInput={<ExampleCustomTimeInput />}
                                  className="w-[200px] rounded border border-stroke py-3 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                  name="waktu_kejadian"
                                  disabled={false}
                                  placeholderText='Masukkan Tanggal'
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
                              <div className="">
                                <p className="error-text">
                                  {errors.map((item) =>
                                    item === 'waktu_pelaporan_kasus'
                                      ? 'Masukan Tanggal Pelaporan Kasus'
                                      : '',
                                  )}
                                </p>
                              </div>
                            </div> */}

														<div className="f-tanggal-lahir form-group w-full flex flex-col">
															<label
																className="  block text-sm font-medium text-black dark:text-white"
																htmlFor="id"
															>
																Tanggal Kejadian
																Kasus
															</label>
															<div className="flex">
																<input
																	type="datetime-local"
																	className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
																	name="waktu_kejadian"
																	onChange={
																		handleChange
																	}
																	value={
																		formState.waktu_kejadian
																	}
																	disabled={
																		isDetail
																	}
																/>
																<input
																	type="text"
																	className="w-[5rem] mx-1 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
																	name="zona_waktu"
																	value={
																		formState.zona_waktu
																	}
																	disabled
																/>
															</div>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"waktu_kejadian"
																			? "Masukan waktu kejadian"
																			: ""
																)}
															</p>
														</div>

														<div className="f-tanggal-lahir form-group w-full flex flex-col">
															<label
																className="  block text-sm font-medium text-black dark:text-white"
																htmlFor="id"
															>
																Tanggal
																Pelaporan Kasus
															</label>
															<div className="flex">
																<input
																	type="datetime-local"
																	className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
																	name="waktu_pelaporan_kasus"
																	onChange={
																		handleChange
																	}
																	value={
																		formState.waktu_pelaporan_kasus
																	}
																	disabled={
																		isDetail
																	}
																/>
																<input
																	type="text"
																	className="w-[5rem] mx-1 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
																	name="zona_waktu"
																	value={
																		formState.zona_waktu
																	}
																	disabled
																/>
															</div>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"waktu_pelaporan_kasus"
																			? "Masukan waktu pelaporan kasus"
																			: ""
																)}
															</p>
														</div>
													</div>

													<div
														className={`${
															isDetail
																? "block mt-4"
																: "hidden"
														}`}
													>
														<div className="form-group w-full">
															<label
																className="block text-sm font-medium text-black dark:text-white pt-3"
																htmlFor="id"
															>
																Jumlah
																Penyidikan
															</label>
															<input
																className="w-full rounded border border-stroke py-3 pl-3 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
																placeholder="Jumlah Penyidikan"
																name="waktu_pelaporan_kasus"
																onChange={
																	handleChange
																}
																disabled={
																	isDetail
																}
															/>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"waktu_pelaporan_kasus"
																			? "Masukan Jumlah Penyidikan"
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
															Oditur Penyidik
														</label>
														<Select
															className="capitalize text-white"
															isMulti
															placeholder="Pilih Oditur Penyidik"
															styles={
																customStyles
															}
															isDisabled={
																isDetail
															}
															options={
																oditurPenyidikOptions
															}
															onChange={
																handleSelectOditurPenyidik
															}
														/>
														<div className="h-2">
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"nama"
																			? "Masukan Tersangka"
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
															Ketua Oditur
															Penyidik
														</label>
														<Select
															className="capitalize"
															isDisabled={
																isDetail
															}
															placeholder="Pilih Ketua Oditur"
															styles={
																customStyles
															}
															options={
																ketuaOditurPenyidik
															}
															onChange={
																handleSelectKetuaOditur
															}
														/>
														<div className="h-2">
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"role_ketua_oditur_ids"
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
															isDisabled={
																isDetail
															}
															placeholder="Pihak Terlibat"
															styles={
																customStyles
															}
															options={
																pihakTerlibat
															}
															onChange={
																handleSelectPihakTerlibat
															}
														/>
														<div className="h-2">
															<p className="error-text">
																{errors.includes(
																	"saksi_id"
																) ||
																errors.includes(
																	"wbp_profile_ids"
																)
																	? `${
																			errors.includes(
																				"wbp_profile_ids"
																			)
																				? "Tersangka"
																				: ""
																	  } ${
																			errors.includes(
																				"saksi_id"
																			) &&
																			errors.includes(
																				"wbp_profiles_ids"
																			)
																				? "Dan"
																				: ""
																	  } ${
																			errors.includes(
																				"saksi_id"
																			)
																				? "Saksi"
																				: ""
																	  } Belum di Pilih`
																	: ""}
															</p>
														</div>
													</div>
													{selectTersangka.length ===
													0 ? null : (
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
																			Nama
																			Tersangka
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
																	{selectTersangka.map(
																		(
																			item: any,
																			index: number
																		) => {
																			return (
																				<div
																					className="flex items-center mt-2 bg-slate-800 py-2 pl-4"
																					key={
																						index
																					}
																				>
																					<div className="form-group w-2/6">
																						<label
																							htmlFor={`keterangans-${index}`}
																							className="capitalize block text-sm font-medium text-black dark:text-white"
																						>
																							{
																								item.label
																							}
																						</label>
																					</div>

																					<div className="form-group w-4/6 flex items-center mr-2">
																						<input
																							id={`keterangans${index}`}
																							className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
																							placeholder={`${
																								errors.includes(
																									"keterangan"
																								)
																									? "Keterangan Belum Di Isi"
																									: "Keterangan"
																							}`}
																							onChange={(
																								e
																							) =>
																								handleChangeKeteranganTersangka(
																									e,
																									index
																								)
																							}
																							disabled={
																								isDetail
																							}
																						/>
																					</div>
																				</div>
																			);
																		}
																	)}
																</div>
															</div>
														</>
													)}

													{selectSaksi.length ===
													0 ? null : (
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
																			Nama
																			Saksi
																		</label>
																	</div>

																	<div className="form-group w-4/6">
																		<label
																			htmlFor="id"
																			className="block text-sm font-medium text-black dark:text-white"
																		>
																			Keterangan
																			Saksi
																		</label>
																	</div>
																</div>

																<div className="h-32 overflow-y-auto bg-slate-800 rounded-b">
																	{selectSaksi.map(
																		(
																			item: any,
																			index: number
																		) => {
																			return (
																				<div
																					className="flex items-center mt-2 bg-slate-800 py-2 pl-4"
																					key={
																						index
																					}
																				>
																					<div className="form-group w-2/6">
																						<label
																							className="capitalize block text-sm font-medium text-black dark:text-white"
																							htmlFor={`keterangan-${index}`}
																						>
																							{
																								item.label
																							}
																						</label>
																					</div>

																					<div className="form-group w-4/6 flex items-center mr-2">
																						<input
																							id={`keterangan-${index}`}
																							className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
																							placeholder={`${
																								errors.includes(
																									"keteranganSaksis"
																								)
																									? "Keterangan Belum Di Isi"
																									: "Keterangan Saksi"
																							}`}
																							onChange={(
																								e
																							) =>
																								handleChangeKeterangan(
																									e,
																									index
																								)
																							}
																							disabled={
																								isDetail
																							}
																						/>
																					</div>
																				</div>
																			);
																		}
																	)}
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
														className="basic-single f-jenis"
														classNamePrefix="select"
														defaultValue={
															isEdit || isDetail
																? {
																		value: formState.kasus_id,
																		label: formState.nama_kasus,
																  }
																: formState.kasus_id
														}
														placeholder={
															"Pilih Jenis Kasus"
														}
														isSearchable={true}
														isDisabled={isDetail}
														name="kasus_id"
														styles={customStyles}
														options={kasusData.map(
															(item: any) => ({
																value: item.kasus_id,
																label: item.nama_kasus,
															})
														)}
														onChange={
															handleSelectJenisKasus
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item === "kasus_id"
																? "Pilih kasus"
																: ""
														)}
													</p>
												</div>
											)}

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
														className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary f-ditahan"
														name="tanggal_ditahan_otmil"
														onChange={handleChange}
														value={
															formState.tanggal_ditahan_otmil
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"tanggal_ditahan_otmil"
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
														className="basic-single p-gelang"
														classNamePrefix="select"
														defaultValue={
															isEdit || isDetail
																? {
																		value: formState.gelang_id,
																		label: formState.nama_gelang,
																  }
																: formState.gelang_id
														}
														placeholder={
															"Pilih Gelang"
														}
														isSearchable={true}
														isDisabled={isDetail}
														name="gelang_id"
														styles={customStyles}
														options={gelang.map(
															(item: any) => ({
																value: item.gelang_id,
																label: item.nama_gelang,
															})
														)}
														onChange={
															handleSelectGelang
														}
													/>

													{/* <select
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="gelang_id"
                              onChange={handleChange}
                              value={formState.gelang_id}
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
                                          wbp.gelang_id === item.gelang_id,
                                      );
                                      return (
                                        <option
                                          value={item.gelang_id}
                                          key={item.gelang_id}
                                        >
                                          {item.nama_gelang}{' '}
                                          {isUsed
                                            ? '(Sedang Digunakan)'
                                            : '(Tidak Digunakan)'}
                                        </option>
                                      );
                                    })
                                  : gelang
                                      .filter(
                                        (item: any) =>
                                          !dataWbp
                                            .map(
                                              (wbp: any) =>
                                                wbp.gelang_id || wbp.gelang_id,
                                            )
                                            .includes(item.gelang_id),
                                      )
                                      .map((item: any) => (
                                        <option value={item.gelang_id}>
                                          {item.nama_gelang}
                                        </option>
                                      ))}
                            </select> */}
													<p className="error-text">
														{errors.map((item) =>
															item === "gelang_id"
																? "Pilih gelang"
																: ""
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
														value={formState.DMAC}
														disabled
													/>
													{/* <p className="error-text">
                            {errors.map((item) =>
                              item === 'DMAC' ? 'Pilih gelang dulu' : '',
                            )}
                          </p> */}
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
														value={
															formState.residivis
														}
														disabled={isDetail}
													>
														<option
															value=""
															disabled
														>
															Pilih Residivis
														</option>

														<option value="0">
															Tidak
														</option>
														<option value="1">
															Ya
														</option>
													</select>
													<p className="error-text">
														{errors.map((item) =>
															item === "residivis"
																? "Pilih Ya/Tidak"
																: ""
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
																		value: formState.hunian_wbp_otmil_id,
																		label: formState.nama_hunian_wbp_otmil,
																  }
																: formState.hunian_wbp_otmil_id
														}
														options={hunian.map(
															(item: any) => ({
																value: item.hunian_wbp_otmil_id,
																label: item.nama_hunian_wbp_otmil,
															})
														)}
														onChange={
															handleSelectHunianTahanan
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"hunian_wbp_otmil_id"
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
														value={
															formState.nomor_tahanan
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"nomor_tahanan"
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
														value={
															formState.is_isolated
														}
														disabled={isDetail}
													>
														<option
															value=""
															disabled
														>
															Silahkan Dipilih
														</option>
														<option value="0">
															Tidak
														</option>
														<option value="1">
															Ya
														</option>
													</select>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"is_isolated"
																? "Pilih Ya/Tidak"
																: ""
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
														styles={customStyles}
														name="status_wbp_kasus_id"
														isDisabled={isDetail}
														isClearable={true}
														isSearchable={true}
														placeholder="Pilih Status"
														defaultValue={
															(isEdit ||
																isDetail) &&
															formState.nama_status_wbp_kasus // Jika dalam mode edit atau detail dan nama_status_wbp_kasus tidak null
																? {
																		value: formState.status_wbp_kasus_id,
																		label: formState.nama_status_wbp_kasus,
																  }
																: formState.status_wbp_kasus_id
														}
														options={statusWbp.map(
															(item: any) => ({
																value: item.status_wbp_kasus_id,
																label: item.nama_status_wbp_kasus,
															})
														)}
														onChange={
															handleSelectWbpStatus
														}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"status_wbp_kasus_id"
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

												{formState.status_wbp_kasus_id ===
													"" ||
												formState.status_wbp_kasus_id ===
													null ? null : (
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
																Tanggal
																penetapan
																terpidana
															</label>
															<input
																type="date"
																className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary f-penetapan"
																name="tanggal_penetapan_terpidana"
																onChange={
																	handleChange
																}
																value={
																	formState.tanggal_penetapan_terpidana
																}
																disabled={
																	isDetail
																}
															/>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"tanggal_penetapan_terpidana"
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
																Tanggal
																penetapan
																terdakwa
															</label>
															<input
																type="date"
																className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
																name="tanggal_penetapan_terdakwa"
																onChange={
																	handleChange
																}
																value={
																	formState.tanggal_penetapan_terdakwa
																}
																disabled={
																	isDetail
																}
															/>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"tanggal_penetapan_terdakwa"
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
																Tanggal
																penetapan
																tersangka
															</label>
															<input
																type="date"
																className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
																name="tanggal_penetapan_tersangka"
																onChange={
																	handleChange
																}
																value={
																	formState.tanggal_penetapan_tersangka
																}
																disabled={
																	isDetail
																}
															/>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"tanggal_penetapan_tersangka"
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
														value={
															formState.tanggal_masa_penahanan_otmil
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item ===
															"tanggal_masa_penahanan_otmil"
																? "Masukan tanggal masa penahanan"
																: ""
														)}
													</p>
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
																onChange={
																	handleChange
																}
																value={
																	formState.is_sick
																}
																disabled={
																	isDetail
																}
															>
																<option
																	value=""
																	disabled
																>
																	Silahkan
																	Pilih
																</option>

																<option value="0">
																	Tidak
																</option>
																<option value="1">
																	Ya
																</option>
															</select>
															<p className="error-text">
																{errors.map(
																	(item) =>
																		item ===
																		"is_sick"
																			? "Pilih Ya/Tidak"
																			: ""
																)}
															</p>
														</div>

														{formState.is_sick ==
															"0" ||
														formState.is_sick ==
															"" ? null : (
															<>
																<div className="f-nama-penyakit form-group w-full flex flex-col">
																	<label
																		className="  block text-sm font-medium text-black dark:text-white"
																		htmlFor="id"
																	>
																		Nama
																		Penyakit
																	</label>
																	<input
																		className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
																		name="wbp_sickness"
																		placeholder="Nama Penyakit"
																		onChange={
																			handleChange
																		}
																		value={
																			formState.wbp_sickness
																		}
																		disabled={
																			isDetail
																		}
																	/>
																	<p className="error-text">
																		{errors.map(
																			(
																				item
																			) =>
																				item ===
																				"wbp_sickness"
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

										{/* ----- DATA PERILAKU ----- */}
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

										{isDetail ? null : (
											<>
												{/*  Akses Zona  */}
												<div className="grid grid-cols-3 gap-5 justify-normal pt-4">
													<div className="w-full col-span-3">
														<h3 className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
															Akses Zona
														</h3>

														<div className="border-slate-500 grid grid-cols-3 gap-5  p-2 border rounded-lg akses-zona">
															{isEdit
																? autocompleteDataZona
																		?.filter(
																			(
																				item: any
																			) =>
																				!formState.akses_ruangan_otmil_id.some(
																					(
																						data: any
																					) =>
																						item.ruangan_otmil_id ==
																						data.id
																				)
																		)
																		.map(
																			(
																				zonaItem: any
																			) => (
																				<div
																					key={
																						zonaItem.ruangan_otmil_id
																					}
																					className={`gap-2 py-2 [word-wrap: break-word] flex flex-col h-fit cursor-default items-center justify-between rounded-[16px] border-4 ${
																						zonaItem.nama_zona ===
																						"Hijau"
																							? "border-green-500"
																							: zonaItem.nama_zona ===
																							  "Kuning"
																							? "border-yellow-500"
																							: zonaItem.nama_zona ===
																							  "Merah"
																							? "border-red-500"
																							: "border-slate-800"
																					} bg-slate-800 bg-[transparent] px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear  hover:!shadow-none dark:text-neutral-200`}
																					data-te-ripple-color="dark"
																				>
																					<p className="text-xs capitalize font-semibold">
																						{" "}
																						{
																							zonaItem.nama_ruangan_otmil
																						}
																					</p>
																					<button
																						className="text-white w-full bg-green-500 border-white border-[1px] rounded-md font-bold text-[9px]"
																						onClick={(
																							e
																						) => {
																							e.preventDefault(); // Prevent page reload
																							handleAddZona(
																								zonaItem.ruangan_otmil_id,
																								1
																							);
																						}}
																					>
																						Ijinkan
																					</button>
																					<button
																						className="text-white w-full bg-red-500 border-white border-[1px] rounded-md font-bold text-[9px]"
																						onClick={(
																							e
																						) => {
																							e.preventDefault(); // Prevent page reload
																							handleAddZona(
																								zonaItem.ruangan_otmil_id,
																								0
																							);
																						}}
																					>
																						Larang
																					</button>
																				</div>
																			)
																		)
																: autocompleteDataZona?.map(
																		(
																			zonaItem: any
																		) => (
																			<div
																				key={
																					zonaItem.ruangan_otmil_id
																				}
																				className={`gap-2 py-2 [word-wrap: break-word] flex flex-col h-fit cursor-default items-center justify-between rounded-[16px] border-4  ${
																					zonaItem.nama_zona ===
																					"Hijau"
																						? "border-green-500"
																						: zonaItem.nama_zona ===
																						  "Kuning"
																						? "border-yellow-400"
																						: zonaItem.nama_zona ===
																						  "Merah"
																						? "border-red-500"
																						: "border-slate-500"
																				} bg-slate-500 bg-[transparent] px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear  hover:!shadow-none dark:text-neutral-200`}
																				data-te-ripple-color="dark"
																			>
																				<p className="text-xs text-white capitalize font-semibold">
																					{" "}
																					{
																						zonaItem.nama_ruangan_otmil
																					}
																				</p>
																				<button
																					className="text-white w-full bg-green-500 border-white border-[1px] rounded-md font-bold text-[9px]"
																					onClick={(
																						e
																					) => {
																						e.preventDefault();
																						handleAddZona(
																							zonaItem.ruangan_otmil_id,
																							1
																						);
																					}}
																				>
																					Ijinkan
																				</button>

																				<button
																					className="text-white w-full bg-red-500 border-white border-[1px] rounded-md font-bold text-[9px]"
																					onClick={(
																						e
																					) => {
																						e.preventDefault();
																						handleAddZona(
																							zonaItem.ruangan_otmil_id,
																							0
																						);
																					}}
																				>
																					Larang
																				</button>
																			</div>
																		)
																  )}
														</div>
														{/* Display errors */}
														{/* {errors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))} */}
													</div>
												</div>
											</>
										)}

										{/*  Zona  */}
										<div className=" grid grid-cols-2 gap-5 justify-normal pt-4">
											<div className="zona-hijau w-full ">
												<h3 className="text-md font-semibold mb-2">
													Zona Hijau
												</h3>

												<div className="border-green-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
													{/* {isEdit &&
                            formState.akses_ruangan_otmil_id.map(
                              (zona: any, index: any) => (
                                <div
                                  key={index}
                                  className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-green-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
                                  data-te-ripple-color="dark"
                                >
                                  <p className="capitalize text-center">
                                  {getNamaRuanganById(zona.id)}
                                  </p>
                                </div>
                              ),
                            )} */}
													{(() => {
														console.log(
															defaultValue,
															"aksesRuangan2"
														);
														return null; // or some JSX to render if needed
													})()}
													{!isDetail &&
														formState.akses_ruangan_otmil_id
															?.filter(
																(data) =>
																	data.isPermitted ==
																	1
															)
															.map(
																(
																	zonaId: any
																) => (
																	<div
																		key={
																			zonaId
																		}
																		className=" w-full [word-wrap: break-word] flex  cursor-default items-center justify-between rounded-[16px] border border-green-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-green-500 hover:!shadow-none dark:text-neutral-200"
																		data-te-ripple-color="dark"
																	>
																		<p className="capitalize text-center">
																			{
																				zona.find(
																					(
																						zonaItem: any
																					) =>
																						zonaItem.ruangan_otmil_id ==
																						zonaId.id
																				)
																					?.nama_ruangan_otmil
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
																)
															)}
													{isDetail &&
														formState.akses_ruangan_otmil
															?.filter(
																(data: any) =>
																	data.is_permitted ==
																	1
															)
															.map(
																(
																	zona: any,
																	index: number
																) => (
																	<div
																		key={
																			index
																		}
																		className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-green-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
																		data-te-ripple-color="dark"
																	>
																		<p className="capitalize text-center">
																			{
																				zona.nama_ruangan_otmil
																			}
																		</p>
																	</div>
																)
															)}
												</div>
											</div>

											<div className="zona-merah w-full ">
												<h3 className="text-md font-semibold mb-2">
													Zona Merah
												</h3>
												<div className="border-red-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
													{!isDetail &&
														formState.akses_ruangan_otmil_id
															?.filter(
																(data) =>
																	data.isPermitted ==
																	0
															)
															.map(
																(
																	zonaId: any
																) => (
																	<div
																		key={
																			zonaId
																		}
																		className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-red-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
																		data-te-ripple-color="dark"
																	>
																		<p className="capitalize text-center">
																			{
																				zona.find(
																					(
																						zonaItem: any
																					) =>
																						zonaItem.ruangan_otmil_id ===
																						zonaId.id
																				)
																					?.nama_ruangan_otmil
																			}
																		</p>
																		<span
																			data-te-chip-close
																			onClick={() =>
																				handleRemoveZona(
																					zonaId.id,
																					"zona_merah"
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
																)
															)}
													{isDetail &&
														formState.akses_ruangan_otmil
															?.filter(
																(data: any) =>
																	data.is_permitted ==
																	0
															)
															.map(
																(
																	zona: any,
																	index: number
																) => (
																	<div
																		key={
																			index
																		}
																		className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-red-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
																		data-te-ripple-color="dark"
																	>
																		<p className="capitalize text-center">
																			{
																				zona.nama_ruangan_otmil
																			}
																		</p>
																	</div>
																)
															)}
												</div>
											</div>
										</div>
									</div>
								</div>

								{errors.filter((item: string) =>
									item.startsWith("INVALID_ID")
								).length > 0 && (
									<>
										<br />
										<div className="error">
											{errors
												.filter((item: string) =>
													item.startsWith(
														"INVALID_ID"
													)
												)[0]
												.replace(
													"INVALID_ID_",
													""
												)}{" "}
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
