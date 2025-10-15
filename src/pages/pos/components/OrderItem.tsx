import React from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { usePos } from '../../../shared/hooks/usePos'

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

    const { onDeleteProductFromCart, onIncreaseQuantity, onDecreaseQuantity } = usePos()

    const total = sellingPrice * quantity
    
    return (
        <li
            key={id}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-3"
        >
            <div className="flex items-center gap-5 mr-2">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border border-gray-200">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <p className="font-medium text-gray-800">{name}</p>
                    <p className="text-sm text-gray-500">
                        ${sellingPrice.toFixed(2)} × {quantity}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => onDecreaseQuantity(id)} className="w-6 h-6 cursor-pointer flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 transition">
                            <FiMinus size={14} />
                        </button>
                        <span className="text-sm font-semibold text-gray-700 w-4 text-center">
                            {quantity}
                        </span>
                        <button onClick={() => onIncreaseQuantity(id)} className="w-6 h-6 cursor-pointer flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition">
                            <FiPlus size={14} />
                        </button>
                        <button onClick={() => onDeleteProductFromCart(id)} className="ml-2 text-red-500 hover:text-red-600 transition">
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p className="font-semibold text-lg text-gray-800">${total.toFixed(2)}</p>
                {discount > 0 && <p className='text-green-600 font-semibold'>-${discount.toFixed(2)}</p>}
            </div>
        </li>
    )
}
