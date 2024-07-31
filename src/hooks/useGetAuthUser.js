// import { useSelector } from "react-redux";
let webServiveLaravelSmartwatch = "https://dev-sikap-smartwatch.transforme.co.id/api/"
import axios from "axios";
export function LaravelApiLoginSmartwatch(params) {
	try {
		const res = axios({
			method: "POST",
			url: webServiveLaravelSmartwatch + "auth/login",
			data: params,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}
import Swal from "sweetalert2";
import { useAtom } from "jotai";
import {
	authLoginDashboardSmartwatch
} from "../utils/atomDashboardSmartwatch"


const useGetAuthUser = async () => {
	const [authUser,setAuthUser] = useAtom(authLoginDashboardSmartwatch);

	const params = {
		nomor_pokok: "2024001",
		password: "123456",
	};


	if(!authUser.token){
	try {
		const {data} = await LaravelApiLoginSmartwatch(params);
		console.log(data, "Auth User");
		console.log(data.records, "Auth User");
		console.log(data.status, "Auth User");

		

		if (data.status === 200) {
			const authUser = data.records;
			setAuthUser(authUser);
			// console.log(data.records, "Auth User");
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
	}
	else{
		return authUser;
	}
};


export default useGetAuthUser;
