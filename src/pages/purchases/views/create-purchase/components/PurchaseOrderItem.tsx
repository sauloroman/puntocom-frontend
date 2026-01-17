import React from 'react'
import { FiPackage, FiTrash2 } from "react-icons/fi"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
import type { ProductInPurchase } from "../../../../../interfaces/dto/purchase.interface"
import { usePurchase } from "../../../../../shared/hooks"

interface Props {
    item: ProductInPurchase
    theme?: 'light' | 'dark'
}

export const PurchaseOrderItem: React.FC<Props> = ({ item, theme = 'light' }) => {
    const isDark = theme === 'dark'
    const total = item.quantity * item.unitPrice
    const { onRemoveProductInPurchase, incrementQuantityInPurchase, decrementQuantityInPurchase } = usePurchase()

    return (
        <div className={`
            flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all border
            ${isDark 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }
        `}>
            {/* Imagen y detalles del producto */}
            <div className="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
                <div className={`
                    w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 transition-colors
                    ${isDark ? 'bg-gray-600' : 'bg-gray-100'}
                `}>
                    {item.product.image ? (
                        <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FiPackage className={`
                            w-6 h-6 sm:w-8 sm:h-8 transition-colors
                            ${isDark ? 'text-blue-400' : 'text-blue-500'}
                        `} />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className={`
                        font-semibold text-xs sm:text-sm truncate transition-colors
                        ${isDark ? 'text-gray-200' : 'text-gray-800'}
                    `}>
                        {item.product.name}
                    </h4>
                    <span className={`
                        text-xs font-mono transition-colors
                        ${isDark ? 'text-gray-500' : 'text-gray-400'}
                    `}>
                        SKU: {item.product.code}
                    </span>
                </div>
            </div>

            {/* Controles de cantidad y precio */}
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Cantidad */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                            onClick={() => decrementQuantityInPurchase(item.product.id)}
                            type="button"
                            className={`
                                p-0.5 sm:p-1 rounded-lg transition-all cursor-pointer
                                ${isDark 
                                    ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200' 
                                    : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                                }
                            `}
                        >
                            <IoRemoveCircleOutline size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        
                        <span className={`
                            font-bold text-base sm:text-lg min-w-[2.5rem] sm:min-w-[3rem] text-center transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-800'}
                        `}>
                            {item.quantity}
                        </span>
                        
                        <button
                            onClick={() => incrementQuantityInPurchase(item.product.id)}
                            type="button"
                            className={`
                                p-0.5 sm:p-1 rounded-lg transition-all cursor-pointer
                                ${isDark 
                                    ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200' 
                                    : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                                }
                            `}
                        >
                            <IoAddCircleOutline size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>
                    <span className={`
                        text-xs transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        unidades
                    </span>
                </div>

                {/* Precio */}
                <div className="flex flex-col items-end gap-0.5 sm:gap-1">
                    <span className={`
                        text-xs transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        ${item.unitPrice.toFixed(2)} c/u
                    </span>
                    <span className={`
                        font-bold text-lg sm:text-xl transition-colors
                        ${isDark ? 'text-green-400' : 'text-green-600'}
                    `}>
                        ${total.toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={() => onRemoveProductInPurchase(item.product.id)}
                    type="button"
                    className={`
                        p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer
                        ${isDark 
                            ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300' 
                            : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                        }
                    `}
                >
                    <FiTrash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
            </div>
        </div>
    )
}