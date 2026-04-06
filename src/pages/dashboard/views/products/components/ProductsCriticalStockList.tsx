import React from 'react'
import { TbAlertTriangle } from 'react-icons/tb'
import { useTheme } from '../../../../../shared/hooks'
import { formatMoney } from '../../../../../shared/helpers'
import { HeaderBox } from '../../sales/components'

interface CriticalProduct {
    productId:   string
    productName: string
    stock:       number
    stockMin:    number
    stockValue:  number
}

interface ProductsCriticalStockListProps {
    products: CriticalProduct[]
}

export const ProductsCriticalStockList: React.FC<ProductsCriticalStockListProps> = ({ products }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!products.length) return null

    return (
        <div
            className={`
                rounded-xl border p-5 flex flex-col gap-4
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <TbAlertTriangle size={15} />
                Productos con stock crítico
            </HeaderBox>

            <div className={`grid grid-cols-[1fr_auto_auto_auto] gap-x-6 text-xs font-medium pb-1 border-b
                ${isDark ? 'text-gray-500 border-gray-800' : 'text-gray-400 border-gray-100'}
            `}>
                <span>Producto</span>
                <span className='text-right'>Stock actual</span>
                <span className='text-right'>Stock mínimo</span>
                <span className='text-right'>Valor en stock</span>
            </div>

            <div className='flex flex-col gap-3'>
                {products.map((p) => {
                    const ratio     = p.stockMin > 0 ? p.stock / p.stockMin : 1
                    const pct       = Math.min(ratio * 100, 100)
                    const isCritical = p.stock === 0
                    const isLow      = !isCritical && ratio <= 0.5

                    const barColor = isCritical
                        ? 'bg-rose-500'
                        : isLow
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'

                    const badgeStyle = isCritical
                        ? isDark ? 'bg-rose-900/40 text-rose-400' : 'bg-rose-50 text-rose-600'
                        : isLow
                        ? isDark ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-50 text-amber-600'
                        : isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'

                    return (
                        <div key={p.productId} className='flex flex-col gap-1.5'>
                            <div className='grid grid-cols-[1fr_auto_auto_auto] gap-x-6 items-center'>
                                <div className='flex items-center gap-2 min-w-0'>
                                    <span className={`text-md font-semibold px-1.5 py-0.5 rounded-md shrink-0 ${badgeStyle}`}>
                                        {isCritical ? 'Sin stock' : isLow ? 'Bajo' : 'Mínimo'}
                                    </span>
                                    <p className={`text-md font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                        {p.productName}
                                    </p>
                                </div>
                                <span className={`text-md font-bold text-right tabular-nums
                                    ${isCritical
                                        ? 'text-rose-500'
                                        : isLow
                                        ? isDark ? 'text-amber-400' : 'text-amber-600'
                                        : isDark ? 'text-gray-200' : 'text-gray-800'
                                    }
                                `}>
                                    {p.stock}
                                </span>
                                <span className={`text-md text-right tabular-nums ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {p.stockMin}
                                </span>
                                <span className={`text-md font-semibold text-right tabular-nums ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {formatMoney(p.stockValue, true)}
                                </span>
                            </div>

                            <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}