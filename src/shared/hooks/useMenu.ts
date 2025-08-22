import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setCollapsed } from "../../store/menu/menu.slice"

export const useMenu = () => {

    const dispatch = useDispatch<any>()
    const { collapsed } = useSelector((state: RootState) => state.menu)

    const openMenu = () => {
        dispatch(setCollapsed(true))
    }
    
    const closeMenu = () => {
        dispatch(setCollapsed(false))
    }

    return {
        collapsed,

        openMenu,
        closeMenu
    }
}