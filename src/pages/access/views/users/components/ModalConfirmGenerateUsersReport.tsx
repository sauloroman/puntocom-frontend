import React from 'react'
import { ModalLayout } from '../../../../../layouts/ModalLayout'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useModal, useReports, useTheme } from '../../../../../shared/hooks'
import { CancelButton, CreateButton, SpinnerContainer } from '../../../../../shared/components'

export const ModalConfirmGenerateUsersReport: React.FC = () => {

    const { createPdfList, isLoading } = useReports()
    const { onCloseModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const onGenerateUserReport = () => {
        createPdfList('users')
        onCloseModal()
    }

    return (
        <ModalLayout width='w-lg' >
            <div className="flex flex-col items-center text-center p-6">
                    {
                        isLoading
                        ? (<SpinnerContainer color={isDark ? "bg-gray-800" : "bg-white"} size="lg" />)
                        : (
                            <>
                                <FaRegCheckCircle className={`text-5xl mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            
                                <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                    ¿Generar reporte de usuarios?
                                </h2>
            
                                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Se generará un archivo PDF con la información más reciente de los usuarios. 
                                    ¿Deseas continuar?
                                </p>
            
                                <div className="flex gap-4 w-full">
                                    <CreateButton onClick={onGenerateUserReport} className='p-2 flex-1' text="Sí, generar"/>
                                    <CancelButton onClick={onCloseModal} text="No generar" className='p-2 flex-1' />
                                </div>
                            </>
                        )
                    }
                  </div>
        </ModalLayout>
    )
}