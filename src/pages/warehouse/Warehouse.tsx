import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'
import { TabsLayout } from '../../layouts'
import { useTabs } from '../../shared/hooks/useTabs'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { WarehouseCategories } from './views/categories/WarehouseCategories'
import { WarehouseProducts } from './views/products/WarehouseProducts'
import { WarehouseLowStock } from './views/low-stock/WarehouseLowStock'

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
        return <div>Configuraciones y ajustes de almacén aquí</div>
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
