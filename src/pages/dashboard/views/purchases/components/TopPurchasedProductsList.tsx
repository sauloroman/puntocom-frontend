import React from 'react'
import { FiBox } from 'react-icons/fi'
import { useTheme } from '../../../../../shared/hooks'
import { formatMoney } from '../../../../../shared/helpers'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { HeaderBox } from '../../sales/components'

interface TopPurchasedProduct {
    productId:     string
    productName:   string
    totalQuantity: number
    totalSpent:    number
    avgUnitPrice:  number
}

interface TopPurchasedProductsListProps {
    products: TopPurchasedProduct[]
}

export const TopPurchasedProductsList: React.FC<TopPurchasedProductsListProps> = ({ products }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const barFill      = isDark ? '#f59e0b' : '#d97706'
    const gridStroke   = isDark ? '#1f2937' : '#e5e7eb'
    const axisColor    = isDark ? '#9ca3af' : '#6b7280'
    const tooltipBg    = isDark ? '#1f2937' : '#fff'
    const tooltipBorder = isDark ? '#374151' : '#e5e7eb'
    const tooltipLabel = isDark ? '#e5e7eb' : '#374151'

    return (
        <div
            className={`
                rounded-xl border p-5 flex flex-col gap-3
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <FiBox size={15} />
                Productos más comprados
            </HeaderBox>

            {products.length > 0 ? (
                <div className='h-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={products} barSize={35} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>

                            <CartesianGrid
                                strokeDasharray='3 3'
                                stroke={gridStroke}
                                vertical={false}
                            />

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
                                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                                width={48}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: tooltipBg,
                                    borderRadius: '8px',
                                    border: `1px solid ${tooltipBorder}`,
                                }}
                                labelStyle={{ color: tooltipLabel, fontWeight: 600, marginBottom: 4 }}
                                formatter={(value, name, _props) => {
                                    if (name === 'totalSpent') return [formatMoney(Number(value), true), 'Total invertido']
                                    return [value, name]
                                }}
                                content={({ active, payload, label }) => {
                                    if (!active || !payload?.length) return null
                                    const d = payload[0].payload as TopPurchasedProduct
                                    return (
                                        <div
                                            style={{
                                                backgroundColor: tooltipBg,
                                                border: `1px solid ${tooltipBorder}`,
                                                borderRadius: 8,
                                                padding: '10px 14px',
                                            }}
                                        >
                                            <p style={{ color: tooltipLabel, fontWeight: 600, marginBottom: 6, fontSize: 13 }}>
                                                {label}
                                            </p>
                                            <p style={{ color: axisColor, fontSize: 12 }}>
                                                Total invertido: <span style={{ color: barFill, fontWeight: 600 }}>{formatMoney(d.totalSpent, true)}</span>
                                            </p>
                                            <p style={{ color: axisColor, fontSize: 12 }}>
                                                Cantidad comprada: <span style={{ fontWeight: 600 }}>{d.totalQuantity} uds.</span>
                                            </p>
                                            <p style={{ color: axisColor, fontSize: 12 }}>
                                                Precio prom. unitario: <span style={{ fontWeight: 600 }}>{formatMoney(d.avgUnitPrice, true)}</span>
                                            </p>
                                        </div>
                                    )
                                }}
                            />

                            <Bar
                                dataKey='totalSpent'
                                radius={[8, 8, 0, 0]}
                                fill={barFill}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Sin datos
                </p>
            )}
        </div>
    )
}