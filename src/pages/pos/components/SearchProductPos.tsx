import React from 'react'
import { usePos } from '../../../shared/hooks'
import { Search } from '../../../shared/components/form'

export const SearchProductPos: React.FC = () => {

  const { searchProduct } = usePos()

  const onSearchProduct = ( searched: string ) => {
    searchProduct(searched)
  }

  return (
    <div className='w-2/3 md:w-1/3'>
        <Search 
            onChange={onSearchProduct}
            placeholder='Buscar productos para vender'
        />
    </div>
  )
}
