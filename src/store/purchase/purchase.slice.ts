import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductInPurchase, PurchaseWithDetails, SavePurchaseDetail } from "../../interfaces/purchase.interface";
import type { Product } from "../../interfaces/product.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface FilterPurchases {
    dates: {
        dateStart: string | null,
        dateEnd: string | null
    },
    price: {
        minPrice: number | null,
        maxPrice: number | null,
    },
    supplier: {
        id: string | null,
        name: string | null
    },
    user: {
        id: string | null,
        name: string | null
    },
}

interface PurchasesState {
    products: Product[] | null,
    purchases: PurchaseWithDetails[] | null,
    purchaseSelected: PurchaseWithDetails | null,
    productSelectedToAdd: Product | null,
    productsInPurchase: ProductInPurchase[],
    supplierSelected: string | null,
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    purchasesPagination: MetaPagination & { itemsPerPage: number },
    isPurchasesPaginationVisible: boolean,
    isLoading: boolean,
    filter: FilterPurchases
}

const initialState: PurchasesState = {
    products: null,
    purchases: null,
    purchaseSelected: null,
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
    isPaginationVisible: true,
    purchasesPagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 20
    },
    isPurchasesPaginationVisible: true,
    filter: {
        dates: {
            dateStart: null,
            dateEnd: null,
        },
        price: {
            minPrice: null,
            maxPrice: null,
        },
        supplier: {
            id: null,
            name: null,
        },
        user: {
            id: null,
            name: null,
        }
    }
}

export const purchaseSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {

        setProducts: (state, { payload }: PayloadAction<Product[]>) => {
            state.products = payload
        },

        setProductsMetaPagination: (state, { payload }: PayloadAction<MetaPagination & { itemsPerPage: number }>) => {
            state.pagination = payload
        },

        setIsPurchasesPaginationVisible: (state, { payload }: PayloadAction<boolean>) => {
            state.isPurchasesPaginationVisible = payload
        },

        setPurchasesMetaPagination: (state, { payload }: PayloadAction<MetaPagination & { itemsPerPage: number }>) => {
            state.purchasesPagination = payload
        },

        setPurchaseSelected: (state, { payload }: PayloadAction<PurchaseWithDetails>) => {
            state.purchaseSelected = payload
        },

        setSupplierSelected: (state, { payload }: PayloadAction<string>) => {
            state.supplierSelected = payload
        },

        setPurchases: (state, { payload }: PayloadAction<PurchaseWithDetails[]>) => {
            state.purchases = payload
        },

        addPurchase: (state, { payload }: PayloadAction<PurchaseWithDetails>) => {
            state.purchases?.unshift(payload)
        },

        setProductSelectedToAdd: (state, { payload }: PayloadAction<Product | null>) => {
            state.productSelectedToAdd = payload
        },

        updateProduct: (state, { payload }: PayloadAction<SavePurchaseDetail>) => {
            state.products = state.products?.map(pro => {
                if (pro.id === payload.productId) {
                    pro.stock = pro.stock + payload.quantity
                }
                return pro
            }) ?? []
        },

        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        setPageProducts: (state, { payload }: PayloadAction<number>) => {
            state.pagination.page = payload
        },

        setPagePurchases: (state, { payload }: PayloadAction<number>) => {
            state.purchasesPagination.page = payload
        },

        addProductInPurchase: (state, { payload }: PayloadAction<ProductInPurchase>) => {
            if (!state.productsInPurchase.includes(payload)) {
                state.productsInPurchase?.unshift(payload)
            }
        },

        removeProductInPurchase: (state, { payload }: PayloadAction<string>) => {
            state.productsInPurchase = state.productsInPurchase?.filter(pro => pro.product.id !== payload)
        },

        incrementProductQuantityInPurchase: (state, { payload }: PayloadAction<string>) => {
            state.productsInPurchase = state.productsInPurchase?.map(pro => {
                if (pro.product.id === payload) {
                    pro.quantity++
                }
                return pro
            })
        },

        decrementProductQuantityInPurchase: (state, { payload }: PayloadAction<string>) => {
            state.productsInPurchase = state.productsInPurchase?.map(pro => {
                if (pro.product.id === payload && pro.quantity > 0) {
                    pro.quantity--
                }
                return pro
            })
        },

        clearProductsInPurchase: (state) => {
            state.productsInPurchase = []
        },

        setFilterUser: (state, { payload }: PayloadAction<{ id: string, name: string }> ) => {
            state.filter = {
                ...state.filter,
                user: { ...payload }
            }
        },

        setFilterSupplier: (state, { payload }: PayloadAction<{ id: string, name: string }> ) => {
            state.filter = {
                ...state.filter,
                supplier: {...payload}
            }
        },

        resetFilter: ( state ) => {
            state.filter = {
            dates: {
                dateEnd: null,
                dateStart: null
            },
            price: {
                maxPrice: null,
                minPrice: null,
            },
            supplier: {
                id: null,
                name: null
            },
            user: {
                id: null,
                name: null
            }
        }
        }

    }
})

export const {
    setFilterUser,
    setFilterSupplier,
    setProducts,
    setProductsMetaPagination,
    setPurchasesMetaPagination,
    setIsPurchasesPaginationVisible,
    setPurchases,
    setPurchaseSelected,
    setProductSelectedToAdd,
    setSupplierSelected,
    setIsLoading,
    setPageProducts,
    setPagePurchases,
    addProductInPurchase,
    addPurchase,
    updateProduct,
    resetFilter,
    removeProductInPurchase,
    clearProductsInPurchase,
    incrementProductQuantityInPurchase,
    decrementProductQuantityInPurchase
} = purchaseSlice.actions