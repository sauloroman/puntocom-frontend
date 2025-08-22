import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DrawelNames } from "../../interfaces/ui/drawel.interface";

interface IDrawel {
    drawelName: DrawelNames | null,
    rightIsOpen: boolean
}

const initialState: IDrawel = {
    drawelName: null,
    rightIsOpen: false
}

export const drawerSlice = createSlice({
    name: 'drawer', 
    initialState: initialState, 
    reducers: { 

        openRightDrawel: (state, {payload}: PayloadAction<DrawelNames>) => {
            state.drawelName = payload
            state.rightIsOpen = true
        },

        closeDrawels: (state) => {
            state.drawelName = null
            state.rightIsOpen = false
        }

    }
})

export const {
    openRightDrawel,
    closeDrawels
} = drawerSlice.actions