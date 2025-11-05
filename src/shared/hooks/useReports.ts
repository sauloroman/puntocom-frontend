import { useDispatch, useSelector } from "react-redux"
import { startDeletingReport, startGeneratingReport, startGettingAllReports, startGettingReportById } from "../../store/reports/reports.thunk"
import type { RootState } from "../../store"
import { setReportIdSelected, setSelectedReports, type ReportEntities } from "../../store/reports/reports.slice"

export const useReports = () => {

    const dispatch = useDispatch<any>()
    const { 
        products, 
        users, 
        suppliers, 
        isLoading, 
        allReports, 
        selectedReports, 
        reportIdSelected,
        urlReportSelected 
    } = useSelector( (state: RootState) => state.reports )

    const createPdfList = (type: 'users' | 'suppliers' | 'products') => {
        dispatch(startGeneratingReport(type))
    }

    const getAllReports = () => {
        dispatch(startGettingAllReports())
    }

    const getReportById = ( reportId: string ) => {
        dispatch(startGettingReportById( selectedReports, reportId));
    }

    const onSelectedReports = ( entity: ReportEntities ) => {
        dispatch( setSelectedReports(entity) )
    }

    const deleteReportById = () => {
        dispatch( startDeletingReport(selectedReports, reportIdSelected) )
    }

    const selectReportId = ( reportId: string ) => {
        dispatch( setReportIdSelected(reportId) )
    }

    return {
        isLoading,
        reportProducts: products,
        reportUsers: users,
        reportSuppliers: suppliers,
        allReports,
        selectedReports,
        urlReportSelected,
        reportIdSelected,

        createPdfList,
        getAllReports,
        onSelectedReports,
        getReportById,
        deleteReportById,
        selectReportId,
    }

}