import BuildingVertical from "./VerticalBuilding";
import Gateway from "./Gateway";

interface GateAreaProps {
  handleClickBuilding: any;
}

function GateArea({ handleClickBuilding }: GateAreaProps) {
  return (
    <div className="relative flex flex-col gap-y-5 opacity-0">
      <div className="flex items-center">
        <BuildingVertical
          color="bg-red-600"
          color2="bg-red-500"
          size="small"
          tooltip="Gedung B"
          handleClick={handleClickBuilding}
        />
        <div className="bg-yellow-600 border border-l-0 border-black w-5 h-10"></div>
      </div>
      <div className="relative">
        <p className="uppercase text-2xl text-slate-900 -rotate-90 absolute -left-28 top-30">
          Area Depan
        </p>
        <BuildingVertical
          color="bg-red-600"
          color2="bg-red-500"
          size="large"
          tooltip="Gedung A"
          handleClick={handleClickBuilding}
        />
      </div>
      <div className="flex items-center -translate-x-5">
        <div className="bg-yellow-600 border border-r-0 border-black w-5 h-10"></div>
        <BuildingVertical
          color="bg-red-600"
          color2="bg-red-500"
          size="small"
          tooltip="Gedung C"
          handleClick={handleClickBuilding}
        />
      </div>
      <div className="absolute bottom-40 -left-10 z-50">
        <Gateway item={{ name: "Gateway 1", nameSmall: "" }} />
        <h1>hello world</h1>
      </div>
    </div>
  );
}

export default GateArea;
