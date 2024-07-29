import { useAtom } from "jotai";

import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

import { selectedRoutess } from "../../../utils/atomstates";
import { DeviceIcon, PetaIcon , ManufacturingIcon, FirmwareIcon} from "./IconMenuSmartwatch";
import { GoVersions } from "react-icons/go";
import MenuItem from "./MenuItemSmartwatch";

const MainMenu = () => {
	const navigate = useNavigate();
	const [selectedMenu, setSelectedMenu] = useAtom(selectedRoutess);

	const handleSelectMap = (data: string, link: string) => {
		navigate(`${link}`);
		setSelectedMenu(data);
		localStorage.setItem("appMode", data);
	};

	const backgroundStyle = {
		backgroundColor: "#0d1f3c",
	};
	return (
		<div
		// className="min-h-screen dark:text-bodydark"
		// style={backgroundStyle}
		>
			{/* <div className="min-h-screen absolute inset-0 " style={overlayStyle}></div> */}

			<div className="pb-20 pt-50 px-80 overflow-y-auto grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-2 2xl:gap-20 relative z-999">
				{routes.map((menu: any) => {
					return (
						<MenuItem
							menu={menu}
							key={menu.id}
							onSelect={() =>
								handleSelectMap(menu.mode, menu.link)
							}
						/>
					);
				})}
			</div>
		</div>
	);
};

const routes = [
	{
		id: 1,
		name: "Device",
		mode: "workstation",
		link: "/pengaturan-list/perangkat/smartwatch-list",
		icon: DeviceIcon,
	},
	{
		id: 2,
		name: "Peta",
		mode: "dashboard",
		link: "/peta",
		icon: PetaIcon,
	},
	{
		id: 3,
		name: "Firmware",
		mode: "transforme-monitoring",
		link: "/pengaturan-list/perangkat/smartwatch/firmware",
		icon: FirmwareIcon,
	},
	{
		id: 5,
		name: "manufacture",
		mode: "transforme-monitoring",
		link: "/pengaturan-list/perangkat/smartwatch/manufacture",
		icon: ManufacturingIcon,
	}
	
];

export default MainMenu;
