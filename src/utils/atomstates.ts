import { atom } from "jotai";

const dataUser = JSON.parse(localStorage.getItem("dataUser") || "{}") as any;

const dataLokasiOtmil = dataUser.lokasi_otmil_id;
const dataLokasiLemasMil = dataUser.lokasi_lemasmil_id;

export const allVisibleAtom = atom<boolean>(true);

export const gatewayVisibleAtom = atom<boolean>(true);

export const wbpVisibleAtom = atom<boolean>(true);

export const routerVisibleAtom = atom<boolean>(false);

export const petugasVisibleAtom = atom<boolean>(true);

export const pengunjungVisibleAtom = atom<boolean>(true);

export const cameraVisibleAtom = atom<boolean>(false);

export const accessDoorVisibleAtom = atom<boolean>(false);

export const faceRecognitionVisibleAtom = atom<boolean>(false);

export const interactiveDesktopVisibleAtom = atom<boolean>(false);

export const interactiveTVisibleAtom = atom<boolean>(false);

export const selfRegKioskVisibleAtom = atom<boolean>(false);

export const NVRVisibleAtom = atom<boolean>(false);

export const NASVisibleAtom = atom<boolean>(false);

export const zoneVisibleAtom = atom<boolean>(false);

export const isFullScreenAtom = atom<boolean>(true);

export const NotificationAtom = atom<boolean>(false);

export const CurrentLayerAtom = atom<number>(1);

export const TutorialStatistic = atom<boolean>(false);

export const isSidebarNotifOpen = atom<boolean>(false);

export const isToggleWithDescriptionAtom = atom<boolean>(true);

export const selectedRoutes = atom<string>("siram-dashboard");

export const selectedParamsSearchDashboard = atom<any>({
  lokasi_otmil_id: dataLokasiOtmil ?? null,
  lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
});

export const selectedParamsSearchDashboardPetugas = atom<any>({
  lokasi_otmil_id: dataLokasiOtmil ?? null,
  lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
});

export const selectedType = atom<string>("");

export const selectedRoute = atom<string>("siram-dashboard");

export const dataWBPSearch = atom<any>({});
export const dataUserPetugasSearch = atom<any>({});
export const dataPengunjungSearch = atom<any>({});
export const dataGatewaySearch = atom<any>({});
export const dataCameraSearch = atom<any>({});
export const dataRoutesSearch = atom<any>({});
export const dataAccessDoorSearch = atom<any>({});
export const dataFaceRecSearch = atom<any>({});
export const dataDesktopSearch = atom<any>({});
export const dataTVSearch = atom<any>({});
export const dataSelfRecSearch = atom<any>({});
export const dataNVRearch = atom<any>({});
export const dataNasSearch = atom<any>({});

export const selectedWBPSearch = atom<any>([]);
export const selectedPetugasSearch = atom<any>([]);
export const selectedPengunjungSearch = atom<any>([]);
export const selectedGatewaySearch = atom<any>([]);
export const selectedCameraSearch = atom<any>([]);
export const selectedRoutesSearch = atom<any>([]);
export const selectedAccessDoorearch = atom<any>([]);
export const selectedFaceRecSearch = atom<any>([]);
export const selectedDesktopSearch = atom<any>([]);
export const selectedTVearch = atom<any>([]);
export const selectedSelfRecSearch = atom<any>([]);
export const selectedNVRSearch = atom<any>([]);
export const selectedNASSearch = atom<any>([]);

export const accordionWbpAtom = atom({
  wbp: [],
  petugas: [],
  pengunjung: [],
});

export const modeNotificationDropdown = atom<string>("notification");

export const isSateliteView = atom<boolean>(false);

export const modeMap = atom<string>("Denah");

export const selectedRoutess = atom<string>("workstation");

export const checkState = atom<boolean>(false);

export const sideBarLeftExpanded = atom<boolean>(false);
