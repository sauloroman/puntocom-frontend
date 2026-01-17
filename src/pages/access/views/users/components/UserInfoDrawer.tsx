import React from 'react'
import type { Roles, User } from '../../../../../interfaces/dto/user.interface'
import { RightDrawerLayout } from '../../../../../layouts'
import { useUsers, useTheme } from '../../../../../shared/hooks'
import { StatusBadge } from '../../../../../shared/components/badgets'
import { AvatarImage, AvatarInitialSquare } from '../../../../../shared/components/avatar'
import { UserRoleTag, UserValidateTag } from './'

export const UserInfoDrawer: React.FC = () => {

  const { userSelected } = useUsers()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const { name, lastname, isActive, role, isValidated, id, email, phone, createdAt, updatedAt, image } = userSelected as User

  return (
    <RightDrawerLayout title='Información de usuario' width='w-2xl'>
      <div className="p-4 flex items-center gap-4 mb-6">

        <div className="flex items-center gap-4">
          {
            image === 'Usuario sin imagen'
              ? <AvatarInitialSquare name={name} />
              : <AvatarImage image={image} alt={name} />
          }
          <div>
            <h3 className={`font-semibold text-xl mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {name} {lastname}
            </h3>
            <div className='flex gap-3'>
              <StatusBadge status={isActive} />
              <UserRoleTag role={role as Roles} />
              <UserValidateTag isValidated={isValidated} />
            </div>
          </div>
        </div>

      </div>

      <div className={`px-4 space-y-3 text-md mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>#Id: </span>
          {id}
        </p>
        <p>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Nombre: </span>
          {name} {lastname}
        </p>
        <p>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Email: </span>
          {email}
        </p>
        <p>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Teléfono: </span>
          {phone}
        </p>
        <p>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Fecha de creación: </span>
          {createdAt}
        </p>
        <p>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Última actualización: </span>
          {updatedAt}
        </p>
      </div>
    </RightDrawerLayout>
  )
}