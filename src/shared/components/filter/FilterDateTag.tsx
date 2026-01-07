import React from 'react'
import { useTheme } from '../../hooks'
import { LuCalendar } from 'react-icons/lu'
import { formatDate } from '../../helpers/format-dates'

interface Props {
    dateStart: string | null,
    dateEnd: string | null
}

export const FilterDateTag: React.FC<Props> = ({ dateEnd, dateStart }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    if (!dateStart || !dateEnd) {
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
                    {formatDate(new Date(dateStart))} - {formatDate(new Date(dateEnd))}
                </span>
            </div>
        </div>
    )
}