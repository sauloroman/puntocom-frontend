import React, { useEffect, useMemo } from 'react'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { PuntoComLayout, TabsLayout } from '../../layouts'
import { useAuth, useTabs } from '../../shared/hooks'
import { CreatePurchase, PurchasesPage, PurchasesSuppliers } from './views'
import { purchasesTabsAccess } from '../../interfaces/ui/purchases.interface'
import type { Roles } from '../../interfaces/dto/user.interface'

const tabs = ["Registrar Compra", "Registro de compras", "Proveedores del sistema"]

export const Purchases: React.FC = () => {

  const { user: authenticatedUser } = useAuth()
  const { tab: activeTab, setActiveTab, setWindow } = useTabs()

  const allowedTabs = useMemo(() => 
    purchasesTabsAccess[authenticatedUser?.role as Roles], 
    [authenticatedUser?.role]
  )

  const renderContent = () => {
    switch(activeTab) {
      case 'Registro de compras':
        return <PurchasesPage />
      case 'Proveedores del sistema':
        return <PurchasesSuppliers />
      case 'Registrar Compra':
        return <CreatePurchase />
    }
  }

  useEffect(() => {
    setWindow(WindowsTab.purchases)
    setActiveTab(tabs[0])
  }, [])

  return (
    <PuntoComLayout>
      <TabsLayout
        tabs={allowedTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        { renderContent() }
      </TabsLayout>
    </PuntoComLayout>
  )
}
