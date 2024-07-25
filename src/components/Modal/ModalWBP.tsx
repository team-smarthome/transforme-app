import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
	ExclamationTriangleIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { AiOutlineCopy } from "react-icons/ai";
import {
	formatDMAC,
	formatDate,
	setZonaColor,
} from "../../utils/globalFunctions";
import { webserviceurl } from "../../services/api";
import { SendAlert } from "../BuildingMap/components/SendAlert";
import { apiReadAllWBP } from "../../services/api";
import { useEffect, useState } from "react";
import { TbHeartRateMonitor } from "react-icons/tb";
import { MdBloodtype } from "react-icons/md";
import Loader from "../../common/Loader";
interface ModalWBPProps {
	item: any;
	handleClose: any;
}

function ModalWBP({ handleClose, item }: ModalWBPProps) {
	let [detailWBP, setDetailWBP] = useState<any>({});
	const [isLoading, setIsLoading] = useState(false);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		SendAlert.fire({
			icon: "success",
			title: "Berhasil salin ke clipboard",
		});
	};
	useEffect(() => {
		setIsLoading(true);

		let params = {
			nama: item.nama,
		};
		apiReadAllWBP(params).then((res) => {
			// console.log(res.data.records[0].kamera_log, "data detail wbp");
			setDetailWBP(res.data.records[0]);
			setIsLoading(false);
		});
	}, []);

	const {
		nama,
		foto_wajah,
		DMAC,
		nrp,
		nomor_tahanan,
		nama_matra,
		nama_pangkat,
		nama_kesatuan,
		nama_lokasi_kesatuan,
		tempat_lahir,
		tanggal_lahir,
		jenis_kelamin,
		nama_provinsi,
		nama_kota,
		nama_pendidikan,
		nama_kontak_keluarga,
		hubungan_kontak_keluarga,
		nomor_kontak_keluarga,
	} = item;

	const dataLog = [
		{
			trackingDate: "2024-07-24",
			heartRate: 72,
			bloodPressure: "120/80",
			latitude: "37.7749° N",
			longitude: "122.4194° W",
			status: "Normal",
		},
		{
			trackingDate: "2024-07-23",
			heartRate: 85,
			bloodPressure: "130/85",
			latitude: "34.0522° N",
			longitude: "118.2437° W",
			status: "Elevated",
		},
		{
			trackingDate: "2024-07-22",
			heartRate: 90,
			bloodPressure: "140/90",
			latitude: "40.7128° N",
			longitude: "74.0060° W",
			status: "High",
		},
		{
			trackingDate: "2024-07-21",
			heartRate: 60,
			bloodPressure: "110/70",
			latitude: "51.5074° N",
			longitude: "0.1278° W",
			status: "Normal",
		},
		{
			trackingDate: "2024-07-20",
			heartRate: 78,
			bloodPressure: "125/80",
			latitude: "48.8566° N",
			longitude: "2.3522° E",
			status: "Normal",
		},
	];
	return isLoading ? (
		<Loader />
	) : (
		<div className="w-full text-white">
			<section className="w-full flex px-4 py-4 justify-between">
				<button type="button" onClick={handleClose}>
					<p className="font-semibold text-lg">
						Hasil Pencarian Data
					</p>
				</button>
				<button type="button" onClick={handleClose}>
					<XMarkIcon className="w-6 h-6" />
				</button>
			</section>

			<div className="flex justify-between px-6 mb-4 gap-x-6">
				<section className="w-40 h-40 bg-map-outdoor">
					<img
						className="w-full h-36 object-cover"
						src={
							"data:image/jpeg;base64,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"
						}
						alt=""
					/>
					{/* <img
          className="w-full h-full object-cover"
          src={webserviceurl + foto_wajah}
          alt=""
        /> */}
				</section>

				<section className="flex flex-col gap-4 w-64  px-2">
					<div>
						<h1 className="font-bold text-xl">{nama}</h1>
						<h1>{nrp}</h1>
					</div>
					<div className="flex justify-between">
						<h1>DMAC</h1>
						<div className="flex items-center w-32 h-6 border-2 border-slate-500 px-2 py-2">
							<p>{DMAC}</p>
						</div>
					</div>
					<div className="flex justify-between">
						<h1>No Pegawai</h1>
						<div className="flex items-center w-32 h-6 border-2 border-slate-500 px-2 py-2">
							<p>{nomor_tahanan}</p>
						</div>
					</div>
					<div className="flex justify-between">
						<h1>Jenis Kelamin</h1>
						<div className="flex items-center w-32 h-6 border-2 border-slate-500 px-2 py-2">
							<p>
								{jenis_kelamin == 1 ? "Laki-laki" : "Perempuan"}
							</p>
						</div>
					</div>
				</section>
				<section className="w-52 h-36 border-2 border-slate-500 px-2 py-4">
					<h1 className="font-bold text-xl text-center">Position</h1>
					<div className="flex justify-between mt-2">
						<h1>Latitude :</h1>
						<h1 className="font-bold">24.12341345</h1>
					</div>
					<div className="flex justify-between mt-4">
						<h1>Longtitude :</h1>
						<h1 className="font-bold">39.23341345</h1>
					</div>
				</section>
			</div>

			<div className="w-11/12 flex justify-between px-8">
				<h1>Alamat</h1>
				<div className="flex items-center w-9/12 h-6 border-2 border-slate-500 px-2 py-2">
					<p>{nama_provinsi}</p>
				</div>
			</div>
			<div className="w-11/12 flex justify-between px-8 mt-4">
				<h1>Kota</h1>
				<div className="flex items-center w-9/12 h-6 border-2 border-slate-500 px-2 py-2">
					<p>{nama_kota}</p>
				</div>
			</div>
			<div className="w-11/12 flex justify-between px-8 mt-4">
				<h1>Pendidikan</h1>
				<div className="flex items-center w-9/12 h-6 border-2 border-slate-500 px-2 py-2">
					<p>S1 Ekonomi</p>
				</div>
			</div>
			<div className="w-11/12 flex justify-between px-8 mt-4">
				<h1>No Telepon</h1>
				<div className="flex items-center w-9/12 h-6 border-2 border-slate-500 px-2 py-2">
					<p>082134324443</p>
				</div>
			</div>

			<div className="flex mt-6 items-center justify-center gap-10">
				<div className="flex items-center gap-4">
					<TbHeartRateMonitor size={100} color="#DC143C" />
					<h1 className="text-5xl font-bold text-slate-400">70</h1>
				</div>
				<div className="flex items-center gap-4">
					<MdBloodtype size={100} color="#FF0000" />
					<h1 className="text-5xl font-bold text-slate-400">
						100/80
					</h1>
				</div>
			</div>
			<div className="mt-4 mb-4">
				<p className=" mb-3 text-center bg-slate-500  font-semibold text-white rounded-md mx-8">
					Tracking
				</p>
				<div className="w-full px-8  text-center h-40 overflow-y-scroll">
					<table className=" table-auto overflow-scroll">
						<thead>
							<tr className="bg-slate-700 py-1">
								<th className="text-sm w-1/12">
									Tracking Date
								</th>
								<th className="text-sm w-1/12">Heart Rate</th>
								<th className="text-sm w-1/12">
									Blood Pressure
								</th>
								<th className="text-sm w-1/12">Latitude</th>
								<th className="text-sm w-1/12">Longtitude</th>
								<th className="text-sm w-1/12">Status</th>
							</tr>
						</thead>
						<tbody>
							{dataLog.map((item, index) => (
								<tr key={index} className=" border-b">
									<td className="text-sm py-2">
										{item.trackingDate}
									</td>
									<td className="text-sm py-2">
										{item.heartRate}
									</td>
									<td className="text-sm py-2">
										{item.bloodPressure}
									</td>
									<td className="text-sm py-2">
										{item.latitude}
									</td>
									<td className="text-sm py-2">
										{item.longitude}
									</td>
									<td className="text-sm py-2">
										{item.status}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default ModalWBP;
