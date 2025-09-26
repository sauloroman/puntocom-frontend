import React from 'react'
import { RightDrawerLayout } from '../../../../../layouts/RightDrawerLayout'
import { useProducts } from '../../../../../shared/hooks'
import placeholderProduct from '../../../../../assets/img/placeholder-product.png'
import { AvatarImage, StatusBadge } from '../../../../../shared/components'
import { AvatarInitialSquare } from '../../../../../shared/components/avatar/AvatarInitialSquare'
import { formatPrices } from '../../../../../shared/helpers'

export const ProductInfoDrawer: React.FC = () => {

    const { productSelected: product } = useProducts()

    if (!product) return null

    return (
        <RightDrawerLayout
            width="w-4xl"
            title="Información del producto"
        >
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between w-full">
                    <section className="flex items-center justify-between gap-5 w-full">
                        <div className='w-[50%] h-[40%]'>
                            <img
                                src={product.image === 'Producto sin imagen' ? placeholderProduct : product.image }
                                alt={product.name}
                                className={`${product.image === 'Producto sin imagen' ? 'w-36 h-30' : 'w-full h-full'} object-cover rounded-md border border-gray-300 p-3`}
                            />  
                        </div>
                        <div className='w-full'>
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 text-sm">{product.description}</p>
                        </div>
                    </section>
                    <div className="flex flex-col gap-2 items-end w-80 text-right">
                        <div className="text-sm text-gray-500">
                            Creado: {new Date(product.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                            Actualizado: {new Date(product.updatedAt).toLocaleDateString()}
                        </div>
                        <StatusBadge status={product.isActive} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-500">Código</p>
                        <p className="font-medium">{product.code}</p>
                    </div>
                    <div className="p-3 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-500">Precio</p>
                        <p className="font-black text-indigo-500 text-2xl">{formatPrices(product.sellingPrice)}</p>
                    </div>
                    <div className="p-3 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-500">Stock actual</p>
                        <p className="font-medium text-2xl">{product.stock}</p>
                    </div>
                    <div className="p-3 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-500">Stock mínimo</p>
                        <p className="font-medium text-2xl">{product.stockMin}</p>
                    </div>
                </div>

                <div className='flex justify-between items-center gap-5'>
                    {product.Category && (
                        <div className="flex-1 p-3 border border-gray-300 rounded-lg">
                            <h3 className="font-semibold mb-2">Categoría</h3>
                            <div className="flex items-center gap-4 text-gray-700">
                                <div className='w-20'>
                                    {
                                        product.Category.icon !== 'Categoría sin ícono' 
                                        ? (<AvatarImage image={product.Category.icon} alt="Ícono de categoría" />) 
                                        : (<AvatarInitialSquare name={product.Category.name} />)
                                    }
                                </div>
                                <div className='w-full'>
                                    {product.Category.name}
                                    <p className="text-sm text-gray-500">{product.Category.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {product.Supplier && (
                        <div className="flex-1 p-3 border border-gray-300 rounded-lg">
                            <h3 className="font-semibold mb-2">Proveedor</h3>
                            <p className="text-gray-700">
                                {product.Supplier.name} {product.Supplier.lastname} — {product.Supplier.company}
                            </p>
                            <p className="text-sm text-gray-500">Tel: {product.Supplier.phone}</p>
                            <p className="text-sm text-gray-500">Email: {product.Supplier.email}</p>
                            <p className="text-sm text-gray-500">Dirección: {product.Supplier.address}</p>
                        </div>
                    )}
                </div>

                <div className='mt-5 flex justify-end items-center'>
                    <img
                        className='w-70' 
                        src={product.imageCode} 
                        alt={`Codigo de barras de ${product.name}`} 
                    />
                </div>
            </div>
        </RightDrawerLayout>
    )
}
