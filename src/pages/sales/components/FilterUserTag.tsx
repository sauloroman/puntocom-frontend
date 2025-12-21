import React from 'react'
import { useSale, useTheme } from '../../../shared/hooks'
import { LuUser } from 'react-icons/lu'

export const FilterUserTag: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { filter } = useSale()

    if (!filter.user.id) {
        return null
    }

    return (
        <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors
            ${isDark 
                ? 'bg-indigo-900/30 border-indigo-700' 
                : 'bg-indigo-50 border-indigo-200'
            }
        `}>
            <LuUser 
                size={14} 
                className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
            />
            <div className='flex items-center gap-2'>
                <span className={`
                    font-medium transition-colors
                    ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                `}>
                    Usuario:
                </span>
                <span className={`
                    transition-colors
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                    {filter.user.name}
                </span>
            </div>
        </div>
    )
}