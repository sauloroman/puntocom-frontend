import React, { useEffect } from 'react'
import { CreateButton, Search, Select, TableCategories } from '../../../shared/components'
import { useCategories, useDrawer, useModal } from '../../../shared/hooks'
import { ModalNames } from '../../../interfaces/ui/modal.interface'
import { ModalCreateCategory } from '../../../shared/components/modal/ModalCreateCategory'
import { DrawelNames } from '../../../interfaces/ui/drawel.interface'
import { CategoryInfoDrawer } from '../../../shared/components/drawer/CategoryInfoDrawer'
import { CategoryEditDrawer } from '../../../shared/components/drawer/CategoryEditDrawer'

export const WarehouseCategories: React.FC = () => {

  const { getCategories, categories } = useCategories()
  const { modalIsOpen, modalName, onOpenModal } = useModal()
  const { rightDrawerIsOpen, drawelName } = useDrawer()

  useEffect(() => {
    if ( !categories ) {
      getCategories()
    }
  }, [])

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-7">
          <Search placeholder='Buscar categoría por nombre' />
          <div className='flex items-center gap-5'>
            <Select 
              placeholder='Estado'
              options={['Activo', 'Inactivo']}
            />
            <div className='w-40' onClick={() => onOpenModal( ModalNames.createCategory )}>
              <CreateButton text='Crear categoría' />
            </div>
          </div>
        </div>
        <div>
          <TableCategories data={categories ?? []} />
        </div>
      </section>
      { modalIsOpen && modalName === ModalNames.createCategory && <ModalCreateCategory/>}
      { rightDrawerIsOpen && drawelName === DrawelNames.infoCategory && <CategoryInfoDrawer />}
      { rightDrawerIsOpen && drawelName === DrawelNames.editCategory && <CategoryEditDrawer />}
    </>
  )
}
