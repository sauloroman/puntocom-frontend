import React from 'react'
import { useSale } from '../../../shared/hooks'
import { ModalRangePrices } from '../../../shared/components/modal'

export const ModalSalesRangePrices: React.FC = () => {
    const { onSetFilterSalesByPriceRange } = useSale()
    
    return (
        <ModalRangePrices 
            onSetFilterPrices={ onSetFilterSalesByPriceRange }
        />
    )
}