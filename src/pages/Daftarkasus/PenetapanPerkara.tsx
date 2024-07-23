import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../utils/constants';
import { Alerts } from './AlertDaftarKasus';

import { apiReadAllWBP } from '../../services/api';

const PenetapanPerkara = ({ token }: any) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);

  // const fetchData = async () => {
  //      let params = {
  //           page: 1,
  //           limit: 10,
  //      };
  //      await apiReadAllWBP(params, token).
  //      then((res) => {
  //           const tersangka = res.data.records?.map((item: any) => ({
  //                value : item.wbp_profile_id,
  //                label : item.tanggal_penetapan_tersangka
  //           }));
  //           setData(tersangka);
  //      }
  //      )
  //      .catch((e) => {
  //           if (e.response.status === 403) {
  //             navigate('/auth/signin', {
  //               state: { forceLogout: true, lastPage: location.pathname },
  //             });
  //           }
  //           Alerts.fire({
  //             icon: e.response.status === 403 ? 'warning' : 'error',
  //             title: e.response.status === 403 ? Error403Message : e.message,
  //           });
  //         });
  // };

  const dummyData = [
    {
      tanggal_penetapan: 'Sabtu, 01 Januari 2023',
      nama_hakim: 'Hakim 1',
      posisi: 'Hakim Ketua',
      aktif: 'Ya',
    },
    {
      tanggal_penetapan: 'Sabtu, 01 Januari 2023',
      nama_hakim: 'Hakim 2',
      posisi: 'Hakim Anggota',
      aktif: 'Ya',
    },
  ];
  const dummyData1 = [
    {
      tanggal_penetapan: 'Sabtu, 02 Januari 2023',
      nama_panitera_pengganti: 'Rahmat',
      aktif: 'Ya',
    },
    {
      tanggal_penetapan: 'Rabu, 04 Januari 2023',
      nama_panitera_pengganti: 'Karyono',
      aktif: 'Ya',
    },
  ];
  const dummyData2 = [
    {
      tanggal_penetapan: 'Kamis, 05 Januari 2021',
      nama_hakim: 'Purwanto, SH, MH',
    },
    {
      tanggal_penetapan: 'Jumat, 06 Januari 2021',
      nama_hakim: 'Sri Wahyuni, SH, MH',
    },
  ];

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="">
      {loading && <Loader />}
      <div className="px-5 pt-2 bg-slate-200">
        <div className="">
          <div className="pb-2 text-sm font-medium md:text-base dark:text-black">
            Penetapan Hakim
          </div>
          <div className="">
            <div className="rounded-sm border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-400">
              <div className="grid grid-cols-4 gap-4 p-1 text-black">
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Tanggal Penetapan
                </div>
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Nama Hakim
                </div>
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Posisi
                </div>
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Aktif
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 divide-y object-cover rounded-full text-black">
              {dummyData.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={`dark:bg-slate-300 ${index !== dummyData.length - 1 ? '' : ''} `}
                  >
                    <div className="grid grid-cols-4 hover:bg-slate-500">
                      <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                        {data.tanggal_penetapan}
                      </div>
                      <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                        {data.nama_hakim}
                      </div>
                      <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                        {data.posisi}
                      </div>
                      <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer p-1.5">
                        {data.aktif}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-3">
            <div className="pb-1 text-sm font-medium md:text-base dark:text-black">
              Penetapan Panitera Pengganti
            </div>
            <div className="rounded-sm border-stroke bg-white px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-400 text-black">
              <div className="grid grid-cols-3 gap-3 p-1">
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Tanggal Penetapan
                </div>
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Nama Panitera Pengganti
                </div>
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Aktif
                </div>
              </div>
            </div>
            <div className="">
              <div className="grid grid-cols-1 text-black">
                {dummyData1.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`dark:bg-slate-300 ${index !== dummyData.length - 1 ? ' border-b bg-gray-1 ' : ''}`}
                    >
                      <div className="grid grid-cols-3 hover:bg-slate-500">
                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                          {data.tanggal_penetapan}
                        </div>
                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                          {data.nama_panitera_pengganti}
                        </div>
                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                          {data.aktif}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="pt-3 pb-3">
            <div className="pb-2 text-sm font-medium md:text-base dark:text-black">
              Penetapan Sidang Pertama
            </div>
            <div className="rounded-sm border-stroke px-1 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-slate-400 text-black">
              <div className="grid grid-cols-2 gap-2 p-1">
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Tanggal Penetapan
                </div>
                <div className="uppercase flex items-center justify-center text-sx font-medium md:text-base">
                  Tanggal Sidang Pertama
                </div>
              </div>
            </div>
            <div className="">
              <div className="grid grid-cols-1 text-black">
                {dummyData2.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`dark:bg-slate-300 ${index !== dummyData.length - 1 ? ' border-b bg-gray-1' : ''}`}
                    >
                      <div className="grid grid-cols-2 hover:bg-slate-500">
                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                          {data.tanggal_penetapan}
                        </div>
                        <div className="text-sm flex items-center justify-center p-2.5 xl:p-3 cursor-pointer">
                          {data.nama_hakim}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenetapanPerkara;
