import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductMinimal } from "../../interfaces/dto/product.interface";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";
import type { FilterProducts } from "../../interfaces/ui/filter.interface";

interface ProductState {
    isLoading: boolean,
    products: Product[] | null,
    productsMinimal: ProductMinimal[] | null,
    allProducts: Product[] | null,
    productsLowStock: Product[],
    productWarningStock: Product[],
    productNormalStock: Product[],
    productSelected: Product | null,
    filter: FilterProducts,
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    isOrderedAsc: boolean
}

const initialState: ProductState = {
    isLoading: true,
    productsMinimal: null,
    products: null,
    allProducts: null,
    productSelected: null,
    productNormalStock: [],
    productsLowStock: [],
    productWarningStock: [],
    filter: {
        category: {
            id: null,
            name: null
        },
        supplier: {
            id: null,
            name: null
        },
        productName: null,
        status: null,
        price: {
            maxPrice: null,
            minPrice: null
        },
    },
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 20
    },
    isPaginationVisible: true,
    isOrderedAsc: false
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {

        addProducts: ( state, { payload }: PayloadAction<Product> ) => {
            state.products?.unshift(payload)
            state.pagination.total++
        },

        updateProduct: (state, {payload}: PayloadAction<{productId: string, product: Product}>) => {
            state.products = state.products!.map( (product: Product) => {
                if ( product.id === payload.productId) {
                    return payload.product
                }
                return product
            })
        },

        updateProductStockInWarehouse: (state, {payload}: PayloadAction<{ productId: string, quantityDiscount: number }>) => {
            state.products = state.products?.map( pro => {
                if ( pro.id === payload.productId) {
                    pro.stock = pro.stock - payload.quantityDiscount
                }
                return pro
            }) ?? []
        },

        setProductsMinimal: ( state, { payload }: PayloadAction<ProductMinimal[]>) => {
            state.productsMinimal = payload
        },

        setProducts: ( state, { payload }: PayloadAction<Product[]>) => {
            state.products = payload
        },

        setAllProducts: ( state, {payload}: PayloadAction<Product[]>) => {
            state.allProducts = payload
        },

        setProductsLowStock: (state, {payload}: PayloadAction<Product[]>) => {
            state.productsLowStock = payload
        },

        setProductsWarningStock: (state, {payload}: PayloadAction<Product[]>) => {
            state.productWarningStock = payload
        },

        setProductsNormalStock: (state, {payload}: PayloadAction<Product[]>) => {
            state.productNormalStock = payload
        },

        setSelectedProduct: (state, { payload }: PayloadAction<Product>) => {
            state.productSelected = payload
        },

        setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        setPage: (state, {payload}: PayloadAction<number>) => {
            state.pagination.page = payload
        },

        setProductsMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

        setProductStatusFilter: ( state, {payload}: PayloadAction<Pick<FilterProducts, 'status'>>) => {
            state.filter.status = payload.status
        },

        setProductCategoryFilter: ( state, {payload}: PayloadAction<Pick<FilterProducts, 'category'>>) => {
            state.filter.category = payload.category  
        },

        setProductSupplierFilter: ( state, {payload}: PayloadAction<Pick<FilterProducts, 'supplier'>>) => {
            state.filter.supplier = payload.supplier
        },

        setProductNameFilter: ( state, {payload}: PayloadAction<Pick<FilterProducts, 'productName'>>) => {
            state.filter.productName = payload.productName
        },

        setProductPricesFilter: ( state, { payload }: PayloadAction<Pick<FilterProducts, 'price'>> ) => {
            state.filter.price = payload.price
        },

        resetFilter: ( state ) => {
            state.filter = {
                category: {
                    id: null,
                    name: null,
                },
                supplier: {
                    id: null,
                    name: null,
                },
                productName: null,
                status: null,
                price: {
                    maxPrice: null,
                    minPrice: null
                },
            }
        },

        setPaginationVisible: ( state, {payload}: PayloadAction<boolean>) => {
            state.isPaginationVisible = payload
        },

        setOrderedAsc: (state, {payload}:PayloadAction<boolean>) => {
            state.isOrderedAsc = payload
        }
    }
})

export const {
    addProducts,
    resetFilter,
    setAllProducts,
    setIsLoading,
    setOrderedAsc,
    setPage,
    setPaginationVisible,
    setProductCategoryFilter,
    setProductNameFilter,
    setProductPricesFilter,
    setProducts,
    setProductsLowStock,
    setProductsMetaPagination,
    setProductsMinimal,
    setProductsNormalStock,
    setProductStatusFilter,
    setProductSupplierFilter,
    setProductsWarningStock,
    setSelectedProduct,
    updateProduct,
    updateProductStockInWarehouse,
} = productsSlice.actions