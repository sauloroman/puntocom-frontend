import type { MetaPagination } from "./pagination.interface"

export interface GetSuppliersResponse {
    ok: boolean,
    meta: MetaPagination,
    suppliers: Supplier[]
}

export interface GetUniqueCompaniesSupplier {
    ok: boolean,
    companies: string[]
}

export interface CreateSupplier {
    name: string,
    lastname: string,
    company: string,
    phone: string,
    email: string
}

export interface CreateSupplierResponse {
    ok: boolean,
    message: string,
    supplier: Supplier
}

export interface UpdateSupplier {
    name?: string,
    lastname?: string,
    company?: string,
    phone?: string,
    email?: string,
    address?: string
}

export interface UpdateSupplierResponse {
    ok: boolean,
    message: string,
    supplier: Supplier
}

export interface ChangeSupplierStatusResponse {
    ok: boolean,
    message: string,
    supplier: Supplier
}

export interface Supplier {
    id: string,
    name: string,
    lastname: string,
    company: string,
    phone: string,
    email: string,
    address: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}