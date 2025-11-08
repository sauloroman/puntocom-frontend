import React from 'react'
import { useSale } from '../../../shared/hooks'
import { Pagination } from '../../../shared/components'

export const PaginationSales: React.FC = () => {

    const { pagination, isPaginationVisible, onSetPage } = useSale()
    const { page, total, totalPages, itemsPerPage } = pagination

    const onPageChange = ( page: number ) => {
        console.log({page})
        onSetPage( page )
    }   

    return (
        <div className='flex flex-end items-center'>
            {
                isPaginationVisible && 
                <Pagination 
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    page={page}
                    total={total}
                    totalPages={totalPages}
                />
            }
        </div>
    )
}
