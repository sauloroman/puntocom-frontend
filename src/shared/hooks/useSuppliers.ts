import { useDispatch, useSelector } from "react-redux"
import { startCreatingSupplier, startGettingSuppliers } from "../../store/suppliers/supplier.thunk"
import type { CreateSupplier, UpdateSupplier } from "../../interfaces/supplier.interface"
import type { RootState } from "../../store"

export const useSuppliers = () => {
    const dispatch = useDispatch<any>()
    const { 
        companies,
        suppliers,
        supplierSelected,
        isLoading,
        pagination,
        filter,
        isPaginationVisible
    } = useSelector((state: RootState) => state.suppliers)

    const getSuppliers = () => {
        dispatch(startGettingSuppliers({ page: 1, limit: 10 }))
    }

    // const filterSuppliersByStatus = (status: boolean) => {
    //     dispatch(setStatusFilter({ status, isVisible: true }))
    //     dispatch(startFilteringSuppliersByStatus({ page: 1, limit: 10 }, status))
    // }

    // const onSetFilterStatus = (status: boolean | null, isVisible: boolean) => {
    //     dispatch(setStatusFilter({ status, isVisible }))
    // }

    const createSupplier = (data: CreateSupplier) => {
        dispatch(startCreatingSupplier(data))
    }

    // const updateSupplier = (supplierId: string, supplierData: UpdateSupplier) => {
    //     dispatch(startUpdatingSupplier(supplierId, supplierData))
    // }

    // const onSelectSupplier = (id: string) => {
    //     const supplier = suppliers?.find(s => s.id === id)
    //     if (supplier) dispatch(setSupplierSelected(supplier))
    // }

    // const changeSupplierStatus = (supplierId: string, status: boolean) => {
    //     dispatch(startChangingSupplierStatus(supplierId, status))
    // }

    // const onSearchSupplier = (supplierSearched: string) => {
    //     dispatch(startSearchingSuppliers(supplierSearched))
    // }

    // const onSetPage = (page: number) => {
    //     dispatch(setPage(page))

    //     if (filter.status !== null) {
    //         dispatch(startFilteringSuppliersByStatus({ page, limit: 10 }, filter.status))
    //     } else {
    //         dispatch(startGettingSuppliers({ page, limit: 10 }))
    //     }
    // }

    // const onChangePaginationVisibility = (isVisible: boolean) => {
    //     dispatch(setPaginationVisible(isVisible))
    // }

    return {
        companies,
        supplierSelected,
        suppliers,
        isLoading,
        pagination,
        filter,
        isPaginationVisible,

        getSuppliers,
        // onSelectSupplier,
        createSupplier,
        // updateSupplier,
        // changeSupplierStatus,
        // filterSuppliersByStatus,
        // onSetPage,
        // onSetFilterStatus,
        // onSearchSupplier,
        // onChangePaginationVisibility
    }
}
