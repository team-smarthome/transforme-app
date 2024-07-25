import { useAtom } from "jotai";
import { DashboardIcon, PetaIcon } from "../components/Icons";
import MenuItem from "../components/MenuItem";

import Logo from "../images/logo/logo.png";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { selectedRoutess } from "../utils/atomstates";

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
    <div className="min-h-screen dark:text-bodydark" style={backgroundStyle}>
      {/* <div className="min-h-screen absolute inset-0 " style={overlayStyle}></div> */}
      <div className="absolute inset-0 bg-black opacity-50 h-screen"></div>
      <div className="flex justify-center items-center gap-x-4 bg-transparent-dark1 backdrop-blur w-full py-5 fixed z-10">
        <img src={Logo} alt="Logo" className="w-50" />
        <span className="text-3xl text-white font-bold tracking-wider">
          Monitoring System
        </span>
      </div>

      <div className="pb-20 pt-50 px-80 overflow-y-auto grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-2 2xl:gap-20 relative z-999">
        {routes.map((menu: any) => {
          return (
            <MenuItem
              menu={menu}
              key={menu.id}
              onSelect={() => handleSelectMap(menu.mode, menu.link)}
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
    name: "Dashboard",
    mode: "workstation",
    link: "/dashboard",
    icon: DashboardIcon,
  },
  {
    id: 2,
    name: "Peta",
    mode: "dashboard",
    link: "/peta",
    icon: PetaIcon,
  },
];

export default MainMenu;
