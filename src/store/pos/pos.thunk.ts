import type { Dispatch } from "@reduxjs/toolkit"
import { setIsLoading, setProducts, setProductsMetaPagination } from "./pos.slice"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import { type GetProductsResponse } from "../../interfaces/dto/product.interface"
import type { Pagination } from "../../interfaces/dto/pagination.interface"
import { productsValidToSale } from "../../shared/helpers/products-valid-to-sale"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { showAlert } from "../alert/alert.slice"
import type { RootState } from "../store"

const urlProducts = '/api/product'

export const startGettingProductsToSale = (pagination: Pagination) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { page, limit } = pagination
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}/filter?page=${page}&limit=${limit}&status=1`)
            const { meta, products } = data
            const productsToSale = productsValidToSale(products)

            dispatch(setProducts(productsToSale))
            dispatch(setProductsMetaPagination({...meta, total: productsToSale.length, itemsPerPage: 50 }))

        } catch (error) {
            dispatch(showAlert({
                title: "⚠️ Error obtener productos",
                text: 'No se pudieron obtener todos los productos para vender',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringProductsPOS = (
    category?: string,
    productName?: string,
    pagination?: Pagination
) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {
            const { pagination: {itemsPerPage}} = getState().pos

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? itemsPerPage.toString()
            }

            if ( category ) {
                params['category'] = category
            }

            if ( productName ) {
                params['product'] = productName.trim()
            }

            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}/filter`, { params })
            const { meta, products } = data
            const { filter, ...restMetaPagination } = meta
            
            dispatch(setProducts(products))
            dispatch(setProductsMetaPagination({ ...restMetaPagination, itemsPerPage }))

        } catch( error ) {
            dispatch(showAlert({
                title: "⚠️ Error filtrar productos",
                text: 'No se pudieron filtrar los productos',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}