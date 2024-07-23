import { useState } from 'react';
import ChartFive from '../../components/ChardKasus';

//icon gelang
let IconBracelet = () => {
  return (
    <div className="flex h-11.5 w-11.5 items-center justify-center text-black rounded-full bg-slate-100 dark:bg-slate-200">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7 3V4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20L7 21C7 22.6569 8.34315 24 10 24H14C15.6569 24 17 22.6569 17 21V20C18.6569 20 20 18.6569 20 17V13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V7C20 5.34315 18.6569 4 17 4V3C17 1.34315 15.6569 0 14 0H10C8.34315 0 7 1.34315 7 3ZM10 2C9.44772 2 9 2.44772 9 3V4H15V3C15 2.44772 14.5523 2 14 2H10ZM7 18C6.44772 18 6 17.5523 6 17V7C6 6.44771 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18H7ZM9 20H15V21C15 21.5523 14.5523 22 14 22H10C9.44772 22 9 21.5523 9 21V20Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

const statisticLemasmil = () => {
  //lemasmil
  const [tahananLem, setTahananLem] = useState(8);
  const [lemTerintegrasi, SetLemTerintregrasi] = useState(9);
  const [perangkatLem, SetPerangkatLem] = useState(10);

  //kamera
  const [kamera, setKamera] = useState(15);
  const [kameraAktif, setKameraAktif] = useState(10);
  const [kameraNonAktif, setKameraNonAktif] = useState(3);
  const [kameraRusak, setKameraRusak] = useState(2);

  //gateway
  const [gateway, setGateway] = useState({
    aktif: 11,
    nonAktif: 3,
    rusak: 1,
  });

  //zona
  const [zona, setZona] = useState({
    merah: 4,
    kuning: 5,
    hijau: 10,
  });
  //gelang
  const [gelang, setGelang] = useState({
    prajuritBinaanAktif: 17,
    prajuritBinaanNon: 2,
    prajuritBinaanRusak: 1,
    jumlah: 20,
  });
  return (
    <div>
      {/* ---static lemasmil start--- */}
      <div className="mt-1 font-semibold text-2xl tracking-wider">
        Statistik LEMASMIL
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-2">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {tahananLem}
              </h4>
              <span className="text-sm font-medium">
                Total Tahanan LEMASMIL
              </span>
            </div>
          </div>
        </div>{' '}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              fill="none"
              height={18}
              width={18}
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              ></path>
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {lemTerintegrasi}
              </h4>
              <span className="text-sm font-medium">
                Jumlah LEMASMIL Terintegrasi
              </span>
            </div>
          </div>
        </div>{' '}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {perangkatLem}
              </h4>
              <span className="text-sm font-medium">
                Jumlah Perangkat LEMASMIL
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ---static lemasmil end--- */}

      {/* ---Kamera start--- */}
      <div>
        <h1 className="mt-8 font-semibold text-2xl tracking-wider">Kamera</h1>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center text-black rounded-full bg-blue-400 dark:bg-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {kameraAktif}
                  </h4>
                  <span className="text-sm font-medium">Kamera Aktif</span>
                </div>
              </div>
            </div>{' '}
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-00">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {kameraRusak}
                  </h4>
                  <span className="text-sm font-medium">Kamera Rusak</span>
                </div>
              </div>
            </div>{' '}
          </div>
          <div className="flex grid gap-2">
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-red-600 dark:bg-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {kameraNonAktif}
                  </h4>
                  <span className="text-sm font-medium">Kamera Non-Aktif</span>
                </div>
              </div>
            </div>{' '}
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {kamera}
                  </h4>
                  <span className="text-sm font-medium">Jumlah Kamera</span>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
      {/* ---Kamera end--- */}

      {/* ---Gateway start--- */}
      <div>
        <h1 className="mt-8 font-semibold text-2xl tracking-wider">Gateway</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-2">
          <div className="rounded-sm border col-span-2 border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex h-11.5 w-11.5 items-center justify-center text-black rounded-full bg-slate-100 dark:bg-slate-200">
                    <svg
                      fill="none"
                      width="18"
                      height="18"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      ></path>
                    </svg>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <h4 className="text-title-md font-bold text-black dark:text-white">
                        {gateway.aktif}
                      </h4>
                      <span className="text-sm font-medium">Gateway Aktif</span>
                    </div>
                  </div>
                </div>{' '}
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex h-11.5 w-11.5 items-center justify-center text-black rounded-full bg-green-300 dark:bg-green-500">
                    <svg
                      fill="none"
                      width="18"
                      height="18"
                      stroke="white"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <h4 className="text-title-md font-bold text-black dark:text-white">
                        {zona.hijau}
                      </h4>
                      <span className="text-sm font-medium">Zona Hijau</span>
                    </div>
                  </div>
                </div>{' '}
              </div>
              <div className="grid gap-2">
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex h-11.5 w-11.5 items-center text-black justify-center rounded-full bg-yellow-300 dark:bg-yellow-500">
                    <svg
                      fill="none"
                      width="18"
                      height="18"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <h4 className="text-title-md font-bold text-black dark:text-white">
                        {zona.kuning}
                      </h4>
                      <span className="text-sm font-medium">Zona Kuning</span>
                    </div>
                  </div>
                </div>{' '}
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex h-11.5 w-11.5  items-center justify-center rounded-full bg-red-300 dark:bg-red-700">
                    <svg
                      fill="none"
                      width="18"
                      height="18"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <h4 className="text-title-md font-bold text-black dark:text-white">
                        {zona.merah}
                      </h4>
                      <span className="text-sm font-medium">Zona Merah</span>
                    </div>
                  </div>
                </div>{' '}
              </div>
            </div>
          </div>{' '}
          <div className="grid gap-2">
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <svg
                  fill="none"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
                  ></path>
                </svg>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {gateway.nonAktif}
                  </h4>
                  <span className="text-sm font-medium">Gateway Non-Aktif</span>
                </div>
              </div>
            </div>{' '}
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <svg
                  fill="none"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
                  ></path>
                </svg>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {gateway.rusak}
                  </h4>
                  <span className="text-sm font-medium">Gateway Rusak</span>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
      {/* ---Kamera end--- */}
      {/* ---Gelang start--- */}
      <div>
        <h1 className="mt-8 font-semibold text-2xl tracking-wider">Gelang</h1>
        <div className="bg-[#1e293b] mt-2 grid grid-cols-2 gap-2">
          <div className="p-2 grid gap-2">
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <IconBracelet />
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {gelang.prajuritBinaanAktif}
                  </h4>
                  <span className="text-sm font-medium">
                    Gelang Prajurit Binaan Aktif
                  </span>
                </div>
              </div>
            </div>{' '}
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <IconBracelet />

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {gelang.prajuritBinaanRusak}
                  </h4>
                  <span className="text-sm font-medium">
                    Gelang Prajurit Binaan Rusak
                  </span>
                </div>
              </div>
            </div>{' '}
          </div>
          <div className="p-2 grid gap-2">
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <IconBracelet />

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {gelang.prajuritBinaanNon}
                  </h4>
                  <span className="text-sm font-medium">
                    Gelang Prajurit Binaan Non-Aktif
                  </span>
                </div>
              </div>
            </div>{' '}
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <IconBracelet />

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {gelang.jumlah}
                  </h4>
                  <span className="text-sm font-medium">
                    Jumlah Gelang Prajurit Binaan
                  </span>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
      {/* ---Gelang End--- */}
      {/* ---Kasus start--- */}
      <div className="mt-8 font-semibold text-2xl tracking-wider">Kasus</div>
      <div className=" flex justify-center w-full bg-blue mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartFive />
      </div>
      {/* ---Kasus End--- */}
    </div>
  );
};

export default statisticLemasmil;
