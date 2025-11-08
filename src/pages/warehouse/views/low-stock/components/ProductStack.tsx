import React from 'react'
import type { Product } from '../../../../../interfaces/product.interface'
import { ProductItem } from './'

interface Props {
    title: string,
    products: Product[],
    variant?: 'danger' | 'warning' | 'success'
}

export const ProductStack: React.FC<Props> = ({ products, title, variant = 'success' }) => {
    
    const variantStyles = {
        danger: {
            header: 'bg-gradient-to-r from-red-50 to-red-100',
            title: 'text-red-700',
            badge: 'bg-red-100 text-red-700',
            border: 'border-red-200',
            description: 'Stock al 20% o menos del mínimo requerido'
        },
        warning: {
            header: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
            title: 'text-yellow-700',
            badge: 'bg-yellow-100 text-yellow-700',
            border: 'border-yellow-200',
            description: 'Stock entre 21% y 60% del mínimo requerido'
        },
        success: {
            header: 'bg-gradient-to-r from-green-50 to-green-100',
            title: 'text-green-700',
            badge: 'bg-green-100 text-green-700',
            border: 'border-green-200',
            description: 'Stock superior al 60% del mínimo requerido'
        }
    }

    const styles = variantStyles[variant]

    return (
        <div className={`bg-white border ${styles.border} rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden`}>
            <div className={`${styles.header} px-5 py-4 border-b ${styles.border}`}>
                <h2 className={`font-bold uppercase ${styles.title} text-xs tracking-wide`}>
                    { title }
                </h2>
                <p className='text-xs text-gray-600 mt-1 mb-2'>
                    {styles.description}
                </p>
                <p className='text-xs text-gray-500'>
                    {products.length} {products.length === 1 ? 'producto' : 'productos'}
                </p>
            </div> 
            
            {products.length === 0 ? (
                <div className='p-8 text-center'>
                    <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                        <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                        </svg>
                    </div>
                    <p className='text-gray-400 text-sm'>
                        No hay productos en esta categoría
                    </p>
                </div>
            ) : (
                <div className='h-[500px] overflow-y-auto custom-scrollbar'>
                    <ul className="divide-y divide-gray-100">    
                        {products.map(product => (
                            <ProductItem 
                                key={product.id}
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                stock={product.stock}
                                stockMin={product.stockMin}
                                badge={styles.badge}
                            />
                        ))}
                    </ul>

                </div>
            )}
        </div>
    )
}