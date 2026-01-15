import { NavLink } from "react-router-dom"
import { useTheme } from "../../hooks"

export interface MenuItemProps {
  to?: string
  icon: React.ReactNode
  label: string
  isToggle?: boolean
  onClick?: () => void
  toggled?: boolean
  collapsed?: boolean
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({
  to,
  icon,
  label,
  isToggle,
  onClick,
  toggled,
  collapsed = false,
  mobileOpen = false,
  onMobileClose
}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const isCollapsed = !mobileOpen && collapsed

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    if (mobileOpen && onMobileClose && to) {
      onMobileClose()
    }
  }

  if (isToggle) {
    return (
      !isCollapsed && (
        <li className={`
          text-xl md:text-sm
          flex items-center justify-between px-3 py-2 rounded-md cursor-pointer 
          transition-colors
          ${isDark 
            ? 'hover:bg-gray-800 text-gray-200' 
            : 'hover:bg-indigo-50 text-gray-700'
          }
        `}>
          <div className='flex items-center gap-3'>
            {icon}
            {label}
          </div>
          <button
            onClick={onClick}
            className={`
              w-10 h-5 flex items-center rounded-full p-1 cursor-pointer 
              transition-all duration-300
              ${toggled 
                ? 'bg-indigo-600 justify-end' 
                : isDark 
                  ? 'bg-gray-600 justify-start' 
                  : 'bg-gray-300 justify-start'
              }
            `}
          >
            <div className='w-4 h-4 bg-white rounded-full shadow-md'></div>
          </button>
        </li>
      )
    )
  }

  if (onClick && !to) {
    return (
      <li>
        <button
          onClick={handleClick}
          className={`
            ${isCollapsed && 'text-xl justify-center'} 
            w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md text-xl md:text-sm 
            transition-colors
            ${isDark
              ? 'text-gray-200 hover:bg-red-900/30 hover:text-red-400'
              : 'text-gray-700 hover:bg-red-100 hover:text-red-600'
            }
          `}
        >
          {icon}
          {!isCollapsed && label}
        </button>
      </li>
    )
  }

  return (
    <NavLink
      to={to!}
      onClick={handleClick}
      className={({ isActive }) =>
        `
          flex items-center gap-3 px-3 py-2 rounded-md text-xl lg:text-sm transition-colors
          ${isActive 
            ? isDark
              ? 'bg-indigo-900/50 text-indigo-400' 
              : 'bg-indigo-100 text-indigo-600'
            : isDark
              ? 'text-gray-300 hover:bg-gray-800 hover:text-indigo-400 hover:font-medium'
              : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:font-medium'
          }
          ${isCollapsed && 'text-xl justify-center'}
        `
      }
    >
      {icon}
      {!isCollapsed && label}
    </NavLink>
  )
}