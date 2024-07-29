import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import styleMap from "./styleMap";
import { FaChevronDown, FaKaaba, FaMosque, FaCircle } from "react-icons/fa";
import { IoBatteryHalf } from "react-icons/io5";
import { HiMapPin } from "react-icons/hi2";

const MapKomponen = ({ data }) => {
	const [rotateCevron, setRotateCevron] = useState(false);
	const [newCenter, setNewCenter] = useState(null);
	const [newZoom, setNewZoom] = useState(null);
	const [activeButton, setActiveButton] = useState(null);
	const [popoverOpen, setPopoverOpen] = useState(null);
	const [defaultProps, setDefaultProps] = useState({
		jakarta: {
			lat: -6.2,
			lng: 106.816666,
		},
		mekkah: {
			lat: 21.4224779,
			lng: 39.8251832,
		},
		madinah: {
			lat: 24.4656568,
			lng: 39.6035538,
		},
		world: {
			lat: 24.774265,
			lng: 46.738586,
		},
		zoomOut: 5,
		zoomIn: 15,
	});

	const switchToIndonesia = () => {
		setNewCenter(defaultProps.jakarta);
		setNewZoom(defaultProps.zoomOut);
		setActiveButton("indonesia");
	};

	const AnyReactComponent = ({ data }) => {
		return (
			<div
				className="relative cursor-pointer"
				onMouseEnter={() => setPopoverOpen(data?.device?.imei)}
				onMouseLeave={() => setPopoverOpen(null)}
			>
				<div className="relative">
					<FaCircle
						size={`${data?.detail?.status === "terhubung" ? 15 : 10}`}
						color={`${data?.detail?.status === "terhubung" ? "#3B82F6" : "#D9523F"}`}
						className="animate-ping"
					/>
					<FaCircle
						size={`${data?.detail?.status === "terhubung" ? 15 : 10}`}
						color={`${data?.detail?.status === "terhubung" ? "#3B82F6" : "#D9523F"}`}
						className="absolute top-0"
					/>
				</div>
				{popoverOpen === data?.device?.imei && (
					<div className="absolute bottom-full mb-2 w-48 p-2 bg-white rounded shadow-lg text-sm text-center">
						{data?.device?.imei}
					</div>
				)}
			</div>
		);
	};

	useEffect(() => {
		switchToIndonesia();
	}, []);

	return (
		<div className="h-full w-full">
			<div className="relative h-full w-full border-2 border-wLineLightBlue rounded-md overflow-hidden">
				<GoogleMapReact
					bootstrapURLKeys={{
						key: "AIzaSyAvM9Ow4c24huLBdFS3dFw9byoNa-UkmfI",
					}}
					options={{
						styles: styleMap.blueStyle,
						fullscreenControl: false,
						zoomControlOptions: false,
					}}
					center={newCenter}
					zoom={newZoom}
					defaultZoom={4}
				>
					{data?.map((item) => (
						<AnyReactComponent
							key={item?.detail?.v_imei}
							lat={item?.detail?.n_lat || 0}
							lng={item?.detail?.n_lng || 0}
							data={item}
						/>
					))}
				</GoogleMapReact>
			</div>
		</div>
	);
};

export default MapKomponen;
