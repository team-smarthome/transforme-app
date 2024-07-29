import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import ProfileImg from "../../../../assets/profil.webp";
import { LaravelApiGetPeserta } from "../../../services/DashboardSmartwatchApi/dashboardApi";
import useGetAuthUser from "../../../Hooks/useGetAuthUser";
import { useUnauthorizedHandler } from "../../../utils/handleUnauthorizedDashboardSmartwatch";
import { IoSearchSharp } from "react-icons/io5";

const ModalListPeserta = ({ open, onClose, tahun }) => {
	const [searchData, setSearchData] = useState("");
	const [pesertaList, setPesertaList] = useState([]);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 5,
		total: 0,
	});
	const authUser = useGetAuthUser();
	const handleUnauthorized = useUnauthorizedHandler();
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		let params = {
			angkatanMasuk: tahun,
			search: searchData,
			page: pagination.current,
			recordsPerPage: pagination.pageSize,
		};
		try {
			const { data } = await LaravelApiGetPeserta(
				params,
				authUser?.token
			);
			setPesertaList(data?.records);
			setPagination({
				...pagination,
				total: data?.pages?.meta?.total || 0,
			});
		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				handleUnauthorized();
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [searchData, tahun]);

	return (
		<div>
			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg">
						<div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2">
							<h1 className="text-lg font-semibold">
								{tahun === 1
									? "Tahun Pertama"
									: tahun === 2
									? "Tahun Kedua"
									: "Tahun Ketiga"}
							</h1>
							<button
								onClick={onClose}
								className="text-white hover:text-orange-500"
							>
								&times;
							</button>
						</div>
						<div className="p-4 bg-blue-100">
							{loading ? (
								<div className="flex items-center justify-center h-48">
									<div className="loader"></div>
								</div>
							) : (
								<>
									<div className="relative mb-4">
										<input
											type="text"
											className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Cari nama"
											onChange={(e) =>
												setSearchData(e.target.value)
											}
										/>
										<IoSearchSharp className="absolute top-2.5 left-2.5 text-gray-400" />
									</div>
									<div className="h-[400px] overflow-auto space-y-2">
										{pesertaList.map((datas, index) => (
											<div
												className="bg-white drop-shadow h-20 flex items-center px-2 gap-2"
												key={index}
											>
												<img
													src={ProfileImg}
													className="h-16 w-16 rounded-full"
												/>
												<label>
													{
														datas?.user
															?.nama_lengkap
													}
												</label>
											</div>
										))}
									</div>
								</>
							)}
							<div className="flex justify-center h-10 items-center mt-4">
								<Pagination
									simple
									defaultCurrent={1}
									total={50}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ModalListPeserta;
