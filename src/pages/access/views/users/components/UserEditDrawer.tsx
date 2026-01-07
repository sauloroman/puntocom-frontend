import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { RightDrawerLayout } from '../../../../../layouts'
import { useModal, useUsers, useTheme } from '../../../../../shared/hooks'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { DrawerInfoStatus } from '../../../../../shared/components/drawer'
import { SpinnerContainer } from '../../../../../shared/components/spinner'
import { FormEditUser, UploadUserImage } from './'

export const UserEditDrawer: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { isLoading, userSelected } = useUsers()
  const { onOpenModal } = useModal()

  const onOpenModalToConfirmChangeStatus = () => {
    onOpenModal(ModalNames.confirmChangeStatusUser)
  }
  
  return (
    <RightDrawerLayout title='Editar usuario' width='w-2xl'>
      <div className="p-4">
        {
          isLoading
            ? (<SpinnerContainer size='lg' color={isDark ? 'border-indigo-400' : 'border-indigo-700'} />)
            : (
              <div className='space-y-3'>
                <FormEditUser />
                <div className='mt-10 space-y-3'>
                  <h3 className={`
                    flex items-center gap-2 text-lg font-semibold transition-colors duration-200
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                  `}>
                    <FaPlus size={20} />
                    Más acciones
                  </h3>
                  <DrawerInfoStatus status={userSelected?.isActive!} onChangeStatus={onOpenModalToConfirmChangeStatus} />
                  <UploadUserImage />
                </div>
              </div>
            )
        }
      </div>
    </RightDrawerLayout>
  )
}