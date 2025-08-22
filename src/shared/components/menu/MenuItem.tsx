import { NavLink } from "react-router-dom"

export interface MenuItemProps {
  to?: string
  icon: React.ReactNode
  label: string
  isToggle?: boolean
  onClick?: () => void
  toggled?: boolean
  collapsed?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({
  to,
  icon,
  label,
  isToggle,
  onClick,
  toggled,
  collapsed = false
}) => {

  // Toggle switch
  if (isToggle) {
    return (
      !collapsed &&
      <li className='flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-indigo-50 transition-colors text-sm'>
        <div className='flex items-center gap-3 text-gray-700'>
          {icon}
          {label}
        </div>
        <button
          onClick={onClick}
          className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all duration-300 ${toggled ? 'bg-indigo-600 justify-end' : 'justify-start'}`}
        >
          <div className='w-4 h-4 bg-white rounded-full shadow-md'></div>
        </button>
      </li>
    )
  }

  // Button (e.g., logout)
  if (onClick && !to) {
    return (
      <li>
        <button
          onClick={onClick}
          className={` ${collapsed && 'text-xl justify-center'} w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors`}
        >
          {icon}
          {!collapsed && label}
        </button>
      </li>
    )
  }

  // NavLink
  return (
    <NavLink
      to={to!}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
        ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:font-medium'}
        ${collapsed && 'text-xl justify-center'}
        `
      }
    >
      {icon}
      {!collapsed && label}
    </NavLink>
  )
}
