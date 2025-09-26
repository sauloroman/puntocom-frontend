import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ModalNames } from "../../interfaces/ui/modal.interface";

interface IModal {
    isOpen: boolean,
    name: ModalNames | null,
    message?: string,
    confirmPasswordModal: {
        nextModal: ModalNames | null,
    }
}

const initialState: IModal = {
    isOpen: false,
    name: null,
    message: '',
    confirmPasswordModal: {
        nextModal: null
    }
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {

        openModal: (state, {payload}: PayloadAction<ModalNames>) => {
            state.isOpen = true
            state.name = payload
        },

        setConfirmModal: (state, {payload}: PayloadAction<ModalNames | null >) => {
            state.isOpen = true
            state.name = ModalNames.confirmAdminPassword
            state.confirmPasswordModal.nextModal = payload
        },

        resetConfirmModal: (state) => {
            state.isOpen = false
            state.name = null,
            state.confirmPasswordModal.nextModal = null
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
    setModalMessage,
    setConfirmModal,
    resetConfirmModal
} = modalSlice.actions