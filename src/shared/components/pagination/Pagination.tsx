import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface PaginationProps {
  total: number;
  itemsPerPage: number,
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  totalPages,
  itemsPerPage,
  onPageChange,
}) => {
  
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="w-full flex items-center justify-between border-t border-gray-200 py-3">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> a{" "}
          <span className="font-medium">
            {page === totalPages ? total : page * itemsPerPage}
          </span>{" "}
          de <span className="font-medium">{total}</span> resultados
        </p>
        <div className="inline-flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`cursor-pointer inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium transition 
              ${
                page === 1
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            <BiChevronLeft className="h-4 w-4" />
            Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`cursor-pointer inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium transition 
              ${
                page === totalPages
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            Siguiente
            <BiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
