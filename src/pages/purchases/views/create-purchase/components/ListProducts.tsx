import React, { useEffect, useState } from 'react'
import type { Product } from '../../../../../interfaces/dto/product.interface'
import { useProducts, useTheme } from '../../../../../shared/hooks'
import { ListProductItem, SelectSupplier, PaginationProductsPurchase } from './'
import { ToggleButton } from '../../../../../shared/components/button'

interface Props {
    products: Product[]
}

export const ListProducts: React.FC<Props> = ({ products }) => {

    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    const { onGetProducts } = useProducts()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    useEffect(() => {
        if (!products) onGetProducts()
    }, [])

    const onToggleInactiveProducts = (status: boolean) => {
        let productsFiltered = []
        if (status) {
            productsFiltered = products.filter(pro => !pro.isActive)
        } else {
            productsFiltered = products.filter(pro => pro.isActive)
        }
        setFilteredProducts(productsFiltered)
    }

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

                <div className="flex justify-between items-center gap-15">
                    <SelectSupplier />
                    <div className='flex items-center gap-2'>
                        <p className={`${isDark ? 'text-gray-200' : 'text-gray-700'} text-sm`}>Inactivos</p>
                        <ToggleButton onToggle={onToggleInactiveProducts} />
                    </div>
                </div>
            </div>
            <ul className="flex flex-col gap-2 sm:gap-3 overflow-y-scroll h-[60vh] sm:h-[70vh] p-2 sm:p-4 no-scrollbar mb-8 sm:mb-12">
                {
                    filteredProducts?.length > 0 ? (
                        filteredProducts.map(product => (
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
            <PaginationProductsPurchase />
        </div>
    )
}