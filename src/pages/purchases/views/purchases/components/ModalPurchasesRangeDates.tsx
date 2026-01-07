import React from 'react'
import { ModalRangeDates } from '../../../../../shared/components/modal'
import { usePurchase } from '../../../../../shared/hooks'

export const ModalPurchasesRangeDates: React.FC = () => {
  const { onSetFilterPurchasesByDateRange } = usePurchase()
  return (
    <ModalRangeDates 
        onSetFilterDates={onSetFilterPurchasesByDateRange}
    />
  )
}
