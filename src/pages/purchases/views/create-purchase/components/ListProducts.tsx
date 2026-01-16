import React, { useEffect } from 'react'
import type { Product } from '../../../../../interfaces/dto/product.interface'
import { useProducts, useTheme } from '../../../../../shared/hooks'
import { ListProductItem, SelectSupplier, PaginationProductsPurchase } from './'

interface Props {
    products: Product[]
}

export const ListProducts: React.FC<Props> = ({ products }) => {
    const { getProducts } = useProducts()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    useEffect(() => {
        if ( !products ) {
            getProducts()
        }
    }, [])

    return (
        <div className={`
            border rounded-lg p-3 sm:p-5 transition-colors
            ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}
        `}>
            <div className="flex flex-col gap-3 mb-4 sm:mb-5">
                <h2 className={`
                    font-bold uppercase text-sm sm:text-md transition-colors
                    ${isDark ? 'text-gray-200' : 'text-gray-800'}
                `}>
                    Lista de productos
                </h2>
                <SelectSupplier />
            </div>
            <ul className="flex flex-col gap-2 sm:gap-3 overflow-y-scroll h-[60vh] sm:h-[70vh] p-2 sm:p-4 no-scrollbar mb-8 sm:mb-12">
                {
                    products?.map( product => (
                        <ListProductItem 
                            product={product}
                            key={product.id} 
                        />
                    ))
                }
            </ul>
            <PaginationProductsPurchase />
        </div>
    )
}