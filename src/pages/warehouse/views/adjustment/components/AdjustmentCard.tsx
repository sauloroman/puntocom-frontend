import React from 'react'
import type { InventoryAdjustmentResponse } from '../../../../../interfaces/inventory-adjustment.interface'
import { useDrawer, useInventoryAdjustment } from '../../../../../shared/hooks'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'
import { CgDetailsMore } from 'react-icons/cg'
import { UserPhoto } from '../../../../access/views/users/components'

interface AdjustmentCardButtonsProps {
  adjustmentId: string
}

const AdjustmentCardButtons: React.FC<AdjustmentCardButtonsProps> = ({ adjustmentId }) => {
    const { onOpenLeftDrawer } = useDrawer()
    const { selectInventoryAdjustment } = useInventoryAdjustment()

    const onViewDetails = () => {
        selectInventoryAdjustment(adjustmentId)
        onOpenLeftDrawer(DrawelNames.infoAdjustment)
    }

    return (
        <div className='flex items-center gap-3'>
            <button 
                onClick={onViewDetails} 
                className="cursor-pointer border border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <CgDetailsMore size={13} />
            </button>
        </div>
    )
}

interface Props {
    inventoryAdjustment: InventoryAdjustmentResponse
}

export const AdjustmentCard: React.FC<Props> = ({ inventoryAdjustment }) => {
    const {
        adjustmentId,
        adjustmentType,
        adjustmentDate,
        User,
        Product
    } = inventoryAdjustment

    const isEntry = adjustmentType === 'entrada'

    const typeColor = isEntry 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700'

    const typeLabel = isEntry ? 'Entrada' : 'Salida'

    return (
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">

            <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${typeColor}`}>
                    {typeLabel}
                </span>
                <span className="text-xs text-gray-400">
                    {new Date(adjustmentDate).toLocaleDateString('es-MX', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                    })}
                </span>
            </div>

            {Product && (
                <div className="flex items-center gap-3 pb-4">
                    {Product.image ? (
                        <img 
                            src={Product.image} 
                            alt={Product.name}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-xs font-medium">
                                {Product.name.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-800 truncate">
                            {Product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Código: {Product.code}
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                {User && (
                    <div className="flex items-center gap-2">
                        <UserPhoto 
                          image={User.image}
                          usernameInitial={User.name[0]}
                        />
                        <div>
                            <p className="text-xs font-medium text-gray-700">
                                {User.name}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                                {User.role}
                            </p>
                        </div>
                    </div>
                )}
                
                <AdjustmentCardButtons adjustmentId={adjustmentId} />
            </div>
        </div>
    )
}