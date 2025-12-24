import React from 'react'
import { usePurchase } from '../../../../../shared/hooks'
import { Pagination } from '../../../../../shared/components'

export const PaginationPurchases: React.FC = () => {

    const { purchasesPagination, isPurchasesPaginationVisible, onSetPagePurchasesPagination } = usePurchase()
    const { page, total, totalPages, itemsPerPage } = purchasesPagination

    return (
        <div className='flex flex-end items-center'>
            {
                isPurchasesPaginationVisible &&
                <Pagination 
                    itemsPerPage={itemsPerPage}
                    onPageChange={page => onSetPagePurchasesPagination(page)}
                    page={page}
                    total={total}
                    totalPages={totalPages}
                />
            }
        </div>
    )
}
