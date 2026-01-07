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
            width="w-4xl"
            title="Información del producto"
        >
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between w-full">
                    <section className="flex items-center justify-between gap-5 w-full">
                        <div className='w-[50%] h-[40%] relative'>
                            <img
                                src={product.image === 'Producto sin imagen' ? placeholderProduct : product.image }
                                alt={product.name}
                                className={`
                                    ${product.image === 'Producto sin imagen' ? 'w-36 h-30' : 'w-full h-full'} 
                                    object-cover rounded-md border p-3 transition-colors duration-200
                                    ${isDark ? 'border-gray-600' : 'border-gray-300'}
                                `}
                            />  
                            {
                                product.image !== 'Producto sin imagen' && <div 
                                    onClick={() => onOpenModal(ModalNames.seeProductImage)}
                                    className='absolute bg-black rounded-full p-2 bottom-2 right-3 hover:bg-black/50 transition-colors cursor-pointer'>
                                    <FaExpand color='white' width={20} />
                                </div>
                            }
                        </div>
                        <div className='w-full'>
                            <h2 className={`
                                text-xl font-semibold mb-2 transition-colors duration-200
                                ${isDark ? 'text-gray-100' : 'text-gray-900'}
                            `}>{product.name}</h2>
                            <p className={`
                                text-sm transition-colors duration-200
                                ${isDark ? 'text-gray-300' : 'text-gray-600'}
                            `}>{product.description}</p>
                        </div>
                    </section>
                    <div className="flex flex-col gap-2 items-end w-80 text-right">
                        <div className={`
                            text-sm transition-colors duration-200
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                            Creado: {new Date(product.createdAt).toLocaleDateString()}
                        </div>
                        <div className={`
                            text-sm transition-colors duration-200
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                            Actualizado: {new Date(product.updatedAt).toLocaleDateString()}
                        </div>
                        <StatusBadge status={product.isActive} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className={`
                        p-3 border rounded-lg transition-colors duration-200
                        ${isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-white'}
                    `}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Código</p>
                        <p className={`font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{product.code}</p>
                    </div>
                    <div className={`
                        p-3 border rounded-lg transition-colors duration-200
                        ${isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-white'}
                    `}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Precio</p>
                        <p className={`
                            font-black text-2xl
                            ${isDark ? 'text-indigo-400' : 'text-indigo-500'}
                        `}>{formatPrices(product.sellingPrice)}</p>
                    </div>
                    <div className={`
                        p-3 border rounded-lg transition-colors duration-200
                        ${isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-white'}
                    `}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Stock actual</p>
                        <p className={`font-medium text-2xl ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{product.stock}</p>
                    </div>
                    <div className={`
                        p-3 border rounded-lg transition-colors duration-200
                        ${isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-white'}
                    `}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Stock mínimo</p>
                        <p className={`font-medium text-2xl ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{product.stockMin}</p>
                    </div>
                </div>

                <div className='flex justify-between items-center gap-5'>
                    {product.Category && (
                        <div className={`
                            flex-1 p-3 border rounded-lg transition-colors duration-200
                            ${isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-white'}
                        `}>
                            <h3 className={`
                                font-semibold mb-2
                                ${isDark ? 'text-gray-100' : 'text-gray-900'}
                            `}>Categoría</h3>
                            <div className={`
                                flex items-center gap-4
                                ${isDark ? 'text-gray-200' : 'text-gray-700'}
                            `}>
                                <div className='w-20'>
                                    {
                                        product.Category.icon !== 'Categoría sin ícono' 
                                        ? (<AvatarImage image={product.Category.icon} alt="Ícono de categoría" />) 
                                        : (<AvatarInitialSquare name={product.Category.name} />)
                                    }
                                </div>
                                <div className='w-full'>
                                    {product.Category.name}
                                    <p className={`
                                        text-sm
                                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                                    `}>{product.Category.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {product.Supplier && (
                        <div className={`
                            flex-1 p-3 border rounded-lg transition-colors duration-200
                            ${isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-white'}
                        `}>
                            <h3 className={`
                                font-semibold mb-2
                                ${isDark ? 'text-gray-100' : 'text-gray-900'}
                            `}>Proveedor</h3>
                            <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                                {product.Supplier.name} {product.Supplier.lastname} — {product.Supplier.company}
                            </p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tel: {product.Supplier.phone}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email: {product.Supplier.email}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Dirección: {product.Supplier.address}</p>
                        </div>
                    )}
                </div>

                <div className='mt-5 flex justify-end items-center'>
                    <img
                        className={`w-70 ${isDark ? 'brightness-0 invert' : ''}`}
                        src={product.imageCode} 
                        alt={`Codigo de barras de ${product.name}`} 
                    />
                </div>
            </div>
        </RightDrawerLayout>
    )
}