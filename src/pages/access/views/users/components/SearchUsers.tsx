import React, { useEffect, useRef } from 'react'
import { Search } from '../../../../../shared/components/form'
import { useUsers } from '../../../../../shared/hooks'

export const SearchUsers: React.FC = () => {

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { 
    filter,
    onSetFilterUsersByUserName
  } = useUsers()

  const onChange = (userSearched: string) => {
    if ( userSearched === '' ) return
    onSetFilterUsersByUserName(userSearched)
  }

  useEffect(() => {
    if (filter.userName === null && inputRef.current) {
      inputRef.current.value = ''
    }
  }, [filter.userName])

  return (
    <div className='w-full'>
      <Search 
        ref={inputRef}
        onChange={onChange} 
        placeholder='Busca usuarios por su nombre' 
      />
    </div>
  )
}
