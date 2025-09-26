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
        <div
            className='w-40'
            onClick={ onConfirmPasswordModal }
        >
            <CreateButton text='Crear Usuario' />
        </div>
    )
}
