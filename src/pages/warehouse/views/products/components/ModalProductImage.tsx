import React from 'react'
import { ModalLayout } from '../../../../../layouts'
import { useProducts } from '../../../../../shared/hooks'

export const ModalProductImage: React.FC = () => {
    const { productSelected } = useProducts()
    const image = productSelected?.image ?? ''
    const name = productSelected?.name ?? ''

    return (
        <ModalLayout width='w-2xl'>
            <div className='flex justify-center items-center'>
                <img 
                    className='w-[600px]'
                    src={image} 
                    alt={name} 
                />
            </div>
        </ModalLayout>
    )
}
