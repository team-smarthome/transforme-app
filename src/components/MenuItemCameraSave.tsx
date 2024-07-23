import React, { useEffect, useRef } from "react";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { CgDetailsMore } from "react-icons/cg";
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
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute top-8 right-7 bg-slate-700 shadow-md rounded-md w-32 z-10"
    >
      <ul className="py-1">
        <li
          className="px-4 py-2 flex justify-around items-center hover:bg-gray-200 cursor-pointer text-white text-lg hover:bg-red-500"
          onClick={onDelete}
        >
          Hapus
          <HiOutlineTrash />
        </li>
        <div className="border-[0.5px] border-slate-200"></div>
        <li
          className="px-4 py-2 flex justify-around items-center hover:bg-gray-200 cursor-pointer text-white text-lg hover:bg-slate-400"
          onClick={onEdit}
        >
          Ubah
          <HiPencilAlt />
        </li>
        <div className="border-[0.5px] border-slate-200"></div>
        <li
          className="px-4 py-2 flex justify-around items-center hover:bg-gray-200 cursor-pointer text-white text-lg  hover:bg-slate-400"
          onClick={onDetail}
        >
          Detail
          <CgDetailsMore />
        </li>
      </ul>
    </div>
  );
};

export default MenuItemComponent;
