import React from 'react'
import { Search } from '../../../../../shared/components'
import { useProducts } from '../../../../../shared/hooks'

export const SearchProduct: React.FC = () => {
    
    const { onSearchProduct, onSetFilterStatus, onSetFilterCategory } = useProducts()

    const onChange = ( productSearched: string ) => {
        onSearchProduct(productSearched)

        if ( productSearched === '' ) {
            onSetFilterStatus(null, true)
            onSetFilterCategory(null, null, true)
        } else {
            onSetFilterStatus(null, false)
            onSetFilterCategory(null, null, false)
        }
    }

    return (
        <div className='w-full'>
            <Search onChange={ onChange } placeholder='Buscar producto por nombre' />
        </div>
    )
}
