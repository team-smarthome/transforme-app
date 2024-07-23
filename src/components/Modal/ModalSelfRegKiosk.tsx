import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { setZonaColor } from "../../utils/globalFunctions";
import { useNavigate } from "react-router-dom";

interface ModalSelfRegKioskProps {
  name: string;
  handleClose: any;
}

function ModalSelfRegKiosk({ name, handleClose }: ModalSelfRegKioskProps) {
  let navigate = useNavigate();

  return (
    <div className="w-full text-white">
      <section className="w-full flex px-4 py-4 justify-between">
        <div className="px-4 text-md font-bold">{name}</div>
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </section>

      <div className="flex flex-col md:flex-row gap-x-4 px-10 mb-10">
        <div className="w-24 h-36 ">
          <img
            src="https://images.unsplash.com/photo-1559137781-875af01c14bc?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="camera"
            className="w-full h-full"
          />
        </div>{" "}
        <aside className="flex-1 ">
          <div className="flex">
            <div className="flex-1 ">
              <p className="font-semibold text-sm">GMAC</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">00:1B:44:11:3A:B7</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 ">
              <p className="font-semibold text-sm">Nama Perangkat M-Kiosk</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">{name}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 ">
              <p className="font-semibold text-sm">Ruangan</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">Ruang Ibadah</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 ">
              <p className="font-semibold text-sm">Zona Ruangan</p>
            </div>
            <div className="flex-2">
              <p className="font-semibold text-sm">
                <span className="">Hijau</span>
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 ">
              <p className="font-semibold text-sm">Status</p>
            </div>
            <div className="flex-2">
              <p className="text-sm font-semibold">
                <span className="">Online</span>
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <button
              className="font-semibold text-xs rounded-lg py-1 px-2 bg-sky-300 text-neutral-950 
          hover:bg-sky-400 hover:text-neutral-950
          "
              onClick={() => {
                navigate("/dashboard/daftar-inventaris");
              }}
            >
              Ke Halaman Inventori
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ModalSelfRegKiosk;
