import axios from "axios";
import { webServive } from "./api";

export function ApiDashboardPin(params, token) {
	try {
		const res = axios({
			method: "GET",
			// params: params,
			url: webServive + "dashboard/list",
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

export function ApiLoginPin(params) {
	try {
		const res = axios({
			method: "POST",
			url: webServive + "auth/login",
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


