import { lazy } from "react";
import CameraDetail from "../pages/Camera/CameraDetail";

const Statistic = lazy(() => import("../pages/Statistic"));

const StatisticLemasmil = lazy(
	() => import("../pages/DashboardLemasmil/statistic")
);
const CameraList = lazy(() => import("../pages/Camera/CameraList"));
// const CameraDetail = lazy(() => import('../pages/Camera/CameraDetail'));
const Map = lazy(() => import("../pages/Map/Map"));
const Gedung = lazy(() => import("../pages/Map/Gedung/Gedung"));
const Room = lazy(() => import("../pages/Map/Room/Room"));
const DatabaseSearch = lazy(
	() => import("../pages/DatabaseSearch/DatabaseSearch")
);
const DeviceList = lazy(() => import("../pages/Device/DeviceList"));
const DeviceBraceletList = lazy(() => import("../pages/Device/BraceletList"));
const DeviceCameraList = lazy(() => import("../pages/Device/CameraList"));
const DeviceGatewayList = lazy(() => import("../pages/Device/GatewayList"));
const UserList = lazy(() => import("../pages/User/UserList"));
const LocationList = lazy(() => import("../pages/Location/LocationList"));
const DatabaseSearchList = lazy(
	() => import("../pages/DatabaseSearch/DatabaseSearchList")
);
const InmateDatabaseSearchByName = lazy(
	() => import("../pages/DatabaseSearch/InmateDatabaseSearchByName")
);
const EmployeeDatabaseSearchByName = lazy(
	() => import("../pages/DatabaseSearch/EmployeeDatabaseSearchByName")
);
const LogList = lazy(() => import("../pages/LogPage/LogList"));
const InmateLog = lazy(() => import("../pages/LogPage/InmateLog"));
const RealtimeLog = lazy(() => import("../pages/LogPage/RealtimeLog"));
const LiveChatList = lazy(() => import("../pages/LiveChat/LiveChatList"));
const DaftarInventaris = lazy(
	() => import("../pages/DaftarInventaris/InventarisList")
);

/* ---------------------------*/
const EntryData = lazy(() => import("../pages/EntryData/Index"));
const Penyidikan = lazy(
	() => import("../pages/Penyidikan/DataPenyidikan/PenyidikanList")
);
const PencatatanBAP = lazy(() => import("../pages/PencatatanBAP/BAPList"));
const DaftarSidang = lazy(
	() => import("../pages/DaftarSidangPerkara/SidangList")
);
const DaftarKasus = lazy(() => import("../pages/Daftarkasus/DaftarKasusList"));
const AktifitasPengunjung = lazy(
	() => import("../pages/AktifitasPengunjung/AktifitasPengunjungList")
);
const ShiftJaga = lazy(() => import("../pages/Schedule/shiftJaga"));
const CalendarShift = lazy(
	() => import("../pages/Schedule/CalenderShift/calenderShift")
);
const GroupShift = lazy(() => import("../pages/Schedule/GrupShift/grupShift"));
const DataSceduleShift = lazy(
	() => import("../pages/Schedule/SceduleShift/dataSceduleShift")
);

const Penugasan = lazy(
	() => import("../pages/Schedule/Penugasan/dataPenugasan")
);
const MasterDataEvent = lazy(
	() => import("../pages/MasterData/EventData/EventList")
);
const MasterDataList = lazy(
	() => import("../pages/MasterData/MasterDataListWK")
);
const MasterDataVisitor = lazy(
	() => import("../pages/MasterData/VisitorData/VisitorList")
);
const MasterDataInmate = lazy(
	() => import("../pages/MasterData/InmateData/InmateList")
);
const MasterDataStaff = lazy(
	() => import("../pages/MasterData/StaffData/StaffList")
);

const MasterDataRoom = lazy(
	() => import("../pages/MasterData/RoomData/RoomList")
);
const MasterDataCaseType = lazy(
	() => import("../pages/MasterData/CaseTypeData/CaseTypeList")
);
const MasterDataKategoriPerkara = lazy(
	() => import("../pages/MasterData/KategoriPerkara/KategoriPerkaraList")
);
const DaftarTipeAsset = lazy(
	() => import("../pages/MasterData/TipeAssetData/TipeList")
);

const DaftarHakim = lazy(
	() => import("../pages/MasterData/HakimData/HakimList")
);

const DaftarJaksaPenyidik = lazy(
	() =>
		import(
			"../pages/MasterData/JaksaData/OditurPenyidik/OditurPenyidikList"
		)
);

const DaftarJaksaPenuntut = lazy(
	() =>
		import("../pages/MasterData/JaksaData/JaksaPenuntut/JaksaPenuntutList")
);

const DaftarJaksa = lazy(
	() => import("../pages/MasterData/JaksaData/JaksaList")
);

const DaftarSaksi = lazy(
	() => import("../pages/MasterData/SaksiData/SaksiList")
);
const DaftarAhli = lazy(() => import("../pages/MasterData/AhliData/AhliList"));

const DaftarGedung = lazy(
	() => import("../pages/MasterData/GedungData/GedungList")
);

const DaftarLantai = lazy(
	() => import("../pages/MasterData/Lantai/LantaiList")
);

const DaftarJenisPersidangan = lazy(
	() =>
		import("../pages/MasterData/JenisPersidanganData/JenisPersidanganList")
);
const BarangBukti = lazy(
	() => import("../pages/MasterData/BarangBukti/BarangBuktiList")
);
const PengadilanMiliter = lazy(
	() => import("../pages/MasterData/PengadilanMiliter/PengadilanMiliterList")
);
const CameraSave = lazy(() => import("../pages/Camera/CameraSave"));
const CameraListSave = lazy(() => import("../pages/Camera/CameraListSave"));
const CameraSaveDetail = lazy(() => import("../pages/Camera/CameraSaveDetail"));
const CameraPlaybackDetail = lazy(
	() => import("../pages/Camera/CameraPlaybackDetail")
);
const SettingList = lazy(() => import("../pages/SettingPage/SettingList"));

const DeviceKameraList = lazy(
	() => import("../pages/Device/Kamera/KameraList")
);

const DeviceSmartwatchListWK = lazy(
	() => import("../pages/Device/Smartwatch/Device/SmartwatchList")
);
const MainMenuSmartwatch = lazy(
	() => import("../pages/Device/Smartwatch/MainMenuSmartwatch")
);

const DeviceGatewayListWK = lazy(
	() => import("../pages/Device/Gateway/GatewayListWK")
);
const DeviceHelmet = lazy(() => import("../pages/Device/Helmet/HelmetList"));

const LogListWK = lazy(() => import("../pages/LogPage/LogListWK"));
const RealtimeLogWK = lazy(
	() => import("../pages/LogPage/LogFaceRecognition/RealtimeLog")
);
const GatewayLogWK = lazy(
	() => import("../pages/LogPage/LogAccessControl/GatewayLog")
);

const coreRoutes = [
	{
		path: "/statistic",
		title: "Statistic",
		component: Statistic,
	},
	{
		path: "/statisticLemasmil",
		title: "StatisticLemasmil",
		component: StatisticLemasmil,
	},
	// {
	//   path: '/calendar',
	//   title: 'Calender',
	//   component: Calendar,
	// },
	{
		path: "/log-realtime",
		title: "RealtimeLog",
		component: RealtimeLog,
	},
	{
		path: "/staff-log",
		title: "InmateLog",
		component: InmateLog,
	},
	// {
	//   path: "/inmate-log",
	//   title: "InmateLog",
	//   component: InmateLog,
	// },
	{
		path: "/log-riwayat",
		title: "LogList",
		component: LogList,
	},
	{
		path: "/pelacakan-wajah-petugas",
		// path: '/db-employee-search-by-name',
		title: "EmployeeDatabaseSearchByName",
		component: EmployeeDatabaseSearchByName,
	},
	{
		path: "/pelacakan-wajah-prajurit",
		// path: '/db-inmate-search-by-name',
		title: "InmateDatabaseSearchByName",
		component: InmateDatabaseSearchByName,
	},
	{
		path: "/db-search-list",
		title: "DatabaseSearchList",
		component: DatabaseSearchList,
	},
	{
		path: "/lokasi",
		title: "LocationList",
		component: LocationList,
	},
	{
		path: "/pengaturan-list/manajemen-pengguna",
		title: "UserList",
		component: UserList,
	},
	{
		path: "/perangkat-gateway",
		// path: '/device-gateway-list',
		title: "DeviceGatewayList",
		component: DeviceGatewayList,
	},
	{
		path: "/perangkat-kamera",
		// path: '/device-camera-list',
		title: "DeviceCameraList",
		component: DeviceCameraList,
	},
	{
		path: "/perangkat-gelang",
		// path: '/device-bracelet-list',
		title: "DeviceBraceletList",
		component: DeviceBraceletList,
	},
	{
		path: "/device-list",
		title: "DeviceList",
		component: DeviceList,
	},
	{
		path: "/pelacakan-dengan-gambar",
		title: "DatabaseSearch",
		component: DatabaseSearch,
	},
	{
		path: "/home",
		title: "Map",
		component: Map,
	},
	{
		path: "/peta/:gedung",
		title: "Gedung",
		component: Gedung,
	},
	{
		path: "/peta/:gedung/:ruangan",
		title: "Room",
		component: Room,
	},
	{
		path: "/live-chat-list",
		title: "LiveChatList",
		component: LiveChatList,
	},
	{
		path: "/daftar-inventaris",
		title: "daftar inventaris",
		component: DaftarInventaris,
	},
	/* -----------------------------*/
	{
		path: "/entry-data",
		title: "Entry Data",
		component: EntryData,
	},
	{
		path: "/penyidikan",
		title: "penyidikan",
		component: Penyidikan,
	},
	{
		path: "/pencatatan-bap",
		title: "pencatatan bap",
		component: PencatatanBAP,
	},
	{
		path: "/daftar-sidang",
		title: "daftar sidang",
		component: DaftarSidang,
	},
	{
		path: "/daftar-kasus",
		title: "daftar kasus",
		component: DaftarKasus,
	},
	{
		path: "/staff",
		title: "MasterDataStaff",
		component: MasterDataStaff,
	},
	{
		path: "/kegiatan",
		title: "MasterDataEvent",
		component: MasterDataEvent,
	},

	{
		path: "/shift-jaga",
		title: "Shift Jaga",
		component: ShiftJaga,
	},
	{
		path: "/shift-jaga/calendar-shift",
		title: "Calendar Shift",
		component: CalendarShift,
	},
	{
		path: "/shift-jaga/group-shift",
		title: "GroupShift",
		component: GroupShift,
	},
	{
		path: "/shift-jaga/penugasan",
		title: "Penugasan",
		component: Penugasan,
	},
	{
		path: "/shift-jaga/data-schedule-shift",
		title: "DataSceduleShift",
		component: DataSceduleShift,
	},

	{
		path: "/master-data",
		title: "MasterDataList",
		component: MasterDataList,
	},
	{
		path: "/master-data/tersangka",
		title: "MasterDataInmate",
		component: MasterDataInmate,
	},
	{
		path: "/master-data/petugas",
		title: "MasterDataStaff",
		component: MasterDataStaff,
	},
	{
		path: "/master-data/pengunjung",
		title: "MasterDataVisitor",
		component: MasterDataVisitor,
	},
	{
		path: "/master-data/jenis-perkara",
		title: "MasterDataCaseType",
		component: MasterDataCaseType,
	},
	{
		path: "/master-data/kategori-perkara",
		title: "kategori perkara",
		component: MasterDataKategoriPerkara,
	},
	{
		path: "/master-data/ruangan",
		title: "MasterDataRoom",
		component: MasterDataRoom,
	},
	{
		path: "/master-data/tipe-asset",
		title: "tipe asset data",
		component: DaftarTipeAsset,
	},
	{
		path: "/master-data/oditur",
		title: "daftar jaksa",
		component: DaftarJaksa,
	},
	{
		path: "/master-data/oditur/penyidik",
		title: "oditur penyidik data",
		component: DaftarJaksaPenyidik,
	},
	{
		path: "/master-data/oditur/penuntut",
		title: "oditur penuntut data",
		component: DaftarJaksaPenuntut,
	},
	{
		path: "/master-data/saksi",
		title: "saksi data",
		component: DaftarSaksi,
	},
	{
		path: "/master-data/ahli",
		title: "ahli data",
		component: DaftarAhli,
	},
	{
		path: "/master-data/jenis-sidang",
		title: "jenis persidangan data",
		component: DaftarJenisPersidangan,
	},
	{
		path: "/master-data/barang-bukti",
		title: "barang bukti",
		component: BarangBukti,
	},
	{
		path: "/master-data/pengadilan-militer",
		title: "pengadilan militer",
		component: PengadilanMiliter,
	},
	{
		path: "/master-data/gedung",
		title: "Data Gedung",
		component: DaftarGedung,
	},
	{
		path: "/master-data/data-lantai",
		title: "Data Lantai",
		component: DaftarLantai,
	},
	{
		path: "/daftar-inventaris",
		title: "daftar inventaris",
		component: DaftarInventaris,
	},
	{
		path: "/kamera-live/:nama_kamera",
		title: "CameraDetail",
		component: CameraDetail,
	},
	{
		// path: "/kamera-live",
		path: "/kamera-live",
		title: "CameraList",
		component: CameraList,
	},

	{
		path: "/kamera-tersimpan",
		title: "CameraSave",
		component: CameraSave,
	},
	{
		path: "/kamera-tersimpan/list/:id",
		title: "CameraSaveList",
		component: CameraListSave,
	},
	{
		path: "/kamera-tersimpan/list/:id/:nama_kamera",
		title: "CameraSaveList",
		component: CameraSaveDetail,
	},
	{
		path: "/kamera-playback",
		title: "kamera playback",
		component: CameraPlaybackDetail,
	},
	{
		path: "/pelacakan-wajah-petugas",
		// path: '/db-employee-search-by-name',
		title: "EmployeeDatabaseSearchByName",
		component: EmployeeDatabaseSearchByName,
	},
	{
		path: "/pelacakan-wajah-prajurit",
		// path: '/db-inmate-search-by-name',
		title: "InmateDatabaseSearchByName",
		component: InmateDatabaseSearchByName,
	},
	{
		path: "/pelacakan",
		title: "DatabaseSearchList",
		component: DatabaseSearchList,
	},
	{
		path: "/live-chat-list",
		title: "LiveChatList",
		component: LiveChatList,
	},
	{
		path: "/pengaturan-list",
		title: "setting",
		component: SettingList,
	},
	{
		path: "/log-riwayat",
		title: "LogListWK",
		component: LogListWK,
	},
	{
		path: "/log-riwayat/realtime",
		title: "RealtimeLogWK",
		component: RealtimeLogWK,
	},
	{
		path: "/log-riwayat/gateway",
		title: "GatewayLogWK",
		component: GatewayLogWK,
	},
	{
		path: "/pelacakan-dengan-gambar",
		title: "DatabaseSearch",
		component: DatabaseSearch,
	},
	{
		// path: "/pengaturan-list/manajemen-pengguna",
		path: "/manajemen-pengguna",
		title: "UserList",
		component: UserList,
	},
	{
		path: "/pengaturan-list/perangkat",
		title: "DeviceList",
		component: DeviceList,
	},
	{
		// path: "/pengaturan-list/perangkat/gateway",
		path: "/gateway",
		// path: '/device-gateway-list',
		title: "DeviceGatewayListWK",
		component: DeviceGatewayListWK,
	},
	{
		path: "/helmet",
		title: "DeviceHelmet",
		component: DeviceHelmet,
	},
	{
		// path: "/pengaturan-list/perangkat/kamera",
		path: "/kamera",
		// path: '/device-camera-list',
		title: "DeviceCameraList",
		component: DeviceKameraList,
	},
	{
		// path: "/pengaturan-list/perangkat/gelang",
		path: "/gelang",
		// path: '/device-bracelet-list',
		title: "DeviceSmartwatchListWK",
		component: DeviceSmartwatchListWK,
	},
	{
		// path: "/pengaturan-list/perangkat/gelang",
		path: "/smartwatch",
		// path: '/device-bracelet-list',
		title: "DeviceSmartwatchListWK",
		component: DeviceSmartwatchListWK,
	},
	{
		// path: "/pengaturan-list/perangkat/gelang",
		path: "/pengaturan-list/perangkat/smartwatch",
		// path: '/device-bracelet-list',
		title: "Smartwatch",
		component: MainMenuSmartwatch,
	},
];

const routes = [...coreRoutes];
export default routes;
