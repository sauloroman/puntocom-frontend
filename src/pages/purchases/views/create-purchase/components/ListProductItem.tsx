import React from 'react'
import type { Product } from '../../../../../interfaces/product.interface'
import { useAlert, useModal, usePurchase, useTheme } from '../../../../../shared/hooks';
import { ModalNames } from '../../../../../interfaces/ui/modal.interface';
import { AlertType } from '../../../../../interfaces/ui/alert.interface';

interface Props {
    product: Product
}

export const ListProductItem: React.FC<Props> = ({ product }) => {

    const { theme } = useTheme()
    const { onOpenModal } = useModal()
    const { activateAlert } = useAlert()
    const { onSelectProductToAddPurchase, productsInPurchase } = usePurchase()

    const isLowStock = product.stock <= product.stockMin;
    const isDark = theme === 'dark';

    const onSelectProduct = () => {
        let existingProduct = false

        productsInPurchase.forEach( prod => {
            if ( prod.product.id === product.id ) {
                activateAlert({
                    title: 'Error en compra 🗒️',
                    text: 'Ya existe el producto en la compra',
                    type: AlertType.warning
                })
                existingProduct = true
            }
        })

        if ( existingProduct ) return
        
        onOpenModal(ModalNames.addProductPurchase)
        onSelectProductToAddPurchase(product)
    }

    return (
        <div onClick={onSelectProduct} className={`
            group relative flex items-center gap-4 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer
            ${isDark ? 'bg-gray-800' : 'bg-white'}
            ${isDark ? 'hover:border-blue-500' : 'hover:border-blue-400'}
            border-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}
        `}
    >

            <div className="flex-shrink-0">
                <div className={`
                    relative w-16 h-16 rounded-lg overflow-hidden transition-colors
                    ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                `}>
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    )}
                    {!product.isActive && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Inactivo</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1 min-w-0">
                        <h3 className={`
                            font-semibold text-base truncate transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-800'}
                        `}>
                            {product.name}
                        </h3>
                        <p className={`
                            text-sm truncate transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                            {product.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1.5">
                        <svg className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <span className={`
                            font-mono transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            {product.code}
                        </span>
                    </div>

                    {product.Category && (
                        <div className={`
                            flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors
                            ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}
                        `}>
                            <span className={`
                                text-xs font-medium transition-colors
                                ${isDark ? 'text-blue-400' : 'text-blue-700'}
                            `}>
                                {product.Category.name}
                            </span>
                        </div>
                    )}

                    <div className={`
                        flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors
                        ${isLowStock 
                            ? isDark ? 'bg-red-900/30' : 'bg-red-50'
                            : isDark ? 'bg-green-900/30' : 'bg-green-50'
                        }
                    `}>
                        <svg className={`w-4 h-4 ${isLowStock
                                ? isDark ? 'text-red-400' : 'text-red-600'
                                : isDark ? 'text-green-400' : 'text-green-600'
                            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className={`
              text-xs font-semibold transition-colors
              ${isLowStock
                                ? isDark ? 'text-red-400' : 'text-red-700'
                                : isDark ? 'text-green-400' : 'text-green-700'
                            }
            `}>
                            {product.stock} unid.
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-shrink-0 text-right">
                <div className={`
          text-2xl font-bold transition-colors
          ${isDark ? 'text-green-400' : 'text-green-600'}
        `}>
                    ${product.sellingPrice.toFixed(2)}
                </div>
                {product.Supplier && (
                    <div className={`
            text-xs mt-1 transition-colors
            ${isDark ? 'text-gray-400' : 'text-gray-500'}
          `}>
                        {product.Supplier.company}
                    </div>
                )}
            </div>

            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
            </div>
        </div>
    );
};