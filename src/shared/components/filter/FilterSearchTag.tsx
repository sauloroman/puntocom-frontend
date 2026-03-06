import React from 'react'
import { useTheme } from '../../hooks'
import { LuSearch } from 'react-icons/lu'

interface Props {
    search: string | null
}

export const FilterSearchTag: React.FC<Props> = ({ search }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    if (!search || search.trim() === '') {
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
            <LuSearch
                size={14}
                className={isDark ? 'text-indigo-400' : 'text-indigo-600'}
            />

            <div className='flex items-center gap-2'>
                <span className={`
                    font-medium transition-colors
                    ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                `}>
                    Búsqueda:
                </span>

                <span className={`
                    transition-colors italic
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                    "{search}"
                </span>
            </div>
        </div>
    )
}
