import React, { useEffect } from 'react'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
import { useCategories, useDrawer, useModal } from '../../../../shared/hooks'
import { CreateButton } from '../../../../shared/components/button'
import { 
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

export const WarehouseCategories: React.FC = () => {

  const { getCategories, categories, onOrderAlpha, isOrderedAsc, allCategories, getAllCategories } = useCategories()
  const { modalIsOpen, modalName, onOpenModal } = useModal()
  const { rightDrawerIsOpen, drawelName } = useDrawer()

  useEffect(() => {
    if ( !categories ) getCategories()
    if ( !allCategories ) getAllCategories()
  }, [])

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          <div className="w-96">
            <SearchCategory />
          </div>
          <div className='flex items-center gap-5'>
            <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
            <div className='w-50'>
              <SelectCategoriesByStatus />
            </div>
            <CreateButton className='w-40 p-2' onClick={() => onOpenModal( ModalNames.createCategory )} text='Crear categoría' />
          </div>
        </div>
        <div>
          <TableCategories data={categories ?? []} />
          <PaginationCategories />
        </div>
      </section>
      { modalIsOpen && modalName === ModalNames.createCategory && <ModalCreateCategory />}
      { modalIsOpen && modalName === ModalNames.confirmChangeStatusCategory && <ModalConfirmChangeStatusCategory />}
      { rightDrawerIsOpen && drawelName === DrawelNames.infoCategory && <CategoryInfoDrawer />}
      { rightDrawerIsOpen && drawelName === DrawelNames.editCategory && <CategoryEditDrawer />}
    </>
  )
}
