import React, { useEffect } from 'react'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { useTabs } from '../../shared/hooks'
import { PuntoComLayout, TabsLayout  } from '../../layouts'
import { WarehouseCategories, WarehouseProducts, WarehouseLowStock, WarehouseAdjustment } from './views'

const tabs = ["Categorías", "Productos", "Control de Stock", "Ajustes de Almacén"]

export const Warehouse: React.FC = () => {
  
  const { tab: activeTab, setActiveTab, setWindow } = useTabs()

  const renderContent = () => {
    switch (activeTab) {
      case "Categorías":
        return <WarehouseCategories />
      case "Productos":
        return <WarehouseProducts />
      case "Control de Stock":
        return <WarehouseLowStock />
      case "Ajustes de Almacén":
        return <WarehouseAdjustment />
      default:
        return <div>Seleccione una pestaña</div>
    }
  }

  useEffect(() => {
    setWindow( WindowsTab.warehouse )
    setActiveTab(tabs[0])
  }, [])

  return (
    <PuntoComLayout>
      <TabsLayout
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderContent()}
      </TabsLayout>
    </PuntoComLayout>
  )
}
