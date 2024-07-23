import { IoLocation } from "react-icons/io5";
import { IoArrowRedoOutline } from "react-icons/io5";
import { useState } from "react";
import gambarMaps from "../../../../assets/cimahi_map.jpeg";
import LapanganBola from "../../../../assets/lapangan_bola.jpg";
import Parkir from "../../../../assets/parkir.jpeg";
import Gedung from "../../../../assets/builing.jpeg";
import { useQuery } from "@tanstack/react-query";
import { apiIndoorMapV2 } from "../../../services/api";

const areaData = [
  {
    id: "1",
    nama: "Gedung Olahraga",
    positionX: "top-[57.5%]",
    positionY: "right-[15%]",
    iconStyle: "text-green-location",
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
    id: "2",
    nama: "Gedung Pengamanan",
    positionX: "top-[10%]",
    positionY: "right-[58%]",
    // position: "absolute top-[10%] right-[58%]",
    imgSrc: Gedung,
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
    id: "3",
    nama: "Gedung Otmil 3",
    positionX: "top-[45%]",
    positionY: "right-[58.3%]",
    // position: "absolute top-[45%] right-[58.3%]",
    iconStyle: "text-red-600",
    imgSrc: Gedung,
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
    id: "4",
    nama: "Gedung Pengamanan 2",
    positionX: "top-[83%]",
    positionY: "right-[58%]",
    // position: "absolute top-[83%] right-[58%]",
    imgSrc: Gedung,
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
    id: "5",
    nama: "Gedung Pencakar Langit",
    positionX: "top-[3%]",
    positionY: "right-[32%]",
    iconStyle: "text-green-location",
    // position: "absolute top-[3%] right-[32%]",
    imgSrc: Gedung,
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
    id: "6",
    nama: "Gedung Musik",
    positionX: "top-[3%]",
    positionY: "right-[-2%]",
    iconStyle: "text-green-location",
    // position: "absolute top-[3%] right-[-2%]",
    imgSrc: Gedung,
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
      show1: "mt-[80%]",
      show2: "w-[120%]",
    },
  },
  {
    id: "7",
    nama: "Gedung Otmil 2",
    positionX: "top-[35%]",
    positionY: "right-[16%]",
    iconStyle: "text-red-600",
    // position: "absolute top-[35%] right-[16%]",
    imgSrc: Gedung,
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
    id: "8",
    nama: "Gedung Otmil 1",
    positionX: "top-[90%]",
    positionY: "right-[34%]",
    iconStyle: "text-red-600",
    // position: "absolute top-[90%] right-[34%]",
    imgSrc: Gedung,
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
    id: "9",
    nama: "Gedung Sipir",
    positionX: "top-[90%]",
    positionY: "right-[-6%]",

    // position: "absolute top-[90%] right-[-6%]",
    imgSrc: Gedung,
    buildingName: "Gedung Sipir",
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
    id: "10",
    nama: "Gedung Pemeriksaan",
    positionX: "top-[43.7%]",
    positionY: "right-[70.6%]",
    iconStyle: "text-green-location",
    // position: "absolute top-[43.7%] right-[70.6%]",
    imgSrc: Gedung,
    buildingName: "Gedung Pemeriksaan",
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
    id: "11",
    nama: "Gedung Parkir Selatan",
    positionX: "top-[85.7%]",
    positionY: "right-[72%]",
    iconStyle: "text-blue-location",
    // position: "absolute top-[85.7%] right-[72%]",
    imgSrc: Parkir,
    buildingName: "Gedung Parkir Selatan",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-parkir-selatan",
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
    id: "12",
    nama: "Gedung Parkir Utara",
    positionX: "top-[5%]",
    positionY: "right-[72%]",
    iconStyle: "text-blue-location",
    // position: "absolute top-[5%] right-[72%]",
    imgSrc: Parkir,
    buildingName: "Gedung Parkir Utara",
    description: "Otmil Cimahi",
    textStyle: "flex items-center cursor-pointer fixed",
    pathname: "gedung-parkir-utara",
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
    id: "13",
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
    positionX: "top-[47%]",
    positionY: "right-[-9.6%]",
    iconStyle: "text-green-location",
    // position: "absolute top-[47%] right-[-9.6%]",
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

function BuildingAreaStatic({ handleClickBuilding }: BuildingAreaProps) {
  const [showBuilding, setShowBuilding] = useState(null);

  const handleMouseEnter = (index: any) => {
    setShowBuilding(index);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowBuilding(null);
    }, 5000);
  };

  const { data: dynamicDataV2 } = useQuery({
    queryKey: ["mapdatav2"],
    queryFn: apiIndoorMapV2,
    staleTime: Infinity,
    // refetchInterval: 5000,
  });

  // const { data: dynamicIndormap } = useQuery({
  //   queryKey: ["mapdatav3"],
  //   queryFn: apiIndoorMapVVIP,
  //   staleTime: Infinity,
  // });

  return (
    <div className="relative w-full h-[90%] mt-10">
      <img
        src={gambarMaps}
        alt="gambarmap"
        className="w-full h-full object-fill"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        {dynamicDataV2?.data.records.layer1.gedung
          .filter(
            (data: any) =>
              !(data.pinX === "right-[0%]" && data.pinY === "top-[0%]")
          )
          .map((area: any, index: any) => (
            <div
              key={index}
              className={`absolute ${area.pinX} ${area.pinY} transform -translate-x-1/2 -translate-y-1/2 w-[20%] flex justify-center items-center gap-1 flex-col-reverse`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`flex items-center cursor-pointer fixed ${
                  area.nama === "Gedung Olahraga 1"
                    ? "flex-row-reverse gap-1"
                    : ""
                }`}
              >
                <IoLocation
                  className={`text-4xl ${
                    area.nama === "Gedung Olahraga 1" ||
                    area.nama === "Gedung Pemeriksaan" ||
                    area.nama === "Gedung Musik" ||
                    area.nama === "Gedung Olahraga 2" ||
                    area.nama === "Gedung Pencakar Langit"
                      ? "text-green-location"
                      : area.nama === "Gedung Pengamanan" ||
                        area.nama === "Gedung Pengamanan 2" ||
                        area.nama === "Gedung Sipir"
                      ? "text-white-600"
                      : area.nama === "Gedung Parkir Selatan" ||
                        area.nama === "Gedung Parkir Utara"
                      ? "text-blue-location"
                      : "text-red-600"
                  }`}
                />
                <p className="text-white text-sm font-light">{area.nama}</p>
              </div>
              {showBuilding === index && (
                <div
                  className={`w-full  ${area.boxX} ${area.boxY} flex flex-col rounded-lg`}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <div className="bg-blue-500 h-25 rounded-t-lg">
                    <img
                      src={
                        area.nama === "Gedung Olahraga 1" ||
                        area.nama === "Gedung Olahraga 2"
                          ? LapanganBola
                          : area.nama === "Gedung Parkir Selatan" ||
                            area.nama === "Gedung Parkir Utara"
                          ? Parkir
                          : Gedung
                      }
                      alt={area.nama}
                      className="h-25 w-full object-cover"
                    />
                  </div>
                  <div className="bg-white h-15 rounded-b-lg flex items-center px-4">
                    <div className={`text-slate-900 w-[120%]`}>
                      <h2 className="font-bold">{area.nama}</h2>
                      <p>Otmil Cimahi</p>
                    </div>
                    <IoArrowRedoOutline
                      className="text-slate-900 w-[30%] h-8 hover:text-red-500 cursor-pointer"
                      onClick={() =>
                        handleClickBuilding(
                          dynamicDataV2?.data?.records?.layer1?.gedung,
                          area.id,
                          dynamicDataV2?.data?.records
                        )
                      }
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

export default BuildingAreaStatic;
