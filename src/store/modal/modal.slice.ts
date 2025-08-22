import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ModalNames } from "../../interfaces/ui/modal.interface";

interface IModal {
    isOpen: boolean,
    name: ModalNames | null
}

const initialState: IModal = {
    isOpen: false,
    name: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {

        openModal: (state, {payload}: PayloadAction<ModalNames>) => {
            state.isOpen = true
            state.name = payload
        },

        closeModal: (state) => {
            state.isOpen = false
            state.name = null
        }

    }
})

export const {
    openModal,
    closeModal
} = modalSlice.actions