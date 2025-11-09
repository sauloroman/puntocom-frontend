import React from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { AdjustmentEnum } from '../../../../../interfaces/inventory-adjustment.interface'

interface Props {
    register: UseFormRegister<any>
}

export const SelectAdjustmentType: React.FC<Props> = ({ register }) => {
  return (
    <select
        id='adjustmentType'
        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
        {
            ...register('adjustmentType', {
                required: 'El tipo de ajuste es requerido'
            })
        }
    >
        <option value={AdjustmentEnum.entrada}>Entrada</option>
        <option value={AdjustmentEnum.salida}>Salida</option>
    </select>
  )
}
