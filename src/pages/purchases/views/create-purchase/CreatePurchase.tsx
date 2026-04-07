import React, { useEffect } from 'react'
import { useModal, usePurchase } from '../../../../shared/hooks'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { ModalAddProductPurchase, ListProducts, PurchaseOrder } from './components'
import { Spinner } from '../../../../shared/components/spinner'

export const CreatePurchase: React.FC = () => {

  const { products, onGetProductsToBeInPurchase, isLoading } = usePurchase()
  const { modalIsOpen, modalName } = useModal()

  useEffect(() => {
    if ( !products ) onGetProductsToBeInPurchase()
  }, [])

  if ( isLoading ) {
    return (
      <div className='h-[80vh] flex justify-center items-center'><Spinner size='lg' /></div>
    )
  }

  return (
    <div className='flex flex-col gap-5 md:grid md:grid-cols-5'>
      <div className='col-span-3'>
        <ListProducts products={products ?? []} />
      </div>
      <div className="col-span-2">
        <PurchaseOrder />
      </div>
      {modalIsOpen && modalName === ModalNames.addProductPurchase && <ModalAddProductPurchase />}
    </div>
  )
}
