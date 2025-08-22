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

export interface Category {
    id: string,
    name: string,
    description: string,
    icon: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}
