import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AiOutlineCopy } from "react-icons/ai";
import {
  formatDMAC,
  formatDate,
  setZonaColor,
} from "../../utils/globalFunctions";
import { webserviceurl } from "../../services/api";
import { SendAlert } from "../BuildingMap/components/SendAlert";

interface ModalPetugasProps {
  item: any;
  handleClose: any;
}

function ModalPetugas({ handleClose, item }: ModalPetugasProps) {
  console.table(item);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    SendAlert.fire({
      icon: "success",
      title: "Berhasil salin ke clipboard",
    });
  };

  const {
    xAxis,
    yAxis,
    petugas_id,
    nrp,
    nama,
    pangkat_id,
    nama_pangkat,
    kesatuan_id,
    nama_kesatuan,
    lokasi_kesatuan_id,
    nama_lokasi_kesatuan,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    provinsi_id,
    nama_provinsi,
    kota_id,
    nama_kota,
    alamat,
    agama_id,
    nama_agama,
    status_kawin_id,
    nama_status_kawin,
    pendidikan_id,
    nama_pendidikan,
    bidang_keahlian_id,
    nama_bidang_keahlian,
    jabatan,
    divisi,
    nomor_petugas,
    lokasi_otmil_id,
    lokasi_lemasmil_id,
    lokasi_tugas,
    foto_wajah,
    grup_petugas_id,
    nama_grup_petugas,
    matra_id,
    nama_matra,
  } = item;
  return (
    <div className="w-full text-white">
      <section className="w-full flex px-4 py-4 justify-between">
        <button type="button" onClick={handleClose}>
          <p className="font-semibold text-lg">Petugas</p>
        </button>
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </section>

      <div className="flex px-6 mb-4 gap-x-6">
        <section className="w-56 h-48 bg-map-outdoor">
          <img
            className="w-full h-full object-cover"
            src={
              "https://images.pexels.com/photos/2418479/pexels-photo-2418479.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
            alt=""
          />
          {/* <img
            className="w-full h-full object-cover"
            src={webserviceurl + foto_wajah}
            alt=""
          /> */}
        </section>
        <section className="w-full">
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Nama</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">{nama}</p>
            </div>
          </div>
          {/* <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">DMAC</p>
            </div>
            <div className="flex-2 flex items-center gap-x-2">
              <p className="text-sm">{formatDMAC(DMAC)}</p>
              <button type="button" onClick={() => copyToClipboard(DMAC)}>
                <AiOutlineCopy className="w-3 h-3 text-white" />
              </button>
            </div>
          </div> */}
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">TTL</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">
                {tempat_lahir}, {formatDate(tanggal_lahir)}
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">NRP</p>
            </div>
            <div className="flex-2 flex items-center gap-x-2">
              <p className="text-sm">{nrp}</p>
              <button type="button" onClick={() => copyToClipboard(nrp)}>
                <AiOutlineCopy className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">No. Petugas</p>
            </div>
            <div className="flex-2 flex items-center gap-x-2">
              <p className="text-sm">{nomor_petugas}</p>
              <button
                type="button"
                onClick={() => copyToClipboard(nomor_petugas)}
              >
                <AiOutlineCopy className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Matra</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">{nama_matra}</p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Pangkat</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">{nama_pangkat}</p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Kesatuan</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">
                {nama_kesatuan}, {nama_lokasi_kesatuan}
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-bold text-sm">Jenis Kelamin</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">
                {parseInt(jenis_kelamin) === 1 ? "Laki-laki" : "Perempuan"}
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-bold text-sm">Domisili</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">
                {nama_kota}, {nama_provinsi}
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-bold text-sm">Pendidikan</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">{nama_pendidikan}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-4 mb-4">
        <p className=" mb-3 text-center bg-slate-500   font-semibold text-white rounded-md mx-8">
          Log Petugas
        </p>
        <div className="h-[20%] py-2 overflow-x-auto flex items-center justify-center px-8 gap-2">
          <div className="bg-boxdark px-4 py-4 border border-slate-400 h-full w-[50%] max-w-[500px]">
            <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
              <img
                src={
                  "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">{nama}</p>
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
                  "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">{nama}</p>
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
                  "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">{nama}</p>
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
                  "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">{nama}</p>
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

export default ModalPetugas;
