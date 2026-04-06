import React from 'react'
import { TbArrowsTransferDown } from 'react-icons/tb'
import { useTheme } from '../../../../../shared/hooks'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { HeaderBox } from '../../sales/components'

interface AdjustedProduct {
    productId:        string
    productName:      string
    adjustmentCount:  number
    totalUnitsAdded:  number
    totalUnitsRemoved: number
}

interface ProductsMostAdjustedChartProps {
    products: AdjustedProduct[]
}

export const ProductsMostAdjustedChart: React.FC<ProductsMostAdjustedChartProps> = ({ products }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const gridStroke    = isDark ? '#1f2937' : '#e5e7eb'
    const axisColor     = isDark ? '#9ca3af' : '#6b7280'
    const tooltipBg     = isDark ? '#111827' : '#fff'
    const tooltipBorder = isDark ? '#374151' : '#e5e7eb'
    const tooltipLabel  = isDark ? '#e5e7eb' : '#374151'

    const colorAdded   = isDark ? '#34d399' : '#059669'
    const colorRemoved = isDark ? '#f87171' : '#dc2626'

    return (
        <div
            className={`
                rounded-xl border p-5 flex flex-col gap-3
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <TbArrowsTransferDown size={15} />
                Productos más ajustados
            </HeaderBox>

            {products.length > 0 ? (
                <div className='h-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart
                            data={products}
                            barSize={14}
                            barGap={2}
                            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray='3 3' stroke={gridStroke} vertical={false} />

                            <XAxis
                                dataKey='productName'
                                interval={0}
                                angle={-25}
                                textAnchor='end'
                                height={50}
                                tick={{ fill: axisColor, fontSize: 10 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => v.length > 10 ? v.substring(0, 10) + '…' : v}
                            />

                            <YAxis
                                tick={{ fill: axisColor, fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                                width={36}
                            />

                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (!active || !payload?.length) return null
                                    const d = payload[0].payload as AdjustedProduct
                                    return (
                                        <div style={{
                                            backgroundColor: tooltipBg,
                                            border: `1px solid ${tooltipBorder}`,
                                            borderRadius: 8,
                                            padding: '10px 14px',
                                            fontSize: 12,
                                        }}>
                                            <p style={{ color: tooltipLabel, fontWeight: 600, marginBottom: 6 }}>{label}</p>
                                            <p style={{ color: axisColor }}>
                                                Ajustes totales: <span style={{ color: tooltipLabel, fontWeight: 600 }}>{d.adjustmentCount}</span>
                                            </p>
                                            <p style={{ color: axisColor }}>
                                                Entradas: <span style={{ color: colorAdded, fontWeight: 600 }}>+{d.totalUnitsAdded}</span>
                                            </p>
                                            <p style={{ color: axisColor }}>
                                                Salidas: <span style={{ color: colorRemoved, fontWeight: 600 }}>-{d.totalUnitsRemoved}</span>
                                            </p>
                                        </div>
                                    )
                                }}
                            />

                            <Legend
                                formatter={(value) => (
                                    <span style={{ color: axisColor, fontSize: 11 }}>
                                        {value === 'totalUnitsAdded' ? 'Entradas' : 'Salidas'}
                                    </span>
                                )}
                            />

                            <Bar dataKey='totalUnitsAdded'   name='totalUnitsAdded'   radius={[4, 4, 0, 0]} fill={colorAdded} />
                            <Bar dataKey='totalUnitsRemoved' name='totalUnitsRemoved' radius={[4, 4, 0, 0]} fill={colorRemoved} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Sin datos de ajustes
                </p>
            )}
        </div>
    )
}