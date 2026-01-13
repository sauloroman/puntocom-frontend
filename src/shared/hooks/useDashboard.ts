import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { startGettingDashboardStats } from "../../store/dashboard/dashboard.thunk"

export const useDashboard = () => {

    const dispatch = useDispatch<any>()

    const { 
        isLoading, 
        stats 
    } = useSelector( (state: RootState) => state.dashboard )

    const getStats = () => {
        dispatch(startGettingDashboardStats())
    }

    return {
        // Atributes
        isLoading,
        stats,

        // Methods
        getStats,
    }

}