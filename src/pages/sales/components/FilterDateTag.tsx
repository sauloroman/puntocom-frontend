import React from 'react'
import { useSale, useTheme } from '../../../shared/hooks'
import { LuCalendar } from 'react-icons/lu'

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

export const FilterDateTag: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { filter } = useSale()

    if (!filter.dates.dateFrom || !filter.dates.dateTo) {
        return null
    }

    return (
        <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors
            ${isDark 
                ? 'bg-indigo-900/30 border-indigo-700' 
                : 'bg-indigo-50 border-indigo-200'
            }
        `}>
            <LuCalendar 
                size={14} 
                className={isDark ? 'text-indigo-400' : 'text-indigo-600'} 
            />
            <div className='flex items-center gap-2'>
                <span className={`
                    font-medium transition-colors
                    ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                `}>
                    Periodo:
                </span>
                <span className={`
                    transition-colors
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                    {formatDate(new Date(filter.dates.dateFrom))} - {formatDate(new Date(filter.dates.dateTo))}
                </span>
            </div>
        </div>
    )
}