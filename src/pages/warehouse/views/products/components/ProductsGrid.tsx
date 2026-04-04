import React from 'react'
import { useProducts, useTheme } from '../../../../../shared/hooks'
import { ProductItem } from './'
import { LuPackageSearch } from 'react-icons/lu'

export const ProductsGrid: React.FC = () => {

  const { products } = useProducts()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  if (!products || products.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center">
        
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center mb-4
            ${isDark ? "bg-gray-700" : "bg-gray-100"}
          `}
        >
          <LuPackageSearch
            size={28}
            className="text-gray-400"
          />
        </div>

        <p className="text-gray-400 text-sm font-medium">
          No hay productos disponibles
        </p>

        <p className="text-gray-400 text-xs mt-1 text-center max-w-[260px]">
          Los productos aparecerán aquí una vez que se registren o coincidan con el filtro aplicado
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 m-auto pt-2 py-8'>
      {
        products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))
      }
    </div>
  )
}
