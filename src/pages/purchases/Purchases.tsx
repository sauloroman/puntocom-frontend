import React, { useEffect } from 'react'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { PuntoComLayout, TabsLayout } from '../../layouts'
import { useTabs } from '../../shared/hooks'
import { CreatePurchase, PurchasesPage, PurchasesSuppliers } from './views'

const tabs = ["Registrar Compra", "Registro de compras", "Proveedores del sistema"]

export const Purchases: React.FC = () => {
  
  const { tab: activeTab, setActiveTab, setWindow } = useTabs()

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
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        { renderContent() }
      </TabsLayout>
    </PuntoComLayout>
  )
}
