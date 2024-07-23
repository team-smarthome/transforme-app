import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiBraceletList } from "../../services/api";
const BraceletList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let params = {
      filter: " ",
    };
    apiBraceletList(params).then((res) => {
      console.log(res, "res");

      setData(res);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Data Perangkat Gelang
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-12 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-12">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Nama Gelang</h5>
          </div>
          {/* <div className="p-2.5 text-center xl:p-5 hidden xl:block">
            <h5 className="text-xs font-medium uppercase  ">
              ID Kamera
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Alamat MAC</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Baterai</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Step</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Detak Jantung</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Temperatur</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">SPO</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Sistolik</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Diastolik</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">RSSI</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Terakhir dilihat</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase ">Aksi</h5>
          </div>
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-12 border-b border-stroke dark:border-strokedark sm:grid-cols-12">
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block text-xs">
                  {item.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white text-xs">
                  {item.mcAddress}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3 text-xs">{item.battery}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white text-xs">
                  {item.step}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.heartrate}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.temperature}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.spo}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.systolic}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.diastolic}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.rssi}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-xs"> {item.lastSeen}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BraceletList;
