import React from 'react'
import { useProducts } from '../../../../../shared/hooks'
import { ProductItem } from './'

export const ProductsGrid: React.FC = () => {

  const { products } = useProducts()

  return (
    <div className='grid grid-cols-5 gap-8 w-[95%] m-auto pt-2 py-8'>
        {
          products?.map( product => (
            <ProductItem 
              key={product.id}
              product={product}
            />
          ))
        }
    </div>
  )
}
