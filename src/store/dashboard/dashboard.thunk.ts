import type { Dispatch } from "@reduxjs/toolkit"
import { setDashboardStats, setIsLoading } from "./dashboard.slice"
import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { puntocomApiPrivate } from "../../config/api"
import { type StatsResponse } from "../../interfaces/dto/dashboard.interface"

const urlDashboard = '/api/dashboard-stats'

export const startGettingDashboardStats = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.get<StatsResponse>(`${urlDashboard}/stats`)
            const { stats } = data
            dispatch(setDashboardStats(stats))
        } catch(error) {
            dispatch(showAlert({
                title: "⚠️ Error estadísticas",
                text: 'No se pudieron obtener las estadísticas',
                type: AlertType.error,
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}