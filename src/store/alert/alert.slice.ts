import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../../interfaces/ui/alert.interface";

interface AlertI {
    title: string | null,
    text: string | null,
    type: AlertType,
    isVisible: boolean,
}

const initialState: AlertI = {
    title: null,
    text: null,
    type: AlertType.info,
    isVisible: false
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState: initialState,
    reducers: {
        
        showAlert: (state, {payload}: PayloadAction<Omit<AlertI, 'isVisible'>>) => {
            state.type = payload.type
            state.text = payload.text
            state.title = payload.title
            state.isVisible = true
        },

        closeAlert: (state) => {
            state.title = null
            state.text = null
            state.type = AlertType.info
            state.isVisible = false
        }

    }
})

export const {
    showAlert,
    closeAlert
} = alertSlice.actions