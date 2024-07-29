// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import useSetUserLogout from "../Hooks/useSetUserLogout";
// import { notificationError } from "../Components/notification/toastMessage";

// Custom hook untuk menangani status 401
export const useUnauthorizedHandler = () => {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();

	const handleUnauthorized = () => {
		console.log("handleUnauthorized");
		// useSetUserLogout(dispatch);
		// navigate("sign-in");
		// notificationError("Akun sedang login diperangkat lain");
	};

	return handleUnauthorized;
};
