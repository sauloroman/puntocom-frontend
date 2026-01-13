import React from 'react'
import { FaTrophy, FaBoxOpen, FaDollarSign } from 'react-icons/fa'
import { useTheme } from '../../../shared/hooks'
import type { TopProductStats } from '../../../interfaces/dto/dashboard.interface'

interface TopProductCardProps {
    product: TopProductStats | null
}

export const TopProductCard: React.FC<TopProductCardProps> = ({ product }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!product) {
        return (
            <div
                className={`rounded-xl p-6 border text-center ${
                    isDark
                        ? 'bg-gray-900 border-gray-800 text-gray-400'
                        : 'bg-white border-gray-200 text-gray-500'
                }`}
            >
                <FaTrophy className="mx-auto text-4xl mb-3 opacity-40" />
                <p className="text-sm">No hay información de ventas</p>
            </div>
        )
    }

    return (
        <div
            className={`rounded-xl p-6 border flex flex-col gap-6 ${
                isDark
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-white border-gray-200'
            }`}
        >
            {/* Header */}
            <div className="flex items-center gap-4">
                <div
                    className={`p-3 rounded-lg ${
                        isDark
                            ? 'bg-indigo-500/10 text-indigo-400'
                            : 'bg-indigo-50 text-indigo-600'
                    }`}
                >
                    <FaTrophy size={20} />
                </div>

                <div>
                    <p
                        className={`text-xs uppercase tracking-wide ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    >
                        Producto más vendido
                    </p>
                    <h3
                        className={`font-semibold text-lg leading-tight ${
                            isDark ? 'text-gray-100' : 'text-gray-800'
                        }`}
                    >
                        {product.productName}
                    </h3>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4">

                {/* Quantity */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaBoxOpen
                            size={16}
                            className={isDark ? 'text-gray-400' : 'text-gray-500'}
                        />
                        <span
                            className={`text-sm ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}
                        >
                            Cantidad vendida
                        </span>
                    </div>

                    <span
                        className={`font-semibold ${
                            isDark ? 'text-gray-100' : 'text-gray-800'
                        }`}
                    >
                        {product.quantitySold}
                    </span>
                </div>

                {/* Revenue */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className={`p-1.5 rounded-full ${
                                isDark
                                    ? 'bg-green-500/10 text-green-400'
                                    : 'bg-green-100 text-green-600'
                            }`}
                        >
                            <FaDollarSign size={14} />
                        </div>

                        <span
                            className={`text-sm ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}
                        >
                            Total generado
                        </span>
                    </div>

                    <span className="font-bold text-lg text-indigo-500">
                        ${product.totalGenerated.toLocaleString('es-MX')}
                    </span>
                </div>
            </div>
        </div>
    )
}
