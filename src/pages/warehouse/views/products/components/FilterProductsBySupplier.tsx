import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'
import { useDrawer } from '../../../../../shared/hooks'
import { OutlineButton } from '../../../../../shared/components/button'

export const FilterProductsBySupplier: React.FC = () => {
    const { onOpenLeftDrawer } = useDrawer()
  
    return (
        <OutlineButton onClick={() => onOpenLeftDrawer(DrawelNames.filterProductsSuppliers)}>
            <CiFilter size={20} />
            Proveedores
        </OutlineButton>
    )
}
