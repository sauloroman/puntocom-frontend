import React from 'react'
import { ProductStack } from './ProductStack'
import { useProducts } from '../../../../../shared/hooks'

export const ProductsGrid: React.FC = () => {
    const { productNormalStock, productWarningStock, productsLowStock, onSelectProduct } = useProducts()

    return (
        <div className='grid grid-cols-3 gap-8'>
            <ProductStack onSelectProduct={onSelectProduct} products={productsLowStock} title='En Riesgo' variant='danger' />
            <ProductStack onSelectProduct={onSelectProduct} products={productWarningStock} title='Atención' variant='warning' />
            <ProductStack onSelectProduct={onSelectProduct} products={productNormalStock} title='Suficiente' variant='success' />
        </div>
    )
}
