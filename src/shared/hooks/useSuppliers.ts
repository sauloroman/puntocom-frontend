import { useDispatch, useSelector } from "react-redux"
import { startChangingSupplierStatus, startCreatingReport, startCreatingSupplier, startFilteringSuppliersByCompany, startFilteringSuppliersByStatus, startGettingSuppliers, startSearchingSuppliers, startUpdatingSupplier } from "../../store/suppliers/supplier.thunk"
import type { CreateSupplier, UpdateSupplier } from "../../interfaces/supplier.interface"
import type { RootState } from "../../store"
import { setCompanyFilter, setPage, setPaginationVisible, setStatusFilter, setSupplierSelected } from "../../store/suppliers/supplier.slice"

export const useSuppliers = () => {
    const dispatch = useDispatch<any>()
    const { 
        companies,
        suppliers,
        supplierSelected,
        isLoading,
        pagination,
        filter,
        isPaginationVisible,
        report
    } = useSelector((state: RootState) => state.suppliers)

    const generateReport = () => {
        dispatch(startCreatingReport())
    }

    const getSuppliers = () => {
        dispatch(startGettingSuppliers({ page: 1, limit: pagination.itemsPerPage }))
    }

    const filterSuppliersByStatus = (status: boolean) => {
        dispatch(setStatusFilter({ status, isVisible: true }))
        dispatch(startFilteringSuppliersByStatus({ page: 1, limit: pagination.itemsPerPage }, status))
    }

    const filterSuppliersByCompany = (company: string) => {
        dispatch(setCompanyFilter({ company, isVisible: true }))
        dispatch(startFilteringSuppliersByCompany({ page: 1, limit: pagination.itemsPerPage }, company))
    }

    const onSetFilterStatus = (status: boolean | null, isVisible: boolean) => {
        dispatch(setStatusFilter({ status, isVisible }))
    }

    const onSetFilterCompanies = (company: string | null, isVisible: boolean) => {
        dispatch(setCompanyFilter({ company, isVisible }))
    }

    const createSupplier = (data: CreateSupplier) => {
        dispatch(startCreatingSupplier(data))
    }

    const updateSupplier = (supplierId: string, supplierData: UpdateSupplier) => {
        dispatch(startUpdatingSupplier(supplierId, supplierData))
    }

    const onSelectSupplier = (id: string) => {
        const supplier = suppliers?.find(s => s.id === id)
        if (supplier) dispatch(setSupplierSelected(supplier))
    }

    const changeSupplierStatus = (supplierId: string, status: boolean) => {
        dispatch(startChangingSupplierStatus(supplierId, status))
    }

    const onSearchSupplier = (supplierSearched: string) => {
        dispatch(startSearchingSuppliers(supplierSearched))
    }

    const onSetPage = (page: number) => {
        dispatch(setPage(page))

        if (filter.status !== null) {
            dispatch(startFilteringSuppliersByStatus({ page, limit: pagination.itemsPerPage }, filter.status))
        } else if (filter.company !== null ) {
            dispatch(startFilteringSuppliersByCompany({page, limit: pagination.itemsPerPage}, filter.company))
        } else {
            dispatch(startGettingSuppliers({ page, limit: pagination.itemsPerPage }))
        }
    }

    const onChangePaginationVisibility = (isVisible: boolean) => {
        dispatch(setPaginationVisible(isVisible))
    }

    return {
        companies,
        supplierSelected,
        suppliers,
        isLoading,
        pagination,
        filter,
        isPaginationVisible,
        report,

        getSuppliers,
        generateReport,
        onSelectSupplier,
        createSupplier,
        updateSupplier,
        changeSupplierStatus,
        filterSuppliersByStatus,
        filterSuppliersByCompany,
        onSetPage,
        onSetFilterCompanies,
        onSetFilterStatus,
        onSearchSupplier,
        onChangePaginationVisibility
    }
}
