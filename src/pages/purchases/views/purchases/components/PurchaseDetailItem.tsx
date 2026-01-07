import React from 'react'
import type { PurchaseDetail } from '../../../../../interfaces/dto/purchase.interface'
import { useTheme } from '../../../../../shared/hooks'

interface Props {
    detail: PurchaseDetail
}

const calculateSubtotal = (unitPrice: number, quantity: number) => {
    return (unitPrice * quantity).toFixed(2)
}

export const PurchaseDetailItem: React.FC<Props> = ({ detail }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div className="space-y-3">
            <div className={`
                rounded-lg border p-4 transition-all
                ${isDark 
                    ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/30' 
                    : 'bg-white border-gray-200 hover:shadow-sm'
                }
            `}>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-4">
                        <p className={`
                            text-sm font-medium mb-1 transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-900'}
                        `}>
                            {detail.Product?.productName || 'Producto sin nombre'}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className={`
                            text-lg font-semibold transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-900'}
                        `}>
                            {detail.purchaseQuantity}
                        </p>
                    </div>
                </div>
                <div className={`
                    flex items-center justify-between text-xs mt-3 pt-3 border-t transition-colors
                    ${isDark 
                        ? 'text-gray-400 border-gray-700' 
                        : 'text-gray-600 border-gray-100'
                    }
                `}>
                    <div className="flex items-center space-x-4">
                        <span>
                            Cantidad: <span className={`
                                font-medium transition-colors
                                ${isDark ? 'text-gray-200' : 'text-gray-900'}
                            `}>
                                {detail.purchaseQuantity}
                            </span>
                        </span>
                        <span>
                            Precio: <span className={`
                                font-medium transition-colors
                                ${isDark ? 'text-gray-200' : 'text-gray-900'}
                            `}>
                                ${detail.purchaseUnitPrice.toFixed(2)}
                            </span>
                        </span>
                        <span>
                            Subtotal: <span className={`
                                font-medium transition-colors
                                ${isDark ? 'text-gray-200' : 'text-gray-900'}
                            `}>
                                ${calculateSubtotal(detail.purchaseUnitPrice, detail.purchaseQuantity)}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}