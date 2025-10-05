import type { Dispatch } from "@reduxjs/toolkit"
import { 
    type CreateProductResponse, 
    type CreateProduct, 
    type GetProductsResponse, 
    type ChangeProductStatusResponse, 
    type UploadProductImageResponse, 
    type EditProduct,
    type EditProductResponse
} from "../../interfaces/product.interface"
import { addProducts, setIsLoading, setProducts, setProductsMetaPagination, setSelectedProduct, updateProduct } from "./products.slice"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import type { Pagination } from "../../interfaces/pagination.interface"
import { handleError } from "../../config/api/handle-error"

const urlProducts = '/api/product'

export const startGettingProducts = ( pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const { page, limit } = pagination

            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}?page=${page}&limit=${limit}&sort=productCreatedAt:desc`)

            const { meta, products } = data

            dispatch(setProducts(products))
            dispatch(setProductsMetaPagination({...meta, itemsPerPage: 20 }))

        } catch(error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringProductsByStatus = ( pagination: Pagination, status: boolean) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { limit, page } = pagination
            
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}?page=${page}&limit=${limit}&sort=productName:asc&filter={"productStatus": ${status}}`)

            const { meta, products } = data

            dispatch(setProducts(products))
            dispatch(setProductsMetaPagination({...meta, itemsPerPage: 20}))

        } catch(error) {
            console.log(error)
        } finally {   
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startFilteringProductsByCategory = (pagination: Pagination, categoryId: string) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { limit, page } = pagination
            
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}?page=${page}&limit=${limit}&sort=productCreatedAt:asc&filter={"productCategory": "${categoryId}"}`)

            const { meta, products } = data

            dispatch(setProducts(products))
            dispatch(setProductsMetaPagination({...meta, itemsPerPage: 20}))

        } catch(error) {
            console.log(error)  
        } finally {   
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startFilteringProductsBySupplier = (pagination: Pagination, supplierId: string) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { limit, page } = pagination
            
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}?page=${page}&limit=${limit}&sort=productCreatedAt:asc&filter={"productSupplier": "${supplierId}"}`)

            const { meta, products } = data

            dispatch(setProducts(products))
            dispatch(setProductsMetaPagination({...meta, itemsPerPage: 20}))

        } catch(error) {
            console.log(error)  
        } finally {   
            dispatch( setIsLoading( false ) )
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

export const startSearchingProducts = ( productSearched: string ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const {data} = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}/search?page=1&limit=20&sort=productCreatedAt:desc&filter={"productName": "${productSearched}"}`)
            const { meta, products } = data
            dispatch( setProducts(products) )
            dispatch(setProductsMetaPagination({...meta, itemsPerPage: 20}))
        } catch(error) {
            console.log(error)
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