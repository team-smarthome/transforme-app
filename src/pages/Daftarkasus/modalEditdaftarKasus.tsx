import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Alerts } from "./AlertDaftarKasus";
import {
	apiReadAllWBP,
	apiReadJaksaPenyidik,
	apiReadSaksi,
	apiReadjenisperkara,
} from "../../services/api";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { get } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";

const dataUserItem = localStorage.getItem("dataUser");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const EditDaftarKasusModal = ({
	closeModal,
	onSubmit,
	defaultValue,
	isDetail,
	isEdit,
	token,
	ketua,
}: any) => {
	let namassketua = ketua;
	console.log("sssssssss", ketua);
	const [ketuaOditur, setKetuaOditur] = useState("");
	const [formState, setFormState] = useState<any>({
		kasus_id: defaultValue?.kasus_id,
		nama_kasus: defaultValue?.nama_kasus,
		nomor_kasus: defaultValue?.nomor_kasus,
		lokasi_kasus: defaultValue?.lokasi_kasus,
		jenis_perkara_id: defaultValue?.jenis_perkara_id,
		jenis_pidana_id: defaultValue?.jenis_pidana_id,
		kategori_perkara_id: defaultValue?.kategori_perkara_id,
		waktu_kejadian: defaultValue?.waktu_kejadian,
		waktu_pelaporan_kasus: defaultValue?.waktu_pelaporan_kasus,
		tanggal_pelimpahan_kasus: defaultValue?.tanggal_pelimpahan_kasus,
		zona_waktu: defaultValue?.zona_waktu,
		wbp_profile_pivot:
			defaultValue?.wbp_profile?.map(
				(item: any) => item.wbp_profile_id
			) || [],
		keterangan_wbp:
			defaultValue?.wbp_profile?.map((item: any) => item.keterangan) ||
			[],
		role_ketua:
			defaultValue?.oditur_penyidik
				.filter((ketua: any) => ketua.role_ketua == 1)
				.map((ketua: any) => ketua.oditur_penyidik_id)[0] || null,
		oditur_penyidik_id:
			defaultValue?.oditur_penyidik?.map(
				(item: any) => item.oditur_penyidik_id
			) || [],
		nama_jenis_perkara: defaultValue?.nama_jenis_perkara,
		nama_jenis_pidana: defaultValue?.nama_jenis_pidana,
		saksi_id: defaultValue?.saksi?.map((item: any) => item.saksi_id) || [],
		keterangan_saksi:
			defaultValue?.saksi?.map((item: any) => item.keterangan) || [],
	});

	// const lokasi_lemasmil_id = localStorage.getItem('lokasi_lemasmil_id')

	const navigate = useNavigate();
	const location = useLocation();

	//state

	const [buttonLoad, setButtonLoad] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [filter, setFilter] = useState("");

	const [errors, setErrors] = useState<string[]>([]);
	const modalContainerRef = useRef<HTMLDivElement>(null);

	const [dataOditurPenyidik, setDataOditurPenyidik] = useState([]);
	const [dataJenisPerkara, setDataJenisPerkara] = useState<any[]>([]);
	const [dataJenisPerkaraSelect, setDataJenisPerkaraSelect] = useState<any>();
	console.log(defaultValue, "defaultValue");
	const [pihakTerlibat, setPihakTerlibat] = useState([]);
	const pihakTerlibatDefault = defaultValue
		? [
				...defaultValue?.saksi?.map((saksi: any) => ({
					value: saksi.saksi_id,
					label: `${saksi.nama_saksi} (Saksi)`,
				})),
				...defaultValue?.wbp_profile?.map((wbp: any) => ({
					value: wbp.wbp_profile_id,
					label: `${wbp.nama} (Tersangka)`,
				})),
		  ]
		: [];

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
				key === "wbp_profile_pivot" &&
				Array.isArray(value) &&
				value.length === 0
			) {
				errorFields.push(key);
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
	console.log(formState, "formState");
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
						description: "Pilih jenis perkara yang diinginkan",
					},
				},
				{
					element: ".i-pidana",
					popover: {
						title: "Jenis Pidana",
						description: "Isikan jenis pidana yang diinginkan",
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
					element: ".i-jumlah",
					popover: {
						title: "Jumlah Penyidikan",
						description: "Isi jumlah penyidikan",
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
					element: ".d-tersangka",
					popover: {
						title: "Tersangka",
						description: "Isi dengan lengkap keterangan",
					},
				},
				{
					element: ".d-saksi",
					popover: {
						title: "Saksi",
						description: "Isi dengan lengkap keterangan",
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
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;
		// setButtonLoad(true);

		onSubmit(formState).then(() => setButtonLoad(false));
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

	const handleWaktuKejadian = (e: any) => {
		console.log("test", e);

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
		console.log("test", e);

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

	useEffect(() => {
		Promise.all([
			tersangka(),
			Saksi(),
			jenisPerkara(),
			Oditur(),
			getTimeZone(),
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

	const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			style={{ border: "solid 1px pink" }}
		/>
	);

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

	const [ketuaOditurPenyidik, setKetuaOditurPenyidik] = useState(
		defaultValue?.oditur_penyidik?.map((item: any) => ({
			value: item.oditur_penyidik_id,
			label: item.nama_oditur,
		})) || [
			{
				value: "",
				label: "",
			},
		]
	);

	const [ketuaOditurPenyidikDefault, setKetuaOditurPenyidikDefault] =
		useState([
			{
				value: defaultValue?.oditur_penyidik?.find(
					(item: any) => item.role_ketua == "1"
				)?.oditur_penyidik_id,
				label: defaultValue?.oditur_penyidik?.find(
					(item: any) => item.role_ketua == "1"
				)?.nama_oditur,
			},
		]);
	const OditurPenyidikOpstions = dataOditurPenyidik.map((item: any) => ({
		value: item.oditur_penyidik_id,
		label: item.nama_oditur,
	}));

	const OditurPenyidikOpstionsDefault = defaultValue?.oditur_penyidik?.map(
		(item: any) => ({
			value: item.oditur_penyidik_id,
			label: item.nama_oditur,
		})
	);

	const handleSelectOditurPenyidik = (e: any) => {
		let arrayTemp: any = [];
		let arrayAnggota: any = [];
		for (let i = 0; i < e?.length; i++) {
			arrayTemp.push(e[i].value);
			arrayAnggota.push(e[i]);
		}
		setFormState({ ...formState, oditur_penyidik_id: arrayTemp });
		setKetuaOditurPenyidik(arrayAnggota);
		setKetuaOditurPenyidikDefault(arrayAnggota);
	};

	const handleSelectKetuaOditur = (e: any) => {
		setFormState({ ...formState, role_ketua: e.value });
	};

	const jenisPerkaraOpstionsDefault = {
		value: defaultValue?.jenis_perkara_id,
		label: defaultValue?.nama_jenis_perkara,
	};

	const jenisPidanaOptionsValue = {
		value: defaultValue?.jenis_pidanan_id,
		label: defaultValue?.nama_jenis_pidana,
	};

	const jenisPerkaraOpstions = dataJenisPerkara.map((item: any) => ({
		value: item.jenis_perkara_id,
		label: item.nama_jenis_perkara,
	}));

	const [selectSaksi, setSelectSaksi] = useState(
		defaultValue?.saksi
			? defaultValue?.saksi?.map((item: any) => ({
					label: item.nama_saksi,
					keterangan: item.keterangan,
			  }))
			: []
	);

	const [selectTersangka, setSelectTersangka] = useState(
		defaultValue?.wbp_profile
			? defaultValue?.wbp_profile?.map((item: any) => ({
					label: item.nama,
					keterangan: item.keterangan,
			  }))
			: []
	);

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
			wbp_profile_pivot: arrayTersangka,
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
		const kategoriPerkara = dataJenisPerkara?.find(
			(item: any) => item.jenis_perkara_id === e.value
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
								<div className="grid grid-cols-2 gap-5">
									<div className="form-group w-full ">
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
											defaultValue={
												defaultValue.nomor_kasus
											}
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

									<div className="form-group w-full ">
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
											defaultValue={
												defaultValue?.nama_kasus
											}
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
											defaultValue={
												jenisPerkaraOpstionsDefault
											}
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
											defaultValue={
												defaultValue?.lokasi_kasus
											}
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

									<div className="form-group w-full">
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
														? dayjs(
																formState.waktu_kejadian
														  ).toDate()
														: dayjs().toDate()
												}
												onChange={handleWaktuKejadian}
												showTimeInput
												customTimeInput={
													<ExampleCustomTimeInput />
												}
												className="w-full rounded border border-stroke py-3 pl-4 pr-14.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-kejadian"
												timeFormat="HH:mm"
												timeCaption="time"
												dateFormat="dd/MM/yyyy HH:mm"
												disabled={false}
												name="waktu_kejadian"
												locale={"id"}
											/>
											<input
												type="text"
												className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
												name="zona_waktu"
												value={formState.zona_waktu}
												disabled
											/>
										</div>
										<p className="error-text">
											{errors.map((item) =>
												item === "waktu_kejadian"
													? "Masukan Tanggal Kejadian Kasus"
													: ""
											)}
										</p>
									</div>

									<div className="form-group w-full">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Tanggal Pelaporan Kasus
										</label>
										<div className="flex flex-row">
											{/* <input
                      type="datetime-local"
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-pelaporan"
                      name="waktu_pelaporan_kasus"
                      placeholder="Tanggal Pelaporan Kasus"
                      onChange={handleChange}
                      defaultValue={defaultValue.waktu_pelaporan_kasus}
                      disabled={isDetail}
                    /> */}
											<DatePicker
												selected={
													formState.waktu_pelaporan_kasus
														? dayjs(
																formState.waktu_pelaporan_kasus
														  ).toDate()
														: dayjs().toDate()
												}
												onChange={handleWaktuPelaporan}
												showTimeInput
												customTimeInput={
													<ExampleCustomTimeInput />
												}
												className="w-full rounded border border-stroke py-3 pl-4 pr-14.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-pelaporan"
												timeFormat="HH:mm"
												timeCaption="time"
												dateFormat="dd/MM/yyyy HH:mm"
												disabled={false}
												name="waktu_pelaporan_kasus"
												locale={"id"}
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
														? "Masukan Tanggal Pelaporan Kasus"
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
											defaultValue={
												defaultValue.tanggal_pelimpahan_kasus
											}
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
								<div className={`mt-4 grid grid-cols-2 gap-4`}>
									<div className="form-group w-full ">
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
											value={
												defaultValue?.penyidikan[0]
													?.penyidikan_id === null
													? "0"
													: defaultValue?.penyidikan
															?.length
											}
											disabled={isDetail || isEdit}
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4 mt-4">
									<div className="form-group w-full ">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Oditur Penyidik
										</label>
										<Select
											className="capitalize p-oditur"
											isMulti
											options={OditurPenyidikOpstions}
											isDisabled={isDetail}
											defaultValue={
												OditurPenyidikOpstionsDefault
											}
											onChange={
												handleSelectOditurPenyidik
											}
											placeholder="Pilih Oditur Penyidik"
											styles={customStyles}
										/>
										<p className="error-text">
											{/* {errors.map((item) =>
                        item === 'nama' ? 'Masukan Tersangka' : ''
                      )} */}
											{errors.includes(
												"oditur_penyidik_id"
											)
												? "Pilih oditur"
												: ""}
										</p>
									</div>

									<div className="form-group w-full ">
										<label
											className="  block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Ketua Oditur Penyidik
										</label>
										<Select
											className="capitalize p-oditur"
											placeholder="Ketua Oditur"
											name="oditur_penyidik_id"
											isDisabled={isDetail}
											isClearable={true}
											isSearchable={true}
											styles={customStyles}
											onChange={handleSelectKetuaOditur}
											defaultValue={
												ketuaOditurPenyidikDefault
											}
											options={dataOditurPenyidik
												.filter(
													(item: any) =>
														formState?.oditur_penyidik_id?.includes(
															item.oditur_penyidik_id
														)
												)
												.map((item: any) => ({
													value: item.oditur_penyidik_id,
													label: item.nama_oditur,
												}))}
										/>
										{/* <input
                      className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary input-nomor"
                      name="role_ketua"
                      placeholder="Ketua Oditur"
                      onChange={handleChange}
                      defaultValue={formState.role_ketua}
                      disabled={isDetail}
                    /> */}
										{/* <Select className="capitalize p-ketua" options={ketuaOditurPenyidik} defaultValue={ketuaOditur} isDisabled={isDetail} onChange={handleSelectKetuaOditur} placeholder="Pilih Ketua Oditur" styles={customStyles} /> */}
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
								</div>
								<div className="form-group w-full mt-4">
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
										defaultValue={pihakTerlibatDefault}
										onChange={handleSelectPihakTerlibat}
										placeholder="Pihak Terlibat"
										styles={customStyles}
									/>
									<div className="h-2">
										<p className="error-text">
											{errors.includes("saksi_id") ||
											errors.includes("wbp_profile_pivot")
												? `${
														errors.includes(
															"wbp_profile_pivot"
														)
															? "Tersangka"
															: ""
												  } ${
														errors.includes(
															"saksi_id"
														) &&
														errors.includes(
															"wbp_profile_pivot"
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
								<label
									className="  block text-sm font-medium text-black dark:text-white"
									htmlFor="id"
								>
									Tersangka
								</label>

								<div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t d-tersangka">
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
															className="w-full capitalize rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
															placeholder={`${
																errors.includes(
																	"keterangan_wbp"
																)
																	? "Keterangan Belum Di Isi"
																	: "Keterangan"
															}`}
															defaultValue={
																item.keterangan
															}
															onChange={(e) =>
																handleChangeKeteranganTersangka(
																	e,
																	index
																)
															} // Menggunakan parameter tambahan index
															disabled={isDetail}
														/>
													</div>
												</div>
											);
										}
									)}
								</div>
								<label
									className="  block text-sm font-medium text-black dark:text-white"
									htmlFor="id"
								>
									Saksi
								</label>

								<div className="flex items-center mt-2 pl-4 bg-slate-700 rounded-t d-saksi">
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
															defaultValue={
																item.keterangan
															}
															className="w-full capitalize rounded border border-stroke py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
															placeholder={`${
																errors.includes(
																	"keterangan_saksi"
																)
																	? "Keterangan Belum Di Isi"
																	: "Keterangan Saksi"
															}`}
															onChange={(e) =>
																handleChangeKeterangan(
																	e,
																	index
																)
															} // Menggunakan parameter tambahan index
															disabled={isDetail}
														/>
													</div>
												</div>
											);
										}
									)}
								</div>

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
