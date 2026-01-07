import React, { useEffect } from 'react'
import { ModalNames } from '../../interfaces/ui/modal.interface'
import { PuntoComLayout } from '../../layouts'
import { useModal, useReports, useTheme } from '../../shared/hooks'
import { ModalConfirmDeleteReport, ReportsFolder, TableReports, ViewReport } from './components'

export const Reports: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { allReports, getAllReports } = useReports()
  const { modalName, modalIsOpen } = useModal()

  useEffect(() => {
    if (!allReports) {
      getAllReports()
    }
  }, [])

  return (
    <PuntoComLayout>
      <div className="grid grid-cols-4 gap-5">
        <div className='col-span-2'>
          <ReportsFolder />
          <TableReports />
        </div>
        <div className='col-span-2'>
          <h2 className={`
            font-bold text-md uppercase transition-colors
            ${isDark ? 'text-gray-200' : 'text-gray-900'}
          `}>
            Reporte Seleccionado
          </h2>
          <ViewReport />
        </div>
      </div>
      {modalIsOpen && modalName === ModalNames.confirmDeleteReport && <ModalConfirmDeleteReport />}
    </PuntoComLayout>
  )
}