import React, { useState } from 'react';

const SearchChat = (props: any) => {
  const { handleChange, searchTerm, handleClose} = props;

  return (
    <div className="h-[50px] flex ">
      <div className="bg-white items-center flex ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="pl-2 w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <input
        className="px-4 py-2 w-[100%] outline-none border-none"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      ></input>
      {searchTerm !== '' && (
        <div className="bg-white items-center flex pr-2">
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      
      )}
    </div>
  );
};

export default SearchChat;
