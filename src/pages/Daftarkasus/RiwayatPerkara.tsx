import React, { useState } from 'react';

export const RiwayatPerkara = () => {
  const dataDummy = [
    {
      tanggal: 'Rabu, 13 Mar. 2024',
      tahapan: 'Pendaftaran',
      proses: 'Pendaftaran Perkara',
    },
    {
      tanggal: 'Kamis, 14 Mar. 2024',
      tahapan: 'Pemeriksaan',
      proses: 'Pemeriksaan Saksi',
    },
    {
      tanggal: 'Jumat, 15 Mar. 2024',
      tahapan: 'Sidang',
      proses: 'Sidang Pembacaan Putusan',
    },
    {
      tanggal: 'Sabtu, 16 Mar. 2024',
      tahapan: 'Eksekusi',
      proses: 'Eksekusi Putusan',
    },
    {
      tanggal: 'Minggu, 17 Mar. 2024',
      tahapan: 'Penyelesaian',
      proses: 'Penyelesaian Perkara',
    },
    {
      tanggal: 'Senin, 18 Mar. 2024',
      tahapan: 'Pendaftaran',
      proses: 'Pendaftaran Perkara',
    },
    {
      tanggal: 'Selasa, 19 Mar. 2024',
      tahapan: 'Pemeriksaan',
      proses: 'Pemeriksaan Saksi',
    },
    {
      tanggal: 'Rabu, 20 Mar. 2024',
      tahapan: 'Sidang',
      proses: 'Sidang Pembacaan Putusan',
    },
    {
      tanggal: 'Kamis, 21 Mar. 2024',
      tahapan: 'Eksekusi',
      proses: 'Eksekusi Putusan',
    },
    {
      tanggal: 'Jumat, 22 Mar. 2024',
      tahapan: 'Penyelesaian',
      proses: 'Penyelesaian Perkara',
    },
  ];

  return (
    <div className="px-15 dark:bg-slate-200 p-2">
      <div className="mr-3 ml-3">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-10 text-center bg-gray-2 dark:bg-slate-400 w-[110%]">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-black">
                No
              </h5>
            </div>

            <div className="p-2.5 xl:p-5 col-span-3">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-black">
                Tanggal
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 col-span-3">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-black">
                Tahapan
              </h5>
            </div>

            <div className="p-2.5 xl:p-5 col-span-3">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-black">
                Proses
              </h5>
            </div>
          </div>
        </div>
        {dataDummy.map((item: any, index: any) => {
          return (
            <div className="flex flex-col items-center">
              <div className="group grid grid-cols-10 rounded-sm bg-meta-4 w-[110%]">
                <div
                  //   onClick={() => handleDetailClick(item)}
                  className=" flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer border-b border-slate-600 text-black dark:bg-slate-300 dark:group-hover:bg-slate-500"
                >
                  <p className="hidden sm:block text-black">{index + 1}</p>
                </div>
                <div
                  //   onClick={() => handleDetailClick(item)}
                  className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-b border-slate-600 text-black dark:bg-slate-300 dark:group-hover:bg-slate-500"
                >
                  <p className="hidden sm:block text-black">{item.tanggal}</p>
                </div>
                <div
                  //   onClick={() => handleDetailClick(item)}
                  className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-b border-slate-600 text-black dark:bg-slate-300 dark:group-hover:bg-slate-500"
                >
                  <p className="hidden sm:block text-black">{item.tahapan}</p>
                </div>
                <div
                  //   onClick={() => handleDetailClick(item)}
                  className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-b border-slate-600 text-black dark:bg-slate-300 dark:group-hover:bg-slate-500"
                >
                  <p className="hidden sm:block text-black">{item.proses}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
