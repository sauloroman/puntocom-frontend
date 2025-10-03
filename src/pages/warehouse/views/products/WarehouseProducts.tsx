import React, { useEffect } from 'react'
import { CreateButton, SpinnerContainer } from '../../../../shared/components'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { useCategories, useDrawer, useModal, useSuppliers } from '../../../../shared/hooks'
import { 
  FilterProductsByCategoryDrawer, 
  ModalConfirmChangeStatusProduct, 
  ModalConfirmCreateProductsReport, 
  ModalCreateProduct, 
  ProductEditDrawer, 
  ProductInfoDrawer, 
  ProductsGrid, 
  SearchProduct, 
  SelectFilterCategory,
  SelectProductsByStatus,
  PaginationProducts
} from './components'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'
import { GenerateReport, SortElementsAlpha } from '../../../../shared/components/button'

export const WarehouseProducts: React.FC = () => {
  
  const { rightDrawerIsOpen, leftDrawerIsOpen, drawelName } = useDrawer()
  const { products, getProducts, onOrderAlpha, isOrderedAsc, isLoading, filter: { category } } = useProducts()
  const { categories, getCategories, getAllCategories } = useCategories()
  const { suppliers, getSuppliers, getAllSuppliers } = useSuppliers()
  const { onOpenModal, modalIsOpen, modalName, onOpenConfirmAdminPassword } = useModal()

  useEffect(() => {
    if ( !categories ) {
      getCategories()
    } 

    if ( !suppliers ) {
      getSuppliers()
    }

    if ( !products ) {
      getProducts()
    }
  }, [])

  const openCreateProductModal = () => {
    getAllCategories()
    getAllSuppliers()
    onOpenModal(ModalNames.createProdut)
  }

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          
          <SearchProduct />

          <div className='flex items-center gap-5'>
            <SelectFilterCategory />
            <SortElementsAlpha onToggle={ onOrderAlpha } desc={isOrderedAsc} />
            <div className='w-full'><SelectProductsByStatus /></div>
            <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateProductsReport)} />
            <div className='w-md' onClick={openCreateProductModal}><CreateButton text='Crear producto' /></div>
          </div>

        </div>
        <div className='min-h-20'>
          {
            isLoading
            ? (<SpinnerContainer size='lg' color='bg-white' />)
            : (<ProductsGrid />)
          }
          <PaginationProducts />
        </div>
      </section>
      {modalIsOpen &&  modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      {modalIsOpen &&  modalName === ModalNames.createProdut && <ModalCreateProduct />}
      {modalIsOpen &&  modalName === ModalNames.confirmChangeStatusProduct && <ModalConfirmChangeStatusProduct />}
      {modalIsOpen &&  modalName === ModalNames.confirmCreateProductsReport && <ModalConfirmCreateProductsReport />}
      {rightDrawerIsOpen && drawelName === DrawelNames.infoProduct && <ProductInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editProduct && <ProductEditDrawer />}
      {leftDrawerIsOpen && drawelName === DrawelNames.filterProductsByCategory && <FilterProductsByCategoryDrawer />}
    </>
  )
}
