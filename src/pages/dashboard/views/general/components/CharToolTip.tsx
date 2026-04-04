import React from 'react'
import { formatMoney } from '../../../../../shared/helpers'
import { useTheme } from '../../../../../shared/hooks'

interface TooltipEntry {
  dataKey: string
  name:    string
  value:   number
  color:   string
}
 
interface ChartTooltipProps {
  active?:  boolean
  label?:   string
  payload?: TooltipEntry[]
}
 
export const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  if (!active || !payload?.length) return null

  return (
    <div
      className={`
        rounded-lg p-3 text-sm shadow-lg border
        ${isDark ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}
      `}
    >
      <p className='font-semibold mb-1'>{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {formatMoney(entry.value as number, true)}
        </p>
      ))}
    </div>
  )
}