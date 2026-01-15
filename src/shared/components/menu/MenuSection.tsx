import React from 'react'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { useTheme } from '../../hooks'

interface MenuSectionProps {
  collapsed: boolean
  title: string
  items: MenuItemProps[]
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export const MenuSection: React.FC<MenuSectionProps> = ({ 
  collapsed, 
  title, 
  items,
  mobileOpen = false,
  onMobileClose
}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const showTitle = mobileOpen || !collapsed
  
  return (
    <nav>
      {showTitle && (
        <p className={`
          text-xl md:text-xs font-semibold uppercase mb-5 transition-colors duration-200
          ${isDark ? 'text-indigo-400' : 'text-indigo-600'}
        `}>
          {title}
        </p>
      )}

      <ul className='space-y-2'>
        {items.map((item, i) => (
          <MenuItem 
            key={i} 
            {...item} 
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onMobileClose={onMobileClose}
          />
        ))}
      </ul>
    </nav>
  )
}