import React from 'react'
import { useModal, useUsers } from '../../../../../shared/hooks'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { CreateButton } from '../../../../../shared/components'

export const CreateUserButton: React.FC = () => {
    const { onOpenModal } = useModal()
    const { resetConfirmAdminPasswordStatus } = useUsers()

    const onOpenConfirmAdminPass = () => {
        resetConfirmAdminPasswordStatus()
        onOpenModal(ModalNames.confirmCreateUser)
    }

    return (
        <div
            className='w-40'
            onClick={onOpenConfirmAdminPass}
        >

            <CreateButton text='Crear Usuario' />
        </div>
    )
}
