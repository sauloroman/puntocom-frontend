import React from 'react'
import { Search } from '../../../shared/components'
import { usePos } from '../../../shared/hooks/usePos'

export const SearchProductPos: React.FC = () => {

  const { searchProduct } = usePos()

  const onSearchProduct = ( searched: string ) => {
    searchProduct(searched)
  }

  return (
    <div className='w-1/3'>
        <Search 
            onChange={onSearchProduct}
            placeholder='Buscar productos para vender'
        />
    </div>
  )
}
