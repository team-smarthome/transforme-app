// import { Divider } from "@mantine/core";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { SiOxygen } from "react-icons/si";
import { GiMuscleUp } from "react-icons/gi";
import { TbStretching } from "react-icons/tb";
import { FaShieldHeart } from "react-icons/fa6";
import ModalListAspekJasmani from "./modalListAspekJasmani";

const HealthStatistic = ({ data }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [jasmani, setJasmani] = useState("");

	const handleOpenModal = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};
	return (
		<div className="h-full">
			<h1 className="text-white font-semibold text-md h-10">
				Aspek Jasmani
			</h1>
			<div className="h-[calc(100%-40px)] grid grid-cols-1 md:grid-cols-2 gap-2">
				<button
					onClick={() => {
						handleOpenModal();
						setJasmani(1);
					}}
					className="rounded-md overflow-hidden"
				>
					<h1 className="bg-red-500 justify-center text-white font-semibold text-md h-6 items-center flex">
						Ketangkasan Fisik
					</h1>
					<div className="h-[calc(100%-24px)] w-full bg-gradient-to-b from-red-500 to-red-900 flex items-center px-4 justify-between">
						<div className="bg-red-500 rounded-full p-3 border-2 border-wBgDarkBlue  ">
							<TbStretching
								size={30}
								className="text-white animate-pulseCustom"
							></TbStretching>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-4xl font-bold text-white ">
								70
							</span>
						</div>
					</div>
				</button>

				<button
					onClick={() => {
						handleOpenModal();
						setJasmani(2);
					}}
					className="rounded-md overflow-hidden"
				>
					<h1 className="bg-teal-500 justify-center  text-white font-semibold text-md h-6 items-center flex">
						Daya Tahan Fisik
					</h1>
					<div className="h-[calc(100%-24px)] w-full bg-gradient-to-b from-teal-500 to-teal-900 flex items-center px-4 justify-between">
						<div className="bg-wGreenFlat rounded-full p-3 border-2 border-wBgDarkBlue ">
							<FaShieldHeart
								size={30}
								className="text-white animate-pulseCustom"
							></FaShieldHeart>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-4xl font-bold text-white ">
								76
							</span>
						</div>
					</div>
				</button>

				<button
					onClick={() => {
						handleOpenModal();
						setJasmani(3);
					}}
					className="rounded-md overflow-hidden"
				>
					<h1 className="bg-blue-500 justify-center text-white font-semibold text-md h-6 items-center flex">
						Kekuatan Fisik
					</h1>
					<div className="h-[calc(100%-24px)] w-full bg-gradient-to-b from-blue-500 to-blue-900 flex items-center px-4 justify-between">
						<div className="bg-blue-500 rounded-full p-3 border-2 border-wBgDarkBlue ">
							<GiMuscleUp
								size={30}
								className="text-white animate-pulseCustom"
							></GiMuscleUp>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-4xl font-bold text-white ">
								79
							</span>
						</div>
					</div>
				</button>
			</div>
			{modalOpen && (
				<ModalListAspekJasmani
					open={modalOpen}
					onClose={handleCloseModal}
					jasmani={jasmani}
				/>
			)}
		</div>
	);
};

export default HealthStatistic;
