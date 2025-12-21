import React from 'react'
import { useTheme } from '../../../../../shared/hooks'

interface Props {
    message: string
    defaultMessage: string
    onChange: (message: string) => void
}

export const SupplierMessage: React.FC<Props> = ({ message, defaultMessage, onChange }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div className={`
            flex-1 flex flex-col rounded-xl p-5 border transition-colors duration-200
            ${isDark 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            }
        `}>
            <label className={`
                text-sm font-bold mb-3 uppercase tracking-wide flex items-center gap-2
                ${isDark ? 'text-gray-200' : 'text-gray-700'}
            `}>
                <svg className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                </svg>
                Mensaje
            </label>
            <textarea
                className={`
                    flex-1 w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:border-transparent resize-none custom-scrollbar text-sm
                    transition-colors duration-200
                    ${isDark
                        ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-emerald-500/50'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-500'
                    }
                `}
                placeholder={defaultMessage}
                value={message}
                onChange={(e) => onChange(e.target.value)}
            />
            <p className={`
                text-xs mt-2
                ${isDark ? 'text-gray-400' : 'text-gray-500'}
            `}>
                💡 Si no escribes nada, se enviará un mensaje predeterminado
            </p>
        </div>
    )
}