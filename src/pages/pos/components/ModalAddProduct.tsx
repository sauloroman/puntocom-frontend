import React from 'react'
import { ModalLayout } from '../../../layouts'
import { useTheme, usePos } from '../../../shared/hooks'
import { FormAddProduct } from './'

export const ModalAddProduct: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { productToAdd } = usePos()

    return (
        <ModalLayout width='w-4xl'>
            <section className='flex gap-6 p-4'>

                <div className={`
                    flex-shrink-0 border rounded-xl p-4 transition-colors
                    ${isDark ? 'border-gray-700' : 'border-gray-300'}
                `}>
                    <img
                        className='w-64 h-full object-cover rounded-lg'
                        src={productToAdd?.image}
                        alt={productToAdd?.name}
                    />
                </div>

                <div className='flex flex-col justify-between flex-1'>
                    <div>
                        <h2 className={`
                            font-bold text-xl mb-2 transition-colors
                            ${isDark ? 'text-gray-100' : 'text-gray-800'}
                        `}>
                            {productToAdd?.name}
                        </h2>
                        <p className={`
                            mb-2 transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            Precio: <span className={`
                                font-bold text-2xl transition-colors
                                ${isDark ? 'text-green-400' : 'text-green-600'}
                            `}>
                                ${productToAdd?.sellingPrice}
                            </span>
                        </p>
                        <p className={`
                            mb-4 transition-colors
                            ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                            Stock disponible: <span className={`
                                font-semibold text-2xl transition-colors
                                ${isDark ? 'text-gray-100' : 'text-gray-900'}
                            `}>
                                {productToAdd?.stock}
                            </span>
                        </p>

                        <FormAddProduct />
                    </div>

                </div>
            </section>
        </ModalLayout>
    )
}