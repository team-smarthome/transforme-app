import { ApiLoginPin } from "../services/DashboardPinApi/dashboardApi";

const useAuthUserhook = async () => {
	const authUser = await JSON.parse(localStorage.getItem("authUserPin"));
	const roleSelected = await JSON.parse(localStorage.getItem("selectedRolePin"));

	if (!authUser || !roleSelected) {
		const { data } = await ApiLoginPin(
			{nip: "2024001", password: "123456"}
		);
			const authuser = data.records;
			if (data.status === 200) {
				await localStorage.setItem("authUserPin", JSON.stringify(authuser));
				await localStorage.setItem(
					"selectedRolePin",
					JSON.stringify({
						id: authuser?.data?.roles?.[0]?.id,
						label: authuser?.data?.roles?.[0]?.role,
					})
				);
			}
			return {
				authUser,
				roleSelected:{id: authuser?.data?.roles?.[0]?.id,
				label: authuser?.data?.roles?.[0]?.role
				},
			};
	}
	else{

		return {
			authUser,
			roleSelected,
		};
	}

};

export default useAuthUserhook;
