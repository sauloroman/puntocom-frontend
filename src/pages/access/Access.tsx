import React, { useEffect } from 'react'
import { PuntoComLayout } from '../../layouts/PuntoComLayout'
import { TabsLayout } from '../../layouts'
import { useTabs } from '../../shared/hooks'
import { WindowsTab } from '../../interfaces/ui/tabs.interface'
import { AccessUsers } from './views/users/AccessUsers'
import { AccessRoles } from './views/roles/AccessRoles'

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
