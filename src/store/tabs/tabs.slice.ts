import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WindowsTab } from "../../interfaces/ui/tabs.interface";

interface ITabsSlice {
    window: WindowsTab | undefined,
    tab: string | undefined
}

const initialState: ITabsSlice = {
    window: undefined,
    tab: undefined
}

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState: initialState,
    reducers: {

        setWindowState: (state, { payload }: PayloadAction<WindowsTab>) => {
            state.window = payload
        },

        setPageState: (state, { payload }: PayloadAction<string | undefined>) => {
            state.tab = payload
        },

        resetTabs: (state) => {
            state.window = undefined
            state.tab = undefined
        }

    }
})

export const {
    setWindowState,
    setPageState,
    resetTabs
} = tabsSlice.actions