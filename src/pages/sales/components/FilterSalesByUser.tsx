import React from 'react'
import { useSale } from '../../../shared/hooks'
import { SelectUserFilter } from '../../../shared/components/select'

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
