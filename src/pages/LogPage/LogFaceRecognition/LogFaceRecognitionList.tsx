import { NavLink } from 'react-router-dom';

const LogFaceRecognitionList = () => {
  return (
    <>
      {/* <NavLink to='/log-riwayat'>
        <div className='flex capitalize mb-5 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
          <h1 className='text-lg font-semibold uppercase'>log</h1>
        </div>
      </NavLink> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 xl:gap-10 2xl:gap-20">
        <NavLink to="/inmate-log">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Log Tentara Binaan
                </h4>
                <span className="text-sm font-medium"> Log Tentara Binaan</span>
              </div>
            </div>
          </div>{' '}
        </NavLink>

        <NavLink to="/log-riwayat/realtime">
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                fill="none"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  Realtime Log
                </h4>
                <span className="text-sm font-medium">Realtime Log</span>
              </div>
            </div>
          </div>{' '}
        </NavLink>
      </div>
    </>
  );
};

export default LogFaceRecognitionList;
