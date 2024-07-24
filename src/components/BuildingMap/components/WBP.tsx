import React, { useState } from "react";
import Modal, { ModalWBP } from "../../Modal";
import { BiUser } from "react-icons/bi";
import { BsSmartwatch } from "react-icons/bs";

interface WBPProps {
  item: any;
  size?: string;
  visible?: boolean;
  className?: string;
}

function WBP({
  size = "base",
  item,
  visible = false,
  className = "",
}: WBPProps) {
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

  const { xAxis, yAxis, nama } = item;

  return (
    <div
      key={item.wbp_profile_id}
      className={`${className} absolute z-[83] hover:animate-bounce`}
      style={{ top: `${yAxis}%`, left: `${xAxis}%` }}
    >
      <div
        className={`flex flex-col items-center ${visible ? "flex" : "hidden"}`}
      >
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 hover:bg-red-400 opacity-75 z-[82]"></span>
          <button
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onClick={handleClick}
            type="button"
            className="w-4 h-4 flex items-center justify-center rounded-full transition-colors duration-200 bg-map-gateway bg-red-600 hover:bg-red-400 shadow-3 shadow-transparent-light"
          >
            <BsSmartwatch
              className={`${
                size === "base" ? "w-4 h-4" : size === "small" ? "w-4 h-4" : ""
              } text-white z-[83] p-[2px]`}
            />
          </button>
          {/* <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 hover:bg-red-400"></span> */}
        </span>
        <div
          className={`absolute text-center w-24 mt-3 ${
            isHover ? "block" : "hidden"
          }`}
        >
          <span
            className={`${
              size === "base" ? "text-xs" : size === "small" ? "text-xs" : ""
            } text-black`}
          >
            {nama}
          </span>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <ModalWBP handleClose={handleClose} item={item} />
      </Modal>
    </div>
  );
}

export default WBP;
