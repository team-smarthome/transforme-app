import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ProfileImg from "../../../../assets/profil.webp";

const BestPeformance = () => {
	const containerRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	const dataTest = [
		{
			nama: "Muhammad Dany Shadiq",
			tahun: "2023",
			aspek_sikap: [
				{ aspek: "Mental", value: "7" },
				{ aspek: "Iman", value: "8" },
				{ aspek: "Nasionalisme", value: "9" },
				{ aspek: "Militansi", value: "7" },
				{ aspek: "Integritas", value: "10" },
			],
		},
		{
			nama: "Bagas Arya Pradipta",
			tahun: "2023",
			aspek_sikap: [
				{ aspek: "Mental", value: "8" },
				{ aspek: "Iman", value: "8" },
				{ aspek: "Nasionalisme", value: "9" },
				{ aspek: "Militansi", value: "6" },
				{ aspek: "Integritas", value: "8" },
			],
		},
		{
			nama: "Dandan Ismail",
			tahun: "2023",
			aspek_sikap: [
				{ aspek: "Mental", value: "9" },
				{ aspek: "Iman", value: "7" },
				{ aspek: "Nasionalisme", value: "9" },
				{ aspek: "Militansi", value: "8" },
				{ aspek: "Integritas", value: "8" },
			],
		},
		{
			nama: "Fikri Abdul",
			tahun: "2023",
			aspek_sikap: [
				{ aspek: "Mental", value: "7" },
				{ aspek: "Iman", value: "8" },
				{ aspek: "Nasionalisme", value: "9" },
				{ aspek: "Militansi", value: "7" },
				{ aspek: "Integritas", value: "10" },
			],
		},
		{
			nama: "Sultan Ambatukam",
			tahun: "2023",
			aspek_sikap: [
				{ aspek: "Mental", value: "8" },
				{ aspek: "Iman", value: "9" },
				{ aspek: "Nasionalisme", value: "10" },
				{ aspek: "Militansi", value: "10" },
				{ aspek: "Integritas", value: "8" },
			],
		},
	];

	useEffect(() => {
		const container = containerRef?.current;
		if (!container) return;
		let scrollInterval;
		let scrollTimeout;

		const scrollToBottom = () => {
			if (container) {
				container.scrollTop += 1; // Change this value to adjust scroll speed
			}
		};

		const scrollToTop = () => {
			if (container) {
				container.scrollTop -= 1; // Change this value to adjust scroll speed
			}
		};

		let isScrollingDown = true;

		const scrollHandler = () => {
			if (!isHovered) {
				const { scrollTop, clientHeight, scrollHeight } = container;

				if (isScrollingDown) {
					if (scrollTop + clientHeight >= scrollHeight) {
						isScrollingDown = false;
						scrollToTop();
					} else {
						scrollToBottom();
					}
				} else {
					if (scrollTop <= 0) {
						isScrollingDown = true;
						scrollToBottom();
					} else {
						scrollToTop();
					}
				}
			}
		};

		const handleScroll = () => {
			if (container.scrollTop === 0 && !isHovered) {
				setIsHovered(false);
			}
		};

		const handleMouseEnter = () => {
			setIsHovered(true);
		};

		const handleMouseLeave = () => {
			setIsHovered(false);
		};

		container?.addEventListener("scroll", handleScroll);
		container?.addEventListener("mouseenter", handleMouseEnter);
		container?.addEventListener("mouseleave", handleMouseLeave);

		const animateScroll = () => {
			if (!isHovered && dataTest.length > 0) {
				scrollHandler();
			}
			scrollTimeout = setTimeout(() => {
				scrollInterval = requestAnimationFrame(animateScroll);
			}, 30); // Increase this value to slow down the scroll speed
		};

		scrollInterval = requestAnimationFrame(animateScroll);

		return () => {
			container?.removeEventListener("scroll", handleScroll);
			container?.removeEventListener("mouseenter", handleMouseEnter);
			container?.removeEventListener("mouseleave", handleMouseLeave);
			clearTimeout(scrollTimeout);
			cancelAnimationFrame(scrollInterval);
		};
	}, [isHovered, containerRef.current]);

	return (
		<div className="h-full">
			<div className="h-10 flex flex-col justify-start">
				<h1 className="text-white font-semibold text-md ">
					Aspek Sikap dan Prilaku
				</h1>
			</div>

			<div
				ref={containerRef}
				className="h-[calc(100%-40px)] flex flex-wrap space-y-2 overflow-auto pt-[1px]"
			>
				{dataTest.map((item, index) => (
					<div
						key={index}
						className="w-full grid grid-rows-2 h-[140px] border-wLineLightBlue border-2 items-center p-2 gap-2"
					>
						<div className="flex gap-2 items-center">
							<img
								src={ProfileImg}
								className="h-16 w-16 rounded-full"
							></img>
							<div className="flex flex-col">
								<label className="text-white font-bold">
									{item.nama}
								</label>
								<label className="text-white text-xs font-light">
									{item.tahun}
								</label>
							</div>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-full">
							{item.aspek_sikap.map((obj) => (
								<div className="flex flex-col bg-blue-500 h-[60px]">
									<span className=" h-5 flex items-center justify-center text-white font-light">
										{obj.aspek}
									</span>
									<div className="h-[calc(100%-20px)]  flex items-center justify-center">
										<span className="font-bold text-3xl text-white">
											{obj.value}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BestPeformance;
