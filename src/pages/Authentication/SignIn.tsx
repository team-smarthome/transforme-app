import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoDark from "../../images/logo/logo-dark.svg";
import Logo from "../../images/logo/logo.png";
import { useForm } from "react-hook-form";
import { CiUser, CiMail, CiLock, CiUnlock } from "react-icons/ci";
import { apiUserLogin } from "../../services/api";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { log } from "console";
import { selectedRoute } from "../../utils/atomstates";
import { useAtom } from "jotai";

const SignIn = () => {
  const navigate: any = useNavigate();
  const location = useLocation();
  const [appMode] = useAtom(selectedRoute);
  const [error, setError]: any = useState(false);
  const [errorName, setErrorName]: any = useState("");
  const [passVisible, setPassVisible] = useState<boolean>(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [forceLogout, setForceLogout] = useState(false);
  const [lastPage, setLastPage] = useState("/");

  const ls_dataUser = localStorage.getItem("dataUser");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const paramsState = location.state;
    const forceLogout = paramsState && paramsState.forceLogout;
    if (ls_dataUser && !forceLogout) {
      navigate("/home");
    }

    if (forceLogout) {
      setForceLogout(true);
      setLastPage(paramsState.lastPage);

      // Define the keys you want to remove
      const keysToRemove = ["dataUser", "token"];
      // Iterate over the keys and remove them from localStorage
      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  }, []);

  type FormValues = {
    nrp: string;
    password: string;
  };

  const togglePassVisibility = () => {
    setPassVisible((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSignIn = async (data: any) => {
    console.log("AA", data);
    setButtonLoad(true);
    await apiUserLogin(data).then((res) => {
      console.log(res);
      let record = res.data.user;
      let token = res.data.auth;
      if (res.data.status === "success") {
        Swal.fire(`Berhasil Masuk`).then(() => {
          localStorage.setItem("dataUser", JSON.stringify(record));
          localStorage.setItem("token", JSON.stringify(token));
          setError(false);

          navigate("/home");
        });
        setButtonLoad(false);
      } else {
        setError(true);
        setErrorName(res.data.message);
        setButtonLoad(false);
      }
    });
  };

  const registerOptions = {
    nrp: { required: "nrp tidak boleh kosong" },
    password: { required: "Password tidak boleh kosong" },
  };

  return (
    <>
      <div className="h-screen rounded-sm border border-strokedark  shadow-default bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2 gap-y-20">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-1 inline-block" to="/">
                <img
                  className="hidden xl:block w-50 h-50 "
                  src={Logo}
                  alt="Logo"
                />
              </Link>

              <p className="2xl:px-20 text-white font-bold text-[40px]">
                TRANSFORME
              </p>
              <p className="2xl:px-20 text-white opacity-80 font-bold text-[20px]">
                Sistem Informasi Staff
              </p>
            </div>
          </div>

          <div className="w-full border-strokedark xl:w-1/2 xl:border-l-2 xl:mt-20">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="text-center xl:text-left mb-2 text-2xl font-bold text-white sm:text-title-xl2">
                TRANSFORME
              </h2>
              <h2 className="text-center xl:text-left mb-9 text-xl font-bold text-white sm:text-title-xl2">
                Monitori System
              </h2>

              <p
                className={` ${
                  error
                    ? "block bg-red-500 text-white text-center mb-6 rounded-md py-2"
                    : "hidden"
                }`}
              >
                {errorName}
              </p>

              <form
                onSubmit={handleSubmit(handleSignIn)}
                className="mx-32 xl:mx-0"
              >
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    ID
                  </label>
                  <div className="relative">
                    <input
                      placeholder="masukan ID"
                      className="w-full text-white rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      {...register("nrp", registerOptions.nrp)}
                    />

                    <span className="absolute text-slate-300 right-4 top-4">
                      <CiUser size={25} />
                    </span>
                    <p className=" text-red-500">
                      {errors?.nrp && errors.nrp.message}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={passVisible ? "text" : "password"}
                      placeholder="masukan password"
                      className="w-full text-white rounded-lg border py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none border-form-strokedark bg-form-input"
                      {...register("password", registerOptions.password)}
                    />

                    <button
                      type="button"
                      onClick={togglePassVisibility}
                      className="absolute text-slate-300 right-4 top-4"
                    >
                      {passVisible ? (
                        <CiUnlock size={25} />
                      ) : (
                        <CiLock size={25} />
                      )}
                    </button>
                    <p className=" text-red-500">
                      {errors?.password && errors.password.message}
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? "bg-slate-400" : ""
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                  >
                    {buttonLoad ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      ""
                    )}
                    Masuk
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
