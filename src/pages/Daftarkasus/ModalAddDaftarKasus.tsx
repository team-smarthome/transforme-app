import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Alerts } from "./AlertDaftarKasus";
import {
	apiReadAllWBP,
	apiReadJaksaPenyidik,
	apiReadSaksi,
	apiReadStatusWBP,
	apiReadjenisperkara,
	apiJenisPidanaRead,
} from "../../services/api";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

interface WBP {
	wbp_profile_id: string;
	nama: string;
	nrp: string;
}

export const AddDaftarKasusModal = ({
	closeModal,
	onSubmit,
	defaultValue,
	isDetail,
	isEdit,
	token,
	dataKasus,
}: any) => {
	const [formState, setFormState] = useState<any>({
		nama_kasus: "",
		nomor_kasus: defaultValue?.nomor_kasus,
		lokasi_kasus: "",
		jenis_perkara_id: defaultValue?.jenis_perkara_id,
		jenis_pidana_id: defaultValue?.jenis_pidana_id,
		kategori_perkara_id: "",
		waktu_kejadian: dayjs().format("YYYY-MM-DDTHH:mm"),
		waktu_pelaporan_kasus: dayjs().format("YYYY-MM-DDTHH:mm"),
		// waktu_kejadian: '',
		// waktu_pelaporan_kasus: '',
		wbp_profile_id: [],
		keterangan_wbp: [],
		role_ketua: "",
		oditur_penyidik_id: [],
		nama_jenis_perkara: defaultValue?.nama_jenis_perkara,
		nama_jenis_pidana: defaultValue?.nama_jenis_pidana,
		saksi_id: [],
		keterangan_saksi: [],
		zona_waktu: "",
		tanggal_pelimpahan_kasus: "",
	});
	// const lokasi_lemasmil_id = localStorage.getItem('lokasi_lemasmil_id')

	//state
	console.log(formState, "formState");
	const navigate = useNavigate();
	const location = useLocation();

	const [buttonLoad, setButtonLoad] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [errors, setErrors] = useState<string[]>([]);
	const modalContainerRef = useRef<HTMLDivElement>(null);

	const [DataWBP, setDataWBP] = useState<WBP[]>([]);
	const [dataStatusWBP, setDataStatusWBP] = useState([]);
	const [dataOditurPenyidik, setDataOditurPenyidik] = useState([]);
	const [dataJenisPerkara, setDataJenisPerkara] = useState<any[]>([]);
	const [dataJenisPidana, setDataJenisPidana] = useState<any[]>([]);
	const [dataJenisPerkaraSelect, setDataJenisPerkaraSelect] = useState<any>();
	const [dataSaksi, setDataSaksi] = useState([]);
	const [filter, setFilter] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [dateEdited, setDateEdited] = useState(false);
	const [ketuaOditurData, setKetuaOditurData] = useState("");

	const [pihakTerlibat, setPihakTerlibat] = useState([]);

	useEffect(() => {
		const dataKetua = dataKasus;
		let namaKetuaOditur = dataKetua.filter((data: any) => {
			return data.oditur_penyidik.some(
				(oditur: any) => oditur.role_ketua === 1
			);
		});

		// Log the names of the Ketua Oditur
		namaKetuaOditur.forEach((data: any) => {
			data.oditur_penyidik
				.filter((oditur: any) => oditur.role_ketua === 1)
				.forEach((oditur: any) => {
					console.log(oditur.nama_oditur, "ketuaODitur");
				});
		});
	}, [dataKasus]);

	const validateForm = () => {
		let errorFields = [];

		for (const [key, value] of Object.entries(formState)) {
			if (!value || (Array.isArray(value) && value.length === 0)) {
				errorFields.push(key);
			}

			// Tambahkan validasi khusus untuk oditur_penyidik_id
			if (
				key === "oditur_penyidik_id" &&
				Array.isArray(value) &&
				value.length === 0
			) {
				errorFields.push(key);
			}

			if (
				key === "wbp_profile_id" &&
				Array.isArray(value) &&
				value.length === 0
			) {
				continue;
			}

			if (
				key === "keterangan_wbp" &&
				Array.isArray(value) &&
				value.length === 0
			) {
				errorFields.push(key);
			}
			if (
				key === "saksi_id" &&
				Array.isArray(value) &&
				value.length === 0
			) {
				errorFields.push(key);
			}

			if (
				key === "keterangan_saksi" &&
				Array.isArray(value) &&
				value.length === 0
			) {
				errorFields.push(key);
			}
		}

		if (errorFields.length > 0) {
			console.log(errorFields, "errorFields");
			setErrors(errorFields);
			return false;
		}

		setErrors([]);
		return true;
	};

	//Handle Max Date

	const [maxDate, setMaxDate] = useState(formatDate(new Date()));

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

	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: ".input-nomor",
					popover: {
						title: "Nomor Kasus",
						description: "Isi nomor kasus",
					},
				},
				{
					element: ".input-nama",
					popover: {
						title: "Nama Kasus",
						description: "Isi nama kasus",
					},
				},
				{
					element: ".p-jenis",
					popover: {
						title: "Jenis Perkara",
						description: "Isikan jenis perkara yang diinginkan",
					},
				},
				{
					element: ".i-pidana",
					popover: {
						title: "Jenis Pidana",
						description: "Pilih jenis perkara yang diinginkan",
					},
				},
				{
					element: ".input-lokasi",
					popover: {
						title: "Lokasi Kasus",
						description: "Isi lokasi kasus",
					},
				},
				{
					element: ".i-kejadian",
					popover: {
						title: "Tanggal Kejadian Kasus",
						description: "Menentukan tanggal kejadian kasus",
					},
				},
				{
					element: ".i-pelaporan",
					popover: {
						title: "Tanggal Pelaporan Kasus",
						description: "Menentukan tanggal pelaporan kasus",
					},
				},
				{
					element: ".i-pelimpahan",
					popover: {
						title: "Tanggal Pelimpahan Kasus",
						description: "Menentukan tanggal pelimpahan kasus",
					},
				},
				{
					element: ".p-oditur",
					popover: {
						title: "Oditur Penyidikan",
						description: "Pilih oditur penyidikan yang diinginkan",
					},
				},
				{
					element: ".p-ketua",
					popover: {
						title: "Ketua Oditur Penyidikan",
						description:
							"Pilih ketua oditur penyidikan yang diinginkan",
					},
				},
				{
					element: ".p-pihak",
					popover: {
						title: "Pihak Terlibat",
						description: "Pilih pihak terlibat yang diinginkan",
					},
				},
				{
					element: `${isEdit ? "#b-ubah" : "#b-tambah"}`,
					popover: {
						title: `${isEdit ? "Ubah" : "Tambah"}`,
						description: `Klik untuk ${
							isEdit ? "mengubah" : "menambahkan"
						} data kasus`,
					},
				},
			],
		});

		driverObj.drive();
	};

	const handleChange = (e: any) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!validateForm()) return;
		setButtonLoad(true);

		onSubmit(formState).then(
			() => setFormSubmitted(true),
			setButtonLoad(false)
		);
	};

	const jenisPerkara = async () => {
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

	const jenisPidana = async () => {
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
			waktu_pelaporan_kasus: dayjs(e).format("YYYY-MM-DDTHH:mm"),
			zona_waktu: zonaWaktu,
		});

		setDateEdited(true);
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
			tersangka(),
			Saksi(),
			status(),
			jenisPerkara(),
			jenisPidana(),
			Oditur(),
		]).then(() => {
			setIsLoading(false);
		});
	}, []);

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

	const [ketuaOditurPenyidik, setKetuaOditurPenyidik] = useState([
		{
			value: "",
			label: "",
		},
	]);

	const OditurPenyidikOpstions = dataOditurPenyidik.map((item: any) => ({
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
		setFormState({ ...formState, role_ketua: e.value });
	};

	const jenisPerkaraOpstions = dataJenisPerkara?.map((item: any) => ({
		value: item.jenis_perkara_id,
		label: item.nama_jenis_perkara,
	}));

	const jenisPidanaOptionsValue = {
		value: defaultValue?.jenis_perkara_id,
		label: defaultValue?.nama_jenis_perkara,
	};

	const [selectSaksi, setSelectSaksi] = useState([]);
	const [selectTersangka, setSelectTersangka] = useState([]);

	const handleSelectPihakTerlibat = (e: any) => {
		let arrayTersangka: any = [];
		let arraSaksi: any = [];
		let arraySaksiOptions: any = [];
		let arrayTersangkaOptions: any = [];
		for (let i = 0; i < e?.length; i++) {
			if (e[i].label.includes("(Tersangka)")) {
				arrayTersangka.push(e[i].value);
				arrayTersangkaOptions.push(e[i]);
			} else if (e[i].label.includes("(Saksi)")) {
				arraSaksi.push(e[i].value);
				arraySaksiOptions.push(e[i]);
			}
		}
		setFormState({
			...formState,
			wbp_profile_id: arrayTersangka,
			saksi_id: arraSaksi,
		});
		setSelectSaksi(arraySaksiOptions);
		setSelectTersangka(arrayTersangkaOptions);
	};

	const handleChangeKeteranganTersangka = (e: any, index: any) => {
		const newKeteranganSaksi = [...formState.keterangan_wbp]; // Salin array keterangan yang ada
		newKeteranganSaksi[index] = e.target.value; // Perbarui nilai keterangan sesuai dengan indeks elemen
		setFormState({
			...formState,
			keterangan_wbp: newKeteranganSaksi, // Set array keterangan yang diperbarui
		});
	};

	const handleChangeKeterangan = (e: any, index: any) => {
		const newKeteranganSaksi = [...formState.keterangan_saksi]; // Salin array keterangan yang ada
		newKeteranganSaksi[index] = e.target.value; // Perbarui nilai keterangan sesuai dengan indeks elemen
		setFormState({
			...formState,
			keterangan_saksi: newKeteranganSaksi, // Set array keterangan yang diperbarui
		});
	};

	const handleSelectPerkara = (e: any) => {
		const kategoriPerkara: any = dataJenisPerkara.find(
			(item: any) => item.jenis_perkara_id === e?.value
		);
		// const kategoriPerkaraId =
		//   kategoriPerkara?.length > 0
		//     ? kategoriPerkara[0]?.kategori_perkara_id
		//     : '';
		setDataJenisPerkaraSelect(kategoriPerkara);
		setFormState({
			...formState,
			jenis_perkara_id: e.value,
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

	const handleSelectPidana = (e: any) => {
		// const kategoriPidana = dataJenisPidana?.filter(
		//   (item: any) => item.jenis_pidana_id === e.value,
		// );
		// const kategoriPidanaId =
		//   kategoriPidana?.length > 0
		//     ? kategoriPidana[0]?.jenis_pidana_id
		//     : '';
		setFormState({
			...formState,
			// jenis_perkara_id: e.value,
			jenis_pidana_id: e.value,
			// jenis_pidana_id: kategoriPidanaId,
		});
	};

	// const handleChange = (e: any) => {
	//   setFormState({ ...formState, [e.target.name]: e.target.value });
	// };

	console.log(formState);

	return (
		// <div
		//   ref={modalContainerRef}
		//   className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-y-scroll "
		// >
		<div>
			<div style={modalStyles.backdrop}></div>
			<div
				ref={modalContainerRef}
				style={modalStyles.modalContainer}
				className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
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
											? "Detail Data Daftar Kasus"
											: isEdit
											? "Edit Data Daftar Kasus"
											: "Tambah Data Daftar Kasus"}
									</h3>
								</div>

								{/* <div className="w-10"> */}
								{isDetail ? null : (
									<button className="pr-75">
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
								<div className="grid grid-cols-2 gap-4">
									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Nomor Kasus
										</label>
										<input
											className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nomor"
											name="nomor_kasus"
											placeholder="Nomor Kasus"
											onChange={handleChange}
											defaultValue={formState.nomor_kasus}
											disabled={isDetail}
										/>
										<div className="h-2">
											<p className="error-text">
												{errors.map((item) =>
													item === "nomor_kasus"
														? "Masukan Nomor Kasus"
														: ""
												)}
											</p>
										</div>
									</div>
									<div className="form-group w-full">
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
											disabled={isDetail}
										/>
										<div className="h-2">
											<p className="error-text">
												{errors.map((item) =>
													item === "nama_kasus"
														? "Masukan Nama Kasus"
														: ""
												)}
											</p>
										</div>
									</div>
									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Jenis Perkara
										</label>
										<Select
											className="capitalize p-jenis"
											options={jenisPerkaraOpstions}
											isDisabled={isDetail}
											// defaultValue={jenisPidanaOptionsValue}
											onChange={handleSelectPerkara}
											placeholder="Pilih Jenis Perkara"
											styles={customStyles}
										/>
										<div className="h-2">
											<p className="error-text">
												{errors.map((item) =>
													item === "jenis_perkara_id"
														? "Masukan Jenis Perkara"
														: ""
												)}
											</p>
										</div>
									</div>
									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Nama Jenis Pidana
										</label>
										<input
											className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-pidana"
											name="nama_jenis_pidana"
											placeholder="Nama Jenis Pidana"
											onChange={handleChange}
											// disabled={formState.nama_jenis_pidana}
											value={formState.nama_jenis_pidana}
											disabled
										/>
										<div className="h-2">
											<p className="error-text"></p>
										</div>
									</div>
									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Lokasi Kasus
										</label>
										<input
											className="w-full capitalize rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-lokasi"
											name="lokasi_kasus"
											placeholder="Lokasi Kasus"
											onChange={handleChange}
											disabled={isDetail}
										/>
										<div className="h-2">
											<p className="error-text">
												{errors.map((item) =>
													item === "lokasi_kasus"
														? "Masukan Lokasi Kasus"
														: ""
												)}
											</p>
										</div>
									</div>
									{/* Tanggal Kejadian */}
									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Tanggal Kejadian Kasus
										</label>
										<div className="flex flex-row">
											<DatePicker
												selected={
													formState.waktu_kejadian
														? dayjs(
																formState.waktu_kejadian
														  ).toDate()
														: dayjs().toDate()
												}
												showTimeInput
												timeFormat="HH:mm"
												onChange={handleWaktuKejadian}
												timeCaption="Time"
												dateFormat="dd/MM/yyyy HH:mm"
												customTimeInput={
													<ExampleCustomTimeInput />
												}
												className="w-full rounded border border-stroke py-3 pl-3 pr-15.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-kejadian"
												name="waktu_kejadian"
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
										<div className="h-2">
											<p className="error-text">
												{errors.map((item) =>
													item === "waktu_kejadian"
														? "Masukan tanggal kejadian"
														: ""
												)}
											</p>
										</div>
									</div>
									{/* tanggal pelaporan */}
									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Tanggal Pelaporan Kasus
										</label>
										<div className="flex flex-row">
											<DatePicker
												selected={
													dateEdited &&
													formState.waktu_pelaporan_kasus
														? dayjs(
																formState.waktu_pelaporan_kasus
														  ).toDate()
														: dayjs().toDate()
												}
												showTimeInput
												timeFormat="HH:mm"
												// timeIntervals={15}
												onChange={handleWaktuPelaporan}
												timeCaption="Time"
												dateFormat="dd/MM/yyyy HH:mm"
												customTimeInput={
													<ExampleCustomTimeInput />
												}
												className="w-full rounded border border-stroke py-3 pl-3 pr-15.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-pelaporan"
												name="waktu_pelaporan_kasus"
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
										<div className="h-2">
											<p className="error-text">
												{errors.map((item) =>
													item ===
													"waktu_pelaporan_kasus"
														? "Masukan tanggal pelaporan kasus"
														: ""
												)}
											</p>
										</div>
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
											disabled={isDetail}
											max={maxDate}
										/>
										<p className="error-text">
											{errors.map((item) =>
												item ===
												"tanggal_pelimpahan_kasus"
													? "Masukan Tanggal Pelimpahan Kasus"
													: ""
											)}
										</p>
									</div>
								</div>
								<div
									className={`${
										isDetail ? "block mt-4" : "hidden"
									}`}
								>
									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Jumlah Penyidikan
										</label>
										<input
											className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-jumlah"
											name="waktu_pelaporan_kasus"
											placeholder="Jumlah Penyidikan"
											onChange={handleChange}
											disabled={isDetail}
										/>
										<p className="error-text">
											{errors.map((item) =>
												item === "waktu_pelaporan_kasus"
													? "Masukan Jumlah Penyidikan"
													: ""
											)}
										</p>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4 mt-4">
									{/* <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Oditur Penyidik
                    </label>
                    <Select
                      className="capitalize text-white p-oditur"
                      isMulti
                      options={OditurPenyidikOpstions}
                      isDisabled={isDetail}
                      onChange={handleSelectOditurPenyidik}
                      placeholder="Pilih Oditur Penyidik"
                      styles={customStyles}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'nama' ? 'Masukan Tersangka' : '',
                        )}
                      </p>
                    </div>
                  </div> */}

									{/* <div className="form-group w-full">
                    <label
                      className="  block text-sm font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Ketua Oditur Penyidik
                    </label>
                    <Select
                      className="capitalize p-ketua"
                      options={ketuaOditurPenyidik}
                      isDisabled={isDetail}
                      onChange={handleSelectKetuaOditur}
                      placeholder="Pilih Ketua Oditur"
                      styles={customStyles}
                    />
                    <div className="h-2">
                      <p className="error-text">
                        {errors.map((item) =>
                          item === 'role_ketua'
                            ? 'Pilih Ketua Oditur Penyidik'
                            : '',
                        )}
                      </p>
                    </div>
                  </div> */}
								</div>
								<div className="form-group w-full">
									<label
										className="  block text-sm font-medium text-black dark:text-white"
										htmlFor="id"
									>
										Oditur Penyidik
									</label>
									<Select
										className="capitalize text-white p-oditur"
										isMulti
										options={OditurPenyidikOpstions}
										isDisabled={isDetail}
										isClearable={true}
										isSearchable={true}
										onChange={handleSelectOditurPenyidik}
										placeholder="Pilih Oditur Penyidik"
										styles={customStyles}
									/>
									<div className="h-2">
										<p className="error-text">
											{/* {errors.map((item) =>
                        item === 'oditur_penyidik_id' ? 'Masukan Tersangka' : '',
                      )} */}
											{errors.includes(
												"oditur_penyidik_id"
											)
												? "Masukan oditur"
												: ""}
										</p>
									</div>
								</div>
								<div className="form-group w-full mt-3">
									<label
										className="  block text-sm font-medium text-black dark:text-white"
										htmlFor="id"
									>
										Ketua Oditur Penyidik
									</label>
									<Select
										className="capitalize p-ketua"
										options={ketuaOditurPenyidik}
										isDisabled={isDetail}
										onChange={handleSelectKetuaOditur}
										placeholder="Pilih Ketua Oditur"
										styles={customStyles}
									/>
									<div className="h-2">
										<p className="error-text">
											{errors.map((item) =>
												item === "role_ketua"
													? "Pilih Ketua Oditur Penyidik"
													: ""
											)}
										</p>
									</div>
								</div>
								<div className="form-group w-full mt-3">
									<label
										className="  block text-sm font-medium text-black dark:text-white"
										htmlFor="id"
									>
										Pihak Terlibat
									</label>
									<Select
										className="capitalize p-pihak"
										isMulti
										options={pihakTerlibat}
										isDisabled={isDetail}
										onChange={handleSelectPihakTerlibat}
										placeholder="Pihak Terlibat"
										styles={customStyles}
									/>
									<div className="h-2">
										<p className="error-text">
											{errors.includes("saksi_id") ||
											errors.includes("wbp_profile_id")
												? `${
														errors.includes(
															"wbp_profile_id"
														)
															? "Tersangka"
															: ""
												  } ${
														errors.includes(
															"saksi_id"
														) &&
														errors.includes(
															"wbp_profile_id"
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
								{selectTersangka.length === 0 ? null : (
									<>
										<label
											className=" mt-4 block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Tersangka
										</label>

										<div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t">
											<div className="form-group w-2/6">
												<label
													className="  block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													Nama Tersangka
												</label>
											</div>

											<div className="form-group w-4/6 ">
												<label
													className="  block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													Keterangan
												</label>
											</div>
										</div>
										<div className="h-32 overflow-y-auto bg-slate-800 rounded-b">
											{selectTersangka.map(
												(item: any, index: number) => {
													return (
														<div
															className="flex items-center mt-2 bg-slate-800 py-2 pl-4"
															key={index}
														>
															<div className="form-group w-2/6">
																<label
																	className="capitalize block text-sm font-medium text-black dark:text-white"
																	htmlFor={`keterangan_wbp-${index}`}
																>
																	{item.label}
																</label>
															</div>

															<div className="form-group w-4/6 flex items-center mr-2">
																<input
																	id={`keterangan_wbp-${index}`}
																	className="w-full rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
																	placeholder={`${
																		errors.includes(
																			"keterangan_wbp"
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
																	} // Menggunakan parameter tambahan index
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
									</>
								)}
								{selectSaksi.length === 0 ? null : (
									<>
										<label
											className=" mt-4 block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Saksi
										</label>

										<div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t d-nama">
											<div className="form-group w-2/6">
												<label
													className="  block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													Nama Saksi
												</label>
											</div>

											<div className="form-group w-4/6 ">
												<label
													className="  block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													Keterangan Saksi
												</label>
											</div>
										</div>
										<div className="h-32 overflow-y-auto bg-slate-800 rounded-b">
											{selectSaksi.map(
												(item: any, index: number) => {
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
																		errors.includes(
																			"keterangan_saksi"
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
																	} // Menggunakan parameter tambahan index
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
									</>
								)}
								<div
									className={`${
										isDetail ? "h-auto" : "h-15"
									} mt-3`}
								>
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
										<div className="error text-center">
											<p className="text-red-400">
												Ada data yang masih belum terisi
												!
											</p>
										</div>
									)}
									<br></br>
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
											Ubah Data Kasus
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
											Tambah Data Kasus
										</button>
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
