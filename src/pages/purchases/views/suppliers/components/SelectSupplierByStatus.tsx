import React from 'react'
import { Select } from '../../../../../shared/components'

export const SelectSupplierByStatus: React.FC = () => {
  
  const onChange = () => {

  }

  return (
    <div>
      <Select 
        onChange={ onChange }
        placeholder='Estado'
        options={['Activo', 'Inactivo']}
      />
    </div>
  )
}
