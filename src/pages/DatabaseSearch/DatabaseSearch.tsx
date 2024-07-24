import React, { useState, useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HiQuestionMarkCircle } from "react-icons/hi2";

import {
  apiVisitorSearch,
  apiWatchlistHistory,
  webserviceurl,
} from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Alerts } from "./AlertDatabaseSearch";
import { Error403Message } from "../../utils/constants";

export default function DatabaseSearch() {
  const navigate = useNavigate();
  const location = useLocation();

  const dataAppMoede = localStorage.getItem("appMode");
  const [isworkstation, setIsworkstation] = useState<boolean>(false);

  useEffect(() => {
    if (dataAppMoede === "workstation") {
      setIsworkstation(true);
    } else {
      setIsworkstation(false);
    }
  }, [dataAppMoede]);
  const [imagePreview, setImagePreview]: any = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [detailWatchlist, setDetailDpo] = useState([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [filter, setFilter] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".d-unggah",
          popover: {
            title: "Pencarian Berdasarkan Gambar",
            description: "Klik untuk unggah gambar yang ingin dicari",
          },
        },
        {
          element: ".d-hasil",
          popover: {
            title: "Hasil Pencarian",
            description: "Menampilkan hasil pencarian berdasarkan gambar",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const handleRemoveFoto = () => {
    setImagePreview(null);
    const inputElement = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setIsFound(false);
    setIsNotFound(false);
  };

  const renderImagePreview = () => {
    if (imagePreview) {
      return (
        <img
          className="h-72 w-48 mb-2 rounded-t-2xl"
          src={imagePreview}
          alt="Image Preview"
        />
      );
    }
  };

  const handleCardClick = async (data: any) => {
    setSelectedCard(data);
    apiWatchlistHistory({ visitorId: data.visitor_id, pageSize: 5 })
      .then((res) => {
        setDetailDpo(res.records);
      })
      .catch((e: any) => {
        if (e.response.status === 403) {
          navigate("/", {
            state: { forceLogout: true, lastPage: location.pathname },
          });
        }
        Alerts.fire({
          icon: e.response.status === 403 ? "warning" : "error",
          title: e.response.status === 403 ? Error403Message : e.message,
        });
      });
    setIsModalOpen(true); // Open the modal when a card is clicked
  };

  const handleSearch = async () => {
    // try {
    //   setLoading(true);
    //   let data = await apiVisitorSearch(imagePreview);
    //   setSearchResult(data);
    //   if (data.length > 0) {
    //     setIsFound(true);
    //   } else {
    //     setIsNotFound(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
    console.log("DATAFOTO ", imagePreview);
  };

  return (
    <>
      {isworkstation ? (
        <div>
          <div className="relative w-full bg-boxdark shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 "></div>
            <div className="mx-4 relative ">
              <div className="w-full flex justify-between">
                <h1 className="py-4 text-white text-xl">
                  Pencarian di Database
                </h1>

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

              <div className="border-[0.1px] border-b border-white opacity-30 "></div>
              <div className="mt-5 grid grid-cols-1 gap-4 text-center">
                <div className="flex flex-col justify-center  text-white">
                  {/* <p className="text-3xl">LOGO SIRAM</p> */}
                  <p className="text-2xl">SIRAM Workstation</p>
                  <p className="text-sm text-slate-500 font-light">
                    {" "}
                    Pencarian berdasarkan gambar
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-center">
                    <div
                      className={`d-unggah w-[500px] h-70 items-center flex justify-center  rounded border border-blue-500 bg-gray p-1 dark:bg-meta-4 ${
                        imagePreview ? "" : "mb-4"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {imagePreview ? (
                        <div className="relative rounded overflow-hidden">
                          <div className="bg-red-500 w-fit absolute top-0 right-0 rounded-bl">
                            <button
                              className="p-1 text-white"
                              onClick={handleRemoveFoto}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                width="20"
                                height="20"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                          <img
                            src={imagePreview}
                            alt="Image Preview"
                            className="object-cover w-[500px] h-[270px]"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>

                          <label htmlFor="image-upload">
                            <p className="text-blue-500 cursor-pointer">
                              Klik untuk unggah
                            </p>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  {imagePreview && (
                    <div className="flex justify-center mb-4">
                      <button
                        onClick={handleSearch}
                        className="bg-primary text-white px-6 py-1 rounded-md cursor-pointer w-[500px]"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="text-white"
                            width="20"
                            height="20"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                          <p>Cari</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 mb-5">
            <div className="flex items-center justify-center">
              <div className="w-full border-b border-white opacity-30 "></div>
              <p className="w-full text-center text-white">HASIL PENCARIAN</p>
              <div className="w-full border-b border-white opacity-30 "></div>
            </div>
          </div>

          <div className="">
            <div className="xl:mx-[300px] lg:mx-[200px] md:mx-[100px] ">
              <div className=" grid grid-cols-1 gap-6 d-hasil">
                <div className="bg-boxdark px-4 py-4 flex">
                  <div className="bg-blue-500 w-[150px] h-[150px] overflow-hidden border border-slate-400">
                    <img
                      src="https://source.unsplash.com/random/150x150"
                      alt="picture"
                      className="object-cover"
                    ></img>
                  </div>
                  <div className="ml-10 grid grid-cols-1 items-center">
                    <div className="flex flex-col w-full">
                      <p className="text-3xl font-bold text-white">
                        Bagas Arya Pradipta
                      </p>
                      <p className="text-2xl font-base text-slate-500">
                        Bagas Arya Pradipta
                      </p>
                    </div>
                    <div className="flex flex-col mt-6 item-center  w-full">
                      <p className="text-lg">Keterangan</p>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          width="15"
                          height="15"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <p className="text-md">16/01/2023 10:11</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h5 className="text-2xl mb-2">Pencarian di Database</h5>
          <p className="mb-2">
            Fitur untuk mencari data berdasarkan gambar, silahkan masukan
            parameter yang diperlukan
          </p>
          <br />
          <form
            style={{
              padding: "0px 40px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "2rem",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div>
                <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg">
                  {renderImagePreview()}
                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="block px-6 py-3 bg-primary text-white text-center cursor-pointer"
                  >
                    Unggah Gambar
                  </label>
                </div>
              </div>
              <div>
                <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="py-2">Hasil Pencarian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult?.map((row) => (
                        <tr
                          onClick={() => handleCardClick(row)}
                          className="cursor-pointer"
                          key={row.name}
                        >
                          <td className="px-6 py-4 border-b">{row.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="bg-primary text-white px-6 py-3 rounded-md cursor-pointer"
                onClick={handleSearch}
                disabled={!imagePreview}
              >
                Cari
              </button>
            </div>
          </form>
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
              <div className="bg-white w-4/5 h-4/5 max-w-3xl p-6 rounded-xl overflow-y-scroll">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold">
                    Detail Prajurit Binaan
                  </h3>
                  <button
                    type="button"
                    className="bg-primary text-white px-4 py-2 rounded-md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Tutup
                  </button>
                </div>
                {selectedCard && (
                  <div className="flex">
                    <div className="w-72 h-72">
                      <img
                        className="w-full h-full object-contain"
                        src={
                          selectedCard.face_pics
                            ? webserviceurl + selectedCard.face_pics
                            : "https://via.placeholder.com/200x300"
                        }
                        alt={selectedCard.name}
                      />
                    </div>
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td className="font-semibold">Nama</td>
                            <td>{selectedCard.name}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Tanggal Lahir</td>
                            <td>{selectedCard.dob}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Kebangsaan</td>
                            <td>{selectedCard.country_name}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Nomor Identitas</td>
                            <td>{selectedCard.identity}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Jenis Kelamin</td>
                            <td>{selectedCard.gender ? "Male" : "Female"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">
                              ID Prajurit Binaan
                            </td>
                            <td>{selectedCard.visitor_id}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Tanggal Input</td>
                            <td>{selectedCard.create_stamp}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center mt-6">
                  <h5 className="text-xl font-semibold">
                    Riwayat Tangkapan Kamera Prajurit Binaan
                  </h5>
                </div>
                <div className="flex gap-4 mt-6">
                  {detailWatchlist.map((data, index) => (
                    <div
                      className="cursor-pointer"
                      key={index}
                      onClick={() => handleCardClick(data)}
                    >
                      <div className="max-w-xs bg-white shadow-md rounded-md overflow-hidden">
                        <img
                          className="h-48 w-full object-cover"
                          src={
                            selectedCard.face_pics
                              ? webserviceurl + data.image
                              : "https://via.placeholder.com/200x300"
                          }
                          alt={selectedCard.name}
                        />
                        <div className="px-4 py-2">
                          <p className="text-lg font-semibold">
                            {data.timestamp}
                          </p>
                          <p className="text-lg">{data.device_name}</p>
                          <p className="text-lg">{data.location_name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {isFound && (
            <div className="fixed bottom-0 right-0 mr-8 mb-8">
              <div className="bg-green-500 text-white px-6 py-3 rounded-md">
                Data Ditemukan
              </div>
            </div>
          )}
          {isNotFound && (
            <div className="fixed bottom-0 right-0 mr-8 mb-8">
              <div className="bg-red-500 text-white px-6 py-3 rounded-md">
                Data Tidak Ditemukan
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
