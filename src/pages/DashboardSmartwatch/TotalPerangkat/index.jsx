import React from "react";
import { IoWatchOutline } from "react-icons/io5";
import {
	HiMiniSignal,
	HiMiniSignalSlash,
	HiSignalSlash,
} from "react-icons/hi2";

const TotalPerangkatKomponen = ({ data }) => {
	return (
		<div className="h-full grid grid-rows-3 gap-4">
			<div className="bg-red-500 grid grid-cols-3 rounded-md items-center text-white">
				<div className="col-span-1 flex justify-center ">
					<IoWatchOutline className="h-[40px] w-[40px] "></IoWatchOutline>
				</div>
				<div className="col-span-2 items-center justify-center grid grid-row-2 text-center">
					<h1 className="text-3xl font-semibold animate-pulseCustom">
						{data?.totalPerangkat ? data?.totalPerangkat : 0}
					</h1>
					<h2 className="font-semibold">Taruna</h2>
				</div>
			</div>
			<div className="bg-green-500 grid grid-cols-3 rounded-md items-center text-white">
				<div className="col-span-1 flex justify-center">
					<HiMiniSignal className="h-[40px] w-[40px]"></HiMiniSignal>
				</div>
				<div className="col-span-2 items-center justify-center grid grid-row-2 text-center">
					<h1 className="text-3xl font-semibold animate-pulseCustom">
						{data?.terhubung ? data?.terhubung : 0}
					</h1>
					<h2 className="font-semibold">Terhubung</h2>
				</div>
			</div>
			<div className="bg-yellow-500 grid grid-cols-3 rounded-md items-center text-white">
				<div className="col-span-1 flex justify-center">
					<HiSignalSlash className="h-[40px] w-[40px]"></HiSignalSlash>
				</div>
				<div className="col-span-2 items-center justify-center grid grid-row-2 text-center">
					<h1 className="text-3xl font-semibold animate-pulseCustom">
						{data?.terputus ? data?.terputus : 0}
					</h1>
					<h2 className="font-semibold">Terputus</h2>
				</div>
			</div>
		</div>
	);
};

export default TotalPerangkatKomponen;
