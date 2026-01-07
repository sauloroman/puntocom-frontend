import React from 'react'
import { useTheme } from '../../hooks'
import { LuBox } from 'react-icons/lu'

interface Props {
    supplierId: string | null,
    supplierName: string | null
}

export const FilterSuppierTag: React.FC<Props> = ({ supplierId, supplierName }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!supplierId) return null

    return (
        <div className={`
                    inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors
                    ${isDark
                ? 'bg-indigo-900/30 border-indigo-700'
                : 'bg-indigo-50 border-indigo-200'
            }
                `}>
            <LuBox
                size={14}
                className={isDark ? 'text-indigo-400' : 'text-indigo-600'}
            />
            <div className='flex items-center gap-2'>
                <span className={`
                            font-medium transition-colors
                            ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                        `}>
                    Supplier:
                </span>
                <span className={`
                            transition-colors
                            ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                        `}>
                    {supplierName}
                </span>
            </div>
        </div>
    )
}
