import React from "react";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
// import Marquee from "react-fast-marquee";

const HeaderMonitor = () => {
	const navigate = useNavigate();

	const handleToPanel = () => {
		navigate("/profile");
	};

	return (
		<div className="relative h-16 border-b-2 border-wLineLightBlue overflow-hidden flex">
			<span className="absolute hidden md:block -top-48 left-0 rotate-45 bg-wLineLightBlue w-[2px] h-[500px]"></span>
			<span className="absolute  hidden md:block -top-48 left-5 rotate-45 bg-wLineLightBlue w-[2px] h-[500px]"></span>
			<span className="absolute  -top-48 left-0 md:left-24 rotate-0 md:rotate-45 bg-wLineLightBlue w-full md:w-64 h-[500px] z-10"></span>
			<span className="absolute  hidden md:block -top-48 left-[425px] rotate-45 bg-wLineLightBlue w-[2px] h-[500px] z-10"></span>
			<span className="absolute  hidden md:block -top-48 left-[445px] rotate-45 bg-wLineLightBlue w-[2px] h-[500px] z-10"></span>
			<div className="absolute w-full md:w-[505px] flex items-center justify-center gap-4 h-full ">
				<h1 className="items-center flex z-10 text-teal-400 font-bold text-[35px]">
					SIKAP
				</h1>
				{/* <text className="items-center flex z-10 text-white font-light text-[30px]">
					Haji & Umroh
				</text> */}
			</div>
			<div className=" w-full flex items-center ml-[20rem] "></div>

			<div className=" flex items-center mx-2">
				<button
					onClick={handleToPanel}
					className="bg-wLineLightBlue px-2 py-1 rounded-lg text-wGreenFlat font-semibold ring-2 ring-wGreenFlat"
				>
					<LuLayoutPanelLeft size={20}></LuLayoutPanelLeft>
				</button>
			</div>
		</div>
	);
};

export default HeaderMonitor;
