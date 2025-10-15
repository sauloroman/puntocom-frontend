import React from 'react'
import { usePos } from '../../../shared/hooks/usePos'
import { OrderItem } from './OrderItem'

export const OrderList: React.FC = () => {
  const { cart } = usePos()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-3 h-2/3">
      
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-gray-800 text-lg">Productos en la orden</p>
        <p className="text-gray-500 text-sm">
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
          <p className="text-gray-400 text-center py-8">No hay productos en la orden</p>
        )}
      </ul>
    </div>
  )
}
