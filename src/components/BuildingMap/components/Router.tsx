import { useState } from "react";
import { SignalIcon } from "@heroicons/react/24/outline";
import Modal, { ModalRouter } from "../../../components/Modal";

interface RouterProps {
  item: any;
  size?: string;

  visible?: boolean;
  positionX?: string;
  positionY?: string;
}

function Router({
  size = "base",
  item,
  visible = false,
  positionX,
  positionY,
}: RouterProps) {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  console.log(item);

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
          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-200 bg-map-gateway  bg-amber-600 hover:bg-amber-400 shadow-3 shadow-transparent-light"
        >
          <SignalIcon
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
        <ModalRouter handleClose={handleClose} name={item.nama} />
      </Modal>
    </div>
  );
}

export default Router;
