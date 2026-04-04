import React, { useEffect } from 'react'
import {
  FiTrendingUp, FiShoppingCart, FiDollarSign,
  FiAlertTriangle, FiPackage, FiUsers, FiCreditCard,
} from 'react-icons/fi'
import { useTheme } from '../../../../shared/hooks'
import { useDashboard } from '../../../../shared/hooks'
import type { KpisStats } from '../../../../interfaces/dto/dashboard.interface'
import { calcMargin, formatMoney, mergeSalesPurchasesData } from '../../../../shared/helpers'
import { FinancialBreakdown, RevenueChart, SideStat, TopKpiCard } from './components'


export const DashboardGeneral: React.FC = () => {
  const { stats, getKpisStats, getSalesStats, getPurchasesStats } = useDashboard()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const kpis: KpisStats | null = stats?.kpisStats ?? null

  const chartData = mergeSalesPurchasesData(
    stats.salesStats?.salesByDate,
    stats.purchasesStats?.purchasesByDate,
  )

  useEffect(() => {
    if ( stats.kpisStats! ) getKpisStats()
    if ( stats.salesStats! ) getSalesStats()    
    if ( stats.purchasesStats! ) getPurchasesStats()
  }, [])

  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4'>
        <TopKpiCard
          title='Ventas Totales'
          value={kpis ? formatMoney(kpis.totalSales, true) : '—'}
          subtitle='Ingresos acumulados'
          icon={<FiTrendingUp size={18} />}
          accent='indigo'
        />
        <TopKpiCard
          title='Compras Totales'
          value={kpis ? formatMoney(kpis.totalPurchases, true) : '—'}
          subtitle='Costo de mercancía'
          icon={<FiShoppingCart size={18} />}
          accent='amber'
        />
        <TopKpiCard
          title='Utilidad Neta'
          value={kpis ? formatMoney(kpis.netProfit, true) : '—'}
          subtitle={kpis ? `Margen ${calcMargin(kpis.netProfit, kpis.totalSales)}%` : ''}
          icon={<FiDollarSign size={18} />}
          accent='emerald'
        />
        <TopKpiCard
          title='Stock Crítico'
          value={kpis?.criticalStockProducts ?? '—'}
          subtitle='Productos bajo mínimo'
          icon={<FiAlertTriangle size={18} />}
          accent='rose'
        />
      </div>

      <div className='grid grid-cols-1 gap-4'>
        <RevenueChart data={chartData} />

        <div className='flex flex-col gap-3'>
          <p className={`text-sm font-semibold px-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Inventario y usuarios
          </p>

          <SideStat
            label='Productos activos'
            value={kpis?.totalActiveProducts ?? '—'}
            icon={<FiPackage />}
          />
          <SideStat
            label='Valor total en stock'
            value={kpis ? formatMoney(kpis.totalStockValue, true) : '—'}
            icon={<FiCreditCard />}
          />
          <SideStat
            label='Usuarios activos'
            value={kpis?.totalActiveUsers ?? '—'}
            icon={<FiUsers />}
          />

          {kpis && <FinancialBreakdown kpis={kpis} />}
        </div>
      </div>
    </div>
  )
}