import React from 'react'
import { useSuppliers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

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
