import type { MetaPagination } from "./pagination.interface";
import type { Product } from "./product.interface";

export interface SaveSale {
    total: number,
    details: SaveSaleDetail[]
}

export interface Sale {
    saleId: string
    saleDate: Date | string,
    saleTotal: number,
    saleCode: string,
    User?: {
        id: string,
        name: string,
        role: string,
        image: string,
    }
}

export interface SaleWithDetailsResponse {
    sale: Sale,
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
    ok: boolean,
    message: string,
    sale: SaleWithDetailsResponse
}

export interface GetSale {
    ok: boolean,
    sale: SaleWithDetailsResponse
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
    sales: SaleWithDetailsResponse[]
}

export interface GetFilteredSalesResponse {
    ok: boolean,
    meta: MetaPagination & { 
        filter: {
            prices: {
                priceMin: number,
                priceMax: number
            },
            dates: {
                dateFrom: string,
                dateTo: string
            }
        }
    },
    sales: SaleWithDetailsResponse[]
}

export interface SalesFilterDTO {
    userId: string | null,
    dateStart: string | null,
    dateEnd: string | null,
    minPrice: number | null,
    maxPrice: number | null
}