import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../utils/constants';
import { Alerts } from './AlertDaftarKasus';

const Penuntutan = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className=" bg-slate-200">
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-3 flex flex-row mr-2 ml-2 pb-3">
          <div className="flex flex-col shadow-default divide-y rounded-sm border-stroke bg-white px-2 pt-2 pb-2.5 dark:border-strokedark dark:bg-slate-400 text-black">
            <div className="uppercase text-sx font-medium flex-none w-44 text-sm flex items-center p-2.5 xl:p-3 cursor-pointer">
              Tanggal Tuntutan
            </div>
            <div className="uppercase text-sx font-medium flex-initial w-75 text-sm flex items-center p-2.5 xl:p-3 cursor-pointer">
              Isi Tuntutan
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y object-cover rounded-full">
            <div className="flex flex-col shadow-default divide-y rounded-sm border-stroke bg-white px-2 pt-2 pb-2.5 dark:border-strokedark dark:bg-slate-300 text-black">
              <div className="text-sm flex items-center p-2.5 xl:p-3 cursor-pointer">
                Senin, 09 Okt. 2023
              </div>
              <div className="text-sm flex items-center p-2.5 xl:p-3 cursor-pointer">
                MENUNTUT <br />
                Agar Terdakwa dijatuhi : Pidana denda sebesar : Rp. 150.000,-
                (seratus lima puluh ribu rupiah). Membayar biaya perkara
                sebesar: Rp. 25.000,- (dua puluh lima ribu rupiah). Barang bukti
                berupa : 1 (satu) buah Sim B1 No: 01/03369/3/BI atas nama Letkol
                Kal Suwasto Hadijoyo N.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Penuntutan;
