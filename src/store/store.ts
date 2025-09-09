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

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        theme: themeSlice.reducer,
        alert: alertSlice.reducer,
        menu: menuSlice.reducer,
        tabs: tabsSlice.reducer,
        modal: modalSlice.reducer,
        drawer: drawerSlice.reducer,

        users: usersSlice.reducer,
        categories: categoriesSlice.reducer,
        suppliers: suppliersSlice.reducer
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