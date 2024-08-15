import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
	apiReadAllRole,
	apiReadAllStaff,
	apiReadAllUser,
} from "../../services/api";
import { Alerts } from "./AlertUser";
import { set } from "react-hook-form";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../utils/constants";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

interface AddUserModalProps {
	closeModal: () => void;
	onSubmit: (params: any) => any;
	defaultValue?: any;
	isDetail?: boolean;
	isEdit?: boolean;
	dataUser: any;
	token: any;
}

const dataUserItem = localStorage.getItem("dataUser");
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

export const AddUserModal: React.FC<AddUserModalProps> = ({
	closeModal,
	onSubmit,
	defaultValue,
	isDetail,
	isEdit,
	dataUser,
	token,
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [formState, setFormState] = useState(
		defaultValue || {
			petugas_id: "",
			user_role_id: "",
			nama: "",
			nrp: "",
			nama_matra: "",
			jabatan: "",
			divisi: "",
			email: "",
			phone: "",
			username: "",
			password: "",
			is_suspended: "",
			lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
			lokasi_lemasmil_id: "",
			image: "",
			expiry_date: "",
		}
	);

	const modalContainerRef = useRef(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [staffData, setStaffData] = useState([]);
	const [roleData, setRoleData] = useState([]);
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [buttonLoad, setButtonLoad] = useState(false);
	const [filter, setFilter] = useState("");

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const validateForm = () => {
		let errorFields = [];

		// for (const [key, value] of Object.entries(formState)) {
		//   if (
		//     key !== "lokasi_lemasmil_id" &&
		//     key !== "last_login" &&
		//     key !== "username" &&
		//     key !== "nama_lokasi_lemasmil" &&
		//     key !== "nama" &&
		//     key !== "expiry_date" &&
		//     key !== "image" &&
		//     key !== "updated_at" // Tidak melakukan pemeriksaan pada lokasi_lemasmil_id
		//   ) {
		//     if (!value) {
		//       errorFields.push(key);
		//     }
		//   }
		// }

		if (errorFields.length > 0) {
			console.log(errorFields);
			setErrors(errorFields);
			return false;
		}

		setErrors([]);
		return true;
	};

	// const handleChange = (e: any) => {
	// 	setFormState({ ...formState, [e.target.name]: e.target.value });
	// };

	const handleChange = (e: any) => {
		const { name, value } = e.target;

		// Jika field adalah is_suspended, ubah menjadi boolean
		const newValue = name === "is_suspended" ? value === "true" : value;

		setFormState({ ...formState, [name]: newValue });
	};

	const handleSelectPetugas = (e: any) => {
		const selectedPetugas: any = staffData.find(
			(item: any) => item.petugas_id === e?.value
		);

		console.log(selectedPetugas, "petugas cuyy!");
		setFormState({
			...formState,
			petugas_id: e?.value,
			nama: selectedPetugas ? selectedPetugas.nama : "",
			nrp: selectedPetugas ? selectedPetugas.nrp : "",
			nama_matra: selectedPetugas ? selectedPetugas.nama_matra : "",
			divisi: selectedPetugas ? selectedPetugas.divisi : "",
			jabatan: selectedPetugas ? selectedPetugas.jabatan : "",
		});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(formState, "formState");

		if (!validateForm()) return;
		setButtonLoad(true);
		onSubmit(formState).then(() => setButtonLoad(false));
	};

	const getAllPetugas = async () => {
		try {
			let params = {
				pageSize: 1000,
			};
			const response = await apiReadAllStaff(params, token);
			if (response.data.status !== "OK") {
				throw new Error(response.data.message);
			}
			// const result = response.data;
			const result = response.data.records;
			const dataUserIds = dataUser.map((user: any) => user.petugas_id);
			let filter = result.filter(
				(item: any) => !dataUserIds.includes(item.petugas_id)
			);
			// console.log('TEST FILTER',filter)
			if (isDetail) {
				setStaffData(result);
			} else {
				setStaffData(filter);
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

	const getAllRole = async () => {
		try {
			let params = {
				filter: "",
			};
			const response = await apiReadAllRole(token);
			if (response.data.status !== "OK") {
				throw new Error(response.data.message);
			}
			const result = response.data;
			setRoleData(result.records);
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

	const handleClickTutorialUbah = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: "#p-role",
					popover: {
						title: "Role",
						description: "Pilih role yang diinginkan",
					},
				},
				{
					element: ".i-email",
					popover: {
						title: "Email",
						description: "Isi email",
					},
				},
				{
					element: ".i-phone",
					popover: {
						title: "Phone",
						description: "Phone number",
					},
				},
				{
					element: ".i-sus",
					popover: {
						title: "Suspended",
						description: "Pilih suspended yang diinginkan",
					},
				},
				{
					element: ".p-masa",
					popover: {
						title: "Masa Berlaku Akun",
						description: "Menentukan tanggal masa berlaku akun",
					},
				},
				{
					element: `${isEdit ? "#b-ubah" : "#b-tambah"}`,
					popover: {
						title: `${isEdit ? "Ubah" : "Tambah"}`,
						description: `Klik untuk ${
							isEdit ? "mengubah" : "menambahkan"
						} data pengguna`,
					},
				},
			],
		});

		driverObj.drive();
	};

	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: ".p-nama",
					popover: {
						title: "Nama Petugas",
						description: "Pilih nama petugas yang diinginkan",
					},
				},
				{
					element: "#p-role",
					popover: {
						title: "Role",
						description: "Pilih role yang diinginkan",
					},
				},
				{
					element: ".i-nrp",
					popover: {
						title: "NRP",
						description: "Isi NRP",
					},
				},
				{
					element: ".i-matra",
					popover: {
						title: "Matra",
						description: "Isi matra",
					},
				},
				{
					element: ".i-jabatan",
					popover: {
						title: "Jabatan",
						description: "Isi jabatan",
					},
				},
				{
					element: ".i-divisi",
					popover: {
						title: "Divisi",
						description: "Isi divisi",
					},
				},
				{
					element: ".i-email",
					popover: {
						title: "Email",
						description: "Isi email",
					},
				},
				{
					element: ".i-phone",
					popover: {
						title: "Phone",
						description: "Phone number",
					},
				},
				{
					element: ".i-password",
					popover: {
						title: "Password",
						description: "Isi password",
					},
				},
				{
					element: ".i-sus",
					popover: {
						title: "Suspended",
						description: "Pilih suspended yang diinginkan",
					},
				},
				{
					element: ".p-masa",
					popover: {
						title: "Masa Berlaku Akun",
						description: "Menentukan tanggal masa berlaku akun",
					},
				},
				{
					element: `${isEdit ? "#b-ubah" : "#b-tambah"}`,
					popover: {
						title: `${isEdit ? "Ubah" : "Tambah"}`,
						description: `Klik untuk ${
							isEdit ? "mengubah" : "menambahkan"
						} data pengguna`,
					},
				},
			],
		});

		driverObj.drive();
	};

	useEffect(() => {
		Promise.all([getAllPetugas(), getAllRole()]).then(() => {
			setIsLoading(false);
		});
	}, []);

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

	const handleImageChange = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			console.log(reader.result, "reader reader");

			reader.onloadend = async () => {
				console.log(reader.result, "reader.result reader.result");
				setFormState({ ...formState, image: reader.result });

				// setImagePreview(reader.result);
			};
			console.log(formState.image, "imagePreview imagePreview");
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveFoto = () => {
		setFormState({ ...formState, image: "" });
		const inputElement = document.getElementById(
			"image-upload"
		) as HTMLInputElement;
		if (inputElement) {
			inputElement.value = "";
		}
	};

	return (
		<div>
			<div style={modalStyles.backdrop}></div>
			<div
				ref={modalContainerRef}
				style={modalStyles.modalContainer}
				className="modal-container fixed z-[9999] flex top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
			>
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
											? "Detail Data Pengguna"
											: isEdit
											? "Edit Data Pengguna"
											: "Tambah Data Pengguna"}
									</h3>
								</div>

								{isDetail ? null : isEdit ? (
									<button className="pr-90">
										<HiQuestionMarkCircle
											values={filter}
											aria-placeholder="Show tutorial"
											// onChange={}
											onClick={handleClickTutorialUbah}
										/>
									</button>
								) : (
									<button className="pr-80">
										<HiQuestionMarkCircle
											values={filter}
											aria-placeholder="Show tutorial"
											// onChange={}
											onClick={handleClickTutorial}
										/>
									</button>
								)}

								<strong
									className="text-xl align-center cursor-pointer "
									onClick={closeModal}
								>
									&times;
								</strong>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col gap-4">
									<div className="grid grid-cols-2 gap-4 items-start">
										{/* <div className="flex flex-col gap-4"> */}
										{!isEdit && (
											<div className="form-group w-full flex flex-col">
												<label
													className="block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													Nama Petugas
												</label>
												<Select
													className="basic-single p-nama"
													classNamePrefix="select"
													defaultValue={
														isEdit || isDetail
															? {
																	value: formState.petugas_id,
																	label: formState.nama,
															  }
															: formState.petugas_id
													}
													placeholder={
														"Pilih petugas"
													}
													isClearable={true}
													isSearchable={true}
													isDisabled={isDetail}
													name="petugas_id"
													styles={customStyles}
													options={staffData.map(
														(item: any) => ({
															value: item.petugas_id,
															label: item.nama,
														})
													)}
													onChange={
														handleSelectPetugas
													}
												/>
												<p className="error-text">
													{errors.map((item) =>
														item === "petugas_id"
															? "Pilih petugas"
															: ""
													)}
												</p>
											</div>
										)}

										{/* Role*/}
										<div className="form-group w-full flex flex-col">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Role
											</label>
											<select
												onChange={handleChange}
												name="user_role_id"
												value={formState.user_role_id}
												disabled={isDetail}
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												id="p-role"
											>
												<option disabled value="">
													Pilih Role
												</option>
												{roleData.map((item: any) => (
													<option value={item.id}>
														{item.role_name} - ({" "}
														{item.deskripsi_role} )
													</option>
												))}
											</select>
											<p className="error-text">
												{errors.map((item) =>
													item === "user_role_id"
														? "Pilih role"
														: ""
												)}
											</p>
										</div>

										{/* {!isEdit && ( */}
										<>
											{/* NRP */}
											<div className="form-group w-full flex flex-col">
												<label
													className="block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													NRP
												</label>
												<input
													className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-nrp"
													onChange={handleChange}
													name="nrp"
													type="nrp"
													placeholder="NRP"
													value={formState.nrp}
													disabled={isDetail}
												/>
												<p className="error-text">
													{errors.map((item) =>
														item === "nrp"
															? "Masukan nrp"
															: ""
													)}
												</p>
											</div>

											{/* Matra */}
											<div className="form-group w-full flex flex-col">
												<label
													className="block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													Matra
												</label>
												<input
													className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-matra"
													onChange={handleChange}
													placeholder="Matra"
													name="nama_matra"
													value={formState.nama_matra}
													disabled={isDetail}
												/>
												<p className="error-text">
													{errors.map((item) =>
														item === "nama_matra"
															? "Masukan matra"
															: ""
													)}
												</p>
											</div>
										</>
										{/* )} */}
										{/* </div> */}

										{!isEdit && (
											<>
												{/* Jabatan */}
												<div className="form-group w-full flex flex-col">
													<label
														className="block text-sm font-medium text-black dark:text-white"
														htmlFor="id"
													>
														Jabatan
													</label>
													<input
														className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-jabatan"
														onChange={handleChange}
														placeholder="Jabatan"
														name="jabatan"
														type="jabatan"
														value={
															formState.jabatan
														}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item === "jabatan"
																? "Masukan jabatan"
																: ""
														)}
													</p>
												</div>

												{/* Divisi */}
												<div className="form-group w-full flex flex-col">
													<label
														className="block text-sm font-medium text-black dark:text-white"
														htmlFor="id"
													>
														Divisi
													</label>
													<input
														className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-divisi"
														onChange={handleChange}
														placeholder="Divisi"
														name="divisi"
														type="divisi"
														value={formState.divisi}
														disabled={isDetail}
													/>
													<p className="error-text">
														{errors.map((item) =>
															item === "divisi"
																? "Masukan divisi"
																: ""
														)}
													</p>
												</div>
											</>
										)}

										{/* Email */}
										<div className="form-group w-full flex flex-col">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Email
											</label>
											<input
												className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-email"
												name="email"
												type="email"
												onChange={handleChange}
												placeholder="Email"
												value={formState.email}
												disabled={isDetail}
											/>
											<p className="error-text">
												{errors.map((item) =>
													item === "email"
														? "Masukan email"
														: ""
												)}
											</p>
										</div>

										{/* Phone */}
										<div className="form-group w-full flex flex-col">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Phone
											</label>
											<input
												className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-phone"
												name="phone"
												placeholder="Phone Number"
												onChange={handleChange}
												value={formState.phone}
												disabled={isDetail}
											/>
											<p className="error-text">
												{errors.map((item) =>
													item === "phone"
														? "Masukan nomor handphone"
														: ""
												)}
											</p>
										</div>

										{/* Password */}
										{!isEdit && !isDetail && (
											<div className="form-group w-full flex flex-col">
												<label
													className="block text-sm font-medium text-black dark:text-white"
													htmlFor="id"
												>
													Password
												</label>
												<div className="relative">
													<input
														className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-password"
														name="password"
														type={
															showPassword
																? "text"
																: "password"
														}
														onChange={handleChange}
														placeholder="Password"
														disabled={isDetail}
													/>
													<button
														className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent focus:outline-none"
														onClick={
															toggleShowPassword
														}
													>
														{showPassword ? (
															<FaRegEye />
														) : (
															<FaRegEyeSlash />
														)}
													</button>
												</div>
												<p className="error-text">
													{errors.map((item) =>
														item === "password"
															? "Masukan password lama"
															: ""
													)}
												</p>
											</div>
										)}

										{/* Suspen */}
										<div className="form-group w-full flex flex-col">
											<label
												className="block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Suspended (?)
											</label>
											<select
												onChange={handleChange}
												name="is_suspended"
												value={formState.is_suspended}
												disabled={isDetail}
												className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary i-sus"
											>
												<option disabled value="">
													Pilih
												</option>
												<option value="false">
													Tidak
												</option>
												<option value="true">Ya</option>
											</select>
											<p className="error-text">
												{errors.map((item) =>
													item === "is_suspended"
														? "Pilih suspended (?)"
														: ""
												)}
											</p>
										</div>

										{/* Expery Date */}
										<div className="form-group w-full flex flex-col h-22 mt-4">
											<label
												className="  block text-sm font-medium text-black dark:text-white"
												htmlFor="id"
											>
												Masa berlaku akun
											</label>
											<input
												type="date"
												className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary p-masa"
												name="expiry_date"
												onChange={handleChange}
												value={formState.expiry_date}
												disabled={isDetail}
											/>
											<p className="error-text">
												{errors.map((item) =>
													item === "expiry_date"
														? "Pilih tanggal"
														: ""
												)}
											</p>
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
										Ubah Data Pengguna
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
										Tambah Data Pengguna
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
