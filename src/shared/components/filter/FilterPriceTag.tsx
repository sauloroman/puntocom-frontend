import React from 'react'
import { useTheme } from '../../hooks'

interface Props {
    minPrice: number | null,
    maxPrice: number | null
}

export const FilterPriceTag: React.FC<Props> = ({ minPrice, maxPrice }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    if (minPrice === null || maxPrice === null) {
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
            <div className='flex items-center gap-2'>
                <span className={`
                    font-medium transition-colors
                    ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                `}>
                    Precio:
                </span>
                <span className={`
                    transition-colors
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                    ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
                </span>
            </div>
        </div>
    )
}
