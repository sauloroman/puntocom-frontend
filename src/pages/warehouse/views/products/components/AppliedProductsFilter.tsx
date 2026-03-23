import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { AppliedFilters, FilterCategoryTag, FilterPriceTag, FilterSearchTag, FilterStatusTag } from '../../../../../shared/components/filter'
import { FilterSupplierTag } from '../../../../../shared/components/filter/FilterSupplierTag'

export const AppliedProductsFilter: React.FC = () => {
    const { filter, onResetFilter } = useProducts()

    const hasFilters = 
        filter.status !== null ||
        filter.category !== null ||
        filter.supplier !== null ||
        filter.price !== null ||
        filter.productName !== null

    return (
        <AppliedFilters
            hasFilters={hasFilters}
            onResetFilters={onResetFilter}
        >

            <FilterSearchTag 
                search={filter.productName}
            />

            <FilterStatusTag 
                status={filter.status}
                statusLabel={filter.status}
            />

            <FilterPriceTag 
                maxPrice={filter.price.maxPrice}
                minPrice={filter.price.minPrice}
            />

            <FilterSupplierTag 
                supplierId={filter.supplier?.id ?? ''}
                supplierName={filter.supplier?.name ?? ''}
            />

            <FilterCategoryTag 
                categoryId={filter.category?.id ?? ''}
                categoryName={filter.category?.name ?? ''}
            />

        </AppliedFilters>
    )
}
