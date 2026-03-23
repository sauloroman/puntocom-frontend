import React from 'react'
import { useCategories } from '../../../../../shared/hooks'
import { Search } from '../../../../../shared/components/form'

export const SearchCategory: React.FC = () => {

    const { onSetFilterCategoriesByName } = useCategories()
    
    const onChange = ( categorySearched: string ) => {
        if ( categorySearched === '' ) return
        onSetFilterCategoriesByName(categorySearched)
    }

    return (
        <div className='w-full'>
            <Search 
                onChange={onChange} 
                placeholder='Buscar categoría por nombre' 
            />
        </div>
    )
}
