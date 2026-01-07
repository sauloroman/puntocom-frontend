import React from 'react'
import { Pagination } from '../../../shared/components/pagination'
import { usePos } from '../../../shared/hooks'

export const PaginationPos: React.FC = () => {

    const { pagination: { itemsPerPage, page, total, totalPages } } = usePos()

    return (
        <div className='flex flex-end items-center'>
            <Pagination
                className='border-t-0'
                itemsPerPage={itemsPerPage}
                onPageChange={() => {}}
                page={page}
                total={total}
                totalPages={totalPages}
            />
        </div>
    )
}
