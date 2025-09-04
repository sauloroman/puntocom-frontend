import React from 'react'
import { Search } from '../../../../../shared/components'
import { useSuppliers } from '../../../../../shared/hooks'

export const SearchSupplier: React.FC = () => {
  
  const { onSearchSupplier, onSetFilterStatus } = useSuppliers()

  const onChange = ( supplierSearch: string ) => {
    onSearchSupplier( supplierSearch )

    if ( supplierSearch === '' ) {
      onSetFilterStatus(null, true)
    } else {
      onSetFilterStatus(null, false)
    }
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
