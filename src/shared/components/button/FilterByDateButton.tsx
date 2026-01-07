import React from 'react'
import { IoCalendarNumberOutline } from "react-icons/io5";
import { OutlineButton } from './OutlineButton'
import { useModal } from '../../hooks';
import { ModalNames } from '../../../interfaces/ui/modal.interface';

interface Props {
    modal: ModalNames
}

export const FilterByDateButton: React.FC<Props> = ({ modal }) => {

    const { onOpenModal } = useModal()

    return (
        <OutlineButton onClick={() => onOpenModal(modal)}>
            <IoCalendarNumberOutline size={20} />
            Fecha
        </OutlineButton>
    )
}
