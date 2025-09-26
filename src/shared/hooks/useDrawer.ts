import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { closeDrawels, openLeftDrawel, openRightDrawel } from "../../store/drawer/drawer.slice"
import type { DrawelNames } from "../../interfaces/ui/drawel.interface"

export const useDrawer = () => {

    const dispatch = useDispatch<any>()
    const { rightIsOpen, leftIsOpen, drawelName } = useSelector( (state: RootState) => state.drawer )

    const onOpenRightDrawer = ( drawelName: DrawelNames ) => {
        dispatch( openRightDrawel(drawelName) )
    }

    const onOpenLeftDrawer = ( drawelName: DrawelNames ) => {
        dispatch(openLeftDrawel(drawelName))
    }
    
    const onCloseDrawers = () => {
        dispatch( closeDrawels() )
    }

    return {
        drawelName,
        leftDrawerIsOpen: leftIsOpen,
        rightDrawerIsOpen: rightIsOpen,

        onOpenRightDrawer,
        onOpenLeftDrawer,
        onCloseDrawers,
    }

}