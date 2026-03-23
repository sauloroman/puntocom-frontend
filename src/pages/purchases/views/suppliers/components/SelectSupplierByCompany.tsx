import React from 'react'
import { useSuppliers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectSupplierByCompany: React.FC = () => {

    const { companies, onSetFilterSuppliersByCompany } = useSuppliers()

    const onChange = (company: string) => {
        if ( company === 'Empresas' ) return
        onSetFilterSuppliersByCompany(company)
    }

    return (
        <Select
            onChange={onChange}
            placeholder='Empresas'
            options={companies ?? []}
        />
    )
}
