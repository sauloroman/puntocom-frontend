import type { MetaPagination } from "./pagination.interface"

export interface CategoryResponse {
    ok: boolean,
    meta: MetaPagination,
    categories: Category[]
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
