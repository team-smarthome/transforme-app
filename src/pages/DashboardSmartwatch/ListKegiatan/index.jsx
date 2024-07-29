import React, { useEffect, useRef, useState } from "react";
import  Loader  from "../../../common/Loader/index";
// import pesertaData from "../../../services/PesertaApi/pesertaApi";
// import { LaravelApiPesertaList } from "../../../Service/PesertaApi/pesertaApi";
// import useGetAuthUser from "../../../hooks/useGetAuthUser";

const ListKegiatan = ({ data, loading }) => {
	const containerRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

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
			if (!isHovered && data?.length > 0) {
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
		<div className=" h-full">
			{" "}
			<h1 className="text-white font-semibold text-md h-10">
				Daftar Kegiatan Pengetahuan & Keterampilan
			</h1>
			<div
				ref={containerRef}
				className=" h-[calc(100%-40px)] space-y-2 overflow-auto"
			>
				{loading ? (
					<div className=" flex justify-center h-full items-center">
						<Loader type="bars"></Loader>
					</div>
				) : data?.length <= 0 ? (
					<div className="text-white h-full flex justify-center items-center">
						{" "}
						No Data{" "}
					</div>
				) : (
					data?.map((item, index) => (
						<div
							key={index}
							className="border-wLineLightBlue border-2 h-[100px] flex px-4 items-center text-white "
						>
							<div className="w-full flex flex-wrap gap-1 justify-between items-center">
								<div className="flex gap-2 items-start">
									<label className="font-bold">
										{item?.namaKegiatan}
									</label>
									<span className="max-w-36 truncate"></span>
								</div>
								<div className="flex flex-col items-center">
									<span className="font-light text-xs">
										Jumlah
									</span>
									<span className="font-bold text-2xl">
										{item?.totalMengikuti}
									</span>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default ListKegiatan;
