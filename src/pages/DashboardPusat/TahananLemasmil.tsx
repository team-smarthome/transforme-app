import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Tahananlemasmil = () => {

  const [data, setData] = useState([
    {
      kota: 'cimahi',
      nama: 'edward',
      tgl_lahir: '2000-08-09',
      jenis_jahat: 'mencuri cimahi',
      tgl_ditahan: '2023-09-09',
    },
    {
      kota: 'medan',
      nama: 'edward',
      tgl_lahir: '2000-08-09',
      jenis_jahat: 'judi medan',
      tgl_ditahan: '2023-09-09',
    },
    {
      kota: 'bandung',
      nama: 'edward',
      tgl_lahir: '2000-08-09',
      jenis_jahat: 'kdrt bandung',
      tgl_ditahan: '2023-09-09',
    },
    {
      kota: 'makasar',
      nama: 'edward',
      tgl_lahir: '2000-08-09',
      jenis_jahat: 'mencuri makasar',
      tgl_ditahan: '2023-09-09',
    },
  ]);
  

  // State untuk menyimpan pilihan kota
  const [kotaTerpilih, setKotaTerpilih] = useState('cimahi');

  // Fungsi untuk menangani perubahan select option
  const handlePilihanKotaChange = (event:any) => {
    setKotaTerpilih(event.target.value);
  };

  // Filter data berdasarkan kota yang dipilih
  const dataTampil = kotaTerpilih === 'semua' ? data : data.filter(item => item.kota === kotaTerpilih);

  return (
    <>
    <div className='flex justify-between items-center'>
      <Link to='/statistic'>
        <div className='flex capitalize mb-5 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-10 h-10 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
          <h1 className='text-lg font-semibold'>STATISTIK</h1>
        </div>
      </Link>
      <div>
        <select className='h-10 w-40 rounded-md pl-2' value={kotaTerpilih} onChange={handlePilihanKotaChange}>
          <option value="cimahi">Cimahi</option>
          <option value="medan">Medan</option>
          <option value="bandung">Bandung</option>
          <option value="makasar">makasar</option>
        </select>
      </div>
    </div>

    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white capitalize">
        Data Tahanan Lemasmil  {kotaTerpilih}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama
            </h5>
          </div>
      
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              tanggal lahir
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              jenis jahat
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              tanggal ditahan
            </h5>
          </div>
        </div>

        {dataTampil.map((item) => {
          return (
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.nama}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-white">{item.tgl_lahir}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-white">{item.jenis_jahat}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.tgl_ditahan}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  )
}

export default Tahananlemasmil