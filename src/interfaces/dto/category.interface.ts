import type { MetaPagination } from "./pagination.interface"

export interface CategoryResponse {
    ok: boolean,
    meta: MetaPagination,
    categories: Category[]
}

export interface CreateCategory {
    name: string,
    description?: string
}

export interface CreateCategoryResponse {
    ok: boolean,
    message: string,
    category: Category
}

export interface GetAllCategoriesResponse {
    ok: boolean,
    categories: Category[]
}

export interface UpdateCategory {
    name?: string,
    description?: string,
}

export interface UpdateCategoryResponse {
    ok: boolean,
    message: string,
    category: Category
}

export interface UploadCategoryImage {
    ok: boolean,
    message: string,
    category: Category
}

export interface ChangeCategoryStatus {
    ok: boolean,
    message: string,
    category: Category
}

export interface Category {
    id: string,
    name: string,
    description: string,
    icon: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}
