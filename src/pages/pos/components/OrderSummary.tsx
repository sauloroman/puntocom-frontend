import React from 'react'
import { useCart } from '../../../shared/hooks'

export const OrderSummary: React.FC = () => {

    const { total, discount, subtotal } = useCart()

    return (
        <div className='flex flex-col'>
            <p className='font-semibold text-lg mb-3'>Resumen de orden</p>

            <ul className='text-gray-700 flex flex-col gap-3 mb-5'>
                <li className='flex items-center justify-between'>Subtotal: <span className='font-semibold text-gray-900'>${subtotal.toFixed(2)}</span></li>
                <li className='flex items-center justify-between'>Descuento: <span className='font-semibold text-gray-900'>${discount.toFixed(2)}</span></li>
                <li className='flex items-center justify-between text-3xl'>Total: <span className='font-semibold text-gray-900'>${total.toFixed(2)}</span></li>
            </ul>            
        </div>
    )
}
