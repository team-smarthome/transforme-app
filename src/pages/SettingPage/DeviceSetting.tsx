import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import CameraList from "../Device/CameraList";
import BraceletList from "../Device/BraceletList";
import GatewayList from "../Device/GatewayList";
const DeviceSetting = () => {
  const [selectedDevice, setSelectedDevice] = useState("0" as string);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <select
          className="w-full h-10 px-3 text-base text-black placeholder-gray-900 border rounded-lg appearance-none focus:shadow-outline"
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          <option value="0">Pilih Perangkat</option>
          <option value="1">Kamera</option>
          <option value="2">Gateway</option>
          <option value="3">Gelang</option>
        </select>
        {selectedDevice === "1" && <CameraList />}
        {selectedDevice === "2" && <GatewayList />}
        {selectedDevice === "3" && <BraceletList />}
        {selectedDevice === "0" && (
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-center">
              <h4 className="text-title-md font-bold  text-black dark:text-white">
                Pilih Perangkat
              </h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeviceSetting;
