import React from 'react'
import { LeftDrawerLayout } from '../../../../../layouts/LeftDrawerLayout'
import { useInventoryAdjustment, useTheme } from '../../../../../shared/hooks'
import { UserPhoto } from '../../../../access/views/users/components'

export const AdjustmentInfoLeftDrawer: React.FC = () => {
    const { adjustmentSelected } = useInventoryAdjustment()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!adjustmentSelected) {
        return (
            <LeftDrawerLayout title='Información de ajuste de inventario' width='w-2xl'>
                <div
                    className={`
                        flex items-center justify-center h-full text-gray-500 
                        ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white'}
                        transition-colors duration-200
                    `}
                >
                    No hay ajuste seleccionado
                </div>
            </LeftDrawerLayout>
        )
    }

    const {
        adjustmentType,
        adjustmentPrevQuantity,
        adjustmentQuantity,
        adjustmentReason,
        adjustmentDate,
        User,
        Product
    } = adjustmentSelected

    const typeColor =
        adjustmentType === 'entrada'
            ? isDark
                ? 'text-green-400 bg-green-900/30'
                : 'text-green-600 bg-green-50'
            : isDark
                ? 'text-red-400 bg-red-900/30'
                : 'text-red-600 bg-red-50'

    const typeLabel = adjustmentType === 'entrada' ? 'Entrada' : 'Salida'

    return (
        <LeftDrawerLayout title='Información de ajuste de inventario' width='w-full md:w-2xl'>
            <div
                className={`
                    space-y-6 p-6 rounded-md transition-colors duration-200
                    ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}
                `}
            >
                <div>
                    <label
                        className={`block text-sm font-medium mb-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                    >
                        Tipo de ajuste
                    </label>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${typeColor}`}
                    >
                        {typeLabel}
                    </span>
                </div>

                {Product && (
                    <div>
                        <label
                            className={`block text-sm font-medium mb-2 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                        >
                            Producto
                        </label>
                        <div
                            className={`flex items-center space-x-3 p-3 rounded-lg ${
                                isDark ? 'bg-gray-800' : 'bg-gray-50'
                            } transition-colors duration-200`}
                        >
                            {Product.image ? (
                                <img
                                    src={Product.image}
                                    alt={Product.name}
                                    className="w-24 h-24 rounded object-cover"
                                />
                            ) : (
                                <div
                                    className={`w-12 h-12 rounded flex items-center justify-center ${
                                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`text-xs ${
                                            isDark ? 'text-gray-400' : 'text-gray-500'
                                        }`}
                                    >
                                        Sin imagen
                                    </span>
                                </div>
                            )}
                            <div className="flex-1">
                                <p className={`font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {Product.name}
                                </p>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Código: {Product.code}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label
                            className={`block text-sm font-medium mb-2 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                        >
                            Cantidad anterior
                        </label>
                        <p className={`text-2xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                            {adjustmentPrevQuantity}
                        </p>
                    </div>
                    <div>
                        <label
                            className={`block text-sm font-medium mb-2 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                        >
                            Cantidad ajustada
                        </label>
                        <p
                            className={`text-2xl font-semibold ${
                                adjustmentType === 'entrada'
                                    ? isDark
                                        ? 'text-green-400'
                                        : 'text-green-600'
                                    : isDark
                                        ? 'text-red-400'
                                        : 'text-red-600'
                            }`}
                        >
                            {adjustmentQuantity}
                        </p>
                    </div>
                </div>

                <div>
                    <label
                        className={`block text-sm font-medium mb-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                    >
                        Razón del ajuste
                    </label>
                    <p
                        className={`p-3 rounded-lg ${
                            isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'
                        }`}
                    >
                        {adjustmentReason}
                    </p>
                </div>

                <div>
                    <label
                        className={`block text-sm font-medium mb-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                    >
                        Fecha del ajuste
                    </label>
                    <p className={`${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {new Date(adjustmentDate).toLocaleString('es-MX', {
                            dateStyle: 'long',
                            timeStyle: 'short'
                        })}
                    </p>
                </div>

                {User && (
                    <div>
                        <label
                            className={`block text-sm font-medium mb-2 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                        >
                            Realizado por
                        </label>
                        <div
                            className={`flex items-center space-x-3 p-3 rounded-lg ${
                                isDark ? 'bg-gray-800' : 'bg-gray-50'
                            } transition-colors duration-200`}
                        >
                            <UserPhoto image={User.image} usernameInitial={User.name[0]} />
                            <div>
                                <p className={`font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {User.name}
                                </p>
                                <p className={`text-sm capitalize ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {User.role}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LeftDrawerLayout>
    )
}
