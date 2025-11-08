import React from 'react'
import type { PriceRange } from '../../../interfaces/sale.interface'

interface Props {
    prices: PriceRange
}

export const FilterPriceTag: React.FC<Props> = ({ prices }) => {
    if (!prices || (prices.minPrice === 0 && prices.maxPrice === 0)) {
        return null
    }
    return (
        <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg text-sm'>
            <div className='flex items-center gap-2'>
                <span className='text-yellow-900 font-medium'>Precio de venta:</span>
                <span className='text-yellow-700'>
                    ${prices.minPrice?.toFixed(2)} - ${prices.maxPrice?.toFixed(2)}
                </span>
            </div>
        </div>
    )
}