import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../../interfaces/ui/theme.interface";

interface ThemeSlice {
    theme: ThemeType,
}

const initialState: ThemeSlice = {
    theme: ThemeType.light
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {

        setTheme: ( state, { payload }: PayloadAction<ThemeType>) => {
            state.theme = payload
        }

    }
})

export const {
    setTheme
} = themeSlice.actions