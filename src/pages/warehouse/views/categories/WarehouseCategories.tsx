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
import { BsPlus } from 'react-icons/bs'

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
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-7">
          <div className="w-full md:w-96"><SearchCategory /></div>
          
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <SortElementsAlphaButton onToggle={onOrderAlpha} desc={isOrderedAsc} />
              <div className='flex-1 sm:w-60'><SelectCategoriesByStatus /></div>
            </div>
            <CreateButton className='hidden md:flex w-52 p-2' onClick={() => onOpenModal( ModalNames.createCategory )} text='Crear categoría' />
          </div>
        </div>
        <div>
          <TableCategories data={categories ?? []} />
          <PaginationCategories />
        </div>
      </section>

      <button
        onClick={() => onOpenModal(ModalNames.createCategory)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 active:scale-95"
        aria-label="Crear categoría"
      >
        <BsPlus size={32} />
      </button>

      { modalIsOpen && modalName === ModalNames.createCategory && <ModalCreateCategory />}
      { modalIsOpen && modalName === ModalNames.confirmChangeStatusCategory && <ModalConfirmChangeStatusCategory />}
      { rightDrawerIsOpen && drawelName === DrawelNames.infoCategory && <CategoryInfoDrawer />}
      { rightDrawerIsOpen && drawelName === DrawelNames.editCategory && <CategoryEditDrawer />}
    </>
  )
}