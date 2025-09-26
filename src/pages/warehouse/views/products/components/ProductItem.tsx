import React from 'react'
import type { Product } from '../../../../../interfaces/product.interface'
import { useDrawer, useProducts } from '../../../../../shared/hooks'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'
import { CgDetailsMore } from 'react-icons/cg'
import { CiEdit } from 'react-icons/ci'
import placeholderProduct from '../../../../../assets/img/placeholder-product.png'
import { StatusBadge } from '../../../../../shared/components'
import { formatPrices } from '../../../../../shared/helpers'

interface ProductItemButtonsProps {
    productId: string
}

export const ProductItemButtons: React.FC<ProductItemButtonsProps> = ({ productId }) => {
    const { onOpenRightDrawer } = useDrawer()
    const { onSelectProduct } = useProducts()

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
            <button onClick={onSelect} className='cursor-pointer bg-white border border-gray-300 p-2 rounded-lg'>
                <CgDetailsMore size={13} />
            </button>
            <button onClick={onEdit} className='cursor-pointer bg-white border border-gray-300 p-2 rounded-lg'>
                <CiEdit size={13} />
            </button>
        </div>
    )
}

interface ProductItemProps {
  product: Product
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <div className="max-w-full rounded-lg shadow-md bg-white overflow-hidden">
            <div className="relative w-full h-32 flex items-center justify-center bg-gray-100">
                <img
                    src={product.image === 'Producto sin imagen' ? placeholderProduct : product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                />
                <div className='absolute right-2 bottom-2'><ProductItemButtons productId={product.id} /></div>
                <span className="absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                {product.Category?.name}
                </span>
                <div className='absolute bottom-2 left-2'><StatusBadge status={product.isActive} /></div>
            </div>

            <div className="p-3 flex flex-col gap-1">
                <h3 className="font-medium text-sm text-gray-800 truncate mb-2">
                {product.name}
                </h3>

                <div className='flex justify-between items-center'>
                    <p className="text-md font-bold text-indigo-500">{formatPrices(product.sellingPrice)}</p>
                    <div className='flex gap-2'>
                        <span className="mt-1 text-xs font-semibold text-green-600">Stock: {product.stock}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
