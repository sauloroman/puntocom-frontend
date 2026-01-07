import React from "react"
import { useModal, useSuppliers, useTheme } from "../../../../../shared/hooks"
import { RightDrawerLayout } from "../../../../../layouts/RightDrawerLayout"
import { SpinnerContainer } from "../../../../../shared/components"
import type { Supplier } from "../../../../../interfaces/dto/supplier.interface"
import { AvatarInitialSquare } from "../../../../../shared/components/avatar/AvatarInitialSquare"
import { WhatsAppButton } from "../../../../../shared/components/button/WhatsAppButton"
import { ModalNames } from "../../../../../interfaces/ui/modal.interface"

export const SupplierInfoDrawer: React.FC = () => {

  const { supplierSelected, isLoading } = useSuppliers()
  const { onOpenModal } = useModal()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  if (!supplierSelected) {
    return (
      <RightDrawerLayout width="w-xl" title="Información de proveedor">
        <div className={`flex items-center justify-center h-full ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          No hay proveedor seleccionado
        </div>
      </RightDrawerLayout>
    )
  }

  const {
    id,
    name,
    lastname,
    company,
    email,
    phone,
    address,
    createdAt,
    updatedAt,
    isActive,
  } = supplierSelected as Supplier

  return (
    <RightDrawerLayout width="w-xl" title="Información de proveedor">
      <div className="p-4 flex flex-col h-full">

        <div className="flex items-center gap-4 mb-6">
          <AvatarInitialSquare name={name} />
          <div>
            <h3 className={`font-semibold text-xl mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {name} {lastname}
            </h3>
            <span
              className={`
                px-3 py-1 rounded-full text-xs font-medium border
                ${isActive
                  ? isDark
                    ? 'bg-green-800 text-green-300 border-green-600'
                    : 'bg-green-100 text-green-700 border-green-300'
                  : isDark
                    ? 'bg-gray-700 text-gray-400 border-gray-600'
                    : 'bg-gray-100 text-gray-600 border-gray-300'}
              `}
            >
              {isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        <div className={`px-1 space-y-3 text-sm mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>#Id:</span> {id}
          </p>
          <p>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Empresa:</span> {company || "No especificada"}
          </p>
          <p>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Correo:</span> {email || "No proporcionado"}
          </p>
          <p>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Teléfono:</span> {phone || "No proporcionado"}
          </p>
          <p>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Dirección:</span> {address || "No especificada"}
          </p>
          <p>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Fecha de creación:</span> {createdAt}
          </p>
          <p>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Última actualización:</span> {updatedAt}
          </p>
        </div>
        <WhatsAppButton className="w-full p-4" text="Enviar Mensaje" onClick={() => onOpenModal(ModalNames.sendMessageToSupplier)} />
        {isLoading && (
          <div className="flex justify-center mt-auto">
            <SpinnerContainer color={isDark ? "border-indigo-400" : "border-indigo-700"} size="lg" />
          </div>
        )}
      </div>
    </RightDrawerLayout>
  )
}
