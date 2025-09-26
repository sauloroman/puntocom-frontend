import React, { useEffect } from 'react'
import { useCategories, useDrawer, useModal } from '../../../../shared/hooks'
import { CreateButton } from '../../../../shared/components'
import { ModalNames } from '../../../../interfaces/ui/modal.interface'
import { DrawelNames } from '../../../../interfaces/ui/drawel.interface'
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
import { SortElementsAlpha } from '../../../../shared/components/button'

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
          <SearchCategory />
          <div className='flex items-center gap-5'>
            <SortElementsAlpha onToggle={onOrderAlpha} desc={isOrderedAsc} />
            <div className='w-50'>
              <SelectCategoriesByStatus />
            </div>
            <div className='w-40' onClick={() => onOpenModal( ModalNames.createCategory )}>
              <CreateButton text='Crear categoría' />
            </div>
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
