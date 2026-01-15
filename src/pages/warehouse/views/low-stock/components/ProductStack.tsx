import React from 'react'
import type { Product } from '../../../../../interfaces/dto/product.interface'
import { ProductItem } from './'
import { useTheme } from '../../../../../shared/hooks'

interface Props {
    title: string,
    products: Product[],
    onSelectProduct: (id: string) => void,
    variant?: 'danger' | 'warning' | 'success',
}

export const ProductStack: React.FC<Props> = ({ products, title, onSelectProduct, variant = 'success' }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const variantStyles = {
        danger: {
            header: isDark ? 'bg-gradient-to-r from-red-950 to-red-900' : 'bg-gradient-to-r from-red-50 to-red-100',
            title: isDark ? 'text-red-300' : 'text-red-700',
            badge: isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700',
            border: isDark ? 'border-red-900' : 'border-red-200',
            description: 'Stock al 20% o menos del mínimo requerido'
        },
        warning: {
            header: isDark ? 'bg-gradient-to-r from-yellow-950 to-yellow-900' : 'bg-gradient-to-r from-yellow-50 to-yellow-100',
            title: isDark ? 'text-yellow-300' : 'text-yellow-700',
            badge: isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-700',
            border: isDark ? 'border-yellow-900' : 'border-yellow-200',
            description: 'Stock entre 21% y 60% del mínimo requerido'
        },
        success: {
            header: isDark ? 'bg-gradient-to-r from-green-950 to-green-900' : 'bg-gradient-to-r from-green-50 to-green-100',
            title: isDark ? 'text-green-300' : 'text-green-700',
            badge: isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700',
            border: isDark ? 'border-green-900' : 'border-green-200',
            description: 'Stock superior al 60% del mínimo requerido'
        }
    }

    const styles = variantStyles[variant]

    return (
        <div className={`
            border ${styles.border} rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden
            ${isDark ? 'bg-gray-900' : 'bg-white'}
        `}>
            <div className={`${styles.header} px-4 sm:px-5 py-3 sm:py-4 border-b ${styles.border}`}>
                <h2 className={`font-bold uppercase ${styles.title} text-xs sm:text-sm tracking-wide`}>
                    {title}
                </h2>
                <p className={`text-xs mt-1 mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} line-clamp-2 sm:line-clamp-none`}>
                    {styles.description}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {products.length} {products.length === 1 ? 'producto' : 'productos'}
                </p>
            </div> 
            
            {products.length === 0 ? (
                <div className='p-6 sm:p-8 text-center'>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                        </svg>
                    </div>
                    <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        No hay productos en esta categoría
                    </p>
                </div>
            ) : (
                <div className='h-[400px] sm:h-[450px] lg:h-[500px] overflow-y-auto custom-scrollbar no-scrollbar'>
                    <ul className={`divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-100'}`}>    
                        {products.map(product => (
                            <ProductItem 
                                key={product.id}
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                stock={product.stock}
                                stockMin={product.stockMin}
                                badge={styles.badge}
                                onSelectProduct={onSelectProduct}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}