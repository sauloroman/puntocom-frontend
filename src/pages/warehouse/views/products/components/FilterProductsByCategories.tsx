import React from 'react'
import { CiFilter } from "react-icons/ci";
import { OutlineButton } from '../../../../../shared/components/button/OutlineButton'
import { useDrawer } from '../../../../../shared/hooks';
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface';

export const FilterProductsByCategories: React.FC = () => {
    const { onOpenLeftDrawer } = useDrawer()

    return (
        <OutlineButton onClick={() => onOpenLeftDrawer(DrawelNames.filterProductsByCategory)}>
            <CiFilter size={20} />
            Filtrar
        </OutlineButton>
    )
}
