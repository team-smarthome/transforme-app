import React, { useEffect, useRef, useState } from "react";
import ModalListPeserta from "./modalListPeserta";

const InformasiKomponen = ({ data, loading }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [tahun, setTahun] = useState("");

	const handleOpenModal = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<div className=" h-full">
			{" "}
			<h1 className="text-white font-semibold text-md h-10">
				Data Peserta
			</h1>
			<div className=" h-[calc(100%-40px)] grid grid-rows-3 gap-2">
				<button
					onClick={() => {
						handleOpenModal();
						setTahun(1);
					}}
					className=" flex items-center justify-center bg-gradient-to-b from-cyan-500 to-cyan-900 rounded-md text-3xl text-white font-mono"
				>
					Tahun Pertama
				</button>

				<button
					onClick={() => {
						handleOpenModal();
						setTahun(2);
					}}
					className=" flex items-center justify-center bg-gradient-to-b from-teal-500 to-teal-900 rounded-md text-3xl text-white font-mono"
				>
					Tahun Kedua
				</button>
				<button
					onClick={() => {
						handleOpenModal();
						setTahun(3);
					}}
					className=" flex items-center justify-center bg-gradient-to-b from-red-500 to-red-900 rounded-md text-3xl text-white font-mono"
				>
					Tahun Ketiga
				</button>
			</div>
			{modalOpen && (
				<ModalListPeserta
					open={modalOpen}
					onClose={handleCloseModal}
					tahun={tahun}
				></ModalListPeserta>
			)}
		</div>
	);
};

export default InformasiKomponen;
