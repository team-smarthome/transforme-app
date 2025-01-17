import axios from "axios";

// export const newWebservice = "https://dev.transforme.co.id/siram_admin_api/";
// export const newwebserviceurl = "https://dev.transforme.co.id/siram_admin_api/";

// export const webserviceurl = "https://dev.transforme.co.id/siram_admin_api/";
// export const webserviceurl = 'http://43.205.129.136/siram_admin_api/';

export const webserviceurl =
	"https://dev-siram-workstation.transforme.co.id/api/";

export const newWebservice =
	"https://dev-siram-workstation.transforme.co.id/api/";
export const newwebserviceurl =
	"https://dev-siram-workstation.transforme.co.id/api/";

const newBaseUrl = "https://dev-siram-workstation.transforme.co.id/api";

function getUrl(params) {
	console.log("parmsTesting", params);
	// const object = {
	//   page: params.page ? params.page : 1,
	//   pageSize: params.pageSize ? params.pageSize : Infinity,
	//   ...params.filter
	// }
	const object = {
		page: params.page ? params.page : 1,
		pageSize: params.pageSize ? params.pageSize : Infinity,
		...(params.filter && params.filter.trim()
			? JSON.parse(params.filter)
			: {}),
	};

	console.log("objectTesting", object);

	for (const key in object) {
		if (typeof object[key] === "string") {
			object[key] = object[key].replace(/\s+/g, " ").trim();
		}
	}

	const queryString = Object.keys(object)
		.map(
			(key) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
		)
		.join("&");
	return queryString;
}
function getUrl2(params) {
	console.log("paramsTesting", params);

	// Menghapus spasi ekstra dan memangkas nilai string dalam params
	const cleanedParams = {};
	for (const key in params) {
		if (typeof params[key] === "string") {
			cleanedParams[key] = params[key].replace(/\s+/g, " ").trim();
		} else {
			cleanedParams[key] = params[key];
		}
	}

	// Membuat query string dari params
	const queryString = Object.keys(cleanedParams)
		.map(
			(key) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(
					cleanedParams[key]
				)}`
		)
		.join("&");

	return queryString;
}

function removeBase64Prefix(base64String: any) {
	// Find the index of the comma that separates the prefix from the actual base64 data
	const commaIndex = base64String.indexOf(",");

	// Check if a comma was found and if it's not at the start of the string
	if (commaIndex !== -1 && commaIndex > 0) {
		// Remove the prefix (including the comma) and return the rest of the string
		return base64String.slice(commaIndex + 1);
	}

	// If no comma or prefix is found, return the base64 string as is
	return base64String;
}

export function apiUserLogin(params) {
	try {
		const response = axios({
			method: "POST",
			url: newWebservice + "login",
			data: params,
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiUserRegister(params: any) {
	try {
		const response = axios({
			method: "post",
			url: "http://localhost:8888/siram-test/user_register.php",
			data: params,
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

// //Lokasi Lemasmil
// export async function apiLokasiLemasmil() {
//   try {
//     const response = await axios({
//       method: 'post',
//       url: webserviceurl + 'siram_api/dashboard_summary.php',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     return response.data.records;
//   } catch (error) {
//     throw error;
//   }
// }

export async function apiDashboard(token: any) {
	try {
		const requestData = {
			// filter: { lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot' },
		};
		const response = await axios({
			method: "get",
			// url: webserviceurl + "siram_api/dashboard_summary.php",
			url: "http://127.0.0.1:8000/api/dashboard",
			// data: requestData,
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${token}`,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
}
// try {
// 	const requestData = {
// 		// filter: { lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot' },
// 	};
// 	const response = await axios({
// 		method: "get",
// 		// url: webserviceurl + "siram_api/dashboard_summary.php",
// 		url: "http://127.0.0.1:8000/api/dashboard",
// 		// data: requestData,
// 		headers: {
// 			"Content-Type": "application/json",
// 			// Authorization: `Bearer ${token}`,
// 		},
// 	});

//   return response;
// } catch (error) {
//   throw error;

// //Status Kamera Lemasmil
export async function apiReadStatusKamera() {
	try {
		const response = await axios({
			method: "get",
			url: webserviceurl + "dashboard_kamera_read.php",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data.records;
	} catch (error) {
		throw error;
	}
}

//status zona
export async function apiStatusZona() {
	try {
		const response = await axios({
			method: "get",
			url: webserviceurl + "status_zona.php",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data.records;
	} catch (error) {
		throw error;
	}
}

//Status gateway
export async function apiStatusGateway() {
	try {
		const response = await axios({
			method: "get",
			url: webserviceurl + "read_status_gatewayWBP",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data.records;
	} catch (error) {
		throw error;
	}
}

//kegiatan Wbp/event dashboard
export async function apiEvent(token) {
	try {
		const requestData = {
			pageSize: 5,
			page: params,
		};
		const response = await axios({
			method: "GET",
			// url: webserviceurl + "kegiatan",
			url: "https://dev-siram-workstation.transforme.co.id/api/kegiatan",
			// url: "http://127.0.0.1:8000/api/kegiatan",
			// data: requestData,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		// console.log("masuk", token);
		console.log(error);
		throw error;
	}
}
//Read All Wbp Otmil
export async function apiReadAllWBPOtmil(token: any, params: any) {
	try {
		const response = await axios({
			method: "get",
			// url: webserviceurl + "/siram_api/wbp_profile_read.php",
			// data: params,
			url: "https://dev-siram-workstation.transforme.co.id/api/wbp_profile",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer 12|I9CeMmEIPrIYYxhWjsbfbQaqMaenWM1lIIUK6Vli5eec4821`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
//Read All Wbp Otmil
export async function apiReadAllWBPByName(params: any) {
	// export async function apiReadAllWBPByName(token:any,params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "/siram_api/read_tersangka_by_id.php",
			data: params,
			// headers: {
			//   'Content-Type': 'application/json',
			//   Authorization: `Bearer ${token}`,
			// },
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

//Read all Wbp Sick Otmil
export async function apiReadAllWBPOtmilSick(token: any, params: any) {
	const requestData = {
		pagination: {
			pageSize: 5,
			currentPage: params,
		},
		filter: {
			// lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
			is_sick: "1",
		},
		is_sick: 1,
	};
	try {
		const response = await axios({
			method: "post",
			// url: webserviceurl + "/siram_api/wbp_profile_read.php",
			// data: requestData,
			url: "https://dev-siram-workstation.transforme.co.id/api/wbp_profile",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer 12|I9CeMmEIPrIYYxhWjsbfbQaqMaenWM1lIIUK6Vli5eec4821`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

//Read Wbp Isolasi Otmil
export async function apiReadAllWBPOtmilIsolasi(token: any, params: any) {
	const requestData = {
		pagination: {
			pageSize: 2,
			currentPage: params,
		},
		filter: {
			// lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
			is_isolated: "1",
		},
	};
	try {
		const response = await axios({
			method: "get",
			// url: webserviceurl + "/siram_api/wbp_profile_read.php",
			// data: requestData,
			url: "https://dev-siram-workstation.transforme.co.id/api/wbp_profile",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer 12|I9CeMmEIPrIYYxhWjsbfbQaqMaenWM1lIIUK6Vli5eec4821`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllWBP(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: "https://dev.transforme.co.id/gema_admin_api/siram_admin_api/read_all_wbp.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiWatchListList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/readDpo.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

interface VisitorRealtimeLogParams {
	device_id: string;
	country_id: string;
	age: string;
	analytics: string;
	name: string;
	gender: string;
}

export async function apiVisitorRealtimeLogList(params) {
	try {
		let parameter = {
			...params,
			pageSize: 100,
		};
		// if (params.device_id != '') {
		//   parameter.filters.device_id = params.device_id;
		// }
		// if (params.country_id != '') {
		//   parameter.filters.country_id = params.country_id;
		// }
		// if (params.age != '') {
		//   parameter.filters.age = params.age;
		// }

		// if (params.analytics != '') {
		//   parameter.filters.analytics = params.analytics;
		// }
		// if (params.name != '') {
		//   parameter.filters.name = params.name;
		// }
		// if (params.gender != '') {
		//   parameter.filters.gender = params.gender;
		// }

		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/kamera_log`,
			params: parameter,
		});
		// console.log(response.data);

		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// export async function apiVisitorRealtimeLogList(
//   params: VisitorRealtimeLogParams
// ) {
//   try {
//     // Create the parameter object with default values
//     const parameter = {
//       pageSize: 100,
//       filters: {} as Record<string, any>,
//     };

//     // Check each parameter and add it to the filters if not empty
//     if (params.device_id !== "") {
//       parameter.filters.device_id = params.device_id;
//     }
//     if (params.country_id !== "") {
//       parameter.filters.country_id = params.country_id;
//     }
//     if (params.age !== "") {
//       parameter.filters.age = params.age;
//     }
//     if (params.analytics !== "") {
//       parameter.filters.analytics = params.analytics;
//     }
//     if (params.name !== "") {
//       parameter.filters.name = params.name;
//     }
//     if (params.gender !== "") {
//       parameter.filters.gender = params.gender;
//     }

//     console.log("Parameter:", parameter);

//     // Make the API request
//     const response = await axios.post(
//       `${webserviceurl}visitor_log/readRealtime.php`,
//       parameter // Automatically converted to JSON
//     );

//     console.log("Response:", response.data);

//     return response.data.data.records;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// }

export async function apiVisitorWNAList(params: any) {
	try {
		let parameter = {
			pageSize: params.pageSize,
			pageIndex: params.pageIndex,
			filters: {
				must: params.name
					? [
							{
								match: {
									name: params.name,
								},
							},
					  ]
					: [],
				must_not: [
					{
						match_all: {
							country_id: "100",
						},
					},
				],
			},
		};

		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/read.php",
			data: parameter,
		});

		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiWatchlistHistory(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor_log/readOne.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiVisitorList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/read.php",
			data: params,
		});
		console.log(response.data.data.records);
		return response.data.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUserList(token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/users`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response, "response");
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiSearchDpoByName(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/searchDpoByName.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiSearchVisitorByName(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/searchVisitorByName.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAllCameraOnlineList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "device/read_online.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiAllCameraOfflineList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "device/read_offline.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiAllCameraDamageList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "device/read_damage.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiLocationDeviceStatusTotalSummary() {
	try {
		const response = await axios({
			method: "post",
			url:
				webserviceurl + "location/locationDeviceStatusTotalSummary.php",
			data: {},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiLocationDeviceStatusTotalSummaryByLocation(
	params: any
) {
	try {
		const response = await axios({
			method: "post",
			url:
				webserviceurl +
				"location/locationDeviceStatusTotalSummaryByLocation.php",
			data: params,
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

interface VisitorLogListParams {
	pageSize: number;
	pageIndex: number;
	from: string;
	to: string;
	device_id: string;
	country_id: string;
	age: string;
	analytics: string;
	name: string;
	gender: string;
}

export async function apiVisitorLogList(params: VisitorLogListParams) {
	try {
		const parameter = {
			pageSize: params.pageSize,
			pageIndex: params.pageIndex,
			filters: {} as Record<string, string>,
		};

		if (params.from !== "") {
			parameter.filters.from = params.from;
		}
		if (params.to !== "") {
			parameter.filters.to = params.to;
		}
		if (params.device_id !== "") {
			parameter.filters.device_id = params.device_id;
		}
		if (params.country_id !== "") {
			parameter.filters.country_id = params.country_id;
		}
		if (params.age !== "") {
			parameter.filters.age = params.age;
		}
		if (params.analytics !== "") {
			parameter.filters.analytics = params.analytics;
		}
		if (params.name !== "") {
			parameter.filters.name = params.name;
		}
		if (params.gender !== "") {
			parameter.filters.gender = params.gender;
		}

		console.log("Parameter:", parameter);

		const response = await axios.post(
			`${webserviceurl}visitor_log/readAll.php`,
			JSON.stringify(parameter) // Automatically converted to JSON
		);

		console.log("Response:", response.data);

		return response.data.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

export async function apiDeviceList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "device/read.php",
			data: params,
		});
		console.log(response.data.data.records);
		return response.data.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiBraceletList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: "https://dev.transforme.co.id/gema_admin_api/device/read_bracelet.php",
			data: params,
		});
		console.log(response.data.data.records);
		return response.data.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiLocationDeviceList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "location/read.php",
			data: params,
		});
		console.log(response.data.data.records);
		return response.data.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiLocationOnlineDeviceList(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "location/readOnline.php",
			data: params,
		});
		console.log(response.data.data.records);
		return response.data.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeviceDetail(id: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "device/read_one.php",
			data: {
				deviceId: id,
			},
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeviceDelete(params: any) {
	try {
		const response = await axios({
			method: "post",
			url: webserviceurl + "device/delete.php",
			data: params,
		});

		// You can access the status code like this:
		return response.status;
	} catch (error) {
		throw error;
	}
}

// export function apiDeleteVisitor(params:any) {
//   try {
//     const response = axios({
//       method: "post",
//       url: webserviceurl + "visitor/delete.php",
//       data: params,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }
export function apiDeleteUser(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "user/delete.php",
			data: params,
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiDeviceInsert(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "device/create.php",
			data: params,
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export function apiUserInsert(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "user/create.php",
			data: params,
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiUserUpdate(params: any) {
	try {
		console.log(params);
		const response = axios({
			method: "post",
			url: webserviceurl + "user/update.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export function apiVisitorUpdateWithImage(params: any) {
	try {
		console.log(params);
		const response = axios({
			method: "post",
			url: webserviceurl + "visitor/updateWithImage.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiVisitorUpdate(params: any) {
	try {
		console.log(params);
		const response = axios({
			method: "post",
			url: webserviceurl + "visitor/update.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function apiDeleteVisitor(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/delete.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		// console.log(response.data);
		if (response.data.status == 200) {
			// const cleanedBase64String = removeBase64Prefix(response.data.data.image);
			let paramsChina = {
				groupID: "1", // face database group ID
				dbID: "testcideng", // ID of face database
				// imageID: response.data.data.visitorId, // ID of face image
				// imageData: cleanedBase64String,
				imageIDs: [params.visitorId], // ID of face image
			};
			console.log(paramsChina, "paramsChina");
			let responseChina = axios({
				method: "delete",
				url: "https://faceengine.deepcam.cn/pipeline/api/face/delete",
				data: JSON.stringify(paramsChina),
				// headers: {
				//   "Content-Type": "application/json",
				// },
			});
			console.log(responseChina);
			return responseChina;
		}
	} catch (error) {
		throw error;
	}
}
export async function apiEditToRemoveWatchlist(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/editRemoveWatchlist.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});

		return response.data;
	} catch (error) {
		throw error;
	}
}
export async function apiEditToAddWatchlist(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/editAddWatchlist.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});

		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function apiEmployeeInsert(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/createEmployee.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		console.log(response.data);
		if (response.data.status == 200) {
			const cleanedBase64String = removeBase64Prefix(
				response.data.data.image
			);
			let paramsChina = {
				groupID: "1", // face database group ID
				dbID: "testcideng", // ID of face database
				imageID: response.data.data.visitorId, // ID of face image
				imageData: cleanedBase64String,
			};
			let responseChina = axios({
				method: "post",
				url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
				data: JSON.stringify(paramsChina),
				// headers: {
				//   "Content-Type": "application/json",
				// },
			});
			console.log(responseChina);
			return responseChina;
		}
	} catch (error) {
		throw error;
	}
}
export async function apiWatchlistInsert(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/createWatchlist.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		console.log(response.data);
		if (response.data.status == 200) {
			const cleanedBase64String = removeBase64Prefix(
				response.data.data.image
			);
			let paramsChina = {
				groupID: "1", // face database group ID
				dbID: "testcideng", // ID of face database
				imageID: response.data.data.visitorId, // ID of face image
				imageData: cleanedBase64String,
			};
			let responseChina = axios({
				method: "post",
				url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
				data: JSON.stringify(paramsChina),
				// headers: {
				//   "Content-Type": "application/json",
				// },
			});
			console.log(responseChina);
			return responseChina;
		}
	} catch (error) {
		throw error;
	}
}
export async function apiInmateInsert(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/createInmate.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		console.log(response.data);
		if (response.data.status == 200) {
			const cleanedBase64String = removeBase64Prefix(
				response.data.data.image
			);
			let paramsChina = {
				groupID: "1", // face database group ID
				dbID: "testcideng", // ID of face database
				imageID: response.data.data.visitorId, // ID of face image
				imageData: cleanedBase64String,
			};
			let responseChina = axios({
				method: "post",
				url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
				data: JSON.stringify(paramsChina),
				// headers: {
				//   "Content-Type": "application/json",
				// },
			});
			console.log(responseChina);
			return responseChina;
		}
	} catch (error) {
		throw error;
	}
}

export async function apiVisitorInsert(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/create.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		// console.log(response.data);
		if (response.data.status == 200) {
			const cleanedBase64String = removeBase64Prefix(
				response.data.data.image
			);
			let paramsChina = {
				groupID: "1", // face database group ID
				dbID: "testcideng", // ID of face database
				imageID: response.data.data.visitorId, // ID of face image
				imageData: cleanedBase64String,
			};
			let responseChina = axios({
				method: "post",
				url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
				data: JSON.stringify(paramsChina),
				// headers: {
				//   "Content-Type": "application/json",
				// },
			});
			console.log(responseChina);
			return responseChina;
		}
	} catch (error) {
		throw error;
	}
}

export async function apiDpoInsert(params: any) {
	try {
		console.log(params);
		const response = await axios({
			method: "post",
			url: webserviceurl + "visitor/createDpo.php",
			data: JSON.stringify(params),
			// headers: {
			//   "Content-Type": "application/json",
			// },
		});
		// console.log(response.data);
		if (response.data.status == 200) {
			const cleanedBase64String = removeBase64Prefix(
				response.data.data.image
			);
			let paramsChina = {
				groupID: "1", // face database group ID
				dbID: "testcideng", // ID of face database
				imageID: response.data.data.visitorId, // ID of face image
				imageData: cleanedBase64String,
			};
			let responseChina = axios({
				method: "post",
				url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
				data: JSON.stringify(paramsChina),
				// headers: {
				//   "Content-Type": "application/json",
				// },
			});
			console.log(responseChina);
			return responseChina;
		}
	} catch (error) {
		throw error;
	}
}

export async function apiVisitorSearch(params: any) {
	try {
		let image = removeBase64Prefix(params);
		// console.log(params);
		let body = {
			groupID: "1",
			dbIDs: ["1", "2", "22", "101", "testcideng"],
		};

		const response = await axios.post(
			"https://faceengine.deepcam.cn/pipeline/api/face/match",
			{
				...body,
				imageData: image,
			}
		);

		console.log(response.data.code);

		if (response.data.code === 1000) {
			const visitorResponse = await axios.post(
				webserviceurl + "visitor/readOne.php",
				{
					visitorId: response.data.data.imageID,
				}
			);

			console.log(visitorResponse.data.data.records);
			return visitorResponse.data.data.records;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export function apiDeviceUpdate(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "device/update.php",
			data: params,
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiPageLocation(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "location/location_list.php",
			data: params,
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiLocationDelete(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "location/delete.php",
			data: params,
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiLocationUpdate(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "location/update.php",
			data: params,
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiLocationList() {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "location/location_list.php",
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiCountryList() {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "country/read.php",
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiCameraList(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "dm/read.php",
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiAdminLogin(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "user/login.php",
			data: params,
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export function faceCompareChina(params: any) {
	return new Promise((resolve, reject) => {
		// Add a flag to check if the function has been executed
		let isExecuted = false;

		let body = {
			groupID: "1",
			dbIDs: ["1", "2", "22", "101", "testcideng"],
		};

		axios
			.post("https://faceengine.deepcam.cn/pipeline/api/face/match", {
				...body,
				...params,
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.data && !isExecuted) {
					isExecuted = true; // Set the flag to true to prevent further executions

					let paramApiLocal = {
						name: response.data.data.imageID,
						image: "data:image/jpeg;base64," + params.imageData,
					};

					axios
						.post(
							webserviceurl + "visitor_log/insert.php",
							paramApiLocal
						)
						.then((result) => {
							console.log("result", result);
							resolve(response); // Resolve the outer promise
						})
						.catch((error) => {
							reject(error);
						});
				} else {
					resolve(response); // Resolve the outer promise
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export function apiIndoorMap() {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "siram_api/indoor_map_api.php",
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiIndoorMapV2() {
	try {
		const response = axios({
			method: "get",
			url: "http://127.0.0.1:8000/api/indoor_map?lokasi_otmil_id=890cc9b1-b01f-4d1f-9075-a6a96e851b25",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer 4|6xeb8BLbbBlzLl7oZyfkZme4Gj3q3PrsRLiCR3Dmcd316fae",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export function apiIndoorMapV3() {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "siram_api/indoor_map_api_v3.php",
			data: {
				lokasi_otmil_id: "1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot",
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}
export function apiPeopleDummy(params: any) {
	try {
		const response = axios({
			method: "post",
			url: webserviceurl + "siram_api/people_dummy_api.php",
			data: JSON.stringify(params),
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function apiTipeAsetRead(params: any, token: any) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "tipe_aset",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiTipeAsetInsert(params: any, token: any) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "tipe_aset",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiTipeAsetUpdate(params: any, token: any) {
	try {
		const response = await axios({
			method: "put",
			url: newWebservice + "tipe_aset",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiTipeAsetDelete(params: any, token: any) {
	try {
		const response = await axios({
			method: "delete",
			url: newWebservice + "tipe_aset",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAsetRead(params: any, token: any) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "aset",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAsetInsert(params: any, token: any) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "aset",
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAsetUpdate(params: any, token: any) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/aset?_method=PUT`,
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAsetDelete(params: any, token: any) {
	try {
		const response = await axios({
			method: "delete",
			url: newWebservice + "aset",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllRuanganOtmil(params: any, token: any) {
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "ruangan_otmil",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadOneKamera(params: any) {
	try {
		const response = await axios({
			method: "POST",
			url: newwebserviceurl + "siram_api/kamera_read_one.php",
			data: params,
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

/* ---------WORKSTATION API--------- */

export async function apiversion(p0: {
	method: string;
	headers: { "Content-Type": string };
}) {
	try {
		const response = await axios({
			method: "get",
			url: "https://dev-siram-workstation.transforme.co.id/api/version",
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadKasus(params, token) {
	// const queryString = getUrl(params);
	// const url =
	//   "https://dev-siram-workstation.transforme.co.id/api/" +
	//   `kasus?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/kasus`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadPenyidikan(params, token) {
	// const queryString = getUrl(params);
	// const url =
	//   "https://dev-siram-workstation.transforme.co.id/api/" +
	//   `penyidikan?${queryString}`;
	// console.log("urlPenyidikan", queryString);
	try {
		const response = await axios({
			method: "get",
			// url: url,
			url: newwebserviceurl + "penyidikan",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadBAP(params: any, token: any) {
	try {
		const response = await axios({
			method: "GET",
			// url: "https://dev-siram-workstation.transforme.co.id/api/dokumen_bap",
			url: `${newBaseUrl}/dokumen_bap`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadJaksaPenyidik(params, token) {
	const queryString = getUrl(params);
	const url = newWebservice + `oditur_penyidik?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			url: url,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadSaksi(params, token) {
	// const queryString = getUrl(params);
	// const url = newWebservice + `saksi?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/saksi`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadStatusWBP(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "status_wbp_kasus",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadjenisperkara(params, token) {
	// const queryString = getUrl(params);
	// const url = newWebservice + `jenis_perkara?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "jenis_perkara",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("first", response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiJenisPidanaRead(params, token) {
	const queryString = getUrl(params);
	const url = newWebservice + `jenis_pidana?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			url: url,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateDaftarKasus(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + `kasus`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateBarangBukti(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/barang_bukti_kasus`,
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllJenisPerkara(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/jenis_perkara`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAhliRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/ahli`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiHakimRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "hakim",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiJaksaRead(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "siram_api/jaksa_read.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiJenisSidangRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/jenis_persidangan`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiKasusRead(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/kasus`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiPengadilanMiliterRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "pengadilan_militer",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllRole(token) {
	try {
		const response = await axios({
			method: "get",
			// url: newWebservice + "siram_api/user_role_read.php",
			url: newWebservice + "user_role",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllStaff(params, token) {
	console.log("testingStaff");
	const object = {
		page: params.page ? params.page : 1,
		pageSize: params.pageSize ? params.pageSize : Infinity,
		...params.filter,
	};
	console.log("objectStaff:", object);
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "petugas",
			// url: newWebservice + 'petugas',
			params: object,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllUser(params, token) {
	const queryString = getUrl2(params);
	const url = `${newBaseUrl}/users?${queryString}`;
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "siram_api/user_read.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllWBP(params, token) {
	try {
		const dataParam = {
			page: params.page ? params.page : 1,
			pageSize: params.pageSize ? params.pageSize : Infinity,
			nama: params.nama ? params.nama : "",
		};
		const response = await axios({
			method: "get",
			url: newWebservice + "wbp_profile",
			// params: dataParam,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadJaksapenuntut(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "oditur_penuntut",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiSidangInsert(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "sidang",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiCreateBAP(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/dokumen_bap`,
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAgama(token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "agama",
			// data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateWBP(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/wbp_profile`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiGelang(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/dashboard_gelang`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiKeahlian(token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "bidang_keahlian",
			data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiKesatuan(token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "kesatuan",
			data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiKota(token) {
	console.log("kotaJakarta2", token);
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "kota?pageSize=1000",
			// data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiMatraRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + `matra?pageSize=99999`,
			// data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiPendidikan(token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "pendidikan",
			data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiProvinsi(token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "provinsi?pageSize=1000",
			// data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllHunian(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/hunian_wbp_otmil`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllKategoriJahat(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/kategori_perkara`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllPangkat(params, token) {
	// console.log(params, token, '6666 ');
	try {
		const response = await axios({
			method: "get",
			// url: url,
			url: newWebservice + "pangkat",
			// data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiStatusKawin(token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "status_kawin",
			data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiStatusWbp(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/status_wbp_kasus`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreatePenyidikan(params, token) {
	console.log("params", params);
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "penyidikan",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeletePenyidikan(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newwebserviceurl + "penyidikan",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiUpdatePenyidikan(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: newwebserviceurl + "penyidikan",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateBAP(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/dokumen_bap?_method=PUT`,
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteBAP(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/dokumen_bap`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiSidangDelete(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newWebservice + "sidang",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiSidangRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "sidang",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiSidangUpdate(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/sidang?_method=PUT`,
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiReadDaftarKasus(params, token) {
	const queryString = getUrl(params);
	const url = newWebservice + `kasus?${queryString}`;
	console.log("urlKasus", url);

	try {
		console.log("paramsRead", params);
		const response = await axios({
			method: "get",
			// url: newWebservice + 'kasus',
			// params: dataParam,
			url: url,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiUpdateDaftarKasus(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: newwebserviceurl + "kasus",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiDeleteDaftarKasus(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newwebserviceurl + "kasus?kasus_id=" + params.kasus_id,
			// data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiReadAktifitasPengunjung(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/aktivitas_pengunjung`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiDeleteAktifitasPengunjung(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/aktivitas_pengunjung`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiCreateAktifitasPengunjung(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "aktivitas_pengunjung",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiUpdateAktifitasPengunjung(params, token) {
	try {
		const response = await axios({
			method: "PUT",
			url: `${newBaseUrl}/aktivitas_pengunjung`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiReadAlllokasiOtmil(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/lokasi_otmil`,
			params: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		// console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiReadVisitor(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/pengunjung`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadZona(token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/zona`,
			data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiBuilding(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/kamera_read_by_location`,
			params: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response, "response");
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllScheduleShift(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/schedule`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllShift(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/shift`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllPetugasShift(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/petugas_shift`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiReadAllPenugasanShift(params: any, token: any) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/penugasan`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiReadAllGrupPetugas(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/grup_petugas
      `,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("data", response);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateScheduleShift(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/schedule`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCretePetugasShift(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/petugas_shift`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeletePetugasShift(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/petugas_shift`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteScheduleShift(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/schedule`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiEditPetugasShift(params, token) {
	try {
		const response = await axios({
			method: "PUT",
			url: `${newBaseUrl}/petugas_shift`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("edyt", response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllRekapJamKerja(params: any, token: any) {
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "rekap_jam_kerja_lembur",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllRekapCuti(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "rekap_cuti",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateAllStaff(params, token) {
	console.log("params:", params, "token:", token);
	try {
		const response = await axios({
			method: "put",
			url: newWebservice + "petugas",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreatGrupPetugas(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/grup_petugas
      `,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteGrupPetugas(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/grup_petugas
      `,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateGrupPetugas(params, token) {
	try {
		const response = await axios({
			method: "PUT",
			url: `${newBaseUrl}/grup_petugas
      `,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateShift(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/shift`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteShift(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/shift`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiEditShift(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/shift`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("shift", response);
		return response;
	} catch (error) {
		console.log("shift", params, "777", params.token);
		console.log(error);
		throw error;
	}
}

export async function apiCreatePenugasanShift(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/penugasan
      `,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeletePenugasanShift(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/penugasan
      `,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiEditPenugasanShift(params, token) {
	try {
		const response = await axios({
			method: "PUT",
			url: `${newBaseUrl}/penugasan
      `,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateJenisJahat(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "jenis_perkara",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteJenisJahat(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newwebserviceurl + "jenis_perkara  ",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateJenisJahat(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: newwebserviceurl + "jenis_perkara",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateWBP(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: newWebservice + "wbp_profile",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteAllWBP(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newWebservice + "wbp_profile",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateAllStaff(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "petugas",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("dtaa", response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteAllStaff(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newWebservice + "petugas",
			data: params.target_petugas_id,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateVisitor(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/pengunjung`,
			// url: "http://127.0.0.1:8000/api/pengunjung",
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateVisitor(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/pengunjung?_method=PUT`,
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeletePengunjung(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/pengunjung`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateKategoriPerkara(params, token) {
	try {
		const response = await axios({
			method: "post",
			// url: `newwebserviceurl + 'siram_api/kategori_perkara_insert.php'`,
			url: newWebservice + `kategori_perkara`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteKategoriPerkara(params, token) {
	try {
		const response = await axios({
			method: "delete",
			// url: newwebserviceurl + 'siram_api/kategori_perkara_delete.php',
			url:
				newwebserviceurl +
				`kategori_perkara?kategori_perkara_id=` +
				params.kategori_perkara_id,
			// data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadKategoriPerkara(params, token) {
	const queryString = getUrl(params);
	const url = newWebservice + `kategori_perkara?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			// url: newwebserviceurl + 'siram_api/kategori_perkara_read.php',
			// data: params,
			url: url,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateKategoriPerkara(params, token) {
	try {
		const response = await axios({
			method: "put",
			// url: newwebserviceurl + 'siram_api/kategori_perkara_update.php',
			url: newwebserviceurl + `kategori_perkara`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateAllRuanganOtmil(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/ruangan_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("add js", response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteAllRuangan(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/ruangan_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateAllRuanganOtmil(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/ruangan_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response, "fata");
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateOditurPenyidik(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/oditur_penyidik`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateOditurPenyidik(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/oditur_penyidik`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteOditurPenyidik(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/oditur_penyidik`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
// api Oditur penyidik end

// api Oditur penuntut start
export async function apiReadOditurPenuntut(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/oditur_penuntut`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateOditurPenuntut(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/oditur_penuntut`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateOditurPenuntut(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/oditur_penuntut`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteOditurPenuntut(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/oditur_penuntut`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadOditurPenyidik(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/oditur_penyidik`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateSaksi(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/saksi`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateSaksi(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/saksi`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteSaksi(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/saksi`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAhliInsert(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/ahli`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAhliUpdate(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/ahli`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiAhliDelete(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/ahli`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiJenisPidanaRead(params, token) {
	const queryString = getUrl(params);
	const url = newWebservice + `jenis_pidana?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			url: url,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiJenisSidangInsert(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/jenis_persidangan`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiJenisSidangDelete(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/jenis_persidangan`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiJenisSidangUpdate(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/jenis_persidangan`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateBarangBukti(params, token) {
	try {
		const response = await axios({
			method: "POST",
			url: `${newBaseUrl}/barang_bukti_kasus?_method=PUT`,
			data: params,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteBarangBukti(params, token) {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${newBaseUrl}/barang_bukti_kasus`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadBarangBukti(params, token) {
	try {
		const response = await axios({
			method: "GET",
			url: `${newBaseUrl}/barang_bukti_kasus`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadKota(params, token) {
	console.log("kotaJakarta1", token);
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/kota`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadProvinsi(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/provinsi`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadPengadilanMiliter(params, token) {
	const queryString = getUrl(params);
	const url = newWebservice + `pengadilan_militer?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			// url: newwebserviceurl + 'siram_api/pengadilan_militer_read.php',
			// data: params,
			url: url,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreatePengadilanMiliter(params, token) {
	try {
		const response = await axios({
			method: "post",
			// url: newwebserviceurl + 'siram_api/pengadilan_militer_insert.php',
			url: newWebservice + `pengadilan_militer`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdatePengadilanMiliter(params, token) {
	try {
		const response = await axios({
			method: "put",
			// url: newwebserviceurl + 'siram_api/pengadilan_militer_update.php',
			url: newWebservice + `pengadilan_militer`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeletePengadilanMiliter(params, token) {
	try {
		const response = await axios({
			method: "delete",
			// url: newwebserviceurl + 'siram_api/pengadilan_militer_delete.php',
			url:
				newwebserviceurl +
				`pengadilan_militer?pengadilan_militer_id=` +
				params.pengadilan_militer_id,
			// data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function allKameraOtmil() {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "siram_api/kamera_read_all_otmil.php",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function allKameraOtmilByLocation(token) {
	const otmil = {
		lokasi_otmil_id: "1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot",
	};
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "siram_api/kamera_read_by_location.php",
			data: otmil,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiGedungOtmilRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			// url: `${newBaseUrl}/gedung_otmil`,
			url: "http://127.0.0.1:8000/api/gedung_otmil",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiInsertGedungOtmil(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/gedung_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function apiUpdateGedungOtmil(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/gedung_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function apiDeleteGedungOtmil(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/gedung_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export async function apiLantaiOtmilRead(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/lantai_otmil`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiInsertLantaiOtmil(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/lantai_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateLantaiOtmil(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/lantai_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteLantaiOtmil(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/lantai_otmil`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadKameraTersimpan(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/kamera_tersimpan`,
			params: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiCreateKameraTersimpan(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/kamera_tersimpan`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiUpdateKameraTersimpan(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/kamera_tersimpan`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiDeleteKameraTersimpan(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/kamera_tersimpan`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllEvent(params, token) {
	// const queryString = getUrl(params);
	// const url = newWebservice + `kegiatan?${queryString}`;
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "kegiatan",
			params,
			// url: url,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiUpdateAllEvent(params, token) {
	try {
		const response = await axios({
			method: "put",
			// url: newwebserviceurl + 'siram_api/kegiatan_update.php',
			url: newWebservice + `kegiatan`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiDeleteAllEvent(params, token) {
	try {
		const response = await axios({
			method: "delete",
			// url: newWebservice + 'siram_api/kegiatan_delete.php',
			// data: params,
			url:
				newwebserviceurl + `kegiatan?kegiatan_id=` + params.kegiatan_id,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiCreateAllEvent(params, token) {
	try {
		const response = await axios({
			method: "post",
			// url: newwebserviceurl + 'siram_api/kegiatan_insert.php',
			url: newWebservice + `kegiatan`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiChangePassword(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "siram_api/user_password_update.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateUser(params, token) {
	try {
		const response = await axios({
			method: "post",
			// url: newWebservice + "siram_api/user_insert.php",
			url: newWebservice + "users",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiEditUser(params, token) {
	try {
		const response = await axios({
			method: "put",
			// url: newWebservice + "siram_api/user_update.php",
			url: newWebservice + "users",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiNewDeleteUser(params, token) {
	try {
		const response = await axios({
			method: "delete",
			// url: newWebservice + "siram_api/user_delete.php",
			url: newWebservice + "users",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiPelacakanTersangka(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "siram_api/filter_tersangka.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateKamera(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: `${newBaseUrl}/kamera`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadKamera(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/kamera`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteKamera(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: `${newBaseUrl}/kamera`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateKamera(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: `${newBaseUrl}/kamera`,
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadGelang(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "gelang",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteGelang(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newwebserviceurl + "gelang",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateGelang(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: newwebserviceurl + "gelang",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateGelang(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "gelang",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadGateway(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: newwebserviceurl + "dashboard_gateway",
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteGateway(params, token) {
	try {
		const response = await axios({
			method: "delete",
			url: newwebserviceurl + "gateway",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateGateway(params, token) {
	try {
		const response = await axios({
			method: "put",
			url: newwebserviceurl + "gateway",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateGateway(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "gateway",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(params);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function apiRealtimeLog(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newWebservice + "siram_api/kamera_log_read.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiGatewayLog(params, token) {
	try {
		const response = await axios({
			method: "get",
			// url: newWebservice + "siram_api/gateway_log_read.php",
			url: newWebservice + "gateway_log",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadHakim(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "siram_api/hakim_read.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiCreateHakim(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "siram_api/hakim_insert.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiUpdateHakim(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "siram_api/hakim_update.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiDeleteHakim(params, token) {
	try {
		const response = await axios({
			method: "post",
			url: newwebserviceurl + "siram_api/hakim_delete.php",
			data: params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllLokasi(token) {
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "lokasi_kesatuan",
			// data: {},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data.records);
		return response.data.records;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAllStaffDashboard(params, token) {
	console.log("testingStaff");
	try {
		const response = await axios({
			method: "get",
			url: newWebservice + "petugas",
			// url: newWebservice + 'petugas',
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadGatewayDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_gateway_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadCameraDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_camera_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadRoutesDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_routes_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadAccessDoorDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_access_door_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadFaceRecDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_face_rec_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadDesktopDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_desktop_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadTVDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_tv_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadSelfDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_self_rec_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadNVRDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_nvr_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function apiReadNASDashboard(params, token) {
	try {
		const response = await axios({
			method: "get",
			url: `${newBaseUrl}/dahsboard_nas_dummy`,
			params,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export function apiIndoorMapVVIP() {
	try {
		const response = axios({
			method: "get",
			url: "http://localhost:8000/api/indoor_mapV3?lokasi_otmil_id=890cc9b1-b01f-4d1f-9075-a6a96e851b25",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer 4|6xeb8BLbbBlzLl7oZyfkZme4Gj3q3PrsRLiCR3Dmcd316fae",
			},
		});
		console.log("inidariapi", response);
		return response;
	} catch (error) {
		throw error;
	}
}
