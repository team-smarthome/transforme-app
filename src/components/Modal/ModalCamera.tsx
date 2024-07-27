import {
    XMarkIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { apiReadOneKamera } from "../../services/api";
import { setZonaColor } from "../../utils/globalFunctions";

interface ModalCameraProps {
  name: string;
  handleClose: any;
}

function ModalCamera({ name, handleClose }: ModalCameraProps) {
  let [detailCamera, setDetailCamera] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);

    let params = {
      deviceId: "mezpjkh8-lyhf-w8ye-c8v2-0j382pmozgj3",
    };
    apiReadOneKamera(params).then((res) => {
      // console.log(res.data.records, "data detail camera");
      setDetailCamera(res.data.records);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="w-full  max-w-[50vw] text-white">
      <section className="w-full flex px-4 py-4 justify-between">
        <div className="px-4 text-md font-bold">{name}</div>
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </section>

      <div className="flex flex-col md:flex-row gap-x-4 px-10 pb-10">
        <div className="w-24 h-36 ">
          <img
            src="https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="camera"
            className="w-full h-full"
          />
        </div>
        <aside className="flex-1 ">
          <div className="flex">
            <div className="flex-1">
              <p className="font-semibold text-sm">IP</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">192.168.1.19</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <p className="font-semibold text-sm">Nama</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">{name}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <p className="font-semibold text-sm">Ruangan</p>
            </div>
            <div className="flex-2">
              <p className="text-sm">Ruang Ibadah</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <p className="font-semibold text-sm">Zona</p>
            </div>
            <div className="flex-2">
              <p className="font-semibold text-sm">
                <span className={setZonaColor("Hijau")}>Hijau</span>
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
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
                navigate("/daftar-inventaris");
              }}
            >
              Ke Halaman Inventori
            </button>
          </div>
        </aside>
      </div>
      <div className="flex flex-col md:flex-row gap-x-5 px-10 ">
        <ReactPlayer
          playing={true}
          // playing={false}
          controls={true}
          onBuffer={() => console.log("react player buffering")}
          onReady={() => console.log("react player ready")}
          onPlay={() => console.log("react player play")}
          onPause={() => console.log("react player pause")}
          onEnded={() => console.log("react player end")}
          onError={() => console.log("react player error")}
          onProgress={() => console.log("react player progress")}
          url={"http://192.168.1.111:5000/stream/192.168.1.5_.m3u8"}
          // url={["https://www.youtube.com/watch?v=_-3v1MonI54"]}
        />
      </div>
      <div className="mt-4 mb-10">
        <p className=" mb-3 text-center bg-slate-500   font-semibold text-white rounded-md mx-8 overflow-scroll	">
          Log Kamera
        </p>
        <div className=" mx-8 overflow-x-scroll">
          <div className="flex flex-row gap-2">
            {/* Kontainer horizontal */}
            {detailCamera?.kamera_logs?.map((item: any) => (
              <div
                key={item.id} // Pastikan setiap elemen memiliki key yang unik
                className="bg-boxdark px-4 py-4 flex-shrink-0 border border-slate-400 h-full w-1/4"
                // onClick={() => handleDetailClick(item)}
              >
                <div className="bg-boxdark w-full h-[150px] overflow-hidden flex justify-center items-center">
                  <img
                    src={
                      "https://dev.transforme.co.id/siram_admin_api" +
                      item.image_kamera_log
                    }
                    alt="picture"
                    className="object-cover w-[150px] h-[150px] border border-slate-400"
                  ></img>
                </div>
                <div className="grid grid-cols-1 items-center">
                  <div className="flex flex-col w-full">
                    <p className="text-sm font-bold text-white">
                      Ruangan :{" "}
                      {item.ruangan_otmil
                        ? item.ruangan_otmil.nama_ruangan_otmil
                        : item.ruangan_lemasmil.nama_ruangan_lemasmil}
                    </p>
                    <p className="text-sm font-base text-slate-500">
                      Lokasi :{" "}
                      {item.ruangan_otmil.lokasi_otmil.nama_lokasi_otmil
                        ? item.ruangan_otmil.lokasi_otmil.nama_lokasi_otmil
                        : item.ruangan_lemasmil.lokasi_lemasmil
                            .nama_lokasi_lemasmil}
                    </p>
                  </div>
                  <div className="flex flex-col mt-2 item-center  w-full">
                    <p className="text-xs">Keterangan</p>
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
                      <p className="text-xs">{item.timestamp_kamera_log}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCamera;
