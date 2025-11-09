import type { Dispatch } from "@reduxjs/toolkit";
import type { SaveInventoryAdjustment, SaveInventoryAdjustmentResponse } from "../../interfaces/inventory-adjustment.interface";
import { setIsLoading } from "./inventory-adjustment.slice";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";

const urlInventoryAdjustment = '/api/inventory-adjustment'

export const startSavingInventoryAdjustment = ( adjustment: SaveInventoryAdjustment ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            await puntocomApiPrivate.post<SaveInventoryAdjustmentResponse>(
                urlInventoryAdjustment, 
                adjustment
            )

            dispatch(showAlert({
                title: 'Ajuste de inventario',
                text: 'Ajuste guardado exitosamente',
                type: AlertType.success
            }))

        } catch( error ) {
            dispatch(showAlert({
                title: 'Ajuste de inventario',
                text: 'No se pudo realizar el ajuste de inventario',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}