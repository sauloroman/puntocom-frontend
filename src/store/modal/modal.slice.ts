import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ModalNames } from "../../interfaces/ui/modal.interface";

interface IModal {
    isOpen: boolean,
    name: ModalNames | null,
    message?: string
}

const initialState: IModal = {
    isOpen: false,
    name: null,
    message: ''
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
            state.message = ''
        },

        setModalMessage: (state, {payload}: PayloadAction<string>) => {
            state.message = payload
        }

    }
})

export const {
    openModal,
    closeModal,
    setModalMessage
} = modalSlice.actions