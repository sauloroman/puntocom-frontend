import React from 'react'
import { FiUser } from 'react-icons/fi'
import { useTheme } from '../../../shared/hooks'
import { AvatarInitial } from '../../../shared/components/avatar'

interface Props {
    name: string,
    role: string,
    image: string,
}

export const SaleDetailUser: React.FC<Props> = ({ image, name, role }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    console.log(image)

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
                <FiUser className="w-4 h-4" />
                Vendedor
            </div>
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                    {(image) ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className='w-10 h-10'>
                            <AvatarInitial initial={name[0]} />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className={`
                        text-sm font-medium transition-colors
                        ${isDark ? 'text-gray-200' : 'text-gray-900'}
                    `}>
                        {name}
                    </div>
                    <div className={`
                        text-xs capitalize transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                        {role}
                    </div>
                </div>
            </div>
        </div>
    )
}