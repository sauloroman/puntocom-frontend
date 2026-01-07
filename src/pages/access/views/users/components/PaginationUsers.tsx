import React from 'react'
import { useUsers } from '../../../../../shared/hooks'
import { Pagination } from '../../../../../shared/components/pagination'

export const PaginationUsers: React.FC = () => {

    const { pagination, onSetPage, isPaginationVisible } = useUsers()
    const { page, total, totalPages, itemsPerPage } = pagination

    const onPageChange = (page: number) => {
        onSetPage(page)
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
