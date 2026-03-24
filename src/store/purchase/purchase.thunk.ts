import type { Dispatch } from "@reduxjs/toolkit";
import type { GetFilteredPurchases, SavePurchase, SavePurchaseResponse } from "../../interfaces/dto/purchase.interface";
import { addPurchase, clearProductsInPurchase, setIsLoading, setProducts, setProductsMetaPagination, setPurchases, setPurchasesMetaPagination, setSupplierSelected, updateProductStock } from "./purchase.slice";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import type { Pagination } from "../../interfaces/dto/pagination.interface";
import type { GetProductsResponse } from "../../interfaces/dto/product.interface";
import type { DateRange, PriceRange } from "../../interfaces/ui/filter.interface";
import type { RootState } from "../store";
import { handleError } from "../../config/api";

const urlPurchases = '/api/purchase'

export const startSavingPurchase = (savePurchase: SavePurchase) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.post<SavePurchaseResponse>(urlPurchases, savePurchase)
            const { ok, purchase } = data

            if ( ok ) {
                for ( const product of savePurchase.details ) {
                    dispatch(updateProductStock(product))
                }

                dispatch(addPurchase(purchase))
                dispatch(clearProductsInPurchase())
                dispatch(setSupplierSelected(null))
                dispatch(showAlert({
                    title: 'Compras 🗒️',
                    text: 'Compra guardada exitosamente',
                    type: AlertType.success
                }))
            }

        } catch (error) {
            const errorMessage = handleError(error)
            dispatch(showAlert({
                title: 'Error Compras 🗒️',
                text: errorMessage,
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
            
            const { data } = await puntocomApiPrivate.get<GetProductsResponse>(`/api/product/filter?page=${page}&limit=${limit}`)

            const { meta, products } = data

            dispatch(setProducts(products))
            dispatch(setProductsMetaPagination({...meta, itemsPerPage: 20}))
        } catch(error) {
            dispatch(showAlert({
                title: 'Error Compras 🗒️',
                text: 'No se pudo obtener los productos para registrar compra',
                type: AlertType.error
            }))
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
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {   
            
            const { pagination: { itemsPerPage }} = getState().sale

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? itemsPerPage,
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
            dispatch(setPurchasesMetaPagination({ ...restMetaPagination, itemsPerPage }))
            
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