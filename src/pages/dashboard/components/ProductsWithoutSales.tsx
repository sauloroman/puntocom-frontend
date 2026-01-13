import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { useTheme } from '../../../shared/hooks'
import type { ProductWithoutSales } from '../../../interfaces/dto/dashboard.interface'
import { BoxIcon } from 'lucide-react'

interface Props {
  products: ProductWithoutSales[]
}

export const ProductsWithoutSalesList: React.FC<Props> = ({ products }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  if (!products.length) {
    return (
      <div
        className={`
          rounded-xl p-6 text-center
          ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}
        `}
      >
        <FaBoxOpen className="mx-auto mb-3 text-3xl opacity-60" />
        Todos los productos tienen al menos una venta registrada
      </div>
    )
  }

  return (
    <div
      className={`
        rounded-xl border p-6
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
      `}
    >
      <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
        <BoxIcon size={20} />
        Productos sin ventas
      </h3>

      <ul className="space-y-3 h-96 overflow-y-auto no-scrollbar">
        {products.map(product => (
          <li
            key={product.productId}
            className={`
              flex items-center justify-between rounded-lg px-4 py-3
              ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
            `}
          >
            <div>
              <p className={`font-medium ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                {product.productName}
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Sin ventas registradas
              </p>
            </div>

            <div className="text-right">
              <p className={`text-sm font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Stock: {product.stock}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
