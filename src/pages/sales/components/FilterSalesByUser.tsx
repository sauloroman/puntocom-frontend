import React from 'react'
import { useSale } from '../../../shared/hooks'
import { SelectUserFilter } from '../../../shared/components/select'

export const FilterSalesByUser: React.FC = () => {
    
    const {
        onSetFilterSalesByUser,
        onResetFilters
    } = useSale()

    return (
        <SelectUserFilter 
            onResetFilter={onResetFilters} 
            onApplyFilter={onSetFilterSalesByUser} 
        />
    )
}
