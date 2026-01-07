import React, { useMemo } from 'react'
import { useTheme } from '../../../../../shared/hooks'
import type { Roles } from '../../../../../interfaces/dto/user.interface'

interface RoleTagProps {
  role: Roles
}

export const UserRoleTag: React.FC<RoleTagProps> = ({ role }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const roleStyles = useMemo(() => ({
    'Administrador': isDark
      ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700'
      : 'bg-yellow-100 text-yellow-700',
      
    'Supervisor': isDark
      ? 'bg-blue-900/40 text-blue-400 border border-blue-700'
      : 'bg-blue-100 text-blue-800',
      
    'Vendedor': isDark
      ? 'bg-green-900/40 text-green-400 border border-green-700'
      : 'bg-green-100 text-green-800',
  }), [isDark])

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-semibold inline-block
        ${roleStyles[role]}
      `}
    >
      {role}
    </span>
  )
}
