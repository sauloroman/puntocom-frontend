import React from 'react'
import { Select } from './Select'
import { useSuppliers } from '../../hooks'
import { formatSupplierNames, getSupplierByFormattedName } from '../../helpers'

const DEFAULT_SUPPLIER = 'Proveedores'

interface Props {
    onResetFilter: () => void,
    onApplyFilter: ( supplierId: string, value: string ) => void 
}

export const SelectSupplierFilter: React.FC<Props> = ({ onApplyFilter, onResetFilter }) => {
    
    const { allSuppliers } = useSuppliers()
    if ( !allSuppliers ) return null
    const supplierNames = formatSupplierNames(allSuppliers)

    const selectSupplier = ( value: string ) => {
        if ( value === DEFAULT_SUPPLIER ) {
            onResetFilter()
            return
        }

        const supplier = getSupplierByFormattedName( allSuppliers, value )
        if (!supplier) return
        onApplyFilter(supplier.id, value)
    }

    return (
        <Select 
            onChange={selectSupplier}
            placeholder={DEFAULT_SUPPLIER}
            options={supplierNames}
        />
    )
}
