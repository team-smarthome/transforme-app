import { IoLocation } from "react-icons/io5";
import { IoArrowRedoOutline } from "react-icons/io5";
import { useState } from "react";
import gambarMaps from "../../../../assets/cimahi_map.jpeg";
import LapanganBola from "../../../../assets/lapangan_bola.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiIndoorMap, apiIndoorMapV2 } from "../../../services/api";
import BuildingTemplate from "./BuildingTemplate";

const areaData = [
  {
    id: "1e02cbf5-ba14-433d-9776-0724755fa032",
    nama: "Gedung Olahraga",
    position: "absolute top-[57.5%] right-[15%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Olahraga",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-olahraga",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[75%] mt-[-75%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e12cbf5-ba14-433d-9776-0724755fb032",
    nama: "Gedung Pengamanan",
    position: "absolute top-[10%] right-[58%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Pengamanan",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-pengamanan",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[75%] mt-[75%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbd5-ba14-433d-9776-0724755fb032",
    nama: "Gedung Otmil 3",
    position: "absolute top-[45%] right-[58.3%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Otmil 3",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-otmil-3",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[75%] mt-[-75%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf2-ba14-433d-9776-0724755fb032",
    nama: "Gedung Pengamanan 2",
    position: "absolute top-[83%] right-[58%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Pengaman 2",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-pengamanan-2",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[60%] mt-[-75%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9176-0724755fb032",
    nama: "Gedung Pencakar Langit",
    position: "absolute top-[3%] right-[32%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Pencakar Langit",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-pencakar-langit",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[60%] mt-[70%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9786-0724755fb032",
    nama: "Gedung Musik",
    position: "absolute top-[3%] right-[-2%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Musik",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-musik",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "mr-[120%] mt-[80%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9776-0124755fb032",
    nama: "Gedung Otmil 2",
    position: "absolute top-[35%] right-[16%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Omtmil 2",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-otmil-2",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "mr-[155%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9776-0724755fb092",
    nama: "Gedung Otmil 1",
    position: "absolute top-[90%] right-[34%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Otmil 1",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-otmil-1",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "mt-[-80%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9776-0724755fb044",
    nama: "Gedung Sipir",
    position: "absolute top-[90%] right-[-6%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Test sdssdsds",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-sipir",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "mt-[-72%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9776-0724755fb011",
    nama: "Gedung Serba Guna",
    position: "absolute top-[43.7%] right-[70.6%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Serba Guna",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-serba-guna",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[40%] mt-[80%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9776-0724755fb031",
    nama: "Gedung Parkir 1",
    position: "absolute top-[85.7%] right-[72%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Parkir 1",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-parkir-1",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[40%] mt-[-80%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9776-0724755fb032",
    nama: "Gedung Parkir 2",
    position: "absolute top-[5%] right-[72%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Parkir 2",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-parkir-2",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    showStayling: {
      show1: "ml-[40%] mt-[80%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "1e02cbf5-ba14-433d-9776-0724755fb036",
    width: "w-[23%]",
    height: "h-[14%]",
    aspectRatio: "aspect-[23/14]",
    pathname: "gedung-olahraga-1",
    lantai: [
      {
        id: "98cfb24c-38ef-495e-a095-837798c8c19d",
        nama: "Lantai 1 Gedung Olahraga",
        width: "w-[182%]",
        height: "h-[136%]",
        ruangan: [],
      },
      {
        id: "9c88dfe2-7950-4b5d-b5ff-a3cff69785a0",
        nama: "Lantai-lantaian",
        width: "w-[182%]",
        height: "h-[5%]",
        ruangan: [],
      },
    ],
    nama: "Gedung Olahraga 1",
    position: "absolute top-[47%] right-[-9.6%]",
    imgSrc: LapanganBola,
    buildingName: "Gedung Olahraga 1",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed flex-row-reverse gap-1",
    showStayling: {
      show1: "mr-[40%] mt-[80%]",
      show2: "w-[120%]",
    },
  },
];
const dataIndoorMap = {
  layer1: {
    gedung: areaData,
  },
  layer2: {
    gedung: areaData,
  },
  layer3: {
    gedung: areaData,
  },
};
interface BuildingAreaProps {
  handleClickBuilding: any;
}

function BuildingStaticFromImage({ handleClickBuilding }: BuildingAreaProps) {
  ``;
  const [showBuilding, setShowBuilding] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setShowBuilding(index);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowBuilding(null);
    }, 2000);
  };

  console.log(dataIndoorMap, "dataIndoorMap");

  return (
    <div className="relative w-full h-[90%] mt-10 ">
      <img
        src={gambarMaps}
        alt="gambarmap"
        className="w-full h-full object-fill"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        {dataIndoorMap.layer1.gedung.map((area, index) => (
          <div
            key={index}
            className={`absolute ${area.position} transform -translate-x-1/2 -translate-y-1/2 w-[20%] flex justify-center items-center gap-1 flex-col-reverse`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`${area.textStyle}`}>
              <IoLocation className="text-4xl text-red-400" />
              <p className="text-white text-sm font-light">{area.nama}</p>
            </div>
            {showBuilding === index && (
              <div
                className={`w-full ${area.showStayling?.show1} flex flex-col rounded-lg`}
              >
                <div className="bg-blue-500 h-25 rounded-t-lg">
                  <img
                    src={area.imgSrc}
                    alt={area.nama}
                    className="h-25 w-full object-cover"
                  />
                </div>
                <div className="bg-white h-15 rounded-b-lg flex items-center px-4">
                  <div className={`text-slate-900 ${area.showStayling?.show2}`}>
                    <h2 className="font-bold">{area.buildingName}</h2>
                    <p>{area.description}</p>
                  </div>
                  <IoArrowRedoOutline
                    className="text-slate-900 w-[30%] h-8 hover:text-red-400 cursor-pointer"
                    onClick={() =>
                      handleClickBuilding(
                        dataIndoorMap.layer1.gedung,
                        area.id,
                        dataIndoorMap
                      )
                    }
                    // onClick={() =>
                    //   navigate(
                    //     `/dashboard/peta/${area.nama
                    //       .replace(/\s/g, "-")
                    //       .toLowerCase()}`
                    //   )
                    // }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuildingStaticFromImage;