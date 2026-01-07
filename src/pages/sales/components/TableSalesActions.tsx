import React from 'react'
import { FaRegEye } from "react-icons/fa"
import { DrawelNames } from '../../../interfaces/ui/drawel.interface'
import { useDrawer, useSale, useTheme } from '../../../shared/hooks'

interface Props {
    saleId: string
}

export const TableSalesActions: React.FC<Props> = ({ saleId }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

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
                className={`
                    cursor-pointer w-fit text-center px-4 py-2 text-sm flex items-center gap-2 transition-colors
                    ${isDark 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-red-50'
                    }
                `}
            >
                <FaRegEye size={15} />
            </button>
        </div>
    )
}