import React from 'react'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { useTheme } from '../../hooks'

interface MenuSectionProps {
  collapsed: boolean
  title: string
  items: MenuItemProps[]
}

export const MenuSection: React.FC<MenuSectionProps> = ({ collapsed, title, items }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  return (
    <nav>
      {!collapsed && (
        <p className={`
          text-xs font-semibold uppercase mb-5 transition-colors duration-200
          ${isDark ? 'text-indigo-400' : 'text-indigo-600'}
        `}>
          {title}
        </p>
      )}

      <ul className='space-y-2'>
        {items.map((item, i) => (
          <MenuItem key={i} {...item} collapsed={collapsed} />
        ))}
      </ul>
    </nav>
  )
}