import React from 'react'
import { usePurchase, useTheme } from '../../../../../shared/hooks'
import { PurchaseOrderItem } from './'
import type { SavePurchase } from '../../../../../interfaces/purchase.interface'

export const PurchaseOrder: React.FC = () => {
    const { theme } = useTheme()
    const { productsInPurchase, savePurchase } = usePurchase()
    const isDark = theme === 'dark'

    const totalAmount = productsInPurchase.reduce((acc, item) => {
        return acc + (item.quantity * item.unitPrice)
    }, 0)

    const totalItems = productsInPurchase.reduce((acc, item) => {
        return acc + item.quantity
    }, 0)

    const onSavePurchase = () => {
        const purchase: SavePurchase = {
            total: totalAmount,
            supplierId: '',
            details: productsInPurchase.map( pro => ({
                productId: pro.product.id,
                quantity: +pro.quantity,
                unitPrice: +pro.unitPrice
            }))
        } 

        savePurchase(purchase)
    }

    return (
        <div className={`
            border rounded-lg p-5 transition-colors flex flex-col
            ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}
        `}>

            <div className="flex items-center justify-between mb-5">
                <h2 className={`
                    font-bold uppercase text-md transition-colors
                    ${isDark ? 'text-gray-200' : 'text-gray-800'}
                `}>
                    Orden de Compra
                </h2>
                {productsInPurchase.length > 0 && (
                    <span className={`
                        text-sm font-semibold transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        {productsInPurchase.length} {productsInPurchase.length === 1 ? 'producto' : 'productos'}
                    </span>
                )}
            </div>

            {productsInPurchase.length === 0 ? (
                <div className={`
                    flex flex-col items-center justify-center py-12 transition-colors
                    ${isDark ? 'text-gray-500' : 'text-gray-400'}
                `}>
                    <svg className="w-16 h-16 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="font-semibold">No hay productos agregados</p>
                    <p className="text-sm mt-1">Selecciona productos de la lista para comenzar</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-3 mb-5 max-h-[400px] overflow-y-auto no-scrollbar">
                        {productsInPurchase.map((item, index) => (
                            <PurchaseOrderItem 
                                key={`${item.product.id}-${index}`}
                                item={item}
                                theme={theme}
                            />
                        ))}
                    </div>

                    <div className={`
                        border-t pt-4 space-y-2 transition-colors
                        ${isDark ? 'border-gray-700' : 'border-gray-300'}
                    `}>
                        <div className="flex justify-between items-center">
                            <span className={`
                                text-sm font-medium transition-colors
                                ${isDark ? 'text-gray-400' : 'text-gray-600'}
                            `}>
                                Total de unidades:
                            </span>
                            <span className={`
                                text-lg font-bold transition-colors
                                ${isDark ? 'text-gray-200' : 'text-gray-800'}
                            `}>
                                {totalItems}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={`
                                text-lg font-semibold transition-colors
                                ${isDark ? 'text-gray-200' : 'text-gray-800'}
                            `}>
                                Total de Compra:
                            </span>
                            <span className={`
                                text-2xl font-bold transition-colors
                                ${isDark ? 'text-green-400' : 'text-green-600'}
                            `}>
                                ${totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onSavePurchase}
                        type="button"
                        className="mt-4 w-full py-3 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                    >
                        Confirmar Compra
                    </button>
                </>
            )}
        </div>
    )
}