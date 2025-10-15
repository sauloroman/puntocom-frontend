import { useDispatch, useSelector } from "react-redux"
import { startGeneratingReport, startGettingAllReports } from "../../store/reports/reports.thunk"
import type { RootState } from "../../store"

export const useReports = () => {

    const dispatch = useDispatch<any>()
    const { products, users, suppliers, isLoading, allReports } = useSelector( (state: RootState) => state.reports )

    const createPdfList = (type: 'users' | 'suppliers' | 'products') => {
        dispatch(startGeneratingReport(type))
    }

    const getAllReports = () => {
        dispatch(startGettingAllReports())
    }

    return {
        isLoading,
        reportProducts: products,
        reportUsers: users,
        reportSuppliers: suppliers,
        allReports,

        createPdfList,
        getAllReports,
    }

}