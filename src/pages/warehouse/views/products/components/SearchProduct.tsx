import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { Search } from '../../../../../shared/components/form'

export const SearchProduct: React.FC = () => {
    
    const { onSetFilterProductsByName } = useProducts()

    const onChange = ( productSearched: string ) => {
        if ( productSearched === '' ) return
        onSetFilterProductsByName( productSearched )
    }

    return (
        <div className='w-full'>
            <Search onChange={ onChange } 
            placeholder='Buscar producto por nombre' />
        </div>
    )
}
