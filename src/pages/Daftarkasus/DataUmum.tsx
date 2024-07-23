import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Item {
  nama_kasus: string;
  nomor_kasus: string;
  nama_jenis_perkara: string;
  nama_jenis_pidana: string;
}
interface Item {
  nama: string;
}

const DataUmum = ({ dataperkara }) => {
  console.log('dataPerkara', dataperkara);
  const [states, setState] = useState<Item[]>([]);
  const [pihakTerlibat, setPihakTerlibat] = useState<Item[]>([]);
  const handlePihatTerlibat = () => {
    const saksi = dataperkara.saksi.map((data: { nama_saksi: string }) => ({
      nama: `${data.nama_saksi} (Saksi)`,
    }));

    const wbp = dataperkara.wbp_profile.map((data: { nama: string }) => ({
      nama: `${data.nama} (Tersangka)`,
    }));

    const combined = [...saksi, ...wbp];
    setPihakTerlibat(combined);
  };

  useEffect(() => {
    handlePihatTerlibat();
  }, [dataperkara]);
  // console.log(pihakTerlibat, "pihakTerlibat")
  // console.log(dataperkara.wbp_profile.map((data) => data.nama), "dataperkara.wbp_profile")
  return (
    <div className="grid grid-rows-3 grid-flow-col bg-slate-200">
      <div className="row-span-3 rounded m-3">
        <div className="p-2 lg:p-3 grid grid-cols-4 gap-x-8 gap-y-[0.125rem]">
          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400 rounded-t">
            Nomor Kasus
          </h5>

          <p className="text-black truncate dark:text-black capitalize p-2 col-span-3">
            {dataperkara.nomor_kasus ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Nama Kasus
          </h5>

          <p className="text-black truncate dark:text-black capitalize p-2 col-span-3">
            {dataperkara.nama_kasus ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Jenis Kasus
          </h5>

          <p className="text-black truncate dark:text-black capitalize p-2 col-span-3">
            {dataperkara.jenis_kasus ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Nama Jenis Pidana
          </h5>

          <p className="text-black truncate dark:text-black capitalize p-2 col-span-3">
            {dataperkara.nama_jenis_pidana ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Lokasi Kasus
          </h5>

          <p className="text-black truncate dark:text-black capitalize p-2 col-span-3">
            {dataperkara.lokasi_kasus ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Tanggal Kejadian Kasus
          </h5>

          <p className="text-black truncate dark:text-black capitalize p-2 col-span-3">
            {dataperkara.waktu_kejadian ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Tanggal Pelaporan Kasus
          </h5>

          <p className="text-black truncate dark:text-black capitalize p-2 col-span-3">
            {dataperkara.waktu_pelaporan_kasus ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Tanggal Pelimpahan Kasus
          </h5>

          <p
            className={`text-black truncate dark:text-black capitalize p-2 col-span-3`}
          >
            {dataperkara.tanggal_pelimpahan_kasus ?? '-'}
          </p>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Jumlah Penyidikan
          </h5>

          <p
            className={`text-black truncate dark:text-black capitalize p-2 col-span-3`}
          >
            {dataperkara.penyidikan.length}
          </p>

          <div className="bg-slate-400 min-h-10">
            <h5 className="text-sm font-medium uppercase md:text-base p-2 mb-40 text-black bg-slate-400 min-h-10">
              Oditur Penyidik
            </h5>
          </div>

          <div className="text-black truncate dark:text-black capitalize p-3 border border-slate-500 mb-2 mt-3 col-span-3">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 w-80 text-sm font-medium uppercase md:text-base">
                    Oditur Penyidik
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                {dataperkara.oditur_penyidik.map((item: any, index: any) => (
                  <tr key={index}>
                    <td className="border-b bg-gray-3 dark:bg-slate-300 p-2">
                      {item.nama_oditur}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black bg-slate-400">
            Ketua Oditur Penyidik
          </h5>

          <div className="col-span-3">
            {dataperkara.oditur_penyidik
              .filter((item: any) => item.role_ketua == 1)
              .map((item: any, index: any) => (
                <p
                  className="text-black truncate dark:text-black capitalize p-2 mb-5"
                  key={index}
                >
                  {item.nama_oditur}
                </p>
              ))}
          </div>

          <div className="bg-slate-400 min-h-10">
            <h5 className="text-sm font-medium uppercase md:text-base p-2 mb-48 text-black bg-slate-400">
              Pihak Terlibat
            </h5>
          </div>

          <div className="text-black truncate dark:text-black capitalize p-3 border border-slate-500 col-span-3 mb-2 mt-3">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 bordb p-2 w-80 text-sm font-medium uppercase md:text-base">
                    Pihak Terlibat
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                {pihakTerlibat.map((data: { nama: string }, index: number) => (
                  <tr key={index}>
                    <td className="bg-gray-3 dark:bg-slate-300 p-2 border-b">
                      {data.nama}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-400 min-h-10">
            <h5 className="text-sm font-medium uppercase md:text-base p-2 mb-36 text-black bg-slate-400">
              Tersangka
            </h5>
          </div>

          <div className="text-black truncate dark:text-black capitalize p-3 border border-slate-500 col-span-3 mb-2 mt-3">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base border-r w-15">
                    No
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base w-[50%] border-r">
                    Nama Tersangka
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 bordb p-2 w-[50%] text-sm font-medium ubg-gray-3 uppercase md:text-base">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                {dataperkara.wbp_profile.map((item: any, index: any) => (
                  <tr
                    className="group bg-slate-300 hover:bg-slate-500 hover:border-t"
                    key={index}
                  >
                    <td className="p-2 group-hover:border-r">{index + 1}</td>
                    <td className="p-2 group-hover:border-r">{item.nama}</td>
                    <td className="p-2">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h5 className="text-sm font-medium uppercase md:text-base p-2 text-black min-h-10 bg-slate-400 rounded-b">
            Saksi
          </h5>

          <div className="text-black truncate dark:text-black capitalize p-3 border border-slate-500 col-span-3 mb-2 mt-3">
            <table className="border-collapse border border-slate-500 ">
              <thead>
                <tr>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base border-r w-15">
                    No
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 p-2 text-sm font-medium uppercase md:text-base w-[50%] border-r">
                    Nama Saksi
                  </th>
                  <th className="bg-gray-3 dark:bg-slate-400 bordb p-2 w-[50%] text-sm font-medium ubg-gray-3 uppercase md:text-base">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="text-center items-center">
                {dataperkara.saksi.map((item: any, index: any) => (
                  <tr
                    className="group bg-slate-300 hover:bg-slate-500 hover:border-t"
                    key={index}
                  >
                    <td className="p-2 group-hover:border-r">{index + 1}</td>
                    <td className="p-2 group-hover:border-r">
                      {item.nama_saksi}
                    </td>
                    <td className="p-2">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="row-span-2 col-span-3">03</div> */}
    </div>
  );
};

export default DataUmum;
