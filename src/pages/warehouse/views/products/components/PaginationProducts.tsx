import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { Pagination } from '../../../../../shared/components'

export const PaginationProducts: React.FC = () => {
  
  const { isPaginationVisible, pagination, onSetPage } = useProducts()
  const { itemsPerPage, page, total, totalPages } = pagination

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
