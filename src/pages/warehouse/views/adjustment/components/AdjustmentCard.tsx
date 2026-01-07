import React from 'react'
import type { InventoryAdjustmentResponse } from '../../../../../interfaces/dto/inventory-adjustment.interface'
import { useDrawer, useInventoryAdjustment, useTheme } from '../../../../../shared/hooks'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'
import { CgDetailsMore } from 'react-icons/cg'
import { UserPhoto } from '../../../../access/views/users/components'

interface AdjustmentCardButtonsProps {
  adjustmentId: string
}

const AdjustmentCardButtons: React.FC<AdjustmentCardButtonsProps> = ({ adjustmentId }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
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
                className={`
                    cursor-pointer border p-2 rounded-lg transition-colors duration-200
                    ${isDark
                        ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }
                `}
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
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const {
        adjustmentId,
        adjustmentType,
        adjustmentDate,
        User,
        Product
    } = inventoryAdjustment

    const isEntry = adjustmentType === 'entrada'

    const typeColorLight = isEntry 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700'

    const typeColorDark = isEntry
        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-700'
        : 'bg-red-950/50 text-red-400 border border-red-700'

    const typeColor = isDark ? typeColorDark : typeColorLight
    const typeLabel = isEntry ? 'Entrada' : 'Salida'

    return (
        <div className={`
            shadow-md rounded-2xl p-5 border hover:shadow-lg transition-all duration-200
            ${isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-100'
            }
        `}>

            <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${typeColor}`}>
                    {typeLabel}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
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
                            className={`
                                w-16 h-16 rounded-lg object-cover border transition-colors duration-200
                                ${isDark ? 'border-gray-600' : 'border-gray-200'}
                            `}
                        />
                    ) : (
                        <div className={`
                            w-16 h-16 rounded-lg flex items-center justify-center transition-colors duration-200
                            ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                        `}>
                            <span className={`
                                text-xs font-medium
                                ${isDark ? 'text-gray-400' : 'text-gray-400'}
                            `}>
                                {Product.name.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className={`
                            text-base font-semibold truncate transition-colors duration-200
                            ${isDark ? 'text-gray-100' : 'text-gray-800'}
                        `}>
                            {Product.name}
                        </h3>
                        <p className={`
                            text-sm transition-colors duration-200
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                            Código: {Product.code}
                        </p>
                    </div>
                </div>
            )}

            <div className={`
                flex items-center justify-between pt-3 border-t transition-colors duration-200
                ${isDark ? 'border-gray-700' : 'border-gray-100'}
            `}>
                {User && (
                    <div className="flex items-center gap-2">
                        <UserPhoto 
                          image={User.image}
                          usernameInitial={User.name[0]}
                        />
                        <div>
                            <p className={`
                                text-xs font-medium transition-colors duration-200
                                ${isDark ? 'text-gray-200' : 'text-gray-700'}
                            `}>
                                {User.name}
                            </p>
                            <p className={`
                                text-xs capitalize transition-colors duration-200
                                ${isDark ? 'text-gray-400' : 'text-gray-400'}
                            `}>
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