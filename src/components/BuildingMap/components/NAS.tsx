import { useState } from "react";
import Modal, { ModalNAS } from "../../Modal";
import { MdOutlineStorage } from "react-icons/md";

interface NASProps {
  item: any;
  size?: string;
  visible?: boolean;
  positionX?: string;
  positionY?: string;
}

function NAS({
  size = "base",
  item,
  visible = false,
  positionX,
  positionY,
}: NASProps) {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleHover = () => {
    setIsHover((prev) => !prev);
  };

  const getSize = () => {
    // let heightTemp = height
    // let widthTemp = width
    // console.log('height xxx', heightProps);
    // console.log('width xxx', widthProps);

    let style = `${positionX}  ${positionY} `;

    // ` h-[${heightTemp}] w-[${widthTemp}] `;

    console.log("style xxx", style);

    return style;
  };
  return (
    <div className={`absolute ${getSize()} z-[82] hover:animate-bounce`}>
      <div className={`flex-col items-center  ${visible ? "flex" : "hidden"}`}>
        <button
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onClick={handleClick}
          type="button"
          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-200 bg-map-gateway  bg-slate-900 hover:bg-slate-800 shadow-3 shadow-transparent-light"
        >
          <MdOutlineStorage
            className={`${
              size === "base" ? "w-4 h-4" : size === "small" ? "w-3 h-3" : null
            } text-white`}
          />
        </button>
        <div className={`absolute w-24 mt-6 ${isHover ? "block" : "hidden"}`}>
          <span
            className={`${
              size === "base" ? "text-xs" : size === "small" ? "text-xs" : null
            } text-black`}
          >
            {item.nama}
          </span>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <ModalNAS
          handleClose={handleClose}
          name={item.nama}
          ruangan={item.ruangan}
        />
      </Modal>
    </div>
  );
}

export default NAS;
