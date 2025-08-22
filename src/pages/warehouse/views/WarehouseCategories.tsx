import React, { useEffect } from 'react'
import { CreateButton, Search, Select, TableCategories } from '../../../shared/components'
import { useCategories } from '../../../shared/hooks'

export const WarehouseCategories: React.FC = () => {

  const { getCategories, categories } = useCategories()

  useEffect(() => {
    if ( !categories ) {
      getCategories()
    }
  }, [])

  return (
    <section>
      <div className="flex items-center justify-between mb-7">
        <Search placeholder='Buscar categoría por nombre' />
        <div className='flex items-center gap-5'>
          <Select 
            placeholder='Estado'
            options={['Activo', 'Inactivo']}
          />
          <div className='w-40'>
            <CreateButton text='Crear categoría' />
          </div>
        </div>
      </div>
      <div>
        <TableCategories data={categories ?? []} />
      </div>
    </section>
  )
}
