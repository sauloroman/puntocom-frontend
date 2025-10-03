import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { CreateProduct, EditProduct } from "../../interfaces/product.interface"
import { startChangingProductStatus, startCreatingProduct, startFilteringProductsByCategory, startFilteringProductsByStatus, startGettingProducts, startSearchingProducts, startUpdatingProduct, startUploadingProductImage } from "../../store/products/products.thunk"
import { setCategoryFilter, setOrderedAsc, setPage, setPaginationVisible, setProducts, setSelectedProduct, setStatusFilter } from "../../store/products/products.slice"

export const useProducts = () => {

    const dispatch = useDispatch<any>()
    const {
        isOrderedAsc, 
        isLoading, 
        isPaginationVisible,
        products, 
        pagination, 
        productSelected, 
        filter 
    } = useSelector( (state: RootState) => state.products )

    const filterProductsByStatus = (status: boolean) => {
        dispatch(setStatusFilter({ status, isVisible: true }))
        dispatch(startFilteringProductsByStatus({
            page: 1,
            limit: pagination.itemsPerPage
        }, status))
    }

    const filterProductsByCategory = (categoryId: string, categoryName: string) => {
         dispatch(setCategoryFilter({id: categoryId, name: categoryName, isVisible: true}))
        dispatch(startFilteringProductsByCategory({
            page: 1,
            limit: pagination.itemsPerPage
        }, categoryId))
    }

    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))

        if ( filter.status !== null ) {
            dispatch(startFilteringProductsByStatus({
                page: 1,
                limit: pagination.itemsPerPage
            }, filter.status))
        } else if ( filter.category.id !== null ) {
            dispatch(startFilteringProductsByCategory({
                page: 1,
                limit: pagination.itemsPerPage,
            }, filter.category.id ))
        } else {
            dispatch(startGettingProducts({
                page,
                limit: pagination.itemsPerPage
            }))
        }
    }

    const getProducts = () => {
        dispatch(startGettingProducts({
            page: 1,
            limit: pagination.itemsPerPage
        }))        
    }

    const onCreateProduct = ( data: CreateProduct ) => {
        dispatch( startCreatingProduct(data) )
    }

    const onSelectProduct = ( id: string ) => {
        const product = products?.find( product => product.id === id )
        if ( product) dispatch( setSelectedProduct(product) )
    } 

    const onChangeProductStatus = (productId: string, status: boolean) => {
        dispatch(startChangingProductStatus(productId, status))
    }

    const onUploadProductImage = (productId: string, files: FormData) => {
        dispatch(startUploadingProductImage(productId, files))
    }

    const onSearchProduct = ( productSearched: string ) => {
        dispatch(startSearchingProducts(productSearched))
    }

    const onSetFilterStatus = (status: boolean | null, isVisible: boolean) => {
        dispatch(setStatusFilter({ status, isVisible }))
    }

    const onSetFilterCategory = (id: string | null, name: string | null, isVisible: boolean) => {
        dispatch(setCategoryFilter({ id, name, isVisible }))
    }

    const onChangePaginationVisibility = (isVisible: boolean) => {
        dispatch(setPaginationVisible(isVisible))
    }

    const onUpdateProduct = ( productId: string, productData: EditProduct ) => {
        dispatch(startUpdatingProduct(productId, productData))
    }

    const onOrderAlpha = ( ordered: boolean ) => {
        dispatch(setOrderedAsc(ordered))
        sortProducts()
    }

    const sortProducts = () => {
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
        isLoading,
        isPaginationVisible,
        products,
        pagination,
        productSelected,
        filter,
        isOrderedAsc,

        onSetPage,
        getProducts,
        onSelectProduct,
        onCreateProduct,
        onUpdateProduct,
        onChangeProductStatus,
        onUploadProductImage,
        onSearchProduct,
        onSetFilterStatus,
        onSetFilterCategory,
        onChangePaginationVisibility,
        filterProductsByStatus,
        filterProductsByCategory,
        onOrderAlpha,
    }

}