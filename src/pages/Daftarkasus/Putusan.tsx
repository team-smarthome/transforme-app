import React, { useState } from 'react';

export const Putusan = () => {
  const dataStatusPutusan = [
    {
      nama: 'Suwasto Hadijoyo N',
      tanggal: 'Kamis, 11 Jan. 2024',
      putusan: 'Pidana Denda Rp.150.000,00',
    },
    // {
    //     nama: "Bagas Saputra",
    //     tanggal: "Selasa, 15 Feb. 2025",
    //     putusan: "Pidana Percobaan 1 Tahun"
    // },
    // {
    //     nama: "Ario Saputra",
    //     tanggal: "Rabu, 20 Mar. 2026",
    //     putusan: "Pidana Pidana Penjara 2 Tahun"
    // }
  ];

  const dataOditur = [
    {
      nama: 'Wensuslaus Kapo, S.H.,M.H.',
      status: 'Oditur 1',
      tanggal_putusan: 'Kamis, 11 Jan. 2024',
    },
  ];

  const dataTerdakwa = [
    {
      nama: 'Suwasto Hadijoyo N',
      status: 'Terdakwa 1',
      tanggal_putusan: 'Kamis, 11 Jan. 2024',
    },
  ];

  return (
    <div className="py-[16px] px-[16px] bg-slate-200">
      {/* <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"> */}
      <div className="flex flex-col">
        <div className="grid grid-cols-10 rounded-t-md bg-gray-2 dark:bg-slate-400 ">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b text-black">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tanggal Putusan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300 text-black rounded-tr-md">
            {/* <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Tanggal Putusan
                            </h5> */}
            <p>Kamis, 11 Jan. 2024</p>
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 text-black">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status Putusan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300">
            <div className="flex flex-col">
              <div className="grid grid-cols-10 text-center rounded-t-md bg-gray-2 dark:bg-slate-400 border border-b-0">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    No
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-3">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tanggal
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5 col-span-3">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tahapan
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-3">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Proses
                  </h5>
                </div>
              </div>
            </div>
            {dataStatusPutusan.map((item: any, index: any) => {
              return (
                <div>
                  <div className="grid grid-cols-10 rounded-sm bg-slate-300 hover:bg-slate-500 border">
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {index + 1}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.nama}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3  border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.tanggal}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.putusan}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 text-black">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amar Putusan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300">
            <p>MENGADILI :</p>
            <ol className="list-decimal list-inside">
              <li>
                Menyatakan Terdakwa tersebut di atas yaitu : Suwasto Hadijoyo
                N., Letkol Kal, NRP 522946 bersalah melakukan "Pelanggaran rambu
                lalu lintas";
              </li>
              <li>
                Memidana Terdakwa oleh karena itu dengan denda sejumlah
                Rp150.000,00 (seratus lima puluh ribu rupiah);
              </li>
              <li>
                Membebankan Terdakwa untuk membayar biaya perkara sejumlah
                Rp25.000,00 (dua puluh lima ribu rupiah);
              </li>
              <li>
                Menetapkan barang bukti berupa :
                <ul className="list-disc ml-4">
                  <li>
                    1 (satu) SIM B1 No: 01/03369/3/BI atas nama Letkol Kal
                    Suwasto Hadijoyo N.
                  </li>
                </ul>
              </li>
            </ol>
            <br />
            <p>Dikembalikan kepada Terdakwa.</p>
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 text-black">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Pemberitahuan Putusan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300">
            <div className="flex flex-col">
              <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-400 border">
                <div className="p-2.5 xl:p-5 col-span-2">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Status
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tanggal Pemberitahuan Putusan
                  </h5>
                </div>
              </div>
            </div>
            {dataOditur.map((item: any, index: any) => {
              return (
                <div>
                  <div className="grid grid-cols-10 rounded-sm bg-slate-300 hover:bg-slate-500">
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-2 border-b border-l border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.status}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.nama}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-r border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.tanggal_putusan}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col">
              <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-400 mt-10 border">
                <div className="p-2.5 xl:p-5 col-span-2">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Status
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tanggal Pemberitahuan Putusan
                  </h5>
                </div>
              </div>
            </div>
            {dataTerdakwa.map((item: any, index: any) => {
              return (
                <div>
                  <div className="grid grid-cols-10 rounded-sm bg-slate-300 hover:bg-slate-500">
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-2 border-b border-l border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.status}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.nama}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-r border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.tanggal_putusan}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 ">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b flex items-center justify-center text-black">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Menerima Putusan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300">
            <div className="flex flex-col">
              <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-400 text-black border">
                <div className="p-2.5 xl:p-5 col-span-2">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Status
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tanggal Pemberitahuan Putusan
                  </h5>
                </div>
              </div>
            </div>
            {dataOditur.map((item: any, index: any) => {
              return (
                <div>
                  <div className="grid grid-cols-10 rounded-sm bg-slate-300 hover:bg-slate-500">
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-2 border-b border-l border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.status}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.nama}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-r border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.tanggal_putusan}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col">
              <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-400 mt-10 border text-black">
                <div className="p-2.5 xl:p-5 col-span-2">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Status
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tanggal Pemberitahuan Putusan
                  </h5>
                </div>
              </div>
            </div>
            {dataTerdakwa.map((item: any, index: any) => {
              return (
                <div>
                  <div className="grid grid-cols-10 rounded-sm bg-slate-300 hover:bg-slate-500">
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-2 border-b border-l border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.status}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.nama}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-r border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.tanggal_putusan}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 text-black">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Kirim Salinan Putusan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300">
            <div className="flex flex-col">
              <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-400 border">
                <div className="p-2.5 xl:p-5 col-span-2">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Status
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tanggal Pemberitahuan Putusan
                  </h5>
                </div>
              </div>
            </div>
            {dataOditur.map((item: any, index: any) => {
              return (
                <div>
                  <div className="grid grid-cols-10 rounded-sm bg-slate-300 hover:bg-slate-500">
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-2 border-b border-l border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.status}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.nama}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-r border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.tanggal_putusan}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col">
              <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-400 mt-10 border">
                <div className="p-2.5 xl:p-5 col-span-2">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Status
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Nama
                  </h5>
                </div>

                <div className="p-2.5 xl:p-5 col-span-4">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tanggal Pemberitahuan Putusan
                  </h5>
                </div>
              </div>
            </div>
            {dataTerdakwa.map((item: any, index: any) => {
              return (
                <div>
                  <div className="grid grid-cols-10 rounded-sm bg-slate-300 hover:bg-slate-500">
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-2 border-b border-l border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.status}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.nama}
                      </p>
                    </div>
                    <div
                      //   onClick={() => handleDetailClick(item)}
                      className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-4 border-b border-r border-slate-600 dark:border-gray-600"
                    >
                      <p className="hidden text-black dark:text-black sm:block">
                        {item.tanggal_putusan}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 text-black">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Kirim Salinan Putusan Kepada Penyidik
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300 ">
            {/* <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Tanggal Putusan
                            </h5> */}
            <p>Kamis, 11 Jan. 2024</p>
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 text-black">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tanggal Minutasi
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300 ">
            {/* <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Tanggal Putusan
                            </h5> */}
            <p>Kamis, 11 Jan. 2024</p>
          </div>
        </div>
        <div className="grid grid-cols-10 bg-gray-2 dark:bg-slate-400 text-black">
          <div className="p-2.5 xl:p-5 col-span-2 text-center border-b">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Keterangan
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8 bg-slate-300 ">
            {/* Ini Keterangan */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
