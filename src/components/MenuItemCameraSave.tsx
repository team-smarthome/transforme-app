import React, { useEffect, useRef, useState } from "react";

interface MenuItemComponentProps {
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
	onDetail: () => void;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
	onClose,
	onEdit,
	onDelete,
	onDetail,
}) => {
	const [isActive, setIsActive] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target as Node)
		) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleToggleChange = (e: React.MouseEvent) => {
		e.stopPropagation(); // Stop event propagation
		e.preventDefault();
		setIsActive((prev) => !prev);
		console.log("Toggle status:", !isActive ? "Aktif" : "Nonaktif");
	};

	const handleClick = (callback: () => void) => (e: React.MouseEvent) => {
		e.stopPropagation(); // Stop event propagation
		e.preventDefault(); // Prevent default link behavior if needed
		callback();
	};
	return (
		<div
			ref={menuRef}
			className="absolute top-4 right-10 bg-slate-700 shadow-md rounded-md w-32 z-10"
		>
			<div className="px-2 py-2 flex   bg-slate-600 rounded-t-md gap-2">
				<div
					className={`relative inline-flex items-center cursor-pointer`}
					onClick={handleToggleChange}
				>
					<span
						className={`block w-10 h-6 rounded-full ${
							isActive ? "bg-green-500" : "bg-slate-300"
						} transition-colors`}
					></span>
					<span
						className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transform transition-transform ${
							isActive ? "translate-x-4" : "translate-x-0"
						}`}
					></span>
				</div>
				<span className="text-white">
					{isActive ? "Aktif" : "Nonaktif"}
				</span>
			</div>
			<ul className="py-1">
				<li
					className="px-4 py-2 flex justify-around items-center hover:bg-gray-200 cursor-pointer text-white text-lg hover:bg-red-500"
					onClick={handleClick(onDelete)}
				>
					Hapus
				</li>
				<div className="border-[0.5px] border-slate-200"></div>
				<li
					className="px-4 py-2 flex justify-around items-center hover:bg-gray-200 cursor-pointer text-white text-lg hover:bg-slate-400"
					onClick={handleClick(onEdit)}
				>
					Ubah
				</li>
				<div className="border-[0.5px] border-slate-200"></div>
				<li
					className="px-4 py-2 flex justify-around items-center hover:bg-gray-200 cursor-pointer text-white text-lg hover:bg-slate-400"
					onClick={handleClick(onDetail)}
				>
					Detail
				</li>
			</ul>
		</div>
	);
};

export default MenuItemComponent;
