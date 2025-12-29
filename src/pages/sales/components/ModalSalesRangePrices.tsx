import React from 'react'
import { ModalRangePrices } from '../../../shared/components/modal/ModalRangePrice'
import { useSale } from '../../../shared/hooks'

export const ModalSalesRangePrices: React.FC = () => {
    const { onSetFilterPrices } = useSale()
    
    return (
        <ModalRangePrices 
            onSetFilterPrices={ onSetFilterPrices }
        />
    )
}