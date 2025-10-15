import type { MetaPagination } from "./pagination.interface"

export interface CreateProduct {
    name: string,
    description?: string,
    sellingPrice: number,
    stock: number,
    stockMin: number,
    categoryId: string,
    supplierId: string
}

export interface EditProduct {
    name?: string,
    description?: string,
    sellingPrice?: number,
    categoryId?: string,
    supplierId?: string
}

export interface EditProductResponse {
    ok: boolean,
    message: string,
    product: Product
}

export interface CreateProductResponse {
    ok: boolean,
    message: string,
    product: Product
}

export interface GetProductsResponse {
    ok: boolean,
    meta: MetaPagination,
    products: Product[]
}

export interface ChangeProductStatusResponse {
    ok: boolean,
    message: string,
    product: Product
}

export interface UploadProductImageResponse {
    ok: boolean,
    message: string,
    product: Product
}

export interface ProductInCart {
    product: Product,
    quantity: number,
    discount: number
}

export interface Product {
    id: string,
    name: string,
    description: string,
    sellingPrice: number,
    stock: number,
    stockMin: number,
    imageCode: string,
    image: string,
    code: string,
    categoryId: string,
    supplierId: string,
    isActive: boolean,
    createdAt: string | Date,
    updatedAt: string | Date,
    Category?: {
        id: string,
        name: string,
        description: string,
        icon: string,
        isActive: boolean
    },
    Supplier?: {
        id: string,
        name: string,
        lastname: string,
        company: string,
        phone: string,
        email: string,
        address: string,
        isActive: boolean,
    }
}