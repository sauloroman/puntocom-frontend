import React from 'react'
import { useSuppliers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components'

export const SelectSupplierByCompany: React.FC = () => {

    const { companies } = useSuppliers()

    const onChange = () => {

    }

    return (
        <div>
            <Select 
                onChange={onChange}
                placeholder='Empresas'
                options={companies ?? []}
            />
        </div>
    )
}
