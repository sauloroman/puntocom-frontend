import React from "react";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { useTheme } from "../../hooks";

interface SortElementsAlphaProps {
  onToggle: (status: boolean) => void;
  desc: boolean;
}

export const SortElementsAlphaButton: React.FC<SortElementsAlphaProps> = ({ onToggle, desc }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => onToggle(!desc)}
      className={`
        cursor-pointer p-2 rounded-lg border transition-colors
        ${isDark
          ? "border-gray-700 text-gray-300 hover:bg-gray-700 bg-gray-800"
          : "border-gray-300 text-gray-700 hover:bg-gray-100 bg-white"}
      `}
    >
      {!desc ? <BsSortAlphaDown size={20} /> : <BsSortAlphaUp size={20} />}
    </button>
  );
};
