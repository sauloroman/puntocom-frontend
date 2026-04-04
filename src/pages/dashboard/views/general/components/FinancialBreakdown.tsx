import React from 'react'
import { useTheme } from '../../../../../shared/hooks'
import { calcMargin } from '../../../../../shared/helpers'
import type { KpisStats } from '../../../../../interfaces/dto/dashboard.interface'

interface FinancialBreakdownProps {
  kpis: KpisStats
}

interface BreakdownRowProps {
  color: string
  label: string
  pct: number
  isDark: boolean
}

const BreakdownRow: React.FC<BreakdownRowProps> = ({ color, label, pct, isDark }) => (
  <span className='flex items-center gap-1.5'>
    <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
    <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
    <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{pct}%</span>
  </span>
)

export const FinancialBreakdown: React.FC<FinancialBreakdownProps> = ({ kpis }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const purchasePct = calcMargin(kpis.totalPurchases, kpis.totalSales)
  const profitPct   = calcMargin(kpis.netProfit, kpis.totalSales)

  return (
    <div
      className={`
        rounded-xl border p-4
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
      `}
    >
      <p className={`text-xs font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Desglose financiero
      </p>

      <div className='flex rounded-full overflow-hidden h-2.5 mb-3'>
        <div className='bg-indigo-500 transition-all' style={{ width: `${purchasePct}%` }} />
        <div className='bg-emerald-500 flex-1' />
      </div>

      <div className='flex items-center justify-between text-xs'>
        <BreakdownRow color='bg-indigo-500'  label='Compras'  pct={purchasePct} isDark={isDark} />
        <BreakdownRow color='bg-emerald-500' label='Utilidad' pct={profitPct}   isDark={isDark} />
      </div>
    </div>
  )
}