import { BsClipboardData } from "react-icons/bs";
import { MdOutlineWorkHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";

const routeMasterData = [
  {
    id: 1,
    name: "Data Penyidikan",
    link: "/penyidikan",
    icon: <BsClipboardData size={26} />,
  },
  {
    id: 2,
    name: "History Penyidikan",
    link: "/historyPenyidikan",
    icon: <MdOutlineWorkHistory size={25} />,
  },
];

const PenyidikanList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 m-6">
        {routeMasterData.map((data) => (
          <NavLink to={`/${data.link}`}>
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
    </>
  );
};

export default PenyidikanList;
