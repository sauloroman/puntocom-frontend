import React from 'react'
import { LeftDrawerLayout } from '../../../../../layouts/LeftDrawerLayout'
import { useInventoryAdjustment } from '../../../../../shared/hooks'
import { UserPhoto } from '../../../../access/views/users/components'

export const AdjustmentInfoLeftDrawer: React.FC = () => {
    const { adjustmentSelected } = useInventoryAdjustment()

    if (!adjustmentSelected) {
        return (
            <LeftDrawerLayout title='Información de ajuste de inventario' width='w-2xl'>
                <div className="flex items-center justify-center h-full text-gray-500">
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

    const typeColor = adjustmentType === 'entrada' 
        ? 'text-green-600 bg-green-50' 
        : 'text-red-600 bg-red-50'

    const typeLabel = adjustmentType === 'entrada' ? 'Entrada' : 'Salida'

    return (
        <LeftDrawerLayout title='Información de ajuste de inventario' width='w-2xl'>
            <div className="space-y-6 p-6">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de ajuste
                    </label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${typeColor}`}>
                        {typeLabel}
                    </span>
                </div>

                {Product && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Producto
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            {Product.image ? (
                                <img 
                                    src={Product.image} 
                                    alt={Product.name}
                                    className="w-24 h-24 rounded object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">Sin imagen</span>
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{Product.name}</p>
                                <p className="text-sm text-gray-500">Código: {Product.code}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad anterior</label>
                        <p className="text-2xl font-semibold text-gray-900">{adjustmentPrevQuantity}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad ajustada</label>
                        <p className={`text-2xl font-semibold ${adjustmentType === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>{adjustmentQuantity}</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razón del ajuste
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {adjustmentReason}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha del ajuste
                    </label>
                    <p className="text-gray-900">
                        {new Date(adjustmentDate).toLocaleString('es-MX', {
                            dateStyle: 'long',
                            timeStyle: 'short'
                        })}
                    </p>
                </div>

                {User && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Realizado por
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <UserPhoto 
                                image={User.image}
                                usernameInitial={User.name[0]}
                            />
                            <div>
                                <p className="font-medium text-gray-900">{User.name}</p>
                                <p className="text-sm text-gray-500 capitalize">{User.role}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LeftDrawerLayout>
    )
}