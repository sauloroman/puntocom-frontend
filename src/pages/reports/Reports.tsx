import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'
import { ModalConfirmDeleteReport, ReportsFolder, TableReports, ViewReport } from './components'
import { useModal, useReports } from '../../shared/hooks'
import { ModalNames } from '../../interfaces/ui/modal.interface'

export const Reports: React.FC = () => {

  const { allReports, getAllReports } = useReports()
  const { modalName, modalIsOpen } = useModal()

  useEffect(() => {
    if ( !allReports ) {
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
          <h2 className='font-bold text-md uppercase'>Reporte Seleccionado</h2>
          <ViewReport />
        </div>
      </div>
      { modalIsOpen && modalName === ModalNames.confirmDeleteReport && <ModalConfirmDeleteReport />}
    </PuntoComLayout>
  )
}
