import DataCamera from "./DataCamera";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function CameraDetail() {
	const { id } = useParams();
	const location = useLocation();

	let params = {
		// from: `${startDate} 00:00`,
		// to: `${endDate} 23:59`,
		device_id: id,
	};
	function getTodayDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const day = String(today.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}
	// useEffect(() => {
	//   console.log(id, "id");
	//   apiDeviceDetail(id).then((res) => {
	//     console.log(res, 'data device detail');
	//     setDeviceDetail(res);
	//   });
	//   apiVisitorRealtimeLogList(params).then((res) => {
	//     console.log(res, "data dataVisitorLog");
	//     setDataVisitorLog(res);
	//   });
	// }, [id]);
	return (
		<>
			<DataCamera id={location?.state} />
		</>
	);
}
