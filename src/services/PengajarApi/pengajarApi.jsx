import axios from "axios";
// import { webServiveLaravel } from "../Api";
let webServiveLaravelSmartwatch = "https://dev-sikap-smartwatch.transforme.co.id/api/"

export function LaravelApiPengajarList(params, token) {
	try {
		const res = axios({
			method: "GET",
			params: params,
			url: webServiveLaravelSmartwatch + "pengajar",
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

export function LaravelApiPengajarAdd(params, token) {
	try {
		const res = axios({
			method: "POST",
			data: params,
			url: webServiveLaravelSmartwatch + "pengajar",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}

export function LaravelApiPengajarEdit(params, body, token) {
	try {
		const res = axios({
			method: "POST",
			data: body,
			url: webServiveLaravelSmartwatch + `pengajar/${params}?_method=PUT`,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}

export function LaravelApiPengajarDelete(params, param, token) {
	try {
		const res = axios({
			method: "DELETE",
			params: param,
			url: webServiveLaravelSmartwatch + `pengajar/${params}`,
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
