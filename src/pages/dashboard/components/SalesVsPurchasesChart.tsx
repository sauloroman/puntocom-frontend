import React, { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { useTheme } from '../../../shared/hooks'
import type { ChartPoint } from '../../../interfaces/dto/dashboard.interface'

interface Props {
  sales: ChartPoint[]
  purchases: ChartPoint[]
}

interface ChartData {
  date: string
  sales: number
  purchases: number
}

export const SalesVsPurchasesChart: React.FC<Props> = ({ sales, purchases }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'


  const data: ChartData[] = useMemo(() => {
    const map = new Map<string, ChartData>()

    sales.forEach(item => {
      map.set(item.date, {
        date: item.date,
        sales: item.total,
        purchases: 0
      })
    })

    purchases.forEach(item => {
      const existing = map.get(item.date)
      if (existing) {
        existing.purchases = item.total
      } else {
        map.set(item.date, {
          date: item.date,
          sales: 0,
          purchases: item.total
        })
      }
    })

    return Array.from(map.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    )
  }, [sales, purchases])

  if (!data.length) {
    return (
      <div
        className={`
          rounded-xl p-6 text-center
          ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}
        `}
      >
        No hay información de ventas o compras para mostrar
      </div>
    )
  }

  return (
    <div
      className={`
        rounded-xl p-6 border
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
      `}
    >
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
        Ventas vs Compras (Mes a Mes)
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#1f2937' : '#888'}
          />

          <XAxis
            dataKey="date"
            stroke={isDark ? '#9ca3af' : '#6b7280'}
          />

          <YAxis
            stroke={isDark ? '#9ca3af' : '#6b7280'}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#111827' : '#ffffff',
              borderColor: isDark ? '#1f2937' : '#e5e7eb',
              color: isDark ? '#f9fafb' : '#111827'
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="sales"
            name="Ventas"
            stroke={isDark ? '#6366f1' : '#4f46e5'}
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="purchases"
            name="Compras"
            stroke={isDark ? '#22c55e' : '#16a34a'}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
