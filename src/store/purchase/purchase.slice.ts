import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductInPurchase, PurchaseWithDetails } from "../../interfaces/purchase.interface";
import type { Product } from "../../interfaces/product.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface PurchasesState {
    products: Product[] | null,
    purchases: PurchaseWithDetails[] | null,
    productSelectedToAdd: Product | null,
    productsInPurchase: ProductInPurchase[],
    supplierSelected: string | null,
    pagination: MetaPagination & { itemsPerPage: number },
    isLoading: boolean
}

const initialState: PurchasesState = {
    products: null,
    purchases: null,
    productSelectedToAdd: null,
    productsInPurchase: [],
    supplierSelected: null,
    isLoading: false,
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 30
    },
}

export const purchaseSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {

        setProducts: ( state, {payload}: PayloadAction<Product[]>) => {
            state.products = payload
        },

        setProductsMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

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
            if ( !state.productsInPurchase.includes(payload) ) {
                state.productsInPurchase?.unshift(payload)
            }
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
    setProducts,
    setProductsMetaPagination,
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