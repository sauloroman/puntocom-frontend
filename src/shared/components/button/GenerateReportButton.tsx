import React from 'react'
import { Button } from './Button'
import { IoDocumentTextOutline } from "react-icons/io5";
import { useTheme } from "../../hooks";

interface GenerateReportButtonProps {
  text: string,
  onClick?: () => void
}

export const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ text, onClick }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type='button'
      onClick={onClick}
      className={`
        text-sm cursor-pointer flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-200

        ${
          isDark
            ? "bg-yellow-600 text-gray-800 hover:bg-yellow-600" 
            : "bg-white border-2 border-yellow-400 text-yellow-500 hover:bg-yellow-500 hover:text-white" 
        }
      `}
    >
      <IoDocumentTextOutline className="text-lg" />
      {text}
    </Button>
  )
}
