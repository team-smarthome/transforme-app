import { useEffect, useRef, useState } from "react";
import {
	apiReadAllRekapCuti,
	apiReadAllRekapJamKerja,
	apiReadAllStaff,
} from "../../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import id from "date-fns/locale/id";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "dayjs/locale/id";
import { Alerts } from "./Alert";

interface AddRoomModalProps {
	closeModal: () => void;
	defaultValue?: any;
	isDetail?: boolean;
	isEdit?: boolean;
}
interface Staff {
	petugas_id: number;
	nama: string;
	// tambahkan atribut lain sesuai kebutuhan
}

interface RekapCuti {
	tanggal: string;
	bulan: string;
	tahun: string;
	cuti: string;
	sakit: string;
	izin: string;
	absensi: string;
	hadir: string;
	petugas_cuti: Array<any>;
	petugas_sakit: Array<any>;
	petugas_izin: Array<any>;
	petugas_absen: Array<any>;
	petugas_hadir: Array<any>;
}
const DetailGrup: React.FC<AddRoomModalProps> = ({
	closeModal,
	defaultValue,
	isDetail,
}) => {
	//get Token
	const tokenItem = localStorage.getItem("token");
	let tokens = tokenItem ? JSON.parse(tokenItem) : null;
	let token = tokens.token;
	const [rekapCuti, setRekapCuti] = useState<RekapCuti[]>([]);

	const [rekapJamKerja, setRekapJamKerja] = useState([]);
	const modalContainerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	const [dataGrup, setDataGrup] = useState(
		defaultValue || {
			grup_petugas_id: "",
			nama_grup_petugas: "",
			nama_ketua_grup: "",
		}
	);

	const [dataPetugasGrup, setDataPetugasGrup] = useState(
		defaultValue || {
			nama_shift: "",
			waktu_mulai: "",
			waktu_selesai: "",
		}
	);
	console.log(rekapCuti, "cutiiii");
	const [staff, setStaff] = useState<Staff[]>([]);
	const [errors, setErrors] = useState<string[]>([]);

	// //DatePicker
	const today = dayjs();
	const [selectedDayMonth, setSelectedDayMonth] = useState(false);
	const [selectedDate, setSelectedDate] = useState(today.toDate());
	const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()));

	const handleMonthChange = (date: any) => {
		setSelectedMonth(dayjs(date));
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleDayMonthChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedDayMonth(selectedValue === "Bulan");
	};
	registerLocale("id", id);
	setDefaultLocale("id");

	const onChangeDayMonth = (event: any) => {
		const selectedValue = event.target.value;
		if (selectedValue === "Bulan") {
			setSelectedDayMonth(true);
		} else if (selectedValue === "Hari") {
			setSelectedDayMonth(false);
		}
	};

	const getStatus = (petugasId: string) => {
		for (let record of rekapCuti) {
			switch (true) {
				case record.petugas_cuti.includes(petugasId):
					return "Cuti";
				case record.petugas_sakit.includes(petugasId):
					return "Sakit";
				case record.petugas_izin.includes(petugasId):
					return "Izin";
				case record.petugas_absen.includes(petugasId):
					return "Absen";
				case record.petugas_hadir.includes(petugasId):
					return "Hadir";
				default:
					continue;
			}
		}
		return "-";
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		const dataStaff = async () => {
			const params = {
				pageSize: Number.MAX_SAFE_INTEGER,
				filter: {
					grup_petugas_id: dataGrup.grup_petugas_id,
				},
			};
			try {
				const staff = await apiReadAllStaff(params.filter, token);
				setStaff(staff.data.records);
			} catch (error: any) {
				Alerts.fire({
					icon: "error",
					title: error.message,
				});
			}
		};
		dataStaff();
	}, []);

	useEffect(() => {
		dataRekapCuti();
		getRekapJamKerja();
	}, [selectedDayMonth, selectedDate]);

	const getRekapJamKerja = async () => {
		setIsLoading(true);
		const params = selectedDayMonth
			? {
					filter: {
						bulan: dayjs(selectedDate).month() + 1,
						tahun: dayjs(selectedDate).year(),
					},
			  }
			: {
					filter: {
						tanggal: dayjs(selectedDate).date(),
						bulan: dayjs(selectedDate).month() + 1,
						tahun: dayjs(selectedDate).year(),
					},
			  };
		try {
			const jamKerja = await apiReadAllRekapJamKerja(
				params.filter,
				token
			);
			console.log(jamKerja, "jamKerja");
			if (jamKerja.data.status == "OK") {
				setRekapJamKerja(jamKerja.data.records);
				setIsLoading(false);
			}
		} catch (error: any) {
			Alerts.fire({
				icon: "error",
				title: error.message,
			});
		}
	};

	const dataRekapCuti = async () => {
		const params = selectedDayMonth
			? {
					filter: {
						bulan: dayjs(selectedDate).month() + 1,
						tahun: dayjs(selectedDate).year(),
					},
			  }
			: {
					filter: {
						tanggal: dayjs(selectedDate).date(),
						bulan: dayjs(selectedDate).month() + 1,
						tahun: dayjs(selectedDate).year(),
						grup_petugas_id: dataGrup.grup_petugas_id,
					},
			  };
		try {
			const cuti = await apiReadAllRekapCuti(params.filter, token);
			setRekapCuti(cuti.data.records);
		} catch (error: any) {
			Alerts.fire({
				icon: "error",
				title: error.message,
			});
		}
	};

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

	return (
		<div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
			<div
				className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[90vh]`}
				ref={modalContainerRef}
			>
				<div className="relative">
					{isLoading && (
						<div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
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
					)}
					<div className="w-full flex justify-between px-4 mt-2">
						<h1 className="text-xl font-semibold text-black dark:text-white">
							Data Grup Shift Kerja
						</h1>
						<strong
							className="text-xl align-center cursor-pointer "
							onClick={closeModal}
						>
							&times;
						</strong>
					</div>
					<form>
						<div className="m-4">
							<div className="">
								<div className="form-group w-full ">
									<label
										className="block text-sm font-medium text-black dark:text-white"
										htmlFor="id"
									>
										Nama Grup
									</label>
									<input
										name="nama_grup_petugas"
										className="capitalize w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										disabled={isDetail}
										value={dataGrup.nama_grup_petugas}
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
										name="nama_ketua_grup"
										className="capitalize w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										disabled={isDetail}
										value={dataGrup.nama_ketua_grup}
									/>
								</div>
								<label
									className="block text-sm font-semibold text-black dark:text-white mt-2 "
									htmlFor="id"
								>
									Anggota Grup
								</label>
								<div className="flex justify-end mb-2 space-x-2 text-center mr-1">
									<h2 className="text-white mr-2">
										Periode Kerja :{" "}
									</h2>
									<select
										onChange={handleDayMonthChange}
										value={
											selectedDayMonth ? "Bulan" : "Hari"
										}
										className="rounded bg-slate-600 w-24"
									>
										<option value="Hari">Hari</option>
										<option value="Bulan">Bulan</option>
									</select>
									<div>
										{!selectedDayMonth ? (
											<DatePicker
												className="rounded w-36 text-center bg-slate-600"
												selected={selectedDate}
												onChange={handleDateChange}
												dateFormat="dd MMMM yyyy"
												locale={"id"}
											/>
										) : (
											<DatePicker
												className="rounded w-36 text-center bg-slate-600"
												selected={selectedDate}
												onChange={handleDateChange}
												dateFormat="MMMM yyyy"
												showMonthYearPicker
												showFullMonthYearPicker
												locale={"id"}
											/>
										)}
									</div>
								</div>
								<div className="w-full flex justify-between space-x-2">
									<div className="form-group w-1/3 ">
										<label
											className="block text-sm font-medium text-black dark:text-white ml-2"
											htmlFor="id"
										>
											Nama
										</label>
									</div>
									<div className="form-group w-1/3 ">
										<label
											className="block text-sm font-medium text-black dark:text-white "
											htmlFor="id"
										>
											Total Jam Kerja
										</label>
									</div>
									<div className="form-group w-1/3 ">
										<label
											className="block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Keterangan
										</label>
									</div>
								</div>
								<div className="w-full h-64 overflow-y-auto px-2">
									{staff.map((item) => {
										const status = getStatus(
											item.petugas_id
										);
										const jamKerja = rekapJamKerja.find(
											(rekam) =>
												rekam.petugas_id ===
												item.petugas_id
										);
										const totalJamKerja = jamKerja
											? jamKerja.total_jamkerja
											: "0.000";
										return (
											<div
												className="flex justify-between space-x-2"
												key={item.petugas_id}
											>
												<div className="form-group w-1/3">
													<input
														name="nama"
														className="capitalize w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
														disabled={isDetail}
														value={item.nama}
													/>
												</div>
												<div className="form-group w-1/3">
													{/* total_jam_kerja */}
													<input
														name="waktu_selesai"
														className="capitalize w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
														disabled={isDetail}
														value={`${parseFloat(
															totalJamKerja
														).toFixed(0)} Jam`}
													/>
												</div>

												<div className="form-group w-1/3">
													<input
														className="capitalize w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
														disabled={isDetail}
														value={status}
													/>
												</div>
											</div>
										);
									})}

									<div className="flex flex-wrap gap-2 mt-4">
										{[
											{
												label: "Total Petugas cuti",
												value: rekapCuti[0]?.cuti,
											},
											{
												label: "Total Petugas sakit",
												value: rekapCuti[0]?.sakit,
											},
											{
												label: "Total Petugas izin",
												value: rekapCuti[0]?.izin,
											},
											{
												label: "Total Petugas absen",
												value: rekapCuti[0]?.absen,
											},
											{
												label: "Total Petugas Hadir",
												value: rekapCuti[0]?.hadir,
											},
										].map((item, index) => (
											<div
												className="w-1/3 flex-grow flex-shrink rounded-2xl bg-slate-600 p-2 flex justify-center"
												key={index}
											>
												<p className="text-sm">
													{item.label}: {item.value}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
							{errors.filter((item) =>
								item.startsWith("INVALID_ID")
							).length > 0 && (
								<>
									<br />
									<div className="error">
										{errors
											.filter((item) =>
												item.startsWith("INVALID_ID")
											)[0]
											.replace("INVALID_ID_", "")}{" "}
										is not a valid bond
									</div>
								</>
							)}
							{errors.filter(
								(item) => !item.startsWith("INVALID_ID")
							).length > 0 && (
								<div className="error">
									Please input{" "}
									{errors
										.filter(
											(item) =>
												!item.startsWith("INVALID_ID")
										)
										.join(", ")}
								</div>
							)}

							{!isDetail && (
								<button
									className="btn w-full flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
									type="submit"
								>
									Submit
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default DetailGrup;
