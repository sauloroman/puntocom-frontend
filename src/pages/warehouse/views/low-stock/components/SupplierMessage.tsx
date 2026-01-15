import React from 'react'
import { useTheme } from '../../../../../shared/hooks'
import { BiMessage } from 'react-icons/bi'

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
                <BiMessage />
                Mensaje
            </label>
            <textarea
                rows={7}
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