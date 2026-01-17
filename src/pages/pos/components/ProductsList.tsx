import React from 'react'
import type { Product } from '../../../interfaces/dto/product.interface'
import { usePos } from '../../../shared/hooks'
import { ProductItem } from './'

export const ProductsList: React.FC = () => {
    const { products } = usePos()
    const productsToSale = products?.filter(pro => pro.stock > 0)

    return (
        <ul className='grid grid-cols-2 md:grid-cols-4 gap-6 p-5'>
            {
                productsToSale?.map((product: Product) => (
                    <ProductItem
                        name={product.name}
                        price={product.sellingPrice}
                        image={product.image}
                        stock={product.stock}
                        id={product.id}
                        key={product.id}
                    />
                ))
            }
        </ul>
    )
}