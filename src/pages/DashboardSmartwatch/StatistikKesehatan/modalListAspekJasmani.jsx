import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Pagination } from "antd";

const ModalListAspekJasmani = ({ open, onClose, jasmani }) => {
	const [searchData, setSearchData] = useState("");
	const [pesertaList, setPesertaList] = useState([]);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 5,
		total: 0,
	});

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black bg-opacity-50"
				onClick={onClose}
			></div>
			<div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
				<div className="bg-wLineLightBlue w-full flex p-2 justify-between items-center px-4">
					<h1 className="text-white font-semibold">
						{jasmani === 1
							? "Ketangkasan Fisik"
							: jasmani === 2
							? "Daya Tahan Fisik"
							: "Kekuatan Fisik"}
					</h1>
					<button
						className="text-white hover:text-orange"
						onClick={onClose}
					>
						&times;
					</button>
				</div>
				<div className="bg-[#38b6ff] bg-opacity-70 flex flex-col gap-4 p-4">
					<div className="flex items-center border-b border-gray-300 pb-2">
						<IoSearchSharp className="text-gray-500 mr-2" />
						<input
							type="text"
							className="w-full bg-transparent outline-none"
							placeholder="Cari nama"
							value={searchData}
							onChange={(e) => setSearchData(e.target.value)}
						/>
					</div>
					<div className="h-[400px] overflow-auto space-y-2"></div>
					<div className="flex justify-center h-10 items-center">
						<Pagination
							simple
							defaultCurrent={1}
							total={50}
							current={pagination.current}
							pageSize={pagination.pageSize}
							onChange={(page) =>
								setPagination({ ...pagination, current: page })
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalListAspekJasmani;
