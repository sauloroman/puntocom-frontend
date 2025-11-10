import React from 'react'
import { Select } from '../../../../../shared/components'
import { useInventoryAdjustment } from '../../../../../shared/hooks'
import type { AdjustmentEnum } from '../../../../../interfaces/inventory-adjustment.interface'

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
