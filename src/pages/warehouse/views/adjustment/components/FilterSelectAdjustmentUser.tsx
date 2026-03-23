import React from 'react'
import { useInventoryAdjustment, useUsers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

const placeholder = 'Usuarios'

export const FilterSelectAdjustmentUser: React.FC = () => {
    const { allUsers } = useUsers()

    const { onSetFilterAdjustmentUser } = useInventoryAdjustment()
    const userNames = allUsers?.map( user => `${user.name} ${user.lastname}`) ?? []

    const onSelectUser = ( value: string ) => {
        if ( value.trim() === placeholder ) return 

        const user = allUsers?.find( user => `${user.name} ${user.lastname}` === value )
        
        onSetFilterAdjustmentUser({
            id: user?.id!,
            name: user?.name!
        })
    }

    return (
        <Select 
            options={userNames}
            placeholder={placeholder}
            onChange={ onSelectUser }
        /> 
    )
}
