import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ChangePassword, ForgotPassword, Login, ValidateAccount } from '../pages'

export const PublicRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='login' element={<Login />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='change-password/:token' element={<ChangePassword />} />
        <Route path='validate-account/:token' element={<ValidateAccount />} />
        <Route path='/*' element={<Navigate to={'/auth/login'} />} />
    </Routes>
  )
}
