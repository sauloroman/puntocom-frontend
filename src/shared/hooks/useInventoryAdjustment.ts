import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { AdjustmentEnum, SaveInventoryAdjustment } from "../../interfaces/dto/inventory-adjustment.interface"
import { startFilteringInventoryAdjustments, startSavingInventoryAdjustment } from "../../store/inventory-adjustment/inventory-adjustment.thunk"
import { resetFilters, setAdjustmentTypeFilter, setAdjustmentUserFilter, setInventoryAdjustmentSelected, setPage, setTableView } from "../../store/inventory-adjustment/inventory-adjustment.slice"
import type { FilterInventoryAdjustments } from "../../interfaces/ui/filter.interface"

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

    const applyInventoryAdjustmentsFilter = (
        page: number,
        limit: number,
        overrides?: Partial<FilterInventoryAdjustments>
    ) => {

        const current: FilterInventoryAdjustments = {
            adjustmentType: filter.adjustmentType,
            user: filter.user
        }
        const applied = { ...current, ...overrides }
        const hasAdjustmentTypeFilter = applied.adjustmentType !== null
        const hasUserIdFilter = applied.user.id !== null

        if ( hasAdjustmentTypeFilter || hasUserIdFilter ) {
            dispatch(startFilteringInventoryAdjustments(
                applied.adjustmentType ?? undefined,
                applied.user.id ?? undefined,
                { page, limit }
            ))
        } else {
            dispatch(startFilteringInventoryAdjustments(
                undefined,
                undefined,
                { page, limit }
            ))
        }

    }

    const onGetInventoryAdjustments = () => {
        dispatch(startFilteringInventoryAdjustments(
            undefined,
            undefined
        ))
    }
    
    const onSetFilterAdjustmentType = ( type: AdjustmentEnum | null ) => {
        dispatch(setAdjustmentTypeFilter({adjustmentType: type}))
        dispatch(setPage(1))
        applyInventoryAdjustmentsFilter(1, pagination.itemsPerPage, { adjustmentType: type })

    }

    const onSetFilterAdjustmentUser = ( user: {id: string | null, name: string | null} ) => {
        dispatch(setAdjustmentUserFilter({ user }))
        dispatch(setPage(1))
        applyInventoryAdjustmentsFilter(1, pagination.itemsPerPage, { user })
    }

    const onResetFilters = () => {
        dispatch(resetFilters())
        dispatch(setPage(1))
        onGetInventoryAdjustments()
    }

    const onSaveInventoryAdjustment = ( data: SaveInventoryAdjustment ) => {
        if ( data === null ) return
        dispatch( startSavingInventoryAdjustment( data ) )
    }

    const onSelectInventoryAdjustment = ( adjustmentId: string ) => {
        if ( !adjustments ) return null
        const inventoryAdjustment = adjustments?.find( adj => adj.adjustmentId === adjustmentId )
        if ( !inventoryAdjustment ) return
        dispatch( setInventoryAdjustmentSelected(inventoryAdjustment))
    }

    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))
        applyInventoryAdjustmentsFilter(page, pagination.itemsPerPage)
    }

    const onSetTableStyle = ( status: boolean ) => {
        dispatch( setTableView(status) )
    }

    return {
        adjustments,
        adjustmentSelected,
        filter,
        isLoading,
        isTableStyleActive,
        pagination,

        onGetInventoryAdjustments,
        onResetFilters,
        onSaveInventoryAdjustment,
        onSelectInventoryAdjustment,
        onSetFilterAdjustmentType,
        onSetFilterAdjustmentUser,
        onSetPage,
        onSetTableStyle,
    }

}