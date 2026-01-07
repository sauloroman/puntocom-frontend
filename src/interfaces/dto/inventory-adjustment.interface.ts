import type { MetaPagination } from "./pagination.interface"

export type AdjustmentEnum = 'entrada' | 'salida'
export const AdjustmentEnum = {
  entrada: 'entrada' as AdjustmentEnum,
  salida: 'salida' as AdjustmentEnum,
}

export interface SaveInventoryAdjustment {
    productId: string,
    userId: string,
    adjustmentType: AdjustmentEnum,
    adjustmentQuantity: number,
    adjustmentReason: string,
}

export interface InventoryAdjustmentResponse {
    adjustmentId: string,
    adjustmentType: AdjustmentEnum,
    adjustmentPrevQuantity: number,
    adjustmentQuantity: number,
    adjustmentReason: string,
    adjustmentDate: string  
    userId: string,
    productId: string,
    User?: {
        id: string,
        name: string,
        role: string,
        image: string,
    },
    Product?: {
        id: string,
        name: string,
        image: string,
        imageCode: string,
        code: string,
        isActive: boolean,
    }
}

export interface GetInventoryAdjustments {
    ok: boolean,
    meta: MetaPagination,
    adjustments: InventoryAdjustmentResponse[]
}

export interface SaveInventoryAdjustmentResponse {
    ok: boolean,
    message: string,
    adjustmentSaved: InventoryAdjustmentResponse
}