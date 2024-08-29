import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PenggunaanTPPChart = ({ data }) => {
	const value = Object.entries(data)?.map(([key, value]) => value);
	const label = Object.entries(data)?.map(([key, value]) => key);

	const [chartData, setChartData] = useState({
		series: [
			{
				name: "Total",
				data: value,
			},
		],
		options: {
			chart: {
				type: "bar",
				height: 200,
			},

			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "90%",
					endingShape: "rounded",
				},
			},
			dataLabels: {
				enabled: false,
			},
			fill: {
				opacity: 1,
			},
			colors: ["#38b6ff", "#ff66c4", "#353c6f"],
			stroke: {
				show: true,
				width: 2,
				colors: ["transparent"],
			},
			legend: {
				show: true,
				position: "top",
				horizontalAlign: "center",
				floating: true,
				fontSize: "14px",
				fontFamily: "Helvetica, Arial",
				fontWeight: 400,
				customLegendItems: [],
				offsetX: 0,
				offsetY: 20,
				labels: {
					colors: "#000000",
					useSeriesColors: false,
				},
				markers: {
					width: 12,
					height: 12,
					radius: 2,
					offsetX: 0,
					offsetY: 0,
				},
				itemMargin: {
					horizontal: 5,
					vertical: 0,
				},
				onItemClick: {
					toggleDataSeries: false,
				},
				onItemHover: {
					highlightDataSeries: true,
				},
			},
			grid: {
				show: true,
				borderColor: "#90A4AE",
				strokeDashArray: 0,
				position: "back",
				xaxis: {
					lines: {
						show: false,
					},
				},
				yaxis: {
					lines: {
						show: true,
						colors: "#343544",
					},
				},

				padding: {
					top: 20,
					right: 20,
					bottom: 0,
					left: 0,
				},
			},

			xaxis: {
				type: "category",
				categories: label,
				position: "bottom",
				labels: {
					show: true,
					style: {
						colors: "#000000",
						fontSize: "10px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: 400,
						cssClass: "apexcharts-xaxis-label",
					},
				},
				axisTicks: {
					show: true,
					borderType: "solid",
					color: "#78909C",
					height: 6,
					offsetX: 0,
					offsetY: 0,
				},
			},
			yaxis: {
				show: true,
				labels: {
					show: true,
					align: "right",
					minWidth: 0,
					maxWidth: 160,
					style: {
						colors: "#000000",
					},
					offsetX: -10,
					offsetY: 0,
					rotate: 0,
				},
			},
			responsive: [
				{
					breakpoint: 1290,
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
			tooltip: {
				shared: true,
				intersect: false,
			},
		},
	});

	return (
		<div className="w-full ">
			<ReactApexChart
				options={chartData.options}
				series={chartData.series}
				type="bar"
				height={200}
			/>
		</div>
	);
};

export default PenggunaanTPPChart;
