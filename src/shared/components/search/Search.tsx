import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
    placeholder: string,
    onChange?: ( value: string ) => void
}

export const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder={placeholder}
        className="
          text-sm border border-gray-300  
          w-full pl-10 pr-4 py-2 rounded-full
        bg-white text-gray-700
        placeholder-gray-400
        focus:outline-none
          focus:ring-2 focus:ring-indigo-100
          transition-all
        "
        onChange={ (e) => onChange?.(e.target.value)}
      />
      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
    </div>
  );
};
