import React from 'react'
import { ProductStack } from './ProductStack'
import { useProducts } from '../../../../../shared/hooks'

export const ProductsGrid: React.FC = () => {
    
    const { 
        productNormalStock, productWarningStock, productsLowStock,
    } = useProducts()

    return (
        <div className='grid grid-cols-3 gap-8'>
            <ProductStack products={productsLowStock} title='En Riesgo' variant='danger' />
            <ProductStack products={productWarningStock} title='Atención' variant='warning' />
            <ProductStack products={productNormalStock} title='Suficiente' variant='success' />
        </div>
    )
}
