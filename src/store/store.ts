import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { alertSlice } from "./alert/alert.slice";
import { themeSlice } from "./theme/theme.slice";
import { menuSlice } from "./menu/menu.slice";
import { tabsSlice } from "./tabs/tabs.slice";
import { categoriesSlice } from "./categories/categories.slice";
import { modalSlice } from "./modal/modal.slice";
import { drawerSlice } from "./drawer/drawer.slice";
import { suppliersSlice } from "./suppliers/supplier.slice";
import { usersSlice } from "./users/users.slice";
import { productsSlice } from "./products/products.slice";
import { reportsSlice } from "./reports/reports.slice";
import { posSlice } from "./pos/pos.slice";
import { saleSlice } from "./sale/sale.slice";
import { inventorySlice } from "./inventory-adjustment/inventory-adjustment.slice";
import { purchaseSlice } from "./purchase/purchase.slice";
import { dashboardSlice } from "./dashboard/dashboard.slice";

export const store = configureStore({
    reducer: {
        auth:                   authSlice.reducer,
        theme:                  themeSlice.reducer,
        alert:                  alertSlice.reducer,
        menu:                   menuSlice.reducer,
        tabs:                   tabsSlice.reducer,
        modal:                  modalSlice.reducer,
        drawer:                 drawerSlice.reducer,
        reports:                reportsSlice.reducer,
        pos:                    posSlice.reducer,
        sale:                   saleSlice.reducer,
        inventoryAdjustment:    inventorySlice.reducer,
        purchase:               purchaseSlice.reducer,
        users:                  usersSlice.reducer,
        categories:             categoriesSlice.reducer,
        suppliers:              suppliersSlice.reducer,
        products:               productsSlice.reducer,
        dashboard:              dashboardSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>