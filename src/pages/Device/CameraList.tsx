import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiDeviceList } from '../../services/api';
const CameraList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let params = {
      filter: ' ',
    };
    apiDeviceList(params).then((res) => {
      console.log(res, 'res');

      setData(res);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Data Perangkat Kamera
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Kamera
            </h5>
          </div>
          {/* <div className="p-2.5 text-center xl:p-5 hidden xl:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base ">
              ID Kamera
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Alamat IP
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Model
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">SN</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lokasi
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi
            </h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-8 border-b border-stroke dark:border-strokedark sm:grid-cols-8">
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.deviceCode}
                </p>
              </div>

              {/* <div className="flex items-center justify-center p-2.5 xl:p-5 hidden xl:block">
                <p className="text-black dark:text-white text-xs">{item.deviceId}</p>
              </div> */}

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.IpAddress}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.status}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5"> {item.dmName}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5"> {item.provider}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5"> {item.location}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CameraList;
