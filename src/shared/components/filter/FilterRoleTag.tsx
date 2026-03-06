import React from 'react'
import { useTheme } from '../../hooks'
import { LuShield } from 'react-icons/lu'
import type { Roles } from '../../../interfaces/dto/user.interface'

interface Props {
    role: Roles
}

export const FilterRoleTag: React.FC<Props> = ({ role }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    if (!role) {
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
            <LuShield
                size={14}
                className={isDark ? 'text-indigo-400' : 'text-indigo-600'}
            />

            <div className='flex items-center gap-2'>
                <span className={`
                    font-medium transition-colors
                    ${isDark ? 'text-indigo-300' : 'text-indigo-900'}
                `}>
                    Rol:
                </span>

                <span className={`
                    transition-colors
                    ${isDark ? 'text-indigo-400' : 'text-indigo-700'}
                `}>
                    {role}
                </span>
            </div>
        </div>
    )
}
