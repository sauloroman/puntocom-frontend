import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Purchases, Sales, Warehouse, Access, Reports, Settings, Pos, Dashboard } from '../pages'
import { useCategories, useInventoryAdjustment, useProducts, usePurchase, useSale, useSuppliers, useUsers } from '../shared/hooks'
import { ProtectedRoleRoutes } from './ProtectedRoleRoutes'

export const PrivateRoutes: React.FC = () => {

  const { categories, allCategories, onGetAllCategories, onGetCategories } = useCategories()
  const { suppliers, onGetAllSuppliers } = useSuppliers()
  const { sales, onGetAllSales } = useSale()
  const { products, productsMinimal, onGetProducts, onGetMinimalProducts } = useProducts()
  const { users, allUsers, onGetUsers, onGetAllUsers } = useUsers()
  const { purchases, onGetPurchases } = usePurchase()
  const { adjustments, onGetInventoryAdjustments } = useInventoryAdjustment()

  useEffect(() => {
    if (!purchases) onGetPurchases()
    if (!categories) onGetCategories()
    if (!allCategories) onGetAllCategories()
    if (!suppliers) onGetAllSuppliers()
    
    if (!products) onGetProducts()
    if (!productsMinimal) onGetMinimalProducts()

    if (!users) onGetUsers()
    if (!allUsers) onGetAllUsers()
    if (!sales) onGetAllSales()
    if (!adjustments) onGetInventoryAdjustments()
  }, [])

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoleRoutes>
          <Dashboard />
        </ProtectedRoleRoutes>
      } />

      <Route path="/access" element={
        <ProtectedRoleRoutes>
          <Access />
        </ProtectedRoleRoutes>
      } />

      <Route path="/purchases" element={
        <ProtectedRoleRoutes>
          <Purchases />
        </ProtectedRoleRoutes>
      } />

      <Route path="/warehouse" element={
        <ProtectedRoleRoutes>
          <Warehouse />
        </ProtectedRoleRoutes>
      } />

      <Route path="/sales" element={
        <ProtectedRoleRoutes>
          <Sales />
        </ProtectedRoleRoutes>
      } />

      <Route path="/reports" element={
        <ProtectedRoleRoutes>
          <Reports />
        </ProtectedRoleRoutes>
      } />

      <Route path="/settings" element={
        <ProtectedRoleRoutes>
          <Settings />
        </ProtectedRoleRoutes>
      } />

      <Route path="/pos" element={
        <ProtectedRoleRoutes>
          <Pos />
        </ProtectedRoleRoutes>
      } />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )

}
