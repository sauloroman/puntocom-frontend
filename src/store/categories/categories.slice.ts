import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../interfaces/dto/category.interface";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";
import type { FilterCategories } from "../../interfaces/ui/filter.interface";

interface ICategories {
    isLoading: boolean,
    categories: Category[] | null,
    allCategories: Category[] | null,
    categorySelected: Category | null,
    filter: FilterCategories,
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
        categoryName: null, 
        status: null,
    },
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 8,
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

        setCategoryStatusFilter: (state, { payload}: PayloadAction<Pick<FilterCategories, 'status'>>) => {
            state.filter.status = payload.status
        },

        setCategoryNameFilter: (state, {payload}: PayloadAction<Pick<FilterCategories, 'categoryName'>>) => {
            state.filter.categoryName = payload.categoryName
        },

        resetFilter: ( state ) => {
            state.filter = {
                categoryName: null,
                status: null
            }
        },

        resetCategoriesState: ( state ) => {
            state.isLoading = false
            state.categories = null
            state.allCategories = null
            state.categorySelected = null
            state.filter = { 
                categoryName: null, 
                status: null,
            }
            state.pagination = {
                page: 1,
                total: 1,
                totalPages: 1,
                itemsPerPage: 8,
            }
            state.isPaginationVisible = true
            state.isOrderedAsc = false
        }

    }
})

export const {
    addCategory,
    resetCategories,
    setAllCategories,
    setCategories,
    setCategoriesMetaPagination,
    setCategoryNameFilter,
    setCategorySelected,
    setCategoryStatusFilter,
    setIsLoading,
    setOrderedAsc,
    setPage,
    updateCategory,
    resetFilter,
    resetCategoriesState,
} = categoriesSlice.actions