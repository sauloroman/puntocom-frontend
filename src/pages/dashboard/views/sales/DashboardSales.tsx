import React, { useEffect } from 'react'
import {
  FiShoppingBag, FiBarChart2, FiTrendingUp, FiTrendingDown,
} from 'react-icons/fi'
import { useDashboard } from '../../../../shared/hooks'
import { formatMoney } from '../../../../shared/helpers'
import { TopKpiCard } from '../general/components'
import { NoSalesProductsList, SalesByCategoryList, SalesByUserList, SalesDateChart, TopProductsList } from './components'

export const DashboardSales: React.FC = () => {
  const { stats, getSalesStats } = useDashboard()

  useEffect(() => {
    if (!stats?.salesStats) getSalesStats()
  }, [])

  const s = stats?.salesStats

  console.log(s)

  return (
    <div className='min-h-screen flex flex-col gap-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <TopKpiCard
          title='Total de órdenes'
          value={s?.salesSummary.totalOrders ?? '—'}
          subtitle='Órdenes registradas'
          icon={<FiShoppingBag size={18} />}
          accent='indigo'
        />
        <TopKpiCard
          title='Ticket promedio'
          value={s ? formatMoney(s.salesSummary.averageOrderValue, true) : '—'}
          subtitle='Valor medio por orden'
          icon={<FiBarChart2 size={18} />}
          accent='emerald'
        />
        <TopKpiCard
          title='Venta máxima'
          value={s ? formatMoney(s.salesSummary.maxOrderValue, true) : '—'}
          subtitle='Orden de mayor valor'
          icon={<FiTrendingUp size={18} />}
          accent='amber'
        />
        <TopKpiCard
          title='Venta mínima'
          value={s ? formatMoney(s.salesSummary.minOrderValue, true) : '—'}
          subtitle='Orden de menor valor'
          icon={<FiTrendingDown size={18} />}
          accent='rose'
        />
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
        <SalesDateChart data={s?.salesByDate ?? []} />
        <SalesByUserList users={s?.salesByUser ?? []} />
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
        <SalesByCategoryList categories={s?.salesByCategory ?? []} />
        <TopProductsList products={s?.getTopSellingProducts ?? []} />
      </div>

      <NoSalesProductsList products={s?.productsWithoutSales ?? []} />
    </div>
  )
}