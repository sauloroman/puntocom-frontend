import React from 'react'
import { Roles } from '../../../../../interfaces/dto/user.interface'
import { useUsers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectUsersByRole: React.FC = () => {

    const {
        onSetFilterUsersByRole,
    } = useUsers()

    const onChange = (value: Roles | string) => {
        if ( value === 'Roles') return 
        onSetFilterUsersByRole(value as Roles)
    }

    return (
        <div className='w-full'>
            <Select
                onChange={onChange}
                placeholder='Roles'
                options={[
                    Roles.ADMINISTRADOR, 
                    Roles.SUPERVISOR, 
                    Roles.VENDEDOR
                ]}
            />
        </div>
    )
}
