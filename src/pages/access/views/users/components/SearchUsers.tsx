import React from 'react'
import { Search } from '../../../../../shared/components/form'
import { useUsers } from '../../../../../shared/hooks'

export const SearchUsers: React.FC = () => {

  const { onSetFilterUsersByUserName } = useUsers()

  const onChange = (userSearched: string) => {
    if ( userSearched === '' ) return
    onSetFilterUsersByUserName(userSearched)
  }

  return (
    <div className='w-full'>
      <Search 
        onChange={onChange} 
        placeholder='Busca usuarios por su nombre' 
      />
    </div>
  )
}
