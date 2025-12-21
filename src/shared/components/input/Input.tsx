import React from "react"
import { useTheme } from "../../hooks"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className='', ...props }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    
    return (
        <input 
            className={`
                w-full px-3 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-colors duration-200
                ${isDark 
                    ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-750' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
            {...props}
        />
    )
}