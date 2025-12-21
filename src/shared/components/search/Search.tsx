import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useTheme } from "../../hooks";

interface SearchProps {
    placeholder: string,
    onChange: ( value: string ) => void
}

export const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [valueSearched, setvalueSearched] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange( valueSearched )
  }

  return (
    <form onSubmit={ handleSubmit } className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        className={`
          text-sm border w-full pl-10 pr-4 py-2 rounded-full
          focus:outline-none focus:ring-2
          transition-all duration-200
          ${isDark
            ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-500/50 focus:border-indigo-500'
            : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-indigo-100 focus:border-indigo-300'
          }
        `}
        onChange={ (e) => setvalueSearched(e.target.value)}
        value={valueSearched}
      />
      <FiSearch
        className={`
          absolute left-3 top-1/2 -translate-y-1/2 transition-colors
          ${isDark ? 'text-gray-400' : 'text-gray-400'}
        `}
        size={18}
      />
    </form>
  );
};