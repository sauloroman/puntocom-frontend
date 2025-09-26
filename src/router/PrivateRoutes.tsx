import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Purchases, Sales, Warehouse, Access, Reports, Settings, Pos, Dashboard } from '../pages'

export const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/access' element={<Access />} />
      <Route path='/purchases' element={<Purchases />} />
      <Route path='/warehouse' element={<Warehouse />} />
      <Route path='/sales' element={<Sales />} />
      <Route path='/reports' element={<Reports />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/pos' element={<Pos />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
