import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { useAuth } from '../shared/hooks'
import { AuthStatus } from '../interfaces/dto/user.interface'

export const RoutesApp: React.FC = () => {
  const { status, renewAuth } = useAuth()

  useEffect(() => {
    renewAuth()
  }, [])

  return (
    <BrowserRouter>
        <Routes>
          { 
            status === AuthStatus.AUTHENTICATED
            ? <Route path='/*' element={<PrivateRoutes />} />
            : <Route path='auth/*' element={<PublicRoutes />} />
          }
          <Route path='/*' element={<Navigate to={'/auth/login'} />} />
        </Routes>
    </BrowserRouter>
  )
}
