import React from 'react'
import { GenerateReportButton } from '../../../../../shared/components/button'
import { useModal } from '../../../../../shared/hooks'
import { ModalNames } from '../../../../../interfaces/ui/modal.interface'

export const ButtonSuppliersReport: React.FC = () => {

  const { onOpenModal } = useModal()

  return (
    <div onClick={() => onOpenModal(ModalNames.confirmCreateSupplierReport)}>
        <GenerateReportButton text="Exportar" />
    </div>
  )
}
