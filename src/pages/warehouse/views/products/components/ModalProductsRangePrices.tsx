import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { ModalRangePrices } from '../../../../../shared/components/modal'

export const ModalProductsRangePrices: React.FC = () => {
    const { onSetFilterProductsByPrice } = useProducts()

    return (
        <ModalRangePrices 
            onSetFilterPrices={onSetFilterProductsByPrice}
        />
    )
}
