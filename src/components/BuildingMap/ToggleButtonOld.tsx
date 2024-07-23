import {
  SignalIcon,
  VideoCameraIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { GateArea, BuildingArea } from './components';
import Modal, { ModalBuildingMap } from '../Modal';

function BuildingMap() {
  return (
    <>
      {/* <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onClick={toggleGatewayVisibility}
            defaultChecked={gatewayVisible}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Show Gateway
          </span>
        </label> */}
    </>
  );
}

export default BuildingMap;
