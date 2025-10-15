import React from 'react'
import { Pagination } from '../../../shared/components'
import { usePos } from '../../../shared/hooks/usePos'

export const PaginationPos: React.FC = () => {

    const { pagination: { itemsPerPage, page, total, totalPages } } = usePos()

    const onPageChange = () => {

    }

    return (
        <div className='flex flex-end items-center'>
            <Pagination
                className='border-t-0'
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
                page={page}
                total={total}
                totalPages={totalPages}
            />
        </div>
    )
}
