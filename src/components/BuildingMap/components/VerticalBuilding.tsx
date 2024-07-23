import { Tooltip } from 'antd';

interface BuildingProps {
  size?: string;
  color?: string;
  color2?: string;
  handleClick: any;
  tooltip: string;
}

function BuildingVertical({
  size = 'base',
  color = 'bg-map-building',
  color2 = 'bg-map-building2',
  tooltip,
  handleClick,
}: BuildingProps) {
  console.log('1234', tooltip);

  const getSize = () => {
    let style = '';
    switch (size) {
      case 'large':
        style = 'w-12 h-64';
        break;
      case 'base':
        style = 'w-12 h-40';
        break;
      case 'small':
        style = 'w-12 h-20';
        break;
      default:
        style = size;
        break;
    }

    return style;
  };

  return (
    <div
      onClick={handleClick}
      className={`${getSize()} ${color} hover:${color2} transition-colors duration-200 flex flex-col justify-between border-black border cursor-pointer shadow-md shadow-slate-600`}
    >
        <div className="w-full -mb-4 overflow-hidden inline-block">
          <div
            className={`h-8 ${color2} z-10 border-black border rotate-45 transform origin-top-right`}
          ></div>
        </div>
      <Tooltip
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement} title={`${tooltip}`}>
      <div className="w-full flex-1 flex justify-center">
        <div className="w-0.5 h-full bg-black"></div>
      </div>
      </Tooltip>
      <div className="w-full z-10 -mt-5 overflow-hidden inline-block">
        <div
          className={`h-8 ${color2} border-black border -rotate-45 transform origin-bottom-right`}
        ></div>
      </div>
    </div>
  );
}

export default BuildingVertical;