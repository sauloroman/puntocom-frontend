import React from 'react'
import { ModalLayout } from '../../../layouts/ModalLayout'
import { FaExclamationTriangle } from 'react-icons/fa'
import { CancelButton, ConfirmButton } from '../../../shared/components'
import { useModal, useReports, useTheme } from '../../../shared/hooks'

export const ModalConfirmDeleteReport: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { onCloseModal } = useModal()
  const { deleteReportById, reportIdSelected } = useReports()

  const onConfirmDelete = () => {
    if (!reportIdSelected) return
    deleteReportById()
    onCloseModal()
  }

  return (
    <ModalLayout width='w-xl'>
      <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
        <div className={`
          flex items-center justify-center w-16 h-16 rounded-full transition-colors
          ${isDark 
            ? 'bg-red-900/30 text-red-400' 
            : 'bg-red-100 text-red-600'
          }
        `}>
          <FaExclamationTriangle size={32} />
        </div>

        <h2 className={`
          text-xl font-semibold transition-colors
          ${isDark ? 'text-gray-100' : 'text-gray-800'}
        `}>
          Eliminar reporte
        </h2>

        <p className={`
          transition-colors
          ${isDark ? 'text-gray-400' : 'text-gray-600'}
        `}>
          ¿Estás seguro de que deseas eliminar el reporte? <br /> Esta acción no se puede deshacer.
        </p>

        <div className="flex items-center gap-4 pt-4 w-full">
          <ConfirmButton 
            onClick={onConfirmDelete} 
            className='p-2 flex-1 bg-red-600 hover:bg-red-700 text-white'
            text='Sí, eliminar'
          />
          <CancelButton 
            className='p-2 flex-1' 
            onClick={onCloseModal} 
            text='Cancelar' 
          />
        </div>
      </div>
    </ModalLayout>
  )
}