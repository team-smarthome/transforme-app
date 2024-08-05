import React, { useEffect, useState } from "react";
import BuildingHorizontal from "./HorizontalBuilding";
import BuildingVertical from "./VerticalBuilding";
import BuildingTemplate from "./BuildingTemplate";
import Gateway from "./Gateway";
import Router from "./Router";
import Camera from "./Camera";
import AccessDoor from "./AccessDoor";
import FaceRecognition from "./FaceRecognition";
import InteractiveDesktop from "./InteractiveDesktop";
import SelfRegKiosk from "./SelfRegKiosk";
import NVR from "./NVR";
import NAS from "./NAS";
import WBP from "./WBP";
import Petugas from "./Petugas";
import Pengunjung from "./Pengunjung";
import InteractiveTV from "./InteractiveTV";
import Swal from "sweetalert2";

import {
  WBPDummy,
  dataGedung,
  PengunjungDummy,
  PetugasDummy,
} from "../../../utils/constants";
import RoomTemplate from "./RoomTemplate";
import FieldTemplate from "./FieldTemplate";
import GatewayTemplate from "./GatewayTemplate";
import {
  apiIndoorMap,
  apiIndoorMapV2,
  apiIndoorMapV3,
  apiPeopleDummy,
  apiReadAllWBP,
  apiReadAllStaffDashboard,
  apiReadVisitor,
  apiReadGatewayDashboard,
  apiReadCameraDashboard,
  apiReadRoutesDashboard,
  apiReadAccessDoorDashboard,
  apiReadFaceRecDashboard,
  apiReadDesktopDashboard,
  apiReadTVDashboard,
  apiReadSelfDashboard,
  apiReadNVRDashboard,
  apiReadNASDashboard,
} from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { accordionWbpAtom, CurrentLayerAtom } from "../../../utils/atomstates";
import Loader from "../../../common/Loader";
import LoadingSpinner from "./LoadingSpinner";
import {
  selectedParamsSearchDashboard,
  selectedType,
  dataWBPSearch,
  dataUserPetugasSearch,
  dataPengunjungSearch,
  dataGatewaySearch,
  dataCameraSearch,
  dataRoutesSearch,
  dataAccessDoorSearch,
  dataFaceRecSearch,
  dataDesktopSearch,
  dataTVSearch,
  dataSelfRecSearch,
  dataNVRearch,
  dataNasSearch,
  isSateliteView,
  loadingAtom,
} from "../../../utils/atomstates";
import { selectedRoute } from "../../../utils/atomstates";
import { set } from "react-hook-form";

interface BuildingAreaProps {
  petugasVisible?: boolean;
  pengunjungVisible?: boolean;
  WBPVisible?: boolean;
  handleClickBuilding: any;
  gatewayVisible?: boolean;
  routerVisible?: boolean;
  cameraVisible?: boolean;
  accessDoorVisible?: boolean;
  faceRecognitionVisible?: boolean;
  interactiveDesktopVisible?: boolean;
  interactiveTVisible?: boolean;
  selfRegKioskVisible?: boolean;
  NVRVisible?: boolean;
  NASVisible?: boolean;
  zoneVisible?: boolean;
}

interface Ruangan {
  id: number;
  nama: string;
  positionX: string;
  positionY: string;
  height: string;
  width: string;
  color: string;
  color2?: string;
  gateway?: GatewayType[];
  pathname?: string;
}
interface GatewayType {
  id: number;
  nama: string;
  positionX: string;
  positionY: string;
}

type zoneType = {
  zone_height?: string;
  zone_width?: string;
  zone_positionX?: string;
  zone_positionY?: string;
};
function BuildingArea({
  handleClickBuilding,
  petugasVisible = false,
  pengunjungVisible = false,
  WBPVisible = false,
  gatewayVisible = false,
  routerVisible = false,
  cameraVisible = false,
  accessDoorVisible = false,
  faceRecognitionVisible = false,
  interactiveDesktopVisible = false,
  interactiveTVisible = false,
  selfRegKioskVisible = false,
  NVRVisible = false,
  NASVisible = false,
  zoneVisible = false,
}: BuildingAreaProps) {
  const dataUser = JSON.parse(localStorage.getItem("dataUser") || "{}") as any;

  const dataLokasiOtmil = dataUser.lokasi_otmil_id ?? null;
  const dataLokasiLemasMil = dataUser.lokasi_lemasmil_id ?? null;

  const [dataParams] = useAtom(selectedParamsSearchDashboard);
  const [selectedTypeData] = useAtom(selectedType);
  const [loadingAtomState, setLoadingAtomState] = useAtom(loadingAtom);
  const [datawbpSearch, setDatawbpSearch] = useAtom(dataWBPSearch);
  const [datapetugasSearch, setDatapetugasSearch] = useAtom(
    dataUserPetugasSearch
  );
  const [datapengunjungSearch, setDatapengunjungSearch] =
    useAtom(dataPengunjungSearch);

  const [datagatewaysSearch, setDatagatewaysSearch] =
    useAtom(dataGatewaySearch);

  const [datacameraSearch, setDatacameraSearch] = useAtom(dataCameraSearch);
  const [dataroutesSearch, setDataroutesSearch] = useAtom(dataRoutesSearch);
  const [dataaccessDoorSearch, setDataaccessDoorSearch] =
    useAtom(dataAccessDoorSearch);
  const [datafaceRecSearch, setDatafaceRecSearch] = useAtom(dataFaceRecSearch);
  const [datadesktopSearch, setDatadesktopSearch] = useAtom(dataDesktopSearch);
  const [datatvSearch, setDatatvSearch] = useAtom(dataTVSearch);
  const [dataselfRecSearch, setDataselfRecSearch] = useAtom(dataSelfRecSearch);
  const [datanvrSearch, setDatanvrSearch] = useAtom(dataNVRearch);
  const [datanasSearch, setDatanasSearch] = useAtom(dataNasSearch);

  const [satelit, setSatelit] = useAtom(isSateliteView);

  const [paramsforWBP, setParamsForWBP] = useState({});
  const [paramsforPetugas, setParamsForPetugas] = useState({});
  const [paramsforPengunjung, setParamsForPengunjung] = useState({});
  const [paramsforGateway, setParamsForGateway] = useState({});
  const [paramsforCamera, setParamsForCamera] = useState({});
  const [paramsforRoutes, setParamsForRoutes] = useState({});
  const [paramsforAccessDoor, setParamsForAccessDoor] = useState({});
  const [paramsforFaceRec, setParamsForFaceRec] = useState({});
  const [paramsforDesktop, setParamsForDesktop] = useState({});
  const [paramsforTV, setParamsForTV] = useState({});
  const [paramsforSelfReg, setParamsForSelfReg] = useState({});
  const [paramsforNVR, setParamsForNVR] = useState({});
  const [paramsforNAS, setParamsForNAS] = useState({});

  let paramsSend;

  let params = dataParams
    ? dataParams
    : {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };

  console.log("parmasForJotai", params);

  useEffect(() => {
    if (selectedTypeData === "WBP") {
      setParamsForWBP(params);
    } else if (selectedTypeData === "Petugas") {
      setParamsForPetugas(params);
    } else if (selectedTypeData === "Pengunjung") {
      setParamsForPengunjung(params);
    } else if (selectedTypeData === "Gateway") {
      setParamsForGateway(params);
    } else if (selectedTypeData === "Camera") {
      setParamsForCamera(params);
    } else if (selectedTypeData === "PTP") {
      setParamsForRoutes(params);
    } else if (selectedTypeData === "Access") {
      setParamsForAccessDoor(params);
    } else if (selectedTypeData === "Face") {
      setParamsForFaceRec(params);
    } else if (selectedTypeData === "Desktop") {
      setParamsForDesktop(params);
    } else if (selectedTypeData === "TV") {
      setParamsForTV(params);
    } else if (selectedTypeData === "Self Registration") {
      setParamsForSelfReg(params);
    } else if (selectedTypeData === "NVR") {
      setParamsForNVR(params);
    } else if (selectedTypeData === "NAS") {
      setParamsForNAS(params);
    }
  }, [dataParams]);

  const [selectedMenu, setSelectedMenu] = useAtom(selectedRoute);
  // const [yourLayer, setYourLayer] = useAtom(CurrentLayerAtom)
  function sumBottomClasses(class1, class2) {
    // Extracting percentages from class strings
    const regex = /bottom-\[(\d+(\.\d+)?)%\]/;
    const match1 = regex.exec(class1);
    const match2 = regex.exec(class2);
    if (match1 && match2) {
      const left1 = parseFloat(match1[1]);
      const left2 = parseFloat(match2[1]);
      const sum = left1 + left2;
      console.log("xxxxx", sum);
      let res = `bottom-[${sum}%]`;
      console.log("xxxxx", res);
      return `bottom-[${sum}%]`;
    } else {
      console.error("Invalid left positioning classes");
      return "";
    }
  }
  const [datawbp, setDataWbp] = useState(null);
  const [datapetugas, setDatapetugas] = useState(null);
  const [datapengunjungDashboard, setDatapengunjungDasboard] = useState(null);
  const [datagatewayDashboard, setDatagatewayDasboard] = useState([]);
  const [datacameraDashboard, setDatacameraDashboard] = useState([]);
  const [dataroutesDashboard, setDataroutesDashboard] = useState([]);
  const [dataaccessDoorDashboard, setDataaccessDoorDashboard] = useState([]);
  const [datafaceRecDashboard, setDatafaceRecDashboard] = useState([]);
  const [datadesktopDashboard, setDatadesktopDashboard] = useState([]);
  const [datatvDashboard, setDatatvDashboard] = useState([]);
  const [dataselfRecDashboard, setDataselfRecDashboard] = useState([]);
  const [datanvrDashboard, setDatanvrDashboard] = useState([]);
  const [datanasDashboard, setDatanasDashboard] = useState([]);
  const [accordionWbp, setAccordionWbp] = useAtom(accordionWbpAtom);
  const [loading, setLoading] = useState(false);
  // console.log(yourLayer, "yourLayer")
  const { data: dynamicData, isLoading } = useQuery({
    queryKey: ["mapdata"],
    queryFn: apiIndoorMap,
    staleTime: Infinity,
  });
  const { data: dynamicDataV2 } = useQuery({
    queryKey: ["mapdatav2"],
    queryFn: apiIndoorMapV2,
    staleTime: Infinity,
    // refetchInterval: 5000,
  });
  // const { data: dynamicDataV3 } = useQuery({
  //   queryKey: ["mapdatav3"],
  //   queryFn: apiIndoorMapV3,
  //   staleTime: Infinity,
  //   refetchInterval: 2000,
  // });
  let peopleParams = {
    currentLayer: 1,
  };
  // console.log(peopleParams, "peopleParams")
  const { data: peopleData } = useQuery({
    queryKey: ["peopleDummy"],
    queryFn: () => apiPeopleDummy(peopleParams),
    // refetchInterval: 5000,
  });

  const dataPetugas = async () => {
    console.log("masuksini");
    let petugasDataParams = paramsforPetugas;
    if (Object.keys(paramsforPetugas).length === 0) {
      petugasDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }

    console.log(paramsforPetugas, "nilaiParams");
    switch (selectedTypeData) {
      case "Petugas":
        paramsSend = params;
        break;
      default:
        paramsSend = petugasDataParams;
        break;
    }
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    try {
      console.log("masuksini2");
      const responsePetugas = await apiReadAllStaffDashboard(paramsSend, token);
      const responseData = responsePetugas.data;
      if ((responseData.status = "OK")) {
        console.log(responseData.records, "petugas");
        setDatapetugas(responseData.records);
        setAccordionWbp({ ...accordionWbp, petugas: responseData.records });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataWbp = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let wbpDataParams = paramsforWBP;
    if (Object.keys(paramsforWBP).length === 0) {
      wbpDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "WBP":
        paramsSend = params;
        break;
      default:
        paramsSend = wbpDataParams;
        // paramsSend = {
        //   lokasi_otmil_id: dataLokasiOtmil,
        //   lokasi_lemasmil_id: dataLokasiLemasMil,
        // };
        break;
    }
    try {
      console.log("masuksini2");
      console.log("dataparams1234");
      const responseWbp = await apiReadAllWBP(paramsSend, token);
      const responseData = responseWbp.data;
      if ((responseData.status = "OK")) {
        console.log(responseWbp, "data_wbp");
        setAccordionWbp({ ...accordionWbp, wbp: responseData.records });
        setDataWbp(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataPengunjung = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let pengunjungDataParams = paramsforPengunjung;
    if (Object.keys(paramsforPengunjung).length === 0) {
      pengunjungDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "Pengunjung":
        paramsSend = params;
        break;
      default:
        paramsSend = pengunjungDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadVisitor(paramsSend, token);
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log(responseData.records, "pengunjung");
        setAccordionWbp({ ...accordionWbp, pengunjung: responseData.records });
        setDatapengunjungDasboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*----Geteway-----*/
  const dataGateway = async () => {
    console.log("masuksinikaliya");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let gatewayDataParams = paramsforGateway;
    if (Object.keys(paramsforGateway).length === 0) {
      gatewayDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "Gateway":
        paramsSend = params;
        break;
      default:
        paramsSend = gatewayDataParams;
        break;
    }
    try {
      console.log("WKWKWKWKWKWKWKWKKWK", paramsSend);
      const responsePengunjung = await apiReadGatewayDashboard(
        paramsSend,
        token
      );
      const responseData = responsePengunjung.data;
      console.log(responseData, "responseDataGatewayFromApi");
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDatagatewayDasboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----Camera-----*/
  const dataCamera = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let cameraDataParams = paramsforCamera;
    if (Object.keys(paramsforCamera).length === 0) {
      cameraDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "Camera":
        paramsSend = params;
        break;
      default:
        paramsSend = cameraDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadCameraDashboard(
        paramsSend,
        token
      );
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDatacameraDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----Routes-----*/
  const dataRoutes = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let routesDataParams = paramsforRoutes;
    if (Object.keys(paramsforRoutes).length === 0) {
      routesDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "PTP":
        paramsSend = params;
        break;
      default:
        paramsSend = routesDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadRoutesDashboard(
        paramsSend,
        token
      );
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDataroutesDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----Access Door-----*/
  const dataAccessDoor = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let accessDoorDataParams = paramsforAccessDoor;
    if (Object.keys(paramsforAccessDoor).length === 0) {
      accessDoorDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "Access":
        paramsSend = params;
        break;
      default:
        paramsSend = accessDoorDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadAccessDoorDashboard(
        paramsSend,
        token
      );
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDataaccessDoorDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----Face Recognition-----*/
  const dataFaceRec = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let faceRecDataParams = paramsforFaceRec;
    if (Object.keys(paramsforFaceRec).length === 0) {
      faceRecDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "Face":
        paramsSend = params;
        break;
      default:
        paramsSend = faceRecDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadFaceRecDashboard(
        paramsSend,
        token
      );
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDatafaceRecDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----Desktop-----*/
  const dataDesktop = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let desktopDataParams = paramsforDesktop;
    if (Object.keys(paramsforDesktop).length === 0) {
      desktopDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "Desktop":
        paramsSend = params;
        break;
      default:
        paramsSend = desktopDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadDesktopDashboard(
        paramsSend,
        token
      );
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDatadesktopDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----TV-----*/
  const dataTV = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let tvDataParams = paramsforTV;
    if (Object.keys(paramsforTV).length === 0) {
      tvDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "TV":
        paramsSend = params;
        break;
      default:
        paramsSend = tvDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadTVDashboard(paramsSend, token);
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDatatvDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----Self Registration-----*/
  const dataSelfReg = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let selfRegDataParams = paramsforSelfReg;
    if (Object.keys(paramsforSelfReg).length === 0) {
      selfRegDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "Self Registration":
        paramsSend = params;
        break;
      default:
        paramsSend = selfRegDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadSelfDashboard(paramsSend, token);
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDataselfRecDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----NVR-----*/
  const dataNVR = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let nvrDataParams = paramsforNVR;
    if (Object.keys(paramsforNVR).length === 0) {
      nvrDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "NVR":
        paramsSend = params;
        break;
      default:
        paramsSend = nvrDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadNVRDashboard(paramsSend, token);
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDatanvrDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  /*----NAS-----*/
  const dataNAS = async () => {
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    let nasDataParams = paramsforNAS;
    if (Object.keys(paramsforNAS).length === 0) {
      nasDataParams = {
        lokasi_otmil_id: dataLokasiOtmil,
        lokasi_lemasmil_id: dataLokasiLemasMil,
      };
    }
    switch (selectedTypeData) {
      case "NAS":
        paramsSend = params;
        break;
      default:
        paramsSend = nasDataParams;
        break;
    }
    try {
      const responsePengunjung = await apiReadNASDashboard(paramsSend, token);
      const responseData = responsePengunjung.data;
      if ((responseData.status = "OK")) {
        console.log("dataDashboardWOY", responseData.records);
        setDatanasDashboard(responseData.records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-----------------*/

  const getSizeZone = (data: zoneType) => {
    console.log(data, "data getSizeZone");
    const { zone_height, zone_width, zone_positionX, zone_positionY } = data;
    return `${zone_height} ${zone_width} ${zone_positionX} ${zone_positionY}`;
  };

  // useEffect(() => {
  //   // dataPetugas();
  //   // dataCamera();
  //   dataGateway();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dataWbp();
      dataPetugas();
      dataPengunjung();
      dataGateway();
      dataCamera();
      dataRoutes();
      dataAccessDoor();
      dataFaceRec();
      dataDesktop();
      dataTV();
      dataSelfReg();
      dataNVR();
      dataNAS();
    }, 10000);

    setSelectedMenu("dashboard");

    dataWbp();
    dataPetugas();
    dataPengunjung();
    dataGateway();
    dataCamera();
    dataRoutes();
    dataAccessDoor();
    dataFaceRec();
    dataDesktop();
    dataTV();
    dataSelfReg();
    dataNVR();
    dataNAS();

    return () => clearInterval(interval);
  }, [dataParams]);

  // useEffect(() => {
  //   setSelectedMenu("dashboard");
  // }, []);

  const dataWbpSearch = async () => {
    // setLoadingAtomState(true);
    console.log("masuksini");
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "WBP":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      console.log("masuksini2");
      console.log("dataparams1234");
      const responseWbp = await apiReadAllWBP(paramsSend, token);
      const responseData = responseWbp.data;
      if ((responseData.status = "OK")) {
        setDatawbpSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Petugas Search-----*/
  const dataPetugasSearch = async () => {
    setLoadingAtomState(true);
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Petugas":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      const responsePetugas = await apiReadAllStaffDashboard(paramsSend, token);
      const responseData = responsePetugas.data;
      console.log(responsePetugas, "apasihiniresponsenya");
      if ((responseData.status = "OK")) {
        setDatapetugasSearch(responseData.records);
        setLoadingAtomState(false);
      } else if ((responseData.status = "error") || responseData.code === 403) {
        setLoadingAtomState(false);
        Swal.fire({
          icon: "error",
          title: "Token Invalid",
          text: "Mohon Login Kembali",
        });
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      setLoadingAtomState(false);
      Swal.fire({
        icon: "error",
        title: "Token Invalid",
        text: "Mohon Login Kembali",
      });
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 2000);
      // console.log(error, "errornya_apa");
      // setLoadingAtomState(false);
      // Swal.fire({
      //   icon: "error",
      //   title: "Token Invalid",
      //   text: "Mohon Login Kembali",
      // });
      // setTimeout(() => {
      //   localStorage.clear();
      //   window.location.href = "/";
      // }, 2000);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Pengunjung Search-----*/

  const dataPengunjungSearchMap = async () => {
    // setLoadingAtomState(true);
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Pengunjung":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      const responseGateway = await apiReadVisitor(paramsSend, token);
      const responseData = responseGateway.data;
      if ((responseData.status = "OK")) {
        setDatapengunjungSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Gateway Search-----*/
  const dataGatewaySearchMap = async () => {
    // setLoadingAtomState(true);
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Gateway":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      const responseGateway = await apiReadGatewayDashboard(paramsSend, token);
      const responseData = responseGateway.data;
      if ((responseData.status = "OK")) {
        setDatagatewaysSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Camera Search-----*/
  const dataCameraSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Camera":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseCamera = await apiReadCameraDashboard(paramsSend, token);
      const responseData = responseCamera.data;
      if ((responseData.status = "OK")) {
        setDatacameraSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Routes Search-----*/
  const dataRoutesSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "PTP":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseRoutes = await apiReadRoutesDashboard(paramsSend, token);
      const responseData = responseRoutes.data;
      if ((responseData.status = "OK")) {
        setDataroutesSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Access Door Search-----*/
  const dataAccessDoorSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Access":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseAccessDoor = await apiReadAccessDoorDashboard(
        paramsSend,
        token
      );
      const responseData = responseAccessDoor.data;
      if ((responseData.status = "OK")) {
        setDataaccessDoorSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Face Recognition Search-----*/
  const dataFaceRecSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Face":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseFaceRec = await apiReadFaceRecDashboard(paramsSend, token);
      const responseData = responseFaceRec.data;
      if ((responseData.status = "OK")) {
        setDatafaceRecSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data Desktop Search-----*/
  const dataDesktopSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Desktop":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseDesktop = await apiReadDesktopDashboard(paramsSend, token);
      const responseData = responseDesktop.data;
      if ((responseData.status = "OK")) {
        setDatadesktopSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data TV Search-----*/
  const dataTVSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "TV":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseTV = await apiReadTVDashboard(paramsSend, token);
      const responseData = responseTV.data;
      if ((responseData.status = "OK")) {
        setDatatvSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*----Data Self Registration Search-----*/
  const dataSelfRecSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "Self Registration":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseSelfRec = await apiReadSelfDashboard(paramsSend, token);
      const responseData = responseSelfRec.data;
      if ((responseData.status = "OK")) {
        setDataselfRecSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data NVR Search-----*/
  const dataNVRearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "NVR":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseNVR = await apiReadNVRDashboard(paramsSend, token);
      const responseData = responseNVR.data;
      if ((responseData.status = "OK")) {
        setDatanvrSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  /*----Data NAS Search-----*/
  const dataNasSearchMap = async () => {
    const tokenItem = localStorage.getItem("token");
    const dataToken = tokenItem ? JSON.parse(tokenItem) : null;
    const token = dataToken?.token ? dataToken.token : null;
    switch (selectedTypeData) {
      case "NAS":
        paramsSend = params;
        break;
      default:
        paramsSend = {
          lokasi_otmil_id: dataLokasiOtmil,
          lokasi_lemasmil_id: dataLokasiLemasMil,
        };
        break;
    }
    try {
      // setLoadingAtomState(true);
      const responseNAS = await apiReadNASDashboard(paramsSend, token);
      const responseData = responseNAS.data;
      if ((responseData.status = "OK")) {
        setDatanasSearch(responseData.records);
        // setLoadingAtomState(false);
      }
    } catch (error) {
      console.log(error);
      // setLoadingAtomState(false);
    }
  };

  useEffect(() => {
    // dataWbpSearch();
    // dataPetugasSearch();
    // dataPengunjungSearchMap();
    // dataGatewaySearchMap();
    // dataCameraSearchMap();
    // dataRoutesSearchMap();
    // dataAccessDoorSearchMap();
    // dataFaceRecSearchMap();
    // dataDesktopSearchMap();
    // dataTVSearchMap();
    // dataSelfRecSearchMap();
    // dataNVRearchMap();
    // dataNasSearchMap();
    Promise.all([
      dataWbpSearch(),
      dataPetugasSearch(),
      dataPengunjungSearchMap(),
      dataGatewaySearchMap(),
      dataCameraSearchMap(),
      dataRoutesSearchMap(),
      dataAccessDoorSearchMap(),
      dataFaceRecSearchMap(),
      dataDesktopSearchMap(),
      dataTVSearchMap(),
      dataSelfRecSearchMap(),
      dataNVRearchMap(),
      dataNasSearchMap(),
    ]).then(() => {
      setLoadingAtomState(false);
    });
  }, []);

  // console.log(peopleData, "people")

  // console.log(dynamicData?.data?.records?.layer1.camera, "data indoor map")
  // if (isLoading) {
  //   return (
  //     <div className='w-full h-full'>
  //       <Loader />
  //     </div>
  //   );
  // }
  // console.log(dynamicData?.data?.records?.layer1?.gedung[0].zone_positionX, "data gedung")
  // console.log(peopleData.data.records.length, "data jumlah")
  // console.log(dataGedung, "data dummy")
  return loadingAtomState ? (
    <LoadingSpinner />
  ) : (
    <div className="flex-1 relative border-double h-[35rem] bg-map-grass shadow-md shadow-slate-800 bg-slate-100">
      <div className="aspect-w-8 aspect-h-4 bg-red-500">
        <div className="flex-1 relative border-double border-4 border-black h-[35rem] bg-map-grass shadow-md shadow-slate-800 bg-slate-100">
          <div className="aspect-w-8 aspect-h-4">
            <p className="uppercase text-2xl text-slate-300 -rotate-90 absolute -left-64 top-62.5">
              Area Depan
            </p>
            <p className="uppercase text-2xl text-slate-300 rotate-90 absolute -right-32 top-62.5">
              Area Belakang
            </p>
            {datawbp?.map((obj: any, i) => (
              <WBP visible={WBPVisible} item={obj} />
            ))}
            {datapetugas?.map((obj: any, i) => (
              <Petugas visible={petugasVisible} item={obj} />
            ))}
            {datapengunjungDashboard?.map((obj: any, i) => (
              <Pengunjung visible={pengunjungVisible} item={obj} />
            ))}
            <div className="area">
              {dynamicDataV2?.data?.records?.layer1?.gedung.map((data) => {
                console.log(data, "datanya dynamicDataV2");
                return (
                  <>
                    <BuildingTemplate
                      zonePositionX={data.zone_positionX}
                      zonePositionY={data.zone_positionY}
                      zoneHeight={data.zone_height}
                      zoneWidth={data.zone_width}
                      positionX={data.positionX}
                      positionY={data.positionY}
                      heightProps={data.height}
                      widthProps={data.width}
                      color={data.color}
                      color2={data.color2}
                      namaGedung={data.nama}
                      isRotateText={data.isRotateText}
                      readOnly
                      size="large"
                      handleClick={() =>
                        handleClickBuilding(
                          dynamicDataV2?.data?.records?.layer1?.gedung,
                          data.id,
                          dynamicDataV2?.data?.records
                        )
                      }
                    />
                  </>
                );
              })}
              {zoneVisible && (
                <React.Fragment>
                  {/* <div className="absolute bottom-[84.5%] left-[6%] w-[28%] h-[12%] bg-red-500 z-1 animate-pulse"></div> */}
                  <div
                    className={`absolute ${getSizeZone(
                      dynamicData?.data?.records?.layer1?.zone
                    )} bg-green-500 z-0`}
                  />
                </React.Fragment>
              )}
            </div>

            <FieldTemplate
              positionX="left-[0%]"
              positionY="bottom-[35.7%]"
              heightProps="h-[29.5%]"
              widthProps="w-[93%]"
              color="bg-slate-100"
              readOnly
              size="large"
              handleClick={handleClickBuilding}
            />

            <FieldTemplate
              positionX="left-[0%]"
              positionY="bottom-[35.7%]"
              heightProps="h-[29.5%]"
              widthProps="w-[93%]"
              color="bg-red-00"
              readOnly
              size="large"
              handleClick={handleClickBuilding}
            />

            {/* GATEWAY */}
            {datagatewayDashboard.map((data) => {
              console.log(data, "dataGatewaySaatIni");
              return (
                <Gateway
                  visible={gatewayVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* ROUTERS */}
            {dataroutesDashboard.map((data) => {
              return (
                <Router
                  visible={routerVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* CAMERAS */}
            {datacameraDashboard.map((data) => {
              return (
                <Camera
                  visible={cameraVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* ACCESS DOOR */}
            {dataaccessDoorDashboard.map((data) => {
              return (
                <AccessDoor
                  visible={accessDoorVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* FACE RECOGNITION */}
            {datafaceRecDashboard.map((data) => {
              return (
                <FaceRecognition
                  visible={faceRecognitionVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* INTERACTIVE DESKTOP */}
            {datadesktopDashboard.map((data) => {
              return (
                <InteractiveDesktop
                  visible={interactiveDesktopVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}
            {/* INTERACTIVE TV */}
            {datatvDashboard.map((data) => {
              return (
                <InteractiveTV
                  visible={interactiveTVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* SELF REGISTRATION KIOSK */}
            {dataselfRecDashboard.map((data) => {
              return (
                <SelfRegKiosk
                  visible={selfRegKioskVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* NVR */}
            {datanvrDashboard.map((data) => {
              return (
                <NVR
                  visible={NVRVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}

            {/* NAS */}
            {datanasDashboard.map((data) => {
              return (
                <NAS
                  visible={NASVisible}
                  positionX={data.positionX}
                  positionY={data.positionY}
                  item={data}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildingArea;
