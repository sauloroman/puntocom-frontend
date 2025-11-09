import React from 'react'
import { CreateButton } from '../../../../../shared/components'
import { useModal } from '../../../../../shared/hooks'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'

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
