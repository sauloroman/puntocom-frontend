import React from 'react'
import placeholderProduct from '../../../../../assets/img/placeholder-product.png'
import type { Product } from '../../../../../interfaces/product.interface'

interface Props {
    product: Product
}

export const ProductInfo: React.FC<Props> = ({ product }) => {
    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200'>
            <h3 className='text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2'>
                <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                </svg>
                Producto
            </h3>
            
            {product.image && (
                <div className='mb-4 flex justify-center items-center'>
                    <img
                        src={product.image === 'Producto sin imagen' ? placeholderProduct : product.image}
                        alt={product.name}
                        className="w-64 h-64 object-contain"
                    />
                </div>
            )}
            
            <div className='space-y-3'>
                <div>
                    <p className='text-xs text-gray-500 uppercase tracking-wide mb-1'>Nombre</p>
                    <p className='font-semibold text-gray-800 text-lg'>
                        {product.name}
                    </p>
                </div>

                <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                    <div className='flex items-center justify-between mb-2'>
                        <span className='text-xs font-semibold text-red-700 uppercase tracking-wide'>
                            Nivel de Stock
                        </span>
                        <svg className='w-5 h-5 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                        </svg>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-xs text-red-600'>Stock Actual</p>
                            <p className='text-2xl font-bold text-red-700'>{product.stock}</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-xs text-red-600'>Stock Mínimo</p>
                            <p className='text-2xl font-bold text-red-700'>{product.stockMin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}