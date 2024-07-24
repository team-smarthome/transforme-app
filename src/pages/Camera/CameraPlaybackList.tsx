import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { apiBuilding } from "../../services/api";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { Alerts } from "./AlertCamera";
import { Error403Message } from "../../utils/constants";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const CameraPlaybackList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState("");
  const [dense, setDense] = React.useState(false);
  const [accordionState, setAccordionState] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });
  let [locationDeviceList, setLocationDeviceList] = useState([]);
  // let [locationDeviceListOtmil, setLocationDeviceListOtmil] = useState([]);
  // let [locationDeviceListLemasmil, setLocationDeviceListLemasmil] = useState(
  //   [],
  // );
  const [building, setBuilding] = useState([]);

  // useEffect(() => {
  //   apiLocationOnlineDeviceList()
  //     .then((res) => {
  //       setLocationDeviceList(res);
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });

  //   allKameraOtmil()
  //     .then((res) => {
  //       setLocationDeviceListOtmil(res);
  //       console.log(res, 'res otmil');
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });

  //   allKameraLemasmil()
  //     .then((res) => {
  //       setLocationDeviceListLemasmil(res);
  //       console.log(res, 'res lemasmil');
  //     })
  //     .catch((e: any) => {
  //       if (e.response.status === 403) {
  //         navigate('/', {
  //           state: { forceLogout: true, lastPage: location.pathname },
  //         });
  //       }
  //       Alerts.fire({
  //         icon: e.response.status === 403 ? 'warning' : 'error',
  //         title: e.response.status === 403 ? Error403Message : e.message,
  //       });
  //     });
  // }, []);

  //   useEffect(() => {
  //     apiLocationOnlineDeviceList().then((res) => {
  //       setLocationDeviceList(res);
  //     });
  //   }, []);
  useEffect(() => {
    fetchData();
  }, []);
  let fetchData = async () => {
    try {
      let dataLocal = localStorage.getItem("dataUser");
      let dataUser = JSON.parse(dataLocal!);
      dataUser = {
        lokasi_lemasmil_id: dataUser.lokasi_lemasmil_id,
        lokasi_otmil_id: dataUser.lokasi_otmil_id,
        nama_lokasi_lemasmil: dataUser.nama_lokasi_lemasmil,
        nama_lokasi_otmil: dataUser.nama_lokasi_otmil,
      };
      console.log("data user", dataUser);

      const response = await apiBuilding(dataUser);
      console.log("response from apiBuilding", response);

      if (response.data.status === "OK") {
        setBuilding(response);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e: any) {
      console.log("error", e);
      // if (e.response.status === 403) {
      //   navigate('/', {
      //     state: { forceLogout: true, lastPage: location.pathname },
      //   });
      // }
      // Alerts.fire({
      //   icon: e.response.status === 403 ? 'warning' : 'error',
      //   title: e.response.status === 403 ? Error403Message : e.message,
      // });
    }
    // setIsLoading(false);
  };
  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: "#s-gedung",
          popover: {
            title: "GEDUNG",
            description: "Pilih gedung yang diinginkan",
          },
        },
        {
          element: "#s-lantai",
          popover: {
            title: "Lantai",
            description: "Pilih lantai yang diinginkan",
          },
        },
        {
          element: "#s-ruangan",
          popover: {
            title: "Ruangan",
            description: "Pilih ruangan yang diinginkan",
          },
        },
      ],
    });

    driverObj.drive();
  };
  console.log(building, "set build");

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5 min-h-sceen">
        <div className="pt-4">
          <Breadcrumbs url={window.location.href} />
        </div>
        {/* <div className="flex flex-col items-center"> */}
        <div className="w-full flex justify-center pt-5 mb-10">
          <h2 className="font-bold text-xl tracking-tight mr-3">
            Daftar Kamera Playback
          </h2>
          {/* <div className="w-5"> */}
          <button>
            <HiQuestionMarkCircle
              values={filter}
              aria-placeholder="Show tutorial"
              // onChange={}
              onClick={handleClickTutorial}
            />
          </button>
          {/* </div> */}
        </div>
        {/* <p className="text-neutral-500 text-xl mt-3">Frequenty asked questions</p> */}
        {/* </div> */}

        {/* <div className="pl-180"> */}
        {building?.data?.records?.gedung.map((gedung, i) => {
          return (
            <>
              <div className="grid divide-y divide-neutral-200 max-w-xl border-b mx-auto">
                <div className="py-5" id="s-gedung">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span key={i}>{gedung.nama_gedung_otmil}</span>
                      <span className="transition-transform group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>

                    <div className="pt-2 ml-[20px] s-lantai">
                      {gedung?.lantai.map((a) => {
                        return (
                          <>
                            <details className="groupChild">
                              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>
                                  {a?.nama_lantai
                                    ? a?.nama_lantai
                                    : "Undifined"}
                                </span>
                                <span className="transition-transform groupChild-open:rotate-180">
                                  <svg
                                    fill="none"
                                    height="24"
                                    shapeRendering="geometricPrecision"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M6 9l6 6 6-6"></path>
                                  </svg>
                                </span>
                              </summary>
                              <div className="mb-2 ml-[20px]" id="s-ruangan">
                                {a?.ruangan.map((r) => {
                                  return (
                                    <>
                                      <details className="groupChild">
                                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                          <span>{r?.nama_ruangan_otmil}</span>
                                          <span className="transition-transform groupChild-open:rotate-180">
                                            <svg
                                              fill="none"
                                              height="24"
                                              shapeRendering="geometricPrecision"
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="1.5"
                                              viewBox="0 0 24 24"
                                              width="24"
                                            >
                                              <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                          </span>
                                        </summary>
                                        {r?.kamera.map((k) => (
                                          <NavLink
                                            to={`/kamera-playback/${k.kamera_id}`}
                                            state={k.nama_kamera}
                                          >
                                            <p
                                              className={` group-open:animate-fadeIn cursor-pointer ml-3 ${
                                                k.status_kamera == "aktif" ||
                                                k.status_kamera == "online"
                                                  ? "text-green-500" // warna teks hijau jika status kamera aktif
                                                  : k.status_kamera === "rusak"
                                                  ? "text-yellow-500" // warna teks kuning jika status kamera rusak
                                                  : "text-red-500" // warna teks merah untuk status kamera lainnya
                                              }`}
                                            >
                                              {k.nama_kamera} (
                                              {k.status_kamera === "aktif" ||
                                              k.status_kamera == "online"
                                                ? "aktif"
                                                : k.status_kamera === "rusak"
                                                ? "rusak"
                                                : "tidak aktif"}
                                              )
                                            </p>
                                          </NavLink>
                                        ))}
                                      </details>
                                    </>
                                  );
                                })}
                              </div>
                            </details>
                          </>
                        );
                      })}
                    </div>
                  </details>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
  //   <>
  //     <div className="max-w-screen-xl mx-auto px-5 min-h-sceen">
  //       {/* <div className="flex flex-col items-center"> */}
  //       <div className="w-full flex justify-center pt-5">
  //         <h2 className="font-bold text-xl tracking-tight mr-3">
  //           Daftar Kamera
  //         </h2>
  //         {/* <div className="w-5"> */}
  //         <button>
  //           <HiQuestionMarkCircle
  //             values={filter}
  //             aria-placeholder="Show tutorial"
  //             // onChange={}
  //             onClick={handleClickTutorial}
  //           />
  //         </button>
  //         {/* </div> */}
  //       </div>
  //       {/* <p className="text-neutral-500 text-xl mt-3">Frequenty asked questions</p> */}
  //       {/* </div> */}

  //       {/* <div className="pl-180"> */}

  //       <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
  //         <div className="py-5" id="s-gedung">
  //           <details className="group">
  //             <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //               <span>LEMASMIL</span>
  //               <span className="transition-transform group-open:rotate-180">
  //                 <svg
  //                   fill="none"
  //                   height="24"
  //                   shapeRendering="geometricPrecision"
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="1.5"
  //                   viewBox="0 0 24 24"
  //                   width="24"
  //                 >
  //                   <path d="M6 9l6 6 6-6"></path>
  //                 </svg>
  //               </span>
  //             </summary>

  //             {locationDeviceListLemasmil.map((locationDevice, index) => (
  //               <div className="pt-2 ml-[20px]" key={index}>
  //                 <details className="groupChild">
  //                   <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //                     <span>{locationDevice.nama_lokasi}</span>
  //                     <span className="transition-transform groupChild-open:rotate-180">
  //                       <svg
  //                         fill="none"
  //                         height="24"
  //                         shapeRendering="geometricPrecision"
  //                         stroke="currentColor"
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         strokeWidth="1.5"
  //                         viewBox="0 0 24 24"
  //                         width="24"
  //                       >
  //                         <path d="M6 9l6 6 6-6"></path>
  //                       </svg>
  //                     </span>
  //                   </summary>
  //                   {/* {locationDevice.ruangan.map((device,index) => (
  //                     <NavLink to={`/kamera-live/${device.kamera_id}`} key={index}>
  //                       <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
  //                         {device.nama_kamera}
  //                       </p>
  //                     </NavLink>
  //                   ))} */}
  //                   {locationDevice.ruangan.map((ruanganDevice, index) => (
  //                     <div className="pt-2 ml-[20px]" key={index}>
  //                       <details className="groupChild">
  //                         <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //                           <span>{ruanganDevice.nama_ruangan}</span>
  //                           <span className="transition-transform groupChild-open:rotate-180">
  //                             <svg
  //                               fill="none"
  //                               height="24"
  //                               shapeRendering="geometricPrecision"
  //                               stroke="currentColor"
  //                               strokeLinecap="round"
  //                               strokeLinejoin="round"
  //                               strokeWidth="1.5"
  //                               viewBox="0 0 24 24"
  //                               width="24"
  //                             >
  //                               <path d="M6 9l6 6 6-6"></path>
  //                             </svg>
  //                           </span>
  //                         </summary>
  //                         {ruanganDevice.kamera.map((device, index) => (
  //                           <NavLink
  //                             to={`/kamera-live/${device.kamera_id}`}
  //                             key={index}
  //                           >
  //                             <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
  //                               {device.nama_kamera}
  //                             </p>
  //                           </NavLink>
  //                         ))}
  //                       </details>
  //                     </div>
  //                   ))}
  //                 </details>
  //               </div>
  //             ))}
  //             {/* <div className="pt-2 ml-[20px]">
  //               <details className="group">
  //                 <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //                   <span>Surabaya</span>
  //                   <span className="transition-transform group-open:rotate-180">
  //                     <svg
  //                       fill="none"
  //                       height="24"
  //                       shapeRendering="geometricPrecision"
  //                       stroke="currentColor"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="1.5"
  //                       viewBox="0 0 24 24"
  //                       width="24"
  //                     >
  //                       <path d="M6 9l6 6 6-6"></path>
  //                     </svg>
  //                   </span>
  //                 </summary>
  //                 <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
  //                  Kamera 1
  //                 </p>
  //                 <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
  //                  Kamera 1
  //                 </p>
  //               </details>
  //             </div> */}
  //           </details>
  //         </div>
  //         <div className="py-5" id="s-otmil">
  //           <details className="group">
  //             <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //               <span>OTMIL</span>
  //               <span className="transition-transform group-open:rotate-180">
  //                 <svg
  //                   fill="none"
  //                   height="24"
  //                   shapeRendering="geometricPrecision"
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="1.5"
  //                   viewBox="0 0 24 24"
  //                   width="24"
  //                 >
  //                   <path d="M6 9l6 6 6-6"></path>
  //                 </svg>
  //               </span>
  //             </summary>

  //             {locationDeviceListOtmil.map((locationDevice, index) => (
  //               <div className="pt-2 ml-[20px]" key={index}>
  //                 <details className="groupChild">
  //                   <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //                     <span>{locationDevice.nama_lokasi}</span>
  //                     <span className="transition-transform groupChild-open:rotate-180">
  //                       <svg
  //                         fill="none"
  //                         height="24"
  //                         shapeRendering="geometricPrecision"
  //                         stroke="currentColor"
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         strokeWidth="1.5"
  //                         viewBox="0 0 24 24"
  //                         width="24"
  //                       >
  //                         <path d="M6 9l6 6 6-6"></path>
  //                       </svg>
  //                     </span>
  //                   </summary>
  //                   {/* {locationDevice.ruangan.map((device,index) => (
  //                     <NavLink to={`/kamera-live/${device.kamera_id}`} key={index}>
  //                       <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
  //                         {device.nama_kamera}
  //                       </p>
  //                     </NavLink>
  //                   ))} */}
  //                   {locationDevice.ruangan.map((ruanganDevice, index) => (
  //                     <div className="pt-2 ml-[20px]" key={index}>
  //                       <details className="groupChild">
  //                         <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //                           <span>{ruanganDevice.nama_ruangan}</span>
  //                           <span className="transition-transform groupChild-open:rotate-180">
  //                             <svg
  //                               fill="none"
  //                               height="24"
  //                               shapeRendering="geometricPrecision"
  //                               stroke="currentColor"
  //                               strokeLinecap="round"
  //                               strokeLinejoin="round"
  //                               strokeWidth="1.5"
  //                               viewBox="0 0 24 24"
  //                               width="24"
  //                             >
  //                               <path d="M6 9l6 6 6-6"></path>
  //                             </svg>
  //                           </span>
  //                         </summary>
  //                         {ruanganDevice.kamera.map((device, index) => (
  //                           <NavLink
  //                             to={`/kamera-live/${device.kamera_id}`}
  //                             key={index}
  //                           >
  //                             <p className="text-slate-300 mt-3 group-open:animate-fadeIn ml-[20px]">
  //                               {device.nama_kamera}
  //                             </p>
  //                           </NavLink>
  //                         ))}
  //                       </details>
  //                     </div>
  //                   ))}
  //                 </details>
  //               </div>
  //             ))}
  //             {/* <div className="pt-2 ml-[20px]">
  //               <details className="group">
  //                 <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //                   <span>Surabaya</span>
  //                   <span className="transition-transform group-open:rotate-180">
  //                     <svg
  //                       fill="none"
  //                       height="24"
  //                       shapeRendering="geometricPrecision"
  //                       stroke="currentColor"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="1.5"
  //                       viewBox="0 0 24 24"
  //                       width="24"
  //                     >
  //                       <path d="M6 9l6 6 6-6"></path>
  //                     </svg>
  //                   </span>
  //                 </summary>
  //                 <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
  //                  Kamera 1
  //                 </p>
  //                 <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
  //                  Kamera 1
  //                 </p>
  //               </details>
  //             </div> */}
  //           </details>
  //         </div>

  //         <div className="py-5" id="s-babin">
  //           <details className="group">
  //             <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //               <span>BABINKUM TNI (Badan Pembinaan Hukum TNI)</span>
  //               <span className="transition-transform group-open:rotate-180">
  //                 <svg
  //                   fill="none"
  //                   height="24"
  //                   shapeRendering="geometricPrecision"
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="1.5"
  //                   viewBox="0 0 24 24"
  //                   width="24"
  //                 >
  //                   <path d="M6 9l6 6 6-6"></path>
  //                 </svg>
  //               </span>
  //             </summary>

  //             <div className="py-5 ml-[20px]">
  //               <details className="groupChild">
  //                 <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
  //                   <span>Data belum tersedia</span>
  //                   <span className="transition-transform groupChild-open:rotate-180">
  //                     <svg
  //                       fill="none"
  //                       height="24"
  //                       shapeRendering="geometricPrecision"
  //                       stroke="currentColor"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="1.5"
  //                       viewBox="0 0 24 24"
  //                       width="24"
  //                     >
  //                       <path d="M6 9l6 6 6-6"></path>
  //                     </svg>
  //                   </span>
  //                 </summary>
  //                 <p className="ml-3 text-neutral-600 mt-3 group-open:animate-fadeIn">
  //                   Data belum tersedia
  //                 </p>
  //               </details>
  //             </div>
  //           </details>
  //         </div>
  //       </div>
  //     </div>
  //    </>
  // );
};

export default CameraPlaybackList;
