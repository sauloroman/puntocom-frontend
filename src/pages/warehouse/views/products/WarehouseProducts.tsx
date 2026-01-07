import React, { useEffect } from 'react'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { useCategories, useDrawer, useModal, useSuppliers, useProducts } from '../../../../shared/hooks'
import { CreateButton, SortElementsAlphaButton } from '../../../../shared/components/button'
import {
  FilterProductsByCategoryDrawer,
  ModalConfirmChangeStatusProduct,
  ModalConfirmCreateProductsReport,
  ModalCreateProduct,
  ProductEditDrawer,
  ProductInfoDrawer,
  ProductsGrid,
  SearchProduct,
  SelectProductsByStatus,
  PaginationProducts,
  ModalProductImage,
  FilterProductsBySuppliersDrawer,
  FilterTags,
  FilterProductsByCategories,
  FilterProductsBySupplier
} from './components'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'
import { GenerateReport } from '../../../reports/components'
import { SpinnerContainer } from '../../../../shared/components/spinner'

export const WarehouseProducts: React.FC = () => {

  const { rightDrawerIsOpen, leftDrawerIsOpen, drawelName } = useDrawer()
  const { filter, getProducts, onOrderAlpha, isOrderedAsc, isLoading, products } = useProducts()
  const { categories, getCategories, getAllCategories } = useCategories()
  const { suppliers, getSuppliers, getAllSuppliers } = useSuppliers()
  const { onOpenModal, modalIsOpen, modalName, onOpenConfirmAdminPassword } = useModal()

  useEffect(() => {
    if ( !products ){
      getProducts()
    }
    
    if (!categories) {
      getCategories()
    }

    if (!suppliers) {
      getSuppliers()
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
          <div className="w-96"><SearchProduct /></div>
          <div className='flex items-center gap-3 justify-end'>
            <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
            { filter.supplier.id === null && (<FilterProductsByCategories />) }
            { filter.category.id === null && (<FilterProductsBySupplier />) }
            <div className='w-48'><SelectProductsByStatus /></div>
            <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateProductsReport)} />
            <CreateButton className='w-40 p-2' onClick={openCreateProductModal} text='Crear Producto' />
          </div>
        </div>

        <FilterTags />

        {
          isLoading
            ? (<div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>)
            : (<ProductsGrid />)
        }
        <PaginationProducts />

      </section>

      {modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      {modalIsOpen && modalName === ModalNames.createProdut && <ModalCreateProduct />}
      {modalIsOpen && modalName === ModalNames.confirmChangeStatusProduct && <ModalConfirmChangeStatusProduct />}
      {modalIsOpen && modalName === ModalNames.confirmCreateProductsReport && <ModalConfirmCreateProductsReport />}
      {modalIsOpen && modalName === ModalNames.seeProductImage && <ModalProductImage />}

      {rightDrawerIsOpen && drawelName === DrawelNames.infoProduct && <ProductInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editProduct && <ProductEditDrawer />}
      {leftDrawerIsOpen && drawelName === DrawelNames.filterProductsCategories && <FilterProductsByCategoryDrawer />}
      {leftDrawerIsOpen && drawelName === DrawelNames.filterProductsSuppliers && <FilterProductsBySuppliersDrawer />}
    </>
  )
}
