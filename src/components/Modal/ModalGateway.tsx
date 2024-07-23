import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { setZonaColor } from "../../utils/globalFunctions";
import { useNavigate } from "react-router-dom";

interface ModalGatewayProps {
  name: string;
  handleClose: any;
}

function ModalGateway({ name, handleClose }: ModalGatewayProps) {
  let navigate = useNavigate();

  return (
    <div className="w-full text-white">
      <section className="w-full flex px-4 py-4 justify-between">
        <div className="px-4 text-md font-bold">{name}</div>
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </section>

      <div className="flex flex-col md:flex-row gap-x-4 px-10 ">
        <div className="w-24 h-36 ">
          <img
            src="https://images.pexels.com/photos/4218546/pexels-photo-4218546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
              <p className="font-semibold text-sm">Nama Gateway</p>
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
                <span className={setZonaColor("Hijau")}>Hijau</span>
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 ">
              <p className="font-semibold text-sm">Status</p>
            </div>
            <div className="flex-2">
              <p className="text-sm font-semibold">
                <span className={setZonaColor("Hijau")}>Online</span>
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
      <div className="mt-4 mb-4">
        <p className=" mb-3 text-center bg-slate-500 font-bold text-white rounded-md mx-8">
          Log Gateway
        </p>
        <div className="h-[20%] py-2 overflow-x-auto flex items-center justify-center px-8 gap-2">
          <div className="bg-boxdark px-4 py-4 border border-slate-400 h-full w-[50%] max-w-[500px]">
            <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
              <img
                src={
                  "https://images.pexels.com/photos/6069300/pexels-photo-6069300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  Kopral John Doe
                </p>
                <p className="text-xs font-base text-slate-500">Otmil Cimahi</p>
              </div>
              <div className="flex flex-col mt-1 item-center  w-full">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="15"
                    height="15"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs">Jam 13:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-boxdark px-4 py-4 border border-slate-400 h-full w-[50%] max-w-[500px]">
            <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
              <img
                src={
                  "https://images.pexels.com/photos/6069300/pexels-photo-6069300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  Kopral John Doe
                </p>
                <p className="text-xs font-base text-slate-500">Otmil Cimahi</p>
              </div>
              <div className="flex flex-col mt-1 item-center  w-full">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="15"
                    height="15"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs">Jam 13:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-boxdark px-4 py-4 border border-slate-400 h-full w-[50%] max-w-[500px]">
            <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
              <img
                src={
                  "https://images.pexels.com/photos/6069300/pexels-photo-6069300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  Kopral John Doe
                </p>
                <p className="text-xs font-base text-slate-500">Otmil Cimahi</p>
              </div>
              <div className="flex flex-col mt-1 item-center  w-full">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="15"
                    height="15"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs">Jam 13:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-boxdark px-4 py-4 border border-slate-400 h-full w-[50%] max-w-[500px]">
            <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
              <img
                src={
                  "https://images.pexels.com/photos/6069300/pexels-photo-6069300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  Kopral John Doe
                </p>
                <p className="text-xs font-base text-slate-500">Otmil Cimahi</p>
              </div>
              <div className="flex flex-col mt-1 item-center  w-full">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="15"
                    height="15"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs">Jam 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalGateway;
