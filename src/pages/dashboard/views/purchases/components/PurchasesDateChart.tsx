import React from 'react'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { useTheme } from '../../../../../shared/hooks'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartTooltip } from '../../general/components'
import { HeaderBox } from '../../sales/components'

interface PurchasesDateChartProps {
    data: { date: string; total: number }[]
}

export const PurchasesDateChart: React.FC<PurchasesDateChartProps> = ({ data }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const gridLine = isDark ? '#1f2937' : '#e5e7eb'
    const axisColor = isDark ? '#9ca3af' : '#6b7280'
    const stroke = isDark ? '#a78bfa' : '#7c3aed'

    if (!data.length) {
        return (
            <div
                className={`
                    xl:col-span-2 rounded-xl border p-6 flex items-center justify-center min-h-[300px]
                    ${isDark ? 'bg-gray-900 border-gray-800 text-gray-500' : 'bg-white border-gray-200 text-gray-400'}
                `}
            >
                <p className='text-sm'>Sin datos de compras por fecha</p>
            </div>
        )
    }

    return (
        <div
            className={`
                xl:col-span-2 rounded-xl border p-5
                ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
            `}
        >
            <HeaderBox>
                <RiShoppingCart2Line size={15} />
                Compras por fecha
            </HeaderBox>

            <ResponsiveContainer width='100%' height={260}>
                <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id='grad-purchases-date' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='5%' stopColor={stroke} stopOpacity={0.25} />
                            <stop offset='95%' stopColor={stroke} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke={gridLine} strokeDasharray='3 3' vertical={false} />
                    <XAxis
                        dataKey='date'
                        tick={{ fill: axisColor, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: axisColor, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        width={48}
                    />
                    <Tooltip content={<ChartTooltip />} />

                    <Area
                        type='monotone'
                        dataKey='total'
                        name='Compras'
                        stroke={stroke}
                        strokeWidth={2.5}
                        fill='url(#grad-purchases-date)'
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}