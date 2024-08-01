import React, { useState } from 'react';

const Pagination = ({ total, itemsPerPage, currentPage, onPageChange }) => {
  const [current, setCurrent] = useState(currentPage || 1);
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrent(page);
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        className="px-3 py-1 border rounded"
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-3 py-1 border rounded ${current === index + 1 ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 border rounded"
        onClick={() => handlePageChange(current + 1)}
        disabled={current === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
