import { BsBox, BsCoin } from "react-icons/bs"
import { IoCartOutline, IoKeyOutline, IoLogOutOutline, IoCalculatorOutline, IoDocumentTextOutline  } from "react-icons/io5"
import { MdOutlineDarkMode } from "react-icons/md"
import { TfiStatsUp } from "react-icons/tfi"
import { useAuth, useMenu, useTheme } from "../../hooks"
import { ThemeType } from "../../../interfaces/ui/theme.interface"
import { UserWidget } from "../../../pages/access/views/users/components"
import { MenuSection, MenuItem, type MenuItemProps } from "./"

interface MenuProps {
  collapsed: boolean
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export const Menu: React.FC<MenuProps> = ({ collapsed, mobileOpen = false, onMobileClose }) => {

  const { closeMenuMobile } = useMenu()
  const { onLogout } = useAuth()
  const { activateDarkMode, activateLightMode, theme } = useTheme()
  const toggleDarkMode = () => theme === ThemeType.dark ? activateLightMode() : activateDarkMode() 
  
  const generalItems: MenuItemProps[] = [
    { to: '/', icon: <TfiStatsUp />, label: 'Dashboard' },
    { to: '/warehouse', icon: <BsBox />, label: 'Almacén' },
    { to: '/purchases', icon: <IoCartOutline />, label: 'Compras' },
    { to: '/access', icon: <IoKeyOutline />, label: 'Acceso' },
    { to: '/reports', icon: <IoDocumentTextOutline />, label: 'Reportes' },
    { to: '/sales', icon: <BsCoin />, label: 'Ventas' },
    { to: '/pos', icon: <IoCalculatorOutline />, label: 'Registrar Venta' },
  ]

  const systemItems: MenuItemProps[] = [
    { icon: <MdOutlineDarkMode />, label: 'Modo Oscuro', isToggle: true, onClick: toggleDarkMode, toggled: theme === ThemeType.dark  }
  ]

  return (
    <>
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-white z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      <div 
        className={`
          p-6
          lg:p-0
          w-[300px] md:w-52
          flex flex-col h-full space-y-8 
          ${theme === 'dark' && 'bg-gray-800'}          
          fixed lg:static
          inset-y-0 left-0
          z-50          
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <MenuSection
          mobileOpen={mobileOpen}
          onMobileClose={closeMenuMobile} 
          title="Menú General" 
          collapsed={collapsed} 
          items={generalItems}
        />
        <MenuSection 
          mobileOpen={mobileOpen}
          title="Sistema" 
          collapsed={collapsed} 
          items={systemItems}
        />

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
    </>
  )
}