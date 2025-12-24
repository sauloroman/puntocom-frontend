import React, { useEffect } from 'react'
import { usePurchase, useSuppliers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components'

export const SelectSupplier: React.FC = () => {
    const { allSuppliers, getAllSuppliers } = useSuppliers()
    const { onSetSupplierSelected } = usePurchase()

    if ( !allSuppliers) return null 

    const suppliersName = allSuppliers.map( supp => `${supp.name} ${supp.lastname} - ${supp.company}` )

    useEffect(() => {
        getAllSuppliers()
    }, [])

    const onSelectSupplier = ( value: string ) => {
        const supplier = allSuppliers.find( supp => value === `${supp.name} ${supp.lastname} - ${supp.company}`)
        if ( !supplier ) return null
        onSetSupplierSelected(supplier.id)
    }

    return (
        <Select 
            options={suppliersName}
            placeholder='Selecciona un proveedor'
            onChange={onSelectSupplier}
        />
    )
}
