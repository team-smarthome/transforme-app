// SearchInputButton.js
import React from 'react';

interface SearchInputButtonProps {
  value: string;
  name?: string;
  onChange: (e: any) => void;
  // onClick: () => void;
  placehorder?: string;
}

const SearchInputButtonModal = ({
  value,
  onChange,
  placehorder,
  name,
}: SearchInputButtonProps) => {
  return (
    <div className="flex flex-row">
      <input
        name={name}
        type="search"
        value={value}
        onChange={onChange}
        className="w-full h-[40px] rounded border border-stroke py-1 px-4 text-black text-sm focus:border-primary focus-visible:outline-none dark:border-white dark:bg-slate-700 dark:text-white dark:focus:border-primary"
        placeholder={placehorder}
        aria-label="Search"
        aria-describedby="button-addon1"
      />
      {/* <button
        className="relative z-[2] flex items-center rounded-r bg-blue-300 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        type="button"
        onClick={onClick}
        id="button-addon1"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default SearchInputButtonModal;
