import React from 'react'
import type { AdjustmentEnum } from '../../../../../interfaces/dto/inventory-adjustment.interface'
import { useInventoryAdjustment } from '../../../../../shared/hooks'
import { Select } from '../../../../../shared/components/select'

const placeholder = 'Tipo de ajuste'
const options = ['Entradas', 'Salidas']

export const FilterSelectAdjustmentType: React.FC = () => {

  const { getInventoryAdjustments, onSetFilterAdjustmentType } = useInventoryAdjustment()

  const onSelectFilter = ( value: string ) => {
    if ( value.trim() === placeholder ) {
      getInventoryAdjustments();
      onSetFilterAdjustmentType(null)
      return
    }

    const formattedValue = value.trim().toLowerCase().slice(0, -1)
    onSetFilterAdjustmentType(formattedValue as AdjustmentEnum)
  }

  return (
    <Select 
      options={options}
      placeholder={placeholder}
      onChange={onSelectFilter}
    />
  )
}
