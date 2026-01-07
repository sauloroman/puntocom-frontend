import { useDispatch, useSelector } from "react-redux"
import { 
    startChangingSupplierStatus, 
    startCreatingSupplier, 
    startFilteringSuppliersByCompany, 
    startFilteringSuppliersByStatus, 
    startGettingAllSuppliers, 
    startGettingSuppliers, 
    startGettingUniqueCompanies, 
    startSearchingSuppliers, 
    startUpdatingSupplier 
} from "../../store/suppliers/supplier.thunk"
import { 
    setCompanyFilter, 
    setOrderedAsc, 
    setPage, 
    setPaginationVisible, 
    setStatusFilter, 
    setSuppliers, 
    setSupplierSelected, 
    setTableView
} from "../../store/suppliers/supplier.slice"
import type { CreateSupplier, UpdateSupplier } from "../../interfaces/dto/supplier.interface"
import type { RootState } from "../../store"

export const useSuppliers = () => {
    const dispatch = useDispatch<any>()
    const { 
        companies,
        suppliers,
        allSuppliers,
        supplierSelected,
        isLoading,
        pagination,
        filter,
        isPaginationVisible,
        isTableStyleActive,
        isGridStyleActive,
        isOrderedAsc
    } = useSelector((state: RootState) => state.suppliers)

    const getSuppliers = () => {
        dispatch(startGettingSuppliers({ page: 1, limit: pagination.itemsPerPage }))
    }

    const getAllSuppliers = () => {
        dispatch(startGettingAllSuppliers())
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

    const setTableStyle = ( status: boolean ) => {
        dispatch( setTableView(status) )
    }

    const onOrderAlpha = (ordered: boolean) => {
        dispatch(setOrderedAsc(ordered))
        sortSuppliers()
    }

    const sortSuppliers = () => {
        const sortedSuppiers = [...suppliers!].sort((a, b) => {
            const supplierA = `${a.name} ${a.lastname}`.toLowerCase()
            const supplierB = `${b.name} ${b.lastname}`.toLowerCase()

            if (isOrderedAsc) {
                return supplierA.localeCompare(supplierB)
            } else {
                return supplierB.localeCompare(supplierA)
            }
        })
        dispatch(setSuppliers( sortedSuppiers ))
    }

    const getUniqueCompanies = () => {
        dispatch(startGettingUniqueCompanies())
    }

    return {
        companies,
        filter,
        isGridStyleActive,
        isLoading,
        isPaginationVisible,
        isTableStyleActive,
        pagination,
        suppliers,
        allSuppliers,
        supplierSelected,
        isOrderedAsc,

        getAllSuppliers,
        getUniqueCompanies,
        changeSupplierStatus,
        createSupplier,
        filterSuppliersByCompany,
        filterSuppliersByStatus,
        getSuppliers,
        onChangePaginationVisibility,
        onSearchSupplier,
        onSelectSupplier,
        onSetFilterCompanies,
        onSetFilterStatus,
        onSetPage,
        setTableStyle,
        updateSupplier,
        onOrderAlpha,
    }
}
