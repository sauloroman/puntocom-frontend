import React, { useEffect, useMemo } from 'react'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { useTabs } from '../../shared/hooks'
import { PuntoComLayout, TabsLayout } from '../../layouts'
import { WarehouseCategories, WarehouseProducts, WarehouseLowStock, WarehouseAdjustment } from './views'
import { useAuth } from '../../shared/hooks'
import type { Roles } from '../../interfaces/dto/user.interface'
import { warehouseTabsAccess } from '../../interfaces/ui/warehouse.interface'

export const Warehouse: React.FC = () => {

  const { tab: activeTab, setActiveTab, setWindow } = useTabs()
  const { user } = useAuth()

  const allowedTabs = useMemo(() => {
    return warehouseTabsAccess[user?.role as Roles]
  }, [user?.role as Roles])

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
    setWindow(WindowsTab.warehouse)
    setActiveTab(allowedTabs[0])
  }, [allowedTabs])

  return (
    <PuntoComLayout>
      <TabsLayout
        tabs={allowedTabs} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderContent()}
      </TabsLayout>
    </PuntoComLayout>
  )
}
