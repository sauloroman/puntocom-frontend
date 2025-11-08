import React from 'react'
import placeholderProduct from '../../../../../assets/img/placeholder-product.png'
import { useModal, useProducts } from '../../../../../shared/hooks'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'


interface Props {
    id: string,
    image: string,
    name: string,
    stock: number,
    stockMin: number,
    badge: string,
}

export const ProductItem: React.FC<Props> = ({ id, image, name, stock, stockMin, badge }) => {
    const { onOpenModal } = useModal()
    const { onSelectProduct } = useProducts()

    const onOpenModalToSendMessage = () => {
        onSelectProduct( id )
        onOpenModal(ModalNames.sendMessageToSupplier)
    }
    
    return (
        <li
            onClick={ onOpenModalToSendMessage }
            key={id}
            className='py-3 px-5 hover:bg-gray-100 transition-all cursor-pointer group hover:translate-y-1.5'
        >
            <div className='flex items-center'>
                <img
                    src={image === 'Producto sin imagen' ? placeholderProduct : image}
                    alt={name}
                    className="w-12 h-12 object-contain"
                />
                <p className='text-gray-800 text-sm font-medium group-hover:text-gray-900 mb-2'>
                    {name}
                </p>
            </div>
            {stock !== undefined && (
                <div className='flex gap-3 items-center'>
                    <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-500'>
                            Stock:
                        </span>
                        <span className={`text-sm font-bold ${badge} px-2.5 py-1 rounded-full`}>
                            {stock}
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-500'>
                            Mínimo:
                        </span>
                        <span className='text-sm font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full'>
                            {stockMin}
                        </span>
                    </div>
                </div>
            )}
        </li>
    )
}
