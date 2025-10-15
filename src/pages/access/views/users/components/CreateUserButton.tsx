import React from 'react'
import { CreateButton } from '../../../../../shared/components'
import { useModal } from '../../../../../shared/hooks'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'

export const CreateUserButton: React.FC = () => {

    const { onOpenConfirmAdminPassword } = useModal()

    const onConfirmPasswordModal = () => {
        onOpenConfirmAdminPassword(ModalNames.createUser)
    }

    return (
        <CreateButton 
            onClick={ onConfirmPasswordModal } 
            className='p-2 w-40' 
            text='Crear Usuario' 
        />
    )
}
