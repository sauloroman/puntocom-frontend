import React from 'react'
import type { User } from '../../../../../interfaces/user.interface'
import { UserItem } from './UserItem'

interface UsersGridProps {
    data: User[]
}

export const UsersGrid: React.FC<UsersGridProps> = ({ data }) => {
  return (
    <ul className='grid grid-cols-3 gap-5 py-2 pb-10'>
        {
            data.map( user => (
                <UserItem key={user.id} user={user} />
            ))
        }
    </ul>
  )
}
