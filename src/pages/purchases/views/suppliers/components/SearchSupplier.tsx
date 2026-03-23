import React from 'react'
import { Search } from '../../../../../shared/components/form'
import { useSuppliers } from '../../../../../shared/hooks'

export const SearchSupplier: React.FC = () => {
  
  const { onSetFilterSuppliersByName } = useSuppliers()

  const onChange = ( supplierSearch: string ) => {
   if ( supplierSearch === '' ) return
   onSetFilterSuppliersByName(supplierSearch)
  }

  return (
    <div className='w-full'>
      <Search 
        onChange={ onChange }
        placeholder='Busca proveedores por nombre'
      />
    </div>
  )
}
