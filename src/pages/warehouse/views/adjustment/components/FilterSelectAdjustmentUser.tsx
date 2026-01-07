import React from 'react'
import { useInventoryAdjustment, useUsers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

const placeholder = 'Usuarios'

export const FilterSelectAdjustmentUser: React.FC = () => {
    const { users } = useUsers()
    const { getInventoryAdjustments, onSetFilterAdjustmentUser } = useInventoryAdjustment()
    const userNames = users?.map( user => `${user.name} ${user.lastname}`) ?? []

    const onSelectUser = ( value: string ) => {
        if ( value.trim() === placeholder ) {
            getInventoryAdjustments()
            onSetFilterAdjustmentUser(null)
            return
        }

        const user = users?.find( user => `${user.name} ${user.lastname}` === value )
        onSetFilterAdjustmentUser( user?.id ?? '')
    }

    return (
        <Select 
            options={userNames}
            placeholder={placeholder}
            onChange={ onSelectUser }
        /> 
    )
}
