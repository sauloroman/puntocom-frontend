import React from 'react'
import type { Supplier } from '../../../../../interfaces/supplier.interface'
import { SupplierItem } from './SupplierItem'

interface SupplierGridProps {
    data: Supplier[]
}

export const SupplierGrid: React.FC<SupplierGridProps> = ({ data }) => {
  return (
    <ul className='grid grid-cols-4 gap-5 py-2 pb-10'>
        {
            data.map( supplier => (
                <SupplierItem supplier={supplier} key={supplier.id} />
            ))
        }   
    </ul>
  )
}
