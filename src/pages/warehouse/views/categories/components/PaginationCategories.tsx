import React from 'react'
import { Pagination } from '../../../../../shared/components'
import { useCategories } from '../../../../../shared/hooks'

export const PaginationCategories: React.FC = () => {
    
    const { pagination, onSetPage } = useCategories()
    const { page, total, totalPages } = pagination

    const onPageChange = ( page: number ) => {
        onSetPage(page)
    }

    return (
        <div className='flex flex-end items-center'>
            <Pagination 
                onPageChange={onPageChange}  
                page={page} 
                total={total} 
                totalPages={totalPages} 
            />
        </div>
    )
}
