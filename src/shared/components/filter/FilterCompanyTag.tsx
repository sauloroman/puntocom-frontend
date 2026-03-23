import React from 'react'
import { useTheme } from '../../hooks'
import { LuBuilding } from 'react-icons/lu'

interface Props {
    companyName: string | null | undefined
}

export const FilterCompanyTag: React.FC<Props> = ({ companyName }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    
    if ( !companyName ) return

    return (
        <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors
            ${isDark 
                ? 'bg-indigo-900/30 border-indigo-700' 
                : 'bg-indigo-50 border-indigo-200'
            }
        `}>
            <LuBuilding
                size={14}
                className={isDark ? 'text-indigo-400' : 'text-indigo-600'}
            />

            <div className='flex items-center gap-2'>
                <span className={`
                    font-medium transition-colors
                    ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                `}>
                    Empresa:
                </span>

                <span className={`
                    transition-colors
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                    {companyName}
                </span>
            </div>
        </div>
    )
}
