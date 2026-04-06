import React from 'react'
import { MdOutlineCategory } from 'react-icons/md'
import { useTheme } from '../../../../../shared/hooks'
import { formatMoney } from '../../../../../shared/helpers'
import { HeaderBox } from '../../sales/components'

interface CategoryStat {
    categoryId:    string
    categoryName:  string
    categoryIcon:  string
    totalQuantity: number
    totalSpent:    number
    percentage:    number
}

interface PurchasesByCategoryListProps {
    categories: CategoryStat[]
}

export const PurchasesByCategoryList: React.FC<PurchasesByCategoryListProps> = ({ categories }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div
            className={`
                rounded-xl border p-5 flex flex-col gap-4
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <MdOutlineCategory size={15} />
                Compras por categoría
            </HeaderBox>

            <div className='flex flex-col gap-3'>
                {categories.map((cat) => (
                    <div key={cat.categoryId} className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className={`text-md font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                    {cat.categoryName}
                                </span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className={`text-md ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {cat.totalQuantity} uds.
                                </span>
                                <span className={`text-md font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {formatMoney(cat.totalSpent, true)}
                                </span>
                                <span className={`text-md w-9 text-right font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>
                                    {cat.percentage.toFixed(1)}%
                                </span>
                            </div>
                        </div>

                        <div className={`h-4 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div
                                className='h-full rounded-full bg-violet-500 transition-all duration-500'
                                style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                            />
                        </div>
                    </div>
                ))}

                {!categories.length && (
                    <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        Sin datos de categorías
                    </p>
                )}
            </div>
        </div>
    )
}