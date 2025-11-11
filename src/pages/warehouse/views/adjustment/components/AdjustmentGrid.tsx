import React from 'react'
import type { InventoryAdjustmentResponse } from '../../../../../interfaces/inventory-adjustment.interface'
import { AdjustmentCard } from './AdjustmentCard'

interface Props {
    data: InventoryAdjustmentResponse[]
}

export const AdjustmentGrid: React.FC<Props> = ({ data }) => {
     return (
        <ul className='grid grid-cols-4 gap-5 py-2 pb-10'>
            {
                data.map(adjustment => (
                    <AdjustmentCard 
                        key={adjustment.adjustmentId} 
                        inventoryAdjustment={adjustment} 
                    />
                ))
            }
        </ul>
    )
}
