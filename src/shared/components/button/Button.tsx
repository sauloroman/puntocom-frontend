import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
        className={`font-medium transition-colors focus:outline-none focus:ring-2 ${className}`}
        {...props}
    >{children}</button>
  )
}
