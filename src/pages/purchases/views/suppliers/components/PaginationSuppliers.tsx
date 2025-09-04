import React from 'react'
import { useSuppliers } from '../../../../../shared/hooks'
import { Pagination } from '../../../../../shared/components'

export const PaginationSuppliers: React.FC = () => {
  
  const { pagination, onSetPage, isPaginationVisible } = useSuppliers()
  const { page, total, totalPages, itemsPerPage } = pagination

  const onPageChange = ( page: number ) => {
    onSetPage( page )
  }

  return (
    <div className='flex flex-end items-center'>
      {
        isPaginationVisible &&
        <Pagination 
          itemsPerPage={ itemsPerPage }
          onPageChange={onPageChange}
          page={page}
          total={total}
          totalPages={totalPages}
        />
      }
    </div>
  )
}
