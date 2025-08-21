import React, { useMemo } from 'react'
import { UserPhoto } from './UserPhoto'
import { useAuth } from '../../hooks'
import { UserRoleTag } from './UserRoleTag'
import { Roles } from '../../../interfaces/user.interface'

export const UserWidget: React.FC = () => {
    
    const { user } = useAuth()
    const {  image, name, role } = user!

    const roleType = useMemo(() => 
        role === 'Administrador'
        ? Roles.ADMINISTRADOR
        : role === 'Supervisor'
        ? Roles.SUPERVISOR
        : Roles.VENDEDOR
    , [role])

    return (
        <div className='flex gap-3 items-center'>
            <UserPhoto  
                image={ image }
                usernameInitial={name[0]}
            />
            <div className='flex flex-col text-sm'>
                <p className='text-gray-500 px-2 pb-1 font-semibold'>{name}</p>
                <UserRoleTag role={roleType!} />
            </div>
        </div>
    )
}
