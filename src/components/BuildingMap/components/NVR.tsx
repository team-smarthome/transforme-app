import { useState } from "react";
import Modal, { ModalNVR } from "../../Modal";
import { BsInboxes } from "react-icons/bs";

interface NVRProps {
  item: any;
  size?: string;
  visible?: boolean;
  positionX?: string;
  positionY?: string;
}

function NVR({
  size = "base",
  item,
  visible = false,
  positionX,
  positionY,
}: NVRProps) {
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
          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-200 bg-map-gateway  bg-slate-100 hover:bg-white shadow-3 shadow-transparent-light"
        >
          <BsInboxes
            className={`${
              size === "base" ? "w-4 h-4" : size === "small" ? "w-3 h-3" : null
            } text-black`}
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
        <ModalNVR handleClose={handleClose} name={item.nama} />
      </Modal>
    </div>
  );
}

export default NVR;
