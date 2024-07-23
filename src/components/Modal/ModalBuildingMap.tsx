import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

interface ModalBuildingMapProps {
  handleClose: any;
  detailData: any;
}

function ModalBuildingMap({ handleClose, detailData }: ModalBuildingMapProps) {
  console.log(detailData, "detailData")
  // const handleMouseOver = () => {}
  return (
    <div className="w-[64rem] text-white">
      <section className="w-full flex px-4 py-4 justify-end">
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </section>

      <main className="px-10 pb-10 w-full">
        <div className="flex mb-5">
          <div className="">
            <p className="font-bold text-lg">Building Name</p>
          </div>
          <div className="">
            <p className="text-lg">{detailData.nama}</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen">
        <div className="w-full h-full bg-red-200 rounded-lg flex items-center justify-center gap-2">
          {detailData.ruangan && detailData.ruangan.map((room) => {
            return(
              <div className="w-30 h-30 rounded-lg bg-slate-600" 
              // onMouseOver={}
              // onMouseOut={}
              />
            )
          })}
        </div>
        </div>
        {/* <section className="w-full min-h-[32rem] bg-map-outdoor relative">
          <div
            onClick={handleClick}
            className="cursor-pointer absolute top-20 left-32 flex flex-col justify-center items-center"
          >
            <UserIcon className="w-8 h-8 transition-colors duration-200 text-red-600 hover:text-red-400" />
            <span className="text-boxdark">Supardi</span>
          </div>
          <div
            onClick={handleClick}
            className="cursor-pointer absolute top-[60%] left-[52%] flex flex-col justify-center items-center"
          >
            <UserIcon className="w-8 h-8 transition-colors duration-200 text-red-600 hover:text-red-400" />
            <span className="text-boxdark">Rohman</span>
          </div>
        </section> */}
      </main>
    </div>
  );
}

export default ModalBuildingMap;
