import React from 'react'
import { useSale } from '../../../shared/hooks'
import { Pagination } from '../../../shared/components/pagination'

export const PaginationSales: React.FC = () => {
    const { pagination, onSetPage } = useSale()
    const { page, total, totalPages, itemsPerPage } = pagination

    return (
        <div className='flex flex-end items-center'>
            <Pagination
                itemsPerPage={itemsPerPage}
                onPageChange={onSetPage}
                page={page}
                total={total}
                totalPages={totalPages}
            />
        </div>
    )
}
