import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import type { SaveInventoryAdjustment } from "../../interfaces/inventory-adjustment.interface"
import { startSavingInventoryAdjustment } from "../../store/inventory-adjustment/inventory-adjustment.thunk"

export const useInventoryAdjustment = () => {

    const dispatch = useDispatch<any>()
    const { isLoading } = useSelector( (state: RootState) => state.inventoryAdjustment )

    const saveInventoryAdjustment = ( data: SaveInventoryAdjustment ) => {
        if ( data === null ) return
        dispatch( startSavingInventoryAdjustment( data ) )
    }

    return {
        isLoading,

        saveInventoryAdjustment,
    }

}