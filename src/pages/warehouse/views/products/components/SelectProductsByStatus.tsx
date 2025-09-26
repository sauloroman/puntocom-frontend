import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components'

export const SelectProductsByStatus: React.FC = () => {
    
    const { filter: { isVisible }, onChangePaginationVisibility, getProducts, onSetFilterStatus, filterProductsByStatus } = useProducts()
    
    const onChange = ( value: string ) => {
        onChangePaginationVisibility(true)
        if ( value === 'Estado' ) {
            getProducts()
            onSetFilterStatus(null, true)
            return
        }
        filterProductsByStatus( value === 'Activo' )
    }

    return (
        <>
            {
                isVisible && <Select 
                    onChange={ onChange }
                    placeholder='Estado'
                    options={['Activo', 'Inactivo']}
                />
            }
        </>
    )
}
