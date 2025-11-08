import React, { useEffect } from 'react'
import { ModalSendMessageToSupplier, ProductsGrid } from './components'
import { useModal, useProducts } from '../../../../shared/hooks'
import { SpinnerContainer } from '../../../../shared/components'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'

export const WarehouseLowStock: React.FC = () => {

  const { onGetProductsByStock, isLoading, productNormalStock, productWarningStock, productsLowStock } = useProducts()
  const { modalIsOpen, modalName } = useModal()

  useEffect(() => {
    if ( productNormalStock.length === 0 && productWarningStock.length === 0 && productsLowStock.length === 0 ) {
      onGetProductsByStock()
    }
  }, [])

  return (
    <>
      {
        isLoading
        ? <div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>
        : <ProductsGrid />
      }
      { modalIsOpen && modalName === ModalNames.sendMessageToSupplier && <ModalSendMessageToSupplier />}
      
    </>
  )
}
