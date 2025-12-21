import React from 'react'
import { Button } from './Button'
import { FaPlus } from 'react-icons/fa'
import { useTheme } from '../../hooks'

interface CreateButtonProps {
  onClick?: () => void,
  className?: string,
  text: string
}

export const CreateButton: React.FC<CreateButtonProps> = ({ text, onClick, className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      onClick={onClick}
      className={`
        text-sm flex items-center gap-2 justify-center cursor-pointer
        bg-[linear-gradient(to_right,#005C97_0%,#363795_51%,#005C97_100%)]
        bg-[length:200%_auto] hover:bg-[position:right_center]
        transition-all duration-1000 text-white rounded-full

        shadow-[0_0_15px_rgba(0,92,151,0.4)]
        ${isDark ? "hover:shadow-[0_0_22px_rgba(20,130,220,0.6)]" : "hover:shadow-[0_0_22px_rgba(0,92,151,0.5)]"}

        ${className}
      `}
    >
      <FaPlus />
      {text}
    </Button>
  )
}
