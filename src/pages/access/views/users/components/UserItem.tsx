import React from 'react'
import type { Roles, User } from '../../../../../interfaces/user.interface'
import { UserRoleTag } from './UserRoleTag'
import { UserValidateTag } from './UserValidateTag'
import { AvatarInitial } from '../../../../../shared/components'
import { useDrawer, useUsers } from '../../../../../shared/hooks'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'
import { CgDetailsMore } from 'react-icons/cg'
import { CiEdit } from 'react-icons/ci'

interface UserItemButtonsProps {
  userId: string
}

export const UserItemButtons: React.FC<UserItemButtonsProps> = ({ userId }) => {

  const { onOpenRightDrawer } = useDrawer()
  const { onSelectUser } = useUsers()

  const onSelect = () => {
    onSelectUser(userId)
    onOpenRightDrawer(DrawelNames.infoUser)
  }

  const onEdit = () => {
    onSelectUser(userId)
    onOpenRightDrawer(DrawelNames.editUser)
  }

  return (
    <div className='flex items-center gap-3'>
      <button onClick={onSelect} className="cursor-pointer border border-gray-300 p-2 rounded-lg"><CgDetailsMore size={13} /></button>
      <button onClick={onEdit} className="cursor-pointer border border-gray-300 p-2 rounded-lg"><CiEdit size={13} /></button>
    </div>
  )
}

interface UserItemProps {
  user: User
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">

        {
          user.image !== 'Usuario sin imagen'
            ? (
              <img
                src={user.image}
                alt={`${user.name} ${user.lastname}`}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
            )
            : (<div className='w-12 h-12'><AvatarInitial initial={user.name[0]} /></div>)
        }

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {user.name} {user.lastname}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>

          <div className="mt-2 flex gap-2">
            <UserRoleTag role={user.role as Roles} />
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-md ${user.isActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                }`}
            >
              {user.isActive ? 'Activo' : 'Inactivo'}
            </span>
            <UserValidateTag isValidated={user.isValidated} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col text-xs text-gray-400">
        <span>Creado: {new Date(user.createdAt).toLocaleDateString()}</span>
        <span>Actualizado: {new Date(user.updatedAt).toLocaleDateString()}</span>
      </div>

      <div className='flex justify-end'>
        <UserItemButtons userId={user.id} />
      </div>
    </div>
  )
}
