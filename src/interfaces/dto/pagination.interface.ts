import type { Filter } from "../ui/filter.interface"

export interface Pagination {
    page: number,
    limit: number
}

export interface MetaPagination {
    page: number,
    totalPages: number,
    total: number,
    filter?: Filter
}