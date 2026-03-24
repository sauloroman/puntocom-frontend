import React from 'react'
import { FaRegListAlt } from "react-icons/fa"
import { useTheme, useModal, useSale, useCart } from '../../../shared/hooks'
import { SaveButton } from '../../../shared/components/button'
import { OrderSummary, OrderList } from './'
import { ModalNames } from '../../../interfaces/ui/modal.interface'

export const OrderPanel: React.FC = () => {

    const { cart, total } = useCart()
    const { isSaleCartEmpty } = useSale()
    const { onOpenModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const onConfirmSale = () => {
        if (isSaleCartEmpty(cart!, total)) return
        onOpenModal(ModalNames.confirmSale)
    }

    return (
        <div className={`
            border-l h-screen transition-colors relative
            ${isDark ? 'border-l-gray-700 bg-gray-900' : 'border-l-gray-300 bg-white'}
        `}>

            <div className="p-5 h-full flex flex-col">
                <header className='flex justify-between items-center mb-4'>
                    <div className={`
                        flex items-center gap-2 transition-colors
                        ${isDark ? 'text-gray-200' : 'text-gray-900'}
                    `}>
                        <FaRegListAlt size={20} />
                        <p className='font-semibold text-lg'>Detalle de orden</p>
                    </div>
                    <img
                        className='w-16 md:w-20'
                        src={`${!isDark
                            ? "https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
                            : "https://res.cloudinary.com/dlamufioy/image/upload/v1762972429/puntocom/PUNTOCAF%C3%89_3_njxbc4.png"
                        }`}
                        alt="Logo"
                    />
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar">
                    <OrderList />
                </div>

                <div className="mt-auto pt-4 space-y-3">
                    <OrderSummary />
                    <SaveButton onClick={onConfirmSale} className='w-full p-3' text='Registrar Venta' />
                </div>
            </div>
        </div>
    )
}