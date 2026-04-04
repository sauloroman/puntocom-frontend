export type WindowsTab = 'warehouse' | 'access' | 'purchases'
export const WindowsTab = {
    warehouse: 'warehouse' as WindowsTab,
    access: 'access' as WindowsTab,
    purchases: 'purchases' as WindowsTab,
    dashboard: 'dashboard' as WindowsTab
}

export type WarehouseTabs = 'categories' | 'products' | 'lowStock' | 'warehouseAdjustment'
export const WarehouseTabs = {
    categories: 'categories' as WarehouseTabs,
    products: 'products' as WarehouseTabs,
    lowStock: 'lowStock' as WarehouseTabs,
    warehouseAdjustment: 'warehouseAdjustment' as WarehouseTabs
}

export type AccessTabs = 'roles' | 'users'
export const AccessTabs = {
    role: 'roles' as AccessTabs,
    users: 'users' as AccessTabs,
}

export type DashboardTabs = 'kpis' | 'sales' | 'purchases' | 'products'
export const DashboardTabs = {
    kpis: 'kpis' as DashboardTabs,
    sales: 'sales' as DashboardTabs,
    purchases: 'purchases' as DashboardTabs,
    products: 'products' as DashboardTabs, 
}