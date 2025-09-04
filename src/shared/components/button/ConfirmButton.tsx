import React from 'react'
import { Button } from './Button'
import { FaCheck } from 'react-icons/fa'

interface ConfirmButtonProps {
  text: string
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ text }) => {
  return (
    <Button
      className="
        text-sm flex items-center gap-2 justify-center cursor-pointer 
        bg-[linear-gradient(to_right,#6a11cb_0%,#2575fc_51%,#6a11cb_100%)]
        bg-[length:200%_auto]
        hover:bg-[position:right_center]
        transition-all duration-1000
        text-white
        shadow-[0_0_20px_#eee]
        rounded-full
      "
    >
      <FaCheck />
      {text}
    </Button>
  )
}
