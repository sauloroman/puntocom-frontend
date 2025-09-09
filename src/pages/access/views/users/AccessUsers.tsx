import React, { useEffect } from 'react'
import { useModal, useUsers } from '../../../../shared/hooks'
import { CreateUserButton, ModalRequestPasswordAdmin, PaginationUsers, SearchUsers, SelectUsersByRole, SelectUsersByStatus, TableUsers } from './components'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { ModalCreateUser } from './components/ModalCreateUser'
import { SpinnerContainer } from '../../../../shared/components'
import { ModalEmailSentToUser } from './components/ModalEmailSentToUser'

export const AccessUsers: React.FC = () => {

    const { modalIsOpen, modalName } = useModal()
    const { users, getUsers, isLoading } = useUsers()

    useEffect(() => {
        if (!users) getUsers()
    }, [])

    return (
        <>
            <section>
                <div className="flex items-center justify-between mb-7">
                    <SearchUsers />
                    <div className='flex items-center gap-5'>
                        <div className="flex items-center gap-4">
                            <SelectUsersByStatus />
                            <SelectUsersByRole />
                        </div>
                        <CreateUserButton />
                    </div>
                </div>

                {
                    isLoading
                        ? <SpinnerContainer color='bg-white' size='lg' />
                        : <TableUsers data={users ?? []} />
                }
                <PaginationUsers />
            </section>
            {modalIsOpen && modalName === ModalNames.confirmCreateUser && <ModalRequestPasswordAdmin />}
            {modalIsOpen && modalName === ModalNames.createUser && <ModalCreateUser />}
            {modalIsOpen && modalName === ModalNames.emailSentToUser && <ModalEmailSentToUser />}
        </>
    )
}
