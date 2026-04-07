import React, { useEffect } from 'react'
import type { Product } from '../../../../../interfaces/dto/product.interface'
import { usePurchase, useTheme } from '../../../../../shared/hooks'
import { ListProductItem, SelectSupplier, PaginationProductsPurchase, FilterProductsInPurchasesByStatus, SearchProduct } from './'
import { SpinnerContainer } from '../../../../../shared/components/spinner'

interface Props {
    products: Product[]
}

export const ListProducts: React.FC<Props> = ({ products }) => {

    const { onGetProductsToBeInPurchase, isLoading } = usePurchase()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    useEffect(() => {
        if (!products) onGetProductsToBeInPurchase()
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
                
                <SearchProduct />
                <div className="flex justify-between items-center gap-8">
                    <SelectSupplier />
                    <FilterProductsInPurchasesByStatus />
                </div>
            </div>

            {
                isLoading 
                ? (<div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>)
                : (
                     <ul className="flex flex-col gap-2 sm:gap-3 overflow-y-scroll h-[60vh] sm:h-[70vh] p-2 sm:p-4 no-scrollbar mb-8 sm:mb-12">
                {
                    products?.length > 0 ? (
                        products.map(product => (
                            <ListProductItem
                                product={product}
                                key={product.id}
                            />
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className={`
                    text-sm sm:text-base text-center
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                                No hay productos para mostrar
                            </p>
                        </div>
                    )
                }
            </ul>
                )
            }
           
            <PaginationProductsPurchase />
        </div>
    )
}