import React from 'react'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { useModal, useUsers } from '../../../../../shared/hooks'
import { SpinnerContainer } from '../../../../../shared/components'
import { FormEditUser, UploadUserImage } from './'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { DrawerInfoStatus } from '../../../../../shared/components/drawer/DrawerInfoStatus'
import { FaPlus } from "react-icons/fa6";

export const UserEditDrawer: React.FC = () => {
  const { isLoading, userSelected } = useUsers()
  const {onOpenModal} = useModal()

  const onOpenModalToConfirmChangeStatus = () => {
    onOpenModal(ModalNames.confirmChangeStatusUser)
  }
  
  
  return (
    <RightDrawerLayout title='Editar usuario' width='w-2xl'>
      <div className="p-4">
        {
          isLoading
          ? (<SpinnerContainer size='lg' color='border-indigo-700' />)
          : (
            <div className='space-y-3'>
              <FormEditUser />
              <div className='mt-10 space-y-3'>
                <h3 className='flex items-center gap-2 text-lg text-indigo-700 font-semibold'>
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
