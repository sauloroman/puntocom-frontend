import React, { useEffect } from 'react'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { useAuth, useCategories, useDrawer, useModal } from '../../../../shared/hooks'
import { CreateButton, FAB } from '../../../../shared/components/button'
import {
  AppliedCategoryFilters,
  CategoryEditDrawer,
  CategoryInfoDrawer,
  ModalConfirmChangeStatusCategory,
  ModalCreateCategory,
  PaginationCategories,
  SearchCategory,
  SelectCategoriesByStatus,
  TableCategories
} from './components'
import { SortElementsAlphaButton } from '../../../../shared/components/button'
import { SpinnerContainer } from '../../../../shared/components/spinner'
import { Roles } from '../../../../interfaces/dto/user.interface'

export const WarehouseCategories: React.FC = () => {

  const { user: authenticatedUser } = useAuth()
  const {
    allCategories,
    categories,
    isLoading,
    isOrderedAsc,
    onGetAllCategories,
    onGetCategories,
    onOrderAlpha,
  } = useCategories()
  const { modalIsOpen, modalName, onOpenModal } = useModal()
  const { rightDrawerIsOpen, drawelName } = useDrawer()

  useEffect(() => {
    if (!categories) onGetCategories()
    if (!allCategories) onGetAllCategories()
  }, [])

  const role = authenticatedUser?.role

  return (
    <>
      <section>
        <div className="w-full flex justify-between items-center mb-5">
          <div className="md:w-1/4"><SearchCategory /></div>
          <AppliedCategoryFilters />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-7">

          <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3'>
            <div className='flex items-center gap-3'>
              <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
              <div className='flex-1 sm:w-60'><SelectCategoriesByStatus /></div>
            </div>
          </div>

          { [Roles.ADMINISTRADOR].includes(role as Roles) &&  
            <CreateButton 
              className='hidden md:flex w-52 p-2' 
              text='Crear categoría' 
              onClick={() => onOpenModal(ModalNames.createCategory)} 
            /> 
          }
          
        </div>
        <div>
          {
            isLoading
            ? (<div className='my-24'><SpinnerContainer size='lg' color='bg-white' /></div>)
            : (<TableCategories data={categories ?? []} />)
          }
          <PaginationCategories />
        </div>
      </section>

      <FAB onClick={() => onOpenModal(ModalNames.createCategory)} />

      {modalIsOpen && modalName === ModalNames.createCategory && <ModalCreateCategory />}
      {modalIsOpen && modalName === ModalNames.confirmChangeStatusCategory && <ModalConfirmChangeStatusCategory />}
      {rightDrawerIsOpen && drawelName === DrawelNames.infoCategory && <CategoryInfoDrawer />}
      {rightDrawerIsOpen && drawelName === DrawelNames.editCategory && <CategoryEditDrawer />}
    </>
  )
}