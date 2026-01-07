import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { ModalLayout } from '../../../../../layouts'
import { useModal, useReports, useTheme } from '../../../../../shared/hooks'
import { CancelButton, CreateButton } from '../../../../../shared/components/button'
import { SpinnerContainer } from '../../../../../shared/components/spinner'

export const ModalConfirmCreateAdjustmentsReport: React.FC = () => {

    const { onCloseModal } = useModal()
    const { isLoading, createPdfList } = useReports()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const onGenerateAdjustmentsListReport = () => {
        createPdfList('inventoryAdjustments')
        onCloseModal()
    }

    return (
        <ModalLayout width="w-xl">
            <div
                className={`
                    flex flex-col items-center text-center p-6 rounded-md transition-colors duration-200
                    ${isDark ? 'text-gray-100' : 'text-gray-800'}
                `}
            >
                {
                    isLoading ? (
                        <SpinnerContainer color={isDark ? 'bg-gray-800' : 'bg-white'} size="lg" />
                    ) : (
                        <>
                            <FaRegCheckCircle
                                className={`text-5xl mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}
                            />

                            <h2
                                className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}
                            >
                                ¿Generar reporte de ajustes de inventario?
                            </h2>

                            <p
                                className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                            >
                                Se generará un archivo PDF con la información más reciente de los ajustes de inventario.
                                ¿Deseas continuar?
                            </p>

                            <div className="flex gap-4 w-full">
                                <CreateButton
                                    onClick={onGenerateAdjustmentsListReport}
                                    className="p-2 flex-1"
                                    text="Sí, generar"
                                />
                                <CancelButton
                                    onClick={onCloseModal}
                                    className="p-2 flex-1"
                                    text="No generar"
                                />
                            </div>
                        </>
                    )
                }
            </div>
        </ModalLayout>
    )
}
