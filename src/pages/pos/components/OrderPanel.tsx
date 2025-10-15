import React from 'react'
import { OrderList } from './OrderList'
import { FaRegListAlt } from "react-icons/fa";
import { OrderSummary } from './OrderSummary';
import { SaveButton } from '../../../shared/components';
import { useSale, useCart } from '../../../shared/hooks';

export const OrderPanel: React.FC = () => {

  const { cart, total } = useCart()
  const { saveSale } = useSale()

  const onSaveSale = () => {
    saveSale( cart! , total )
  }
  
  return (
    <div className='border-l border-l-gray-300 h-screen p-5'>
      <header className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-2 mb-2'>
          <FaRegListAlt size={20} />
          <p className='font-semibold text-lg'>Detalle de orden</p>
        </div>
        <img
          className='w-20 mb-3'
          src='https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png'
        />
      </header>
      <OrderList />
      <OrderSummary />
      <SaveButton onClick={onSaveSale} className='w-full p-3' text='Registrar Venta' />
    </div>
  )
}
