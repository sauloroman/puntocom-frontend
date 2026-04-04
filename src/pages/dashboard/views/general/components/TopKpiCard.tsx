import React from 'react'
import { useTheme } from '../../../../../shared/hooks'

export type KpiAccent = 'indigo' | 'emerald' | 'amber' | 'rose'

interface TopKpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  accent: KpiAccent
}

const accentMap: Record<KpiAccent, { light: string; dark: string; bar: string }> = {
  indigo:  { light: 'bg-indigo-50 text-indigo-600',  dark: 'bg-indigo-900/30 text-indigo-400',  bar: 'bg-indigo-500' },
  emerald: { light: 'bg-emerald-50 text-emerald-600', dark: 'bg-emerald-900/30 text-emerald-400', bar: 'bg-emerald-500' },
  amber:   { light: 'bg-amber-50 text-amber-600',    dark: 'bg-amber-900/30 text-amber-400',    bar: 'bg-amber-500' },
  rose:    { light: 'bg-rose-50 text-rose-600',      dark: 'bg-rose-900/30 text-rose-400',      bar: 'bg-rose-500' },
}

export const TopKpiCard: React.FC<TopKpiCardProps> = ({ title, value, subtitle, icon, accent }) => {

  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const a = accentMap[accent]

  return (
    <div
      className={`
        rounded-xl p-5 border flex flex-col gap-3 relative overflow-hidden
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
      `}
    >
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${a.bar}`} />

      <div className='flex items-start justify-between'>
        <p className={`text-md font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
        <div className={`p-2 rounded-lg ${isDark ? a.dark : a.light}`}>{icon}</div>
      </div>

      <div>
        <p className={`text-3xl font-bold tracking-tight ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>{value}</p>
        {subtitle && (
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{subtitle}</p>
        )}
      </div>
    </div>
  )
}