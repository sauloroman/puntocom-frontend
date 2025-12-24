import type { Product } from "./product.interface"

export interface Purchase {
    purchaseId: string,
    purchaseDate: string,
    puchaseTotal: number,
    Supplier?: {
        supplierId: string,
        supplierName: string,
        supplierPhone: string
    },
    User?: {
        userId: string,
        userName: string,
        userRole: string,
        userImage: string
    }
}

export interface PurchaseDetail {
    id: string,
    purchaseQuantity: number,
    purchaseUnitPrice: number,
    productId: string,
    purchaseId: string,
    Product?: {
        productId: string,
        productName: string,
        productImage: string
    }
}

export interface PurchaseWithDetails {
    purchase: Purchase,
    details: PurchaseDetail[]
}

export interface AddProduct {
    quantity: number,
    unitPrice: number
}

export interface ProductInPurchase {
    product: Product,
    quantity: number,
    unitPrice: number
}

export interface SavePurchaseDetail {
    productId: string,
    quantity: number,
    unitPrice: number
}

export interface SavePurchase {
    total: number,
    supplierId: string,
    details: SavePurchaseDetail[]
}

export interface SavePurchaseResponse {
    ok: boolean,
    message: string,
    purchase: PurchaseWithDetails
}

export interface GetAllPurchases {
    ok: boolean,
    meta: { 
        page: number,
        total: number,
        totalPages: number,
    },
    purchases: PurchaseWithDetails[]
}