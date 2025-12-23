import React from 'react'
import { useModal } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { ModalAddProductPurchase, ListProducts, PurchaseOrder } from './components'

export const CreatePurchase: React.FC = () => {

  const { modalIsOpen, modalName } = useModal()

  return (
    <div className='grid grid-cols-2 gap-5'>
      <ListProducts />
      <PurchaseOrder />
      { modalIsOpen && modalName === ModalNames.addProductPurchase && <ModalAddProductPurchase /> }
    </div>
  )
}
    