import { clearCart, updateProduct } from "../pos/pos.slice";
import { ModalNames } from "../../interfaces/ui/modal.interface";
import { openModal } from "../modal/modal.slice";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import { addSale, setIsLoading, setSaleCreated, setSales, setSalesMetaPagination } from "./sale.slice";
import type { 
    SaveSaleResponse, 
    SaveSale, 
    GetAllSalesResponse, 
    PriceRange 
} from "../../interfaces/sale.interface";
import type { Dispatch } from "@reduxjs/toolkit";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import type { Pagination } from "../../interfaces/pagination.interface";

const urlSale = '/api/sale'

export const startSavingSale = ( saveSale: SaveSale ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            
            const { data } = await puntocomApiPrivate.post<SaveSaleResponse>(`${urlSale}`, saveSale )
            const { sale, ok } = data
            
            if ( ok ) {
                for( const product of saveSale.details ) {
                    dispatch( updateProduct({ productId: product.productId, quantityDiscount: product.quantity }))
                }
                dispatch(openModal(ModalNames.saveSale))
                dispatch(clearCart())
                dispatch(setSaleCreated(sale))
                dispatch(addSale(sale))
            }

        } catch(error) {
            console.log(error)
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startGettingSalesByUser = ( userId: string, pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { page, limit } = pagination
            const { data } = await puntocomApiPrivate.get<GetAllSalesResponse>(`${urlSale}/user/${userId}?page=${page}&limit=${limit}&sort=saleDate:desc`)
            const { meta, sales } = data

            dispatch(setSales(sales))
            dispatch(setSalesMetaPagination({...meta, itemsPerPage: limit}))
        } catch( error ) {
            console.log(error)
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: 'No se pudieron obtener las ventas del usuario',
                type: AlertType.error
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startFilteringSalesByRangePrice = ( ranges: PriceRange, pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { page, limit } = pagination
            const { maxPrice, minPrice } = ranges

            const { data } = await puntocomApiPrivate.get<GetAllSalesResponse>(
                `${urlSale}/price?page=${page}&limit=${limit}&priceMin=${minPrice}&priceMax=${maxPrice}`
            )
            const { sales, meta } = data

            dispatch(setSales(sales))
            dispatch(setSalesMetaPagination({...meta, itemsPerPage: pagination.limit }))

        } catch(error) {
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: 'No se pudieron obtener las ventas por precio',
                type: AlertType.error
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startGettingAllSales = ( pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { page, limit } = pagination
            const { data } = await puntocomApiPrivate.get<GetAllSalesResponse>(`${urlSale}?page=${page}&limit=${limit}&sort=saleDate:desc`)
            const { meta, sales } = data

            dispatch(setSales(sales))
            dispatch(setSalesMetaPagination({ ...meta, itemsPerPage: limit }))
        } catch(error) {
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: 'No se pudieron obtener las ventas',
                type: AlertType.error
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}