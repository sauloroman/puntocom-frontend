import React from 'react'
import { useSale } from '../../../shared/hooks'
import { LuCalendar } from 'react-icons/lu'

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

export const FilterDateTag: React.FC = () => {
    const { filter } = useSale()

    if (!filter.dates.dateFrom || !filter.dates.dateTo) {
        return null
    }

    return (
        <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-sm'>
            <LuCalendar size={14} className='text-indigo-600' />
            <div className='flex items-center gap-2'>
                <span className='text-indigo-900 font-medium'>Periodo:</span>
                <span className='text-indigo-700'>
                    {formatDate(new Date(filter.dates.dateFrom))} - {formatDate(new Date(filter.dates.dateTo))}
                </span>
            </div>
        </div>
    )
}