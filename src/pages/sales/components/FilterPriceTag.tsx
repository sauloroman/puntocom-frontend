import React from 'react'
import { useSale, useTheme } from '../../../shared/hooks'

export const FilterPriceTag: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { filter } = useSale()

    if (filter.prices.priceMin === null || filter.prices.priceMax === null) {
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
                    ${filter.prices.priceMin.toFixed(2)} - ${filter.prices.priceMax.toFixed(2)}
                </span>
            </div>
        </div>
    )
}
