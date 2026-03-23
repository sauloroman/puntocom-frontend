import React from 'react'
import { useCategories } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectCategoriesByStatus: React.FC = () => {

    const { onSetFilterCategoriesByStatus } = useCategories()

    const onChange = (status: string) => {
        if (status === 'Estado') return
        onSetFilterCategoriesByStatus(status)
    }

    return (
        <Select
            onChange={onChange}
            placeholder='Estado'
            options={['Activo', 'Inactivo']}
        />
    )
}
