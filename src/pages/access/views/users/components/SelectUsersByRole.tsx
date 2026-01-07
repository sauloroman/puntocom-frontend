import React from 'react'
import { Roles } from '../../../../../interfaces/dto/user.interface'
import { useUsers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectUsersByRole: React.FC = () => {

    const {
        filter: { isVisible },
        filterUsersByRole,
        onChangePaginationVisibility,
        onSetFilterRole,
        getUsers
    } = useUsers()

    const onChange = ( value: Roles | string ) => {
        onChangePaginationVisibility(true)
        if ( value === 'Roles') {
            getUsers()
            onSetFilterRole(null, true)
            return
        }
        filterUsersByRole(value as Roles)
    }

    return (
        <>
        {
            isVisible && <Select
                onChange={onChange}
                placeholder='Roles'
                options={[Roles.ADMINISTRADOR, Roles.SUPERVISOR, Roles.VENDEDOR]}
            />
        }        
        </>
    )
}
