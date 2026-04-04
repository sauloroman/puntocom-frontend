import React from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import { useTheme } from '../../../../../shared/hooks'
import { calcMargin } from '../../../../../shared/helpers'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { KpisStats } from '../../../../../interfaces/dto/dashboard.interface'
import { HeaderBox } from '../../sales/components'

interface FinancialBreakdownProps {
  kpis: KpisStats
}

const COLORS = ['#10B981', '#6366F1']

export const FinancialBreakdown: React.FC<FinancialBreakdownProps> = ({ kpis }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const purchasePct = calcMargin(kpis.totalPurchases, kpis.totalSales)
  const profitPct   = calcMargin(kpis.netProfit, kpis.totalSales)

  const data = [
    { name: 'Compras', value: purchasePct, color: COLORS[0] },
    { name: 'Utilidad', value: profitPct, color: COLORS[1] }
  ]

  return (
    <div
      className={`
        rounded-xl border p-4 flex flex-col items-center h-[300px]
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
      `}
    >
      <HeaderBox>
        <MdOutlineAttachMoney size={20} />
        Desglose financiero
      </HeaderBox>

      <div className="w-full h-full">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              formatter={(value: number | undefined, name: string | undefined) => {
                const v = value ?? 0
                return [`${v}%`, name ?? '']
              }}
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#fff',
                borderRadius: '6px',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                fontSize: '12px'
              }}
              labelStyle={{ color: isDark ? '#e5e7eb' : '#374151'}}
            />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={2}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3 text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className={isDark ? 'text-gray-100' : 'text-gray-600'}>
              {item.name}:
            </span>
            <span className={isDark ? 'text-gray-100' : 'text-gray-800'}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
