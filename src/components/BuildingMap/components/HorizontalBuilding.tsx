interface BuildingProps {
  size?: string;
  color?: string;
  color2?: string;
  handleClick: any;
  readOnly?: boolean;
}

function HorizontalBuilding({
  size = 'base',
  color = 'bg-map-building',
  color2 = 'bg-map-building2',
  readOnly = false,
  handleClick,
}: BuildingProps) {
  const getSize = () => {
    let style = '';
    switch (size) {
      case 'large':
        style = 'w-75 h-14';
        break;
      case 'base':
        style = 'w-64 h-14';
        break;
      case 'small':
        style = 'w-32 h-14';
        break;
      default:
        style = size;
        break;
    }

    return style;
  };

  return (
    <div
      onClick={readOnly ? null : handleClick}
      className={`${getSize()} ${
        readOnly
          ? null
          : 'cursor-pointer hover:bg-slate-200 transition-colors duration-200'
      } ${color} flex justify-between border-black border shadow-md shadow-slate-600`}
    />
    
  );
}

export default HorizontalBuilding;
