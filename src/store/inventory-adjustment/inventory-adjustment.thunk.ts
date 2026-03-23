import type { Dispatch } from "@reduxjs/toolkit";
import type { GetInventoryAdjustments, SaveInventoryAdjustment, SaveInventoryAdjustmentResponse } from "../../interfaces/dto/inventory-adjustment.interface";
import { addInventoryAdjustment, setAdjustmentsMetaPagination, setInventoryAdjustments, setIsLoading } from "./inventory-adjustment.slice";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import type { Pagination } from "../../interfaces/dto/pagination.interface";
import { handleError } from "../../config/api/handle-error";
import type { RootState } from "../store";

const urlInventoryAdjustment = '/api/inventory-adjustment'

export const startSavingInventoryAdjustment = ( adjustment: SaveInventoryAdjustment ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.post<SaveInventoryAdjustmentResponse>(
                urlInventoryAdjustment, 
                adjustment
            )
            const { adjustmentSaved, message } = data

            dispatch(addInventoryAdjustment(adjustmentSaved))
            dispatch(showAlert({
                title: 'Ajuste de inventario',
                text: message,
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

export const startFilteringInventoryAdjustments = ( 
    adjustmentType?: string, 
    user?: string, 
    pagination?: Pagination, 
) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {
            const { pagination: {itemsPerPage}} = getState().inventoryAdjustment

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? itemsPerPage.toString()
            }

            if ( adjustmentType ) {
                params['adjustmentType'] = adjustmentType
            }

            if ( user ) {
                params['userId'] = user
            }

            const { data } = await puntocomApiPrivate.get<GetInventoryAdjustments>(`${urlInventoryAdjustment}/filter`, { params })
            const { adjustments, meta } = data
            const { filter, ...resetPagination } = meta
            
            dispatch(setInventoryAdjustments(adjustments))
            dispatch(setAdjustmentsMetaPagination({...resetPagination, itemsPerPage }))
        } catch(error) {
            const errorMessage = handleError(error)
            console.log(errorMessage)
            dispatch(showAlert({
                title: 'Ajuste de inventario',
                text: 'No se pudo filtrar los ajustes de almacén',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}