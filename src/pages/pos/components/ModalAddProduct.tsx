import React from 'react'
import { ModalLayout } from '../../../layouts/ModalLayout'
import { usePos } from '../../../shared/hooks/usePos'
import { FormAddProduct } from './'

export const ModalAddProduct: React.FC = () => {

    const { productToAdd } = usePos()

    return (
        <ModalLayout width='w-3xl'>
            <section className='flex gap-6 p-4'>

                {/* Imagen del producto */}
                <div className='flex-shrink-0 border border-gray-300 rounded-xl p-4'>
                    <img
                        className='w-52 h-full object-cover rounded-lg'
                        src={productToAdd?.image}
                        alt={productToAdd?.name}
                    />
                </div>

                {/* Información del producto */}
                <div className='flex flex-col justify-between flex-1'>
                    <div>
                        <h2 className='font-bold text-xl text-gray-800 mb-2'>
                            {productToAdd?.name}
                        </h2>
                        <p className='text-gray-600 mb-2'>
                            Precio: <span className='font-bold text-2xl text-green-600'>${productToAdd?.sellingPrice}</span>
                        </p>
                        <p className='text-gray-600 mb-4'>
                            Stock disponible: <span className='font-semibold text-gray-900 text-2xl'>{productToAdd?.stock}</span>
                        </p>

                        <FormAddProduct />
                    </div>

                </div>
            </section>
        </ModalLayout>
    )
}
