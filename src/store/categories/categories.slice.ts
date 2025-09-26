import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../interfaces/category.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface ICategories {
    isLoading: boolean,
    categories: Category[] | null,
    allCategories: Category[] | null,
    categorySelected: Category | null,
    filter: { status: boolean | null, isVisible: boolean },
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    isOrderedAsc: boolean,
}

const initialState: ICategories = {
    isLoading: false,
    categories: null,
    allCategories: null,
    categorySelected: null,
    filter: { 
        status: null,
        isVisible: true 
    },
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 10,
    },
    isPaginationVisible: true,
    isOrderedAsc: false,
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {

        setOrderedAsc: (state, {payload}:PayloadAction<boolean>) => {
            state.isOrderedAsc = payload
        },

        setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        addCategory: ( state, {payload}: PayloadAction<Category>) => {
            state.categories?.unshift( payload )
            state.pagination.total++
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

        setAllCategories: ( state, {payload}: PayloadAction<Category[]>) => {
            state.allCategories = payload
        },

        setCategorySelected: (state, {payload}: PayloadAction<Category>) => {
            state.categorySelected = payload
        },

        setCategoriesMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

        setPage: (state, {payload}: PayloadAction<number>) => {
            state.pagination.page = payload
        },

        resetCategories: ( state ) => {
            state.isLoading = false
            state.categories = null
            state.categorySelected = null
        },

        setStatusFilter: (state, { payload}: PayloadAction<{status: boolean | null, isVisible: boolean}>) => {
            state.filter.status = payload.status
            state.filter.isVisible = payload.isVisible
        },

        setPaginationVisible: ( state, {payload}: PayloadAction<boolean>) => {
            state.isPaginationVisible = payload
        }

    }
})

export const {
    addCategory,
    updateCategory,
    setIsLoading,
    setCategories,
    setAllCategories,
    setCategorySelected,
    resetCategories,
    setCategoriesMetaPagination,
    setPage,
    setStatusFilter,
    setPaginationVisible,
    setOrderedAsc,
} = categoriesSlice.actions