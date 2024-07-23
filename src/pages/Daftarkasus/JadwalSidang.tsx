// type TableProps = {
//     body: string[]

import { useState } from 'react';

// }
type sidangType = {
  tanggalSidang: string | null;
  jam: string | null;
  agenda: string | null;
  ruangan: string | null;
  alasanDitunda: string | null;
};
const dataSidang: sidangType[] = [
  {
    tanggalSidang: 'Selasa, 26 Mar. 2024',
    jam: '12:00:00 s/d 12:35:00',
    agenda: 'Pembacaan Dakwaan',
    ruangan: 'Ruang Sidang Utama (Semua Pihak)',
    alasanDitunda:
      'Memberikan kesempatan Oditur Militer untuk memanggil para Saksi',
  },
  {
    tanggalSidang: 'Kamis, 04 Apr. 2024',
    jam: '09:00:00 s/d Selesai',
    agenda: 'Pemeriksaan para Saksi',
    ruangan: 'Ruang Sidang Utama ()',
    alasanDitunda: null,
  },
];
const JadwalSidang = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  return (
    <div className="border-1 border-black p-1.5 bg-slate-200">
      <table className="border-collapse mt-2 mb-2">
        <thead>
          <tr>
            <th
              className={`p-4  w-[3%] font-bold uppercase bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
            >
              No
            </th>
            <th
              className={`p-4 font-bold w-[15%] uppercase bg-gray-2 dark:bg-slate-400 text-black border border-gray-300`}
            >
              Tanggal Sidang
            </th>
            <th
              className={`p-4 w-[15%] font-bold uppercase bg-gray-2 dark:bg-slate-400 border border-gray-300 text-black`}
            >
              Jam
            </th>
            <th
              className={`p-4 w-[25%] font-bold uppercase bg-gray-2 dark:bg-slate-400 border border-gray-300 text-black`}
            >
              Agenda
            </th>
            <th
              className={`p-4 w-[15%] font-bold uppercase bg-gray-2 dark:bg-slate-400 border border-gray-300 text-black`}
            >
              Ruangan
            </th>
            <th
              className={`p-4 w-[20%] font-bold uppercase bg-gray-2 dark:bg-slate-400 border border-gray-300 text-black`}
            >
              Alasan Ditunda
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSidang.map((data, index) => (
            <tr
              key={index}
              className="bg-white hover:bg-meta-4 mb-10"
              onMouseOver={() => setCurrentIndex(index)}
              onMouseOut={() => setCurrentIndex(null)}
            >
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'dark:bg-slate-500' : 'dark:bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {index + 1}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'dark:bg-slate-500' : 'dark:bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.tanggalSidang}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'dark:bg-slate-500' : 'dark:bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.jam}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'dark:bg-slate-500' : 'dark:bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.agenda}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'dark:bg-slate-500' : 'dark:bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.ruangan}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'dark:bg-slate-500' : 'dark:bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.alasanDitunda}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JadwalSidang;
