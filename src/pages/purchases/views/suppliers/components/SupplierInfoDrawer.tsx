import React from "react";
import { motion } from "framer-motion";
import { useModal, useSuppliers } from "../../../../../shared/hooks";
import { RightDrawerLayout } from "../../../../../layouts/RightDrawerLayout";
import { DrawerInfoStatus } from "../../../../../shared/components/drawer/DrawerInfoStatus";
import { SpinnerContainer } from "../../../../../shared/components";
import type { Supplier } from "../../../../../interfaces/supplier.interface";
import { ModalNames } from "../../../../../interfaces/ui/modal.interface";

const getInitial = (text: string) => text.charAt(0).toUpperCase();

export const SupplierInfoDrawer: React.FC = () => {
  const { onOpenModal } = useModal()
  const { supplierSelected, isLoading } = useSuppliers();
  const supplier: Supplier = supplierSelected!!
  const { address, company, createdAt, email, id, isActive, lastname, name, phone, updatedAt } = supplier

  const onOpenModalToConfirmChangeStatus = () => {
    onOpenModal(ModalNames.confirmChangeStatusSupplier)
  }

  return (
    <RightDrawerLayout width="w-xl" title="Información de proveedor">
      <div className="p-4 flex flex-col h-full">
       
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="h-20 w-20 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-4xl font-bold shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {getInitial(name)}
          </motion.div>

          <div>
            <h3 className="text-lg font-semibold">{name} {lastname}</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border
                  ${isActive
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
            >
              {isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-10">
          <p><span className="font-medium text-gray-800">#Id:</span> {id}</p>
          <p><span className="font-medium text-gray-800">Empresa:</span> {company || "No especificada"}</p>
          <p><span className="font-medium text-gray-800">Correo:</span> {email || "No proporcionado"}</p>
          <p><span className="font-medium text-gray-800">Teléfono:</span> {phone || "No proporcionado"}</p>
          <p><span className="font-medium text-gray-800">Fecha de creación:</span> {createdAt}</p>
          <p><span className="font-medium text-gray-800">Última actualización:</span> {updatedAt}</p>
          <p><span className="font-medium text-gray-800">Dirección:</span> {address}</p>
        </div>

        <div className="w-52 mb-4">
          <DrawerInfoStatus status={isActive} onChangeStatus={onOpenModalToConfirmChangeStatus} />
        </div>

        {isLoading && <SpinnerContainer color="border-indigo-700" size="lg" />}
      </div>
    </RightDrawerLayout>
  );
};
