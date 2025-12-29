import React from 'react'
import { OutlineButton } from '../../../shared/components/button/OutlineButton'
import { CiFilter } from 'react-icons/ci'
import { useModal } from '../../../shared/hooks'
import { ModalNames } from '../../../interfaces/ui/modal.interface'

interface Props {
    modal: ModalNames
}

export const ButtonFilterByPrice: React.FC<Props> = ({ modal }) => {
    const { onOpenModal } = useModal() 

    return (
        <OutlineButton onClick={() => onOpenModal(modal)}>
            <CiFilter size={20} />
            Precio
        </OutlineButton>
    )
}
