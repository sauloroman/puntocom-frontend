import { MenuItem, type MenuItemProps } from "./MenuItem"
import { BsBox, BsCoin } from "react-icons/bs"
import { IoCartOutline, IoKeyOutline, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5"
import { MdOutlineDarkMode } from "react-icons/md"
import { TfiStatsUp } from "react-icons/tfi"
import { MenuSection } from "./MenuSection"
import { useAuth, useTheme } from "../../hooks"
import { ThemeType } from "../../../interfaces/ui/theme.interface"
import { UserWidget } from "../../../pages/access/views/users/components"

interface MenuProps {
  collapsed: boolean
}

export const Menu: React.FC<MenuProps> = ({ collapsed }) => {

  const { onLogout } = useAuth()
  const { activateDarkMode, activateLightMode, theme } = useTheme()
  const toggleDarkMode = () => theme === ThemeType.dark ? activateLightMode() : activateDarkMode() 
  
  const generalItems: MenuItemProps[] = [
    { to: '/', icon: <TfiStatsUp />, label: 'Dashboard' },
    { to: '/warehouse', icon: <BsBox />, label: 'Almacén' },
    { to: '/sales', icon: <BsCoin />, label: 'Ventas' },
    { to: '/purchases', icon: <IoCartOutline />, label: 'Compras' },
    { to: '/access', icon: <IoKeyOutline />, label: 'Acceso' },
  ]

  const systemItems: MenuItemProps[] = [
    { to: '/settings', icon: <IoSettingsOutline />, label: 'Ajustes'},
    { icon: <MdOutlineDarkMode />, label: 'Modo Oscuro', isToggle: true, onClick: toggleDarkMode, toggled: theme === ThemeType.dark  }
  ]

  return (
    <div className="flex flex-col h-full space-y-8">
      <MenuSection title="Menú General" collapsed={collapsed} items={generalItems}/>
      <MenuSection title="Sistema" collapsed={collapsed} items={systemItems}/>

      <ul className="list-none mt-auto space-y-6">
        <UserWidget collapsed={collapsed} />
        <MenuItem 
          onClick={ onLogout }
          label="Cerrar Sesión"
          icon={<IoLogOutOutline />}
          collapsed={collapsed}
        />
      </ul>
    </div>
  )

}