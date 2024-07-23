import { useEffect, useRef, useState } from "react";
import {
	apiReadAllPenugasanShift,
	apiReadAllPetugasShift,
	apiReadAllScheduleShift,
	apiReadAllShift,
	apiReadAllStaff,
} from "../../../services/api";
import { Alerts } from "../GrupShift/Alert";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { BiLoaderAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";

interface Shift {
	shift_id: any;
	nama_shift: any;
	waktu_mulai: any;
	waktu_selesai: any;
}

interface Staff {
	petugas_id: number;
	nama: string;
	// tambahkan atribut lain sesuai kebutuhan
}
const AddPetugasShiftGrup = ({
	closeModal,
	onSubmit,
	defaultValue,
	isDetail,
}: any) => {
	const navigate = useNavigate();
	const location = useLocation();

	//get Token
	const tokenItem = localStorage.getItem("token");
	let tokens = tokenItem ? JSON.parse(tokenItem) : null;
	let token = tokens.token;

	const modalContainerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [buttonLoad, setButtonLoad] = useState(false);
	const [filter, setFilter] = useState("");
	const [isOperator, setIsOperator] = useState<boolean>();

	const dataUserItem = localStorage.getItem("dataUser");
	const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

	useEffect(() => {
		if (dataAdmin?.role_name === "operator") {
			setIsOperator(true);
		} else {
			setIsOperator(false);
		}

		console.log(isOperator, "Operator");
	}, [isOperator]);

	const [dataPetugasShift, setDataPetugasShift] = useState(
		defaultValue || {
			grup_petugas_id: "",
			nama_grup_petugas: "",
			nama_ketua_grup: "",
			tanggal: "",
			bulan: "",
			tahun: "",
		}
	);

	const [staff, setStaff] = useState<Staff[]>([]);
	console.log(defaultValue, "petugas");
	// //DatePicker
	const tanggal = dayjs(
		`${defaultValue.tahun}-${defaultValue.bulan}-${defaultValue.tanggal}`,
		{
			locale: "id",
		}
	).format("YYYY MM DD");
	const [selectedDate, setSelectedDate] = useState(dayjs(tanggal));
	const [selectedEndDate, setSelectedEndDate] = useState(dayjs(tanggal));
	console.log(
		"time",
		selectedDate,
		"end",
		selectedEndDate,
		"defaul",
		tanggal
	);

	//useEffect untuk menambahkan event listener  ke elemen dokumen
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (
				modalContainerRef.current &&
				!modalContainerRef.current.contains(e.target as Node)
			) {
				closeModal();
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [closeModal]);

	const [schedule, setSchedule] = useState<any[]>([]);
	const [shift, setShift] = useState<Shift[]>([]);
	const [waktu, setWaktu] = useState({
		waktu_mulai: shift[0]?.waktu_mulai,
		waktu_selesai: shift[0]?.waktu_selesai,
	});
	const [penugasan, setPenugasan] = useState([
		{
			penugasan_id: "",
			nama_penugasan: "",
		},
	]);

	const [petugasShiftAdd, setPetugasShiftAdd] = useState([
		{
			shift_id: "",
			petugas_id: "",
			schedule_id: "",
			status_kehadiran: "0",
			jam_kehadiran: "",
			status_izin: "",
			penugasan_id: "",
			ruangan_otmil_id: "",
			ruangan_lemasmil_id: "",
			status_pengganti: "",
			created_at: "",
			updated_at: "",
		},
	]);

	const [startDate, setStartDate] = useState({
		tanggal: parseInt(dayjs(selectedDate).format("D")),
		bulan: parseInt(dayjs(selectedDate).format("M")),
		tahun: parseInt(dayjs(selectedDate).format("YYYY")),
	});

	const [endDate, setEndDate] = useState({
		tanggal: parseInt(dayjs(selectedEndDate).format("D")),
		bulan: parseInt(dayjs(selectedEndDate).format("M")),
		tahun: parseInt(dayjs(selectedEndDate).format("YYYY")),
	});

	const [shiftSelect, setShiftSelect] = useState<any>({
		shift_id: "",
		nama_shift: "",
	});

	useEffect(() => {
		const addEntriesForStaff = () => {
			const newEntries = staff.map((staffItem: any) => {
				return {
					shift_id: "", // Isi dengan shift_id yang sesuai
					petugas_id: staffItem.petugas_id,
					schedule_id: "",
					status_kehadiran: "0",
					jam_kehadiran: "",
					status_izin: "",
					penugasan_id: "",
					ruangan_otmil_id: "",
					ruangan_lemasmil_id: "",
					status_pengganti: "",
					created_at: "",
					updated_at: "",
				};
			});

			// Mengatur ulang nilai petugasShiftAdd
			setPetugasShiftAdd([...newEntries]);

			// Mengembalikan nilai yang diatur ulang
			return [...petugasShiftAdd, ...newEntries];
		};
		addEntriesForStaff();
	}, [staff]);

	// useEffect(() => {
	//   setIsLoading(true);
	//   const fetchSchedule = async () => {
	//     const data = {};
	//     const params = {
	//       pageSize: Number.MAX_SAFE_INTEGER,
	//       filter: {
	//         grup_petugas_id: dataPetugasShift.grup_petugas_id,
	//       },
	//     };
	//     try {
	//       const shift = await apiReadAllShift(data, token);
	//       const staff = await apiReadAllStaff(params, token);
	//       const penugasan = await apiReadAllPenugasanShift(data, token);
	//       setShift(shift.data.records);
	//       setStaff(staff.data.records);
	//       setPenugasan(penugasan.data.records);
	//       setIsLoading(false);
	//     } catch (e: any) {
	//       if (e.response.status === 403) {
	//         navigate('/auth/signin', {
	//           state: { forceLogout: true, lastPage: location.pathname },
	//         });
	//       }
	//       Alerts.fire({
	//         icon: e.response.status === 403 ? 'warning' : 'error',
	//         title: e.response.status === 403 ? Error403Message : e.message,
	//       });
	//     }
	//   };
	//   fetchSchedule();
	// }, []);

	useEffect(() => {
		fetchSchedule();
	}, []);
	const fetchSchedule = async () => {
		setIsLoading(true);
		const data = {};
		const params = {
			pageSize: Number.MAX_SAFE_INTEGER,
			filter: {
				grup_petugas_id: dataPetugasShift.grup_petugas_id,
			},
		};
		try {
			const shift = await apiReadAllShift(data, token);
			const staff = await apiReadAllStaff(params.filter, token);
			const penugasan = await apiReadAllPenugasanShift(data, token);
			setShift(shift.data.records);
			setStaff(staff.data.records);
			setPenugasan(penugasan.data.records);
			setIsLoading(false);
		} catch (e: any) {
			console.log(e, "eeee");
			// if (e.response.status === 403) {
			//   navigate('/auth/signin', {
			//     state: { forceLogout: true, lastPage: location.pathname },
			//   });
			// }
			// Alerts.fire({
			//   icon: e.response.status === 403 ? 'warning' : 'error',
			//   title: e.response.status === 403 ? Error403Message : e.message,
			// });
		}
	};
	const shiftOptions = shift.filter((item: any) =>
		schedule.some((jadwal: any) => jadwal.shift_id === item.shift_id)
	);

	// const [dataAddScedule,setDataAddScedule]=useState<any[]>([])
	const [petugasShift, setPetugasShift] = useState<any[]>([]);
	const [sceduleAvail, setSceduleAvail] = useState<any[]>([]);

	useEffect(() => {
		const filterSchedule = {
			pageSize: Number.MAX_SAFE_INTEGER,
			filter: {
				tanggal: `${startDate.tanggal}-${endDate.tanggal}`,
				bulan: startDate.bulan,
				tahun: startDate.tahun,
			},
		};
		const fetchSchedule = async () => {
			try {
				const petugasShift = await apiReadAllPetugasShift(
					filterSchedule,
					token
				);
				const schedule = await apiReadAllScheduleShift(
					filterSchedule.filter,
					token
				);
				const filterPetugas = petugasShift.data.records?.filter(
					(item: any) =>
						item.grup_petugas_id === defaultValue?.grup_petugas_id
				);
				setPetugasShift(filterPetugas);
				setSchedule(schedule.data.records);
				setShiftSelect({
					...shiftSelect,
					shift_id: "",
					nama_shift: "",
				});
			} catch (e: any) {
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
			}
		};
		fetchSchedule();
	}, [selectedEndDate]);

	const handleChangeShift = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedShiftId = e.target.value;
		const jamKerja = shift.find(
			(item: any) => item.shift_id === selectedShiftId
		);
		const selectedSchedule = schedule?.filter(
			(item: any) => item.shift_id === selectedShiftId
		);
		// console.log(selectedShiftId, 'test a');
		// console.log(schedule, 'test b');
		// console.log(selectedSchedule, 'test c');
		console.log(jamKerja, "jam kerja");
		const sceduleAvail = selectedSchedule?.filter(
			(item: any) =>
				!petugasShift.some(
					(items: any) => item.schedule_id === items.schedule_id
				)
		);
		setSceduleAvail(sceduleAvail);

		setWaktu({
			...waktu,
			waktu_mulai: jamKerja?.waktu_mulai,
			waktu_selesai: jamKerja?.waktu_selesai,
		});
		setShiftSelect({
			...shiftSelect,
			shift_id: e.target.value,
			nama_shift: selectedSchedule[0]?.nama_shift,
		});
	};
	console.log(sceduleAvail, "sceduleAvail");
	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: ".d-one",
					popover: {
						title: "Tanggal Awal",
						description: "Menentukan tanggal awal",
					},
				},
				{
					element: ".d-second",
					popover: {
						title: "Tanggal Akhir",
						description: "Menentukan tanggal akhir",
					},
				},
				{
					element: ".p-jadwal",
					popover: {
						title: "Jadwal Shift",
						description: "Pilih jadwal shift yang diinginkan",
					},
				},
				{
					element: ".i-masuk",
					popover: {
						title: "Waktu Masuk",
						description: "Menentukan waktu masuk",
					},
				},
				{
					element: ".i-pulang",
					popover: {
						title: "Waktu Pulang",
						description: "Menentukan waktu pulang",
					},
				},
				{
					element: ".i-grup",
					popover: {
						title: "Nama Grup",
						description: "Isi nama grup",
					},
				},
				{
					element: ".i-ketua",
					popover: {
						title: "Ketua Grup",
						description: "Isi ketua grup",
					},
				},
				{
					element: ".d-grup",
					popover: {
						title: "Nama Grup",
						description: "Isi nama grup",
					},
				},
				{
					element: "#b-submit",
					popover: {
						title: "Submit",
						description: "Klik submit",
					},
				},
			],
		});

		driverObj.drive();
	};

	const handleChangePenugasan = (e: any, petugas: any) => {
		const petugasId = petugasShiftAdd.findIndex(
			(item) => item.petugas_id === petugas
		);
		const updatedPetugasShiftAdd = [...petugasShiftAdd];
		updatedPetugasShiftAdd[petugasId].penugasan_id = e;
		setPetugasShiftAdd(updatedPetugasShiftAdd);
	};

	const [errors, setErrors] = useState<string[]>([]);
	const validateForm = () => {
		let errorFields = [];

		// Reset pesan kesalahan sebelum memeriksa kondisi
		setErrors([]);

		if (!shiftSelect.shift_id) {
			errorFields.push("shift_id");
		}

		setErrors(errorFields);

		if (errorFields.length > 0) {
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = () => {
		const addData = sceduleAvail?.flatMap(
			(item: any) =>
				petugasShiftAdd
					?.map((items: any) => ({
						shift_id: item.shift_id,
						petugas_id: items.petugas_id,
						schedule_id: item.schedule_id,
						status_kehadiran: "1",
						jam_kehadiran: items.jam_kehadiran,
						status_izin: "",
						penugasan_id: items.penugasan_id,
						ruangan_otmil_id: "",
						ruangan_lemasmil_id: "",
						status_pengganti: "0",
						created_at: "",
						updated_at: "",
					}))
					.filter((data) => !petugasShift.includes(data.shift_id))
		);
		if (!validateForm()) return;
		setButtonLoad(true);
		onSubmit(addData).then(() => setButtonLoad(false));
	};

	const handleDateChange = (date: any) => {
		const end = dayjs(date).add(4, "day");
		setSelectedDate(dayjs(date));
		setStartDate({
			...startDate,
			tanggal: parseInt(dayjs(date).format("D")),
			bulan: parseInt(dayjs(date).format("M")),
			tahun: parseInt(dayjs(date).format("YYYY")),
		});
		setSelectedEndDate(dayjs(date));
		setEndDate({
			...endDate,
			tanggal: parseInt(dayjs(end).format("D")),
			bulan: parseInt(dayjs(end).format("M")),
			tahun: parseInt(dayjs(end).format("YYYY")),
		});
	};

	const handleDateChangeEndDate = (date: any) => {
		setSelectedEndDate(dayjs(date));
		setEndDate({
			...endDate,
			tanggal: parseInt(dayjs(date).format("D")),
			bulan: parseInt(dayjs(date).format("M")),
			tahun: parseInt(dayjs(date).format("YYYY")),
		});
	};

	return (
		<div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
			<div
				className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[90vh] h-[90vh] overflow-y-auto`}
				ref={modalContainerRef}
			>
				{isLoading ? (
					<div
						className={`flex justify-center  items-center h-full w-full`}
					>
						<svg
							className="animate-spin h-20 w-20 text-white"
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
				) : (
					<>
						<div className="w-full flex justify-between px-4 mt-2">
							<h1 className="text-xl font-semibold text-black dark:text-white">
								Tambah Jadwal Shift Kerja
							</h1>

							{/* <div className="w-10"> */}
							<button className="pr-70">
								<HiQuestionMarkCircle
									values={filter}
									aria-placeholder="Show tutorial"
									// onChange={}
									onClick={handleClickTutorial}
								/>
							</button>
							{/* </div> */}

							<strong
								className="text-xl align-center cursor-pointer "
								onClick={closeModal}
							>
								&times;
							</strong>
						</div>
						<div>
							<div className="m-4">
								<div className="">
									<div className="w-full">
										<label
											className="block text-md font-medium text-black dark:text-white "
											htmlFor="nama_grup_petugas"
										>
											Tanggal
										</label>
										<div className="w-full flex items-center space-x-1">
											<div className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary">
												<DatePicker
													className="dark:text-gray dark:bg-slate-800 d-one"
													selected={selectedDate.toDate()}
													onChange={handleDateChange}
													dateFormat="dd MMMM yyyy"
													placeholderText="Pilih tanggal"
													locale="id"
													minDate={dayjs(selectedDate)
														.startOf("month")
														.toDate()}
													maxDate={dayjs(selectedDate)
														.endOf("month")
														.toDate()}
												/>
											</div>
											<h1>s/d</h1>
											<div className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2 pl-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary">
												<DatePicker
													className="dark:text-gray dark:bg-slate-800 d-second"
													selected={selectedEndDate.toDate()}
													onChange={
														handleDateChangeEndDate
													}
													dateFormat="dd MMMM yyyy"
													placeholderText="Pilih tanggal"
													locale="id"
													minDate={dayjs(selectedDate)
														.endOf("day")
														.toDate()} // Set minDate to the selected start date
													maxDate={dayjs(selectedDate)
														.endOf("month")
														.toDate()}
												/>
											</div>
										</div>
									</div>
									<div className="form-group w-full mt-3">
										<label
											className="block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Jadwal Shift
										</label>
										<select
											name="shift_id"
											value={shiftSelect.shift_id}
											onChange={handleChangeShift}
											className="capitalize w-full rounded dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:text-white dark:focus-border-primary p-jadwal"
										>
											<option value="">
												Pilih Shift
											</option>
											{shiftOptions?.map(
												(schedule: any) => {
													return (
														<>
															<option
																value={
																	schedule?.shift_id
																}
															>
																{
																	schedule?.nama_shift
																}
															</option>
														</>
													);
												}
											)}
										</select>
										<div className="h-5">
											<p className="error-text">
												{errors.map((item) =>
													item === "shift_id"
														? "Pilih Shift kerja !!"
														: ""
												)}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<div className="form-group w-1/2 ">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Waktu Masuk
											</label>
											<input
												disabled
												value={waktu.waktu_mulai}
												name="nama_grup_petugas"
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-masuk"
											/>
										</div>
										<div className="form-group w-1/2 ">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Waktu Pulang
											</label>
											<input
												disabled
												value={waktu.waktu_selesai}
												name="nama_grup_petugas"
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-pulang"
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4 mt-3">
										<div className="form-group w-full">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Nama Grup
											</label>
											<input
												value={
													dataPetugasShift.nama_grup_petugas
												}
												name="grup_petuas_id"
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-grup"
											/>
										</div>
										<div className="form-group w-full">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Ketua Grup
											</label>
											<input
												value={
													dataPetugasShift.nama_ketua_grup
												}
												name="nama_ketua_grup"
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-ketua"
											/>
										</div>
									</div>
									<label
										className="block text-sm font-semibold text-black dark:text-white mt-2 "
										htmlFor="id"
									>
										Anggota Grup
									</label>
									<div className=" w-full flex justify-between space-x-2">
										<div className="form-group w-1/2 ">
											<label
												className="block text-sm font-medium text-black dark:text-white ml-2"
												htmlFor="id"
											>
												Nama
											</label>
										</div>
										<div className="form-group w-1/2 ">
											<label
												className="pl-3 block text-sm font-medium text-black dark:text-white "
												htmlFor="id"
											>
												Penugasan
											</label>
										</div>
									</div>
									<div className="w-full h-36 overflow-y-auto mb-3 d-grup">
										{staff.map((item: any) => {
											return (
												<div className="flex justify-between space-x-2 mx-1 rounded border border-stroke my-1 dark:text-gray dark:bg-slate-800 ">
													<div className="form-group w-3/6 ">
														<input
															name="nama"
															disabled
															className="capitalize w-full dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
															value={item.nama}
														/>
													</div>
													<div className="form-group w-3/6 ">
														<select
															onChange={(e) =>
																handleChangePenugasan(
																	e.target
																		.value,
																	item.petugas_id
																)
															}
															className="capitalize w-full rounded  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:focus-border-primary"
														>
															<option value="">
																Pilih Penugasan
															</option>
															{penugasan.map(
																(
																	penugasan: any
																) => {
																	return (
																		<option
																			value={
																				penugasan.penugasan_id
																			}
																		>
																			{
																				penugasan.nama_penugasan
																			}
																		</option>
																	);
																}
															)}
														</select>
													</div>
												</div>
											);
										})}
									</div>
								</div>
								{isDetail
									? null
									: !isOperator && (
											<button
												onClick={handleSubmit}
												className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
													buttonLoad
														? "bg-slate-400"
														: ""
												}`}
												type="submit"
												disabled={buttonLoad}
												id="b-submit"
											>
												{buttonLoad ? (
													<>
														<BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
													</>
												) : (
													<></>
												)}
												Submit
											</button>
									  )}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default AddPetugasShiftGrup;
