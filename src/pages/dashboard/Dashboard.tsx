import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts'
import { useDashboard } from '../../shared/hooks'
import { DashboardKpisSection, ProductsWithoutSalesList, SalesByUserDonutChart, SalesVsPurchasesChart, TopProductCard } from './components'

export const Dashboard: React.FC = () => {

  const { stats } = useDashboard()

  // useEffect(() => {
  //   getStats()
  // }, [])

  const mockStats = {
      kpis: {
        totalSales: 0,
        totalPurchases: 0,
        criticalStockProducts: 0
      },
      charts: {
        salesByDate: [],
        purchasesByDate: [],
        salesPercentageByUser: [],

      },
      insights: {
        topProduct: null,
        productsWithoutSales: []
      }
    }

  // if ( !stats ) {
  //   const mockStats = {
  //     kpis: [],
  //     charts: {
  //       salesByDate: [],
  //       purchasesByDate: [],
  //       salesPercentageByUser: [],

  //     },
  //     insights: {
  //       topProduct: null,
  //       productsWithoutSales: []
  //     }
  //   }
  // }

  return (
    <PuntoComLayout>
      <div className="space-y-8 py-5 md:w-[90%] mx-auto">
        <DashboardKpisSection kpis={mockStats.kpis} />
        
        <section className="grid md:grid-cols-6 md:gap-5">
          <div className="col-span-4 space-y-6 mb-5 md:mb-0">
            <SalesVsPurchasesChart
              sales={mockStats.charts.salesByDate}
              purchases={mockStats.charts.purchasesByDate}
            />
            <TopProductCard product={mockStats.insights.topProduct}/>
          </div>
          <div className="col-span-2 space-y-6">
            <SalesByUserDonutChart data={mockStats.charts.salesPercentageByUser} />
            <ProductsWithoutSalesList products={mockStats.insights.productsWithoutSales} />
          </div>
        </section>

      </div>
    </PuntoComLayout>
  )
}
