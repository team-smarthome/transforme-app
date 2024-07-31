import axios from "axios";
import Swal from "sweetalert2";
import { useAtom } from "jotai";
import { authLoginDashboardSmartwatch } from "../utils/atomDashboardSmartwatch";

let webServiveLaravelSmartwatch = "https://dev-sikap-smartwatch.transforme.co.id/api/";

export async function LaravelApiLoginSmartwatch(params) {
  try {
    const res = await axios({
      method: "POST",
      url: webServiveLaravelSmartwatch + "auth/login",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}

// Custom hook untuk menangani status 401
export const useUnauthorizedHandler = () => {
  const [authUser, setAuthUser] = useAtom(authLoginDashboardSmartwatch);

  const handleUnauthorized = async () => {
    console.log("handleUnauthorized");

    const params = {
      nomor_pokok: "2024001",
      password: "123456",
    };

    try {
      const data = await LaravelApiLoginSmartwatch(params);

      if (data.status === 200) {
        const authUser = data.records;
        setAuthUser(authUser);
        return authUser?.name ? authUser : null;
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Login Smartwatch",
          text: data.message,
        });
        return null;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Login Smartwatch",
        text: "Terjadi kesalahan pada server.",
      });
      return null;
    }
  };

  return handleUnauthorized;
};
