import React from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { AdjustmentEnum } from '../../../../../interfaces/inventory-adjustment.interface'
import { useTheme } from '../../../../../shared/hooks'

interface Props {
    register: UseFormRegister<any>
}

export const SelectAdjustmentType: React.FC<Props> = ({ register }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <select
            id='adjustmentType'
            className={`
                w-full px-3 py-2 border rounded-lg text-sm 
                focus:outline-none focus:ring-2 transition-colors
                ${isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                }
            `}
            {
                ...register('adjustmentType', {
                    required: 'El tipo de ajuste es requerido'
                })
            }
        >
            <option value={AdjustmentEnum.entrada} className={isDark ? 'bg-gray-700' : 'bg-white'}>
                Entrada
            </option>
            <option value={AdjustmentEnum.salida} className={isDark ? 'bg-gray-700' : 'bg-white'}>
                Salida
            </option>
        </select>
    )
}