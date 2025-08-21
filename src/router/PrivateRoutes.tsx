import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Purchases, Sales, Warehouse, Access, Reports } from '../pages'

export const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Sales />} />
      <Route path='/access' element={<Access />} />
      <Route path='/purchases' element={<Purchases />} />
      <Route path='/warehouse' element={<Warehouse />} />
      <Route path='/reports' element={<Reports />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
