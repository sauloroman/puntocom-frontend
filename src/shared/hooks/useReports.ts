import { useDispatch, useSelector } from "react-redux"
import { startGeneratingReport } from "../../store/reports/reports.thunk"
import type { RootState } from "../../store"

export const useReports = () => {

    const dispatch = useDispatch<any>()
    const { products, users, suppliers, isLoading } = useSelector( (state: RootState) => state.reports )

    const createPdfList = (type: 'users' | 'suppliers' | 'products') => {
        dispatch(startGeneratingReport(type))
    }

    return {
        isLoading,
        reportProducts: products,
        reportUsers: users,
        reportSuppliers: suppliers,

        createPdfList
    }

}