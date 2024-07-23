import React from 'react';

function Pagination({ currentPage, totalPages, onChangePage }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let startPage, endPage;
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  return (
    <nav className="flex justify-center space-x-2  px-12 py-4 bg-gray-900 text-white  ">
      {currentPage !== 1 && (
        <button
          onClick={() => onChangePage(currentPage - 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Prev
        </button>
      )}
      {startPage > 1 && (
        <button
          onClick={() => onChangePage(1)}
          className="text-gray-400 px-4 py-2 rounded-md"
        >
          1
        </button>
      )}
      {startPage > 2 && <span className="text-gray-400">...</span>}
      {pageNumbers.slice(startPage - 1, endPage).map((page) => (
        <button
          key={page}
          onClick={() => onChangePage(page)}
          className={`${
            currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-400'
          } px-4 py-2 rounded-md`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
      {endPage < totalPages && (
        <button
          onClick={() => onChangePage(totalPages)}
          className="text-gray-400 px-4 py-2 rounded-md"
        >
          {totalPages}
        </button>
      )}
      {currentPage !== totalPages && (
        <button
          onClick={() => onChangePage(currentPage + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      )}
    </nav>
  );
}

export default Pagination;