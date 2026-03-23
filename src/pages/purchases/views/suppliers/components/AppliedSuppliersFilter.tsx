import React from 'react'
import { AppliedFilters, FilterCompanyTag, FilterSearchTag } from '../../../../../shared/components/filter'
import { useSuppliers } from '../../../../../shared/hooks'
import { FilterStatusTag } from '../../../../../shared/components/filter/FilterStatusTag'

export const AppliedSuppliersFilter: React.FC = () => {
    const { filter, onResetFilters } = useSuppliers()

    const hasFilters = 
        filter.company !== null ||
        filter.status !== null ||
        filter.supplierName !== null

    return (
        <AppliedFilters
            hasFilters={hasFilters}
            onResetFilters={onResetFilters}
        >
            <FilterSearchTag 
                search={filter.supplierName}
            />

            <FilterStatusTag 
                status={filter.status}
                statusLabel={filter.status}
            />

            <FilterCompanyTag 
                companyName={filter.company}
            />
        </AppliedFilters>
    )
}
