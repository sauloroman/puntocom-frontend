import { clearCart, updateProductStockInPOS } from "../pos/pos.slice";
import { ModalNames } from "../../interfaces/ui/modal.interface";
import { openModal } from "../modal/modal.slice";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import { addSale, setIsLoading, setSaleCreated, setSales, setSalesMetaPagination, setSaleToPrint } from "./sale.slice";
import type { 
    SaveSaleResponse, 
    SaveSale,    
    GetFilteredSalesResponse,
    GetSale
} from "../../interfaces/dto/sale.interface";
import type { Dispatch } from "@reduxjs/toolkit";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import type { Pagination } from "../../interfaces/dto/pagination.interface";
import type { DateRange, PriceRange } from "../../interfaces/ui/filter.interface";
import type { RootState } from "../store";
import { updateProduct, updateProductStockInWarehouse } from "../products/products.slice";
import type { ChangeProductStatusResponse } from "../../interfaces/dto/product.interface";
import { updateProductToBeInPurchase } from "../purchase/purchase.slice";
import { handleError } from "../../config/api";

const urlSale = '/api/sale'

export const startSavingSale = ( saveSale: SaveSale ) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { data } = await puntocomApiPrivate.post<SaveSaleResponse>(urlSale, saveSale)
            const { sale, ok } = data
            let stockIsOver = false

            if ( ok ) {

                for( const product of saveSale.details ) {
                    dispatch( updateProductStockInPOS({ 
                        productId: product.productId, 
                        quantityDiscount: product.quantity 
                    }))

                    dispatch( updateProductStockInWarehouse({
                        productId: product.productId,
                        quantityDiscount: product.quantity
                    }))

                    const { allProducts: productsInWarehouse } = getState().products
                    const productInWarehouse = productsInWarehouse?.find( p => p.id === product.productId )

                    if ( productInWarehouse && productInWarehouse.stock <= 0 ) {
                        stockIsOver = true
                        const urlToDeactivate = `/api/product/deactivate/${productInWarehouse.id}`
                        const { data } = await puntocomApiPrivate.patch<ChangeProductStatusResponse>(urlToDeactivate)
                        const { product } = data

                        dispatch(updateProduct({ productId: productInWarehouse.id, product }))
                        dispatch(updateProductToBeInPurchase({ productId: productInWarehouse.id, product }))
                    }
                }
                
                dispatch(clearCart())
                dispatch(setSaleCreated(sale))
                dispatch(addSale(sale))

                if ( stockIsOver ) {
                    dispatch(openModal(ModalNames.noStock))
                } else {
                    dispatch(openModal(ModalNames.saveSale))
                }
            }

        } catch(error) {
            const errorMessage = handleError(error)
            dispatch(showAlert({
                title: 'Error Ventas 🗒️',
                text: `Error al guardar la venta. ${errorMessage}`,
                type: AlertType.error
            }))
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}

export const startFilteringSales = ( 
    userId?: string,
    prices?: PriceRange, 
    dates?: DateRange, 
    pagination?: Pagination 
) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch( setIsLoading( true ) )
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

            if ( userId) {
                params['user'] = userId
            }

            const { data } = await puntocomApiPrivate.get<GetFilteredSalesResponse>(`${urlSale}/filter`, { params })
            const { sales, meta } = data
            const { filter, ...restMetaPagination } = meta

            dispatch(setSales(sales))
            dispatch(setSalesMetaPagination({ ...restMetaPagination, itemsPerPage }))

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