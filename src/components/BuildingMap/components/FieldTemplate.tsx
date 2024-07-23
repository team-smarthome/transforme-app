interface BuildingProps {
  size?: 'large' | 'base' | 'small' | string;
  color?: string;
  color2?: string;
  handleClick: () => void;
  readOnly?: boolean;
  positionX?: string;
  positionY?: string;
  heightProps?: string;
  widthProps?: string;
}

function FieldTemplate({
  size = 'base',
  color = 'bg-map-building',
  color2 = 'bg-map-building2',
  positionX,
  positionY,
  heightProps,
  widthProps,
  handleClick,
}: BuildingProps) {
  const getSize = () => {
    // let heightTemp = height
    // let widthTemp = width   
    // console.log('height xxx', heightProps);
    // console.log('width xxx', widthProps);
    
    
    let style = 
    ` ${heightProps}  ${widthProps}  ${positionX}  ${positionY} `;
    
    // ` h-[${heightTemp}] w-[${widthTemp}] `;
    
    // console.log('style xxx', style);

    return style;
  };

  return (
    <div
      onClick={handleClick} 
      className={`absolute ${getSize()}  cursor-pointer hover:bg-slate-200 transition-colors duration-200 ${color} flex justify-between border-black border shadow-md shadow-slate-600 bg-opacity-75 z-[79] `}
    >
      <h3 className="absolute top-14.5 left-20 text-lg">
        LAPANGAN UPACARA
      </h3>
    </div>
     
  );
}

export default FieldTemplate;
