import React from 'react'
import { MenuItem, type MenuItemProps } from './MenuItem'

interface MenuSectionProps {
  collapsed: boolean
  title: string
  items: MenuItemProps[]
}

export const MenuSection: React.FC<MenuSectionProps> = ({ collapsed, title, items }) => {
  return (
    <nav>
      {!collapsed && (
        <p className='text-xs text-indigo-600 font-semibold uppercase mb-5'>
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
