import React, { useState } from "react";
import useGetAuthUser from "./useGetAuthUser";
import { useUnauthorizedHandler } from "../utils/handleUnauthorizedDashboardSmartwatch";
import { LaravelApiPengajarList } from "../services/PengajarApi/pengajarApi";
import { LaravelApiPesertaList } from "../services/PesertaApi/pesertaApi";

const pengajarData = () => {
	const [pengajarList, setPengajarList] = useState();
	const [pesertaList, setPesertaList] = useState();
	const authUser = useGetAuthUser();
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
				authUser?.token
			);
			setPengajarList(data?.records);
		} catch (error) {
			console.log(error);
			const { data } = error?.response;
			if (data.status === 401) {
				handleUnauthorized();
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
				authUser?.token
			);
			setPesertaList(data?.records);
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
