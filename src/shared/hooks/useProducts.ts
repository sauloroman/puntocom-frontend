import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { CreateProduct, EditProduct, Product } from "../../interfaces/dto/product.interface"

import { 
    startChangingProductStatus, 
    startCreatingProduct, 
    startFilteringProducts, 
    startGettingAllProducts, 
    startGettingAllProductsFull, 
    startGettingProductsByStock, 
    startGettingProductsNoStock, 
    startUpdatingProduct, 
    startUploadingProductImage 
} from "../../store/products/products.thunk"

import { 
    resetFilter,
    setOrderedAsc, 
    setPage, 
    setPaginationVisible, 
    setProductCategoryFilter, 
    setProductNameFilter, 
    setProductPricesFilter, 
    setProducts, 
    setProductStatusFilter, 
    setProductSupplierFilter, 
    setSelectedProduct, 
} from "../../store/products/products.slice"
import type { FilterProductByItem, FilterProducts } from "../../interfaces/ui/filter.interface"

export const useProducts = () => {

    const dispatch = useDispatch<any>()
    const {
        isOrderedAsc, 
        isLoading, 
        isPaginationVisible,
        products, 
        productsMinimal,
        pagination, 
        productsNoStock,
        productSelected, 
        filter,
        productNormalStock,
        productWarningStock,
        productsLowStock,
        allProducts
    } = useSelector( (state: RootState) => state.products )

    const applyProductFilters = (
        page: number,
        limit: number,
        overrides?: Partial<FilterProducts>
    ) => {

        const current: FilterProducts = {
            category: filter.category,
            productName: filter.productName,
            status: filter.status,
            supplier: filter.supplier,
            price: filter.price
        }

        const applied = { ...current, ...overrides }
        const hasStatusFilter = applied.status !== null
        const hasCategoryFilter = applied.category !== null
        const hasSupplierFilter = applied.supplier !== null
        const hasProductnameFilter = applied.productName !== null
        const hasPriceFilter = applied.price !== null

        if ( 
            hasStatusFilter || 
            hasCategoryFilter || 
            hasSupplierFilter || 
            hasProductnameFilter ||
            hasPriceFilter 
        ) {
            dispatch(startFilteringProducts(
                applied.status ?? undefined,
                applied.productName ?? undefined,
                applied.category ?? undefined,
                applied.supplier ?? undefined,
                applied.price ?? undefined, 
                { page, limit }
            ))
        } else {
            dispatch(startFilteringProducts(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                { page, limit }
            ))
        }

    }

    const onGetProducts = () => {
        dispatch(startFilteringProducts(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
        ))        
    }

    const onGetProductsNoStock = () => {
        dispatch(startGettingProductsNoStock())
    }

    const onGetMinimalProducts = () => {
        dispatch(startGettingAllProducts())
    }

    const onGetProductsByStock = () => {
        dispatch(startGettingProductsByStock())
    }

    const onGetProductById = ( productId: string ): Product | null => {
        if ( !products?.length ) return null
        const product = products.find( pro => pro.id === productId )
        if ( !product ) return null
        return product
    }

    const onGetAllProducts = () => {
        dispatch(startGettingAllProductsFull())
    }

    const onSetFilterProductsByName = (productName: string | null) => {
        dispatch(setProductNameFilter({ productName }))
        dispatch(setPage(1))
        applyProductFilters(1, pagination.itemsPerPage, { productName })
    }
    
    const onSetFilterProductsByStatus = (status: string | null) => {
        dispatch(setProductStatusFilter({ status }))
        dispatch(setPage(1))
        applyProductFilters(1, pagination.itemsPerPage, { status })
    }

    const onSetFilterProductsByCategory = ( category: FilterProductByItem) => {
        dispatch(setProductCategoryFilter({ category }))
        dispatch(setPage(1))
        applyProductFilters(1, pagination.itemsPerPage, { category })
    }

    const onSetFilterProductsBySupplier = (supplier: FilterProductByItem) => {
        dispatch(setProductSupplierFilter({ supplier }))
        dispatch(setPage(1))
        applyProductFilters(1, pagination.itemsPerPage, { supplier })
    }

    const onSetFilterProductsByPrice = (minPrice: number | null, maxPrice: number | null ) => {
        dispatch(setProductPricesFilter({ price: { minPrice, maxPrice }}))
        dispatch(setPage(1))
        applyProductFilters(1, pagination.itemsPerPage, { price: { minPrice, maxPrice }})
    }

    const onResetFilter = () => {
        dispatch(resetFilter())
        dispatch(setPage(1))
        onGetProducts()
    }

    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))
        applyProductFilters(page, pagination.itemsPerPage)
    }

    const onCreateProduct = ( data: CreateProduct ) => {
        dispatch( startCreatingProduct(data) )
    }

    const onSelectProduct = (id: string) => {
        const product =
            products?.find(p => p.id === id) ||
            productsLowStock.find(p => p.id === id) ||
            productWarningStock.find(p => p.id === id) ||
            productNormalStock.find(p => p.id === id)

        if (!product) return
        dispatch(setSelectedProduct(product))
    }

    const onChangeProductStatus = (productId: string, status: boolean) => {
        dispatch(startChangingProductStatus(productId, status))
    }

    const onUploadProductImage = (productId: string, files: FormData) => {
        dispatch(startUploadingProductImage(productId, files))
    }

    const onChangePaginationVisibility = (isVisible: boolean) => {
        dispatch(setPaginationVisible(isVisible))
    }

    const onUpdateProduct = ( productId: string, productData: EditProduct ) => {
        dispatch(startUpdatingProduct(productId, productData))
    }

    const onOrderAlpha = ( ordered: boolean ) => {
        dispatch(setOrderedAsc(ordered))
        onSortProducts()
    }

    const onSortProducts = () => {
        const sortedProducts = [...products!].sort((a, b) => {
            const productNameA = a.name.toLowerCase()
            const productNameB = b.name.toLowerCase()

            if ( isOrderedAsc ) {
                return productNameA.localeCompare(productNameB)
            } else {
                return productNameB.localeCompare(productNameA)
            }
        })
        dispatch(setProducts(sortedProducts))
    }

    return {
        allProducts,
        filter,
        isLoading,
        isOrderedAsc,
        isPaginationVisible,
        pagination,
        productNormalStock,
        products,
        productSelected,
        productsLowStock,
        productsMinimal,
        productWarningStock,
        productsNoStock,

        onChangePaginationVisibility,
        onChangeProductStatus,
        onCreateProduct,
        onGetAllProducts,
        onGetMinimalProducts,
        onGetProductById,
        onGetProducts,
        onGetProductsNoStock,
        onGetProductsByStock,
        onOrderAlpha,
        onResetFilter,
        onSelectProduct,
        onSetFilterProductsByCategory,
        onSetFilterProductsByName,
        onSetFilterProductsByPrice,
        onSetFilterProductsByStatus,
        onSetFilterProductsBySupplier,
        onSetPage,
        onUpdateProduct,
        onUploadProductImage,
    }

}