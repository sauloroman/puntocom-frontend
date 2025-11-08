import React from 'react'
import { useSale } from '../../../shared/hooks'
import { LuUser } from 'react-icons/lu'

export const FilterUserTag: React.FC = () => {
    const { filter } = useSale()

    if (!filter.user.id) {
        return null
    }

    return (
        <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-sm'>
            <LuUser size={14} className='text-indigo-600' />
            <div className='flex items-center gap-2'>
                <span className='text-indigo-900 font-medium'>Usuario:</span>
                <span className='text-indigo-700'>
                    {filter.user.name}
                </span>
            </div>
        </div>
    )
}