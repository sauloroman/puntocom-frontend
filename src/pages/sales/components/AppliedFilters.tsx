import React from 'react'
import { FilterPriceTag } from './FilterPriceTag'
import { FilterDateTag } from './FilterDateTag'
import { FilterUserTag } from './FilterUserTag'
import { useSale } from '../../../shared/hooks'

export const AppliedFilters: React.FC = () => {
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
            <span className='text-sm text-gray-600 font-medium'>Filtros aplicados:</span>
            <FilterUserTag />
            <FilterPriceTag />
            <FilterDateTag />
            
            {hasFilters && (
                <button
                    onClick={handleClearAll}
                    className='text-sm text-indigo-600 hover:text-indigo-800 font-medium underline'
                >
                    Limpiar todos
                </button>
            )}
        </div>
    )
}