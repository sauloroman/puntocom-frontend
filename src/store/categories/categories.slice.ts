import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../interfaces/category.interface";

interface ICategories {
    isLoading: boolean,
    categories: Category[] | null
}

const initialState: ICategories = {
    isLoading: false,
    categories: null
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {

        setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        setCategories: ( state, {payload}: PayloadAction<Category[]>) => {
            state.categories = payload
        }

    }
})

export const {
    setIsLoading,
    setCategories
} = categoriesSlice.actions