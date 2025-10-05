import React from 'react'
import { useDrawer } from '../../../../../shared/hooks'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'
import { CiFilter } from 'react-icons/ci'
import { OutlineButton } from '../../../../../shared/components/button/OutlineButton'

export const FilterProductsBySupplier: React.FC = () => {
    const { onOpenLeftDrawer } = useDrawer()
  
    return (
        <OutlineButton onClick={() => onOpenLeftDrawer(DrawelNames.filterProductsSuppliers)}>
            <CiFilter size={20} />
            Proveedores
        </OutlineButton>
    )
}
