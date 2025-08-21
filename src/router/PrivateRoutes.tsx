import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Purchases, Sales, Warehouse, Access, Reports, Settings } from '../pages'

export const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Reports />} />
      <Route path='/access' element={<Access />} />
      <Route path='/purchases' element={<Purchases />} />
      <Route path='/warehouse' element={<Warehouse />} />
      <Route path='/sales' element={<Sales />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
