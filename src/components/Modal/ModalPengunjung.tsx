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
import { useNavigate } from "react-router-dom";

interface ModalPengunjungProps {
  item: any;
  handleClose: any;
}

function ModalPengunjung({ handleClose, item }: ModalPengunjungProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    SendAlert.fire({
      icon: "success",
      title: "Berhasil salin ke clipboard",
    });
  };
  let navigate = useNavigate();

  const {
    nama,
    foto_wajah,
    DMAC,
    nrp,
    nomor_tahanan,
    nama_matra,
    nama_pangkat,
    nama_kesatuan,
    nama_lokasi_kesatuan,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    nama_provinsi,
    nama_kota,
    nama_pendidikan,
    nama_kontak_keluarga,
    hubungan_kontak_keluarga,
    nomor_kontak_keluarga,
  } = item;
  return (
    <div className="w-full text-white">
      <section className="w-full flex px-4 py-4 justify-between">
        <button type="button" onClick={handleClose}>
          <p className="font-semibold text-lg">Pengunjung</p>
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
              "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=800"
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
              <p className="text-sm">{nama_kontak_keluarga}</p>
            </div>
          </div>
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
              <p className="font-semibold text-sm">NIK</p>
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
              <p className="font-semibold text-sm">Jenis Kelamin</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">
                {parseInt(jenis_kelamin) === 1 ? "Laki-laki" : "Perempuan"}
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Alamat</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">
                Jalan Persatuan No.3, {nama_kota}, {nama_provinsi}
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Relasi</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">
                {hubungan_kontak_keluarga} dari {nama}
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Kontak</p>
            </div>
            <div className="flex-2  flex items-center gap-x-2">
              <p className="text-sm">{nomor_kontak_keluarga}</p>
              <button
                type="button"
                onClick={() => copyToClipboard(nomor_kontak_keluarga)}
              >
                <AiOutlineCopy className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* <section className="w-full">
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">Nama</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">{nama}</p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">DMAC</p>
            </div>
            <div className="flex-2 flex items-center gap-x-2">
              <p className="text-sm">{formatDMAC(DMAC)}</p>
              <button type="button" onClick={() => copyToClipboard(DMAC)}>
                <AiOutlineCopy className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
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
              <p className="font-semibold text-sm">No. Tahanan</p>
            </div>
            <div className="flex-2 flex items-center gap-x-2">
              <p className="text-sm">{nomor_tahanan}</p>
              <button
                type="button"
                onClick={() => copyToClipboard(nomor_tahanan)}
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
                {parseInt(jenis_kelamin) === 1 ? 'Laki-laki' : 'Perempuan'}
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
          <div className="flex gap-x-3">
            <div className="flex-1">
              <p className="font-bold text-sm">Kontak Keluarga</p>
            </div>
            <div className="flex-2  flex items-center gap-x-2">
              <p className="text-sm">
                {nama_kontak_keluarga} ({hubungan_kontak_keluarga}){' '}
                {nomor_kontak_keluarga}
              </p>
              <button
                type="button"
                onClick={() => copyToClipboard(nomor_kontak_keluarga)}
              >
                <AiOutlineCopy className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        </section> */}
      </div>
      <div className="mt-4 mb-4">
        <p className=" mb-3 text-center bg-slate-500  font-semibold text-white rounded-md mx-8">
          History Pengunjung
        </p>
        <div className="w-full px-8  text-center">
          <table className=" table-auto ">
            <thead>
              <tr className="bg-slate-700 py-1">
                <th className="text-xs w-1/12">No</th>
                <th className="text-xs w-2/12">Waktu Mulai</th>
                <th className="text-xs w-2/12">Waktu Selesai</th>
                <th className="text-xs w-2/12">Tujuan</th>
                <th className="text-xs w-3/12">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-xs">1</td>
                <td className="text-xs">12:00</td>
                <td className="text-xs">13:00</td>
                <td className="text-xs">Berkunjung</td>
                <td className="text-xs">Konsultasi hukum dengan narapidana</td>
              </tr>
              <tr>
                <td className="text-xs">2</td>
                <td className="text-xs">14:00</td>
                <td className="text-xs">15:00</td>
                <td className="text-xs">Berkunjung</td>
                <td className="text-xs">Konsultasi hukum dengan narapidana</td>
              </tr>
              <tr>
                <td className="text-xs">3</td>
                <td className="text-xs">16:00</td>
                <td className="text-xs">17:00</td>
                <td className="text-xs">Berkunjung</td>
                <td className="text-xs">Konsultasi hukum dengan narapidana</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <p className=" mb-3 text-center bg-slate-500   font-semibold text-white rounded-md mx-8">
          Log Pengunjung
        </p>
        <div className="h-[20%] py-2 overflow-x-auto flex items-center justify-center px-8 gap-2">
          <div className="bg-boxdark px-4 py-4 border border-slate-400 h-full w-[50%] max-w-[500px]">
            <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
              <img
                src={
                  "https://images.pexels.com/photos/4067761/pexels-photo-4067761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  {nama_kontak_keluarga}{" "}
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
                  "https://images.pexels.com/photos/4067761/pexels-photo-4067761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  {nama_kontak_keluarga}{" "}
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
                  "https://images.pexels.com/photos/4067761/pexels-photo-4067761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  {nama_kontak_keluarga}{" "}
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
                  "https://images.pexels.com/photos/4067761/pexels-photo-4067761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="picture"
                className="object-cover w-[150px] h-[150px] border border-slate-400"
              ></img>
            </div>
            <div className=" grid grid-cols-1 items-center">
              <div className="flex flex-col w-full">
                <p className="text-xs font-semibold text-white">
                  {nama_kontak_keluarga}
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

export default ModalPengunjung;
