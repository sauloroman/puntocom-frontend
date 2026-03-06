import React from 'react'
import { useUsers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectUsersByStatus: React.FC = () => {
    
    const {onSetFilterUsersByStatus} = useUsers()
    
    const onChange = ( status: string ) => {
        if ( status === 'Estado' ) return
       onSetFilterUsersByStatus(status)
    }

    return (
        <div className='w-full'>
           <Select 
                onChange={ onChange }
                placeholder='Estado'
                options={['Activo', 'Inactivo']}
            />
        </div>
    )
}
