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

  const { onSelectedReports, selectedReports } = useReports()

  return (
    <div className='grid grid-cols-4 gap-8 w-full'>
      {
        entitiesTitle.map(entity => {

          const isActive = selectedReports === entity

          return (
            <div 
              onClick={() => onSelectedReports(entity as ReportEntities)} 
              key={entity} 
              className={`
                flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 p-3 rounded-lg
                ${isActive 
                  ? 'scale-110 bg-purple-100 dark:bg-purple-900/30' 
                  : 'hover:scale-110'
                }
              `}
            >
              <IoIosFolderOpen 
                size={40} 
                className={`
                  transition-colors
                  ${isActive 
                    ? 'text-purple-600' 
                    : isDark 
                      ? 'text-gray-500' 
                      : 'text-gray-300'
                  }
                `}
              />

              <p className={`
                uppercase text-sm font-semibold transition-colors
                ${isActive 
                  ? 'text-purple-600' 
                  : isDark 
                    ? 'text-gray-300' 
                    : 'text-gray-600'
                }
              `}>
                {getSpanishNameEntity(entity)}
              </p>
            </div>
          )
        })
      }
    </div>
  )
}