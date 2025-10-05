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
  SelectProductsByStatus,
  PaginationProducts,
  ModalProductImage,
  FilterProductsBySuppliersDrawer,
  FilterTags,
  FilterProductsByCategories,
  FilterProductsBySupplier
} from './components'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'
import { GenerateReport, SortElementsAlpha } from '../../../../shared/components/button'

export const WarehouseProducts: React.FC = () => {

  const { rightDrawerIsOpen, leftDrawerIsOpen, drawelName } = useDrawer()
  const { filter, products, getProducts, onOrderAlpha, isOrderedAsc, isLoading } = useProducts()
  const { categories, getCategories, getAllCategories } = useCategories()
  const { suppliers, getSuppliers, getAllSuppliers } = useSuppliers()
  const { onOpenModal, modalIsOpen, modalName, onOpenConfirmAdminPassword } = useModal()

  useEffect(() => {
    if (!categories) {
      getCategories()
    }

    if (!suppliers) {
      getSuppliers()
    }

    if (!products) {
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

          <div className='flex items-center gap-3 justify-end'>
            <SortElementsAlpha onToggle={onOrderAlpha} desc={isOrderedAsc} />
            { filter.supplier.id === null && (<FilterProductsByCategories />) }
            { filter.category.id === null && (<FilterProductsBySupplier />) }
            <div className='w-48'><SelectProductsByStatus /></div>
            <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateProductsReport)} />
            <div className='w-40' onClick={openCreateProductModal}><CreateButton text='Crear Producto' /></div>
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
