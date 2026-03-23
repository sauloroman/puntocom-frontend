import type { Dispatch } from "@reduxjs/toolkit"
import type { 
    CreateProductResponse, 
    CreateProduct, 
    GetProductsResponse, 
    ChangeProductStatusResponse, 
    UploadProductImageResponse, 
    EditProduct,
    EditProductResponse,
    ProductsByStock,
    GetProductsMinimal,
    GetAllProducts
} from "../../interfaces/dto/product.interface"
import { 
    addProducts, 
    setAllProducts, 
    setIsLoading, 
    setProducts, 
    setProductsLowStock, 
    setProductsMetaPagination, 
    setProductsMinimal, 
    setProductsNormalStock, 
    setProductsWarningStock, 
    setSelectedProduct, 
    updateProduct } from "./products.slice"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import type { Pagination } from "../../interfaces/dto/pagination.interface"
import { handleError } from "../../config/api/handle-error"
import type { RootState } from "../store"
import type { FilterProductByItem, PriceRange } from "../../interfaces/ui/filter.interface"
import { addProductToBeInPurchase, updateProductToBeInPurchase } from "../purchase/purchase.slice"

const urlProducts = '/api/product'

export const startGettingAllProducts = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            
            const { data } = await puntocomApiPrivate.get<GetProductsMinimal>(`${urlProducts}/minimal`)
            const { products } = data

            dispatch(setProductsMinimal(products))
        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error productos",
                text: 'No se pudieron obtener todos los productos',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingAllProductsFull = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<GetAllProducts>(urlProducts)
            const { products } = data

            dispatch(setAllProducts(products))
        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error productos",
                text: 'No se pudieron obtener los productos',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringProducts = (
    status?: string,
    productName?: string,
    category?: FilterProductByItem,
    supplier?: FilterProductByItem,
    prices?: PriceRange,
    pagination?: Pagination
) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {
            const { pagination: {itemsPerPage}} = getState().products

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? itemsPerPage.toString()
            }

            if ( status ) {
                params['status'] = status === 'Activo' ? 1 : 0
            }

            if ( productName ) {
                params['product'] = productName.trim()
            }
            
            if ( category?.id ) {
                params['category'] = category.id
            }

            if ( supplier?.id ) {
                params['supplier'] = supplier.id
            }

            if ( prices?.minPrice !== undefined && prices?.maxPrice !== undefined ) {
                params['minPrice'] = prices?.minPrice?.toString() 
                params['maxPrice'] = prices?.maxPrice?.toString() 
            }

            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}/filter`, { params })
            const { meta, products } = data
            const { filter, ...restMetaPagination } = meta

            dispatch(setProducts(products))
            dispatch(setProductsMetaPagination({ ...restMetaPagination, itemsPerPage }))

        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error productos",
                text: 'No se pudieron obtener los productos filtrados',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingProductsByStock = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const [ {data: dataLowProducts}, {data: dataWarningProducts}, {data: dataNormalProducts} ] = await Promise.all([
                await puntocomApiPrivate.get(`${urlProducts}/stock/low`),
                await puntocomApiPrivate.get(`${urlProducts}/stock/warning`),
                await puntocomApiPrivate.get(`${urlProducts}/stock/normal`)
            ])

            const { products: productsLowStock } = dataLowProducts as ProductsByStock
            const { products: productsWarningStock } = dataWarningProducts as ProductsByStock
            const { products: productsNormalStock } = dataNormalProducts as ProductsByStock

            dispatch(setProductsLowStock(productsLowStock))
            dispatch(setProductsWarningStock(productsWarningStock))
            dispatch(setProductsNormalStock(productsNormalStock))

        } catch( error ) {
            const errorMessage = handleError(error)
            dispatch(showAlert({
                title: "⚠️ Error productos",
                text: errorMessage,
                type: AlertType.error,
            }))
        } finally {   
            dispatch(setIsLoading(false))
        }
    }
}

export const startCreatingProduct = (productData: CreateProduct) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.post<CreateProductResponse>(urlProducts, productData)
            const { product } = data

            dispatch(addProducts(product))
            dispatch(addProductToBeInPurchase(product))

            dispatch(showAlert({
                title: 'Creación de Producto',
                text: `Producto: ${productData.name}`,
                type: AlertType.success
            }))

        } catch (error) {
            const errorMessage = handleError(error)
            dispatch(showAlert({
                title: "⚠️ Error producto",
                text: errorMessage,
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startChangingProductStatus = ( productId: string, status: boolean ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            
            const { data } = await puntocomApiPrivate.patch<ChangeProductStatusResponse>(`${urlProducts}/${status ? 'activate' : 'deactivate'}/${productId}`)

            const { message, product } = data

            dispatch(updateProduct({ productId, product }))
            dispatch(setSelectedProduct(product))
            dispatch(showAlert({
                title: 'Cambio de estado',
                text: message,
                type: AlertType.success
            }))

        } catch(error) {
            dispatch(
                showAlert({
                    title: `⚠️ Error cambio estado producto`,
                    text: `No se pudo ${status ? 'activar' : 'desactivar'} el producto`,
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startUploadingProductImage = (productId: string, files: FormData) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const url = `${urlProducts}/upload-image/${productId}`
            const { data } = await puntocomApiPrivate.patch<UploadProductImageResponse>(url, files, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            const { message, product } = data

            dispatch(updateProduct({productId, product}))
            dispatch(updateProductToBeInPurchase({ productId, product }))
            dispatch(setSelectedProduct(product))
            dispatch(showAlert({
                title: 'Imagen Subida',
                text: message,
                type: AlertType.success
            }))

        } catch(error) {
            dispatch(showAlert({
                title: '⚠️ Error imagen producto',
                text: 'No se pudo subir la imagen',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startUpdatingProduct = ( productId: string, productData: EditProduct ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) ) 
        try {
            
            const url = `${urlProducts}/${productId}`
            const {data} = await puntocomApiPrivate.put<EditProductResponse>(url, productData)
            const { product, message } = data

            dispatch(updateProduct({ productId, product }))
            dispatch(setSelectedProduct(product))
            dispatch(showAlert({
                title: product.name,
                text: message,
                type: AlertType.success
            }))

        } catch(error) {
            const errorMessage = handleError(error)
            dispatch(showAlert({
                title: '⚠️ No se pudo actualizar el producto',
                text: errorMessage,
                type: AlertType.error
            }))  
        } finally {
            dispatch( setIsLoading( false ) ) 
        }
    }
}