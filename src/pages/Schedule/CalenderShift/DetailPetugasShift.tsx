import { useEffect, useRef, useState } from "react";
import {
	apiReadAllPenugasanShift,
	apiReadAllPetugasShift,
	apiReadAllScheduleShift,
	apiReadAllShift,
	apiReadAllStaff,
} from "../../../services/api";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Alerts } from "../GrupShift/Alert";
import { BiLoaderAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface Schedule {
	schedule_id: any;
	shif_id: any;
}
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
const EditPetugasShift = ({ closeModal, onSubmit, defaultValue }: any) => {
	const navigate = useNavigate();
	const location = useLocation();

	//get Token
	const tokenItem = localStorage.getItem("token");
	let tokens = tokenItem ? JSON.parse(tokenItem) : null;
	let token = tokens.token;

	const modalContainerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [buttonLoad, setButtonLoad] = useState(false);
	const [dataPetugasShift, setDataPetugasShift] = useState([
		{
			petugas_shift_id: "",
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
			lembur: "",
			keterangan_lembur: "",
			created_at: "",
			updated_at: "",
		},
	]);
	const [staff, setStaff] = useState<Staff[]>([]);
	const [filter, setFilter] = useState("");
	console.log(dataPetugasShift, "data detail");
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

	const [schedule, setSchedule] = useState<Schedule[]>([]);
	const [shift, setShift] = useState<Shift[]>([]);
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
	const [addShift, setAddShift] = useState({
		shift_id: "",
		schedule_id: "",
	});
	const [petugasShiftAdd, setPetugasShiftAdd] = useState([
		{
			petugas_shift_id: "",
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
			lembur: "",
			keterangan_lembur: "",
			created_at: "",
			updated_at: "",
		},
	]);

	useEffect(() => {
		const addEntriesForStaff = () => {
			const newEntries = staff.map((staffItem: any) => {
				const penugasanId = dataPetugasShift?.find(
					(itemNa: any) => itemNa.petugas_id === staffItem.petugas_id
				);
				return {
					petugas_shift_id: penugasanId?.petugas_shift_id || "",
					shift_id: addShift.shift_id,
					petugas_id: staffItem.petugas_id,
					schedule_id: addShift.schedule_id,
					status_kehadiran: penugasanId?.status_kehadiran || "",
					jam_kehadiran: penugasanId?.jam_kehadiran || "",
					status_izin: penugasanId?.status_izin || "",
					penugasan_id: penugasanId?.penugasan_id || "",
					ruangan_otmil_id: penugasanId?.ruangan_otmil_id || "",
					ruangan_lemasmil_id: penugasanId?.ruangan_lemasmil_id || "",
					status_pengganti: penugasanId?.status_pengganti || "",
					created_at: penugasanId?.created_at || "",
					updated_at: dayjs(new Date()).format("DD/MM/YYYY"),
				};
			});

			// Mengatur ulang nilai petugasShiftAdd
			setPetugasShiftAdd([...newEntries]);

			// Mengembalikan nilai yang diatur ulang
			return [...petugasShiftAdd, ...newEntries];
		};
		addEntriesForStaff();
	}, [staff, addShift]);

	useEffect(() => {
		setIsLoading(true);
		const fetchSchedule = async () => {
			const data = {};
			// const params = {
			//    pageSize: Number.MAX_SAFE_INTEGER,
			//   filter: {
			//     grup_petugas_id: defaultValue.grup_petugas_id,
			//   },
			// };

			let params = {
				filter: {
					grup_petugas_id: defaultValue.grup_petugas_id,
				},
				page: 1,
				pageSize: 100,
			};
			const filter = {
				filter: {
					// schedule_id: defaultValue.schedule_id,
					tanggal: defaultValue.tanggal,
					bulan: defaultValue.bulan,
					tahun: defaultValue.tahun,
				},
			};
			const filterPetugasShift = {
				// pageSize: Number.MAX_SAFE_INTEGER,
				filter: {
					schedule_id: defaultValue.schedule_id,
					grup_petugas_id: defaultValue.grup_petugas_id,
					tanggal: defaultValue.tanggal,
					bulan: defaultValue.bulan,
					tahun: defaultValue.tahun,
				},
			};

			try {
				const schedule = await apiReadAllScheduleShift(
					filter.filter,
					token
				);
				const shift = await apiReadAllShift(data, token);
				const staff = await apiReadAllStaff(params.filter, token);
				const penugasan = await apiReadAllPenugasanShift(data, token);
				const petugasShift = await apiReadAllPetugasShift(
					filterPetugasShift.filter,
					token
				);

				setDataPetugasShift(petugasShift.data.records);
				setSchedule(schedule.data.records);
				setShift(shift.data.records);
				setAddShift({
					...addShift,
					shift_id: defaultValue.shift_id,
					schedule_id: defaultValue.schedule_id,
				});
				setWaktu({
					...waktu,
					waktu_mulai: defaultValue?.waktu_mulai,
					waktu_selesai: defaultValue?.waktu_selesai,
				});
				setStaff(staff.data.records);
				setPenugasan(penugasan.data.records);
				setIsLoading(false);
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
	}, []);
	console.log(schedule, "schedule");
	const handleChangeShift = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedShiftId = e.target.value;
		const jamKerja = shift.find(
			(item: any) => item.shift_id === selectedShiftId
		);
		const selectedSchedule = schedule.find(
			(item: any) => item.shift_id === selectedShiftId
		);
		setWaktu({
			...waktu,
			waktu_mulai: jamKerja?.waktu_mulai,
			waktu_selesai: jamKerja?.waktu_selesai,
		});
		setAddShift({
			...addShift,
			shift_id: e.target.value,
			schedule_id: selectedSchedule?.schedule_id,
		});
	};

	const handleChangePenugasan = (e: any, petugas: any) => {
		const petugasId = petugasShiftAdd.findIndex(
			(item) => item.petugas_id === petugas
		);
		const updatedPetugasShiftAdd = [...petugasShiftAdd];
		updatedPetugasShiftAdd[petugasId].penugasan_id = e;
		setPetugasShiftAdd(updatedPetugasShiftAdd);
	};

	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: ".i-tanggal",
					popover: {
						title: "Tanggal",
						description: "Pilih tanggal yang diinginkan",
					},
				},
				{
					element: ".i-jadwal",
					popover: {
						title: "Jadwal Shift",
						description: "Pilih jadwal shift yang diinginkan",
					},
				},
				{
					element: ".i-mulai",
					popover: {
						title: "Waktu Mulai",
						description: "Menentukan waktu mulai",
					},
				},
				{
					element: ".i-selesai",
					popover: {
						title: "Waktu Selesai",
						description: "Menentukan waktu selesai",
					},
				},
				{
					element: ".i-nama",
					popover: {
						title: "Nama Grup",
						description: "Isi nama grup yang diinginkan",
					},
				},
				{
					element: ".i-ketua",
					popover: {
						title: "Ketua Grup",
						description: "Isi ketua grup yang diinginkan",
					},
				},
				{
					element: ".i-anggota",
					popover: {
						title: "Anggota Grup",
						description: "Pilih penugasan yang diinginkan",
					},
				},

				{
					element: ".b-submit",
					popover: {
						title: "Submit",
						description: "Klik submit",
					},
				},
			],
		});

		driverObj.drive();
	};

	// const handleSubmit = () => {
	//   setButtonLoad(true);
	//   const editData = petugasShiftAdd?.map((petugas_shift_id: any) => ({
	//     petugas_shift_id,
	//   }));
	//   onSubmit(editData).then(() => setButtonLoad(false));
	//   console.log('handle ini 2', editData);
	// };

	const handleSubmit = () => {
		setButtonLoad(true);
		const editData = petugasShiftAdd.map((petugas_shift) => ({
			petugas_shift_id: petugas_shift.petugas_shift_id,
			shift_id: petugas_shift.shift_id,
			petugas_id: petugas_shift.petugas_id,
			schedule_id: petugas_shift.schedule_id,
			status_kehadiran: petugas_shift.status_kehadiran,
			jam_kehadiran: petugas_shift.jam_kehadiran,
			status_izin: petugas_shift.status_izin,
			penugasan_id: petugas_shift.penugasan_id,
			ruangan_otmil_id: petugas_shift.ruangan_otmil_id,
			ruangan_lemasmil_id: petugas_shift.ruangan_lemasmil_id,
			status_pengganti: petugas_shift.status_pengganti,
			lembur: petugas_shift.lembur,
			keterangan_lembur: petugas_shift.keterangan_lembur,
		}));

		// Kirim seluruh array ke backend sekaligus
		onSubmit({ petugas_shifts: editData })
			.then(() => setButtonLoad(false))
			.catch((error) => {
				console.error("Error editing petugas shifts:", error);
				setButtonLoad(false);
			});

		console.log("handle ini 2", editData);
	};

	const tanggal = `${defaultValue.tanggal}/${defaultValue.bulan}/${defaultValue.tahun}`;

	return (
		<div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
			<div
				className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[90vh]`}
				ref={modalContainerRef}
			>
				{isLoading ? (
					<div className={`justify-center flex items-center`}>
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
								Ubah Data Jadwal Shift Kerja
							</h1>

							<button className="pr-55">
								<HiQuestionMarkCircle
									values={filter}
									aria-placeholder="Show tutorial"
									// onChange={}
									onClick={handleClickTutorial}
								/>
							</button>

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
									<div className="flex items-center space-x-3">
										<div className="form-group w-1/2 ">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Tanggal
											</label>
											<input
												disabled
												value={tanggal}
												name="nama_grup_petugas"
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-tanggal"
											/>
										</div>
										<div className="form-group w-1/2">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Jadwal Shift
											</label>
											<select
												name="shift_id"
												onChange={handleChangeShift}
												value={addShift.shift_id}
												className="capitalize w-full rounded  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:focus-border-primary i-jadwal"
											>
												<option value="" disabled>
													Pilih Shift
												</option>
												{schedule.map(
													(schedule: any) => {
														const matchingShift =
															shift.find(
																(item) =>
																	item.shift_id ===
																	schedule.shift_id
															);
														return (
															<>
																<option
																	value={
																		matchingShift?.shift_id
																	}
																>
																	{
																		matchingShift?.nama_shift
																	}
																</option>
															</>
														);
													}
												)}
											</select>
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
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-mulai"
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
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-selesai"
											/>
										</div>
									</div>
									<div className="form-group w-full ">
										<label
											className="block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Nama Grup
										</label>
										<input
											value={
												defaultValue.nama_grup_petugas
											}
											readOnly
											name="grup_petuas_id"
											className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-nama"
										/>
									</div>
									<div className="form-group w-full mt-2">
										<label
											className="block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Ketua Grup
										</label>
										<input
											value={defaultValue.nama_ketua_grup}
											name="nama_ketua_grup"
											readOnly
											className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary i-ketua"
										/>
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
									<div className="w-full h-48 overflow-y-auto i-anggota">
										{staff.map((item: any) => {
											const penugasanId =
												dataPetugasShift.find(
													(itemNa: any) =>
														itemNa.petugas_id ===
														item.petugas_id
												);
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
															defaultValue={
																penugasanId?.penugasan_id
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
								{!isOperator && (
									<div className="flex space-x-4">
										<button
											onClick={handleSubmit}
											className={`b-submit items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
												buttonLoad ? "bg-slate-400" : ""
											}`}
											type="submit"
											disabled={buttonLoad}
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
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default EditPetugasShift;
