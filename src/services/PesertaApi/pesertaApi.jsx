import axios from "axios";
// import { webServiveLaravel } from "../Api";
let webServiveLaravelSmartwatch = "https://dev-sikap-smartwatch.transforme.co.id/api/"

export function LaravelApiPesertaList(params, token) {
	try {
		const res = axios({
			method: "GET",
			params: params,
			url: webServiveLaravelSmartwatch + "peserta-didik",
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

export function LaravelApiPesertaAdd(params, token) {
	try {
		const res = axios({
			method: "POST",
			data: params,
			url: webServiveLaravelSmartwatch + "peserta-didik",
			headers: {
				// "Content-Type": "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}

export function LaravelApiPesertaEdit(params, body, token) {
	try {
		const res = axios({
			method: "POST",
			data: body,
			url: webServiveLaravelSmartwatch + `peserta-didik/${params}?_method=PUT`,
			headers: {
				// "Content-Type": "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}

export function LaravelApiPesertaDelete(params, param, token) {
	try {
		const res = axios({
			method: "DELETE",
			params: param,
			url: webServiveLaravelSmartwatch + `peserta-didik/${params}`,
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
