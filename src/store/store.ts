import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { alertSlice } from "./alert/alert.slice";
import { themeSlice } from "./theme/theme.slice";
import { menuSlice } from "./menu/menu.slice";
import { tabsSlice } from "./tabs/tabs.slice";
import { categoriesSlice } from "./categories/categories.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        theme: themeSlice.reducer,
        alert: alertSlice.reducer,
        menu: menuSlice.reducer,
        tabs: tabsSlice.reducer,

        categories: categoriesSlice.reducer
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