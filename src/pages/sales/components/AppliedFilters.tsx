import React from 'react'
import { FilterPriceTag } from './FilterPriceTag'
import { FilterDateTag } from './FilterDateTag'
import { FilterUserTag } from './FilterUserTag'
import { useSale, useTheme } from '../../../shared/hooks'

export const AppliedFilters: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { filter, onResetFilters } = useSale()

    const hasFilters = 
        filter.user.id !== null ||
        filter.prices.priceMin !== null ||
        filter.dates.dateFrom !== null

    if (!hasFilters) {
        return null
    }

    const handleClearAll = () => {
        onResetFilters()
    }

    return (
        <div className='flex items-center gap-3 flex-wrap'>
            <span className={`
                text-sm font-medium transition-colors
                ${isDark ? 'text-gray-300' : 'text-gray-600'}
            `}>
                Filtros aplicados:
            </span>
            <FilterUserTag />
            <FilterPriceTag />
            <FilterDateTag />
            
            {hasFilters && (
                <button
                    onClick={handleClearAll}
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