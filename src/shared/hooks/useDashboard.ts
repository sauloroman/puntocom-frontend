import type { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { 
    startGettingKpisStats, 
    startGettingProductsStats, 
    startGettingPurchasesStats, 
    startGettingSalesStats 
} from "../../store/dashboard/dashboard.thunk"

export const useDashboard = () => {

    const dispatch = useDispatch<any>()

    const { 
        isLoading, 
        stats 
    } = useSelector( (state: RootState) => state.dashboard )

    const getSalesStats = () => {
        dispatch(startGettingSalesStats())
    }

    const getPurchasesStats = () => {
        dispatch(startGettingPurchasesStats())
    }

    const getKpisStats = () => {
        dispatch(startGettingKpisStats())
    }

    const getProductsStats = () => {
        dispatch(startGettingProductsStats())
    }

    return {
        // Atributes
        isLoading,
        stats,

        // Methods
        getSalesStats,
        getPurchasesStats,
        getKpisStats,
        getProductsStats
    }

}