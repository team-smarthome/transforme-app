import axios from "axios";
import Swal from "sweetalert2";
import { useAtom } from "jotai";
import { authLoginDashboardSmartwatch , pesertaDataAtom,pengajarDataAtom, dashboardDataAtom} from "../utils/atomDashboardSmartwatch";
import { LaravelApiPengajarList } from "./PengajarApi/pengajarApi";
import { LaravelApiPesertaList } from "./PesertaApi/pesertaApi";
import { LaravelApiDashboard } from "../../services/DashboardSmartwatchApi/dashboardApi";
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
    return res.data;  // Ensure you are returning the data
  } catch (e) {
    throw e;
  }
}

export const useLoginDashboardSmartwatch = () => {
  const [authUserParam, setAuthUser] = useAtom(authLoginDashboardSmartwatch);
  // let [authUserParam] = useAtom(authLoginDashboardSmartwatch);
	console.log(authUserParam, "Auth User Param");
	console.log(authUserParam.token, "Auth User Param");

	let [dashboardData, setDashboardData] = useAtom(dashboardDataAtom);
	let [pengajarDataTemp, setPengajarDataTemp] = useAtom(pengajarDataAtom);
	let [pesertaDataTemp, setPesertaDataTemp] = useAtom(pesertaDataAtom);
  const handlePengajarData = async (token) => {
		let params = {
			search: "",
			page: 0,
			recordsPerpage: 1000,
		};
		try {
			const { data } = await LaravelApiPengajarList(
				params,
				token
			);
			setPengajarDataTemp(data?.records);
			console.log(data,'Data Temp');

		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				// handleUnauthorized();
				// handlePengajarData();
			}
		}
	};
  const fetchDashboard = async (token) => {
		try {
			const { data } = await LaravelApiDashboard(token);
			

			if (data.status === 200) {
				setDashboardData(data?.records);
			}
		
		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				handleUnauthorized();
			}
		}
	};
	const handlePesertaData = async (token) => {
		let params = {
			search: "",
			page: 0,
			recordsPerpage: 1000,
		};
		try {
			const { data } = await LaravelApiPesertaList(
				params,
				token
			);
			setPesertaDataTemp(data?.records);
		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				// handleUnauthorized();
			}
		}
	};
  const login = async () => {
    const params = {
      nomor_pokok: "2024001",
      password: "123456",
    };

    try {
      const data = await LaravelApiLoginSmartwatch(params);
      console.log(data, "Auth User");

      if (data.status === 200) {
        const user = data.records;
        setAuthUser(user);
        
        fetchDashboard(user.token)
          handlePesertaData(user.token)
          handlePengajarData(user.token)
        
        return user?.name ? user : null;
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

  return login;
};
