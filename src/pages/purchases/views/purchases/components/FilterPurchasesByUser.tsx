import React from 'react'
import { SelectUserFilter } from '../../../../../shared/components/select/SelectUserFilter'
import { usePurchase } from '../../../../../shared/hooks'

export const FilterPurchasesByUser: React.FC = () => {
    const { onSetFilterPurchasesByUser, onResetFilters } = usePurchase()
    return (
        <SelectUserFilter
            onResetFilter={onResetFilters} 
            onApplyFilter={onSetFilterPurchasesByUser} 
        />
    )
}
