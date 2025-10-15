import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    onClick?: () => void
}

export const OutlineButton: React.FC<Props> = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
        onClick={onClick}
        className={`cursor-pointer rounded-4xl p-2 border border-gray-300 px-4 text-sm flex justify-center items-center gap-2 text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
        {...props}
    >{children}</button>
  )
}
