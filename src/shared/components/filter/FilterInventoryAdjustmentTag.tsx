import React from 'react'
import { useTheme } from '../../hooks'
import { LuPackage } from 'react-icons/lu'
import type { AdjustmentEnum } from '../../../interfaces/dto/inventory-adjustment.interface'

interface Props {
    type: AdjustmentEnum
}

export const FilterAdjustmentTypeTag: React.FC<Props> = ({ type }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    if (!type) {
        return null
    }

    return (
        <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors
            ${isDark 
                ? 'bg-indigo-900/30 border-indigo-700' 
                : 'bg-indigo-50 border-indigo-200'
            }
        `}>
            <LuPackage
                size={14}
                className={isDark ? 'text-indigo-400' : 'text-indigo-600'}
            />

            <div className='flex items-center gap-2'>
                <span className={`
                    font-medium transition-colors
                    ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                `}>
                    Tipo de ajuste:
                </span>

                <span className={`
                    transition-colors
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                    {type}
                </span>
            </div>
        </div>
    )
}
