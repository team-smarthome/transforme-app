import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { notificationDummy } from "../utils/constants";
import {
  FaCalendar,
  FaRegBell,
  FaExclamationTriangle,
  FaWalking,
  FaHdd,
} from "react-icons/fa";
import { useAtom } from "jotai";
import { accordionWbpAtom, NotificationAtom } from "../utils/atomstates";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import useSound from "use-sound";
import { HiExclamationCircle } from "react-icons/hi2";
import { TiWarning } from "react-icons/ti";

import { ImCross } from "react-icons/im";

import "react-datepicker/dist/react-datepicker.css";
import { selectedRoutess, modeNotificationDropdown } from "../utils/atomstates";

interface NotificationProps {
  notificationOpen: boolean;
  setNotificationOpen: (arg: boolean) => void;
}

const DropdownNotification = ({
  notificationOpen,
  setNotificationOpen,
}: NotificationProps) => {
  const location = useLocation();
  const { pathname } = location;

  const [appMode] = useAtom(selectedRoutess);

  const dataAppMoede = localStorage.getItem("appMode");
  console.log("dataAppMode", dataAppMoede);

  const [isworkstation, setIsworkstation] = useState<boolean>(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationList, setNotificationList] = useState(notificationDummy);
  const [startDate, setStartDate] = useState(new Date());
  const [modeTab, setModeTab] = useAtom(modeNotificationDropdown);
  const [selectAccordion, setSelectAccordion] = useState<null | string>(null);
  const [accordionDataWbp, _] = useAtom(accordionWbpAtom);
  console.log(accordionDataWbp, "accordionDataWbp");

  console.log("modeTabsaaatini", modeTab);

  // const [notificationOpen, setNotificationOpen] = useAtom(NotificationAtom);
  const [playSound] = useSound("../../public/alert.mp3");
  console.log(notificationOpen, "notificationOpen 1");
  console.log(appMode, "notificationOpen app mode");
  console.log(dataAppMoede, "notificationOpen dataAppMoede");
  useEffect(() => {
    if (dataAppMoede === "workstation" || appMode === "workstation") {
      setIsworkstation(true);
      // document.querySelector('body')?.classList.add('admin');
    } else {
      setIsworkstation(false);
      setNotificationOpen(notificationOpen);
      // document.querySelector('body')?.classList.remove('admin');
    }
  }, [appMode]);

  let handleNotif = (item: any) => {
    console.log("notif check clicked");

    playSound();

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } left-[33%] w-[33%] h-[20vh] top-[40vh] absolute     rounded-lg`}
      >
        <audio src=".alert.mp3" autoPlay />
        <div
          className={`w-full h-full z-999 bg-white  absolute rounded-lg  flex  border-2  ${
            item.type === "Alert"
              ? "border-red-500"
              : item.type === "WBP"
              ? "border-green-500"
              : "border-blue-500"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              toast.remove();
            }}
            className="absolute right-4 top-4"
          >
            <ImCross
              className=""
              color={`${
                item.type === "Alert"
                  ? "red"
                  : item.type === "WBP"
                  ? "green"
                  : "blue"
              }`}
              width={30}
            />
          </button>
          <div className="flex w-full h-full justify-around  items-center">
            <div className="flex-shrink-0 flex justify-center items-center w-1/4">
              {item.type === "Alert" ? (
                <FaExclamationTriangle
                  size={30}
                  className="text-red-500 dark:text-red-500 w-2/3 h-auto animate-bounce"
                />
              ) : item.type === "WBP" ? (
                <FaWalking
                  size={30}
                  className="text-green-500 dark:text-green-500 w-2/3 h-auto animate-bounce"
                />
              ) : (
                <FaHdd
                  size={30}
                  className={`text-blue-500 dark:text-blue-500 w-2/3 h-auto animate-bounce ${
                    item.type === "Alert"
                      ? "text-red-500"
                      : item.type === "WBP"
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                />
              )}
              {/* <TiWarning className="w-2/3 h-auto animate-bounce" color="red" /> */}
            </div>
            <div className="ml-3 flex-1 text-centerflex-1 pr-4">
              <p
                className={`text-md font-bold  animate-pulse ${
                  item.type === "Alert"
                    ? "text-red-600"
                    : item.type === "WBP"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {item.header}
              </p>
              <p className="text-xs text-neutral-950">{item.content}</p>
            </div>
          </div>
        </div>
        <div
          className={`absolute rounded-lg w-full h-full  animate-ping blur ${
            item.type === "Alert"
              ? "bg-red-200"
              : item.type === "WBP"
              ? "bg-green-200"
              : "bg-blue-200"
          }`}
        ></div>
      </div>
    ));
  };

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
  };

  useEffect(() => {
    const clickHandler = (event: any) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target) &&
        !notificationOpen
      ) {
        setNotificationOpen(true);
      }
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, [notificationOpen]);

  console.log(notificationOpen, "accordionDataWbp");
  return (
    <>
      {isworkstation ? (
        <>{/* Konten untuk ketika isworkstation bernilai true */}</>
      ) : (
        <>
          <aside
            className={`fixed top-0 z-[90] h-screen mt-20 flex flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-dark2 translate-x-0 sm:right-0 pb-5 ${
              notificationOpen
                ? "w-0 translate-x-0"
                : "w-[20vw] -translate-x-full"
            } items-center`}
          >
            <ul className="flex w-full flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200 ">
              <li className="w-1/2 ">
                <button
                  onClick={() => {
                    setModeTab("data");
                  }}
                  aria-current="page"
                  className={` w-full flex px-4 gap-4 items-center justify-center py-1 ${
                    modeTab == "data" && "text-blue-600 border-b-4"
                  } bg-gray-100 rounded-t-lg active `}
                >
                  <svg
                    className="w-3 h-3  text-gray-400 group-hover:text-gray-500  dark:group-hover:text-gray-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                  <div>Data</div>
                </button>
              </li>
              <li className="w-1/2">
                <button
                  onClick={() => {
                    setModeTab("notification");
                  }}
                  className={`w-full flex px-4 gap-4 items-center justify-center  py-1 ${
                    modeTab == "notification" && "text-blue-600 border-b-4"
                  } rounded-t-lg hover:text-gray-600 hover:bg-gray-50 `}
                >
                  <svg
                    className="w-4 h-4  text-gray-400 group-hover:text-gray-500  dark:group-hover:text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"></path>
                  </svg>
                  <div>Notifikasi</div>
                </button>
              </li>
            </ul>
            {modeTab == "notification" ? (
              <div className="px-4.5 py-1 flex justify-center w-full items-center ">
                {/* <h5 className="text-sm font-medium text-bodydark2">Notifikasi</h5> */}
                <DatePicker
                  closeOnScroll={(e: any) => e.target === document}
                  showIcon
                  calendarIconClassName="h-10"
                  icon={
                    <FaCalendar
                      size={12}
                      className="text-black flex item-center h-2 text-center  p-0"
                    />
                  }
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                  className="text-xs rounded-md text-black flex items-center justify-center bg-slate-300  h-6 text-center px-1"
                />
              </div>
            ) : null}
            {modeTab == "notification" ? (
              <ul className=" overflow-y-scroll transition duration-300 ease-in-out h-[80vh]">
                {notificationList.map((notification: any, index: number) => {
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => {
                        handleNotif(notification);
                      }}
                    >
                      <Link
                        className="flex  gap-2.5 border-t border-stroke px-1 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 items-center"
                        to={notification.link}
                      >
                        {notification.type === "Alert" ? (
                          <FaExclamationTriangle
                            size={20}
                            className="text-red-500 dark:text-red-500 w-10"
                          />
                        ) : notification.type === "WBP" ? (
                          <FaWalking
                            size={20}
                            className="text-green-500 dark:text-green-500 w-10"
                          />
                        ) : (
                          <FaHdd
                            size={20}
                            className="text-blue-500 dark:text-blue-500 w-10"
                          />
                        )}
                        <div className="flex flex-col w-full text-left">
                          <p className="text-black dark:text-white text-sm font-semibold">
                            {notification.header}
                          </p>
                          <p className="text-sm">{notification.content}</p>

                          <p className="text-xs">{notification.date}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="w-[95%] pt-4 h-[10%]">
                <div id="accordion-open" data-accordion="open">
                  <h2
                    id="accordion-open-heading-1"
                    onClick={() => setSelectAccordion("wbp")}
                  >
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                      data-accordion-target="#accordion-open-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-open-body-1"
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 me-2 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>{" "}
                        Pegawai{" "}
                      </span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 ${
                          selectAccordion == "wbp" ? "rotate-0" : "rotate-180"
                        } shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id="accordion-open-body-1"
                    className={`${selectAccordion == "wbp" ? "" : "hidden"}`}
                    aria-labelledby="accordion-open-heading-1"
                  >
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                      <ul>
                        {accordionDataWbp?.wbp?.map(
                          (data: { nama: string }) => {
                            return <li>- {data?.nama}</li>;
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* <h2 id="accordion-open-heading-2" onClick={() => setSelectAccordion('petugas')}>
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>Petugas</span>
      <svg data-accordion-icon className={`w-3 h-3 ${selectAccordion == "petugas" ? "rotate-0": "rotate-180"} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2> */}
                  {/* <div id="accordion-open-body-2"  className={`${selectAccordion == "petugas" ? "" : "hidden"}`} aria-labelledby="accordion-open-heading-2">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classNamees from Tailwind CSS and components from Flowbite.</p>
    </div>
  </div> */}
                  <h2
                    id="accordion-open-heading-3"
                    onClick={() => setSelectAccordion("pengunjung")}
                  >
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                      data-accordion-target="#accordion-open-body-3"
                      aria-expanded="false"
                      aria-controls="accordion-open-body-3"
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 me-2 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Helmet
                      </span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 ${
                          selectAccordion == "pengunjung"
                            ? "rotate-0"
                            : "rotate-180"
                        } shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id="accordion-open-body-3"
                    className={`${
                      selectAccordion == "pengunjung" ? "" : "hidden"
                    }`}
                    aria-labelledby="accordion-open-heading-3"
                  >
                    <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        The main difference is that the core components from
                        Flowbite are open source under the MIT license, whereas
                        Tailwind UI is a paid product. Another difference is
                        that Flowbite relies on smaller and standalone
                        components, whereas Tailwind UI offers sections of
                        pages.
                      </p>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        However, we actually recommend using both Flowbite,
                        Flowbite Pro, and even Tailwind UI as there is no
                        technical reason stopping you from using the best of two
                        worlds.
                      </p>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Learn more about these technologies:
                      </p>
                      <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                        <li>
                          <a
                            href="https://flowbite.com/pro/"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Flowbite Pro
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://tailwindui.com/"
                            rel="nofollow"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Tailwind UI
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              /*
<div id="accordion-open" data-accordion="open">
  <h2 id="accordion-open-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> What is Flowbite?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-open-body-1" className="hidden" aria-labelledby="accordion-open-heading-1">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
    </div>
  </div>
  <h2 id="accordion-open-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>Is there a Figma file available?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-open-body-2" className="hidden" aria-labelledby="accordion-open-heading-2">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classNamees from Tailwind CSS and components from Flowbite.</p>
    </div>
  </div>
  <h2 id="accordion-open-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-3" aria-expanded="false" aria-controls="accordion-open-body-3">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> What are the differences between Flowbite and Tailwind UI?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-open-body-3" className="hidden" aria-labelledby="accordion-open-heading-3">
    <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
      <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
        <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
        <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
      </ul>
    </div>
  </div>
</div>
 */
            )}
          </aside>
        </>
      )}
    </>

    // </div>
    // </li>
  );
};

export default DropdownNotification;
