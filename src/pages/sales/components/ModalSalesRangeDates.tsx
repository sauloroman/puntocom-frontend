import React from 'react'
import { useSale } from '../../../shared/hooks'
import { ModalRangeDates } from '../../../shared/components/modal/ModalRangeDates'

export const ModalSalesRangeDates: React.FC = () => {

    const { onSetFilterDates } = useSale()

    return (
        <ModalRangeDates 
            onSetFilterDates={onSetFilterDates}
        />
    )
}