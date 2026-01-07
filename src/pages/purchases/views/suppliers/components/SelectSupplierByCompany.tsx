import React from 'react'
import { useSuppliers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectSupplierByCompany: React.FC = () => {

    const {
        filter: { isVisible },
        filterSuppliersByCompany,
        onChangePaginationVisibility,
        onSetFilterCompanies,
        getSuppliers,
        companies
    } = useSuppliers()

    const onChange = (value: string) => {
        onChangePaginationVisibility(true)

        if (value === 'Empresas') {
            getSuppliers()
            onSetFilterCompanies(null, true)
            return
        }

        filterSuppliersByCompany(value)
    }

    return (
        <>
            {
                isVisible && <Select
                    onChange={onChange}
                    placeholder='Empresas'
                    options={companies ?? []}
                />
            }
        </>        
    )
}
