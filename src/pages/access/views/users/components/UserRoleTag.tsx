import React from 'react'
import type { Roles } from '../../../interfaces/user.interface'

interface RoleTagProps {
  role: Roles
}

export const UserRoleTag: React.FC<RoleTagProps> = ({ role }) => {
  const roleStyles = {
    'Administrador': 'bg-yellow-100 text-yellow-700',
    'Supervisor': 'bg-blue-100 text-blue-800',
    'Vendedor': 'bg-green-100 text-green-800',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${roleStyles[role]}`}
    >
      {role}
    </span>
  )
}
