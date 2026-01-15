import React from 'react'
import { IoIosFolderOpen } from "react-icons/io"
import { useReports, useTheme } from '../../../shared/hooks'
import type { ReportEntities } from '../../../store/reports/reports.slice'

const entitiesTitle: string[] = ["users", "products", "suppliers", "inventoryAdjustments"]

const getSpanishNameEntity = (entity: string) => {
  switch (entity) {
    case 'users':
      return 'usuarios'
    case 'products':
      return 'productos'
    case 'suppliers':
      return 'proveedores'
    case 'purchases':
      return 'compras'
    case 'inventoryAdjustments':
      return 'ajustes'
  }
}

export const EntityReportList: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { onSelectedReports } = useReports()

  return (
    <div className='grid grid-cols-4 gap-8 w-full'>
      {
        entitiesTitle.map(entity => (
          <div 
            onClick={() => onSelectedReports(entity as ReportEntities)} 
            key={entity} 
            className='flex flex-col items-center gap-1 cursor-pointer transition hover:scale-110'
          >
            <IoIosFolderOpen 
              size={40} 
              color={isDark ? '#6b7280' : '#e5e5e5'} 
            />
            <p className={`
              uppercase text-sm font-semibold transition-colors
              ${isDark ? 'text-gray-300' : 'text-gray-600'}
            `}>
              {getSpanishNameEntity(entity)}
            </p>
          </div>
        ))
      }
    </div>
  )
}