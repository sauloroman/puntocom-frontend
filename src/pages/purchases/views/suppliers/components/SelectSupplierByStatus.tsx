import React from 'react'
import { Select } from '../../../../../shared/components'
import { useSuppliers } from '../../../../../shared/hooks'

export const SelectSupplierByStatus: React.FC = () => {
  
  const {
    filter: { isVisible },
    filterSuppliersByStatus,
    getSuppliers,
    onSetFilterStatus,
    onChangePaginationVisibility
  } = useSuppliers()

  const onChange = ( value: string ) => {
    onChangePaginationVisibility( true )
    if ( value === 'Estado' ) {
      getSuppliers()
      onSetFilterStatus(null, true)
      return
    }
    filterSuppliersByStatus( value === 'Activo')
  }

  return (
    <>
      {
        isVisible && <Select 
          onChange={ onChange }
          placeholder='Estado'
          options={['Activo', 'Inactivo']}
        /> 
      }
    </>
  )
}
