import React, { useEffect } from 'react'
import { PuntoComLayout, TabsLayout } from '../../layouts'
import { useTabs } from '../../shared/hooks'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { DashboardGeneral, DashboardPurchases, DashboardSales } from './views'
import { DashboardProducts } from './views/products/DashboardProducts'

const tabs = ['General', 'Estadísticas Ventas', 'Estadísticas Compras', 'Estadísticas Productos']

export const Dashboard: React.FC = () => {

  const { tab: activeTab, setActiveTab, setWindow } = useTabs()

  const renderContent = () => {
    switch( activeTab ) {
      case tabs[0]:
        return (<DashboardGeneral />)
      case tabs[1]:
        return (<DashboardSales />)
      case tabs[2]:
        return (<DashboardPurchases />)
      case tabs[3]:
        return (<DashboardProducts />)
    }
  }

  useEffect(() => {
    setWindow(WindowsTab.dashboard)
    setActiveTab(tabs[0])
  }, [])
  
  return (
    <PuntoComLayout>
      <TabsLayout
        tabs={ tabs }
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderContent()}
      </TabsLayout>
    </PuntoComLayout>
  )
}
