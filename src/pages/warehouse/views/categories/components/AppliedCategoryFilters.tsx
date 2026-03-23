import React from 'react'
import { useCategories } from '../../../../../shared/hooks'
import { AppliedFilters, FilterSearchTag, FilterStatusTag } from '../../../../../shared/components/filter'

export const AppliedCategoryFilters: React.FC = () => {
    
    const { filter, onResetFilters } = useCategories()

    const hasFilters = 
        filter.categoryName !== null ||
        filter.status !== null

    return (
        <AppliedFilters
            hasFilters={hasFilters}
            onResetFilters={onResetFilters}
        >
            <FilterSearchTag 
                search={filter.categoryName}
            />

            <FilterStatusTag 
                status={filter.status}
                statusLabel={filter.status}
            />
        </AppliedFilters>
    )
}
