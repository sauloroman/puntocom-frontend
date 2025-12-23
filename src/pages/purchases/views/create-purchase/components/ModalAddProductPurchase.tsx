import React from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { usePurchase, useTheme } from '../../../../../shared/hooks'
import { ListProductItem } from './ListProductItem'
import { FormAddProductPurchase } from './FormAddProductPurchase'

export const ModalAddProductPurchase: React.FC = () => {
    
    const { productSelectedToAdd } = usePurchase()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!productSelectedToAdd) return null

    return (
        <ModalLayout width='w-2xl'>
            <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h2 className={`
                            text-2xl font-bold transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-800'}
                        `}>
                            Agregar Producto a Compra
                        </h2>
                        <p className={`
                            text-sm mt-1 transition-colors
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