// import { useEffect, useState } from 'react';
// import Loader from '../../common/Loader';
// import { AddKameraModal } from './ModalAddKategoriPerkara';
// import { DeleteKategoriPerkaraTypeModal } from './ModalDeleteKategoriPerkara';
// import { Alerts } from './AlertKategoriPerkara';
// import {
//   apiReadKategoriPerkara,
//   apiDeleteKategoriPerkara,
//   apiCreateKategoriPerkara,
//   apiUpdateKategoriPerkara
// } from '../../services/api';
// import Pagination from '../../components/Pagination';
// import SearchInputButton from '../Search';
// import * as xlsx from 'xlsx';

// // Interface untuk objek 'params' dan 'item'
// interface Params {
//   filter: string;
//   token: any;
// }
// const CameraList = () => {
//   const [data, setData] = useState([]);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     let fetchData = async () => {

//     // await setIsLoading(true);
//       let params = {
//         filter: ' ',
//       };
//     await apiReadAllCamera(params).then((res) => {
//         console.log(res, 'res');

//         setData(res);
//       });
//       setIsLoading(false);}
//       fetchData();
//   }, []);

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <div className="flex justify-between items-center mb-3">
//       <h4 className="text-xl font-semibold text-black dark:text-white">
//         Data Perangkat Kamera
//       </h4>
//       <button className="text-black rounded-md bg-blue-300 py-2 px-3">
//         Tambah
//       </button>
//       </div>

//       <div className="flex flex-col">
//         <div className="grid grid-cols-6 rounded-t-md bg-gray-2 dark:bg-slate-600 sm:grid-cols-6 px-10">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Nama Kamera
//             </h5>
//           </div>
//           {/* <div className="p-2.5 text-center xl:p-5 hidden xl:block">
//             <h5 className="text-sm font-medium uppercase xsm:text-base ">
//               ID Kamera
//             </h5>
//           </div> */}
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Alamat IP
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Status
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5 ">
//             <h5 className="text-sm font-medium uppercase xsm:text-base ">
//               Model
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5 ">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Kode Ruangan
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Aksi
//             </h5>
//           </div>
//         </div>

//         {data.map((item) => {
//           return (
//             <div className="grid grid-cols-6 border-b border-stroke dark:border-strokedark sm:grid-cols-6 dark:bg-meta-4 px-10">
//               <div className="flex items-center gap-3 p-2.5 xl:p-5">
//                 <p className="hidden text-black dark:text-white sm:block">
//                   {item.nama}
//                 </p>
//               </div>

//               {/* <div className="flex items-center justify-center p-2.5 xl:p-5 hidden xl:block">
//                 <p className="text-black dark:text-white text-xs">{item.deviceId}</p>
//               </div> */}

//               <div className="flex items-center justify-center p-2.5 xl:p-5">
//                 <p className="text-meta-3">{item.ip_address}</p>
//               </div>

//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 {item.status === '1' ? (
//                   <p className="text-green-500 dark:text-green-300">Online</p>
//                 ) : item.status === '2' ? (
//                   <p className="text-red-500 dark:text-red-300">Offline</p>
//                 ) : item.status === '3' ? (
//                   <p className="text-yellow-500 dark:text-yellow-300">Rusak</p>
//                 ) : (
//                   <p className="text-black dark:text-white">Status Tidak Dikenali</p>
//                 )}
//               </div>

//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 <p className="text-meta-5"> {item.model}</p>
//               </div>

//               <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//                 <p className="text-meta-5"> {item.kode_ruangan}</p>
//               </div>

//               <div className="items-center justify-center p-2.5  xl:p-5 flex flex-wrap lg:flex-nowrap gap-2">
//                 <button
//                 className='py-1 px-2 text-black rounded-md bg-blue-300'
//                 >
//                   Detail
//                 </button>
//                 <button
//                 className='py-1 px-2 text-black rounded-md bg-blue-300'
//                 >
//                   Edit
//                 </button>
//                 <button
//                 className='py-1 px-2 text-white rounded-md bg-red-400'
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

// export default CameraList;
