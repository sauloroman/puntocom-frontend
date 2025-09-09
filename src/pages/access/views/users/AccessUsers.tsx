import React, { useEffect } from 'react'
import { useDrawer, useModal, useUsers } from '../../../../shared/hooks'
import { CreateUserButton, ModalConfirmChangeStatusUser, ModalRequestPasswordAdmin, PaginationUsers, SearchUsers, SelectUsersByRole, SelectUsersByStatus, TableUsers, UserEditDrawer, UserInfoDrawer, UsersGrid } from './components'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { ModalCreateUser } from './components/ModalCreateUser'
import { ModalEmailSentToUser } from './components/ModalEmailSentToUser'
import { SortElementsAlpha, ToggleGridTableView } from '../../../../shared/components/button'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'

export const AccessUsers: React.FC = () => {

    const { modalIsOpen, modalName } = useModal()
    const { users, getUsers, setTableStyle, isTableStyleActive, onOrderAlpha, isOrderedAsc } = useUsers()
    const { rightDrawerIsOpen, drawelName } = useDrawer()

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
                            <ToggleGridTableView onToggle={setTableStyle} status={isTableStyleActive} />
                            <SortElementsAlpha onToggle={onOrderAlpha} desc={isOrderedAsc} />
                            <SelectUsersByStatus />
                            <SelectUsersByRole />
                        </div>
                        <CreateUserButton />
                    </div>
                </div>

                {
                    isTableStyleActive
                    ? (<TableUsers data={users ?? []} />) 
                    : (<UsersGrid data={users ?? []} />)
                }
                
                <PaginationUsers />
            </section>
            {modalIsOpen && modalName === ModalNames.confirmCreateUser && <ModalRequestPasswordAdmin />}
            {modalIsOpen && modalName === ModalNames.createUser && <ModalCreateUser />}
            {modalIsOpen && modalName === ModalNames.emailSentToUser && <ModalEmailSentToUser />}
            {modalIsOpen && modalName === ModalNames.confirmChangeStatusUser && <ModalConfirmChangeStatusUser />}
            {rightDrawerIsOpen && drawelName === DrawelNames.infoUser && <UserInfoDrawer />}
            {rightDrawerIsOpen && drawelName === DrawelNames.editUser && <UserEditDrawer />}
        </>
    )
}
