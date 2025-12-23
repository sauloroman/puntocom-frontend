import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductInPurchase, PurchaseWithDetails } from "../../interfaces/purchase.interface";
import type { Product } from "../../interfaces/product.interface";

interface PurchasesState {
    purchases: PurchaseWithDetails[] | null,
    productSelectedToAdd: Product | null,
    productsInPurchase: ProductInPurchase[],
    supplierSelected: string | null,
    isLoading: boolean
}

const initialState: PurchasesState = {
    purchases: null,
    productSelectedToAdd: null,
    productsInPurchase: [],
    supplierSelected: null,
    isLoading: false
}

export const purchaseSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {

        setSupplierSelected: ( state, {payload}: PayloadAction<string> ) => {
            state.supplierSelected = payload
        },

        setPurchases: ( state, { payload }: PayloadAction<PurchaseWithDetails[]>) => {
            state.purchases = payload
        },

        addPurchase: ( state, {payload}: PayloadAction<PurchaseWithDetails>) => {
            state.purchases?.unshift(payload)
        },

        setProductSelectedToAdd: ( state, { payload }: PayloadAction<Product | null>) => {
            state.productSelectedToAdd = payload
        },

        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },

        addProductInPurchase: ( state, { payload }: PayloadAction<ProductInPurchase> ) => {
            state.productsInPurchase?.unshift(payload)
        },

        removeProductInPurchase: ( state, { payload }: PayloadAction<string> ) => {
            state.productsInPurchase = state.productsInPurchase?.filter( pro => pro.product.id !== payload )
        },

        incrementProductQuantityInPurchase: ( state, { payload }: PayloadAction<string> ) => {
            state.productsInPurchase = state.productsInPurchase?.map( pro => {
                if ( pro.product.id === payload ) {
                    pro.quantity++
                }
                return pro
            }) 
        },

        decrementProductQuantityInPurchase: ( state, { payload }: PayloadAction<string> ) => {
            state.productsInPurchase = state.productsInPurchase?.map( pro => {
                if ( pro.product.id === payload && pro.quantity > 0 ) {
                    pro.quantity--
                }
                return pro
            }) 
        },

        clearProductsInPurchase: ( state ) => {
            state.productsInPurchase = []
        }

    }
})

export const {
    setPurchases,
    setProductSelectedToAdd,
    setSupplierSelected,
    setIsLoading,
    addProductInPurchase,
    addPurchase,
    removeProductInPurchase,
    clearProductsInPurchase,
    incrementProductQuantityInPurchase,
    decrementProductQuantityInPurchase
} = purchaseSlice.actions