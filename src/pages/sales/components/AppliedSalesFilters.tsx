import React from 'react'
import { useSale } from '../../../shared/hooks'
import { AppliedFilters, FilterDateTag, FilterPriceTag, FilterUserTag } from '../../../shared/components/filter'

export const AppliedSalesFilters: React.FC = () => {

    const { filter, onResetFilters } = useSale()

    const hasFilters = 
        filter.user.id !== null ||
        filter.price.minPrice !== null ||
        filter.dates.dateStart !== null

    return (
        <AppliedFilters 
            hasFilters={hasFilters} 
            onResetFilters={onResetFilters}
        >
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
        </AppliedFilters>
    )
}