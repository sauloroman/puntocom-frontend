import React from 'react'
import { ModalLayout } from '../../../../../layouts'
import { usePurchase, useTheme } from '../../../../../shared/hooks'
import { ListProductItem, FormAddProductPurchase } from './'

export const ModalAddProductPurchase: React.FC = () => {
    
    const { productSelectedToAdd } = usePurchase()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!productSelectedToAdd) return null

    return (
        <ModalLayout width='w-[90%] sm:w-2xl'>
            <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                        <h2 className={`
                            text-xl sm:text-2xl font-bold transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-800'}
                        `}>
                            Agregar Producto a Compra
                        </h2>
                        <p className={`
                            text-xs sm:text-sm mt-1 transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                            Ingresa los detalles de compra del producto
                        </p>
                    </div>
                </div>
                <ListProductItem product={productSelectedToAdd} />
                <FormAddProductPurchase sellingPrice={productSelectedToAdd.sellingPrice} />
            </div>
        </ModalLayout>
    )
}