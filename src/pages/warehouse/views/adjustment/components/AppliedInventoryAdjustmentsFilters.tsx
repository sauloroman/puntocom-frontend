import React from 'react'
import { useInventoryAdjustment } from '../../../../../shared/hooks'
import { AppliedFilters, FilterAdjustmentTypeTag, FilterUserTag } from '../../../../../shared/components/filter'
import type { AdjustmentEnum } from '../../../../../interfaces/dto/inventory-adjustment.interface'

export const AppliedInventoryAdjustmentsFilters: React.FC = () => {
    
    const { filter, onResetFilters } = useInventoryAdjustment()

    const hasFilter =
        filter.adjustmentType !== null ||
        filter.user.id !== null

    return (
        <AppliedFilters
            hasFilters={hasFilter}
            onResetFilters={onResetFilters}
        >
            <FilterUserTag 
                userId={filter.user.id ?? ''}
                userName={filter.user.name ?? ''}
            /> 

            <FilterAdjustmentTypeTag 
                type={filter.adjustmentType as AdjustmentEnum}
            />

        </AppliedFilters>
    )
}
