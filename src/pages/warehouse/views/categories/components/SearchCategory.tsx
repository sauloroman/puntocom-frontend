import React from 'react'
import { useCategories } from '../../../../../shared/hooks'
import { Search } from '../../../../../shared/components/form'

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
