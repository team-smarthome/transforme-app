// import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import { dataGedung } from "../../../utils/constants";
import Gateway from "../../../components/BuildingMap/components/Gateway";
import Camera from "../../../components/BuildingMap/components/Camera";
import MapToggleButtons from "../../../components/BuildingMap/components/MapToggleButtons";
import { useAtom } from "jotai";
import {
  NASVisibleAtom,
  NVRVisibleAtom,
  accessDoorVisibleAtom,
  cameraVisibleAtom,
  faceRecognitionVisibleAtom,
  gatewayVisibleAtom,
  interactiveDesktopVisibleAtom,
  interactiveTVisibleAtom,
  routerVisibleAtom,
  selfRegKioskVisibleAtom,
  wbpVisibleAtom,
  allVisibleAtom,
  pengunjungVisibleAtom,
  petugasVisibleAtom,
  isToggleWithDescriptionAtom,
} from "../../../utils/atomstates";
import { HiExclamationCircle } from "react-icons/hi2";
// import { useHistory } from "react-router-dom";
import { useNavigation } from "react-router-dom";

import AccessDoor from "../../../components/BuildingMap/components/AccessDoor";
import FaceRecognition from "../../../components/BuildingMap/components/FaceRecognition";
import InteractiveDesktop from "../../../components/BuildingMap/components/InteractiveDesktop";
import InteractiveTV from "../../../components/BuildingMap/components/InteractiveTV";
import SelfRegKiosk from "../../../components/BuildingMap/components/SelfRegKiosk";
import NVR from "../../../components/BuildingMap/components/NVR";
import { set } from "react-hook-form";
import WBP from "../../../components/BuildingMap/components/WBP";
import Petugas from "../../../components/BuildingMap/components/Petugas";
import Pengunjung from "../../../components/BuildingMap/components/Pengunjung";
import { apiIndoorMap, apiPeopleDummy } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Room = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allVisible, setAllVisible] = useAtom(allVisibleAtom);
  const [gatewayVisible, setGatewayVisible] = useAtom(gatewayVisibleAtom);
  const [WBPVisible, setWBPVisible] = useAtom(wbpVisibleAtom);
  let [petugasVisible, setPetugasVisible] = useAtom(petugasVisibleAtom);
  let [pengunjungVisible, setPengunjungVisible] = useAtom(
    pengunjungVisibleAtom
  );
  const [routerVisible, setRouterVisible] = useAtom(routerVisibleAtom);
  const [cameraVisible, setCameraVisible] = useAtom(cameraVisibleAtom);
  const [accessDoorVisible, setAccessDoorVisible] = useAtom(
    accessDoorVisibleAtom
  );
  const [faceRecognitionVisible, setFaceRecognitionVisible] = useAtom(
    faceRecognitionVisibleAtom
  );
  const [interactiveDesktopVisible, setInteractiveDesktopVisible] = useAtom(
    interactiveDesktopVisibleAtom
  );
  const [interactiveTVisible, setInteractiveTVisible] = useAtom(
    interactiveTVisibleAtom
  );
  const [selfRegKioskVisible, setSelfRegKioskVisible] = useAtom(
    selfRegKioskVisibleAtom
  );
  const [NVRVisible, setNVRVisible] = useAtom(NVRVisibleAtom);
  const [NASVisible, setNASVisible] = useAtom(NASVisibleAtom);
  const [isToggleWithDescription, setIsToggleWithDescription] = useAtom(
    isToggleWithDescriptionAtom
  );
  const {
    data,
    lantaiSekarang,
    dataRuangan,
    gedungId,
    gedungName,
    currentLantaiId,
  } = location.state;
  const { data: dynamicData } = useQuery({
    queryKey: ["mapdata"],
    queryFn: apiIndoorMap,
    staleTime: Infinity,
  });
  const findRoomFromLayer3 = dynamicData?.data?.records?.layer3?.gedung
    ?.find((data) => data?.id == gedungId)
    ?.lantai[lantaiSekarang]?.ruangan?.find(
      (ruangan) => ruangan?.id == data?.id
    );
  console.log(findRoomFromLayer3, "findRoomFromLayer3");
  console.log(gedungId, "gedungId");
  console.log(lantaiSekarang, "lantaiSekarang");
  // console.log(dataGedung.layer3.gedung, "dataGedung.layer3.gedung");
  console.log(dataGedung.layer3, "dataGedung.layer3.gedung");
  console.log(dataRuangan, "dataRuangan");
  console.log(location, "location.state");

  const toggleAllVisibility = () => {
    const areAllVisible =
      gatewayVisible &&
      routerVisible &&
      cameraVisible &&
      accessDoorVisible &&
      faceRecognitionVisible &&
      interactiveDesktopVisible &&
      interactiveTVisible &&
      selfRegKioskVisible &&
      NVRVisible &&
      NASVisible &&
      WBPVisible &&
      petugasVisible &&
      pengunjungVisible;

    setAllVisible(!areAllVisible);
    setWBPVisible(!areAllVisible);
    setPetugasVisible(!areAllVisible);
    setPengunjungVisible(!areAllVisible);
    setGatewayVisible(!areAllVisible);
    setRouterVisible(!areAllVisible);
    setCameraVisible(!areAllVisible);
    setAccessDoorVisible(!areAllVisible);
    setFaceRecognitionVisible(!areAllVisible);
    setInteractiveDesktopVisible(!areAllVisible);
    setInteractiveTVisible(!areAllVisible);
    setSelfRegKioskVisible(!areAllVisible);
    setNVRVisible(!areAllVisible);
    setNASVisible(!areAllVisible);
  };

  const toggleVisibility = (setVisible) => {
    setVisible((prev) => !prev);
    setAllVisible((prevState) => {
      const allVisible =
        gatewayVisible &&
        routerVisible &&
        cameraVisible &&
        accessDoorVisible &&
        faceRecognitionVisible &&
        interactiveDesktopVisible &&
        interactiveTVisible &&
        selfRegKioskVisible &&
        NVRVisible &&
        NASVisible &&
        WBPVisible &&
        petugasVisible &&
        pengunjungVisible;
      return allVisible;
    });
  };

  const toggleWBPVisibility = () => {
    toggleVisibility(setWBPVisible);
  };

  const togglePetugasVisibility = () => {
    toggleVisibility(setPetugasVisible);
  };

  const togglePengunjungVisibility = () => {
    toggleVisibility(setPengunjungVisible);
  };

  const toggleGatewayVisibility = () => {
    toggleVisibility(setGatewayVisible);
  };

  const toggleRouterVisibility = () => {
    toggleVisibility(setRouterVisible);
  };

  const toggleCameraVisibility = () => {
    toggleVisibility(setCameraVisible);
  };

  const toggleAccessDoorVisibility = () => {
    toggleVisibility(setAccessDoorVisible);
  };

  const toggleFaceRecognitionVisibility = () => {
    toggleVisibility(setFaceRecognitionVisible);
  };

  const toggleInteractiveDesktopVisibility = () => {
    toggleVisibility(setInteractiveDesktopVisible);
  };

  const toggleInteractiveTVisibility = () => {
    toggleVisibility(setInteractiveTVisible);
  };

  const toggleSelfRegKioskVisibility = () => {
    toggleVisibility(setSelfRegKioskVisible);
  };

  const toggleNVRVisibility = () => {
    toggleVisibility(setNVRVisible);
  };

  const toggleNASVisibility = () => {
    toggleVisibility(setNASVisible);
  };

  const toggleWithDescription = () => {
    setIsToggleWithDescription((prev) => !prev);
  };

  // const filteredDataLayerThree = dataGedung.layer3.gedung.find((list) => list)
  // console.log("room", data);
  // console.log(findRoomFromLayer3, "findRoomFromLayer3")
  // console.log(currentLantaiId, "currentLantaiId")
  // console.log(dataRuangan, "dataRuangan")
  const [peopleData, setPeopleData] = useState([]);
  let peopleParams = {
    currentLayer: 3,
    gedungId: gedungId,
    lantaiId: currentLantaiId,
    ruanganId: findRoomFromLayer3.id,
  };
  async function getPeopleData() {
    try {
      const res = await apiPeopleDummy(peopleParams);
      setPeopleData(res.data.records);
      // console.log(res, "res people")
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPeopleData();
    setInterval(() => {
      getPeopleData();
    }, 5000);
  }, []);

  const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

  const fadeInStyle = {
    animationName: "fadeIn",
    animationDuration: "1000ms", // Define the animation duration here
  };

  function getOrientation(aspectRatio: any) {
    if (!aspectRatio) return "square"; // default case

    const match = aspectRatio.match(/aspect-\[(\d+)\/(\d+)\]/);
    if (!match) return "invalid"; // handle invalid aspect ratio format

    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);

    if (width > height) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  return (
    <div style={{ ...fadeInStyle }}>
      <MapToggleButtons
        allVisible={allVisible}
        toggleAllVisibility={toggleAllVisibility}
        toggleWBPVisibility={toggleWBPVisibility}
        WBPVisible={WBPVisible}
        togglePetugasVisibility={togglePetugasVisibility}
        petugasVisible={petugasVisible}
        togglePengunjungVisibility={togglePengunjungVisibility}
        pengunjungVisible={pengunjungVisible}
        toggleGatewayVisibility={toggleGatewayVisibility}
        gatewayVisible={gatewayVisible}
        toggleRouterVisibility={toggleRouterVisibility}
        routerVisible={routerVisible}
        toggleCameraVisibility={toggleCameraVisibility}
        cameraVisible={cameraVisible}
        toggleAccessDoorVisibility={toggleAccessDoorVisibility}
        accessDoorVisible={accessDoorVisible}
        toggleFaceRecognitionVisibility={toggleFaceRecognitionVisibility}
        faceRecognitionVisible={faceRecognitionVisible}
        toggleInteractiveDesktopVisibility={toggleInteractiveDesktopVisibility}
        interactiveDesktopVisible={interactiveDesktopVisible}
        toggleInteractiveTVisibility={toggleInteractiveTVisibility}
        interactiveTVisible={interactiveTVisible}
        toggleSelfRegKioskVisibility={toggleSelfRegKioskVisibility}
        selfRegKioskVisible={selfRegKioskVisible}
        toggleNVRVisibility={toggleNVRVisibility}
        NVRVisible={NVRVisible}
        toggleNASVisibility={toggleNASVisibility}
        NASVisible={NASVisible}
        toggleWithDescription={toggleWithDescription}
        isToggleWithDescription={isToggleWithDescription}
      />
      <div className="w-full h-[83vh] flex items-center justify-between bg-slate-50">
        {/* Select ruangan */}
        <div
          className={`${
            findRoomFromLayer3?.aspectRatio ?? "aspect-[8/8]"
          } content-center p-4 ${
            getOrientation(findRoomFromLayer3?.aspectRatio) === "horizontal"
              ? "min-w-[60%] transform -translate-x-1/2 left-[50%] relative "
              : "h-[83vh] transform -translate-x-1/2 left-[50%] relative "
          }`}
        >
          <div className="h-full w-full bg-white relative border-4 border-black animate-popupin">
            {peopleData?.wbpProfile?.map((obj: any, i: number) => (
              <WBP visible={WBPVisible} item={obj} />
            ))}
            {peopleData?.petugas?.map((obj: any, i) => (
              <Petugas visible={petugasVisible} item={obj} />
            ))}
            {peopleData?.pengunjung?.map((obj: any, i) => (
              <Pengunjung visible={pengunjungVisible} item={obj} />
            ))}
            {findRoomFromLayer3?.gateway?.map((data, index) => {
              return (
                <Gateway
                  visible={gatewayVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {findRoomFromLayer3?.cameras?.map((data, index) => {
              return (
                <Camera
                  visible={cameraVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {findRoomFromLayer3?.accessDoor?.map((data, index) => {
              return (
                <AccessDoor
                  visible={accessDoorVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {findRoomFromLayer3?.faceRecognition?.map((data, index) => {
              return (
                <FaceRecognition
                  visible={faceRecognitionVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {findRoomFromLayer3?.interactiveDesktop?.map((data, index) => {
              return (
                <InteractiveDesktop
                  visible={interactiveDesktopVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {findRoomFromLayer3?.interactiveTV?.map((data, index) => {
              return (
                <InteractiveTV
                  visible={interactiveTVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {findRoomFromLayer3?.selfRegKiosk?.map((data, index) => {
              return (
                <SelfRegKiosk
                  visible={selfRegKioskVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
            {findRoomFromLayer3?.nvr?.map((data, index) => {
              return (
                <NVR
                  visible={NVRVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data.item}
                />
              );
            })}
          </div>
        </div>
        {findRoomFromLayer3 ? (
          <div className="text-black absolute left-[5%] top-[20%] font-semibold">
            {/* {findRoomFromLayer3.nama} */}
            <Breadcrumb
              url={window.location.href}
              pageName={findRoomFromLayer3.nama}
            />
          </div>
        ) : (
          <>Room Not Found</>
        )}
        {/* select floor */}
        <div className="flex flex-col justify-between w-[10%] h-full  bg-neutral-950 ">
          <div
            className="flex flex-col h-[50%]  items-start w-full gap-4  bg-neutral-950 px-1 pt-2
          overflow-y-auto scrollbar-hide
          "
          >
            {" "}
            {/* {filteredDataLayerTwo?.lantai.map((data, index) => {
      return (
        <button
          className={`w-full  ${
            currentFloor === index ? "bg-slate-400" : "bg-slate-700"
          } text-bodydark1 rounded-lg text-xl text-center py-2 font-bold hover:bg-slate-600 transition-all ease-in duration-200`}
          onClick={() => handleSelectFloor(index)}
        >
          {data.nama}
        </button>
      );
    })} */}
            <button
              className="w-full bg-slate-700 rounded-lg text-lg py-2 text-center font-bold hover:bg-slate-400 hover:text-neutral-950 transition-all ease-in duration-200"
              onClick={() => {
                navigate(-1); // Navigate back one step in the history stack
              }}
              onMouseEnter={(e) => {
                console.log("Previous page:", gedungName);
              }}
            >
              <div className="">Kembali</div>
              <div className="text-[7px] mt-0">{gedungName}</div>
            </button>
          </div>
          <div className="flex flex-col h-[40%] items-start w-full gap-4  bg-neutral-950 px-1 pb-2">
            <div
              className="w-full h-full rounded-lg  py-2  bg-slate-700  hover:bg-slate-400 hover:text-neutral-950  transition-all ease-in duration-200 cursor-pointer "
              // onClick={() => navigate("/peta")}
            >
              <p className="text-center text-xs font-semibold ">Keterangan</p>
              <div className="flex justify-between px-1 text-xs">
                <div className="flex gap-1 justify-center items-center">
                  <HiExclamationCircle aria-placeholder="Tersangka" />
                  <p>Tersangka</p>
                </div>
                <p>18</p>
              </div>
              <div className="flex justify-between px-1 text-xs">
                <div className="flex gap-1 justify-center items-center">
                  <HiExclamationCircle aria-placeholder="Tersangka" />
                  <p>Pengunjung</p>
                </div>
                <p>18</p>
              </div>
              <div className="flex justify-between px-1 text-xs">
                <div className="flex gap-1 justify-center items-center">
                  <HiExclamationCircle aria-placeholder="Tersangka" />
                  <p>Petugas</p>
                </div>
                <p>18</p>
              </div>
              <div className="flex justify-between px-1 text-xs">
                <div className="flex gap-1 justify-center items-center">
                  <HiExclamationCircle aria-placeholder="Tersangka" />
                  <p>Kamera</p>
                </div>
                <p>18</p>
              </div>
              <div className="flex justify-between px-1 text-xs">
                <div className="flex gap-1 justify-center items-center">
                  <HiExclamationCircle aria-placeholder="Tersangka" />
                  <p>Gateway</p>
                </div>
                <p>18</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
