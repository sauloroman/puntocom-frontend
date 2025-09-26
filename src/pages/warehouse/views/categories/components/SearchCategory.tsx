import React from 'react'
import { Search } from '../../../../../shared/components'
import { useCategories } from '../../../../../shared/hooks'

export const SearchCategory: React.FC = () => {

    const { onSetFilterStatus, onSearchCategory, onChangePaginationVisibility } = useCategories()

    const onChange = ( categorySearched: string ) => {
        onSearchCategory(categorySearched)
        
        if ( categorySearched === '') {
            onSetFilterStatus(null, true)
            onChangePaginationVisibility(true)
        } else {
            onSetFilterStatus(null, false)
            onChangePaginationVisibility(false)
        }
    }
        
    return (
        <div className='w-full'>
            <Search onChange={onChange} placeholder='Buscar categoría por nombre' />
        </div>
    )
}
