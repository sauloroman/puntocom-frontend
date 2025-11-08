import type { MetaPagination } from "./pagination.interface";
import type { Product } from "./product.interface";

export interface SaveSale {
    total: number,
    details: SaveSaleDetail[]
}

export interface SaleResponse {
    id: string
    date: Date | string,
    total: number,
    code: string,
    User?: {
        id: string,
        name: string,
        role: string,
        image: string,
    },
    details: SaleProductDetailResponse[]
}

export interface ProductInSale {
    product: Product | undefined;
    quantity: number;
    discount: number;
    unitPrice: number;
}[]

export interface SaleProductDetailResponse {
    id: string,
    saleQuantity: number,
    saleUnitPrice: number,
    saleDiscount: number,
    productId: string,
    saleId: string,
    Product?: {
        id: string,
        name: string,
        code: string
    }
}

export interface SaveSaleResponse {
    ok: true,
    message: string,
    sale: SaleResponse
}

export interface SaveSaleDetail {
    productId: string,
    quantity: number,
    unitPrice: number,
    discount: number
}

export interface GetAllSalesResponse {
    ok: boolean,
    meta: MetaPagination,
    sales: SaleResponse[]
}

export interface PriceRange {
    minPrice: number
    maxPrice: number
}
