import React from "react"
import { FiMail, FiPhone, FiMapPin, FiBriefcase } from "react-icons/fi"
import { CgDetailsMore } from "react-icons/cg"
import { CiEdit } from "react-icons/ci"
import { useDrawer, useSuppliers } from "../../../../../shared/hooks"
import { DrawelNames } from "../../../../../interfaces/ui/drawel.interface"
import type { Supplier } from "../../../../../interfaces/supplier.interface"

interface SupplierItemButtonsProps {
    supplierId: string,
}

export const SupplierItemButtons: React.FC<SupplierItemButtonsProps> = ({ supplierId }) => {

    const { onOpenRightDrawer } = useDrawer()
    const { onSelectSupplier } = useSuppliers()

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
            <button onClick={onSelect} className="cursor-pointer border border-gray-300 p-2 rounded-lg"><CgDetailsMore size={13} /></button>
            <button onClick={onEdit} className="cursor-pointer border border-gray-300 p-2 rounded-lg"><CiEdit size={13} /></button>
        </div>
    )
}

interface SupplierItemProps {
  supplier: Supplier
}

export const SupplierItem: React.FC<SupplierItemProps> = ({ supplier }) => {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow p-5">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {supplier.name} {supplier.lastname}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            supplier.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {supplier.isActive ? "Activo" : "Inactivo"}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FiBriefcase className="w-4 h-4 text-gray-500" />
          <span>{supplier.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="w-4 h-4 text-gray-500" />
          <span>{supplier.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiMail className="w-4 h-4 text-gray-500" />
          <span>{supplier.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiMapPin className="w-4 h-4 text-gray-500" />
          <span>{supplier.address}</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <p>Creado: {supplier.createdAt}</p>
        <p>Actualizado: {supplier.updatedAt}</p>
      </div>

      <div className="flex justify-end w-full">
        <SupplierItemButtons supplierId={supplier.id}/>
      </div>
    </div>
  )
}
