import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const KetersediaanTPPChart = ({ data }) => {
	const value = Object.entries(data)?.map(([key, value]) => value);
	const label = Object.entries(data)?.map(([key, value]) => key);

	const [chartData, setChartData] = useState({
		series: value,
		options: {
			chart: {
				type: "donut",
				// events: {
				// 	dataPointSelection: (event, data, config) => {
				// 		const item = deviceType.find(
				// 			(item) =>
				// 				item.name ===
				// 				config.w.config.labels[config.dataPointIndex]
				// 		);
				// 		handleOpenModal(item);
				// 	},
				// },
			},

			labels: label,
			legend: {
				show: false,
				fontSize: "10px",
				width: 0,
				height: 0,
				labels: {
					colors: "#000000",
				},
				offsetX: 2,
				offsetY: 20,
				position: "left",
				markers: {
					width: 15,
					height: 15,
					strokeWidth: 0,
					radius: 3,
					offsetX: 0,
					offsetY: 0,
				},
				itemMargin: {
					horizontal: 0,
					vertical: 4,
				},
			},
			stroke: {
				show: true,
				curve: "straight",
				lineCap: "butt",
				colors: undefined,
				width: 5,
			},
			responsive: [
				{
					breakpoint: 1100,
					options: {
						chart: {
							height: 200,
						},
						legend: {
							show: false,
						},
					},
				},
			],
		},
	});

	return (
		<div>
			<ReactApexChart
				options={chartData.options}
				series={chartData.series}
				type="donut"
				height={230}
			/>
		</div>
	);
};

export default KetersediaanTPPChart;
