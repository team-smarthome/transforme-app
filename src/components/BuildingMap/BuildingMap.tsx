import {
  SignalIcon,
  VideoCameraIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { GateArea, BuildingArea, BuildingAreaStatic } from "./components";
import Modal, { ModalBuildingMap } from "../Modal";
import MapToggleButtons from "./components/MapToggleButtons";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import Lapisan from "../../../assets/lapisan.jpg";
import Satelit from "../../../assets/satelit.jpg";
import gambarmap from "../../../assets/indormaps.jpeg";
import {
  allVisibleAtom,
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
  petugasVisibleAtom,
  pengunjungVisibleAtom,
  NotificationAtom,
  isToggleWithDescriptionAtom,
  zoneVisibleAtom,
  isSateliteView,
  selectedRoutess,
  isSidebarNotifOpen,
  checkState,
} from "../../utils/atomstates";
import Breadcrumb from "../../components/Breadcrumb";
import { FaBullseye } from "react-icons/fa6";

interface BuildingProps {
  buildingOpen: boolean;
  setBuildingOpen: (arg: boolean) => void;
}

function BuildingMap({ buildingOpen, setBuildingOpen }: BuildingProps) {
  const [selectCheck, setSelectCheck] = useAtom(checkState);
  // const isFirstRender = useRef(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [checkStateBoy] = useAtom(checkState);
  let [sidebarNotifOpen, setSidebarNotifOpen] = useAtom(isSidebarNotifOpen);
  const [selectedMenu, setSelectedMenu] = useAtom(selectedRoutess);
  const navigate = useNavigate();
  const [satelit, setSatelit] = useAtom(isSateliteView);
  const [open, setOpen] = useState(false);
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
  const [zoneVisible, setZoneVisible] = useAtom(zoneVisibleAtom);
  const [detailDataGedung, setDetailDataGedung] = useState({});
  const [isBuilding, setIsBuilding] = useAtom(NotificationAtom);
  const [isToggleWithDescription, setIsToggleWithDescription] = useAtom(
    isToggleWithDescriptionAtom
  );
  const dropdown = useRef<any>(null);

  useEffect(() => {
    setSelectedMenu("dashboard");
    const clickHandler = (e: any) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(e.target) &&
        !buildingOpen
      ) {
        setBuildingOpen(true);
      }
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, [buildingOpen]);

  // useEffect(() => {
  //   console.log(sidebarNotifOpen, "nilaisidebarnyaNotif");
  //   if (checkStateBoy === true) {
  //     setSidebarNotifOpen(true);
  //     setSelectCheck(true);
  //   } else if (checkStateBoy === false) {
  //     setSidebarNotifOpen(false);
  //     setSelectCheck(false);
  //   }

  //   setSelectedMenu("dashboard");
  // }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (arr: any, id: any, data: any, indormapData: any) => {
    console.log(arr, "arr");
    console.log(id, "id");
    console.log(data, "dataTestingBro");
    const filteredData = arr.find((data: any) => data.id == id);
    console.log(filteredData, "filteredData");
    if (filteredData.lantai && filteredData.lantai.length > 0) {
      navigate(`/dashboard/peta/${filteredData?.pathname}`, {
        state: { data: filteredData, data2: data, dataindormap: indormapData },
      });
    } else {
      console.log("gk_ada_cuy");
    }
    setOpen(true);
    console.log(filteredData, "filteredData");
    setDetailDataGedung(filteredData);
  };
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
      pengunjungVisible &&
      zoneVisible;

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
    setZoneVisible(!areAllVisible);
  };

  const toggleVisibility = (setVisible: any) => {
    setVisible((prev: any) => !prev);
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

  let togglePetugasVisibility = () => {
    toggleVisibility(setPetugasVisible);
  };

  let togglePengunjungVisibility = () => {
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
  const toggleZoneVisibility = () => {
    toggleVisibility(setZoneVisible);
  };

  const toggleWithDescription = () => {
    setIsToggleWithDescription((prev) => !prev);
  };

  const handleSelectedSatelit = () => {
    setSatelit((prev) => !prev);
  };

  return (
    <section className="w-full  ">
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
        toggleZoneVisibility={toggleZoneVisibility}
        NASVisible={NASVisible}
        zoneVisible={zoneVisible}
        toggleWithDescription={toggleWithDescription}
        isToggleWithDescription={isToggleWithDescription}
      />

      <aside ref={dropdown} className={`${buildingOpen ? "w-200" : "w-full"}`}>
        <div className="bg-map-outdoor relative w-full px-20 pt-5 pb-10 flex items-center bg-zinc-50 h-[82vh]  justify-center animate-popupin">
          <div className="absolute top-0 z-80  flex flex-row-reverse w-full justify-between px-2">
            <img
              src={satelit ? Satelit : Lapisan}
              alt=""
              className="mt-2 w-15 border-2 border-black rounded-md hover:brightness-80 cursor-pointer hover:border-4 z-1"
              onClick={handleSelectedSatelit}
            />
            <Breadcrumb url={window.location.href} pageName="Statistic" />
          </div>
          {satelit ? (
            <BuildingAreaStatic handleClickBuilding={handleClick} />
          ) : (
            <>
              <GateArea handleClickBuilding={handleClick} />
              <div className="w-[8%] -ml-5 h-10 border-y border-black bg-zinc-50 opacity-0"></div>
              <BuildingArea
                WBPVisible={WBPVisible}
                petugasVisible={petugasVisible}
                pengunjungVisible={pengunjungVisible}
                gatewayVisible={gatewayVisible}
                routerVisible={routerVisible}
                cameraVisible={cameraVisible}
                accessDoorVisible={accessDoorVisible}
                faceRecognitionVisible={faceRecognitionVisible}
                interactiveDesktopVisible={interactiveDesktopVisible}
                interactiveTVisible={interactiveTVisible}
                selfRegKioskVisible={selfRegKioskVisible}
                NVRVisible={NVRVisible}
                NASVisible={NASVisible}
                zoneVisible={zoneVisible}
                handleClickBuilding={handleClick}
              />
              <Modal open={open} onClose={handleClose}>
                <ModalBuildingMap
                  handleClose={handleClose}
                  detailData={detailDataGedung}
                ></ModalBuildingMap>
              </Modal>
            </>
          )}
        </div>
      </aside>
    </section>
  );
}

export default BuildingMap;
