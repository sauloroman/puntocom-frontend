import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
        className={`w-full rounded-lg bg-indigo-700 text-white font-medium py-2 px-4 hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        {...props}
    >{children}</button>
  )
}
