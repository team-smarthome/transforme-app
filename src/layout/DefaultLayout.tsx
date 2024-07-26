import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DropdownNotification from "../components/DropdownNotification";
import { useAtom } from "jotai";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { selectedRoutess } from "../utils/atomstates";

import {
  isFullScreenAtom,
  NotificationAtom,
  isSidebarNotifOpen,
} from "../utils/atomstates";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import BackgroundSecurityImage from "../images/security-background.jpg";

const DefaultLayout = () => {
  const [appMode] = useAtom(selectedRoutess);

  const dataAppMoede = localStorage.getItem("appMode");
  console.log("dataAppMode", dataAppMoede);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  let [isFullScreen, setIsFullScreen] = useAtom(isFullScreenAtom);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isworkstation, setIsworkstation] = useState<boolean>(true);

  const [sidebarNotifOpen, setSidebarNotifOpen] = useAtom(isSidebarNotifOpen);
  const [buildingOpen, setBuildingOpen] = useState(true);
  const navigate = useNavigate();
  const handle = useFullScreenHandle();

  const backgroundStyle = {
    // backgroundImage: `url(${BackgroundSecurityImage})`,
    backgroundColor: "#0d1f3c",
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // backgroundAttachment: 'fixed',
  };

  const ls_dataUser = localStorage.getItem("dataUser");

  useEffect(() => {
    if (!ls_dataUser) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isFullScreen) {
      handle.exit();
    } else {
      handle.enter();
    }
  }, [isFullScreen]);
  useEffect(() => {
    console.log(appMode, "appModeSaatIni");
    if (dataAppMoede === "workstation" || appMode === "workstation") {
      setIsworkstation(true);
      setSidebarNotifOpen(true);
      // document.querySelector('body')?.classList.add('admin');
    } else {
      setIsworkstation(false);
      setSidebarNotifOpen(false);
      // document.querySelector('body')?.classList.remove('admin');
    }
  }, [appMode]);

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.71)", // Adjust the alpha value (0.5 in this example) to make it darker or lighter
  };

  return (
    <>
      {isworkstation ? (
        <>
          <div className="dark:text-bodydark bg-slate-700">
            {/* <div className="dark:text-bodydark" style={backgroundStyle}> */}
            {/* <div className="absolute inset-0" style={overlayStyle}></div> */}

            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Sidebar Start ===== --> */}

              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header
sidebarOpen={sidebarOpen}
setSidebarOpen={setSidebarOpen}
notificationOpen={notificationOpen}
setNotificationOpen={setNotificationOpen}
buildingOpen={buildingOpen}
setBuildingOpen={setBuildingOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl  p-4">
                    <Outlet />
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
          </div>
        </>
      ) : (
        <>
          <div className="dark:text-bodydark" style={backgroundStyle}>
            <FullScreen
              handle={handle}
              onChange={(isFull) => {
                setIsFullScreen(!isFull);
              }}
            >
              <Toaster
                position="top-right"
                reverseOrder={false}
                containerClassName="overflow-auto"
              />
              <div className="absolute inset-0" style={overlayStyle}></div>

              {/* <!-- ===== Page Wrapper Start ===== --> */}
              <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Notification Start ===== --> */}
                <DropdownNotification
                  notificationOpen={notificationOpen}
                  setNotificationOpen={setNotificationOpen}
                />
                {/* <!-- ===== Notification End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div
                  className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden hide-scroll`}
                >
                  {/* <!-- ===== Header Start ===== --> */}
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    notificationOpen={notificationOpen}
                    setNotificationOpen={setNotificationOpen}
                    buildingOpen={buildingOpen}
                    setBuildingOpen={setBuildingOpen}
                  />
                  {/* <!-- ===== Header End ===== --> */}

                  {/* <!-- ===== Main Content Start ===== --> */}
                  <main>
                    <div
                      className={`max-w-screen-2xl  p-4 ${
                        sidebarNotifOpen ? "w-[100vw]" : "w-[80vw]"
                      }`}
                    >
                      <Outlet />
                    </div>
                  </main>
                  {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
              </div>
              {/* <!-- ===== Page Wrapper End ===== --> */}
            </FullScreen>
          </div>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
