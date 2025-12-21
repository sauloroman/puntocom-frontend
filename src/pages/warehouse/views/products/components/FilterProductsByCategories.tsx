import React from 'react'
import { OutlineButton } from '../../../../../shared/components/button/OutlineButton';
import { useDrawer } from '../../../../../shared/hooks';
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface';
import { CiFilter } from 'react-icons/ci';

export const FilterProductsByCategories: React.FC = () => {

    const { onOpenLeftDrawer } = useDrawer()

    return (
        <OutlineButton
            onClick={() => onOpenLeftDrawer(DrawelNames.filterProductsCategories)}
        >
            <CiFilter size={20} />
            Categorías
        </OutlineButton>
    )
}
