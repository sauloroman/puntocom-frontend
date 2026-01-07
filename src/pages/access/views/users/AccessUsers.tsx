import React, { useEffect } from 'react'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { 
    useDrawer, 
    useModal, 
    useUsers 
} from '../../../../shared/hooks'
import { 
    CreateUserButton, 
    ModalConfirmChangeStatusUser, 
    ModalConfirmGenerateUsersReport, 
    ModalEmailSentToUser,
    ModalRequestPasswordAdmin, 
    ModalCreateUser,
    PaginationUsers, 
    SearchUsers, 
    SelectUsersByRole, 
    SelectUsersByStatus, 
    TableUsers, 
    UserEditDrawer, 
    UserInfoDrawer, 
    UsersGrid 
} from './components'
import {  
    GenerateReportButton, 
    SortElementsAlphaButton, 
    ToggleGridTableViewButton 
} from '../../../../shared/components/button'

export const AccessUsers: React.FC = () => {

    const { modalIsOpen, modalName, onOpenConfirmAdminPassword } = useModal()
    const { users, getUsers, setTableStyle, isTableStyleActive, onOrderAlpha, isOrderedAsc } = useUsers()
    const { rightDrawerIsOpen, drawelName } = useDrawer()

    useEffect(() => {
        if (!users) getUsers()
    }, [])

    return (
        <>
            <section>
                <div className="flex items-center justify-between mb-7">
                    <div className="w-96"><SearchUsers /></div>
                    <div className='flex items-center gap-5'>
                        <div className="flex items-center gap-4">
                            <ToggleGridTableViewButton onToggle={setTableStyle} status={isTableStyleActive} />
                            <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
                            <div className="w-50">
                                <SelectUsersByStatus />
                            </div>
                            <div className="w-50">
                                <SelectUsersByRole />
                            </div>
                        </div>
                        <GenerateReportButton text='Generar Reporte' onClick={() => onOpenConfirmAdminPassword(ModalNames.createUsersReport)} />
                        <CreateUserButton />
                    </div>
                </div>

                { isTableStyleActive ? (<TableUsers data={users ?? []} />)  : (<UsersGrid data={users ?? []} />)}
                
                <PaginationUsers />
            </section>
            {modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
            {modalIsOpen && modalName === ModalNames.createUser && <ModalCreateUser />}
            {modalIsOpen && modalName === ModalNames.createUsersReport && <ModalConfirmGenerateUsersReport />}
            {modalIsOpen && modalName === ModalNames.emailSentToUser && <ModalEmailSentToUser />}
            {modalIsOpen && modalName === ModalNames.confirmChangeStatusUser && <ModalConfirmChangeStatusUser />}
            {rightDrawerIsOpen && drawelName === DrawelNames.infoUser && <UserInfoDrawer />}
            {rightDrawerIsOpen && drawelName === DrawelNames.editUser && <UserEditDrawer />}
        </>
    )
}
