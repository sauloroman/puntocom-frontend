import React from 'react'
import type { Product } from '../../../../../interfaces/dto/product.interface'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface';
import { AlertType } from '../../../../../interfaces/ui/alert.interface';
import { useAlert, useModal, usePurchase, useTheme } from '../../../../../shared/hooks';
import { FiHash, FiTag, FiBox, FiPackage, FiMoreHorizontal } from 'react-icons/fi'

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

        productsInPurchase.forEach(prod => {
            if (prod.product.id === product.id) {
                activateAlert({
                    title: 'Error en compra 🗒️',
                    text: 'Ya existe el producto en la compra',
                    type: AlertType.warning
                })
                existingProduct = true
            }
        })

        if (existingProduct) return

        onOpenModal(ModalNames.addProductPurchase)
        onSelectProductToAddPurchase(product)
    }

    return (
        <div onClick={onSelectProduct} className={`
            group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer
            ${isDark ? 'bg-gray-800' : 'bg-white'}
            ${isDark ? 'hover:border-blue-500' : 'hover:border-blue-400'}
            border-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}
        `}
        >

            <div className="flex-shrink-0">
                <div className={`
                    relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-colors
                    ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                `}>
                    {product.image !== 'Producto sin imagen' ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FiPackage className={`w-6 h-6 sm:w-8 sm:h-8 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                        </div>
                    )}
                    {!product.isActive && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Inactivo</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 min-w-0 w-full sm:w-auto">
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1">
                    <div className="flex-1 min-w-0">
                        <h3 className={`
                            font-semibold text-sm sm:text-base truncate transition-colors
                            ${isDark ? 'text-gray-200' : 'text-gray-800'}
                        `}>
                            {product.name}
                        </h3>
                        <p className={`
                            text-xs sm:text-sm truncate transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                            {product.description}
                        </p>
                    </div>
                    
                    <div className="sm:hidden flex-shrink-0 text-right">
                        <div className={`
                            text-lg font-bold transition-colors
                            ${isDark ? 'text-green-400' : 'text-green-600'}
                        `}>
                            ${product.sellingPrice.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5">
                        <FiHash className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`
                            font-mono text-xs transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            {product.code}
                        </span>
                    </div>

                    {product.Category && (
                        <div className={`
                            flex items-center gap-1.5 px-2 py-0.5 sm:py-1 rounded-md transition-colors
                            ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}
                        `}>
                            <FiTag className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? 'text-blue-400' : 'text-blue-700'}`} />
                            <span className={`
                                text-xs font-medium transition-colors
                                ${isDark ? 'text-blue-400' : 'text-blue-700'}
                            `}>
                                {product.Category.name}
                            </span>
                        </div>
                    )}

                    <div className={`
                        flex items-center gap-1.5 px-2 py-0.5 sm:py-1 rounded-md transition-colors
                        ${isLowStock
                            ? isDark ? 'bg-red-900/30' : 'bg-red-50'
                            : isDark ? 'bg-green-900/30' : 'bg-green-50'
                        }
                    `}>
                        <FiBox className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLowStock
                            ? isDark ? 'text-red-400' : 'text-red-600'
                            : isDark ? 'text-green-400' : 'text-green-600'
                            }`} />
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

                    {product.Supplier && (
                        <div className="sm:hidden w-full">
                            <span className={`
                                text-xs transition-colors
                                ${isDark ? 'text-gray-400' : 'text-gray-500'}
                            `}>
                                {product.Supplier.company}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="hidden sm:block flex-shrink-0 text-right">
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

            <div className="hidden sm:block flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <FiMoreHorizontal className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
        </div>
    );
};
