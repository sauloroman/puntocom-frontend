import React, { useEffect } from 'react'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { PuntoComLayout, TabsLayout } from '../../layouts'
import { AccessRoles, AccessUsers } from './views'
import { useTabs } from '../../shared/hooks'

const tabs = ["Usuarios del sistema", "Roles de usuario"]

export const Access: React.FC = () => {
  const { tab: activeTab, setActiveTab, setWindow } = useTabs()
  
  const renderContent = () => {
    switch( activeTab ) {
      case "Usuarios del sistema":
        return (<AccessUsers />)
      case "Roles de usuario":
        return (<AccessRoles />)
      default:
        return (<div>Seleccione una pestaña</div>)
    }
  }

  useEffect(() => {
    setWindow(WindowsTab.access)
    setActiveTab(tabs[0])
  }, [])

  return (
    <PuntoComLayout>
      <TabsLayout
        tabs={tabs}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      >
        {renderContent()}
      </TabsLayout>
    </PuntoComLayout>
  )
}
