import React from 'react'
import { FaExpand } from "react-icons/fa"
import { RightDrawerLayout } from '../../../../../layouts'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { useModal, useProducts, useTheme } from '../../../../../shared/hooks'
import { formatPrices } from '../../../../../shared/helpers'
import { AvatarImage, AvatarInitialSquare } from '../../../../../shared/components/avatar'
import { StatusBadge } from '../../../../../shared/components/badgets'
import placeholderProduct from '../../../../../assets/img/placeholder-product.png'

export const ProductInfoDrawer: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { productSelected: product } = useProducts()
    const { onOpenModal } = useModal()

    if (!product) return null

    return (
        <RightDrawerLayout
            width="w-full md:w-4xl"
            title="Información del producto"
        >
            <div className="flex flex-col gap-4 max-w-full overflow-hidden">
                
                {/* Imagen del producto */}
                <div className="flex justify-center">
                    <div className='relative w-full max-w-sm'>
                        <img
                            src={product.image === 'Producto sin imagen' ? placeholderProduct : product.image }
                            alt={product.name}
                            className={`
                                w-full h-auto object-contain rounded-lg border p-3 transition-colors duration-200
                                ${product.image === 'Producto sin imagen' ? 'max-w-[150px] mx-auto' : 'max-h-72'}
                                ${isDark ? 'border-gray-600 bg-gray-800/30' : 'border-gray-300 bg-gray-50'}
                            `}
                        />  
                        {
                            product.image !== 'Producto sin imagen' && (
                                <button 
                                    onClick={() => onOpenModal(ModalNames.seeProductImage)}
                                    className='absolute bg-black/80 hover:bg-black rounded-full p-2.5 bottom-3 right-3 transition-all duration-200'
                                    aria-label="Ver imagen completa"
                                >
                                    <FaExpand color='white' size={14} />
                                </button>
                            )
                        }
                    </div>
                </div>

                {/* Nombre y descripción */}
                <div className='space-y-2'>
                    <h2 className={`
                        text-xl font-bold transition-colors duration-200
                        ${isDark ? 'text-gray-100' : 'text-gray-900'}
                    `}>{product.name}</h2>
                    <p className={`
                        text-sm leading-relaxed transition-colors duration-200
                        ${isDark ? 'text-gray-300' : 'text-gray-600'}
                    `}>{product.description}</p>
                </div>

                {/* Estado y fechas */}
                <div className={`
                    flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg
                    ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}
                `}>
                    <StatusBadge status={product.isActive} />
                    <div className="flex flex-col text-right gap-0.5">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Creado: {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Actualizado: {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Grid de información principal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className={`
                        p-4 rounded-lg transition-colors duration-200
                        ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}
                    `}>
                        <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Código
                        </p>
                        <p className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                            {product.code}
                        </p>
                    </div>

                    <div className={`
                        p-4 rounded-lg transition-colors duration-200
                        ${isDark ? 'bg-indigo-900/20 border border-indigo-800/50' : 'bg-indigo-50 border border-indigo-200 shadow-sm'}
                    `}>
                        <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
                            Precio de venta
                        </p>
                        <p className={`
                            font-black text-2xl
                            ${isDark ? 'text-indigo-400' : 'text-indigo-600'}
                        `}>{formatPrices(product.sellingPrice)}</p>
                    </div>

                    <div className={`
                        p-4 rounded-lg transition-colors duration-200
                        ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}
                    `}>
                        <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Stock actual
                        </p>
                        <p className={`font-bold text-2xl ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                            {product.stock} <span className="text-sm font-normal text-gray-500">uds.</span>
                        </p>
                    </div>

                    <div className={`
                        p-4 rounded-lg transition-colors duration-200
                        ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}
                    `}>
                        <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Stock mínimo
                        </p>
                        <p className={`font-bold text-2xl ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                            {product.stockMin} <span className="text-sm font-normal text-gray-500">uds.</span>
                        </p>
                    </div>
                </div>
                {product.Category && (
                    <div className={`
                        p-4 rounded-lg transition-colors duration-200
                        ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}
                    `}>
                        <h3 className={`
                            text-xs uppercase tracking-wide font-semibold mb-3
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>Categoría</h3>
                        <div className="flex items-center gap-3">
                            <div className='w-14 h-14 flex-shrink-0'>
                                {
                                    product.Category.icon !== 'Categoría sin ícono' 
                                    ? (<AvatarImage image={product.Category.icon} alt="Ícono de categoría" />) 
                                    : (<AvatarInitialSquare name={product.Category.name} />)
                                }
                            </div>
                            <div className='flex-1 min-w-0'>
                                <p className={`font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {product.Category.name}
                                </p>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {product.Category.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {product.Supplier && (
                    <div className={`
                        p-4 rounded-lg transition-colors duration-200
                        ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}
                    `}>
                        <h3 className={`
                            text-xs uppercase tracking-wide font-semibold mb-3
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>Proveedor</h3>
                        
                        <div className="space-y-2">
                            <div>
                                <p className={`font-semibold text-base ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {product.Supplier.name} {product.Supplier.lastname}
                                </p>
                                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {product.Supplier.company}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-1.5 pt-2">
                                <div className="flex items-start gap-2">
                                    <span className={`text-xs font-medium min-w-[60px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Teléfono:
                                    </span>
                                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {product.Supplier.phone}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className={`text-xs font-medium min-w-[60px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Email:
                                    </span>
                                    <span className={`text-sm break-all ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {product.Supplier.email}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className={`text-xs font-medium min-w-[60px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Dirección:
                                    </span>
                                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {product.Supplier.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Código de barras */}
                <div className={`
                    flex justify-center p-4 rounded-lg
                    ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}
                `}>
                    <img
                        className={`w-full max-w-xs h-auto ${isDark ? 'brightness-0 invert' : ''}`}
                        src={product.imageCode} 
                        alt={`Código de barras de ${product.name}`} 
                    />
                </div>
            </div>
        </RightDrawerLayout>
    )
}