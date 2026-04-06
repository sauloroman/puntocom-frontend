import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { Pagination } from '../../../../../shared/components/pagination'

export const PaginationProducts: React.FC = () => {
  
  const { pagination, onSetPage } = useProducts()
  const { itemsPerPage, page, total, totalPages } = pagination

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
