import type { Dispatch } from "@reduxjs/toolkit";
import type { GetInventoryAdjustments, SaveInventoryAdjustment, SaveInventoryAdjustmentResponse } from "../../interfaces/inventory-adjustment.interface";
import { addInventoryAdjustment, setAdjustmentsMetaPagination, setInventoryAdjustments, setIsLoading } from "./inventory-adjustment.slice";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { puntocomApiPrivate } from "../../config/api/puntocom.api";
import type { Pagination } from "../../interfaces/pagination.interface";
import { handleError } from "../../config/api/handle-error";

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

export const startGettingInventoryAdjustments = ( pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { page, limit } = pagination
            const { data } = await puntocomApiPrivate.get<GetInventoryAdjustments>(
                `${urlInventoryAdjustment}?page=${page}&limit=${limit}&sort=inventoryAdjustmentDate:desc`
            )
            const { adjustments, meta } = data

            dispatch(setInventoryAdjustments(adjustments))
            dispatch(setAdjustmentsMetaPagination({ ...meta, itemsPerPage: limit }))
        } catch( error ) {
            dispatch(showAlert({
                title: 'Ajuste de inventario',
                text: 'No se pudo obtener los ajustes de inventario',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringInventoryAdjustmentsByType = ( adjustmentType: string,  pagination: Pagination ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const { page, limit } = pagination

            const url = `${urlInventoryAdjustment}?page=${page}&limit=${limit}&sort=inventoryAdjustmentDate:desc&filter={"inventoryAdjustmentType":"${adjustmentType}"}` 

            const { data } = await puntocomApiPrivate.get<GetInventoryAdjustments>(url)

            const { adjustments, meta } = data

            dispatch(setInventoryAdjustments(adjustments))
            dispatch(setAdjustmentsMetaPagination({...meta, itemsPerPage: limit}))
        } catch(error) {
            const erorrMessage = handleError(error)
            console.log(erorrMessage)
            dispatch(showAlert({
                title: 'Ajuste de inventario',
                text: 'No se pudo filtrar por tipo',
                type: AlertType.error
            }))
        }  finally {
            dispatch(setIsLoading(false))
        }
    }
}