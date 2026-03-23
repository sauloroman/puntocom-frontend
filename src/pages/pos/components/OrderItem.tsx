import React from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useTheme, usePos } from '../../../shared/hooks'

interface Props {
    id: string,
    image: string,
    name: string,
    sellingPrice: number,
    quantity: number,
    discount: number
}

export const OrderItem: React.FC<Props> = ({ 
    id, 
    image, 
    name, 
    discount, 
    quantity, 
    sellingPrice 
}) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { onDeleteProductFromCart, onIncreaseQuantity, onDecreaseQuantity } = usePos()

    const total = sellingPrice * quantity
    
    return (
        <li className={`
    flex flex-col rounded-xl p-2.5 md:p-3 transition-colors gap-2
    ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}
`}>
    <div className="flex items-center gap-3">
        <div className={`
            w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border flex-shrink-0
            ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}
        `}>
            <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
            <p className={`font-medium text-sm md:text-base truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {name}
            </p>
            <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                ${sellingPrice.toFixed(2)} × {quantity}
            </p>
        </div>

        <div className="flex-shrink-0 text-right">
            <p className={`font-semibold text-base md:text-lg ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                ${total.toFixed(2)}
            </p>
            {discount > 0 && (
                <p className={`text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    -{discount.toFixed(2)}
                </p>
            )}
        </div>
    </div>

    <div className="flex items-center gap-2 pl-1">
        <button
            onClick={() => onDecreaseQuantity(id)}
            className={`
                w-6 h-6 cursor-pointer flex items-center justify-center rounded-full border transition-colors
                ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-600' : 'border-gray-300 text-gray-600 hover:bg-gray-200'}
            `}
        >
            <FiMinus size={14} />
        </button>
        <span className={`text-sm font-semibold w-4 text-center ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {quantity}
        </span>
        <button
            onClick={() => onIncreaseQuantity(id)}
            className={`
                w-6 h-6 cursor-pointer flex items-center justify-center rounded-full text-white transition-colors
                ${isDark ? 'bg-gray-800 hover:bg-gray-900' : 'bg-black hover:bg-gray-800'}
            `}
        >
            <FiPlus size={14} />
        </button>
        <button
            onClick={() => onDeleteProductFromCart(id)}
            className={`ml-2 transition-colors ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}
        >
            <FiTrash2 size={16} />
        </button>
    </div>
</li>
    )
}