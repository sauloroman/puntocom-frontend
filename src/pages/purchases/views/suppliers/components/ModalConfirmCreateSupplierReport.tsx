import React from "react";
import { ModalLayout } from "../../../../../layouts/ModalLayout";
import { FaRegCheckCircle } from "react-icons/fa";
import { CancelButton, CreateButton, SpinnerContainer } from "../../../../../shared/components";
import { useModal, useSuppliers } from "../../../../../shared/hooks";

export const ModalConfirmCreateSupplierReport: React.FC = ({
}) => {

  const { onCloseModal, onOpenModal } = useModal()
  const { isLoading } = useSuppliers()


  return (
    <ModalLayout width="w-xl">
      <div className="flex flex-col items-center text-center p-6">
        {
            isLoading
            ? (<SpinnerContainer color="bg-white" size="lg" />)
            : (
                <>
                    <FaRegCheckCircle className="text-indigo-600 text-5xl mb-4" />

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    ¿Generar reporte de proveedores?
                    </h2>

                    <p className="text-gray-600 text-sm mb-6">
                    Se generará un archivo PDF con la información más reciente de los proveedores. 
                    ¿Deseas continuar?
                    </p>

                    <div className="flex gap-4">
                    <div onClick={() => {}}><CreateButton text="Sí, generar"/></div>
                    <div onClick={onCloseModal}><CancelButton text="No generar" /></div>
                    </div>
                </>
            )
        }
      </div>
    </ModalLayout>
  );
};
