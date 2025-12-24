import React from 'react'
import { usePurchase } from '../../../../../shared/hooks'
import { Pagination } from '../../../../../shared/components'

export const PaginationProductsPurchase: React.FC = () => {
  const { pagination, isPaginationVisible, onSetPagePagination } = usePurchase()
  const { page, total, totalPages, itemsPerPage } = pagination

  return (
    <div className='flex flex-end items-center'>
      {
        isPaginationVisible &&
        <Pagination 
          itemsPerPage={ itemsPerPage }
          onPageChange={page => onSetPagePagination(page)}
          page={page}
          total={total}
          totalPages={totalPages}
        />
      }
    </div>
  )
}
