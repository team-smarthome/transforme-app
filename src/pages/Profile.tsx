import Breadcrumb from '../components/Breadcrumb';
import UserOne from '../images/user/user-01.png';

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="flex mt-9">
        <div className="w-1/4 flex justify-center">
          <div className="w-44 relative drop-shadow-2 items-center justify-center h-44">
            <img src={UserOne} alt="profile" className="w-full" />
            {/* <label
              htmlFor="profile"
              className="absolute top-4 right-0 flex w-1/5 h-1/5  cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <svg
                className="fill-current"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                  fill=""
                />
              </svg>
              <input
                type="file"
                name="profile"
                id="profile"
                className="sr-only"
              />
            </label> */}
          </div>
        </div>
        <div className="pr-6 w-3/4">
          <div className="flex justify-between border-b pb-1 w-11/12 ">
            <div>
              <h3 className="mb-1.5 mt-4 text-3xl font-semibold font-xl text-black dark:text-white">
                Ismail Bin Mail
              </h3>
              <p className="font-bold text-lg"> Korps Pembekalan Angkutan</p>
            </div>
            {/* <button className="h-2/4 mt-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 hover:text-blue-200"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button> */}
          </div>
          <p> </p>
          <div className="mt-5">
            <h2 className="font-semibold text-sm ">Tanggal Lahir</h2>
            <h3 className="font-bold">09 September 1966</h3>
          </div>
          <div className="mt-3">
            <h2 className="font-semibold text-sm">Agama</h2>
            <h3 className="font-bold">Islam</h3>
          </div>
          <div className="mt-3">
            <h2 className="font-semibold text-sm">Telepon</h2>
            <h3 className="font-bold">0821987629873</h3>
          </div>
          <div className="mt-3">
            <h2 className="font-semibold text-sm">Alamat Email</h2>
            <h3 className="font-bold">mailismail01@gmail.com</h3>
          </div>
          <div className="mt-3">
            <h2 className="font-semibold text-sm">Alamat</h2>
            <h3 className="font-bold w-11/12">
              Jl. Tanah Abang II No.85, RT.1/RW.4, Petojo Sel., Kecamatan
              Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10160
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
