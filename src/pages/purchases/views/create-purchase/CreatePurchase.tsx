import React, { useEffect } from 'react'
import { useDrawer, useModal, useProducts } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { ModalAddProductPurchase, ListProducts, PurchaseOrder } from './components'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { FilterProductsBySuppliersDrawer } from '../../../warehouse/views/products/components'

export const CreatePurchase: React.FC = () => {

  const { products, getProducts } = useProducts()
  const { modalIsOpen, modalName } = useModal()
  const { leftDrawerIsOpen, drawelName } = useDrawer()

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='grid grid-cols-2 gap-5'>
      <ListProducts products={products ?? []} />
      <PurchaseOrder />
      {modalIsOpen && modalName === ModalNames.addProductPurchase && <ModalAddProductPurchase />}
      {leftDrawerIsOpen && drawelName === DrawelNames.filterProductsSuppliers && <FilterProductsBySuppliersDrawer />}
    </div>
  )
}
