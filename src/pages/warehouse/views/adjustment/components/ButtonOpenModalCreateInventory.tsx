import React from 'react'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { useModal } from '../../../../../shared/hooks'
import { CreateButton } from '../../../../../shared/components/button'

export const ButtonOpenModalCreateInventory: React.FC = () => {
    const { onOpenModal } = useModal()
    return (
        <CreateButton 
            onClick={ () => onOpenModal(ModalNames.createInventoryAdjustment) }
            className='w-40 p-2' 
            text='Crear Ajuste' 
        />
    )
}
