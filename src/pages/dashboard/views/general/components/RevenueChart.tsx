import React from 'react'
import { MdOutlineCompareArrows } from "react-icons/md";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import type { ChartDataPoint } from '../../../../../interfaces/dto/dashboard.interface'
import { useTheme } from '../../../../../shared/hooks'
import { ChartTooltip } from './CharToolTip'
import { HeaderBox } from '../../sales/components';

interface RevenueChartProps {
  data: ChartDataPoint[]
}

const LINES = [
  { key: 'sales',     name: 'Ventas',  light: '#4f46e5', dark: '#6366f1' },
  { key: 'purchases', name: 'Compras', light: '#16a34a', dark: '#22c55e' },
] as const

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const gridLine  = isDark ? '#1f2937' : '#e5e7eb'
  const axisColor = isDark ? '#9ca3af' : '#6b7280'

  if (!data.length) {
    return (
      <div
        className={`
          xl:col-span-2 rounded-xl border p-6 flex items-center justify-center
          ${isDark ? 'bg-gray-900 border-gray-800 text-gray-500' : 'bg-white border-gray-200 text-gray-400'}
        `}
      >
        <p className='text-sm'>No hay datos de ventas o compras para mostrar</p>
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
        <MdOutlineCompareArrows size={20} />
        Ventas vs Compras
      </HeaderBox>

      <ResponsiveContainer width='100%' height={260}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={gridLine} strokeDasharray='3 3' vertical={false} />

          <XAxis
            dataKey='date'
            tick={{ fill: axisColor, fontSize: 12 }}
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
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12, color: axisColor }}
            iconType='circle'
            iconSize={8}
          />

          {LINES.map(({ key, name, light, dark }) => (
            <Line
              key={key}
              type='monotone'
              dataKey={key}
              name={name}
              stroke={isDark ? dark : light}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}