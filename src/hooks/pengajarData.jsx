import React, { useEffect, useState } from "react";
import { useUnauthorizedHandler } from "../utils/handleUnauthorizedDashboardSmartwatch";
import { LaravelApiPengajarList } from "../services/PengajarApi/pengajarApi";
import { LaravelApiPesertaList } from "../services/PesertaApi/pesertaApi";
import { useAtom } from "jotai";
import { authLoginDashboardSmartwatch, pengajarDataAtom, pesertaDataAtom } from "../utils/atomDashboardSmartwatch";
const pengajarData = () => {
	let [authUserParam] = useAtom(authLoginDashboardSmartwatch);
	console.log(authUserParam, "Auth User Param");
	console.log(authUserParam.token, "Auth User Param");
	const [pengajarList, setPengajarList] = useState();
	const [pesertaList, setPesertaList] = useState();

	let [pengajarDataTemp, setPengajarDataTemp] = useAtom(pengajarDataAtom);
	let [pesertaDataTemp, setPesertaDataTemp] = useAtom(pesertaDataAtom);

	const handleUnauthorized = useUnauthorizedHandler();
	
	const handlePengajarData = async () => {
		let params = {
			search: "",
			page: 0,
			recordsPerpage: 1000,
		};
		try {
			const { data } = await LaravelApiPengajarList(
				params,
				authUserParam?.token
			);
			setPengajarList(data?.records);
			setPengajarDataTemp(data?.records);

		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				handleUnauthorized();
				// handlePengajarData();
			}
		}
	};

	const handlePesertaData = async () => {
		let params = {
			search: "",
			page: 0,
			recordsPerpage: 1000,
		};
		try {
			const { data } = await LaravelApiPesertaList(
				params,
				authUserParam?.token
			);
			setPesertaList(data?.records);
			setPesertaDataTemp(data?.records);
		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				handleUnauthorized();
			}
		}
	};

	return {
		handlePengajarData,
		handlePesertaData,
		pengajarList,
		pesertaList,
	};
};

export default pengajarData;
