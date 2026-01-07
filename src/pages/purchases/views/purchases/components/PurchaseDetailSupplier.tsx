import React from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import { useTheme } from '../../../../../shared/hooks'

interface Props {
    name: string
    phone: string
}

export const PurchaseDetailSupplier: React.FC<Props> = ({ name, phone }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div className={`
            border-b p-6 flex justify-between items-center transition-colors
            ${isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }
        `}>
            <div className={`
                text-sm font-medium mb-3 flex items-center gap-2 transition-colors
                ${isDark ? 'text-gray-400' : 'text-gray-500'}
            `}>
                <FiShoppingBag className="w-4 h-4" />
                Proveedor
            </div>
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-colors
                        ${isDark 
                            ? 'bg-indigo-900/50 text-indigo-300' 
                            : 'bg-indigo-100 text-indigo-600'
                        }
                    `}>
                        <span className="font-medium text-sm">
                            {name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className={`
                        text-sm font-medium transition-colors
                        ${isDark ? 'text-gray-200' : 'text-gray-900'}
                    `}>
                        {name}
                    </div>
                    <div className={`
                        text-xs transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        {phone}
                    </div>
                </div>
            </div>
        </div>
    )
}