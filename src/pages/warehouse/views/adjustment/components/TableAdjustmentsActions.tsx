import React from 'react'
import { FaRegEye } from 'react-icons/fa'
import { useDrawer, useInventoryAdjustment } from '../../../../../shared/hooks'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'

interface Props {
    adjustmentId: string
}

export const TableAdjustmentsActions: React.FC<Props> = ({ adjustmentId }) => {
    
    const { selectInventoryAdjustment } = useInventoryAdjustment()
    const { onOpenLeftDrawer } = useDrawer()

    const onSelectAdjustment = () => {
        selectInventoryAdjustment(adjustmentId)
        onOpenLeftDrawer(DrawelNames.infoAdjustment)
    }

    return (
        <div className='flex gap-2 items-center justify-center'>
            <button onClick={ onSelectAdjustment } className='cursor-pointer w-fit text-center px-4 py-2 text-sm text-gray-600 hover:bg-red-50 flex items-center gap-2'><FaRegEye size={15} /></button>
        </div>
    )
}
