import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const Statistic = lazy(() => import('../pages/Statistic/Statistic'));
const StatisticLemasmil = lazy(
  () => import('../pages/DashboardLemasmil/statistic')
);
import CameraDetail from '../pages/Camera/CameraDetail';
const CameraList = lazy(() => import('../pages/Camera/CameraList'));
// const CameraDetail = lazy(() => import('../pages/Camera/CameraDetail'));
const Map = lazy(() => import('../pages/Map/Map'));
const DatabaseSearch = lazy(
  () => import('../pages/DatabaseSearch/DatabaseSearch')
);
const DeviceList = lazy(() => import('../pages/Device/DeviceList'));
const DeviceBraceletList = lazy(() => import('../pages/Device/BraceletList'));
const DeviceCameraList = lazy(() => import('../pages/Device/CameraList'));
const DeviceGatewayList = lazy(() => import('../pages/Device/GatewayList'));
const UserList = lazy(() => import('../pages/User/UserList'));
const LocationList = lazy(() => import('../pages/Location/LocationList'));
const DatabaseSearchList = lazy(
  () => import('../pages/DatabaseSearch/DatabaseSearchList')
);
const InmateDatabaseSearchByName = lazy(
  () => import('../pages/DatabaseSearch/InmateDatabaseSearchByName')
);
const EmployeeDatabaseSearchByName = lazy(
  () => import('../pages/DatabaseSearch/EmployeeDatabaseSearchByName')
);
const LogList = lazy(() => import('../pages/LogPage/LogList'));
const InmateLog = lazy(() => import('../pages/LogPage/InmateLog'));
const RealtimeLog = lazy(() => import('../pages/LogPage/RealtimeLog'));
const MainSetting = lazy(() => import('../pages/SettingPage/MainSetting'));
const LocationSetting = lazy(
  () => import('../pages/SettingPage/LocationSetting')
);
const RoomSetting = lazy(() => import('../pages/SettingPage/RoomSetting'));
const DeviceSetting = lazy(() => import('../pages/SettingPage/DeviceSetting'));
const LiveChatList = lazy(() => import('../pages/LiveChat/LiveChatList'));

const RegisterFaceList = lazy(
  () => import('../pages/RegisterFace/RegisterFaceList')
);
const AddInmateFace = lazy(() => import('../pages/RegisterFace/AddInmateFace'));
const AddStaffFace = lazy(() => import('../pages/RegisterFace/AddStaffFace'));

const MasterDataList = lazy(() => import('../pages/MasterData/MasterDataList'));
const MasterDataVisitor = lazy(
  () => import('../pages/MasterData/VisitorData/VisitorList')
);
const MasterDataInmate = lazy(
  () => import('../pages/MasterData/InmateData/InmateList')
);
const MasterDataStaff = lazy(
  () => import('../pages/MasterData/StaffData/StaffList')
);
const MasterDataEvent = lazy(
  () => import('../pages/MasterData/EventData/EventList')
);
const MasterDataRoom = lazy(
  () => import('../pages/MasterData/RoomData/RoomList')
);
const MasterDataCaseType = lazy(
  () => import('../pages/MasterData/CaseTypeData/CaseTypeList')
);

const TahananLemasmil = lazy(
  () => import('../../pages/DashboardPusat/TahananLemasmil')
);
const LemasmilTeintegrasi = lazy(
  () => import('../../pages/DashboardPusat/LemasmilTeintegrasi')
);
const OtmilTerintegrasi = lazy(
  () => import('../../pages/DashboardPusat/OtmilTerintegrasi')
);
const TahananOtmil = lazy(
  () => import('../../pages/DashboardPusat/TahananOtmil')
);

const coreRoutes = [
  {
    path: '/statistic',
    title: 'Statistic',
    component: Statistic,
  },
  {
    path: '/statisticLemasmil',
    title: 'StatisticLemasmil',
    component: StatisticLemasmil,
  },
  // {
  //   path: '/calendar',
  //   title: 'Calender',
  //   component: Calendar,
  // },
  {
    path: '/log-realtime',
    title: 'RealtimeLog',
    component: RealtimeLog,
  },
  {
    path: '/inmate-log',
    title: 'InmateLog',
    component: InmateLog,
  },
  {
    path: '/log-riwayat',
    title: 'LogList',
    component: LogList,
  },
  {
    path: '/pelacakan-wajah-petugas',
    // path: '/db-employee-search-by-name',
    title: 'EmployeeDatabaseSearchByName',
    component: EmployeeDatabaseSearchByName,
  },
  {
    path: '/pelacakan-wajah-prajurit',
    // path: '/db-inmate-search-by-name',
    title: 'InmateDatabaseSearchByName',
    component: InmateDatabaseSearchByName,
  },
  {
    path: '/db-search-list',
    title: 'DatabaseSearchList',
    component: DatabaseSearchList,
  },
  {
    path: '/lokasi',
    title: 'LocationList',
    component: LocationList,
  },
  {
    path: '/manajemen-pengguna',
    title: 'UserList',
    component: UserList,
  },
  {
    path: '/perangkat-gateway',
    // path: '/device-gateway-list',
    title: 'DeviceGatewayList',
    component: DeviceGatewayList,
  },
  {
    path: '/perangkat-kamera',
    // path: '/device-camera-list',
    title: 'DeviceCameraList',
    component: DeviceCameraList,
  },
  {
    path: '/perangkat-gelang',
    // path: '/device-bracelet-list',
    title: 'DeviceBraceletList',
    component: DeviceBraceletList,
  },
  {
    path: '/device-list',
    title: 'DeviceList',
    component: DeviceList,
  },
  {
    path: '/pelacakan-dengan-gambar',
    title: 'DatabaseSearch',
    component: DatabaseSearch,
  },
  {
    path: '/peta',
    title: 'Map',
    component: Map,
  },
  {
    path: '/live-chat-list',
    title: 'LiveChatList',
    component: LiveChatList,
  },
  // {
  //   path: '/calendar',
  //   title: 'Calender',
  //   component: Calendar,
  // },
  // {
  //   path: '/profile',
  //   title: 'Profile',
  //   component: Profile,
  // },
  // {
  //   path: '/forms/form-elements',
  //   title: 'Forms Elements',
  //   component: FormElements,
  // },
  // {
  //   path: '/forms/form-layout',
  //   title: 'Form Layouts',
  //   component: FormLayout,
  // },
  // {
  //   path: '/tables',
  //   title: 'Tables',
  //   component: Tables,
  // },
  // {
  //   path: '/settings',
  //   title: 'Settings',
  //   component: Settings,
  // },
];

const routes = [...coreRoutes];
export default routes;
