import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MenuSliceI {
    collapsed: boolean,
    isMobileMenuOpen: boolean
}

const initialState: MenuSliceI = {
    collapsed: false,
    isMobileMenuOpen: false,
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState: initialState,
    reducers: {

        setCollapsed: ( state, {payload}: PayloadAction<boolean> ) => {
            state.collapsed = payload
        },

        setIsMobileMenuOpen: ( state, {payload}: PayloadAction<boolean>) => {
            state.isMobileMenuOpen = payload
        }

    }
})

export const {
    setCollapsed,
    setIsMobileMenuOpen,
} = menuSlice.actions