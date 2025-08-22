import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { closeDrawels, openRightDrawel } from "../../store/drawer/drawer.slice"
import type { DrawelNames } from "../../interfaces/ui/drawel.interface"

export const useDrawer = () => {

    const dispatch = useDispatch<any>()
    const { rightIsOpen, drawelName } = useSelector( (state: RootState) => state.drawer )

    const onOpenRightDrawer = ( drawelName: DrawelNames ) => {
        dispatch( openRightDrawel(drawelName) )
    }
    
    const onCloseDrawers = () => {
        dispatch( closeDrawels() )
    }

    return {
        drawelName,
        rightDrawerIsOpen: rightIsOpen,

        onOpenRightDrawer,
        onCloseDrawers
    }

}