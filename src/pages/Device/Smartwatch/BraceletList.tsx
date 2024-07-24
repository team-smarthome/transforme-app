// import { NavLink } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { apiReadAllGelang } from '../../services/api';
// const BraceletList = () => {
//   const [data, setData] = useState([]);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     let params = {
//       filter: ' ',
//     };
//     apiReadAllGelang(params).then((res) => {
//       console.log(res, 'res');

//       setData(res);
//     });
//   }, []);

//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <div className="flex justify-between">
//       <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
//         Data Perangkat Gelang
//       </h4>
//       <button className='text-black rounded-sm bg-blue-300'>
//         Tambah
//       </button>
//       </div>
//       <div className="flex flex-col">
//         <div className="grid grid-cols-9 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               DMAC
//             </h5>
//           </div>
//           {/* <div className="p-2.5 text-center xl:p-5 hidden xl:block">
//             <h5 className="text-xs font-medium uppercase  ">
//               ID Kamera
//             </h5>
//           </div> */}
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Registrasi WBP
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Baterai
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Tanggal Pasang
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">Tanggal Aktivitas</h5>
//           </div>
//           {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Akses
//             </h5>
//           </div> */}
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Kode Lokasi
//             </h5>
//           </div>
//           {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Sistolik
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Diastolik
//             </h5>
//           </div> */}
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               RSSI
//             </h5>
//           </div>
//           {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Terakhir dilihat
//             </h5>
//           </div> */}
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-xs font-medium uppercase ">
//               Aksi
//             </h5>
//           </div>
//         </div>

//         {data.map((item) => {
//           return (
//             <div className="grid grid-cols-9 border-b border-stroke dark:border-strokedark sm:grid-cols-9">
//               <div className="flex items-center gap-3 p-2.5 xl:p-5">
//                 <p className="hidden text-black dark:text-white sm:block text-xs">
//                   {item.dmac}
//                 </p>
//               </div>

//               <div className="flex items-center justify-center p-2.5 xl:p-5">
//                 <p className="text-black dark:text-white text-xs">{item.registrasi_WBP}</p>
//               </div>

//               <div className="flex items-center justify-center p-2.5 xl:p-5">
//                 <p className="text-meta-3 text-xs">{item.baterai}</p>
//               </div>

//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 <p className="text-black dark:text-white text-xs">{item.tgl_pasang}</p>
//               </div>

//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 <p className="text-meta-5 text-xs"> {item.tgl_aktivitas}</p>
//               </div>
//               {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 <p className="text-meta-5 text-xs"> {item.akses}</p>
//               </div> */}
//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 <p className="text-meta-5 text-xs"> {item.kode_lokasi}</p>
//               </div>
//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 <p className="text-meta-5 text-xs"> {item.rssi}</p>
//               </div>
//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 flex gap-2">
//               <button
//                 className='pt-1 text-black rounded-sm bg-blue-300'
//                 >
//                   Detail
//                 </button>
//                 <button
//                 className='pt-1 text-black rounded-sm bg-blue-300'
//                 >
//                   Edit
//                 </button>
//                 <button
//                 className='pt-1 text-black rounded-sm bg-blue-300'
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BraceletList;
