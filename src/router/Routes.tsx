import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

export const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='auth/*' element={<PublicRoutes />} />
            <Route path='/*' element={<PrivateRoutes />} />
        </Routes>
    </BrowserRouter>
  )
}
