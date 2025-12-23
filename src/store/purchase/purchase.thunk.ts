import type { Dispatch } from "@reduxjs/toolkit";
import type { SavePurchase, SavePurchaseResponse } from "../../interfaces/purchase.interface";
import { addPurchase, clearProductsInPurchase, setIsLoading } from "./purchase.slice";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";

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