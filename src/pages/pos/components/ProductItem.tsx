import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5"
import { FiBox } from "react-icons/fi"
import { ModalNames } from '../../../interfaces/ui/modal.interface'
import { useModal, useTheme, usePos } from '../../../shared/hooks'

interface Props {
  name: string
  price: number
  stock: number
  image: string
  id: string
}

export const ProductItem: React.FC<Props> = ({ id, image, name, price, stock }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { onSetProductToAdd } = usePos()
    const { onOpenModal } = useModal()

    const onSelectProduct = () => {
        onSetProductToAdd(id)
        onOpenModal(ModalNames.addProduct)
    }

    return (
        <div 
            onClick={onSelectProduct} 
            className={`
                flex flex-col rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden
                ${isDark ? 'bg-gray-800' : 'bg-white'}
            `}
        >
            <div className={`
                relative w-full h-24 flex items-center justify-center transition-colors
                ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
            `}>
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-24 h-24 transition-transform duration-300 hover:scale-105"
                />
                {stock === 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                        Agotado
                    </span>
                )}
            </div>

            <div className="flex flex-col justify-between p-4 gap-2">
                <h3 className={`
                    font-semibold text-sm truncate transition-colors
                    ${isDark ? 'text-gray-200' : 'text-gray-800'}
                `}>
                    {name}
                </h3>

                <div className="flex items-center justify-between">
                    <p className={`
                        text-xl font-bold flex items-center gap-2 transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        <FiBox size={20} /> {stock}
                    </p>
                    <span className={`
                        font-bold text-lg transition-colors
                        ${isDark ? 'text-green-400' : 'text-green-600'}
                    `}>
                        ${price.toFixed(2)}
                    </span>
                </div>

                <button
                    disabled={stock === 0}
                    className={`flex items-center justify-center gap-2 p-1 rounded-xl font-medium text-sm transition
                        ${stock > 0
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : `${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-500'} cursor-not-allowed`}
                    `}
                >
                    <IoAddCircleOutline size={18} />
                    Agregar
                </button>
            </div>
        </div>
    )
}
