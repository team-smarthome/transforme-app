import React from 'react'

const ToolsTip = (props:any) => {
    const { text, children } = props;
  return (
    // <div className="relative inline-block hover:block ">
    <div className="tooltip ">
    {children}
    {/* <span className="hidden absolute mt-5px -ml-[60px] text-center bg-white text-[12px] z-1 opacity-0 transition-opacity duration-200 ">{text}</span> */}
    <span className="tooltiptext">{text}</span>
  </div>

  )
}

export default ToolsTip