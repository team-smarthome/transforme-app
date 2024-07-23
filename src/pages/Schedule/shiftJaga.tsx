import { NavLink } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { useEffect } from "react";

const dataAppMode = localStorage.getItem("appMode");
console.log(dataAppMode, "dataAppModeShiftJaga");

const routeMasterData = [
  {
    id: 1,
    name: "Jadwal Shift Kerja",
    link: `/${dataAppMode}/shift-jaga/calendar-shift`,
    icon: <MdOutlinePermContactCalendar size={26} />,
  },
  {
    id: 2,
    name: "Grup Petugas Shift",
    link: `/${dataAppMode}/shift-jaga/group-shift`,
    icon: <HiOutlineUserGroup size={25} />,
  },
  {
    id: 3,
    name: "Data Shift",
    link: `/${dataAppMode}/shift-jaga/data-schedule-shift`,
    icon: <FaUserClock size={22} />,
  },
  {
    id: 4,
    name: "Data Penugasan",
    link: `/${dataAppMode}/shift-jaga/penugasan`,
    icon: <BiTask size={25} />,
  },
];

const MasterDataList = () => {
  return (
    <div>
      <div className="pl-6 py-4">
        <Breadcrumbs url={window.location.href} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mx-6">
        {routeMasterData.map((data) => (
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
                  <span className="text-sm font-medium"> {data.name}</span>
                </div>
              </div>
            </div>{" "}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MasterDataList;
