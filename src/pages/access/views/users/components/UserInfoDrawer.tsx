import React from 'react'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { useModal, useUsers } from '../../../../../shared/hooks'
import { AvatarInitialSquare } from '../../../../../shared/components/avatar/AvatarInitialSquare'
import type { User } from '../../../../../interfaces/user.interface'
import { StatusBadge } from '../../../../../shared/components/badgets/StatusBadge'
import { UploadUserImage, UserRoleTag, UserValidateTag } from './'
import { AvatarImage, SpinnerContainer } from '../../../../../shared/components'
import { DrawerInfoStatus } from '../../../../../shared/components/drawer/DrawerInfoStatus'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'

export const UserInfoDrawer: React.FC = () => {

  const { onOpenModal } = useModal()
  const { userSelected, isLoading } = useUsers()
  const { name, lastname, isActive, role, isValidated, id, email, createdAt, updatedAt, image } = userSelected as User

  const onOpenModalToConfirmChangeStatus = () => {
    onOpenModal(ModalNames.confirmChangeStatusUser)
  }

  return (
    <RightDrawerLayout title='Información de usuario' width='w-2xl'>
      <div className="p-4 flex items-center gap-4 mb-6">

        <div className="flex items-center gap-4 mb-6">
          {
            image === 'Usuario sin imagen'
              ? <AvatarInitialSquare name={name} />
              : <AvatarImage image={image} alt={name} />
          }
          <div>
            <h3 className='font-semibold text-xl mb-2'>{name} {lastname}</h3>
            <div className='flex gap-3'>
              <StatusBadge status={isActive} />
              <UserRoleTag role={role} />
              <UserValidateTag isValidated={isValidated} />
            </div>
          </div>
        </div>

      </div>

      <div className="px-4 space-y-3 text-sm text-gray-600 mb-10">
        <p><span className="font-medium text-gray-800">#Id: </span>{id}</p>
        <p><span className="font-medium text-gray-800">Nombre: </span>{name} {lastname}</p>
        <p><span className="font-medium text-gray-800">Email: </span>{email}</p>
        <p><span className="font-medium text-gray-800">Fecha de creación: </span>{createdAt}</p>
        <p><span className="font-medium text-gray-800">Última actualización: </span>{updatedAt}</p>
      </div>

      <div className="w-full mb-4">
        {
          isLoading
          ? (<SpinnerContainer color='bg-white' size='lg' />)
          : (
            <div className="space-y-3">
              <DrawerInfoStatus status={isActive} onChangeStatus={onOpenModalToConfirmChangeStatus} />
              <UploadUserImage />
            </div>
          ) 
        }
      </div>
    </RightDrawerLayout>
  )
}
