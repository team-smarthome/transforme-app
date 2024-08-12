import { useEffect, useRef, useState } from "react";
import Loader from "../../../common/Loader";
import { AddKamera } from "./ModalAddKamera";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { DeleteKameraModal } from "./ModalDeleteKamera";
import { Alerts } from "./AlertKamera";
import {
	apiReadKamera,
	apiDeleteKamera,
	apiCreateKamera,
	apiUpdateKamera,
} from "../../../services/api";
import Pagination from "../../../components/Pagination";
import SearchInputButton from "../Search";
import * as xlsx from "xlsx";
import DropdownAction from "../../../components/DropdownAction";
import dayjs from "dayjs";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Error403Message } from "../../../utils/constants";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

// Interface untuk objek 'params' dan 'item'
interface Params {
	filter: string;
}
interface Item {
	nama_kamera: string;
	url_rtsp: string;
	ip_address: string;
	status_kamera: string;
	merk: string;
	model: string;
	lokasi_otmil_id: string;
	ruangan_otmil_id: string;
	jenis_ruangan_otmil: string;
	nama_ruangan_otmil: string;
	deviceId: string;
}

const KameraList = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// useState untuk menampung data dari API
	const [data, setData] = useState<Item[]>([]);
	const [detailData, setDetailData] = useState<Item | null>(null);
	const [editData, setEditData] = useState<Item | null>(null);
	const [deleteData, setDeleteData] = useState<Item | null>(null);
	const [modalDetailOpen, setModalDetailOpen] = useState(false);
	const [modalEditOpen, setModalEditOpen] = useState(false);
	const [modalAddOpen, setModalAddOpen] = useState(false);
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [filter, setFilter] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [dataExcel, setDataExcel] = useState([]);

	const [isOperator, setIsOperator] = useState<boolean>();

	const tokenItem = localStorage.getItem("token");
	const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
	const token = dataToken.token;

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

	const handleFilterChange = async (e: any) => {
		const newFilter = e.target.value;
		setFilter(newFilter);

		// try {
		//   const response = await apiReadKategoriPerkara({ filter: { nama_kategori_perkara: newFilter } });
		//   setPages(response.data.pagination.totalPages);
		//   setRows(response.data.pagination.totalRecords);
		//   if (response.data.status === 'OK') {
		//     const result = response.data;
		//     setData(result.records);
		//   } else {
		//     throw new Error('Terjadi kesalahan saat mencari data.');
		//   }
		// } catch (error) {
		//   console.error(error);
		// }
	};

	const handleClickTutorial = () => {
		const driverObj = driver({
			showProgress: true,
			steps: [
				{
					element: ".search",
					popover: {
						title: "Search",
						description: "Mencari nama kamera",
					},
				},
				{
					element: ".p-status",
					popover: {
						title: "Semua Status",
						description: "Pilih status yang diinginkan",
					},
				},
				{
					element: ".b-search",
					popover: {
						title: "Search",
						description: "Click button untuk mencari nama kamera",
					},
				},
				{
					element: ".excel",
					popover: {
						title: "Excel",
						description: "Mendapatkan file excel",
					},
				},
				{
					element: ".b-tambah",
					popover: {
						title: "Tambah",
						description: "Menambahkan data perangkat kamera",
					},
				},
			],
		});

		driverObj.drive();
	};

	const handleFilterChangeStatus = (e: any) => {
		const newFilter = e.target.value;
		setFilterStatus(newFilter);
		console.log("new filter", newFilter);
	};

	const handleSearchClick = async () => {
		let params = {
			filter: {
				search: filter,
				status_kamera: filterStatus,
				// lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
				page: currentPage,
				pageSize: pageSize,
			},
		};
		try {
			const response = await apiReadKamera(params.filter, token);
			setPages(response.data.pagination.totalPages);
			setRows(response.data.pagination.totalRecords);
			if (response.status === 200) {
				const result = response.data;
				setData(result.records);
			} else {
				throw new Error("Terjadi kesalahan saat mencari data.");
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
	console.log(data);
	const handleEnterKeyPress = (event: any) => {
		if (event.key === "Enter") {
			handleSearchClick();
			console.log("ENTER DIPNCET");
		}
	};

	const handleChagePage = (pageNumber: any) => {
		setCurrentPage(pageNumber);
	};

	const handleChangePageSize = async (e: any) => {
		const size = e.target.value;
		setPageSize(size);
		setCurrentPage(1);
	};

	// useEffect untuk fetch data dari API
	useEffect(() => {
		fetchData();
	}, [currentPage, pageSize]); // Anda juga dapat menambahkan dependencies jika diperlukan

	const fetchData = async () => {
		let params = {
			// filter: { lokasi_otmil_id: '890cc9b1-b01f-4d1f-9075-a6a96e851b12' },
			page: currentPage,
			pageSize: pageSize,
		};
		setIsLoading(true);
		try {
			const response = await apiReadKamera(params, token);
			if (response.data.status !== "OK") {
				throw new Error(response.data.message);
			}
			const result = response.data.records;
			setData(result);
			console.log("result", result);
			setPages(response.data.pagination.totalPages);
			setRows(response.data.pagination.totalRecords);
			setIsLoading(false);
		} catch (e: any) {
			console.log(e);
			//   if (e.response.status === 403) {
			//     navigate('/', {
			//       state: { forceLogout: true, lastPage: location.pathname },
			//     });
			//   }
			//   Alerts.fire({
			//     icon: e.response.status === 403 ? 'warning' : 'error',
			//     title: e.response.status === 403 ? Error403Message : e.message,
			//   });
		}
	};
	const errorTimeoutRef: any = useRef(null);
	const client = useRef(new W3CWebSocket("ws://192.168.1.111:5000"));
	const sendRequest = (method, params) => {
		client.current.send(JSON.stringify({ method: method, params: params }));
	};
	client.current = new WebSocket("ws://192.168.1.111:5000");

	client.current.onopen = () => {
		console.log("WebSocket Client Connected");
	};
	client.current.onmessage = (message) => {
		const data = JSON.parse(message.data);
		if (data.type === "error") {
			// Tangkap pesan error dan tampilkan kepada pengguna
			clearTimeout(errorTimeoutRef.current); // Hapus timeout sebelumnya (jika ada)
			errorTimeoutRef.current = setTimeout(() => {
				console.log(data, "ini data error");
				console.log("Error from server camera:", data.message);
			}, 1500); // Setelah 2 detik, tampilkan pesan error
		}
		if (data.type === "info") {
			clearTimeout(errorTimeoutRef.current); // Hapus timeout jika mendapatkan pesan info
			console.log(data, "ini data berhasil");
		}
	};
	// client.current.onmessage = (message) => {
	//   const data = JSON.parse(message.data);
	//   if (data.type === 'info') {
	//     // Tangkap pesan error dan tampilkan kepada pengguna
	//     console.log(data, 'ini data info');

	//     console.log('Error from server camera:', data.message);
	//   }
	// };
	// Cleanup function

	const sendRequestOnce = () => {
		data.map((item) => {
			sendRequest("restartLiveCamera", {
				listViewCameraData: [
					{
						IpAddress: item?.ip_address,
						urlRTSP: item?.url_rtsp,
						deviceName: item?.nama_kamera,
						deviceId: item?.kamera_id,
					},
				],
			});
		});
	};
	// function untuk menampilkan modal detail
	const handleDetailClick = (item: Item) => {
		setDetailData(item);
		setModalDetailOpen(true);
	};

	// function untuk menampilkan modal edit
	const handleEditClick = (item: Item) => {
		setEditData(item);
		setModalEditOpen(true);
	};

	// function untuk menampilkan modal delete
	const handleDeleteClick = (item: Item) => {
		setDeleteData(item);
		setModalDeleteOpen(true);
	};

	// function untuk menutup modal
	const handleCloseDeleteModal = () => {
		setModalDeleteOpen(false);
	};

	// function untuk menutup modal
	const handleCloseAddModal = () => {
		setModalAddOpen(false);
	};

	const handleCloseEditModal = () => {
		setModalEditOpen(false);
	};

	// function untuk menghapus data
	const handleSubmitDelete = async (params: any) => {
		try {
			const responseDelete = await apiDeleteKamera(params, token);
			if (responseDelete.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil menghapus data",
				});
				setModalDeleteOpen(false);
				fetchData();
			} else if (responseDelete.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal hapus data",
				});
			} else {
				throw new Error(responseDelete.data.message);
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

	// function untuk menambah data
	const handleSubmitAdd = async (params: any) => {
		console.log("DATA DARI LIST", params);
		try {
			const responseCreate = await apiCreateKamera(params, token);
			if (responseCreate.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil menambah data",
				});
				setModalAddOpen(false);
				fetchData();
				setTimeout(() => {
					sendRequestOnce();
				}, 1500);
			} else if (responseCreate.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal membuat data",
				});
			} else {
				throw new Error(responseCreate.data.message);
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

	// function untuk mengubah data
	const handleSubmitEdit = async (params: any) => {
		console.log(params, "edit");
		try {
			const responseEdit = await apiUpdateKamera(params, token);
			if (responseEdit.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil mengubah data",
				});
				setModalEditOpen(false);
				fetchData();
			} else if (responseEdit.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal mengubah data",
				});
			} else {
				throw new Error(responseEdit.data.message);
			}
		} catch (e: any) {
			console.log(e, "error nih");
			// if (e.response.status === 403) {
			//   navigate("/", {
			//     state: { forceLogout: true, lastPage: location.pathname },
			//   });
			// }
			// Alerts.fire({
			//   icon: e.response.status === 403 ? "warning" : "error",
			//   title: e.response.status === 403 ? Error403Message : e.message,
			// });
		}
	};

	const exportToExcel = async () => {
		const dataToExcel = [
			[
				"Nama kamera",
				"URL RSTP",
				"ip Adress",
				"status kamera",
				"merk",
				"model",
				"Nama Lokasi Otmil",
				"Nama Ruangan Otmil",
				"Zona",
			],
			...data.map((item: any) => [
				item.nama_kamera,
				item?.url_rtsp,
				item?.ip_address,
				item?.status_kamera === "offline"
					? "offline"
					: item?.status_kamera,
				item?.merk,
				item?.model,
				item?.nama_lokasi_otmil !== null
					? item?.nama_lokasi_otmil
					: item?.nama_lokasi_lemasmil,
				item?.nama_ruangan_otmil !== null
					? item?.nama_ruangan_otmil
					: item?.nama_ruangan_lemasmil,
				item?.zona_ruangan_otmil !== null
					? item?.zona_ruangan_otmil
					: item?.zona_ruangan_lemasmil,
			]),
		];

		const ws = xlsx.utils.aoa_to_sheet(dataToExcel);
		const wb = xlsx.utils.book_new();
		xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
		xlsx.writeFile(
			wb,
			`Data-Kamera ${dayjs(new Date()).format("DD-MM-YYYY HH.mm")}.xlsx`
		);
	};

	useEffect(() => {
		// Menambahkan event listener untuk tombol "Enter" pada komponen ini
		document.addEventListener("keypress", handleEnterKeyPress);

		// Membersihkan event listener ketika komponen di-unmount
		return () => {
			document.removeEventListener("keypress", handleEnterKeyPress);
		};
	}, [filter]); // [] menandakan bahwa useEffect hanya akan dijalankan sekali saat komponen dimuat

	return isLoading ? (
		<Loader />
	) : (
		<div className="container py-[16px]">
			<div className="pb-4">
				<Breadcrumbs url={window.location.href} />
			</div>
			<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
				<div className="flex justify-center w-full">
					<div className="mb-4 flex gap-2 items-center border-[1px] border-slate-800 px-4 py-2 rounded-md">
						<div className="w-full flex">
							<div className="search">
								<SearchInputButton
									value={filter}
									placehorder="Cari nama Kamera"
									onChange={handleFilterChange}

									// onClick={handleSearchClick}
								/>
							</div>
							<select
								className="ml-2 w-3/6 text-sm rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-1 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-status"
								value={filterStatus}
								onChange={handleFilterChangeStatus}
							>
								<option value="">Semua Status</option>
								<option value="online">Online</option>
								<option value="offline">Offline</option>
								<option value="rusak">Rusak</option>
							</select>
						</div>
						<button
							className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search"
							type="button"
							onClick={handleSearchClick}
							id="button-addon1"
							data-te-ripple-init
							data-te-ripple-color="light"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5 text-black"
							>
								<path
									fillRule="evenodd"
									d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						<button
							onClick={exportToExcel}
							className="text-white rounded-sm bg-blue-500 px-10 py-1 text-sm font-medium excel"
						>
							Export&nbsp;Excel
						</button>

						{/* <div className="w-10"> */}
						<button>
							<HiQuestionMarkCircle
								values={filter}
								aria-placeholder="Show tutorial"
								// onChange={}
								onClick={handleClickTutorial}
							/>
						</button>
						{/* </div> */}
					</div>
				</div>
				<div className="flex justify-between items-center mb-3">
					<h4 className="ext-xl font-semibold text-black dark:text-white">
						Data Perangkat Kamera
					</h4>
					{!isOperator && (
						<button
							onClick={() => setModalAddOpen(true)}
							className=" text-black rounded-md font-semibold bg-blue-300 py-2 px-3 b-tambah"
						>
							Tambah
						</button>
					)}
				</div>

				<div className="flex flex-col">
					<div
						className={`grid ${
							isOperator ? "sm:grid-cols-5" : "sm:grid-cols-6"
						} rounded-t-md bg-gray-2 dark:bg-slate-600`}
					>
						<div className="p-2.5 text-center xl:p-5">
							<h5 className="text-sm font-medium uppercase xsm:text-base">
								Nama Kamera
							</h5>
						</div>
						<div className="p-2.5 text-center xl:p-5">
							<h5 className="text-sm font-medium uppercase xsm:text-base">
								Alamat IP
							</h5>
						</div>
						<div className="p-2.5 text-center xl:p-5">
							<h5 className="text-sm font-medium uppercase xsm:text-base">
								Status
							</h5>
						</div>
						<div className="p-2.5 text-center xl:p-5">
							<h5 className="text-sm font-medium uppercase xsm:text-base">
								Merk
							</h5>
						</div>
						<div className="p-2.5 text-center xl:p-5">
							<h5 className="text-sm font-medium uppercase xsm:text-base">
								Model
							</h5>
						</div>
						<div
							className={`hidden ${
								isOperator ? "hidden" : "sm:block"
							} p-2.5 text-center xl:p-5`}
						>
							<h5 className="text-sm font-medium uppercase xsm:text-base">
								Aksi
							</h5>
						</div>
					</div>

					{data.map((item: any) => {
						return (
							<div>
								<div
									className={`grid ${
										isOperator
											? "grid-cols-5"
											: "grid-cols-6"
									} rounded-sm bg-gray-2 dark:bg-meta-4`}
								>
									<div
										onClick={() => handleDetailClick(item)}
										className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
									>
										<p className="text-black dark:text-white">
											{item.nama_kamera}
										</p>
									</div>
									<div
										onClick={() => handleDetailClick(item)}
										className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
									>
										<p className="text-black dark:text-white">
											{item.ip_address}
										</p>
									</div>
									<div
										onClick={() => handleDetailClick(item)}
										className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
									>
										{item.status_kamera === "online" ? (
											<p className="text-green-500 dark:text-green-300">
												Online
											</p>
										) : item.status_kamera === "offline" ? (
											<p className="text-red-500 dark:text-red-300">
												offline
											</p>
										) : item.status_kamera === "rusak" ? (
											<p className="text-red-500 dark:text-red-300">
												rusak
											</p>
										) : (
											<p className="text-black dark:text-white">
												Status Tidak Dikenali
											</p>
										)}
									</div>
									<div
										onClick={() => handleDetailClick(item)}
										className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
									>
										<p className="text-black dark:text-white">
											{item.merk}
										</p>
									</div>
									<div
										onClick={() => handleDetailClick(item)}
										className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
									>
										<p className="text-black dark:text-white">
											{item.model}
										</p>
									</div>
									<div
										className={`hidden items-center ${
											isOperator ? "hidden" : "sm:flex"
										} justify-center p-2.5 xl:p-5 flex-wrap lg:flex-nowrap gap-2`}
									>
										<div className="relative">
											<DropdownAction
												handleEditClick={() =>
													handleEditClick(item)
												}
												handleDeleteClick={() =>
													handleDeleteClick(item)
												}
											></DropdownAction>
										</div>
									</div>
								</div>
								<div className="border-t border-slate-600"></div>
							</div>
						);
					})}
					{modalDetailOpen && (
						<AddKamera
							closeModal={() => setModalDetailOpen(false)}
							onSubmit={handleSubmitAdd}
							defaultValue={detailData}
							isDetail={true}
						/>
					)}
					{modalEditOpen && (
						<AddKamera
							closeModal={handleCloseEditModal}
							onSubmit={handleSubmitEdit}
							defaultValue={editData}
							isEdit={true}
						/>
					)}
					{modalAddOpen && (
						<AddKamera
							closeModal={handleCloseAddModal}
							onSubmit={handleSubmitAdd}
						/>
					)}
					{modalDeleteOpen && (
						<DeleteKameraModal
							closeModal={handleCloseDeleteModal}
							onSubmit={handleSubmitDelete}
							defaultValue={deleteData}
						/>
					)}
				</div>
				{data.length === 0 ? null : (
					<div className="mt-5">
						<div className="flex gap-4 items-center ">
							<p>
								Total Rows: {rows} Page:{" "}
								{rows ? currentPage : null} of {pages}
							</p>
							<select
								value={pageSize}
								onChange={handleChangePageSize}
								className=" rounded border border-stroke py-1 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
							>
								<option value="10">10</option>
								<option value="50">50</option>
								<option value="100">100</option>
								<option value="1000">1000</option>
							</select>
						</div>
						<Pagination
							currentPage={currentPage}
							totalPages={pages}
							onChangePage={handleChagePage}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default KameraList;
