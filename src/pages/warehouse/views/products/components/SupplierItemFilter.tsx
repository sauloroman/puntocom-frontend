import React from 'react'
import { BsTruck } from "react-icons/bs";
import { useDrawer, useProducts, useTheme } from '../../../../../shared/hooks';

interface Props {
    supplierId: string,
    supplierName: string,
}

export const SupplierItemFilter: React.FC<Props> = ({ supplierId, supplierName }) => {

    const { filter: { supplier }, filterProductsBySupplier } = useProducts()
    const { onCloseDrawers } = useDrawer()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const onSelectSupplier = () => {
        filterProductsBySupplier(supplierId, supplierName)
        onCloseDrawers()
    }

    const isActive = supplierName === supplier.name

    return (
        <button
            onClick={onSelectSupplier}
            className={`
                w-full rounded-4xl px-4 py-2 border transition-all duration-200
                flex items-center gap-2
                ${isDark 
                    ? `
                        border-gray-700 text-gray-300 hover:bg-indigo-600/30 hover:text-indigo-200
                        ${isActive ? 'bg-indigo-600/40 border-indigo-500 text-indigo-100' : ''}
                    `
                    : `
                        border-gray-300 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700
                        ${isActive ? 'bg-indigo-500 text-white border-indigo-500' : ''}
                    `
                }
            `}
        >
            <BsTruck 
                size={20} 
                className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`} 
            />
            <p className="truncate text-sm font-medium">{supplierName}</p>
        </button>
    )
}
