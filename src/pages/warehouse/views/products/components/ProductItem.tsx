import React from 'react'
import { CgDetailsMore } from 'react-icons/cg'
import { CiEdit } from 'react-icons/ci'
import type { Product } from '../../../../../interfaces/dto/product.interface'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'
import { useAuth, useDrawer, useProducts, useTheme } from '../../../../../shared/hooks'
import { StatusBadge } from '../../../../../shared/components/badgets'
import placeholderProduct from '../../../../../assets/img/placeholder-product.png'
import { Roles } from '../../../../../interfaces/dto/user.interface'
import { formatMoney } from '../../../../../shared/helpers'

interface ProductItemButtonsProps {
  productId: string
}

export const ProductItemButtons: React.FC<ProductItemButtonsProps> = ({ productId }) => {

  const { user: authenticatedUser } = useAuth()
  const { onOpenRightDrawer } = useDrawer()
  const { onSelectProduct } = useProducts()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const role = authenticatedUser?.role

  const onSelect = () => {
    onSelectProduct(productId)
    onOpenRightDrawer(DrawelNames.infoProduct)
  }

  const onEdit = () => {
    onSelectProduct(productId)
    onOpenRightDrawer(DrawelNames.editProduct)
  }

  return (
    <div className='flex items-center gap-3'>
      <button
        onClick={onSelect}
        className={`
          cursor-pointer p-2 rounded-lg border transition
          ${isDark
            ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
            : 'bg-white border-gray-300 hover:bg-gray-50'
          }
        `}
      >
        <CgDetailsMore size={13} />
      </button>

      {
        [Roles.ADMINISTRADOR].includes(role as Roles) &&
        <button
          onClick={onEdit}
          className={`
            cursor-pointer p-2 rounded-lg border transition
            ${isDark
              ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
              : 'bg-white border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          <CiEdit size={13} />
        </button>
      }
    </div>
  )
}

interface ProductItemProps {
  product: Product
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`
        max-w-full rounded-lg shadow-md overflow-hidden transition
        ${isDark ? "bg-gray-900 shadow-gray-800/40" : "bg-white"}
      `}
    >
      <div
        className={`
          relative w-full h-32 flex items-center justify-center
          ${isDark ? "bg-gray-800" : "bg-gray-100"}
        `}
      >
        <img
          src={product.image === 'Producto sin imagen' ? placeholderProduct : product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />

        <div className='absolute right-2 bottom-2'>
          <ProductItemButtons productId={product.id} />
        </div>

        <span
          className={`
            absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full
            ${isDark
              ? "bg-gray-900 text-gray-300"
              : "bg-blue-100 text-blue-600"
            }
          `}
        >
          {product.Category?.name}
        </span>

        <div className='absolute bottom-2 left-2'>
          <StatusBadge status={product.isActive} />
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h3
          className={`
            font-medium text-sm truncate mb-2
            ${isDark ? "text-gray-100" : "text-gray-800"}
          `}
        >
          {product.name}
        </h3>

        <div className='flex gap-2 justify-between items-center'>
          <span
            className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xl font-bold
              ${product.stock === 0
                  ? isDark
                    ? "bg-red-900/50 text-red-300"
                    : "bg-red-100 text-red-700"
                  : product.stock <= product.stockMin
                    ? isDark
                      ? "bg-amber-900/50 text-amber-300"
                      : "bg-amber-100 text-amber-700"
                    : isDark
                      ? "bg-emerald-900/50 text-emerald-300"
                      : "bg-emerald-100 text-emerald-700"
                      }
            `}
          >
            {product.stock === 0 ? "Sin stock" : `${product.stock} u`}
          </span>

          <span
            className={`
              inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold
              ${isDark
                ? "bg-blue-900/40 text-blue-300 border border-blue-800"
                : "bg-blue-50 text-blue-700 border border-blue-200"
              }
            `}
          >
            ${formatMoney(product.sellingPrice)}
          </span>
        </div>

      </div>
    </div>
  )
}
