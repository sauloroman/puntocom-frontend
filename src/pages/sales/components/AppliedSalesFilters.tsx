import React from 'react'
import { useSale, useTheme } from '../../../shared/hooks'
import { FilterDateTag, FilterPriceTag, FilterUserTag } from '../../../shared/components/filter'

export const AppliedSalesFilters: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { filter, onResetFilters } = useSale()

    const hasFilters = 
        filter.user.id !== null ||
        filter.price.minPrice !== null ||
        filter.dates.dateStart !== null

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

            <FilterUserTag 
                userId={filter.user.id}
                userName={filter.user.name}
            />
            <FilterPriceTag 
                minPrice={filter.price.minPrice}
                maxPrice={filter.price.maxPrice}
            />
            <FilterDateTag
                dateStart={ filter.dates.dateStart }
                dateEnd={ filter.dates.dateEnd }
            />
            
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