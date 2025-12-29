import React from 'react'
import { IoCalendarNumberOutline } from "react-icons/io5";
import { OutlineButton } from '../../../shared/components/button/OutlineButton'
import { useModal } from '../../../shared/hooks';
import { ModalNames } from '../../../interfaces/ui/modal.interface';

interface Props {
    modal: ModalNames
}

export const ButtonFilterByDate: React.FC<Props> = ({ modal }) => {

    const { onOpenModal } = useModal()

    return (
        <OutlineButton onClick={() => onOpenModal(modal)}>
            <IoCalendarNumberOutline size={20} />
            Fecha
        </OutlineButton>
    )
}
