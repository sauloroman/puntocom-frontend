import React from 'react'
import { useSale } from '../../../shared/hooks'
import { ModalRangeDates } from '../../../shared/components/modal'

export const ModalSalesRangeDates: React.FC = () => {

    const { onSetFilterSalesByDateRange } = useSale()

    return (
        <ModalRangeDates 
            onSetFilterDates={onSetFilterSalesByDateRange}
        />
    )
}