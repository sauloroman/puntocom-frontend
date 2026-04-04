import type { Dispatch } from "@reduxjs/toolkit"
import type { KpisStatsResponse, ProductsStatsResponse, PurchasesStatsResponse, SalesStatsResponse } from "../../interfaces/dto/dashboard.interface"
import { setIsLoading, setKpisStats, setProductsStats, setPurchasesStats, setSalesStats } from "./dashboard.slice"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { puntocomApiPrivate } from "../../config/api"

const urlDashboard = '/api/dashboard-stats'

export const startGettingSalesStats = () => {
    return async ( dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<SalesStatsResponse>(`${urlDashboard}/sales`)
            const { stats } = data
            dispatch(setSalesStats({ ...stats }))
        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error estadísticas",
                text: 'No se pudieron obtener las estadísticas de ventas',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingPurchasesStats = () => {
    return async ( dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<PurchasesStatsResponse>(`${urlDashboard}/purchases`)
            const { stats } = data
            dispatch(setPurchasesStats({ ...stats }))
        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error estadísticas",
                text: 'No se pudieron obtener las estadísticas de compras',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingKpisStats = () => {
    return async ( dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<KpisStatsResponse>(`${urlDashboard}/kpis`)
            const { stats } = data
            dispatch(setKpisStats({...stats}))
        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error estadísticas",
                text: 'No se pudieron obtener las estadísticas generales',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingProductsStats = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<ProductsStatsResponse>(`${urlDashboard}/products`)
            const { stats } = data
            dispatch(setProductsStats({ ...stats }))
        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error estadísticas",
                text: 'No se pudieron obtener las estadísticas de productos',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}