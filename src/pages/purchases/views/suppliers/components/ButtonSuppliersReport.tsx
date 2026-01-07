import React from 'react'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'
import { useModal } from '../../../../../shared/hooks'
import { GenerateReportButton } from '../../../../../shared/components/button'

export const ButtonSuppliersReport: React.FC = () => {

  const { onOpenModal } = useModal()

  return (
    <div onClick={() => onOpenModal(ModalNames.confirmCreateSupplierReport)}>
        <GenerateReportButton text="Exportar" />
    </div>
  )
}
