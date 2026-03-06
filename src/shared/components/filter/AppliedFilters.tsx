import React from 'react'
import { useTheme } from '../../../shared/hooks'

interface Props {
    children: React.ReactNode,
    hasFilters: boolean,
    onResetFilters: () => void,
}

export const AppliedFilters: React.FC<Props> = ({ children, hasFilters, onResetFilters}) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    if (!hasFilters) {
        return null
    }

    return (
        <div className='flex items-center gap-3 flex-wrap'>
            <span className={`
                text-sm font-medium transition-colors
                ${isDark ? 'text-gray-300' : 'text-gray-600'}
            `}>
                Filtros aplicados:
            </span>

            { children }
            
            {hasFilters && (
                <button
                    onClick={onResetFilters}
                    className={`
                        text-sm font-medium underline cursor-pointer transition-colors
                        ${isDark 
                            ? 'text-indigo-400 hover:text-indigo-300' 
                            : 'text-indigo-600 hover:text-indigo-800'
                        }
                    `}
                >
                    Limpiar todos
                </button>
            )}
        </div>
    )
}