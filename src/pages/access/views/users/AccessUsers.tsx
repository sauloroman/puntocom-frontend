import React, { useEffect, useState } from 'react'
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
    ToggleGridTableViewButton,
    FAB
} from '../../../../shared/components/button'
import { BsPlus, BsFileEarmarkText } from 'react-icons/bs'

export const AccessUsers: React.FC = () => {

    const { modalIsOpen, modalName, onOpenConfirmAdminPassword, onOpenModal } = useModal()
    const { users, getUsers, setTableStyle, isTableStyleActive, onOrderAlpha, isOrderedAsc } = useUsers()
    const { rightDrawerIsOpen, drawelName } = useDrawer()
    const [showFABMenu, setShowFABMenu] = useState(false)

    useEffect(() => {
        if (!users) getUsers()
    }, [])

    const openCreateUserModal = () => {
        onOpenModal(ModalNames.createUser)
        setShowFABMenu(false)
    }

    const openReportModal = () => {
        onOpenConfirmAdminPassword(ModalNames.createUsersReport)
        setShowFABMenu(false)
    }

    return (
        <>
            <section>
                <div className="flex flex-col gap-4 mb-6">
                    
                    <div className="w-full md:w-96">
                        <SearchUsers />
                    </div>

                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                        
                        <div className='flex flex-wrap items-center gap-2 flex-1'>
                            <ToggleGridTableViewButton onToggle={setTableStyle} status={isTableStyleActive} />
                            <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
                            
                            <div className="w-full sm:w-auto sm:min-w-[160px]">
                                <SelectUsersByStatus />
                            </div>
                            
                            <div className="w-full sm:w-auto sm:min-w-[160px]">
                                <SelectUsersByRole />
                            </div>
                        </div>

                        <div className='hidden md:flex items-center gap-3'>
                            <GenerateReportButton text='Generar Reporte' onClick={() => onOpenConfirmAdminPassword(ModalNames.createUsersReport)} />
                            <CreateUserButton />
                        </div>
                    </div>
                </div>

                { isTableStyleActive ? (<TableUsers data={users ?? []} />)  : (<UsersGrid data={users ?? []} />)}
                
                <PaginationUsers />
            </section>

            {showFABMenu && (
                <>
                    <div 
                        className="md:hidden fixed inset-0 bg-black/20 z-40"
                        onClick={() => setShowFABMenu(false)}
                    />
                    
                    <div className="md:hidden fixed bottom-24 right-6 flex flex-col gap-3 z-50">
                        <button
                            onClick={openReportModal}
                            className="flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
                        >
                            <BsFileEarmarkText size={20} />
                            <span className="text-sm font-medium pr-2">Generar Reporte</span>
                        </button>

                        <button
                            onClick={openCreateUserModal}
                            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
                        >
                            <BsPlus size={24} />
                            <span className="text-sm font-medium pr-2">Crear Usuario</span>
                        </button>
                    </div>
                </>
            )}

            <FAB onClick={() => setShowFABMenu(!showFABMenu)} />

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