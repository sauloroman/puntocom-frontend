import type { Dispatch } from "@reduxjs/toolkit";
import type { GetAllPurchases, GetFilteredPurchases, SavePurchase, SavePurchaseResponse } from "../../interfaces/purchase.interface";
import { addPurchase, clearProductsInPurchase, setIsLoading, setProducts, setProductsMetaPagination, setPurchases, setPurchasesMetaPagination, updateProduct } from "./purchase.slice";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import type { Pagination } from "../../interfaces/pagination.interface";
import type { GetProductsResponse } from "../../interfaces/product.interface";
import type { DateRange, PriceRange } from "../../interfaces/ui/filter.interface";

const urlPurchases = '/api/purchase'

export const startGettingAllPurchases = ( pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { page, limit } = pagination
            const url = `${urlPurchases}?page=${page}&limit=${limit}&sort=purchaseDate:desc`
            const { data } = await puntocomApiPrivate.get<GetAllPurchases>(url)
            const { purchases, meta } = data

            dispatch(setPurchases(purchases))
            dispatch(setPurchasesMetaPagination({ ...meta, itemsPerPage: limit }))
        } catch(error) {
            dispatch(showAlert({
                title: 'Error Compras 🗒️',
                text: 'No se pudo obtener la compras',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startSavingPurchase = (savePurchase: SavePurchase) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.post<SavePurchaseResponse>(urlPurchases, savePurchase)
            const { ok, purchase } = data

            if ( ok ) {

                for ( const product of savePurchase.details ) {
                    dispatch(updateProduct(product))
                }

                dispatch(addPurchase(purchase))
                dispatch(clearProductsInPurchase())
                dispatch(showAlert({
                    title: 'Compras 🗒️',
                    text: 'Compra guardada exitosamente',
                    type: AlertType.success
                }))
            }

        } catch (error) {
            dispatch(showAlert({
                title: 'Error Compras 🗒️',
                text: 'No se pudo guardar la compra',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingProductsToBeInPurchase = ( pagination: Pagination) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { limit, page } = pagination
            
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`/api/product?page=${page}&limit=${limit}&filter={"productStatus": true}`)

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

export const startFilteringPurchases = ( 
    userId?: string, 
    supplierId?: string,
    prices?: PriceRange,
    dates?: DateRange,
    pagination?: Pagination,
) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {   
            
            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? '10',
                sort: 'purchaseDate:desc'
            }

            if ( prices?.minPrice !== undefined && prices?.maxPrice !== undefined ) {
                params['minPrice'] = prices?.minPrice?.toString() 
                params['maxPrice'] = prices?.maxPrice?.toString() 
            }

            if ( dates?.dateStart && dates?.dateEnd ) {
                params['dateFrom'] = dates.dateStart
                params['dateTo'] = dates.dateEnd
            }

            if ( userId ) {
                params['user'] = userId
            }

            if ( supplierId ) {
                params['supplier'] = supplierId
            } 

            const { data } = await puntocomApiPrivate.get<GetFilteredPurchases>(`${urlPurchases}/filter`, { params })
            const { purchases, meta } = data

            const { filter, ...restMetaPagination } = meta

            dispatch(setPurchases(purchases))
            dispatch(setPurchasesMetaPagination({ ...restMetaPagination, itemsPerPage: pagination?.limit ?? 10 }))
            
        } catch( error ) {
            dispatch(showAlert({
                title: 'Error Compras 🗒️',
                text: 'No se pudieron filtrar las compras',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}