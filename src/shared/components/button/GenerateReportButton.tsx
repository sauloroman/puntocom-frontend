import React from 'react'
import { Button } from './Button'
import { IoDocumentTextOutline } from "react-icons/io5";

interface GenerateReportButtonProps {
  text: string,
  onClick?: () => void
}

export const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      type='button'
      onClick={ onClick }
      className="
        text-sm
        cursor-pointer
        flex items-center gap-2
        rounded-full px-4 py-2
        bg-white
        border-2 border-yellow-400 text-yellow-400
        hover:bg-yellow-500 hover:text-white
        transition-colors duration-200
      "
    >
      <IoDocumentTextOutline className="text-lg" />
      {text}
    </Button>
  )
}
