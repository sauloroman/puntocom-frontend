import type { Dispatch } from "@reduxjs/toolkit"
import { setIsLoading, setProducts, setProductsMetaPagination } from "./pos.slice"
import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import { type GetProductsResponse } from "../../interfaces/product.interface"
import type { Pagination } from "../../interfaces/pagination.interface"
import { productsValidToSale } from "../../shared/helpers/products-valid-to-sale"

const urlProducts = '/api/product'

export const startGettingProductsToSale = (pagination: Pagination) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { page, limit } = pagination
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}?page=${page}&limit=${limit}&sort=productName:desc`)
            const { meta, products } = data
            const productsToSale = productsValidToSale(products)

            dispatch(setProducts(productsToSale))
            dispatch(setProductsMetaPagination({...meta, total: productsToSale.length, itemsPerPage: 50 }))

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startSearchingProducts = (productSearched: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}/search?page=1&limit=50&sort=productCreatedAt:desc&filter={"productName": "${productSearched}"}`)
            const { meta, products } = data
            const productsToSale = productsValidToSale(products)

            dispatch(setProducts(productsToSale))
            dispatch(setProductsMetaPagination({...meta, total: productsToSale.length, itemsPerPage: 50 }))

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringProductsByCategory = (pagination: Pagination, categoryId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { limit, page } = pagination

            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`${urlProducts}?page=${page}&limit=${limit}&sort=productCreatedAt:asc&filter={"productCategory": "${categoryId}"}`)

            const { meta, products } = data
            const productsToSale = productsValidToSale(products)

            dispatch(setProducts(productsToSale))
            dispatch(setProductsMetaPagination({...meta, total: productsToSale.length, itemsPerPage: 50 }))

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}