import axios from "axios";
// import { webServiveLaravel } from "../api";
let webServiveLaravelSmartwatch = "https://dev-sikap-smartwatch.transforme.co.id/api/"

export function LaravelApiDashboard(token) {
	try {
		const res = axios({
			method: "GET",
			url: webServiveLaravelSmartwatch + "dashboard",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}

export function LaravelApiGetPeserta(params, token) {
	try {
		const res = axios({
			method: "GET",
			params: params,
			url: webServiveLaravelSmartwatch + "dashboard/data-peserta",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}
