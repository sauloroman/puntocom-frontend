import React from 'react'
import { useTheme } from '../../hooks'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const OutlineButton: React.FC<Props> = ({ children, className = '', ...props }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      className={`
        cursor-pointer rounded-4xl p-2 px-4 text-sm flex justify-center items-center gap-2 transition-colors

        ${isDark 
          ? "bg-gray-800 text-gray-200 border-0 hover:bg-gray-700" 
          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
        }

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
