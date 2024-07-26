import { lazy } from "react";

const Statistic = lazy(() => import("../pages/Statistic"));

const StatisticLemasmil = lazy(
	() => import("../pages/DashboardLemasmil/statistic")
);
import CameraDetail from "../pages/Camera/CameraDetail";
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

/* -----------WORKSTATION-----------------*/
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
		path: "/dashboard/statistic",
		title: "Statistic",
		component: Statistic,
	},
	{
		path: "/dashboard/statisticLemasmil",
		title: "StatisticLemasmil",
		component: StatisticLemasmil,
	},
	// {
	//   path: '/calendar',
	//   title: 'Calender',
	//   component: Calendar,
	// },
	{
		path: "/dashboard/log-realtime",
		title: "RealtimeLog",
		component: RealtimeLog,
	},
	{
		path: "/dashboard/staff-log",
		title: "InmateLog",
		component: InmateLog,
	},
	// {
	//   path: "/dashboard/inmate-log",
	//   title: "InmateLog",
	//   component: InmateLog,
	// },
	{
		path: "/dashboard/log-riwayat",
		title: "LogList",
		component: LogList,
	},
	{
		path: "/dashboard/pelacakan-wajah-petugas",
		// path: '/db-employee-search-by-name',
		title: "EmployeeDatabaseSearchByName",
		component: EmployeeDatabaseSearchByName,
	},
	{
		path: "/dashboard/pelacakan-wajah-prajurit",
		// path: '/db-inmate-search-by-name',
		title: "InmateDatabaseSearchByName",
		component: InmateDatabaseSearchByName,
	},
	{
		path: "/dashboard/db-search-list",
		title: "DatabaseSearchList",
		component: DatabaseSearchList,
	},
	{
		path: "/dashboard/lokasi",
		title: "LocationList",
		component: LocationList,
	},
	{
		path: "/dashboard/pengaturan-list/manajemen-pengguna",
		title: "UserList",
		component: UserList,
	},
	{
		path: "/dashboard/perangkat-gateway",
		// path: '/device-gateway-list',
		title: "DeviceGatewayList",
		component: DeviceGatewayList,
	},
	{
		path: "/dashboard/perangkat-kamera",
		// path: '/device-camera-list',
		title: "DeviceCameraList",
		component: DeviceCameraList,
	},
	{
		path: "/dashboard/perangkat-gelang",
		// path: '/device-bracelet-list',
		title: "DeviceBraceletList",
		component: DeviceBraceletList,
	},
	{
		path: "/dashboard/device-list",
		title: "DeviceList",
		component: DeviceList,
	},
	{
		path: "/dashboard/pelacakan-dengan-gambar",
		title: "DatabaseSearch",
		component: DatabaseSearch,
	},
	{
		path: "/peta",
		title: "Map",
		component: Map,
	},
	{
		path: "/dashboard/peta/:gedung",
		title: "Gedung",
		component: Gedung,
	},
	{
		path: "/dashboard/peta/:gedung/:ruangan",
		title: "Room",
		component: Room,
	},
	{
		path: "/dashboard/live-chat-list",
		title: "LiveChatList",
		component: LiveChatList,
	},
	{
		path: "/dashboard/daftar-inventaris",
		title: "daftar inventaris",
		component: DaftarInventaris,
	},
	/* -------------WORKSTATION-----------------*/
	{
		path: "/workstation/entry-data",
		title: "Entry Data",
		component: EntryData,
	},
	{
		path: "/workstation/penyidikan",
		title: "penyidikan",
		component: Penyidikan,
	},
	{
		path: "/workstation/pencatatan-bap",
		title: "pencatatan bap",
		component: PencatatanBAP,
	},
	{
		path: "/workstation/daftar-sidang",
		title: "daftar sidang",
		component: DaftarSidang,
	},
	{
		path: "/workstation/daftar-kasus",
		title: "daftar kasus",
		component: DaftarKasus,
	},
	{
		path: "/dashboard/staff",
		title: "MasterDataStaff",
		component: MasterDataStaff,
	},
	{
		path: "/workstation/kegiatan",
		title: "MasterDataEvent",
		component: MasterDataEvent,
	},

	{
		path: "/workstation/shift-jaga",
		title: "Shift Jaga",
		component: ShiftJaga,
	},
	{
		path: "/workstation/shift-jaga/calendar-shift",
		title: "Calendar Shift",
		component: CalendarShift,
	},
	{
		path: "/workstation/shift-jaga/group-shift",
		title: "GroupShift",
		component: GroupShift,
	},
	{
		path: "/workstation/shift-jaga/penugasan",
		title: "Penugasan",
		component: Penugasan,
	},
	{
		path: "/workstation/shift-jaga/data-schedule-shift",
		title: "DataSceduleShift",
		component: DataSceduleShift,
	},

	{
		path: "/workstation/master-data",
		title: "MasterDataList",
		component: MasterDataList,
	},
	{
		path: "/workstation/master-data/tersangka",
		title: "MasterDataInmate",
		component: MasterDataInmate,
	},
	{
		path: "/workstation/master-data/petugas",
		title: "MasterDataStaff",
		component: MasterDataStaff,
	},
	{
		path: "/workstation/master-data/pengunjung",
		title: "MasterDataVisitor",
		component: MasterDataVisitor,
	},
	{
		path: "/workstation/master-data/jenis-perkara",
		title: "MasterDataCaseType",
		component: MasterDataCaseType,
	},
	{
		path: "/workstation/master-data/kategori-perkara",
		title: "kategori perkara",
		component: MasterDataKategoriPerkara,
	},
	{
		path: "/workstation/master-data/ruangan",
		title: "MasterDataRoom",
		component: MasterDataRoom,
	},
	{
		path: "/workstation/master-data/tipe-asset",
		title: "tipe asset data",
		component: DaftarTipeAsset,
	},
	{
		path: "/workstation/master-data/oditur",
		title: "daftar jaksa",
		component: DaftarJaksa,
	},
	{
		path: "/workstation/master-data/oditur/penyidik",
		title: "oditur penyidik data",
		component: DaftarJaksaPenyidik,
	},
	{
		path: "/workstation/master-data/oditur/penuntut",
		title: "oditur penuntut data",
		component: DaftarJaksaPenuntut,
	},
	{
		path: "/workstation/master-data/saksi",
		title: "saksi data",
		component: DaftarSaksi,
	},
	{
		path: "/workstation/master-data/ahli",
		title: "ahli data",
		component: DaftarAhli,
	},
	{
		path: "/workstation/master-data/jenis-sidang",
		title: "jenis persidangan data",
		component: DaftarJenisPersidangan,
	},
	{
		path: "/workstation/master-data/barang-bukti",
		title: "barang bukti",
		component: BarangBukti,
	},
	{
		path: "/workstation/master-data/pengadilan-militer",
		title: "pengadilan militer",
		component: PengadilanMiliter,
	},
	{
		path: "/workstation/master-data/gedung",
		title: "Data Gedung",
		component: DaftarGedung,
	},
	{
		path: "/workstation/master-data/data-lantai",
		title: "Data Lantai",
		component: DaftarLantai,
	},
	{
		path: "/workstation/daftar-inventaris",
		title: "daftar inventaris",
		component: DaftarInventaris,
	},
	{
		path: "/workstation/kamera-live/:nama_kamera",
		title: "CameraDetail",
		component: CameraDetail,
	},
	{
		// path: "/workstation/kamera-live",
		path: "/dashboard/kamera-live",
		title: "CameraList",
		component: CameraList,
	},

	{
		path: "/workstation/kamera-tersimpan",
		title: "CameraSave",
		component: CameraSave,
	},
	{
		path: "/workstation/kamera-tersimpan/list/:id",
		title: "CameraSaveList",
		component: CameraListSave,
	},
	{
		path: "/workstation/kamera-tersimpan/list/:id/:nama_kamera",
		title: "CameraSaveList",
		component: CameraSaveDetail,
	},
	{
		path: "/workstation/kamera-playback",
		title: "kamera playback",
		component: CameraPlaybackDetail,
	},
	{
		path: "/workstation/pelacakan-wajah-petugas",
		// path: '/db-employee-search-by-name',
		title: "EmployeeDatabaseSearchByName",
		component: EmployeeDatabaseSearchByName,
	},
	{
		path: "/workstation/pelacakan-wajah-prajurit",
		// path: '/db-inmate-search-by-name',
		title: "InmateDatabaseSearchByName",
		component: InmateDatabaseSearchByName,
	},
	{
		path: "/workstation/pelacakan",
		title: "DatabaseSearchList",
		component: DatabaseSearchList,
	},
	{
		path: "/workstation/live-chat-list",
		title: "LiveChatList",
		component: LiveChatList,
	},
	{
		path: "/dashboard/pengaturan-list",
		title: "setting",
		component: SettingList,
	},
	{
		path: "/workstation/log-riwayat",
		title: "LogListWK",
		component: LogListWK,
	},
	{
		path: "/workstation/log-riwayat/realtime",
		title: "RealtimeLogWK",
		component: RealtimeLogWK,
	},
	{
		path: "/workstation/log-riwayat/gateway",
		title: "GatewayLogWK",
		component: GatewayLogWK,
	},
	{
		path: "/workstation/pelacakan-dengan-gambar",
		title: "DatabaseSearch",
		component: DatabaseSearch,
	},
	{
		// path: "/workstation/pengaturan-list/manajemen-pengguna",
		path: "/dashboard/pengaturan-list/manajemen-pengguna",
		title: "UserList",
		component: UserList,
	},
	{
		path: "/dashboard/pengaturan-list/perangkat",
		title: "DeviceList",
		component: DeviceList,
	},
	{
		// path: "/workstation/pengaturan-list/perangkat/gateway",
		path: "/dashboard/pengaturan-list/perangkat/gateway",
		// path: '/device-gateway-list',
		title: "DeviceGatewayListWK",
		component: DeviceGatewayListWK,
	},
	{
		path: "/dashboard/pengaturan-list/perangkat/helmet",
		title: "DeviceHelmet",
		component: DeviceHelmet,
	},
	{
		// path: "/workstation/pengaturan-list/perangkat/kamera",
		path: "/dashboard/pengaturan-list/perangkat/kamera",
		// path: '/device-camera-list',
		title: "DeviceCameraList",
		component: DeviceKameraList,
	},
	{
		// path: "/workstation/pengaturan-list/perangkat/gelang",
		path: "/dashboard/pengaturan-list/perangkat/gelang",
		// path: '/device-bracelet-list',
		title: "DeviceSmartwatchListWK",
		component: DeviceSmartwatchListWK,
	},
	{
		// path: "/workstation/pengaturan-list/perangkat/gelang",
		path: "/dashboard/pengaturan-list/perangkat/smartwatch-list",
		// path: '/device-bracelet-list',
		title: "DeviceSmartwatchListWK",
		component: DeviceSmartwatchListWK,
	},
	{
		// path: "/workstation/pengaturan-list/perangkat/gelang",
		path: "/dashboard/pengaturan-list/perangkat/smartwatch",
		// path: '/device-bracelet-list',
		title: "Smartwatch",
		component: MainMenuSmartwatch,
	},
];

const routes = [...coreRoutes];
export default routes;
