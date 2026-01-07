import React from 'react'
import { useTheme, usePos } from '../../../shared/hooks'
import { OrderItem } from './'

export const OrderList: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { cart } = usePos()

    return (
        <div className={`
            rounded-2xl shadow-sm border p-5 mb-3 h-2/3 transition-colors
            ${isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }
        `}>
      
            <div className="flex justify-between items-center mb-4">
                <p className={`
                    font-semibold text-lg transition-colors
                    ${isDark ? 'text-gray-200' : 'text-gray-800'}
                `}>
                    Productos en la orden
                </p>
                <p className={`
                    text-sm transition-colors
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                    {String(cart?.length || 0).padStart(2, '0')} productos
                </p>
            </div>

            <ul className="space-y-3 h-[480px] overflow-y-auto pr-1">
                {cart?.length ? (
                    cart.map((pro) => (
                        <OrderItem 
                            key={pro.product.id}
                            id={pro.product.id}
                            name={pro.product.name}
                            image={pro.product.image}
                            sellingPrice={pro.product.sellingPrice}
                            discount={pro.discount}
                            quantity={pro.quantity}
                        />
                    ))
                ) : (
                    <p className={`
                        text-center py-8 transition-colors
                        ${isDark ? 'text-gray-500' : 'text-gray-400'}
                    `}>
                        No hay productos en la orden
                    </p>
                )}
            </ul>
        </div>
    )
}