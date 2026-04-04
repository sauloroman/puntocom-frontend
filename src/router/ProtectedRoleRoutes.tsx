import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../shared/hooks'
import { roleAccess } from './role.routes'
import type { Roles } from '../interfaces/dto/user.interface'

export const ProtectedRoleRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" />

  const allowedRoutes = roleAccess[user.role as Roles]

  if (!allowedRoutes.includes(location.pathname)) {
    return <Navigate to="/warehouse" replace />
  }

  return children
}
