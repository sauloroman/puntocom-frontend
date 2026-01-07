import React from 'react'
import { useTheme } from '../../hooks'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className = '', ...props }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <textarea
      className={`
        w-full px-3 border py-2 rounded-lg text-sm focus:outline-none focus:ring-2 transition
        ${isDark
          ? "bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-indigo-400"
          : "bg-white border-gray-300 text-gray-700 placeholder-gray-500 focus:ring-indigo-500"
        }
        ${className}
      `}
      {...props}
    />
  )
}
