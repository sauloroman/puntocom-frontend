import React, { useEffect } from 'react'
import { useDrawer, useModal, usePurchase } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { ModalAddProductPurchase, ListProducts, PurchaseOrder } from './components'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { FilterProductsBySuppliersDrawer } from '../../../warehouse/views/products/components'
import { Spinner } from '../../../../shared/components/spinner'

export const CreatePurchase: React.FC = () => {

  const { products, getProductsToBeInPurchase, isLoading } = usePurchase()
  const { modalIsOpen, modalName } = useModal()
  const { leftDrawerIsOpen, drawelName } = useDrawer()

  useEffect(() => {
    if ( !products ) {
      getProductsToBeInPurchase()
    }
  }, [])

  if ( isLoading ) {
    return (
      <div className='h-[80vh] flex justify-center items-center'><Spinner size='lg' /></div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-5'>
      <ListProducts products={products ?? []} />
      <PurchaseOrder />
      {modalIsOpen && modalName === ModalNames.addProductPurchase && <ModalAddProductPurchase />}
      {leftDrawerIsOpen && drawelName === DrawelNames.filterProductsSuppliers && <FilterProductsBySuppliersDrawer />}
    </div>
  )
}
