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
const useGetAuthUser = async () => {
	const params = {
		nomor_pokok: "2024001",
		password: "123456",
	};

	try {
		const data = await LaravelApiLoginSmartwatch(params);

		console.log('====================================');
		console.log(data, "Data Login Smartwatch");
		console.log('====================================');

		if (data.status === 200) {
			const authUser = data.records;
			console.log(authUser, "Auth User");
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


export default useGetAuthUser;
