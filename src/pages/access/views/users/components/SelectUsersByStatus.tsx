import React from 'react'
import { useUsers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectUsersByStatus: React.FC = () => {
    
    const { 
        filter: { isVisible },
        filterUsersByStatus,
        getUsers,
        onSetFilterStatus,
        onChangePaginationVisibility
    } = useUsers()
    
    const onChange = ( value: string ) => {
        onChangePaginationVisibility(true)
        if ( value === 'Estado') {
            getUsers()
            onSetFilterStatus(null, true)
            return
        }
        filterUsersByStatus(value === 'Activo')
    }

    return (
        <>
            {
                isVisible && <Select 
                    onChange={ onChange }
                    placeholder='Estado'
                    options={['Activo', 'Inactivo']}
                />
            }
        </>
    )
}
