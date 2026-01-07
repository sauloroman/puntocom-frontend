import React from 'react'
import { useInventoryAdjustment } from '../../../../../shared/hooks'
import { Pagination } from '../../../../../shared/components/pagination'

export const PaginationAdjustments: React.FC = () => {
    const { pagination, onSetPage } = useInventoryAdjustment()
    const { itemsPerPage, page, total, totalPages } = pagination

    const onPageChange = ( page: number ) => {
        if ( page < 0 ) return
        onSetPage(page)
    }

    return (
        <Pagination 
            onPageChange={onPageChange}
            itemsPerPage={ itemsPerPage }
            total={total}
            page={page}
            totalPages={totalPages}
        />
    )
}
