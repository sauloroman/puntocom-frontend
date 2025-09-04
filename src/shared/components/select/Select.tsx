import React from "react";
import { FiChevronDown } from "react-icons/fi";

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
  return (
    <div className="relative w-36 max-w-sm">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="
          text-sm
          appearance-none w-full px-4 py-2 pr-10 rounded-2xl
          bg-white text-gray-600
          border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200
          transition-all cursor-pointer
        "
      >
        <option value={placeholder} defaultValue={placeholder}>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Icono flecha */}
      <FiChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={18}
      />
    </div>
  );
};
