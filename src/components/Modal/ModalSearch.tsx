import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "antd";
import { useEffect, useState } from "react";
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
  selectedWBPSearch,
  selectedPetugasSearch,
  selectedPengunjungSearch,
  selectedGatewaySearch,
  selectedCameraSearch,
  selectedRoutesSearch,
  selectedAccessDoorearch,
  selectedFaceRecSearch,
  selectedDesktopSearch,
  selectedTVearch,
  selectedSelfRecSearch,
  selectedNVRSearch,
  selectedNASSearch,
} from "../../utils/atomstates";
import { useAtom } from "jotai";
import { FaTrashAlt } from "react-icons/fa";
import { apiGedungOtmilRead, apiLantaiOtmilRead, apiReadAccessDoorDashboard, apiReadAllRuanganOtmil, apiReadDesktopDashboard, apiReadGateway, apiReadKamera, apiReadNVRDashboard, apiReadRoutesDashboard, apiReadTVDashboard } from "../../services/api";
import Loader from "../../common/Loader";
import SearchInputButtonModal from "../BuildingMap/components/Search";

interface ModalSearchProps {
  handleClose: () => void;
  hoverData: string;
}

const CustomInputStyle = {
  color: "#fff",
  borderColor: "#000",
  backgroundColor: "rgb(51, 65, 85)",
  "::placeholder": {
    color: "#b51414",
  },
};

function ModalSearch({ handleClose, hoverData }: ModalSearchProps) {
  const [dataSearch, setDataSearch] = useState<string>("");
  const [dataParams, setDataParams] = useAtom(selectedParamsSearchDashboard);
  const [selectedTypeData, setSelectedTypeData] = useAtom(selectedType);
  const [datawbpSearch] = useAtom(dataWBPSearch);
  const [datapetugasSearch] = useAtom(dataUserPetugasSearch);
  const [datapengunjungSearch] = useAtom(dataPengunjungSearch);
  const [datagatewaySearch] = useAtom(dataGatewaySearch);
  const [datacameraSearch] = useAtom(dataCameraSearch);
  const [dataroutesSearch] = useAtom(dataRoutesSearch);
  const [dataaccessDoorSearch] = useAtom(dataAccessDoorSearch);
  const [datafaceRecSearch] = useAtom(dataFaceRecSearch);
  const [datadesktopSearch] = useAtom(dataDesktopSearch);
  const [datatvSearch] = useAtom(dataTVSearch);
  const [dataselfRecSearch] = useAtom(dataSelfRecSearch);
  const [datanvrSearch] = useAtom(dataNVRearch);
  const [datanasSearch] = useAtom(dataNasSearch);

  const [isLoading, setIsLoading] = useState(false);

  const [dataList, setDataList] = useState([]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  //List Daftar Option
  const [optionsGedung, setOptionsGedung] = useState([]);
  const [optionsLantai, setOptionsLantai] = useState([]);
  const [optionsRuangan, setOptionsRuangan] = useState([]);

  const [optionsGateWay, setOptionsGateWay] = useState([]);

  //Filter Baru Indoor Maps
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //Fiter Device

  const [filterInputSearch, setFilterInputSearch] = useState("");
  const [selectedStatusGateWay, setSelectedStatusGateWay] = useState("");

  const [filterCamera, setFilterCamera] = useState("");
  const [selectedStatusKamera, setSelectedStatusKamera] = useState("");

  const [selectedTv, setSelectedTv] = useState("");
  const [selectedStatusTv, setSelectedStatusTv] = useState("");

  const [selectedNVR, setSelectedNVR] = useState("");
  const [selectedStatusNVR, setSelectedStatusNVR] = useState("");

  const [selectedStatusPTP, setSelectedStatusPTP] = useState("");

  const [selectedStatusAccessDoor, setSelectedStatusAccessDoor] = useState("");

  const [selectedStatusDesktop, setSelectedStatusDesktop] = useState("");

  /* Data WBP */
  const [filteredData, setFilteredData] = useState(datawbpSearch);
  const [selectedList, setSelectedList] = useAtom(selectedWBPSearch);

  /* ------------------------------------------------------------- */

  /* Data Petugas */
  const [filteredDataPengunjung, setFilteredDataPengunjung] =
    useState(datapetugasSearch);
  const [selectedListPengunjung, setSelectedListPengunjung] = useAtom(
    selectedPetugasSearch
  );

  /* ------------------------------------------------------------- */

  /* Data Pengunjung */
  const [filteredDataPetugas, setFilteredDataPetugas] =
    useState(datapengunjungSearch);
  const [selectedListPetugas, setSelectedListPetugas] = useAtom(
    selectedPengunjungSearch
  );

  /* ------------------------------------------------------------- */

  /* Data Gateway */
  const [filteredDataGateway, setFilteredDataGateway] =
    useState(datagatewaySearch);
  const [selectedListGateway, setSelectedListGateway] = useAtom(
    selectedGatewaySearch
  );

  /* ------------------------------------------------------------- */

  /* Data Camera */
  const [filteredDataCamera, setFilteredDataCamera] =
    useState(datacameraSearch);
  const [selectedListCamera, setSelectedListCamera] =
    useAtom(selectedCameraSearch);

  /* ------------------------------------------------------------- */

  /* Data Routes */
  const [filteredDataRoutes, setFilteredDataRoutes] =
    useState(dataroutesSearch);
  console.log("DATANYAADAGKYA", filteredDataRoutes);
  console.log("HOOVERDATA", hoverData);
  const [selectedListRoutes, setSelectedListRoutes] =
    useAtom(selectedRoutesSearch);

  /* ------------------------------------------------------------- */

  /* Data Access Door */
  const [filteredDataAccessDoor, setFilteredDataAccessDoor] =
    useState(dataaccessDoorSearch);
  const [selectedListAccessDoor, setSelectedListAccessDoor] = useAtom(
    selectedAccessDoorearch
  );

  /* ------------------------------------------------------------- */

  /* Data Face Recognition */
  const [filteredDataFaceRec, setFilteredDataFaceRec] =
    useState(datafaceRecSearch);
  const [selectedListFaceRec, setSelectedListFaceRec] = useAtom(
    selectedFaceRecSearch
  );

  /* ------------------------------------------------------------- */

  /* Data Desktop */
  const [filteredDataDesktop, setFilteredDataDesktop] =
    useState(datadesktopSearch);
  const [selectedListDesktop, setSelectedListDesktop] = useAtom(
    selectedDesktopSearch
  );

  /* ------------------------------------------------------------- */

  /* Data TV */
  const [filteredDataTV, setFilteredDataTV] = useState(datatvSearch);
  const [selectedListTV, setSelectedListTV] = useAtom(selectedTVearch);

  /* ------------------------------------------------------------- */

  /* Data Self Recognition */
  const [filteredDataSelfRec, setFilteredDataSelfRec] =
    useState(dataselfRecSearch);
  const [selectedListSelfRec, setSelectedListSelfRec] = useAtom(
    selectedSelfRecSearch
  );

  /* ------------------------------------------------------------- */

  /* Data NVR */
  const [filteredDataNVR, setFilteredDataNVR] = useState(datanvrSearch);
  const [selectedListNVR, setSelectedListNVR] = useAtom(selectedNVRSearch);

  /* ------------------------------------------------------------- */

  /* Data NAS */
  const [filteredDataNAS, setFilteredDataNAS] = useState(datanasSearch);
  const [selectedListNAS, setSelectedListNAS] = useAtom(selectedNASSearch);

  /* ------------------------------------------------------------- */

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataSearch(event.target.value);
  };

  const dataUser = JSON.parse(localStorage.getItem("dataUser") || "{}") as any;

  let getToken: any = localStorage.getItem("token");
  const token = JSON.parse(getToken);

  const dataLokasiOtmil = dataUser.lokasi_otmil_id;
  const dataLokasiLemasMil = dataUser.lokasi_lemasmil_id;

  // handle select gedung and other
  const handleSelectBuilding = (e: any) => {
    const selectedBuildingId = e.target.value;
    setSelectedBuilding(selectedBuildingId);
    setSelectedFloor("");
    setSelectedRoom("");
    // setFilterGateWay("");
    // setSelectedStatusGateWay("");
  };

  const handleSelectFloor = (e: any) => {
    const selectedFloorId = e.target.value;
    setSelectedFloor(selectedFloorId);
    setSelectedRoom(""); // Reset selected room when floor changes
    // setFilterGateWay("");
    // setSelectedStatusGateWay("");
  };

  const handleSelectRoom = (e: any) => {
    const selectedRoomId = e.target.value;
    setSelectedRoom(selectedRoomId); // Reset selected room when floor changes
    setFilterInputSearch("");
    // setFilterCamera("");
    // setSelectedStatusGateWay("");
  };

  //Handle GateWay

  const handleFilterInputSearch = (e: any) => {
    const newFilter = e.target.value;
    setFilterInputSearch(newFilter);
    setSelectedStatusGateWay(""); // Reset selected room when floor changes
    setSelectedStatusKamera("");
    setSelectedStatusTv("");
    setSelectedStatusNVR("");
    setSelectedStatusPTP("");
    setSelectedStatusAccessDoor("");
    setSelectedStatusDesktop("");
  };

  const handleSelecStatustGateWay = (e: any) => {
    const selectedStatusGateWayId = e.target.value;
    setSelectedStatusGateWay(selectedStatusGateWayId);
  };

  //Handle Camera

  const handleFilterCamera = (e: any) => {
    const newFilter = e.target.value;
    setFilterCamera(newFilter);
    setSelectedStatusKamera(""); // Reset selected room when floor changes
  };

  const handleSelectStatusCamera = (e: any) => {
    const selectedStatusCameraId = e.target.value;
    setSelectedStatusKamera(selectedStatusCameraId);
  };

  //Handle TV

  const handleSelectTv = (e: any) => {
    const selectedTvId = e.target.value;
    setSelectedTv(selectedTvId);
    setSelectedStatusTv(""); // Reset selected room when floor changes
  };

  const handleSelecStatustTv = (e: any) => {
    const selectedStatusTvId = e.target.value;
    setSelectedStatusTv(selectedStatusTvId);
  };

  //Handle NVR

  const handleSelectNVR = (e: any) => {
    const selectedNVRId = e.target.value;
    setSelectedNVR(selectedNVRId);
    setSelectedStatusNVR(""); // Reset selected room when floor changes
  };

  const handleSelecStatustNVR = (e: any) => {
    const selectedStatusNVRId = e.target.value;
    setSelectedStatusNVR(selectedStatusNVRId);
  };

  //Handle PTP

  const handleSelecStatustPTP = (e: any) => {
    const selectedStatusPTPId = e.target.value;
    setSelectedStatusPTP(selectedStatusPTPId);
  };

  //Handle Access Door
  const handleSelecStatustAccessDoor = (e: any) => {
    const selectedStatusAccessDoorId = e.target.value;
    setSelectedStatusAccessDoor(selectedStatusAccessDoorId);
  };

  //Handle Desktop
  const handleSelecStatustDesktop = (e: any) => {
    const selectedStatusDesktopId = e.target.value;
    setSelectedStatusDesktop(selectedStatusDesktopId);
  };

  const handleClickRoom = (roomId: any) => {
    console.log("id", roomId);
    setSelectedRoom(roomId);
    setCurrentPage(1);
  };

  const handleSearchDataClick = async () => {
    setIsLoading(true);
    // let params
    // if (selectedBuilding === "" && selectedFloor === "" && selectedRoom === "" && filterGateWay === "" && selectedStatusGateWay === "") {
    //   params = {}
    // } else {
    //   params = {
    //     filter: {
    //       gedung_otmil_id: selectedBuilding,
    //       lantai_otmil_id: selectedFloor,
    //       ruangan_otmil_id: selectedRoom,
    //       nama_gateway: filterGateWay,
    //       status_gateway: selectedStatusGateWay
    //     }
    //   }
    // }
    let params
    hoverData === "Gateway" ?
      (
        params = {
          filter: {
            ...(selectedBuilding && { gedung_otmil_id: selectedBuilding }),
            ...(selectedFloor && { lantai_otmil_id: selectedFloor }),
            ...(selectedRoom && { ruangan_otmil_id: selectedRoom }),
            ...(filterInputSearch && { nama_gateway: filterInputSearch }),
            ...(selectedStatusGateWay && { status_gateway: selectedStatusGateWay }),
          }
        }
      ) : hoverData === "Camera" ?
        (
          params = {
            filter: {
              ...(selectedBuilding && { gedung_otmil_id: selectedBuilding }),
              ...(selectedFloor && { lantai_otmil_id: selectedFloor }),
              ...(selectedRoom && { ruangan_otmil_id: selectedRoom }),
              ...(filterInputSearch && { nama_kamera: filterInputSearch }),
              ...(selectedStatusKamera && { status_kamera: selectedStatusKamera }),
            }
          }
        ) : hoverData === "TV" ?
          (params = {
            filter: {
              ...(selectedBuilding && { gedung_otmil_id: selectedBuilding }),
              ...(selectedFloor && { lantai_otmil_id: selectedFloor }),
              ...(selectedRoom && { ruangan_otmil_id: selectedRoom }),
              ...(filterInputSearch && { nama_tv: filterInputSearch }),
              ...(selectedStatusTv && { status_tv: selectedStatusTv }),
            }
          }) : hoverData === "NVR" ?
            (params = {
              filter: {
                ...(selectedBuilding && { gedung_otmil_id: selectedBuilding }),
                ...(selectedFloor && { lantai_otmil_id: selectedFloor }),
                ...(selectedRoom && { ruangan_otmil_id: selectedRoom }),
                ...(filterInputSearch && { nama_nvr: filterInputSearch }),
                ...(selectedStatusNVR && { status_nvr: selectedStatusNVR }),
              }
            }) : hoverData === "PTP" ?
            (params = {
              filter: {
                ...(selectedBuilding && { gedung_otmil_id: selectedBuilding }),
                ...(selectedFloor && { lantai_otmil_id: selectedFloor }),
                ...(selectedRoom && { ruangan_otmil_id: selectedRoom }),
                ...(filterInputSearch && { nama_access_point: filterInputSearch }),
                ...(selectedStatusPTP && { status_access_point: selectedStatusPTP }),
              }
            }) : hoverData === "Access" ?
            (params = {
              filter: {
                ...(selectedBuilding && { gedung_otmil_id: selectedBuilding }),
                ...(selectedFloor && { lantai_otmil_id: selectedFloor }),
                ...(selectedRoom && { ruangan_otmil_id: selectedRoom }),
                ...(filterInputSearch && { nama_access_door: filterInputSearch }),
                ...(selectedStatusAccessDoor && { status_access_door: selectedStatusAccessDoor }),
              }
            }) : hoverData === "Desktop" ?
            (params = {
              filter: {
                ...(selectedBuilding && { gedung_otmil_id: selectedBuilding }),
                ...(selectedFloor && { lantai_otmil_id: selectedFloor }),
                ...(selectedRoom && { ruangan_otmil_id: selectedRoom }),
                ...(filterInputSearch && { nama_desktop: filterInputSearch }),
                ...(selectedStatusDesktop && { status_desktop: selectedStatusDesktop }),
              }
            })
            : (params = {})


    // Hapus `filter` jika semua nilai kosong
    if (Object.keys(params.filter).length === 0) {
      delete params.filter;
    }

    // Tentukan parameter yang akan digunakan untuk permintaan API
    const requestParams = Object.keys(params.filter || {}).length === 0 ? {} : params.filter;
    try {
      // if (selectedBuilding === "" && selectedFloor === "" && selectedRoom === "" && filterGateWay === "" && selectedStatusGateWay === "") {
      //   console.log("Masuk ke Kosong");

      //   const { data } = await apiReadGateway(params, token?.token);
      //   setDataList(data?.records);
      // } else {
      //   console.log("Masuk ke Filter");

      //   const { data } = await apiReadGateway(params.filter, token?.token);
      //   setDataList(data?.records);
      // }
      console.log(requestParams.length === 0 ? "Masuk ke Kosong" : "Masuk ke Filter");

      if (hoverData === "Gateway") {
        const { data } = await apiReadGateway(requestParams, token?.token);
        setDataList(data?.records);
      } else if (hoverData === "Camera") {
        const { data } = await apiReadKamera(requestParams, token?.token);
        setDataList(data?.records);
      } else if (hoverData === "TV") {
        const { data } = await apiReadTVDashboard(requestParams, token?.token);
        setDataList(data?.records);
      } else if (hoverData === "NVR") {
        const { data } = await apiReadNVRDashboard(requestParams, token?.token);
        setDataList(data?.records);
      } else if (hoverData === "PTP") {
        const { data } = await apiReadRoutesDashboard(requestParams, token?.token);
        setDataList(data?.records);
      } else if (hoverData === "Access") {
        const { data } = await apiReadAccessDoorDashboard(requestParams, token?.token);
        setDataList(data?.records);
      } else if (hoverData === "Desktop") {
        const { data } = await apiReadDesktopDashboard(requestParams, token?.token);
        setDataList(data?.records);
      } else {
        console.log("Tidak masuk ke API Manapun");
        
      }

      // setPagination({
      //   ...pagination,
      //   total: data?.pages?.meta?.total || 0,
      // });
    } catch (error: any) {
      // console.log(error.message);
      console.log("error", error);
    }
    setIsLoading(false);
  }

  const handleSearchClick = () => {
    switch (hoverData) {
      case "Smartwatch":
        let paramsName: any[] = [];
        selectedList.map((item: any) => {
          // const formattedNama = item.nama.replace(/\s/g, "%20");
          const formattedNama = item.nama;
          paramsName.push(formattedNama);
        });
        setSelectedTypeData("Smartwatch");
        setDataParams({
          nama: paramsName,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "Pegawai":
        let paramsNamePetugas: any[] = [];
        selectedListPetugas.map((item: any) => {
          const formattedNama = item.nama;
          paramsNamePetugas.push(formattedNama);
        });
        setSelectedTypeData("Pegawai");
        setDataParams({
          nama: paramsNamePetugas,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "Helmet":
        let paramsNamePengunjung: any[] = [];
        selectedListPengunjung.map((item: any) => {
          const formattedNama = item.nama;
          paramsNamePengunjung.push(formattedNama);
        });
        setSelectedTypeData("Helmet");
        setDataParams({
          nama: paramsNamePengunjung,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "Gateway":
        console.log("masuksinipakeEKo");
        let paramsNameGateway: any[] = [];
        selectedListGateway.map((item: any) => {
          const formattedNama = item.nama_gateway;
          paramsNameGateway.push(formattedNama);
        });
        console.log("paramsNameGateway", paramsNameGateway);
        setSelectedTypeData("Gateway");
        setDataParams({
          nama_gateway: paramsNameGateway,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "PTP":
        let paramsNamePTP: any[] = [];
        selectedListRoutes.map((item: any) => {
          const formattedNama = item.nama_access_point;
          paramsNamePTP.push(formattedNama);
        });
        setSelectedTypeData("PTP");
        setDataParams({
          nama_access_point: paramsNamePTP,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "Camera":
        let paramsNameCamera: any[] = [];
        selectedListCamera.map((item: any) => {
          const formattedNama = item.nama;
          paramsNameCamera.push(formattedNama);
        });
        setSelectedTypeData("Camera");
        setDataParams({
          nama: paramsNameCamera,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "Access":
        let paramsNameAccess: any[] = [];
        selectedListAccessDoor.map((item: any) => {
          const formattedNama = item.nama_access_door;
          paramsNameAccess.push(formattedNama);
        });
        setSelectedTypeData("Access");
        setDataParams({
          nama_access_door: paramsNameAccess,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "Face":
        let paramsNameFace: any[] = [];
        selectedListFaceRec.map((item: any) => {
          const formattedNama = item.nama_face_rec;
          paramsNameFace.push(formattedNama);
        });
        setSelectedTypeData("Face");
        setDataParams({
          nama_face_rec: paramsNameFace,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "Desktop":
        let paramsNameDesktop: any[] = [];
        selectedListDesktop.map((item: any) => {
          const formattedNama = item.nama_desktop;
          paramsNameDesktop.push(formattedNama);
        });
        setSelectedTypeData("Desktop");
        setDataParams({
          nama_desktop: paramsNameDesktop,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "TV":
        let paramsNameTV: any[] = [];
        selectedListTV.map((item: any) => {
          const formattedNama = item.nama_tv;
          paramsNameTV.push(formattedNama);
        });
        setSelectedTypeData("TV");
        setDataParams({
          nama_tv: paramsNameTV,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "M-Kiosk":
        let paramsNameSelfRec: any[] = [];
        selectedListSelfRec.map((item: any) => {
          const formattedNama = item.nama_m_kiosk;
          paramsNameSelfRec.push(formattedNama);
        });
        setSelectedTypeData("M-Kiosk");
        setDataParams({
          nama_m_kiosk: paramsNameSelfRec,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "NVR":
        let paramsNameNVR: any[] = [];
        selectedListNVR.map((item: any) => {
          const formattedNama = item.nama_nvr;
          paramsNameNVR.push(formattedNama);
        });
        setSelectedTypeData("NVR");
        setDataParams({
          nama_nvr: paramsNameNVR,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      case "NAS":
        let paramsNameNAS: any[] = [];
        selectedListNAS.map((item: any) => {
          const formattedNama = item.nama_nas;
          paramsNameNAS.push(formattedNama);
        });
        setSelectedTypeData("NAS");
        setDataParams({
          nama_nas: paramsNameNAS,
          lokasi_otmil_id: dataLokasiOtmil ?? null,
          lokasi_lemasmil_id: dataLokasiLemasMil ?? null,
        });
        break;
      default:
        setDataParams({});
        break;
    }
    console.log("Data_Search:", dataParams);
    handleClose();
  };

  const handleSelectItem = (item: any) => {
    switch (hoverData) {
      case "Smartwatch":
        setSelectedList([...selectedList, item]);
        setFilteredData(filteredData.filter((data: any) => data !== item));
        break;
      case "Pegawai":
        setSelectedListPetugas([...selectedListPetugas, item]);
        setFilteredDataPetugas(
          filteredDataPetugas.filter((data: any) => data !== item)
        );
        break;
      case "Helmet":
        setSelectedListPengunjung([...selectedListPengunjung, item]);
        setFilteredDataPengunjung(
          filteredDataPengunjung.filter((data: any) => data !== item)
        );
        break;
      case "Gateway":
        setSelectedListGateway([...selectedListGateway, item]);
        setFilteredDataGateway(
          filteredDataGateway.filter((data: any) => data !== item)
        );
        break;
      case "PTP":
        setSelectedListRoutes([...selectedListRoutes, item]);
        setFilteredDataRoutes(
          filteredDataRoutes.filter((data: any) => data !== item)
        );
        break;
      case "Camera":
        setSelectedListCamera([...selectedListCamera, item]);
        setFilteredDataCamera(
          filteredDataCamera.filter((data: any) => data !== item)
        );
        break;
      case "Access":
        setSelectedListAccessDoor([...selectedListAccessDoor, item]);
        setFilteredDataAccessDoor(
          filteredDataAccessDoor.filter((data: any) => data !== item)
        );
        break;
      case "Face":
        setSelectedListFaceRec([...selectedListFaceRec, item]);
        setFilteredDataFaceRec(
          filteredDataFaceRec.filter((data: any) => data !== item)
        );
        break;
      case "Desktop":
        setSelectedListDesktop([...selectedListDesktop, item]);
        setFilteredDataDesktop(
          filteredDataDesktop.filter((data: any) => data !== item)
        );
        break;
      case "TV":
        setSelectedListTV([...selectedListTV, item]);
        setFilteredDataTV(filteredDataTV.filter((data: any) => data !== item));
        break;
      case "M-Kiosk":
        setSelectedListSelfRec([...selectedListSelfRec, item]);
        setFilteredDataSelfRec(
          filteredDataSelfRec.filter((data: any) => data !== item)
        );
        break;
      case "NVR":
        setSelectedListNVR([...selectedListNVR, item]);
        setFilteredDataNVR(
          filteredDataNVR.filter((data: any) => data !== item)
        );
        break;
      case "NAS":
        setSelectedListNAS([...selectedListNAS, item]);
        setFilteredDataNAS(
          filteredDataNAS.filter((data: any) => data !== item)
        );
        break;
      default:
        break;
    }
  };

  const handleRemoveItem = (index: any) => {
    switch (hoverData) {
      case "Smartwatch":
        const itemToRemove = selectedList[index];
        setSelectedList(selectedList.filter((_, i) => i !== index));
        setFilteredData([...filteredData, itemToRemove]);
        break;
      case "Pegawai":
        const itemToRemovePetugas = selectedListPetugas[index];
        setSelectedListPetugas(
          selectedListPetugas.filter((_, i) => i !== index)
        );
        setFilteredDataPetugas([...filteredDataPetugas, itemToRemovePetugas]);
        break;
      case "Helmet":
        const itemToRemovePengunjung = selectedListPengunjung[index];
        setSelectedListPengunjung(
          selectedListPengunjung.filter((_, i) => i !== index)
        );
        setFilteredDataPengunjung([
          ...filteredDataPengunjung,
          itemToRemovePengunjung,
        ]);
        break;
      case "Gateway":
        const itemToRemoveGateway = selectedListGateway[index];
        setSelectedListGateway(
          selectedListGateway.filter((_, i) => i !== index)
        );
        setFilteredDataGateway([...filteredDataGateway, itemToRemoveGateway]);
        break;
      case "PTP":
        const itemToRemovePTP = selectedListRoutes[index];
        setSelectedListRoutes(selectedListRoutes.filter((_, i) => i !== index));
        setFilteredDataRoutes([...filteredDataRoutes, itemToRemovePTP]);
        break;
      case "Camera":
        const itemToRemoveCamera = selectedListCamera[index];
        setSelectedListCamera(selectedListCamera.filter((_, i) => i !== index));
        setFilteredDataCamera([...filteredDataCamera, itemToRemoveCamera]);
        break;
      case "Access":
        const itemToRemoveAccess = selectedListAccessDoor[index];
        setSelectedListAccessDoor(
          selectedListAccessDoor.filter((_, i) => i !== index)
        );
        setFilteredDataAccessDoor([
          ...filteredDataAccessDoor,
          itemToRemoveAccess,
        ]);
        break;
      case "Face":
        const itemToRemoveFace = selectedListFaceRec[index];
        setSelectedListFaceRec(
          selectedListFaceRec.filter((_, i) => i !== index)
        );
        setFilteredDataFaceRec([...filteredDataFaceRec, itemToRemoveFace]);
        break;
      case "Desktop":
        const itemToRemoveDesktop = selectedListDesktop[index];
        setSelectedListDesktop(
          selectedListDesktop.filter((_, i) => i !== index)
        );
        setFilteredDataDesktop([...filteredDataDesktop, itemToRemoveDesktop]);
        break;
      case "TV":
        const itemToRemoveTV = selectedListTV[index];
        setSelectedListTV(selectedListTV.filter((_, i) => i !== index));
        setFilteredDataTV([...filteredDataTV, itemToRemoveTV]);
        break;
      case "M-Kiosk":
        const itemToRemoveSelfRec = selectedListSelfRec[index];
        setSelectedListSelfRec(
          selectedListSelfRec.filter((_, i) => i !== index)
        );
        setFilteredDataSelfRec([...filteredDataSelfRec, itemToRemoveSelfRec]);
        break;
      case "NVR":
        const itemToRemoveNVR = selectedListNVR[index];
        setSelectedListNVR(selectedListNVR.filter((_, i) => i !== index));
        setFilteredDataNVR([...filteredDataNVR, itemToRemoveNVR]);
        break;
      case "NAS":
        const itemToRemoveNAS = selectedListNAS[index];
        setSelectedListNAS(selectedListNAS.filter((_, i) => i !== index));
        setFilteredDataNAS([...filteredDataNAS, itemToRemoveNAS]);
        break;
      default:
        break;
    }
  };

  //Fetch Data API

  const fetchDataGedung = async () => {
    setIsLoading(true);
    let params
    try {
      const { data } = await apiGedungOtmilRead(params, token?.token);
      setOptionsGedung(data?.records);
      // setPagination({
      //   ...pagination,
      //   total: data?.pages?.meta?.total || 0,
      // });
    } catch (error: any) {
      // console.log(error.message);
      console.log("error", error);
    }
    setIsLoading(false);
  };

  console.log(dataList.length, "Panjang data list bro");


  const fetchDataLantai = async () => {
    setIsLoading(true);
    let params = {
      gedung_otmil_id: selectedBuilding
    }
    console.log(params, "ini param bro");

    try {
      const { data } = await apiLantaiOtmilRead(params, token?.token);
      setOptionsLantai(data?.records);
    } catch (error: any) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  const fetchDataRuangan = async () => {
    setIsLoading(true);
    let params = {
      lantai_otmil_id: selectedFloor
    }
    console.log(params, "ini param bro");

    try {
      const { data } = await apiReadAllRuanganOtmil(params, token?.token);
      setOptionsRuangan(data?.records);
    } catch (error: any) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  const fetchDataGateWay = async () => {
    setIsLoading(true);
    let params = {
      ruangan_otmil_id: selectedRoom
    }

    try {
      const { data } = await apiReadGateway(params, token?.token);
      setOptionsGateWay(data?.records);
    } catch (error: any) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataGedung();
  }, []);

  useEffect(() => {
    fetchDataRuangan();
    fetchDataLantai();
    if (selectedBuilding || selectedFloor) {
      handleSearchDataClick();
    }
  }, [selectedBuilding, selectedFloor]);

  // useEffect(() => {
  //   if (hoverData === "Gateway") {
  //     fetchDataGateWay();
  //   }
  // }, [hoverData, selectedRoom]);

  useEffect(() => {
    switch (hoverData) {
      case "Smartwatch":
        const filtered = datawbpSearch.filter((data: any) =>
          data.nama.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredData(
          filtered.filter((data: any) => !selectedList.includes(data))
        );
        break;
      case "Pegawai":
        const filteredPetugas = datapetugasSearch.filter((data: any) =>
          data.nama.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataPetugas(
          filteredPetugas.filter(
            (data: any) => !selectedListPetugas.includes(data)
          )
        );
        break;
      case "Helmet":
        const filteredPengunjung = datapengunjungSearch.filter((data: any) =>
          data.nama.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataPengunjung(
          filteredPengunjung.filter(
            (data: any) => !selectedListPengunjung.includes(data)
          )
        );
        break;
      case "Gateway":
        const filteredGateway = datagatewaySearch.filter(
          (data: any) =>
            data?.nama_gateway?.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataGateway(
          filteredGateway.filter(
            (data: any) => !selectedListGateway.includes(data)
          )
        );
        break;
      case "PTP":
        const filteredPTP = dataroutesSearch.filter(
          (data: any) =>
            data?.nama_access_point
              ?.toLowerCase()
              .includes(dataSearch.toLowerCase())
        );
        setFilteredDataRoutes(
          filteredPTP.filter((data: any) => !selectedListRoutes.includes(data))
        );
        break;
      case "Camera":
        const filteredCamera = datacameraSearch.filter((data: any) =>
          data.nama.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataCamera(
          filteredCamera.filter(
            (data: any) => !selectedListCamera.includes(data)
          )
        );
        break;
      case "Access":
        const filteredAccess = dataaccessDoorSearch.filter(
          (data: any) =>
            data?.nama_access_door
              ?.toLowerCase()
              .includes(dataSearch.toLowerCase())
        );
        setFilteredDataAccessDoor(
          filteredAccess.filter(
            (data: any) => !selectedListAccessDoor.includes(data)
          )
        );
        break;
      case "Face":
        const filteredFace = datafaceRecSearch.filter(
          (data: any) =>
            data?.nama_face_rec
              ?.toLowerCase()
              .includes(dataSearch.toLowerCase())
        );
        setFilteredDataFaceRec(
          filteredFace.filter(
            (data: any) => !selectedListFaceRec.includes(data)
          )
        );
        break;
      case "Desktop":
        const filteredDesktop = datadesktopSearch.filter(
          (data: any) =>
            data?.nama_desktop.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataDesktop(
          filteredDesktop.filter(
            (data: any) => !selectedListDesktop.includes(data)
          )
        );
        break;
      case "TV":
        const filteredTV = datatvSearch.filter(
          (data: any) =>
            data?.nama_tv?.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataTV(
          filteredTV.filter((data: any) => !selectedListTV.includes(data))
        );
        break;
      case "M-Kiosk":
        const filteredSelfRec = dataselfRecSearch.filter(
          (data: any) =>
            data?.nama_m_kiosk?.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataSelfRec(
          filteredSelfRec.filter(
            (data: any) => !selectedListSelfRec.includes(data)
          )
        );
        break;
      case "NVR":
        const filteredNVR = datanvrSearch.filter(
          (data: any) =>
            data?.nama_nvr?.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataNVR(
          filteredNVR.filter((data: any) => !selectedListNVR.includes(data))
        );
        break;
      case "NAS":
        const filteredNAS = datanasSearch.filter(
          (data: any) =>
            data?.nama_nas?.toLowerCase().includes(dataSearch.toLowerCase())
        );
        setFilteredDataNAS(
          filteredNAS.filter((data: any) => !selectedListNAS.includes(data))
        );
        break;
      default:
        break;
    }
  }, [
    dataSearch,
    selectedList,
    datapetugasSearch,
    datapengunjungSearch,
    datagatewaySearch,
    datacameraSearch,
    dataroutesSearch,
    dataaccessDoorSearch,
    datafaceRecSearch,
    datadesktopSearch,
    datatvSearch,
    dataselfRecSearch,
    datanvrSearch,
    datanasSearch,
  ]);

  return isLoading ? (
    <Loader />
  ) :
    (<div className="w-[60vw] pb-7 text-white p-4 bg-slate-700">
      <section className="w-full flex mb-4 justify-between">
        <button type="button" onClick={handleClose}>
          <p className="font-semibold text-lg">{`Mencari Data ${hoverData}`}</p>
        </button>
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </section>
      <div className="flex w-full">
        <div className="flex w-full gap-2">
          {optionsGedung.length > 0 && (
            <select
              value={selectedBuilding}
              onChange={handleSelectBuilding}
              className="p-2 border rounded w-36 bg-meta-4 font-semibold"
            >
              <option disabled value="">
                Pilih Gedung
              </option>
              {optionsGedung.map((building) => (
                <option key={building.gedung_otmil_id} value={building.gedung_otmil_id}>
                  {building.nama_gedung_otmil}
                </option>
              ))}
            </select>
          )}

          {selectedBuilding && (optionsLantai.length > 0) && (
            <>
              {/* {buildings?.data?.records?.gedung?.find(
              (building) =>
                building.gedung_otmil_id ===
                selectedBuilding
            )?.lantai.length > 0 &&  */}
              {/* ( */}
              <select
                value={selectedFloor}
                onChange={handleSelectFloor}
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Lantai
                </option>
                {optionsLantai.map((building) => (
                  <option key={building.lantai_otmil_id} value={building.lantai_otmil_id}>
                    {building.nama_lantai}
                  </option>
                ))}
              </select>
              {/* ) */}
              {/* } */}
            </>
          )}

          {selectedFloor && (
            <>
              {/* {buildings?.data?.records?.gedung
            ?.find(
              (building) =>
                building.gedung_otmil_id ===
                selectedBuilding
            )
            ?.lantai.find(
              (floor: any) =>
                floor.lantai_otmil_id === selectedFloor
            )?.ruangan.length > 0 && ( */}
              <select
                value={selectedRoom}
                onChange={handleSelectRoom
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Ruangan
                </option>
                {optionsRuangan.map((item) => (
                  <option key={item.ruangan_otmil_id} value={item.ruangan_otmil_id}>
                    {item.nama_ruangan_otmil}
                  </option>
                ))}
                {/* <option value="Ruangan 1">Ruangan 1</option>
              <option value="Ruangan 2">Ruangan 2</option>
              <option value="Ruangan 3">Ruangan 3</option>
              <option value="Ruangan 4">Ruangan 4</option> */}
              </select>
              {/* ) */}
              {/* } */}
            </>
          )

          }

          {/* Filter GateWay */}

          {hoverData === "Gateway" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterInputSearch}
                  placehorder="Cari nama GateWay"
                  onChange={handleFilterInputSearch}
                />
              </div>
              {/* <select
              value={filterGateWay}
              onChange={handleFilterGateWay
              }
              className="p-2 border rounded w-36 bg-meta-4 font-semibold"
            >
              <option disabled value="">
                Pilih Gate Way
              </option>
              {optionsGateWay.map((item) => (
                <option key={item.gateway_id} value={item.gateway_id}>
                  {item.nama_gateway}
                </option>
              ))}
            </select> */}
            </>
          )}

          {filterInputSearch && hoverData === "Gateway" && (
            <>
              <select
                value={selectedStatusGateWay}
                onChange={handleSelecStatustGateWay
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Status Gate Way
                </option>
                <option value="aktif">Online</option>
                <option value="tidak">Offline</option>
              </select>
            </>
          )}

          {/* Filter Kamera */}

          {hoverData === "Camera" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterInputSearch}
                  placehorder="Cari nama Camera"
                  onChange={handleFilterInputSearch}
                />
              </div>
            </>
          )}

          {/* {selectedRoom && hoverData === "Camera" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterCamera}
                  placehorder="Cari nama Camera"
                  onChange={handleFilterCamera}
                />
              </div>
            </>
          )} */}

          {filterInputSearch && hoverData === "Camera" && (
            <>
              <select
                value={selectedStatusKamera}
                onChange={handleSelectStatusCamera
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Status Camera
                </option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </>
          )}

          {/* Filter Tv */}

          {hoverData === "TV" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterInputSearch}
                  placehorder="Cari nama TV"
                  onChange={handleFilterInputSearch}
                />
              </div>
            </>
          )}

          {filterInputSearch && hoverData === "TV" && (
            <>
              <select
                value={selectedStatusTv}
                onChange={handleSelecStatustTv
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Status TV
                </option>
                <option value="aktif">Online</option>
                <option value="tidak">Offline</option>
              </select>
            </>
          )}

          {/* Filter NVR */}

          {hoverData === "NVR" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterInputSearch}
                  placehorder="Cari nama NVR"
                  onChange={handleFilterInputSearch}
                />
              </div>
            </>
          )}

          {filterInputSearch && hoverData === "NVR" && (
            <>
              <select
                value={selectedStatusNVR}
                onChange={handleSelecStatustNVR
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Status NVR
                </option>
                <option value="aktif">Online</option>
                <option value="tidak">Offline</option>
              </select>
            </>
          )}

          {/* Filter PTP */}

          {hoverData === "PTP" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterInputSearch}
                  placehorder="Cari nama PTP"
                  onChange={handleFilterInputSearch}
                />
              </div>
            </>
          )}

          {filterInputSearch && hoverData === "PTP" && (
            <>
              <select
                value={selectedStatusPTP}
                onChange={handleSelecStatustPTP
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Status PTP
                </option>
                <option value="aktif">Online</option>
                <option value="tidak">Offline</option>
              </select>
            </>
          )}

          {/* Filter Access Door */}

          {hoverData === "Access" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterInputSearch}
                  placehorder="Cari nama Access Door"
                  onChange={handleFilterInputSearch}
                />
              </div>
            </>
          )}

          {filterInputSearch && hoverData === "Access" && (
            <>
              <select
                value={selectedStatusAccessDoor}
                onChange={handleSelecStatustAccessDoor
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Status Access Door
                </option>
                <option value="aktif">Online</option>
                <option value="tidak">Offline</option>
              </select>
            </>
          )}

          {/* Filter Desktop */}

          {hoverData === "Desktop" && (
            <>
              <div className="search">
                <SearchInputButtonModal
                  value={filterInputSearch}
                  placehorder="Cari nama Desktop"
                  onChange={handleFilterInputSearch}
                />
              </div>
            </>
          )}

          {filterInputSearch && hoverData === "Desktop" && (
            <>
              <select
                value={selectedStatusDesktop}
                onChange={handleSelecStatustDesktop
                }
                className="p-2 border rounded w-36 bg-meta-4 font-semibold"
              >
                <option disabled value="">
                  Pilih Status Desktop
                </option>
                <option value="aktif">Online</option>
                <option value="tidak">Offline</option>
              </select>
            </>
          )}

          <button
            className=" rounded-sm bg-blue-300 px-6 py-1 text-xs font-medium b-search ml-auto mr-3"
            type="button"
            onClick={handleSearchDataClick}
            id="button-addon1"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-black"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* <Input
          style={CustomInputStyle}
          className="mr-2 py-2 border-2 border-slate-950 rounded-md w-full"
          value={dataSearch}
          onChange={handleSearchChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearchClick}
        >
          Cari
        </button> */}
        </div>
        {/* <div className="flex w-full">
      <Input
        style={CustomInputStyle}
        className="mr-2 py-2 border-2 border-slate-950 rounded-md w-full"
        value={dataSearch}
        onChange={handleSearchChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSearchClick}
      >
        Cari
      </button>
    </div> */}
      </div>

      {(hoverData === "Gateway" && dataList.length > 0) ? (
        <>
          <div className="flex flex-col mt-3">
            <div
              className="grid rounded-t-md bg-gray-2 dark:bg-slate-600 grid-cols-3"
            >
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama GateWay
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status GateWay
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Ruangan
                </h5>
              </div>
              {/* <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Status
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Ruangan
          </h5>
        </div> */}
              {/* <div
          className={` hidden p-2.5 text-center xl:p-5`}
        >
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Aksi
          </h5>
        </div> */}
            </div>
          </div>
          {dataList.map((item: any) => {
            return (
              <div>
                <div
                  className={"grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4"}
                >
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_gateway}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.status_gateway === "aktif" ? (
                        <p className="text-green-500 dark:text-green-300">
                          Online
                        </p>
                      ) : item.status_gateway === "tidak" ? (
                        <p className="text-red-500 dark:text-red-300">
                          Offline
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
        </>

      ) : (hoverData === "Camera" && dataList.length > 0) ? (
        <>
          <div className="flex flex-col mt-3">
            <div
              className="grid rounded-t-md bg-gray-2 dark:bg-slate-600 grid-cols-5"
            >
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Kamera
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Merk Kamera
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Model Kamera
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status Kamera
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Ruangan
                </h5>
              </div>
            </div>
          </div>
          {dataList.map((item: any) => {
            return (
              <div>
                <div
                  className={"grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4"}
                >
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_kamera}
                    </p>
                  </div>
                  <div
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.merk}
                    </p>
                  </div>
                  <div
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.model}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.status_kamera === "online" ? (
                        <p className="text-green-500 dark:text-green-300">
                          Online
                        </p>
                      ) : item.status_kamera === "offline" ? (
                        <p className="text-red-500 dark:text-red-300">
                          Offline
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
        </>
      ) : (hoverData === "TV" && dataList.length > 0) ? (
        <>
          <div className="flex flex-col mt-3">
            <div
              className="grid rounded-t-md bg-gray-2 dark:bg-slate-600 grid-cols-4"
            >
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama TV
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Model TV
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status TV
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Ruangan
                </h5>
              </div>
            </div>
          </div>
          {dataList.map((item: any) => {
            return (
              <div>
                <div
                  className={"grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4"}
                >
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_tv}
                    </p>
                  </div>
                  <div
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.model}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.status_tv === "aktif" ? (
                        <p className="text-green-500 dark:text-green-300">
                          Online
                        </p>
                      ) : item.status_tv === "tidak" ? (
                        <p className="text-red-500 dark:text-red-300">
                          Offline
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
        </>
      ) : (hoverData === "NVR" && dataList.length > 0) ? (
        <>
          <div className="flex flex-col mt-3">
            <div
              className="grid rounded-t-md bg-gray-2 dark:bg-slate-600 grid-cols-3"
            >
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama NVR
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status NVR
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Ruangan
                </h5>
              </div>
            </div>
          </div>
          {dataList.map((item: any) => {
            return (
              <div>
                <div
                  className={"grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4"}
                >
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_nvr}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.status_nvr === "aktif" ? (
                        <p className="text-green-500 dark:text-green-300">
                          Online
                        </p>
                      ) : item.status_nvr === "tidak" ? (
                        <p className="text-red-500 dark:text-red-300">
                          Offline
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
        </>
      ) : (hoverData === "PTP" && dataList.length > 0) ? (
        <>
          <div className="flex flex-col mt-3">
            <div
              className="grid rounded-t-md bg-gray-2 dark:bg-slate-600 grid-cols-3"
            >
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama PTP
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status PTP
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Ruangan
                </h5>
              </div>
            </div>
          </div>
          {dataList.map((item: any) => {
            return (
              <div>
                <div
                  className={"grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4"}
                >
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_access_point}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.status_access_point === "aktif" ? (
                        <p className="text-green-500 dark:text-green-300">
                          Online
                        </p>
                      ) : item.status_access_point === "tidak" ? (
                        <p className="text-red-500 dark:text-red-300">
                          Offline
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
        </>
      ) : (hoverData === "Access" && dataList.length > 0) ? (
        <>
          <div className="flex flex-col mt-3">
            <div
              className="grid rounded-t-md bg-gray-2 dark:bg-slate-600 grid-cols-3"
            >
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Access Door
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status Access Door
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Ruangan
                </h5>
              </div>
            </div>
          </div>
          {dataList.map((item: any) => {
            return (
              <div>
                <div
                  className={"grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4"}
                >
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_access_door}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.status_access_door === "aktif" ? (
                        <p className="text-green-500 dark:text-green-300">
                          Online
                        </p>
                      ) : item.status_access_door === "tidak" ? (
                        <p className="text-red-500 dark:text-red-300">
                          Offline
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
        </>
      ) : (hoverData === "Desktop" && dataList.length > 0) ? (
        <>
          <div className="flex flex-col mt-3">
            <div
              className="grid rounded-t-md bg-gray-2 dark:bg-slate-600 grid-cols-3"
            >
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Nama Desktop
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status Desktop
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Ruangan
                </h5>
              </div>
            </div>
          </div>
          {dataList.map((item: any) => {
            return (
              <div>
                <div
                  className={"grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4"}
                >
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_desktop}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.status_desktop === "aktif" ? (
                        <p className="text-green-500 dark:text-green-300">
                          Online
                        </p>
                      ) : item.status_desktop === "tidak" ? (
                        <p className="text-red-500 dark:text-red-300">
                          Offline
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div
                    // onClick={() => handleDetailClick(item)}
                    className="cursor-pointer hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                  >
                    <p className="text-black dark:text-white">
                      {item.nama_ruangan_otmil}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-600"></div>
              </div>
            );
          })}
        </>
      ) :
        <div className="flex flex-col mt-3 justify-center items-center h-full">
          <p className="text-xl text-slate-400 pt-8">Data tidak ada! (Silahkan tekan tombol cari!)</p>
        </div>
        // null
      }




      {hoverData === "Smartwatch" ? (
        <div className="flex flex-wrap w-[84%]">
          {selectedList.map((item: any, index: any) => (
            <div className="mt-3 pl-1 flex" key={index}>
              <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                <p className="text-slate-950">{item.nama}</p>
                <FaTrashAlt
                  className="text-red-700 hover: cursor-pointer hover:text-red-500"
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : hoverData === "Pegawai" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListPetugas.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "Helmet" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListPengunjung.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "Gateway" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListGateway.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_gateway}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "PTP" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListRoutes.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_access_point}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "Camera" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListCamera.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "Access" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListAccessDoor.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_access_door}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "Face" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListFaceRec.map((item: any, index: any) => (
              <div
                className="
            mt-3 pl-1 flex"
                key={index}
              >
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_face_rec}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "Desktop" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListDesktop.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_desktop}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "TV" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListTV.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_tv}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "M-Kiosk" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListSelfRec.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_m_kiosk}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "NVR" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListNVR.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_nvr}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : hoverData === "NAS" ? (
        <>
          <div className="flex flex-wrap w-[84%]">
            {selectedListNAS.map((item: any, index: any) => (
              <div className="mt-3 pl-1 flex" key={index}>
                <div className="bg-neutral-400 flex justify-between items-center px-2 py-1 rounded-md gap-2">
                  <p className="text-slate-950">{item.nama_nas}</p>
                  <FaTrashAlt
                    className="text-red-700 hover: cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}

      {dataSearch &&
        hoverData === "Smartwatch" &&
        filteredData.length > 0 &&
        filteredData.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nomor_kasus} - ${data.nama}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "Pegawai" &&
        filteredDataPetugas.length > 0 &&
        filteredDataPetugas.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nrp} - ${data.nama}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "Helmet" &&
        filteredDataPengunjung.length > 0 &&
        filteredDataPengunjung.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "Gateway" &&
        filteredDataGateway.length > 0 &&
        filteredDataGateway.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_gateway}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "PTP" &&
        filteredDataRoutes.length > 0 &&
        filteredDataRoutes.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_access_point}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "Camera" &&
        filteredDataCamera.length > 0 &&
        filteredDataCamera.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "Access" &&
        filteredDataAccessDoor.length > 0 &&
        filteredDataAccessDoor.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_access_door}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "Face" &&
        filteredDataFaceRec.length > 0 &&
        filteredDataFaceRec.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_face_rec}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "Desktop" &&
        filteredDataDesktop.length > 0 &&
        filteredDataDesktop.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_desktop}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "TV" &&
        filteredDataTV.length > 0 &&
        filteredDataTV.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_tv}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "M-Kiosk" &&
        filteredDataSelfRec.length > 0 &&
        filteredDataSelfRec.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_m_kiosk}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "NVR" &&
        filteredDataNVR.length > 0 &&
        filteredDataNVR.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_nvr}`}</p>
            </div>
          </div>
        ))}

      {dataSearch &&
        hoverData === "NAS" &&
        filteredDataNAS.length > 0 &&
        filteredDataNAS.slice(0, 5).map((data: any, index: any) => (
          <div
            key={index}
            className="mt-3 ml-2 w-[83%] border-b-2 border-slate-950 py-2 cursor-pointer"
            onClick={() => handleSelectItem(data)}
          >
            <div>
              <p className="text-white">{`${data.nama_nas}`}</p>
            </div>
          </div>
        ))}
    </div>)
}

export default ModalSearch;
