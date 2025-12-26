import React from 'react'
import { usePurchase } from '../../../../../shared/hooks'
import { SelectSupplierFilter } from '../../../../../shared/components/select/SelectSupplierFilter'

export const FilterPurchasesBySupplier: React.FC = () => {
    const { onResetFilters, onSetFilterPurchasesBySupplier } = usePurchase()
    return (
        <SelectSupplierFilter 
            onResetFilter={onResetFilters}
            onApplyFilter={onSetFilterPurchasesBySupplier}
        />
    )
}
