import React from 'react'
import { Pagination } from '../../../../../shared/components'
import { useInventoryAdjustment } from '../../../../../shared/hooks'

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
