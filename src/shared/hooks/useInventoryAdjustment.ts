import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { AdjustmentEnum, SaveInventoryAdjustment } from "../../interfaces/dto/inventory-adjustment.interface"
import { startFilteringInventoryAdjustments, startGettingInventoryAdjustments, startSavingInventoryAdjustment } from "../../store/inventory-adjustment/inventory-adjustment.thunk"
import { setAdjustmentTypeFilter, setAdjustmentUserFilter, setInventoryAdjustmentSelected, setPage, setTableView } from "../../store/inventory-adjustment/inventory-adjustment.slice"

export const useInventoryAdjustment = () => {

    const dispatch = useDispatch<any>()
    const { 
        isLoading, 
        adjustments, 
        adjustmentSelected, 
        pagination, 
        filter,
        isTableStyleActive 
    } = useSelector( (state: RootState) => state.inventoryAdjustment )

    const filterInventoryAdjustments = ( page: number ) => {
        const { adjustmentType, adjustmentUserId } = filter
        const paginationConfig = { page: page, limit: pagination.itemsPerPage }

        if (!adjustmentType && !adjustmentUserId) {
            dispatch(startGettingInventoryAdjustments(paginationConfig))
            return
        }

        dispatch(startFilteringInventoryAdjustments(
            paginationConfig,
            adjustmentUserId || undefined,
            adjustmentType || undefined
        ))
    }

    const onSetFilterAdjustmentType = ( type: AdjustmentEnum | null ) => {
        dispatch(setAdjustmentTypeFilter( type ))
    }

    const onSetFilterAdjustmentUser = ( userId: string | null ) => {
        dispatch(setAdjustmentUserFilter(userId))
    }

    const onResetFilters = () => {
        dispatch(setAdjustmentTypeFilter(null))
        dispatch(setAdjustmentUserFilter(null))
        dispatch(startGettingInventoryAdjustments({ page: 1, limit: pagination.itemsPerPage }))
    }

    const getInventoryAdjustments = () => {
        dispatch( startGettingInventoryAdjustments({ page: 1, limit: pagination.itemsPerPage }))
    }

    const saveInventoryAdjustment = ( data: SaveInventoryAdjustment ) => {
        if ( data === null ) return
        dispatch( startSavingInventoryAdjustment( data ) )
    }

    const selectInventoryAdjustment = ( adjustmentId: string ) => {
        if ( !adjustments ) return null
        const inventoryAdjustment = adjustments?.find( adj => adj.adjustmentId === adjustmentId )
        if ( !inventoryAdjustment ) return
        dispatch( setInventoryAdjustmentSelected(inventoryAdjustment))
    }

    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))
        filterInventoryAdjustments(page)
    }

    const setTableStyle = ( status: boolean ) => {
        dispatch( setTableView(status) )
    }

    return {
        adjustments,
        adjustmentSelected,
        filter,
        isLoading,
        isTableStyleActive,
        pagination,

        filterInventoryAdjustments,
        getInventoryAdjustments,
        onResetFilters,
        onSetFilterAdjustmentType,
        onSetFilterAdjustmentUser,
        onSetPage,
        saveInventoryAdjustment,
        selectInventoryAdjustment,
        setTableStyle,
    }

}