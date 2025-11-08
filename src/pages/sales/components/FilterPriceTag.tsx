import React from 'react'
import { useSale } from '../../../shared/hooks'

export const FilterPriceTag: React.FC = () => {
    const { filter } = useSale()

    if (filter.prices.priceMin === null || filter.prices.priceMax === null) {
        return null
    }

    return (
        <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-sm'>
            <div className='flex items-center gap-2'>
                <span className='text-indigo-900 font-medium'>Precio:</span>
                <span className='text-indigo-700'>
                    ${filter.prices.priceMin.toFixed(2)} - ${filter.prices.priceMax.toFixed(2)}
                </span>
            </div>
        </div>
    )
}