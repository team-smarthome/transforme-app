import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiLocationList } from '../../services/api';
const LocationList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let params = {
      filter: ' ',
    };
    apiLocationList(params).then((res) => {
      console.log(res.data.data.records, 'res');

      setData(res.data.data.records);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Pengaturan Data Lemasmil
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama Lokasi
            </h5>
          </div>

          {/* <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
Latitude            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
Longitude          </h5>
          </div> */}
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Aksi{' '}
            </h5>
          </div> */}
        </div>

        {data.map((item) => {
          return (
            <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.location_name}
                </p>
              </div>

              {/* <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.lat}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{item.long}</p>
              </div> */}
              <div className="flex items-center justify-center space-x-2 ">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-green-500 hover:bg-green-400 text-white text-sm font-medium"
                  // onClick={() => {
                  //   handleEdit(item);
                  // }}
                >
                  <svg fill="none" 
                  className="w-4 h-4"
                  stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
</svg>
                  <span className="text-sm font-medium">Update</span>
                </button>

                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-red-500 hover:bg-red-400 text-white text-sm font-medium"
                  // onClick={() => {
                  //   handleEdit(item);
                  // }}
                >
                  <svg fill="none" 
                  className="w-4 h-4"
                  stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path>
</svg>
                  <span className="text-sm font-medium">Delete</span>
                </button>

                <NavLink
                  to="/manajemen-pengguna"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium"
                  // onClick={() => {
                  //   handleEdit(item);
                  // }}
                >
                  <svg fill="none" 
                  className="w-4 h-4"
                  stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
</svg>
                  <span className="text-sm font-medium">User</span>
                </NavLink>

                <NavLink
                  to="/pengaturan-perangkat/:id"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-purple-500 hover:bg-purple-400 text-white text-sm font-medium"
                  // onClick={() => {
                  //   handleEdit(item);
                  // }}
                >
                  <svg fill="none" 
                  className="w-4 h-4"
                   stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z"></path>
</svg>
                  <span className="text-sm font-medium">Device</span>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
