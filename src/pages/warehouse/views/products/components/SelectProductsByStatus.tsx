import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectProductsByStatus: React.FC = () => {

    const { onSetFilterProductsByStatus } = useProducts()

    const onChange = (value: string) => {
        if (value === 'Estado') return
        onSetFilterProductsByStatus(value)
    }

    return (
        <Select
            onChange={onChange}
            placeholder='Estado'
            options={['Activo', 'Inactivo']}
        />
    )
}
