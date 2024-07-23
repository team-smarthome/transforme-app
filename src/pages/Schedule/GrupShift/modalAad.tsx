import { useEffect, useRef, useState } from "react";
import { apiReadAllStaff } from "../../../services/api";
import { Alerts } from "./Alert";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";

interface AddRoomModalProps {
	closeModal: () => void;
	onSubmit: (params: any) => void;
	defaultValue?: any;
	isDetail?: boolean;
	isEdit?: boolean;
}

interface Staff {
	petugas_id: number;
	nama: string;
	grup_petugas_id: string;
	// tambahkan atribut lain sesuai kebutuhan
}

const AddDataGrup: React.FC<AddRoomModalProps> = ({
	closeModal,
	onSubmit,
	defaultValue,
	isDetail,
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	//get Token
	const tokenItem = localStorage.getItem("token");
	let tokens = tokenItem ? JSON.parse(tokenItem) : null;
	let token = tokens.token;

	const modalContainerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	const [dataGrup, setDataShift] = useState(
		defaultValue || {
			nama_grup_petugas: "",
			ketua_grup_id: "",
		}
	);
	const [staff, setStaff] = useState<Staff[]>([]); // Staff[] adalah tipe array dari objek Staff
	const [filter, setFilter] = useState("");

	const [errors, setErrors] = useState<string[]>([]);
	const [errors2, setErrors2] = useState<string[]>([]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		const dataStaff = async () => {
			const filter = {
				pageSize: Number.MAX_SAFE_INTEGER,
				// filter : {
				//   grup_petugas_id:null
				// }
			};
			try {
				const staff = await apiReadAllStaff(filter, token);
				setStaff(staff.data.records);
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
		dataStaff();
	}, []);
	console.log(staff, "staff");
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

	const validateForm = () => {
		let errorFields = [];

		// Reset pesan kesalahan sebelum memeriksa kondisi
		setErrors([]);
		setErrors2([]);

		if (!dataGrup.nama_grup_petugas) {
			errorFields.push("Isi Nama Grup");
			setErrors(errorFields);
		}

		if (!dataGrup.ketua_grup_id) {
			errorFields.push("Pilih Ketua Grup");
			setErrors2(errorFields);
		}

		if (errorFields.length > 0) {
			return false;
		} else {
			return true;
		}
	};

	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: ".i-nama",
					popover: {
						title: "Nama Grup",
						description: "Isi nama grup",
					},
				},
				{
					element: ".p-ketua",
					popover: {
						title: "Nama Ketua Grup",
						description: "Pilih nama ketua grup",
					},
				},
				{
					element: ".b-submit",
					popover: {
						title: "Submit",
						description: `Klik submit`,
					},
				},
			],
		});

		driverObj.drive();
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setDataShift({ ...dataGrup, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;

		onSubmit(dataGrup);
	};
	console.log(staff, "staff");
	return (
		<div className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
			<div
				className={`modal rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[80vh]`}
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
								Tambah Grup
							</h1>

							{/* <div className="w-10"> */}
							{isDetail ? null : (
								<button className="pr-70">
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
							<div className="flex flex-col gap-3 m-4">
								<div className="form-group w-full">
									<label
										className="block text-sm font-medium text-black dark:text-white"
										htmlFor="nama_grup_petugas"
									>
										Nama Grup
									</label>
									<input
										name="nama_grup_petugas"
										className="capitalize w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark:bg-meta-4 dark:text-white dark:focus-border-primary i-nama"
										disabled={isDetail}
										value={dataGrup.nama_grup_petugas}
										onChange={handleChange}
									/>
									<div className="h-3">
										{errors.length > 0 &&
											errors.some(
												(error) =>
													error === "Isi Nama Grup"
											) && (
												<div className="error text-red-500 text-sm">
													{errors.map(
														(error, index) =>
															error ===
																"Isi Nama Grup" && (
																<div
																	key={index}
																>
																	{error}
																</div>
															)
													)}
												</div>
											)}
									</div>
								</div>
								<div className="form-group w-full">
									<label
										className="block text-sm font-medium text-black dark:text-white"
										htmlFor="petugas_id"
									>
										Nama Ketua Grup
									</label>
									<select
										name="ketua_grup_id"
										className="capitalize w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-stroke dark dark-bg-meta-4 dark:text-white dark:focus-border-primary p-ketua"
										disabled={isDetail}
										value={dataGrup.ketua_grup_id}
										onChange={handleChange}
									>
										<option value="">Pilih Petugas</option>
										{staff
											.filter(
												(staffItem) =>
													staffItem.grup_petugas_id ==
													null
											)
											.map((staffItem) => {
												return (
													<option
														key={
															staffItem.petugas_id
														}
														value={
															staffItem.petugas_id
														}
													>
														{staffItem.nama}
													</option>
												);
											})}
									</select>
									<div className="h-3">
										{errors2.length > 0 &&
											errors2.some(
												(error) =>
													error === "Pilih Ketua Grup"
											) && (
												<div className="error text-red-500 text-sm">
													{errors2.map(
														(error, index) =>
															error ===
																"Pilih Ketua Grup" && (
																<div
																	key={index}
																>
																	{error}
																</div>
															)
													)}
												</div>
											)}
									</div>
								</div>
								{isDetail ? null : (
									<button
										className="btn w-full flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 b-submit"
										type="submit"
									>
										Submit
									</button>
								)}
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default AddDataGrup;
