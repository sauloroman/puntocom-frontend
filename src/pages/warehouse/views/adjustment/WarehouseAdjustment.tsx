import React from 'react'
import { useModal } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { ButtonOpenModalCreateInventory, ModalCreateInventoryAdjustment } from './components'

export const WarehouseAdjustment: React.FC = () => {
  
  const { modalIsOpen, modalName } = useModal()
  
  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          <ButtonOpenModalCreateInventory />
        </div>
      </section>
      { modalIsOpen && modalName === ModalNames.createInventoryAdjustment && <ModalCreateInventoryAdjustment />}
    </>
  )
}
