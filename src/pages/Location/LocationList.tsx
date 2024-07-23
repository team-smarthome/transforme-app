import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiLocationList } from '../../services/api';
const LocationList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let params = {
      filter: ' ',
    };
    apiLocationList(params).then((res) => {
      console.log(res.data.data.records, 'res');

      setData(res.data.data.records);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Data Lokasi Lemasmil
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Lokasi
            </h5>
          </div>
      
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
Latitude            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
Longitude          </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi{' '}
            </h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.location_name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.lat}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.long}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
