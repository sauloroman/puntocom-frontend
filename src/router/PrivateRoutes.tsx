import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Purchases, Sales, Warehouse, Access, Reports, Settings, Pos, Dashboard } from '../pages'
import { useCategories, useInventoryAdjustment, useProducts, usePurchase, useSale, useSuppliers, useUsers } from '../shared/hooks'

export const PrivateRoutes: React.FC = () => {
  
  const { categories, allCategories, getAllCategories, getCategories } = useCategories()
  const { suppliers, getAllSuppliers } = useSuppliers()
  const { sales, getAllSales } = useSale()
  const { products, getProducts } = useProducts()
  const { users, getUsers } = useUsers()
  const { purchases, getPurchases } = usePurchase()
  const { adjustments, getInventoryAdjustments } = useInventoryAdjustment()

  useEffect(() => {
    if ( !purchases ) getPurchases()
    if ( !categories ) getCategories()
    if ( !allCategories ) getAllCategories()
    if ( !suppliers ) getAllSuppliers()
    if ( !products ) getProducts()
    if ( !users ) getUsers()
    if ( !sales ) getAllSales()
    if ( !adjustments ) getInventoryAdjustments()
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
