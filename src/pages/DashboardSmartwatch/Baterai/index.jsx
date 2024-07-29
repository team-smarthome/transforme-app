import React from "react";
import { IoBatteryFullOutline, IoBatteryHalfOutline } from "react-icons/io5";

const BateraiKomponen = ({ data }) => {
	return (
		<div className="grid grid-cols-3 gap-2 divide-x divide h-full divide-wLineLightBlue  ">
			<div className="flex items-center flex-wrap text-center text-white  ">
				<h1 className="w-full text-xl">Baterai</h1>
			</div>
			<div className="grid grid-cols-2 px-2">
				<div className="items-center justify-center flex flex-col text-center">
					<h1 className="text-3xl text-wGreenFlat animate-pulseCustom">
						{data?.totalBateryLog?.full
							? data?.totalBateryLog?.full
							: 0}
					</h1>
					<h2 className="text-[10px] text-white font-semibold">
						Total Perangkat
					</h2>
				</div>
				<div className="items-center justify-center flex flex-col text-center">
					<IoBatteryFullOutline
						size={40}
						className="text-wGreenFlat"
					></IoBatteryFullOutline>
				</div>
			</div>
			<div className="grid grid-cols-2 px-2 ">
				<div className="items-center justify-center flex flex-col text-center">
					<h1 className="text-4xl text-wYellowFlat animate-pulseCustom">
						{data?.totalBateryLog?.low
							? data?.totalBateryLog?.low
							: 0}
					</h1>
					<h2 className="text-[10px] text-white font-semibold">
						Total Perangkat
					</h2>
				</div>
				<div className="items-center justify-center flex flex-col text-center">
					<IoBatteryHalfOutline
						size={40}
						className="text-wYellowFlat"
					></IoBatteryHalfOutline>
				</div>
			</div>
		</div>
	);
};

export default BateraiKomponen;
