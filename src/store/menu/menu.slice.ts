import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MenuSliceI {
    collapsed: boolean
}

const initialState: MenuSliceI = {
    collapsed: false
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState: initialState,
    reducers: {

        setCollapsed: ( state, {payload}: PayloadAction<boolean> ) => {
            state.collapsed = payload
        } 

    }
})

export const {
    setCollapsed
} = menuSlice.actions