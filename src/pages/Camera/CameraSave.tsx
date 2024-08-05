import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import MenuItemComponent from "../../components/MenuItemCameraSave";
import {
	apiCreateKameraTersimpan,
	apiDeleteKameraTersimpan,
	apiReadKameraTersimpan,
	apiUpdateKameraTersimpan,
} from "../../services/api";
import { Alerts } from "./AlertCamera";
import { ModalAddCameraSave } from "./ModalAddCameraSave";
import { DeleteKameraModalSave } from "./ModalDeleteKameraSave";

interface Item {
	id: string;
	nama_grup: string;
}
const CameraSave = () => {
	const [modalAddOpen, setModalAddOpen] = useState(false);
	const [modalEditOpen, setModalEditOpen] = useState(false);
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const [data, setData] = useState<Item[]>([]);
	const [editData, setEditData] = useState<Item | null>(null);
	const [deleteData, setDeleteData] = useState<Item | null>(null);
	const [menuIndex, setMenuIndex] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const tokenItem = localStorage.getItem("token");
	const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
	const token = dataToken.token;

	const handleIconClick = (index: number) => {
		setMenuIndex(index === menuIndex ? null : index);
	};
	useEffect(() => {
		fetchKameraTersimpan();
	}, []);
	const fetchKameraTersimpan = async () => {
		const params = {
			page: 1,
		};
		setIsLoading(true);
		try {
			const response = await apiReadKameraTersimpan(params, token);
			if (response.data.status !== "OK") {
				throw new Error(response.data.message);
			}
			const result = response.data.records;
			setData(result);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(data, "data fetch");
	const handleCloseAddModal = () => {
		setModalAddOpen(false);
	};
	const handleCloseEditModal = () => {
		setModalEditOpen(false);
	};
	const handleCloseDeleteModal = () => {
		setModalDeleteOpen(false);
	};

	const handleSubmitAdd = async (params: any) => {
		try {
			const responseCreate = await apiCreateKameraTersimpan(
				params,
				token
			);
			if (responseCreate.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil menambah data",
				});
				setModalAddOpen(false);
				fetchKameraTersimpan();
			} else if (responseCreate.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal membuat data",
				});
			} else {
				throw new Error(responseCreate.data.message);
			}
		} catch (e: any) {
			console.log(e, "error catch");
		}
	};
	const handleSubmitEdit = async (params: any) => {
		try {
			const responseEdit = await apiUpdateKameraTersimpan(params, token);
			if (responseEdit.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil mengubah data",
				});
				setModalEditOpen(false);
				fetchKameraTersimpan();
			} else if (responseEdit.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal membuat data",
				});
			} else {
				throw new Error(responseEdit.data.message);
			}
		} catch (e: any) {
			console.log(e, "error catch");
		}
	};
	const handleSubmitDelete = async (params: any) => {
		console.log("DATA DARI delete", params);
		try {
			const responseEdit = await apiDeleteKameraTersimpan(params, token);
			if (responseEdit.data.status === "OK") {
				Alerts.fire({
					icon: "success",
					title: "Berhasil menghapus data",
				});
				setModalDeleteOpen(false);
				fetchKameraTersimpan();
			} else if (responseEdit.data.status === "NO") {
				Alerts.fire({
					icon: "error",
					title: "Gagal membuat data",
				});
			} else {
				throw new Error(responseEdit.data.message);
			}
		} catch (e: any) {
			console.log(e, "error catch");
		}
	};

	const handleEditClick = (item: Item) => {
		setEditData(item);
		setModalEditOpen(true);
	};
	const handleDeleteClick = (item: Item) => {
		setDeleteData(item);
		setModalDeleteOpen(true);
	};
	const handleDetailClick = (item: Item) => {
		navigate(`/kamera-tersimpan/list/${item?.id}`);
	};

	// const handleSubmitEdit = async (params: any) => {
	//   console.log(params, 'edit');
	//   try{
	//     const responseEdit = await apiUpdateKameraTersimpan(params, token);
	//     if(responseEdit.data.status === 'OK'){
	//       Alerts.fire({
	//         icon: 'success',
	//         title: 'Berhasil mengubah data',
	//       });
	//       setModalEditOpen(false);
	//       fetchKameraTersimpan();
	//   } else if(responseEdit.data.status === 'NO'){
	//       Alerts.fire({
	//         icon: 'error',
	//         title: 'Gagal mengubah data',
	//       });
	//     } else {
	//       throw new Error(responseEdit.data.message);
	//     }
	//   } catch (e: any) {
	//     console.log(e, 'error catch');
	//   }
	// }
	return isLoading ? (
		<Loader />
	) : (
		<>
			<div className="px-10 py-3">
				<button
					onClick={() => setModalAddOpen(true)}
					className="  text-black rounded-md font-semibold bg-slate-600 py-2 px-6 border-2 border-white"
				>
					<IoAdd className="text-2xl text-white" />
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6 px-10">
				{data?.map((item: any, index) => (
					<div
						key={index}
						className="bg-gradient-to-r from-slate-500 to-slate-700 shadow-lg transform transition-transform duration-300 hover:scale-105 flex px-8 text-center font-bold justify-center items-center rounded-2xl text-2xl text-white relative w-full h-36 cursor-pointer hover:from-slate-600 hover:to-slate-800"
						onClick={() => console.log("test2", index)}
					>
						<div className="absolute top-3 right-2 z-10 hover:cursor-pointer hover:bg-slate-400 hover:rounded-full flex items-center justify-center w-9 h-9 transition duration-300">
							<span
								className="flex items-center justify-center w-full h-full text-slate-300"
								onClick={(e) => {
									e.stopPropagation();
									handleIconClick(index);
									console.log("test1", index);
								}}
							>
								<SlOptionsVertical size={17} />
							</span>
						</div>

						<p className="text-xl cursor-pointer">
							{item.nama_grup}
						</p>
						<div className="absolute bottom-1 right-4">
							<p className="text-sm text-slate-300">
								Total kamera:
								<span className="text-orange-200 text-sm">
									{" "}
									{item.kamera_tersimpan.length}
								</span>
							</p>
						</div>
						{menuIndex === index && (
							<MenuItemComponent
								onEdit={() => handleEditClick(item)}
								onDelete={() => handleDeleteClick(item)}
								onDetail={() => handleDetailClick(item)}
								onClose={() => setMenuIndex(null)}
							/>
						)}
					</div>
				))}
			</div>

			{modalAddOpen && (
				<ModalAddCameraSave
					closeModal={handleCloseAddModal}
					onSubmit={handleSubmitAdd}
					// token={token}
				/>
			)}
			{modalEditOpen && (
				<ModalAddCameraSave
					closeModal={handleCloseEditModal}
					onSubmit={handleSubmitEdit}
					isEdit={true}
					defaultValue={editData}
					// token={token}
				/>
			)}
			{modalDeleteOpen && (
				<DeleteKameraModalSave
					closeModal={handleCloseDeleteModal}
					onSubmit={handleSubmitDelete}
					defaultValue={deleteData}
					// token={token}
				/>
			)}
		</>
	);
};

export default CameraSave;
