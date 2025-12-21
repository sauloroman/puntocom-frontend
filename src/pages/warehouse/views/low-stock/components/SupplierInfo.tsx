import React from 'react'
import type { Product } from '../../../../../interfaces/product.interface'
import { useTheme } from '../../../../../shared/hooks'

interface Props {
    supplier: Product['Supplier']
}

export const SupplierInfo: React.FC<Props> = ({ supplier }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    if (!supplier) {
        return (
            <div className={`
                rounded-xl p-4 border transition-colors duration-200
                ${isDark
                    ? 'bg-red-950/30 border-red-800/50'
                    : 'bg-red-50 border-red-200'
                }
            `}>
                <p className={`
                    text-sm font-medium
                    ${isDark ? 'text-red-400' : 'text-red-600'}
                `}>
                    ⚠️ Este producto no tiene un proveedor asignado
                </p>
            </div>
        )
    }

    return (
        <div className={`
            rounded-xl p-4 border transition-colors duration-200
            ${isDark
                ? 'bg-gradient-to-br from-emerald-950/40 to-emerald-900/30 border-emerald-800/50'
                : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
            }
        `}>
            <h3 className={`
                text-xs font-bold mb-3 uppercase tracking-wide flex items-center gap-2
                ${isDark ? 'text-emerald-400' : 'text-green-700'}
            `}>
                <svg className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-green-600'}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
                Proveedor
            </h3>
            
            <div className='space-y-2.5'>
                <div className={`
                    rounded-lg p-3 border transition-colors duration-200
                    ${isDark
                        ? 'bg-gray-800 border-emerald-700/30'
                        : 'bg-white border-green-200'
                    }
                `}>
                    <p className={`text-xs mb-1 ${isDark ? 'text-emerald-400' : 'text-green-600'}`}>Nombre</p>
                    <p className={`
                        font-bold text-base
                        ${isDark ? 'text-gray-100' : 'text-gray-800'}
                    `}>
                        {supplier.name} {supplier.lastname}
                    </p>
                    <p className={`
                        font-medium text-sm mt-0.5
                        ${isDark ? 'text-gray-300' : 'text-gray-600'}
                    `}>{supplier.company}</p>
                </div>

                <div className={`
                    rounded-lg p-3 border flex items-center gap-3 transition-colors duration-200
                    ${isDark
                        ? 'bg-gray-800 border-emerald-700/30'
                        : 'bg-white border-green-200'
                    }
                `}>
                    <svg className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-green-600'}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                    </svg>
                    <div>
                        <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-green-600'}`}>Teléfono</p>
                        <p className={`
                            font-bold text-base
                            ${isDark ? 'text-gray-100' : 'text-gray-800'}
                        `}>{supplier.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}