import React from 'react'
import { ModalRangePrices } from '../../../../../shared/components/modal'
import { usePurchase } from '../../../../../shared/hooks'

export const ModalPurchasesRangePrices: React.FC = () => {
  const { onSetFilterPurchasesByPriceRange } = usePurchase()
  return (
    <ModalRangePrices 
      onSetFilterPrices={onSetFilterPurchasesByPriceRange}
    />
  )
}
