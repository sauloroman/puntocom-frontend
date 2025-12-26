import React from 'react'
import { Select } from './Select'
import { useUsers } from '../../hooks'
import { formatUserNames, getUserByFormattedName } from '../../helpers/format-user-names'

const DEFAULT_VALUE = 'Usuarios'

interface Props {
    onResetFilter: () => void,
    onApplyFilter: ( userId: string, value: string ) => void 
}

export const SelectUserFilter: React.FC<Props> = ({ onResetFilter, onApplyFilter }) => {
    
    const { users } = useUsers()
    if ( !users ) return null
    const userNames = formatUserNames(users)

    const selectUser = ( value: string ) => {
        if (value === DEFAULT_VALUE ) {
            onResetFilter()
            return
        }
        const user = getUserByFormattedName( users, value )
        if (!user) return
        onApplyFilter( user.id, value )
    }
    
    return (
        <Select 
            onChange={selectUser}
            placeholder={DEFAULT_VALUE}
            options={userNames}
        />
    )
}
