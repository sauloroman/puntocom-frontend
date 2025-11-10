import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { SaveInventoryAdjustment } from "../../interfaces/inventory-adjustment.interface"
import { startFilteringInventoryAdjustmentsByType, startGettingInventoryAdjustments, startSavingInventoryAdjustment } from "../../store/inventory-adjustment/inventory-adjustment.thunk"
import { setInventoryAdjustmentSelected } from "../../store/inventory-adjustment/inventory-adjustment.slice"

export const useInventoryAdjustment = () => {

    const dispatch = useDispatch<any>()
    const { isLoading, adjustments, adjustmentSelected, pagination, filter } = useSelector( (state: RootState) => state.inventoryAdjustment )

    const filterInventoryAdjustmentsByType = ( type: string ) => {
        dispatch(startFilteringInventoryAdjustmentsByType(
            type, 
            { page: 1, limit: pagination.itemsPerPage }
        ))
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

    return {
        adjustments,
        adjustmentSelected,
        filter,
        isLoading,
        pagination,

        filterInventoryAdjustmentsByType,
        getInventoryAdjustments,
        saveInventoryAdjustment,
        selectInventoryAdjustment,
    }

}