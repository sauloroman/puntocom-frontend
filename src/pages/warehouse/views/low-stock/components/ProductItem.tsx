import React from 'react'
import placeholderProduct from '../../../../../assets/img/placeholder-product.png'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { useModal, useTheme } from '../../../../../shared/hooks'

interface Props {
    id: string,
    image: string,
    name: string,
    stock: number,
    stockMin: number,
    badge: string,
    onSelectProduct: ( id: string ) => void
}

export const ProductItem: React.FC<Props> = ({ id, image, name, stock, stockMin, badge, onSelectProduct }) => {

    const { onOpenModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const handleOpen = () => {
        onSelectProduct(id)
        onOpenModal(ModalNames.sendMessageToSupplier)
    }
    
    return (
        <div
            onClick={ handleOpen }
            className={`
                w-full py-3 px-5 transition-all cursor-pointer group hover:translate-y-1
                ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
            `}
        >
            <div className='flex items-center gap-3'>
                <img
                    src={image === 'Producto sin imagen' ? placeholderProduct : image}
                    alt={name}
                    className="w-12 h-12 object-contain"
                />
                <p 
                    className={`
                        text-sm font-medium transition-colors
                        ${isDark 
                            ? "text-gray-200 group-hover:text-white" 
                            : "text-gray-800 group-hover:text-gray-900"
                        }
                    `}
                >
                    {name}
                </p>
            </div>

            {stock !== undefined && (
                <div className='flex gap-3 items-center mt-2'>
                    <div className='flex items-center gap-2'>
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            Stock:
                        </span>
                        <span className={`text-sm font-bold ${badge} px-2.5 py-1 rounded-full`}>
                            {stock}
                        </span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            Mínimo:
                        </span>
                        <span
                            className={`
                                text-sm font-semibold px-2.5 py-1 rounded-full
                                ${isDark 
                                    ? "text-gray-300 bg-gray-800" 
                                    : "text-gray-600 bg-gray-100"
                                }
                            `}
                        >
                            {stockMin}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
