import React from 'react'
import { useSale } from '../../../shared/hooks'
import { FilterPriceTag, FilterUserTag } from './'
import { OutlineButton } from '../../../shared/components/button/OutlineButton'

export const FilterTags: React.FC = () => {
    const { filter: { user, prices }, onSetFilterPrices, onSetFilterUser, getAllSales } = useSale()
    
    const onResetFilters = () => {
        onSetFilterPrices(null, null, true)
        onSetFilterUser(null, null, true)
        getAllSales()
    }

    return (
        <div className='flex items-center gap-3'>
            { prices.priceMax && <FilterPriceTag prices={{ minPrice: prices.priceMin!, maxPrice: prices.priceMax! }} /> }
            { user.id && <FilterUserTag username={user.name!} />}
            { 
                (prices.priceMax !== null || user.id !== null) && <OutlineButton onClick={onResetFilters}>
                Eliminar Filtros    
            </OutlineButton>} 
        </div>
    )
}
