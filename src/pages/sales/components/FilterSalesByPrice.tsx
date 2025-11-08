import React from 'react'
import { OutlineButton } from '../../../shared/components/button/OutlineButton'
import { CiFilter } from 'react-icons/ci'
import { useModal } from '../../../shared/hooks'
import { ModalNames } from '../../../interfaces/ui/modal.interface'

export const FilterSalesByPrice: React.FC = () => {
    const { onOpenModal } = useModal() 

    return (
        <OutlineButton onClick={() => onOpenModal(ModalNames.rangePrices)}>
            <CiFilter size={20} />
            Precio
        </OutlineButton>
    )
}
