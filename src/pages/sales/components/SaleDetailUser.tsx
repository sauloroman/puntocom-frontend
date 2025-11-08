import React from 'react'
import { FiUser } from 'react-icons/fi'

interface Props {
    name: string,
    role: string,
    image: string,
}

export const SaleDetailUser: React.FC<Props> = ({ image, name, role }) => {
    return (
        <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                Vendedor
            </div>
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                    {image !== 'Usuario sin imagen' ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium text-sm">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{name}</div>
                    <div className="text-xs text-gray-500 capitalize">{role}</div>
                </div>
            </div>
        </div>
    )
}
