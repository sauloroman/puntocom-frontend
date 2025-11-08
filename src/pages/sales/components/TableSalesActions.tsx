import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { useDrawer, useSale } from '../../../shared/hooks';
import { DrawelNames } from '../../../interfaces/ui/drawel.interface';

interface Props {
    saleId: string
}

export const TableSalesActions: React.FC<Props> = ({ saleId }) => {

    const { onSetSelectedSale } = useSale()
    const { onOpenRightDrawer } = useDrawer()

    const onSelectSale = () => {
        onSetSelectedSale(saleId)
        onOpenRightDrawer(DrawelNames.infoSale)
    }

    return (
        <div className='flex gap-2 items-center justify-center'>
            <button
                onClick={onSelectSale}
                className="cursor-pointer w-fit text-center px-4 py-2 text-sm text-gray-600 hover:bg-red-50 flex items-center gap-2"
            >
                <FaRegEye size={15} />
            </button>
        </div>
    )
}
