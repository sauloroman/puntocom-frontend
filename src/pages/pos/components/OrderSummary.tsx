import React from 'react'
import { useCart, useTheme } from '../../../shared/hooks'

export const OrderSummary: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { total, discount, subtotal } = useCart()

    return (
        <div className='flex flex-col'>
            <p className={`
                font-semibold text-lg mb-3 transition-colors
                ${isDark ? 'text-gray-200' : 'text-gray-900'}
            `}>
                Resumen de orden
            </p>

            <ul className={`
                flex flex-col gap-3 mb-5 transition-colors
                ${isDark ? 'text-gray-300' : 'text-gray-700'}
            `}>
                <li className='flex items-center justify-between'>
                    Subtotal: 
                    <span className={`
                        font-semibold transition-colors
                        ${isDark ? 'text-gray-100' : 'text-gray-900'}
                    `}>
                        ${subtotal.toFixed(2)}
                    </span>
                </li>
                <li className='flex items-center justify-between'>
                    Descuento: 
                    <span className={`
                        font-semibold transition-colors
                        ${isDark ? 'text-gray-100' : 'text-gray-900'}
                    `}>
                        ${discount.toFixed(2)}
                    </span>
                </li>
                <li className='flex items-center justify-between text-3xl'>
                    Total: 
                    <span className={`
                        font-semibold transition-colors
                        ${isDark ? 'text-gray-100' : 'text-gray-900'}
                    `}>
                        ${total.toFixed(2)}
                    </span>
                </li>
            </ul>            
        </div>
    )
}