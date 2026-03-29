import React from 'react'
import { Select } from './Select'
import { useUsers } from '../../hooks'
import { formatUserNames, getUserByFormattedName } from '../../helpers/format-user-names'

const DEFAULT_VALUE = 'Usuarios'

interface Props {
    onApplyFilter: ( userId: string, value: string ) => void 
    onResetFilter?: () => void,
}

export const SelectUserFilter: React.FC<Props> = ({ onApplyFilter }) => {
    
    const { allUsers } = useUsers()
    if ( !allUsers ) return null
    const userNames = formatUserNames(allUsers)

    const selectUser = ( value: string ) => {
        if (value === DEFAULT_VALUE ) return

        const user = getUserByFormattedName( allUsers, value )
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
