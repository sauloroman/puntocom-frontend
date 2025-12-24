import type { Dispatch } from "@reduxjs/toolkit";
import type { SavePurchase, SavePurchaseResponse } from "../../interfaces/purchase.interface";
import { addPurchase, clearProductsInPurchase, setIsLoading, setProducts, setProductsMetaPagination } from "./purchase.slice";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import type { Pagination } from "../../interfaces/pagination.interface";
import type { GetProductsResponse } from "../../interfaces/product.interface";

const urlPurchases = '/api/purchase'

export const startSavingPurchase = (savePurchase: SavePurchase) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.post<SavePurchaseResponse>(urlPurchases, savePurchase)
            const { ok, purchase } = data

            if ( ok ) {
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