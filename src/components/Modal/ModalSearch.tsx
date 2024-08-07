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

  const dataLokasiOtmil = dataUser.lokasi_otmil_id;
  const dataLokasiLemasMil = dataUser.lokasi_lemasmil_id;

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

  return (
    <div className="w-[60vw] pb-7 text-white p-4 bg-slate-700">
      <section className="w-full flex mb-4 justify-between">
        <button type="button" onClick={handleClose}>
          <p className="font-semibold text-lg">{`Mencari Data ${hoverData}`}</p>
        </button>
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </section>
      <div className="flex w-full">
        <div className="flex w-full">
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
    </div>
  );
}

export default ModalSearch;
