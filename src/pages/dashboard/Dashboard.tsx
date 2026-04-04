import React, { useEffect } from 'react'
import { PuntoComLayout, TabsLayout } from '../../layouts'
import { useTabs } from '../../shared/hooks'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { DashboardGeneral } from './views'

const tabs = ['General', 'Estadísticas Ventas', 'Estadísticas Compras', 'Estadísticas Productos']

export const Dashboard: React.FC = () => {

  const { tab: activeTab, setActiveTab, setWindow } = useTabs()

  const renderContent = () => {
    switch( activeTab ) {
      case tabs[0]:
        return (<DashboardGeneral />)
      case tabs[1]:
        return (<div>Estadísticas de ventas</div>)
      case tabs[2]:
        return (<div>Estadísticas de compras</div>)
      case tabs[3]:
        return (<div>Estadísticas de productos</div>)
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
