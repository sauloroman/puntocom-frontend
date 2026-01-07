import type React from "react"
import { useTheme } from "../../hooks"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    
    return (
        <label
            className={`
                block text-sm font-medium mb-1 transition-colors duration-200
                ${isDark ? 'text-gray-200' : 'text-gray-700'}
                ${className}
            `}
            {...props}
        >
            {children}
        </label>
    )
}