import React, { useEffect, useState } from 'react'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { useCategories, useDrawer, useModal, useSuppliers, useProducts, useReports, useAuth } from '../../../../shared/hooks'
import { CreateButton, SortElementsAlphaButton, FAB, FilterByPriceButton } from '../../../../shared/components/button'
import {
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
  SelectProductsBySupplier,
  SelectProductsByCategory,
  AppliedProductsFilter,
  ModalProductsRangePrices
} from './components'
import { ModalRequestPasswordAdmin } from '../../../access/views/users/components'
import { GenerateReport } from '../../../reports/components'
import { SpinnerContainer, SpinnerScreen } from '../../../../shared/components/spinner'
import { BsPlus, BsFileEarmarkText } from 'react-icons/bs'
import { Roles } from '../../../../interfaces/dto/user.interface'

export const WarehouseProducts: React.FC = () => {

  const { user: authenticatedUser } = useAuth()
  const { rightDrawerIsOpen, drawelName } = useDrawer()
  const { onGetProducts, onOrderAlpha, isOrderedAsc, isLoading, products } = useProducts()
  const { categories, onGetCategories, onGetAllCategories } = useCategories()
  const { suppliers, onGetSuppliers, onGetAllSuppliers } = useSuppliers()
  const { onOpenModal, modalIsOpen, modalName, onOpenConfirmAdminPassword } = useModal()
  const { isLoading: isReportLoading } = useReports()

  const [showFABMenu, setShowFABMenu] = useState(false)

  const role = authenticatedUser?.role

  useEffect(() => {
    if ( !products )onGetProducts()
  }, [])

  useEffect(() => {
    if (!categories) onGetCategories()
  }, [])

  useEffect(() => {
    if (!suppliers) onGetSuppliers()
  }, [])

  const openCreateProductModal = () => {
    onGetAllCategories()
    onGetAllSuppliers()
    onOpenModal(ModalNames.createProdut)
    setShowFABMenu(false)
  }

  const openReportModal = () => {
    onOpenConfirmAdminPassword(ModalNames.confirmCreateProductsReport)
    setShowFABMenu(false)
  }

  if ( isReportLoading ) {
    return <SpinnerScreen />
  }

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 mb-6">
          
          <div className="w-full flex justify-between items-center">
            <div className="md:w-1/4"><SearchProduct /></div>
            <AppliedProductsFilter />
          </div>

          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            
            <div className='flex items-center gap-2 flex-1'>
              <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
              <FilterByPriceButton modal={ModalNames.rangeProductsPrices} />
              
              <div className='w-7/12 flex items-center gap-3'>
                <SelectProductsByStatus />
                <SelectProductsBySupplier />
                <SelectProductsByCategory />
              </div>
            </div>

            <div className='hidden md:flex items-center gap-3'>
              {
                [Roles.ADMINISTRADOR].includes(role as Roles) && (
                  <>         
                    <GenerateReport onConfirm={() => onOpenConfirmAdminPassword(ModalNames.confirmCreateProductsReport)} />
                    <CreateButton className='w-40 p-2' onClick={openCreateProductModal} text='Crear Producto' />
                  </>
                )
              }
            </div>
          </div>
        </div>

        {
          isLoading
            ? (<div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>)
            : (<ProductsGrid />)
        }
        <PaginationProducts />

      </section>

      {showFABMenu && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowFABMenu(false)}
          />
          
          <div className="md:hidden fixed bottom-24 right-6 flex flex-col gap-3 z-50">
            <button
              onClick={openReportModal}
              className="flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
            >
              <BsFileEarmarkText size={20} />
              <span className="text-sm font-medium pr-2">Generar Reporte</span>
            </button>

            <button
              onClick={openCreateProductModal}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 px-4 py-3"
            >
              <BsPlus size={24} />
              <span className="text-sm font-medium pr-2">Crear Producto</span>
            </button>
          </div>
        </>
      )}

      <FAB onClick={() => setShowFABMenu(!showFABMenu)} />

      {modalIsOpen && modalName === ModalNames.confirmAdminPassword && <ModalRequestPasswordAdmin />}
      {modalIsOpen && modalName === ModalNames.createProdut && <ModalCreateProduct />}
      {modalIsOpen && modalName === ModalNames.confirmChangeStatusProduct && <ModalConfirmChangeStatusProduct />}
      {modalIsOpen && modalName === ModalNames.confirmCreateProductsReport && <ModalConfirmCreateProductsReport />}
      {modalIsOpen && modalName === ModalNames.seeProductImage && <ModalProductImage />}
      {modalIsOpen && modalName === ModalNames.rangeProductsPrices && <ModalProductsRangePrices />}

      {rightDrawerIsOpen && drawelName === DrawelNames.infoProduct && <ProductInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editProduct && <ProductEditDrawer />}
    </>
  )
}