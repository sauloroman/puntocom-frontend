import React from 'react'
import { FaRegListAlt } from "react-icons/fa"
import { useSale, useCart, useTheme } from '../../../shared/hooks'
import { SaveButton } from '../../../shared/components/button'
import { OrderSummary, OrderList } from './'

export const OrderPanel: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { cart, total } = useCart()
  const { saveSale } = useSale()

  const onSaveSale = () => {
    saveSale(cart!, total)
  }

  return (
    <div className={`
            border-l h-screen p-5 transition-colors
            ${isDark ? 'border-l-gray-700 bg-gray-900' : 'border-l-gray-300 bg-white'}
        `}>
      <header className='flex justify-between items-center mb-2'>
        <div className={`
                    flex items-center gap-2 mb-2 transition-colors
                    ${isDark ? 'text-gray-200' : 'text-gray-900'}
                `}>
          <FaRegListAlt size={20} />
          <p className='font-semibold text-lg'>Detalle de orden</p>
        </div>
        <img
          className='w-20 mb-3'
          src={`${!isDark
              ? "https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
              : "https://res.cloudinary.com/dlamufioy/image/upload/v1762972429/puntocom/PUNTOCAF%C3%89_3_njxbc4.png"
            }`}
          alt="Logo"
        />
      </header>
      <OrderList />
      <OrderSummary />
      <SaveButton onClick={onSaveSale} className='w-full p-3' text='Registrar Venta' />
    </div>
  )
}