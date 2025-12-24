import React from 'react'
import { useSale } from '../../../shared/hooks'
import { Pagination } from '../../../shared/components'

export const PaginationSales: React.FC = () => {

    const { pagination, isPaginationVisible, onSetPage } = useSale()
    const { page, total, totalPages, itemsPerPage } = pagination

    return (
        <div className='flex flex-end items-center'>
            {
                isPaginationVisible && 
                <Pagination 
                    itemsPerPage={itemsPerPage}
                    onPageChange={page => onSetPage( page )}
                    page={page}
                    total={total}
                    totalPages={totalPages}
                />
            }
        </div>
    )
}
