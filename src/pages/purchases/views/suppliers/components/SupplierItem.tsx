import React from "react"
import { FiMail, FiPhone, FiMapPin, FiBriefcase } from "react-icons/fi"
import { CgDetailsMore } from "react-icons/cg"
import { CiEdit } from "react-icons/ci"
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface"
import type { Supplier } from "../../../../../interfaces/dto/supplier.interface"
import { useDrawer, useSuppliers, useTheme } from "../../../../../shared/hooks"
import { StatusBadge } from "../../../../../shared/components/badgets"

interface SupplierItemButtonsProps {
    supplierId: string,
}

export const SupplierItemButtons: React.FC<SupplierItemButtonsProps> = ({ supplierId }) => {

    const { onOpenRightDrawer } = useDrawer()
    const { onSelectSupplier } = useSuppliers()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const onEdit = () => {
        onSelectSupplier(supplierId)
        onOpenRightDrawer(DrawelNames.editSupplier)
    }

    const onSelect = () => {
        onSelectSupplier(supplierId)
        onOpenRightDrawer(DrawelNames.infoSupplier)
    }

    return (
        <div className="flex justify-end gap-3 items-center mt-[-15px]">
            <button
                onClick={onSelect}
                className={`
                    cursor-pointer p-2 rounded-lg transition-colors duration-200
                    ${isDark
                        ? 'bg-gray-700 hover:bg-indigo-500 text-gray-200 hover:text-white'
                        : 'border border-gray-300 hover:bg-indigo-500 hover:text-white text-gray-700 bg-white'}
                `}
            >
                <CgDetailsMore size={13} />
            </button>
            <button
                onClick={onEdit}
                className={`
                    cursor-pointer p-2 rounded-lg transition-colors duration-200
                    ${isDark
                        ? 'bg-gray-700 hover:bg-indigo-500 text-gray-200 hover:text-white'
                        : 'border border-gray-300 hover:bg-indigo-500 hover:text-white text-gray-700 bg-white'}
                `}
            >
                <CiEdit size={13} />
            </button>
        </div>
    )
}

interface SupplierItemProps {
    supplier: Supplier
}

export const SupplierItem: React.FC<SupplierItemProps> = ({ supplier }) => {

    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <div
            className={`
                w-full rounded-2xl border transition-all duration-200 p-5
                ${isDark
                    ? 'border-gray-700 bg-gray-800 text-gray-200 hover:shadow-lg hover:border-indigo-500'
                    : 'border-gray-200 bg-white text-gray-800 shadow-md hover:shadow-lg'}
            `}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                    {supplier.name} {supplier.lastname}
                </h2>
                <StatusBadge 
                  status={supplier.isActive}
                />
            </div>

            <div className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center gap-2">
                    <FiBriefcase className="w-4 h-4" />
                    <span>{supplier.company}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    <span>{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    <span>{supplier.address}</span>
                </div>
            </div>

            <div className={`mt-4 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <p>Creado: {supplier.createdAt}</p>
                <p>Actualizado: {supplier.updatedAt}</p>
            </div>

            <div className="flex justify-end w-full">
                <SupplierItemButtons supplierId={supplier.id} />
            </div>
        </div>
    )
}
