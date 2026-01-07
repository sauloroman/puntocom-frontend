import React from 'react'
import { useSale } from '../../../shared/hooks'
import { ModalRangePrices } from '../../../shared/components/modal'

export const ModalSalesRangePrices: React.FC = () => {
    const { onSetFilterPrices } = useSale()
    
    return (
        <ModalRangePrices 
            onSetFilterPrices={ onSetFilterPrices }
        />
    )
}