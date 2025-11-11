import React from 'react'
import { useModal, useReports } from '../../../../../shared/hooks'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { CancelButton, CreateButton, SpinnerContainer } from '../../../../../shared/components'
import { FaRegCheckCircle } from 'react-icons/fa'

export const ModalConfirmCreateAdjustmentsReport: React.FC = () => {
    const { onCloseModal } = useModal()
    const { isLoading, createPdfList } = useReports()

    const onGenerateAdjustmentsListReport = () => {
        createPdfList('inventoryAdjustments')
        onCloseModal()
    }

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
                                    ¿Generar reporte de ajustes de inventario?
                                </h2>

                                <p className="text-gray-600 text-sm mb-6">
                                    Se generará un archivo PDF con la información más reciente de los ajustes de inventario.
                                    ¿Deseas continuar?
                                </p>

                                <div className="flex gap-4 w-full">
                                    <CreateButton onClick={onGenerateAdjustmentsListReport} className='p-2 flex-1' text="Sí, generar" />
                                    <CancelButton onClick={onCloseModal} className='p-2 flex-1' text="No generar" />
                                </div>
                            </>
                        )
                }
            </div>
        </ModalLayout>
    )
}
