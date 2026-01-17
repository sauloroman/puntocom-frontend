import React, { useMemo } from 'react'
import { useTheme } from "../../hooks"

interface Props {
  status: boolean
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const styles = useMemo(() => {
    return status
      ? isDark
        ? 'bg-green-900/40 text-green-400 border-green-700'
        : 'bg-green-100 text-green-700 border-green-300'
      : isDark
        ? 'bg-red-900/40 text-red-400 border-red-700'
        : 'bg-red-100 text-red-600 border-red-300'
  }, [status, isDark])

  const label = status ? 'Activo' : 'Inactivo'

  return (
    <span
      role="status"
      aria-label={label}
      className={`px-3 py-1 rounded-full text-lg md:text-xs font-medium border ${styles}`}
    >
      {label}
    </span>
  )
}
