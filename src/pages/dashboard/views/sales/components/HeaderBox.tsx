import React, { type ReactNode } from 'react'
import { useTheme } from '../../../../../shared/hooks'

interface HeaderBoxProps {
    children: ReactNode
}

export const HeaderBox: React.FC<HeaderBoxProps> = ({ children }) => {

    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <p className={`text-lg mb-5 flex items-center gap-3 font-bold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
            {children}
        </p>
    )
}
