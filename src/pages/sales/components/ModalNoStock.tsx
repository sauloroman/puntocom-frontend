import React from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { ModalLayout } from '../../../layouts'
import { ConfirmButton } from '../../../shared/components/button'
import { useModal, useTheme } from '../../../shared/hooks'
import { ModalNames } from '../../../interfaces/ui/modal.interface'

export const ModalNoStock: React.FC = () => {
    const { onOpenModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const onOpenSaleCreated = () => {
        onOpenModal(ModalNames.saveSale)
    }

    return (
        <ModalLayout width='w-lg'>
            <div className="text-center px-6 py-4">

                <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                    ${isDark ? 'bg-gray-700' : 'bg-orange-50'}
                `}>
                    <BsBoxSeam className={isDark ? 'text-orange-400' : 'text-orange-500'} size={28} />
                </div>

                <h3 className={`
                    mb-4 text-xl font-semibold transition-colors
                    ${isDark ? 'text-gray-100' : 'text-gray-800'}
                `}>
                    Sin stock disponible
                </h3>

                <p className={`
                    mb-3 transition-colors
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                    El producto ha sido desactivado. Stock insuficiente. Reabastece pronto y evita futuras perdidas.
                </p>

                <p className={`
                    w-[80%] m-auto mb-6 text-sm transition-colors
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                    No es posible agregar más unidades de este producto a la orden
                </p>

                <div onClick={onOpenSaleCreated}>
                    <ConfirmButton className='p-4' text="Entendido" />
                </div>
            </div>
        </ModalLayout>
    )
}