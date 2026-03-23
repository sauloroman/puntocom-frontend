import React from 'react'
import { Select } from '../../../../../shared/components/select'
import { useProducts, useSuppliers } from '../../../../../shared/hooks'

export const SelectProductsBySupplier: React.FC = () => {
    
    const { onSetFilterProductsBySupplier } = useProducts()
    const { activeSuppliers } = useSuppliers()
    if ( !activeSuppliers ) return null

    const suppliersName = activeSuppliers.map( s => `${s.name} ${s.lastname}`)

    const onChange = ( supplier: string ) => {
        if ( supplier === 'Proveedores' ) return

        const supplierId = activeSuppliers.find( s => `${s.name} ${s.lastname}` === supplier )?.id

        onSetFilterProductsBySupplier({
            id: supplierId!,
            name: supplier
        })
    }

    return (
        <div className='w-full'>
            <Select 
                placeholder='Proveedores'
                onChange={onChange}
                options={suppliersName}
            />
        </div>
    )
}
