import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5"
import { ModalNames } from '../../../interfaces/ui/modal.interface'
import { useModal, useTheme, usePos, useAlert } from '../../../shared/hooks'
import { AlertType } from '../../../interfaces/ui/alert.interface'
import { FiPackage } from 'react-icons/fi'

interface Props {
    name: string
    price: number
    stock: number,
    stockMin: number,
    image: string
    id: string
}

export const ProductItem: React.FC<Props> = ({ id, image, name, price, stock, stockMin }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { onSetProductToAdd, cart } = usePos()
    const { onOpenModal } = useModal()
    const { activateAlert } = useAlert()

    const onSelectProduct = () => {
        const isAlreadyInCart = cart?.find(productInCart => productInCart.product.id === id)
        if (isAlreadyInCart) {
            return activateAlert({
                title: 'Error registro de venta',
                text: 'El producto ya se encuentra en el carrito',
                type: AlertType.warning,
            })
        }

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
                {image !== 'Producto sin imagen' ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-24 h-24 object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FiPackage className={`w-6 h-6 sm:w-15 sm:h-15 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                    </div>
                )}
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
                    <span
                        className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xl font-bold
              ${stock === 0
                                ? isDark
                                    ? "bg-red-900/50 text-red-300"
                                    : "bg-red-100 text-red-700"
                                : stock <= stockMin
                                    ? isDark
                                        ? "bg-amber-900/50 text-amber-300"
                                        : "bg-amber-100 text-amber-700"
                                    : isDark
                                        ? "bg-emerald-900/50 text-emerald-300"
                                        : "bg-emerald-100 text-emerald-700"
                            }
            `}
                    >
                        {stock === 0 ? "Sin stock" : `${stock} uds`}
                    </span>
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
