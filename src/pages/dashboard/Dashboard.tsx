import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts'
import { useDashboard } from '../../shared/hooks'
import { DashboardKpisSection, ProductsWithoutSalesList, SalesByUserDonutChart, SalesVsPurchasesChart, TopProductCard } from './components'

export const Dashboard: React.FC = () => {

  const { stats, getStats } = useDashboard()

  useEffect(() => {
    getStats()
  }, [])

  if ( !stats ) return null

  return (
    <PuntoComLayout>
      <div className="space-y-8 py-5 w-[90%] mx-auto">
        <DashboardKpisSection kpis={stats.kpis} />
        
        <section className="grid grid-cols-6 gap-5">
          <div className="col-span-4 space-y-6">
            <SalesVsPurchasesChart
              sales={stats.charts.salesByDate}
              purchases={stats.charts.purchasesByDate}
            />
            <TopProductCard product={stats.insights.topProduct}/>
          </div>
          <div className="col-span-2 space-y-6">
            <SalesByUserDonutChart data={stats.charts.salesPercentageByUser} />
            <ProductsWithoutSalesList products={stats.insights.productsWithoutSales} />
          </div>
        </section>

      </div>
    </PuntoComLayout>
  )
}
