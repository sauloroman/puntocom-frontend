import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DrawelNames } from "../../interfaces/ui/drawel.interface";

interface IDrawel {
    drawelName: DrawelNames | null,
    rightIsOpen: boolean,
    leftIsOpen: boolean
}

const initialState: IDrawel = {
    drawelName: null,
    rightIsOpen: false,
    leftIsOpen: false,
}

export const drawerSlice = createSlice({
    name: 'drawer', 
    initialState: initialState, 
    reducers: { 

        openRightDrawel: (state, {payload}: PayloadAction<DrawelNames>) => {
            state.drawelName = payload
            state.rightIsOpen = true
        },

        openLeftDrawel: (state, {payload}: PayloadAction<DrawelNames>) => {
            state.drawelName = payload
            state.leftIsOpen = true
        },

        closeDrawels: (state) => {
            state.drawelName = null
            state.rightIsOpen = false
            state.leftIsOpen = false
        }

    }
})

export const {
    openRightDrawel,
    openLeftDrawel,
    closeDrawels
} = drawerSlice.actions