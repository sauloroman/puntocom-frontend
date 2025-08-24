import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../interfaces/category.interface";

interface ICategories {
    isLoading: boolean,
    categories: Category[] | null
    categorySelected: Category | null,
}

const initialState: ICategories = {
    isLoading: false,
    categories: null,
    categorySelected: null
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {

        setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        addCategory: ( state, {payload}: PayloadAction<Category>) => {
            state.categories?.unshift( payload )
        },

        updateCategory:  ( state, {payload}: PayloadAction<{categoryId: string, category: Category}>) => {
            state.categories = state.categories!.map( (category: Category) => {
                if(category.id === payload.categoryId) {
                    return payload.category
                }
                return category
            })
        },

        setCategories: ( state, {payload}: PayloadAction<Category[]>) => {
            state.categories = payload
        },

        setCategorySelected: (state, {payload}: PayloadAction<Category>) => {
            state.categorySelected = payload
        },

        resetCategories: ( state ) => {
            state.isLoading = false
            state.categories = null
            state.categorySelected = null
        }

    }
})

export const {
    addCategory,
    updateCategory,
    setIsLoading,
    setCategories,
    setCategorySelected,
    resetCategories
} = categoriesSlice.actions