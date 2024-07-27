import { AiOutlineCamera } from "react-icons/ai";
import { BsHddNetwork, BsSmartwatch } from "react-icons/bs";
import { GiMiningHelmet } from "react-icons/gi";
import { LiaRingSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const routeDevice = [
	{
		id: 1,
		name: "Gelang",
		link: "/pengaturan-list/perangkat/gelang",
		icon: <LiaRingSolid size={25} />,
	},
	{
		id: 2,
		name: "Kamera",
		link: "/pengaturan-list/perangkat/kamera",
		icon: <AiOutlineCamera size={25} />,
	},
	{
		id: 3,
		name: "Gateway",
		link: "/pengaturan-list/perangkat/gateway",
		icon: <BsHddNetwork size={25} />,
	},
	{
		id: 3,
		name: "Helmet",
		link: "/pengaturan-list/perangkat/helmet",
		icon: <GiMiningHelmet size={25} />,
	},
	{
		id: 1,
		name: "Smartwatch",
		link: "/pengaturan-list/perangkat/smartwatch",
		icon: <BsSmartwatch size={25} />,
	},
];

const DeviceList = () => {
	return (
		<>
			<div className="container py-[16px]">
				<div className="pb-4">
					<Breadcrumbs url={window.location.href} />
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
					{routeDevice.map((data) => (
						<NavLink to={data.link}>
							<div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
								<div className="flex items-center gap-4">
									<div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
										{data.icon}
									</div>

									<div>
										<h4 className="text-title-md font-bold text-black dark:text-white">
											{data.name}
										</h4>
										<span className="text-sm font-medium">
											{" "}
											{data.name}
										</span>
									</div>
								</div>
							</div>{" "}
						</NavLink>
					))}
				</div>
			</div>
		</>
	);
};

export default DeviceList;
