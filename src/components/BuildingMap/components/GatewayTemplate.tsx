import React, { useState } from "react";
import { WifiIcon } from "@heroicons/react/24/outline";
import Modal, { ModalGateway } from "../../Modal";

interface GatewayTemplateProps {
  size?: string;
  positionX?: string;
  positionY?: string;
  positionXRoom?: string;
  positionYRoom?: string;
  nama?: string;
  visible?: boolean;
}

function GatewayTemplate({
  size = "base",
  positionX,
  positionY,
  positionXRoom,
  positionYRoom,
  nama,
  visible = true,
}: GatewayTemplateProps) {
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

  return (
    <div
      className={`
    absolute ${positionXRoom}  ${positionYRoom} cursor-pointer z-[81]
    `}>
      <button
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={handleClick}
        type="button"
        className={`flex-col items-center px-1 ${visible ? "flex" : "hidden"}`}>
        <div className="w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-200 bg-map-gateway bg-blue-600 hover:bg-blue-500 shadow-3 shadow-transparent-light">
          <WifiIcon
            className={`${
              size === "base" ? "w-4 h-4" : size === "small" ? "w-3 h-3" : null
            } text-white`}
          />
        </div>
        <div className={`${isHover ? "opacity-100" : "opacity-0"} -mt-2`}>
          <span
            className={`${
              size === "base"
                ? "text-2xs"
                : size === "small"
                ? "text-3xs"
                : null
            } text-black`}>
            {nama}
          </span>
        </div>
      </button>
      <Modal open={open} onClose={handleClose}>
        <ModalGateway handleClose={handleClose} name={nama} />
      </Modal>
    </div>
  );
}

export default GatewayTemplate;
