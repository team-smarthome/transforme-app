import React, { useEffect, useRef, useState } from "react";
import { webpack } from "webpack";
import Select from "react-select";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Alerts } from "./AlertPlatform";
import { Error403Message } from "../../../../utils/constants";
import { Label } from "@windmill/react-ui";
import { apiReadPlatform } from "../../../../services/api";

// interface

interface AddPlatformModalProps {
	closeModal: () => void;
	onSubmit: (params: any) => void;
	defaultValue?: any;
	isDetail?: boolean;
	isEdit?: boolean;
}

export const AddDeviceType: React.FC<AddPlatformModalProps> = ({
	closeModal,
	onSubmit,
	defaultValue,
	isDetail,
	isEdit,
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [formState, setFormState] = useState(
		defaultValue || {
			nama_platform: "",
		}
	);

	//state
	const [errors, setErrors] = useState<string[]>([]);
	const modalContainerRef = useRef<HTMLDivElement>(null);
	const [buttonLoad, setButtonLoad] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [filter, setFilter] = useState("");

	const tokenItem = localStorage.getItem("token");
	const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
	const token = dataToken.token;

	const dataUserItem = localStorage.getItem("dataUser");
	const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;

	// function
	const validateForm = () => {
		let errorFields = [];

		for (const [key, value] of Object.entries(formState)) {
			if (key !== "nama_platform") {
				if (!value) {
					errorFields.push(key);
				}
			}
		}
		if (errorFields.length > 0) {
			setErrors(errorFields);
			return false;
		}
		setErrors([]);
		return true;
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

	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: ".i-nama",
					popover: {
						title: "Platform",
						description: "Isi Platform",
					},
				},
				{
					element: `${isEdit ? "#b-ubah" : "#b-tambah"}`,
					popover: {
						title: `${isEdit ? "Ubah" : "Tambah"}`,
						description: `Klik untuk ${
							isEdit ? "mengubah" : "menambahkan"
						} data platform`,
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
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;
		setButtonLoad(true);

		onSubmit(formState);
		// closeModal();
	};

	// const [inputValue, setInputValue] = useState(
	// 	formState.wbp[0]?.nama_wbp || ""
	// );

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
	console.log(formState, "formState");
	//return
	return (
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
											? "Detail Platform"
											: isEdit
											? "Edit Platform"
											: "Tambah Platform"}
									</h3>
								</div>

								{/* <div className="w-10"> */}
								{isDetail ? null : isEdit ? (
									<button className="pr-100">
										<HiQuestionMarkCircle
											values={filter}
											aria-placeholder="Show tutorial"
											// onChange={}
											onClick={handleClickTutorial}
										/>
									</button>
								) : (
									<button className="pr-90">
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
								<div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-1 justify-normal">
									<div className="form-group w-full h-22">
										<label
											className="block text-sm font-medium text-black dark:text-white"
											htmlFor="id"
										>
											Platform
										</label>
										<input
											className="w-full rounded border border-stroke  py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-nama"
											name="nama_platform"
											placeholder="Nama Platform"
											onChange={handleChange}
											value={formState.nama_platform}
											disabled={isDetail}
										/>
										<p className="error-text p-0 m-0">
											{errors.map((item) =>
												item === "nama_platform"
													? "Platform Wajib Diisi"
													: ""
											)}
										</p>
									</div>
								</div>

								<div
									className={` ${
										isDetail ? "h-auto" : "h-15"
									}  mt-3`}
								>
									{/* <br></br> */}
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
											Ubah Data Platform
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
											Tambah Data Platform
										</button>
									)}
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
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
