import React from 'react'
import { SelectUserFilter } from '../../../shared/components/select/SelectUserFilter'
import { useSale } from '../../../shared/hooks'

export const FilterSalesByUser: React.FC = () => {
    
    const {
        onSetFilterUser,
        onResetFilters
    } = useSale()

    return (
        <SelectUserFilter 
            onResetFilter={onResetFilters} 
            onApplyFilter={onSetFilterUser} 
        />
    )
}
