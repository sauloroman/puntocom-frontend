import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { useTheme } from "../../hooks";

interface SelectProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          text-sm appearance-none w-full px-4 py-2 pr-10 rounded-lg
          border focus:outline-none focus:ring-2
          transition-all duration-200 cursor-pointer
          ${isDark
            ? 'bg-gray-800 text-gray-100 border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
            : 'bg-white text-gray-600 border-gray-300 focus:ring-indigo-200 focus:border-indigo-200'
          }
        `}
      >
        <option value={placeholder} className={isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option 
            key={option} 
            value={option}
            className={isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-700'}
          >
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown
        className={`
          absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
          ${isDark ? 'text-gray-400' : 'text-gray-400'}
        `}
        size={18}
      />
    </div>
  );
};