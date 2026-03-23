import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Purchases, Sales, Warehouse, Access, Reports, Settings, Pos, Dashboard } from '../pages'
import { useCategories, useInventoryAdjustment, useProducts, usePurchase, useSale, useSuppliers, useUsers } from '../shared/hooks'

export const PrivateRoutes: React.FC = () => {
  
  const { categories, allCategories, onGetAllCategories, onGetCategories } = useCategories()
  const { suppliers, onGetAllSuppliers } = useSuppliers()
  const { sales, onGetAllSales } = useSale()
  const { products, onGetProducts } = useProducts()
  const { users, allUsers, onGetUsers, onGetAllUsers } = useUsers()
  const { purchases, onGetPurchases } = usePurchase()
  const { adjustments, onGetInventoryAdjustments } = useInventoryAdjustment()

  useEffect(() => {
    if ( !purchases ) onGetPurchases()
    if ( !categories ) onGetCategories()
    if ( !allCategories ) onGetAllCategories()
    if ( !suppliers ) onGetAllSuppliers()
    if ( !products ) onGetProducts()
    if ( !users ) onGetUsers()
    if ( !allUsers ) onGetAllUsers()
    if ( !sales ) onGetAllSales()
    if ( !adjustments ) onGetInventoryAdjustments()
  }, [])

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
