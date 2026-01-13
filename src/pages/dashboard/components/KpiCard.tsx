import React from 'react'
import { useTheme } from '../../../shared/hooks'

interface KpiCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className={`
        rounded-xl p-5 flex items-center gap-4 border
        ${isDark 
          ? 'bg-gray-900 border-gray-800 shadow-none' 
          : 'bg-white border-gray-200 shadow-sm'
        }
      `}
    >
      {icon && (
        <div
          className={`
            p-3 rounded-lg
            ${isDark 
              ? 'bg-indigo-900/40 text-indigo-400' 
              : 'bg-indigo-50 text-indigo-600'
            }
          `}
        >
          {icon}
        </div>
      )}

      <div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {title}
        </p>

        <p className={`text-2xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
