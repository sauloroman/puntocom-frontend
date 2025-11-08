import React from 'react'
import { IoCalendarNumberOutline } from "react-icons/io5";
import { OutlineButton } from '../../../shared/components/button/OutlineButton'
import { useModal } from '../../../shared/hooks';
import { ModalNames } from '../../../interfaces/ui/modal.interface';

export const ButtonFilterByDate: React.FC = () => {

    const { onOpenModal } = useModal()

    return (
        <OutlineButton onClick={() => onOpenModal(ModalNames.rangeDates)}>
            <IoCalendarNumberOutline size={20} />
            Fecha
        </OutlineButton>
    )
}
