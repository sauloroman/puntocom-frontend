import { clearCart, updateProduct } from "../pos/pos.slice";
import { ModalNames } from "../../interfaces/ui/modal.interface";
import { openModal } from "../modal/modal.slice";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import { addSale, setIsLoading, setSaleCreated, setSales, setSalesMetaPagination, setSaleToPrint } from "./sale.slice";
import type { 
    SaveSaleResponse, 
    SaveSale, 
    GetAllSalesResponse, 
    PriceRange, 
    DateRange,
    GetFilteredSalesResponse,
    GetSale
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
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: 'No se pudo guardar la venta',
                type: AlertType.error
            }))
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

export const startGettingFilteredSales = ( prices?: PriceRange, dates?: DateRange, pagination?: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? '10',
                sort: 'saleDate:desc'
            }

            if ( prices?.minPrice !== undefined && prices?.maxPrice !== undefined ) {
                params['priceMin'] = prices?.minPrice.toString() 
                params['priceMax'] = prices?.maxPrice.toString() 
            }

            if ( dates?.dateFrom && dates?.dateTo ) {
                params['dateFrom'] = dates.dateFrom
                params['dateTo'] = dates.dateTo
            }

            console.log({ params })

            const { data } = await puntocomApiPrivate.get<GetFilteredSalesResponse>(`${urlSale}/filter`, { params })
            const { sales, meta } = data
            const { filter, ...restMetaPagination } = meta

            dispatch(setSales(sales))
            dispatch(setSalesMetaPagination({ ...restMetaPagination, itemsPerPage: pagination?.limit ?? 15 }))

        } catch( error ) {
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: 'No se pudieron filtrar las ventas',
                type: AlertType.error
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startGettingFilteredSalesByUser = ( userId: string, prices?: PriceRange, dates?: DateRange, pagination?: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? '10',
                sort: 'saleDate:desc'
            }

            if ( prices?.minPrice !== undefined && prices?.maxPrice !== undefined ) {
                params['priceMin'] = prices?.minPrice.toString() 
                params['priceMax'] = prices?.maxPrice.toString() 
            }

            if ( dates?.dateFrom && dates?.dateTo ) {
                params['dateFrom'] = dates.dateFrom
                params['dateTo'] = dates.dateTo
            }

            const { data } = await puntocomApiPrivate.get<GetFilteredSalesResponse>(`${urlSale}/filter/user/${userId}`, { params })
            const { sales, meta } = data
            const { filter, ...restMetaPagination } = meta

            dispatch(setSales(sales))
            dispatch(setSalesMetaPagination({ ...restMetaPagination, itemsPerPage: pagination?.limit ?? 15 }))

        } catch( error ) {
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: 'No se pudieron filtrar las ventas',
                type: AlertType.error
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startGettingSaleById = ( saleId: string ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<GetSale>(`${urlSale}/${saleId}`)
            const { sale } = data
            dispatch(setSaleToPrint(sale))
        } catch( error ) {
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: 'No se pudo obtener la venta por id',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}