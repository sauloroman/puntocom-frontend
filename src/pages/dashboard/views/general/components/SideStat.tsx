import React from 'react'
import { useTheme } from '../../../../../shared/hooks'

interface SideStatProps {
  label: string
  value: string | number
  icon: React.ReactNode
}

export const SideStat: React.FC<SideStatProps> = ({ label, value, icon }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className={`
        flex items-center justify-between p-5 rounded-xl border
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
      `}
    >
      <div className='flex items-center gap-3'>
        <span className={`text-2xl ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>
          {icon}
        </span>
        <span className={`text-md ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
        </span>
      </div>
      <span className={`text-2xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  )
}