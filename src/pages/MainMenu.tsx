import { useAtom } from "jotai";
import {
  CameraIcon,
  DashboardIcon,
  DatabaseWajahIcon,
  LogWajahIcon,
  LokasiIcon,
  ManajemenPenggunaIcon,
  PelacakanIcon,
  PendaftaranWajahIcon,
  PerangkatIcon,
  PetaIcon,
  PengaturanIcon,
  ChatIcon,
  LogIcon,
} from "../components/Icons";
import MenuItem from "../components/MenuItem";
import BackgroundSecurityImage from "../images/security-background.jpg";
import Logo from "../images/logo/logo.png";
import "tailwindcss/tailwind.css";
import { selectedRoute } from "../utils/atomstates";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useAtom(selectedRoute);
  const backgroundStyle = {
    // backgroundImage: `url(${BackgroundSecurityImage})`,
    backgroundColor: "#0d1f3c",
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // backgroundAttachment: 'fixed',
  };

  const handleSelect = (data: string) => {
    console.log(data, "dataygDipilih");
    setSelectedMenu(data);
    localStorage.setItem("appMode", data);
    if (data === "dashboard") {
      navigate("/dashboard");
      window.location.reload();
    } else {
      navigate("/workstation");
      window.location.reload();
    }
  };

  const handleSelectMap = (appMode: string, path: string) => {
    setSelectedMenu("dashboard");
    console.log(appMode, path, "data yang dipilih");
    navigate(`/dashboard${path}`);
    window.location.reload();
  };

  return (
    <div className="min-h-screen dark:text-bodydark" style={backgroundStyle}>
      {/* <div className="min-h-screen absolute inset-0 " style={overlayStyle}></div> */}
      <div className="absolute inset-0 bg-black opacity-50 h-screen"></div>
      <div className="flex justify-center items-center gap-x-2 bg-transparent-dark1 backdrop-blur w-full py-5 fixed z-10">
        <img src={Logo} alt="Logo" className="w-12" />
        <span className="text-4xl text-white font-bold tracking-wider">
          SIRAM Dashboard LEMASMIL
        </span>
      </div>
      <div className="flex justify-center items-center gap-x-15 pt-27 relative z-999">
        <button
          onClick={() => handleSelect("dashboard")}
          className="bg-slate-500 text-white px-10 py-3 rounded-md hover:bg-slate-700"
        >
          SIRAM Dashboard
        </button>
        <button
          onClick={() => handleSelect("workstation")}
          className="bg-slate-500 text-white px-10 py-3 rounded-md hover:bg-slate-700"
        >
          SIRAM Workstation
        </button>
      </div>
      <div className="pb-20 pt-30 px-20 overflow-y-auto grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20 xl:grid-cols-3 2xl:gap-20 relative z-999">
        {routes.map((menu: any) => {
          return (
            <MenuItem
              menu={menu}
              key={menu.id}
              onSelect={() => handleSelectMap("siram-dashboard", menu.link)}
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
    name: "Statistik",
    link: "/statistic",
    icon: DashboardIcon,
  },
  {
    id: 2,
    name: "Peta",
    link: "/peta",
    icon: PetaIcon,
  },
  {
    id: 3,
    name: "Live Chat",
    link: "/live-chat-list",
    icon: ChatIcon,
  },
];

export default MainMenu;
