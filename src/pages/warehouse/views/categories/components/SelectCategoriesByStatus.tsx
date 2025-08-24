import React from 'react'
import { Select } from '../../../../../shared/components'
import { useCategories } from '../../../../../shared/hooks'

export const SelectCategoriesByStatus: React.FC = () => {

    const { filterCategoriesByStatus, getCategories, onSetFilterStatus } = useCategories()

    const onChange = (value: string) => {
        if ( value === 'Estado' ) {
            getCategories()
            onSetFilterStatus(null)
            return
        }
        filterCategoriesByStatus( value === 'Activo' )
    }

    return (
        <div>
            <Select
                onChange={onChange}
                placeholder='Estado'
                options={['Activo', 'Inactivo']}
            />
        </div>
    )
}
