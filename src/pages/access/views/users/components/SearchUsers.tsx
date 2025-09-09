import React from 'react'
import { Search } from '../../../../../shared/components'
import { useUsers } from '../../../../../shared/hooks'

export const SearchUsers: React.FC = () => {

  const { onSearchUser, onSetFilterStatus, onSetFilterRole } = useUsers()

  const onChange = (userSearched: string) => {
    onSearchUser(userSearched)

    if (userSearched === '') {
      onSetFilterStatus(null, true)
      onSetFilterRole(null, true)
    } else {
      onSetFilterStatus(null, false)
      onSetFilterRole(null, false)
    }
  }

  return (
    <div className='w-full'>
      <Search onChange={onChange} placeholder='Busca usuarios por su nombre' />
    </div>
  )
}
