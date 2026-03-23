import React from 'react'
import { useSuppliers } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

export const SelectSupplierByStatus: React.FC = () => {

  const { onSetFilterSuppliersByStatus } = useSuppliers()

  const onChange = (status: string) => {
    if (status === 'Estado') return
    onSetFilterSuppliersByStatus(status)
  }

  return (
    <Select
      onChange={onChange}
      placeholder='Estado'
      options={['Activo', 'Inactivo']}
    />
  )
}
