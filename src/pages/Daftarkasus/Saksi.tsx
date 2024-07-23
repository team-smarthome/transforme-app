// type TableProps = {
//     body: string[]

import { useState } from 'react';

// }
type sidangType = {
  nama: string | null;
  tanggalPemeriksaan: string | null;
};
const dataSidang: sidangType[] = [
  {
      nama: 'Suwasto Hadijoyo N',
      tanggalPemeriksaan: 'Selasa, 26 Mar. 2024',
  },
  {
      nama: 'Bagas Saputra',
      tanggalPemeriksaan: 'Kamis, 04 Apr. 2024',
  },
];
const Saksi = ({dataPerkara}: any) => {
  // console.log(dataPerkara, "dape")
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  return (
    <div className="border-1 border-black p-1.5 bg-slate-200">
      <table className="border-collapse mt-2 mb-2">
        <thead>
          <tr>
            <th
              className={`p-4  w-[3%] font-bold uppercase text-black bg-slate-400 border border-gray-300`}
            >
              No
            </th>
            <th
              className={`p-4 font-bold w-[15%] uppercase text-black bg-slate-400 border border-gray-300`}
            >
            Nama
            </th>
            <th
              className={`p-4 font-bold w-[15%] uppercase text-black bg-slate-400 border border-gray-300`}
            >
              Alamat
            </th>
            <th
              className={`p-4 font-bold w-[15%] uppercase text-black bg-slate-400 border border-gray-300`}
            >
              No Kontak
            </th>
            <th
              className={`p-4 font-bold w-[15%] uppercase text-black bg-slate-400 border border-gray-300`}
            >
              Keterangan
            </th>
          </tr>
        </thead>
        <tbody>
          {dataPerkara?.saksi?.map((data, index) => (
            <tr
              key={index}
              className="bg-white hover:bg-meta-4 mb-10"
              onMouseOver={() => setCurrentIndex(index)}
              onMouseOut={() => setCurrentIndex(null)}
            >
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'bg-slate-500' : 'bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {index + 1}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'bg-slate-500' : 'bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.nama_saksi}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'bg-slate-500' : 'bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.alamat}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'bg-slate-500' : 'bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.no_kontak}
              </td>
              <td
                className={`w-full lg:w-auto p-3 text-black bg-gray-2 ${currentIndex == index ? 'bg-slate-500' : 'bg-slate-300'} text-center border border-b lg:table-cell relative lg:static`}
              >
                {data.keterangan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Saksi;
