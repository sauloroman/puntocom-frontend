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
        <li
            key={id}
            className={`
                flex flex-col sm:flex-row justify-between items-stretch sm:items-center 
                rounded-xl p-2.5 md:p-3 transition-colors gap-3 sm:gap-0
                ${isDark 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }
            `}
        >
            <div className="flex items-center gap-3 md:gap-5 flex-1">
                <div className={`
                    w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border transition-colors flex-shrink-0
                    ${isDark 
                        ? 'bg-gray-800 border-gray-600' 
                        : 'bg-white border-gray-200'
                    }
                `}>
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col flex-1 min-w-0">

                    <p className={`
                        font-medium text-sm md:text-base transition-colors truncate
                        ${isDark ? 'text-gray-200' : 'text-gray-800'}
                    `}>
                        {name}
                    </p>
                    <p className={`
                        text-xs md:text-sm transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        ${sellingPrice.toFixed(2)} × {quantity}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                        <button 
                            onClick={() => onDecreaseQuantity(id)} 
                            className={`
                                w-6 h-6 cursor-pointer flex items-center justify-center 
                                rounded-full border transition-colors
                                ${isDark 
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-600' 
                                    : 'border-gray-300 text-gray-600 hover:bg-gray-200'
                                }
                            `}
                        >
                            <FiMinus size={14} />
                        </button>
                        <span className={`
                            text-sm font-semibold w-4 text-center transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-700'}
                        `}>
                            {quantity}
                        </span>
                        <button 
                            onClick={() => onIncreaseQuantity(id)} 
                            className={`
                                w-6 h-6 cursor-pointer flex items-center justify-center 
                                rounded-full text-white transition-colors
                                ${isDark 
                                    ? 'bg-gray-300 hover:bg-gray-200 text-gray-900' 
                                    : 'bg-black hover:bg-gray-800'
                                }
                            `}
                        >
                            <FiPlus size={14} />
                        </button>
                        <button 
                            onClick={() => onDeleteProductFromCart(id)} 
                            className={`
                                ml-2 transition-colors
                                ${isDark 
                                    ? 'text-red-400 hover:text-red-300' 
                                    : 'text-red-500 hover:text-red-600'
                                }
                            `}
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex sm:flex-col gap-2 justify-between sm:justify-start items-center sm:items-end sm:ml-2'>
                <p className={`
                    font-semibold text-base md:text-lg transition-colors
                    ${isDark ? 'text-gray-200' : 'text-gray-800'}
                `}>
                    ${total.toFixed(2)}
                </p>
                {discount > 0 && (
                    <p className={`
                        font-semibold text-sm transition-colors
                        ${isDark ? 'text-green-400' : 'text-green-600'}
                    `}>
                        -${discount.toFixed(2)}
                    </p>
                )}
            </div>
        </li>
    )
}