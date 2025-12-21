import React from 'react'
import { EntityReportList } from './EntityReportList'
import { useTheme } from '../../../shared/hooks'

export const ReportsFolder: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className={`
      border p-5 mt-5 rounded-2xl transition-colors
      ${isDark 
        ? 'border-gray-700 bg-gray-800/50' 
        : 'border-gray-200 bg-white'
      }
    `}>
      <EntityReportList />
    </section>
  )
}