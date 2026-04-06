import React from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import type { Product } from '../../../interfaces/dto/product.interface'
import { usePos, useTheme } from '../../../shared/hooks'
import { ProductItem } from './'

export const ProductsList: React.FC = () => {
    const { products } = usePos()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const productsToSale = products?.filter(pro => pro.stock > 0)

    if (!productsToSale || productsToSale.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div
                    className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-4
                        ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                    `}
                >
                    <BsBoxSeam className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-400 text-sm font-medium">
                    No hay productos disponibles
                </p>
                <p className="text-gray-400 text-xs mt-1 px-4 text-center">
                    Los productos con stock aparecerán aquí
                </p>
            </div>
        )
    }

    return (
        <ul className='grid grid-cols-2 md:grid-cols-4 gap-6 p-5'>
            {
                productsToSale.map((product: Product) => (
                    <ProductItem
                        name={product.name}
                        price={product.sellingPrice}
                        image={product.image}
                        stock={product.stock}
                        stockMin={product.stockMin}
                        id={product.id}
                        key={product.id}
                    />
                ))
            }
        </ul>
    )
}