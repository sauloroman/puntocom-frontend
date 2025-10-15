import { clearCart, updateProduct } from "../pos/pos.slice";
import { ModalNames } from "../../interfaces/ui/modal.interface";
import { openModal } from "../modal/modal.slice";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import { setIsLoading, setSaleCreated } from "./sale.slice";
import { type SaveSaleResponse, type SaveSale } from "../../interfaces/sale.interface";
import type { Dispatch } from "@reduxjs/toolkit";

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
            }

        } catch(error) {
            console.log(error)
        } finally {
            dispatch( setIsLoading( false ) )
        }
    }
}