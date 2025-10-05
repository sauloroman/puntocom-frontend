import React from 'react'
import { BsTruck } from "react-icons/bs";
import { useDrawer, useProducts } from '../../../../../shared/hooks';

interface Props {
    supplierId: string,
    supplierName: string,
}

export const SupplierItemFilter: React.FC<Props> = ({ supplierId, supplierName }) => {
    
    const { filter: { supplier }, filterProductsBySupplier } = useProducts()
    const { onCloseDrawers } = useDrawer()

    const onSelectSupplier = () => {
        filterProductsBySupplier(supplierId, supplierName)
        onCloseDrawers()
    }

    return (
        <button
            onClick={onSelectSupplier}
            className={`border border-gray-300 px-4 py-2 rounded-4xl hover:bg-indigo-400 cursor-pointer hover:text-white w-full 
            ${supplierName === supplier.name && 'bg-indigo-400 text-white' }`}
        >
            <div className='flex items-center gap-2 w-full'>
                <BsTruck size={20} />
                <p>{ supplierName }</p>
            </div>
        </button>
    )
}
