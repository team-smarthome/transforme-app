import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { useAtom } from "jotai";
import { zoneVisibleAtom } from "../../../utils/atomstates";
import { FaBuilding } from "react-icons/fa";

interface BuildingProps {
  size?: "large" | "base" | "small" | string;
  color?: string;
  color2?: string;
  handleClick: () => void;
  readOnly?: boolean;
  positionX?: string;
  positionY?: string;
  heightProps?: string;
  widthProps?: string;
  sizeText?: string;
  isRotateText?: boolean;
  namaGedung?: string;
  zonePositionX?: string;
  zonePositionY?: string;
  zoneHeight?: string;
  zoneWidth?: string;
}

function BuildingTemplate({
  size = "base",
  color = "bg-map-building",
  color2 = "bg-map-building2",
  sizeText,
  isRotateText = false,
  positionX,
  positionY,
  heightProps,
  widthProps,
  namaGedung = "",
  zonePositionX,
  zonePositionY,
  zoneHeight,
  zoneWidth,
  handleClick,
}: BuildingProps) {
  const [isHover, setIsHover] = useState(false);
  const [sizeComponent, setSizeComponent] = useState(false);
  const [zone, setZone] = useAtom(zoneVisibleAtom);

  useEffect(() => {
    const widthValue = parseFloat(widthProps.replace(/[^0-9.]/g, ""));
    if (widthValue < 3) {
      setSizeComponent(true);
    }
  }, []);

  function checkAspectRatio() {
    const heightValue = parseFloat(heightProps.replace(/[^0-9.]/g, ""));
    const widthValue = parseFloat(widthProps.replace(/[^0-9.]/g, ""));
    if (heightValue > widthValue * 2) {
      return `-rotate-90 w-14 text-[8px]`;
    } else {
      return "w-full text-xs";
    }
  }

  const getSize = () => {
    return `${heightProps} ${widthProps} ${positionX} ${positionY}`;
  };
  const getSizeZone = () => {
    return `${zoneHeight} ${zoneWidth} ${zonePositionX} ${zonePositionY}`;
  };
  // console.log(getSizeZone, "getSizeZone")
  console.log(
    `${zoneHeight} ${zoneWidth} ${zonePositionX} ${zonePositionY} ada `
  );
  console.log(typeof widthProps, "width type");
  const sizeList: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const widthPropsString = String(widthProps);
  const namaGedungTitle = sizeList.includes(widthPropsString)
    ? null
    : namaGedung;
  return (
    <React.Fragment>
      {zone && <div className={`absolute ${getSizeZone()} bg-red-900 z-1`} />}
      {isHover && sizeComponent ? (
        <Tooltip
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode as HTMLElement
          }
          title={<span className="text-black">{namaGedung}</span>}
          placement="bottom"
          color="white"
          className="text-black"
        >
          <div
            onClick={handleClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`absolute ${getSize()} cursor-pointer hover:bg-slate-300 border-2 items-center
            hover:border-4 transition-colors duration-200 bg-slate-200 flex justify-between border-black shadow-md shadow-slate-600 bg-opacity-100 z-[81]`}
          >
            {!sizeComponent && (
              <h4
                className={`text-center overflow-hidden ${checkAspectRatio()} text-black font-semibold`}
              >
                {namaGedungTitle}
              </h4>
            )}
          </div>
        </Tooltip>
      ) : (
        <div
          onClick={handleClick}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`absolute ${getSize()} cursor-pointer hover:bg-slate-300 border-2 items-center
        hover:border-4 transition-colors duration-200 bg-slate-200 flex justify-between border-black shadow-md shadow-slate-600 bg-opacity-100 z-[81]`}
        >
          {!sizeComponent && (
            <h4
              className={`text-center overflow-hidden ${checkAspectRatio()} text-black font-semibold flex flex-row justify-center gap-2 h-full items-center`}
            >
              {namaGedungTitle}
              {/* <div className="bg-red-500 px-1 py-1 rounded-">
                <FaBuilding className="text-white" />
              </div> */}
            </h4>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default BuildingTemplate;
