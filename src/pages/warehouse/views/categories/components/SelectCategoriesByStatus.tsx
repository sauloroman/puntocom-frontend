import React from 'react'
import { Select } from '../../../../../shared/components'
import { useCategories } from '../../../../../shared/hooks'

export const SelectCategoriesByStatus: React.FC = () => {

    const { filter: { isVisible }, filterCategoriesByStatus, getCategories, onSetFilterStatus, onChangePaginationVisibility } = useCategories()

    const onChange = (value: string) => {
        onChangePaginationVisibility(true)
        if ( value === 'Estado' ) {
            getCategories()
            onSetFilterStatus(null, true)
            return
        }
        filterCategoriesByStatus( value === 'Activo' )
    }

    return (
        <>
            {
                isVisible && <Select
                    onChange={onChange}
                    placeholder='Estado'
                    options={['Activo', 'Inactivo']}
                /> 
            }
        </>
    )
}
