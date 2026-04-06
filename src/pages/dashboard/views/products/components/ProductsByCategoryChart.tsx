import React, { useState } from 'react'
import { MdOutlineCategory } from 'react-icons/md'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useTheme } from '../../../../../shared/hooks'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { HeaderBox } from '../../sales/components'

interface CategoryStat {
    categoryId:         string
    categoryName:       string
    categoryIcon:       string
    productCount:       number
    activeProductCount: number
}

interface ProductsByCategoryChartProps {
    categories: CategoryStat[]
}

const PALETTE = [
    '#0d9488', '#2dd4bf', '#0f766e', '#99f6e4',
    '#134e4a', '#5eead4', '#115e59', '#ccfbf1',
]

const PREVIEW_COUNT = 5

export const ProductsByCategoryChart: React.FC<ProductsByCategoryChartProps> = ({ categories }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [expanded, setExpanded] = useState(false)

    const tooltipBg     = isDark ? '#111827' : '#fff'
    const tooltipBorder = isDark ? '#374151' : '#e5e7eb'
    const tooltipLabel  = isDark ? '#e5e7eb' : '#374151'
    const tooltipMuted  = isDark ? '#9ca3af' : '#6b7280'

    const chartData = categories.map((c) => ({
        name:               c.categoryName,
        productCount:       c.productCount,
        activeProductCount: c.activeProductCount,
        icon:               c.categoryIcon,
        original:           c,
    }))

    const visible  = expanded ? categories : categories.slice(0, PREVIEW_COUNT)
    const hasMore  = categories.length > PREVIEW_COUNT

    return (
        <div
            className={`
                rounded-xl border p-5 flex flex-col gap-4
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <MdOutlineCategory size={15} />
                Productos por categoría
            </HeaderBox>

            {categories.length > 0 ? (
                <>
                    {/* Donut — centrado */}
                    <div className='flex justify-center'>
                        <div className='w-[180px] h-[180px]'>
                            <ResponsiveContainer width='100%' height='100%'>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx='50%'
                                        cy='50%'
                                        innerRadius={52}
                                        outerRadius={82}
                                        paddingAngle={2}
                                        dataKey='productCount'
                                        strokeWidth={0}
                                    >
                                        {chartData.map((_, i) => (
                                            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (!active || !payload?.length) return null
                                            const d = payload[0].payload.original as CategoryStat
                                            return (
                                                <div style={{
                                                    backgroundColor: tooltipBg,
                                                    border: `1px solid ${tooltipBorder}`,
                                                    borderRadius: 8,
                                                    padding: '8px 12px',
                                                    fontSize: 12,
                                                }}>
                                                    <p style={{ color: tooltipLabel, fontWeight: 600, marginBottom: 4 }}>
                                                        {d.categoryName}
                                                    </p>
                                                    <p style={{ color: tooltipMuted }}>
                                                        Total: <span style={{ color: tooltipLabel, fontWeight: 600 }}>{d.productCount}</span>
                                                    </p>
                                                    <p style={{ color: tooltipMuted }}>
                                                        Activos: <span style={{ fontWeight: 600 }}>{d.activeProductCount}</span>
                                                    </p>
                                                </div>
                                            )
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />

                    <div className='flex flex-col gap-2'>
                        {visible.map((c, i) => (
                            <div key={c.categoryId} className='flex items-center gap-4'>
                                <span
                                    className='w-2.5 h-2.5 rounded-full shrink-0'
                                    style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
                                />
                                <p className={`text-md font-medium flex-1 truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {c.categoryName}
                                </p>
                                <span className={`text-md ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                                    {c.activeProductCount} activos
                                </span>
                                <span className={`text-md font-semibold tabular-nums ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {c.productCount}
                                </span>
                            </div>
                        ))}
                    </div>

                    {hasMore && (
                        <button
                            onClick={() => setExpanded((v) => !v)}
                            className={`
                                flex items-center gap-1 text-sm font-medium cursor-pointer w-fit
                                ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-500'}
                            `}
                        >
                            {expanded
                                ? <><FiChevronUp size={13} /> Ver menos</>
                                : <><FiChevronDown size={13} /> Ver {categories.length - PREVIEW_COUNT} más</>
                            }
                        </button>
                    )}
                </>
            ) : (
                <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Sin datos de categorías
                </p>
            )}
        </div>
    )
}