import { useDispatch, useSelector } from "react-redux"
import { 
    startChangingSupplierStatus, 
    startCreatingSupplier, 
    startFilteringSuppliers, 
    startGettingAllSuppliers, 
    startGettingUniqueCompanies, 
    startUpdatingSupplier 
} from "../../store/suppliers/supplier.thunk"
import { 
    resetFilter,
    setOrderedAsc, 
    setPage, 
    setSuppliers, 
    setSuppliersCompanyFilter, 
    setSupplierSelected, 
    setSuppliersNameFilter, 
    setSuppliersStatusFilter, 
    setTableView
} from "../../store/suppliers/supplier.slice"
import type { CreateSupplier, UpdateSupplier } from "../../interfaces/dto/supplier.interface"
import type { RootState } from "../../store"
import type { FilterSuppliers } from "../../interfaces/ui/filter.interface"

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

    const applySuppliersFilter = (
        page: number,
        limit: number,
        overrides?: Partial<FilterSuppliers>
    ) => {

        const current: FilterSuppliers = {
            company: filter.company,
            status: filter.status,
            supplierName: filter.supplierName
        }
        const applied: FilterSuppliers = { ...current, ...overrides }
        const hasStatusFilter = applied.status !== null
        const hasCompanyFilter = applied.company !== null
        const hasSupplierNameFilter = applied.supplierName !== null

        if ( hasCompanyFilter || hasStatusFilter || hasSupplierNameFilter ) {
            dispatch(startFilteringSuppliers(
                applied.status ?? undefined,
                applied.company ?? undefined,
                applied.supplierName ?? undefined,
                { page, limit }
            ))
        } else {
            dispatch(startFilteringSuppliers(
                undefined,
                undefined,
                undefined,
                { page, limit }
            ))
        }

    }

    const onGetSuppliers = () => {
        dispatch(startFilteringSuppliers(
            undefined,
            undefined,
            undefined
        ))
    }

    const onGetAllSuppliers = () => {
        dispatch(startGettingAllSuppliers())
    }

    const onGetUniqueCompanies = () => {
        dispatch(startGettingUniqueCompanies())
    }

    const onSetFilterSuppliersByStatus = ( status: string | null ) => {
        dispatch(setSuppliersStatusFilter({ status }))
        dispatch(setPage(1))
        applySuppliersFilter(1, pagination.itemsPerPage, { status })
    }

    const onSetFilterSuppliersByCompany = ( company: string | null ) => {
        dispatch(setSuppliersCompanyFilter({ company }))
        dispatch(setPage(1))
        applySuppliersFilter(1, pagination.itemsPerPage, { company })
    }

    const onSetFilterSuppliersByName = ( supplierName: string | null ) => {
        dispatch(setSuppliersNameFilter({supplierName}))
        dispatch(setPage(1))
        applySuppliersFilter(1, pagination.itemsPerPage, { supplierName })
    }
    
    const onResetFilters = () => {
        dispatch(resetFilter())
        dispatch(setPage(1))
        onGetSuppliers()
    }

    const onCreateSupplier = (data: CreateSupplier) => {
        dispatch(startCreatingSupplier(data))
    }

    const onUpdateSupplier = (supplierId: string, supplierData: UpdateSupplier) => {
        dispatch(startUpdatingSupplier(supplierId, supplierData))
    }

    const onSelectSupplier = (id: string) => {
        const supplier = suppliers?.find(s => s.id === id)
        if (supplier) dispatch(setSupplierSelected(supplier))
    }

    const onChangeSupplierStatus = (supplierId: string, status: boolean) => {
        dispatch(startChangingSupplierStatus(supplierId, status))
    }

    const onSetPage = (page: number) => {
        dispatch(setPage(page))
        applySuppliersFilter(page, pagination.itemsPerPage)
    }

    const onSetTableStyle = ( status: boolean ) => {
        dispatch( setTableView(status) )
    }

    const onOrderAlpha = (ordered: boolean) => {
        dispatch(setOrderedAsc(ordered))
        onSortSuppliers()
    }

    const onSortSuppliers = () => {
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

    return {
        activeSuppliers: suppliers?.filter( s => s.isActive ),
        allSuppliers,
        companies,
        filter,
        isGridStyleActive,
        isLoading,
        isOrderedAsc,
        isPaginationVisible,
        isTableStyleActive,
        pagination,
        suppliers,
        supplierSelected,

        onChangeSupplierStatus,
        onCreateSupplier,
        onGetAllSuppliers,
        onGetSuppliers,
        onGetUniqueCompanies,
        onOrderAlpha,
        onResetFilters,
        onSelectSupplier,
        onSetFilterSuppliersByCompany,
        onSetFilterSuppliersByName,
        onSetFilterSuppliersByStatus,
        onSetPage,
        onSetTableStyle,
        onSortSuppliers,
        onUpdateSupplier,
    }
}
