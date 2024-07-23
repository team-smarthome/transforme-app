import React from 'react';

const ProgressBar = ({ list, currentForm }: any) => {
  return (
    <div className="mb-2 flex  justify-center items-center p-8 w-full">
      {list.map((data, index) => {
        const isAnimate = index   < currentForm; // Check if the current index is less than or equal to currentForm
        const isVisible = index <= currentForm; // Check if the current index is less than or equal to currentForm
        return (
          <div className="flex items-center justify-start">
            {' '}
            {/* Example wrapper element */}
            <span
              className={`text-lg font-bold border rounded-full w-8 h-8 flex items-center justify-center ${
                isVisible
                  ? `bg-blue-500 text-white border-blue-500`
                  : `bg-gray-200 text-slate-500 border-slate-500`
              }`}
            >
              {index + 1}
              <span className='absolute top-39 text-xs
              '>{data.nama}</span>
            </span>
            {index + 1 !== list.length && (
              <div
                key={index}
                className={`h-1 flex-1 rounded-none w-36 ${currentForm - 1 === index && 'animate-pulse'} ${
                  isAnimate ? `bg-blue-500` : `bg-slate-600`
                }`}
              ></div>
            )}
          </div>
        );
      })}
      {/* <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-500 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-400 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-300 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-200 animate-progress"></span>
    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-green-200 animate-progress"></span> */}
    </div>
  );
};

export default ProgressBar;
