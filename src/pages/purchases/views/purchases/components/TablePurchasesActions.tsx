import React from 'react'
import { FaRegEye } from "react-icons/fa"
import { useDrawer, usePurchase, useTheme } from '../../../../../shared/hooks'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface'

interface Props {
    purchaseId: string
}

export const TablePurchasesActions: React.FC<Props> = ({ purchaseId }) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const { onSetSelectedPurchase } = usePurchase()
    const { onOpenRightDrawer } = useDrawer()

    const onSelectPurchase = () => {
        onSetSelectedPurchase(purchaseId)
        onOpenRightDrawer(DrawelNames.infoPurchase)
    }

    return (
        <div className='flex gap-2 items-center justify-center'>
            <button
                onClick={onSelectPurchase}
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