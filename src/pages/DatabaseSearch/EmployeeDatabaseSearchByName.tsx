import React, { useState, useEffect } from 'react';

import {
  apiSearchVisitorByName,
  apiWatchlistHistory,
} from '../../services/api';
import { webserviceurl } from '../../services/api';

export default function EmployeeDatabaseSearchByName() {
  const [searchName, setSearchName] = useState('');

  const [imagePreview, setImagePreview] = useState(null);
  let [searchResult, setSearchResult] = useState(null);
  let [totalResult, setTotalResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [detailWatchlist, setDetailDpo] = useState([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsFound(false);
    setIsNotFound(false);
  };
  const handleCardClick = async (data) => {
    await setSelectedCard(data);
    console.log(data);
    await apiWatchlistHistory({ visitorId: data.visitor_id, pageSize: 5 }).then(
      (res) => {
        console.log(res);
        setDetailDpo(res.records);
      },
    );
    await setIsModalOpen(true); // Open the modal when a card is clicked
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      let params = JSON.stringify({
        name: searchName,
      });
      let data = await apiSearchVisitorByName(params);
      console.log(data);
      setSearchResult(data.records);
      setTotalResult(data.total);
      if (data.total > 0) {
        setIsFound(true);
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h5 className="text-2xl mb-2">Pelacakan Petugas di Database</h5>

        <p className="mb-2">
          Fitur untuk mencari data petugas berdasarkan nama, silahkan masukan
          parameter yang diperlukan
        </p>
        <br />
        <form className="flex flex-col gap-4 w-full px-4 py-1">
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div>
              <div className="min-w-[400px] max-w-[600px] mx-auto mt-3 p-1 flex flex-col items-center rounded-10">
                <input
                  type="text"
                  placeholder="Nama Petugas"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-90 mt-1 mx-1 mb-0 p-2 border rounded-lg w-full"
                />

                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    className="bg-primary text-white px-6 py-3 rounded-md cursor-pointer"
                    onClick={handleSearch}
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-3">Hasil Pencarian</th>
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
                          : 'https://via.placeholder.com/200x300'
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
                          <td>{selectedCard.gender ? 'Male' : 'Female'}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">ID Prajurit Binaan</td>
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
                            : 'https://via.placeholder.com/200x300'
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
    </>
  );
}
